// Basitleştirilmiş SM-2 aralıklı tekrar (spaced repetition) motoru.
// Her kart için zorluk derecesine (grade) göre bir sonraki tekrar tarihi
// hesaplanır ve localStorage'da saklanır.

export type SrsGrade = 0 | 1 | 2 | 3; // 0=Tekrar, 1=Zor, 2=İyi, 3=Kolay

export type SrsCardState = {
  interval: number; // gün
  ease: number; // kolaylık faktörü, başlangıç 2.5
  repetitions: number;
  dueAt: number; // epoch ms
  lastGrade?: SrsGrade;
  lastReviewedAt?: number;
};

export type SrsStore = Record<string, SrsCardState>;

const MIN_EASE = 1.3;
const DAY_MS = 24 * 60 * 60 * 1000;
const STORAGE_KEY = "masak-prep-srs-v1";

export const gradeLabels: Record<SrsGrade, string> = {
  0: "Tekrar",
  1: "Zor",
  2: "İyi",
  3: "Kolay",
};

export const gradeHelp: Record<SrsGrade, string> = {
  0: "Hiç hatırlamadım, hemen tekrar göster.",
  1: "Zorlandım ama hatırladım, kısa sürede tekrar sor.",
  2: "Doğru hatırladım, normal aralıkla ilerle.",
  3: "Kolayca hatırladım, aralığı uzat.",
};

export function createInitialSrsState(now: number = Date.now()): SrsCardState {
  return { interval: 0, ease: 2.5, repetitions: 0, dueAt: now };
}

export function scheduleNext(state: SrsCardState, grade: SrsGrade, now: number = Date.now()): SrsCardState {
  let { interval, ease, repetitions } = state;

  if (grade === 0) {
    repetitions = 0;
    interval = 0;
    ease = Math.max(MIN_EASE, ease - 0.2);
    return { interval, ease, repetitions, dueAt: now + 10 * 60 * 1000, lastGrade: grade, lastReviewedAt: now };
  }

  const easeDelta = grade === 1 ? -0.15 : grade === 3 ? 0.15 : 0;
  ease = Math.max(MIN_EASE, ease + easeDelta);

  if (repetitions === 0) {
    interval = grade === 1 ? 1 : grade === 2 ? 1 : 2;
  } else if (repetitions === 1) {
    interval = grade === 1 ? 2 : grade === 2 ? 3 : 4;
  } else {
    const multiplier = grade === 1 ? ease * 0.8 : grade === 3 ? ease * 1.3 : ease;
    interval = Math.max(1, Math.round(interval * multiplier));
  }

  repetitions += 1;
  return { interval, ease, repetitions, dueAt: now + interval * DAY_MS, lastGrade: grade, lastReviewedAt: now };
}

export function isDue(state: SrsCardState | undefined, now: number = Date.now()): boolean {
  if (!state) return true;
  return state.dueAt <= now;
}

export function loadSrsStore(): SrsStore {
  if (typeof window === "undefined") {
    return {};
  }
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) return {};
    return JSON.parse(raw) as SrsStore;
  } catch {
    return {};
  }
}

export function saveSrsStore(store: SrsStore) {
  if (typeof window === "undefined") {
    return;
  }
  window.localStorage.setItem(STORAGE_KEY, JSON.stringify(store));
}

export function formatDueIn(dueAt: number, now: number = Date.now()): string {
  const diffMs = dueAt - now;
  if (diffMs <= 0) return "şimdi";
  const diffMinutes = Math.round(diffMs / (60 * 1000));
  if (diffMinutes < 60) return `${diffMinutes} dk sonra`;
  const diffHours = Math.round(diffMinutes / 60);
  if (diffHours < 24) return `${diffHours} sa sonra`;
  const diffDays = Math.round(diffHours / 24);
  return `${diffDays} gün sonra`;
}
