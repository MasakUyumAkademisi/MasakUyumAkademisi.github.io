"use client";

import { useEffect, useState } from "react";
import { accountStorageKey } from "./account-storage";

export default function ReadingNav({ lessonId, titles }: { lessonId: string; titles: string[] }) {
  const [current, setCurrent] = useState(-1);
  const [saved, setSaved] = useState<number | null>(null);
  useEffect(() => {
    const key = accountStorageKey(`masak-reading-position:${lessonId}`);
    try {
      const raw = localStorage.getItem(key);
      const value = raw === null ? null : Number(raw);
      setSaved(value !== null && Number.isInteger(value) && value >= 0 && value < titles.length ? value : null);
    } catch { setSaved(null); }
    const sections = titles.map((_, index) => document.getElementById(`academic-${lessonId}-${index}`)).filter((section): section is HTMLElement => section !== null);
    const observer = new IntersectionObserver((entries) => {
      const visible = entries.filter((entry) => entry.isIntersecting).sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top)[0];
      if (!visible) return;
      const index = sections.indexOf(visible.target as HTMLElement);
      setCurrent(index);
      try { localStorage.setItem(key, String(index)); } catch { /* Reading remains available without storage. */ }
    }, { rootMargin: "-15% 0px -55% 0px" });
    sections.forEach((section) => observer.observe(section));
    return () => observer.disconnect();
  }, [lessonId, titles]);

  function jump(index: number) {
    const section = document.getElementById(`academic-${lessonId}-${index}`);
    if (!section) return;
    section.scrollIntoView({ behavior: matchMedia("(prefers-reduced-motion: reduce)").matches ? "instant" : "smooth", block: "start" });
    section.focus({ preventScroll: true });
    setCurrent(index);
  }

  return <nav className="reading-nav" aria-label="Ders bölümleri">
    <label htmlFor={`reading-section-${lessonId}`}>Bölüm</label>
    <select id={`reading-section-${lessonId}`} value={current} onChange={(event) => jump(Number(event.target.value))}>
      <option value={-1} disabled>Bölüm seç</option>
      {titles.map((title, index) => <option key={title} value={index}>{index + 1}. {title}</option>)}
    </select>
    {saved !== null && <button type="button" className="button ghost" onClick={() => jump(saved)}>Kaldığın yer · {saved + 1}</button>}
  </nav>;
}
