"use client";

import { Fragment, useEffect, useRef, useState } from "react";
import { accountStorageKey } from "./account-storage";

type Anchor = { block: string; start: number; end: number; quote: string };
type Note = { id: string; anchors: Anchor[]; comment: string };

export default function AnnotatedReading({ lessonId, sections }: { lessonId: string; sections: { title: string; body: string }[] }) {
  const root = useRef<HTMLDivElement>(null);
  const [notes, setNotes] = useState<Note[]>([]);
  const [draft, setDraft] = useState<Note | null>(null);
  const [error, setError] = useState("");
  const storageKey = accountStorageKey(`masak-reading-notes:${lessonId}`);

  useEffect(() => {
    try {
      const saved: unknown = JSON.parse(localStorage.getItem(storageKey) ?? "[]");
      if (Array.isArray(saved)) setNotes(saved.filter((n): n is Note => typeof n?.id === "string" && typeof n.comment === "string" && Array.isArray(n.anchors) && n.anchors.every((a: Anchor) => typeof a.block === "string" && typeof a.quote === "string" && Number.isInteger(a.start) && Number.isInteger(a.end) && a.start >= 0 && a.end > a.start)).slice(0, 500));
    } catch { setError("Kayıtlı notlar okunamadı."); }
  }, [storageKey]);

  useEffect(() => {
    if (!draft) return;
    const close = (event: KeyboardEvent) => {
      if (event.key === "Escape") { setDraft(null); window.getSelection()?.removeAllRanges(); }
    };
    document.addEventListener("keydown", close);
    return () => document.removeEventListener("keydown", close);
  }, [draft]);

  function captureSelection() {
    if (root.current?.querySelector(".reading-note-panel")) return;
    const selection = window.getSelection();
    if (!selection || selection.isCollapsed || !selection.rangeCount) return;
    const range = selection.getRangeAt(0);
    if (!root.current?.contains(range.startContainer) || !root.current.contains(range.endContainer)) return;
    const anchors: Anchor[] = [];
    root.current.querySelectorAll<HTMLParagraphElement>("p[data-reading-block]").forEach((p) => {
      if (!range.intersectsNode(p)) return;
      const part = document.createRange();
      part.selectNodeContents(p);
      if (p.contains(range.startContainer)) part.setStart(range.startContainer, range.startOffset);
      if (p.contains(range.endContainer)) part.setEnd(range.endContainer, range.endOffset);
      const before = document.createRange();
      before.selectNodeContents(p);
      before.setEnd(part.startContainer, part.startOffset);
      const quote = part.toString();
      if (quote.trim()) anchors.push({ block: p.dataset.readingBlock!, start: before.toString().length, end: before.toString().length + quote.length, quote });
    });
    if (anchors.length) { setError(""); setDraft({ id: crypto.randomUUID(), anchors, comment: "" }); }
  }

  useEffect(() => {
    let timer: ReturnType<typeof setTimeout>;
    const onSelection = () => { clearTimeout(timer); timer = setTimeout(captureSelection, 700); };
    document.addEventListener("selectionchange", onSelection);
    return () => { clearTimeout(timer); document.removeEventListener("selectionchange", onSelection); };
  }, []);

  function persist(next: Note[]) {
    try {
      localStorage.setItem(storageKey, JSON.stringify(next));
      setNotes(next); setDraft(null); setError("");
      window.getSelection()?.removeAllRanges();
    } catch { setError("Not kaydedilemedi. Tarayıcı depolama izinlerini kontrol et."); }
  }

  function paragraph(text: string, block: string) {
    const matches = notes.flatMap((note) => note.anchors.filter((a) => a.block === block && text.slice(a.start, a.end) === a.quote).map((anchor) => ({ note, anchor })));
    const edges = [...new Set([0, text.length, ...matches.flatMap(({ anchor }) => [anchor.start, anchor.end])])].sort((a, b) => a - b);
    return edges.slice(0, -1).map((start, i) => {
      const end = edges[i + 1];
      const match = matches.find(({ anchor }) => anchor.start <= start && anchor.end >= end);
      return match ? <mark key={start} role="button" tabIndex={0} title={match.note.comment || "Vurgu notunu aç"} aria-label={`Vurguyu aç: ${text.slice(start, end)}`} onClick={() => setDraft(match.note)} onKeyDown={(e) => { if (e.key === "Enter" || e.key === " ") { e.preventDefault(); setDraft(match.note); } }}>{text.slice(start, end)}</mark> : <span key={start}>{text.slice(start, end)}</span>;
    });
  }

  return <>
    <div ref={root} className="academic-chapters" onPointerUp={captureSelection} onKeyUp={captureSelection}>
      {sections.map((section, index) => <section id={`academic-${lessonId}-${index}`} tabIndex={-1} className="academic-chapter" key={section.title}>
        <h3>{index + 1}. {section.title}</h3>
        {section.body.split("\n\n").map((text, p) => <Fragment key={p}>
          <p data-reading-block={`${index}:${p}`}>{paragraph(text, `${index}:${p}`)}</p>
          {draft?.anchors[draft.anchors.length - 1]?.block === `${index}:${p}` && <section className="reading-note-panel" aria-label="Vurgu ve not">
            <form onSubmit={(e) => { e.preventDefault(); persist([...notes.filter((n) => n.id !== draft.id), draft]); }}>
              <label htmlFor="reading-comment">Notun <span>(isteğe bağlı)</span></label>
              <textarea id="reading-comment" rows={2} maxLength={4000} value={draft.comment} onChange={(e) => setDraft({ ...draft, comment: e.target.value })} />
              {error && <p role="alert">{error}</p>}
              <div className="reading-note-actions">
                <button className="button primary" type="submit">{notes.some((n) => n.id === draft.id) ? "Notu kaydet" : "Vurgula ve kaydet"}</button>
                {notes.some((n) => n.id === draft.id) && <button className="button ghost" type="button" onClick={() => persist(notes.filter((n) => n.id !== draft.id))}>Vurguyu sil</button>}
                <button className="button ghost" type="button" onClick={() => { setDraft(null); window.getSelection()?.removeAllRanges(); }}>Vazgeç</button>
              </div>
            </form>
          </section>}
        </Fragment>)}
      </section>)}
    </div>
    {error && <p role="alert">{error}</p>}
  </>;
}
