"use client";

import { useEffect, useMemo, useState } from "react";
import {
  getLessonById,
  memoryPalaces,
  recallDrills,
  buildSrsDeck,
  type SrsDeckCard,
} from "./content";
import {
  createInitialSrsState,
  isDue,
  loadSrsStore,
  saveSrsStore,
  scheduleNext,
  type SrsStore,
} from "./srs";

// ---- Günlük Hafıza Turu ----
// Tek, doğrusal bir kart akışı: önce zamanı gelen aralıklı tekrar (SRS)
// kartları (mnemonikler de bu destenin içinde otomatik olarak çıkar),
// ardından günün hafıza sarayı durağı ve günün aktif hatırlama sorusu.
// Sekme yok; kullanıcı sadece "ileri" der.

const DAILY_SRS_CAP = 8;
const CURSOR_KEY = "masak-prep-tour-cursor-v1";
const RECALL_STORAGE_KEY = "masak-prep-recall-v1";

type TourPhase = "srs" | "discover" | "done";

type TourCursor = { palace: number; recall: number };

function loadTourCursor(): TourCursor {
  if (typeof window === "undefined") return { palace: 0, recall: 0 };
  try {
    const raw = window.localStorage.getItem(CURSOR_KEY);
    if (!raw) return { palace: 0, recall: 0 };
    const parsed = JSON.parse(raw) as Partial<TourCursor>;
    return { palace: parsed.palace ?? 0, recall: parsed.recall ?? 0 };
  } catch {
    return { palace: 0, recall: 0 };
  }
}

function saveTourCursor(cursor: TourCursor) {
  if (typeof window === "undefined") return;
  window.localStorage.setItem(CURSOR_KEY, JSON.stringify(cursor));
}

type RecallSelfCheck = Record<string, { revealed: boolean; checkedKeywords: string[] }>;

function loadRecallSelfCheck(): RecallSelfCheck {
  if (typeof window === "undefined") return {};
  try {
    const raw = window.localStorage.getItem(RECALL_STORAGE_KEY);
    return raw ? (JSON.parse(raw) as RecallSelfCheck) : {};
  } catch {
    return {};
  }
}

const allPalaceStops = memoryPalaces.flatMap((palace) =>
  palace.stops.map((stop) => ({ ...stop, paletteTitle: palace.title })),
);

export default function MemoryLab() {
  const deck = useMemo(() => buildSrsDeck(), []);
  const [srsStore, setSrsStore] = useState<SrsStore>({});
  const [srsHydrated, setSrsHydrated] = useState(false);
  const [now, setNow] = useState(() => Date.now());

  const [cursor, setCursor] = useState<TourCursor>({ palace: 0, recall: 0 });
  const [recallState, setRecallState] = useState<RecallSelfCheck>({});

  const [roundCardIds, setRoundCardIds] = useState<string[]>([]);
  const [tourPhase, setTourPhase] = useState<TourPhase>("srs");
  const [srsIndex, setSrsIndex] = useState(0);
  const [discoverIndex, setDiscoverIndex] = useState(0); // 0 = saray, 1 = hatırlama
  const [revealed, setRevealed] = useState(false);
  const [sessionReviewed, setSessionReviewed] = useState(0);

  useEffect(() => {
    const loadedStore = loadSrsStore();
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setSrsStore(loadedStore);
    setCursor(loadTourCursor());
    setRecallState(loadRecallSelfCheck());

    const due = deck.filter((card) => isDue(loadedStore[card.id], Date.now()));
    setRoundCardIds(due.slice(0, DAILY_SRS_CAP).map((card) => card.id));
    setSrsHydrated(true);
    // Sadece ilk yüklemede bir kez turun ilk kartlarını hazırla; deck sabittir.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    const timer = window.setInterval(() => setNow(Date.now()), 30_000);
    return () => window.clearInterval(timer);
  }, []);

  useEffect(() => {
    if (Object.keys(recallState).length === 0) return;
    window.localStorage.setItem(RECALL_STORAGE_KEY, JSON.stringify(recallState));
  }, [recallState]);

  const deckById = useMemo(() => {
    const map = new Map<string, SrsDeckCard>();
    deck.forEach((card) => map.set(card.id, card));
    return map;
  }, [deck]);

  const roundCards = roundCardIds.map((id) => deckById.get(id)).filter((card): card is SrsDeckCard => Boolean(card));
  const dueCount = useMemo(() => deck.filter((card) => isDue(srsStore[card.id], now)).length, [deck, srsStore, now]);
  const moreDueBeyondRound = Math.max(0, dueCount - roundCardIds.length);

  const currentSrsCard = roundCards[srsIndex];
  const palaceStop = allPalaceStops[cursor.palace % allPalaceStops.length];
  const recallDrill = recallDrills[cursor.recall % recallDrills.length];
  const recallEntry = recallDrill ? recallState[recallDrill.id] : undefined;

  function gradeSrs(remembered: boolean) {
    if (!currentSrsCard) return;
    const current = srsStore[currentSrsCard.id] ?? createInitialSrsState(now);
    const next = scheduleNext(current, remembered ? 2 : 0, now);
    const updated = { ...srsStore, [currentSrsCard.id]: next };
    setSrsStore(updated);
    saveSrsStore(updated);
    setSessionReviewed((count) => count + 1);
    setRevealed(false);
    if (srsIndex + 1 >= roundCards.length) {
      setTourPhase("discover");
    } else {
      setSrsIndex((index) => index + 1);
    }
  }

  function extendSrsRound() {
    const due = deck.filter((card) => isDue(srsStore[card.id], now));
    const already = new Set(roundCardIds);
    const more = due.filter((card) => !already.has(card.id)).slice(0, DAILY_SRS_CAP).map((card) => card.id);
    setRoundCardIds((current) => [...current, ...more]);
    setTourPhase("srs");
  }

  function skipToDiscover() {
    setRevealed(false);
    setTourPhase("discover");
  }

  function completePalaceStop() {
    setCursor((current) => {
      const next = { ...current, palace: current.palace + 1 };
      saveTourCursor(next);
      return next;
    });
    setRevealed(false);
    setDiscoverIndex(1);
  }

  function revealRecall() {
    if (!recallDrill) return;
    setRecallState((current) => ({
      ...current,
      [recallDrill.id]: current[recallDrill.id] ?? { revealed: true, checkedKeywords: [] },
    }));
  }

  function toggleRecallKeyword(keyword: string) {
    if (!recallDrill) return;
    setRecallState((current) => {
      const entry = current[recallDrill.id] ?? { revealed: true, checkedKeywords: [] };
      const checkedKeywords = entry.checkedKeywords.includes(keyword)
        ? entry.checkedKeywords.filter((item) => item !== keyword)
        : [...entry.checkedKeywords, keyword];
      return { ...current, [recallDrill.id]: { ...entry, revealed: true, checkedKeywords } };
    });
  }

  function completeRecallStep() {
    setCursor((current) => {
      const next = { ...current, recall: current.recall + 1 };
      saveTourCursor(next);
      return next;
    });
    setTourPhase("done");
  }

  function restartTour() {
    const due = deck.filter((card) => isDue(srsStore[card.id], now));
    setRoundCardIds(due.slice(0, DAILY_SRS_CAP).map((card) => card.id));
    setSrsIndex(0);
    setDiscoverIndex(0);
    setRevealed(false);
    setSessionReviewed(0);
    setTourPhase(due.length > 0 ? "srs" : "discover");
  }

  if (!srsHydrated) {
    return (
      <section className="memory-lab">
        <div className="panel panel-inner memory-tour-card">
          <p className="section-subtitle">Yükleniyor…</p>
        </div>
      </section>
    );
  }

  return (
    <section className="memory-lab">
      {tourPhase === "srs" && (
        <>
          {currentSrsCard ? (
            <article className="panel panel-inner memory-tour-card">
              <div className="question-meta">
                <span className="tag">{getLessonById(currentSrsCard.lessonId).title}</span>
                <span className="tag blue">{currentSrsCard.kind === "mnemonic" ? "Mnemonik" : "Terim"}</span>
                <span className="tag">Kart {srsIndex + 1}/{roundCards.length}</span>
              </div>
              <p className="srs-front">{currentSrsCard.front}</p>
              {revealed ? (
                <>
                  <p className="srs-back">{currentSrsCard.back}</p>
                  <p className="section-subtitle">Bunu biliyor muydun?</p>
                  <div className="srs-grade-row">
                    <button className="button srs-grade srs-grade-again" onClick={() => gradeSrs(false)} type="button">
                      Hatırlamadım
                    </button>
                    <button className="button primary srs-grade srs-grade-good" onClick={() => gradeSrs(true)} type="button">
                      Hatırladım
                    </button>
                  </div>
                </>
              ) : (
                <button className="button primary study-cta" onClick={() => setRevealed(true)} type="button">
                  Cevabı Göster
                </button>
              )}
            </article>
          ) : (
            <article className="panel panel-inner memory-tour-card">
              <p className="eyebrow">Tekrar Kartları</p>
              <h2 className="page-title">Şu an tekrar bekleyen kart yok</h2>
              <p className="study-lead">Zamanı gelen kartlar burada otomatik çıkar. Şimdilik günün keşif kartlarına geçelim.</p>
              <button className="button primary study-cta" onClick={skipToDiscover} type="button">
                Keşfe Geç →
              </button>
            </article>
          )}
        </>
      )}

      {tourPhase === "discover" && discoverIndex === 0 && (
        <article className="panel panel-inner memory-tour-card">
          <div className="question-meta">
            <span className="tag">Hafıza Sarayı</span>
            <span className="tag blue">{palaceStop.paletteTitle}</span>
          </div>
          <p className="eyebrow">{palaceStop.location}</p>
          <h2 className="page-title study-title">{palaceStop.image}</h2>
          <p className="study-lead">Zihninde bu sahneyi canlandır, sonra detayı gör.</p>
          {revealed ? (
            <>
              <p className="srs-back">{palaceStop.detail}</p>
              <button className="button primary study-cta" onClick={completePalaceStop} type="button">
                İleri →
              </button>
            </>
          ) : (
            <button className="button primary study-cta" onClick={() => setRevealed(true)} type="button">
              Detayı Göster
            </button>
          )}
        </article>
      )}

      {tourPhase === "discover" && discoverIndex === 1 && (
        <article className="panel panel-inner memory-tour-card">
          <div className="question-meta">
            <span className="tag">Kendini Sına</span>
            <span className="tag blue">{recallDrill.type === "fill-blank" ? "Boşluk Doldurma" : "Kapalı Kitap Özet"}</span>
            <span className="tag">{getLessonById(recallDrill.lessonId).title}</span>
          </div>
          <p className="question-text">{recallDrill.prompt}</p>
          {!recallEntry?.revealed ? (
            <button className="button primary study-cta" onClick={revealRecall} type="button">
              Önce kendin hatırlamaya çalış, sonra kontrol et
            </button>
          ) : (
            <div className="solution">
              <p><strong>Model cevap:</strong> {recallDrill.answer}</p>
              <p className="recall-keyword-label">Cevabında bu anahtar kelimeler var mıydı?</p>
              <div className="recall-keywords">
                {recallDrill.keywords.map((keyword) => {
                  const checked = recallEntry.checkedKeywords.includes(keyword);
                  return (
                    <button
                      className={`tag recall-keyword ${checked ? "recall-keyword-checked" : ""}`}
                      key={keyword}
                      onClick={() => toggleRecallKeyword(keyword)}
                      type="button"
                    >
                      {checked ? "✓ " : ""}
                      {keyword}
                    </button>
                  );
                })}
              </div>
              <button className="button primary study-cta" onClick={completeRecallStep} type="button">
                Turu Bitir →
              </button>
            </div>
          )}
        </article>
      )}

      {tourPhase === "done" && (
        <article className="panel panel-inner study-done-card">
          <p className="eyebrow">Tebrikler</p>
          <h2 className="page-title">Bugünkü Hafıza Turu Tamamlandı</h2>
          <p className="study-lead">
            {sessionReviewed} tekrar kartı, 1 hafıza sarayı durağı ve 1 hatırlama sorusu tamamladın.
          </p>
          {moreDueBeyondRound > 0 ? (
            <p className="section-subtitle">Bugün için {moreDueBeyondRound} kart daha bekliyor.</p>
          ) : (
            <p className="section-subtitle">Yarın yeni kartlar hazır olacak.</p>
          )}
          <div className="top-actions study-done-actions">
            {moreDueBeyondRound > 0 && (
              <button className="button ghost" onClick={extendSrsRound} type="button">
                8 Kart Daha Çöz
              </button>
            )}
            <button className="button primary study-cta" onClick={restartTour} type="button">
              Baştan İzle
            </button>
          </div>
        </article>
      )}

      {tourPhase === "srs" && roundCards.length > 0 && (
        <div className="memory-tour-progress">
          <div className="study-progress-track">
            <div
              className="study-progress-fill"
              style={{ width: `${Math.round(((srsIndex + (revealed ? 0.5 : 0)) / roundCards.length) * 100)}%` }}
            />
          </div>
        </div>
      )}
    </section>
  );
}
