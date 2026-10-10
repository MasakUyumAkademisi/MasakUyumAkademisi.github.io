"use client";

import { useEffect, useRef } from "react";

const NOTICE_KEY = "masak-storage-notice-read-v1";

export default function StorageNotice() {
  const dialog = useRef<HTMLDialogElement>(null);
  useEffect(() => {
    try { if (localStorage.getItem(NOTICE_KEY) === "read") return; } catch { /* Show the notice when storage is unavailable. */ }
    dialog.current?.showModal();
    return () => dialog.current?.close();
  }, []);

  function acknowledge() {
    try { localStorage.setItem(NOTICE_KEY, "read"); } catch { /* Acknowledgement still closes this visit's notice. */ }
    dialog.current?.close();
  }

  return <dialog ref={dialog} className="storage-notice" aria-labelledby="storage-notice-title" aria-describedby="storage-notice-description">
    <h2 id="storage-notice-title">Çerez ve Tarayıcı Depolaması</h2>
    <div id="storage-notice-description">
      <p>Çalışma ilerlemeniz, soru sonuçlarınız, okuma konumunuz ve görünüm tercihiniz bu tarayıcıda saklanır. Yerel depolama (localStorage) ve çevrimdışı önbellek kullanılır; çalışma kayıtları sunucuya eşitlenmez.</p>
      <p>Bu sürümde hesap, reklam veya analiz çerezi kullanılmaz. GitHub Pages, IP adresi gibi teknik bağlantı verilerini kendi <a href="https://docs.github.com/en/site-policy/privacy-policies/github-general-privacy-statement" target="_blank" rel="noopener noreferrer">Gizlilik Bildirimi</a> kapsamında işleyebilir.</p>
      <p>Tarayıcı site verilerini temizlemek ilerlemenizi ve bu bildirimin okunduğu bilgisini siler. Metne İlerleme ekranından tekrar ulaşabilirsiniz.</p>
    </div>
    <button className="button primary" type="button" onClick={acknowledge} autoFocus>Okudum</button>
  </dialog>;
}
