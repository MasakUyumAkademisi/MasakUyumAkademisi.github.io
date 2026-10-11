"use client";

import { useState } from "react";
import { lessons, lessonContentById, type ModuleId } from "./content";

const illustrations: Record<string, { src: string; alt: string; caption: string }> = {
  ...Object.fromEntries([
    ["masak-gorevleri", "Bildirim → Analiz → Mali istihbarat → Yetkili makamlar"],
    ["uluslararasi-standartlar", "FATF · Egmont · MONEYVAL"],
    ["ulusal-koordinasyon", "Tehdit · Kırılganlık · Sonuç → Risk değerlendirmesi"],
    ["terorizmin-finansmani", "Fonun kaynağı ile kullanım amacının ayrımı"],
    ["kisyf", "Ürün · Taraflar · Güzergâh · Nihai kullanım"],
    ["islem-ertelemesi", "Bildirim ≠ Erteleme ≠ Dondurma"],
    ["fintek-riskleri", "Gönderen → Hizmet sağlayıcı → Transfer → Alıcı"],
    ["uyum-yonetimi", "Uyum programının altı bileşeni ve yönetim sorumluluğu"],
    ["denetim-idari-ceza", "İdari süreç ve adli süreç ayrımı"],
    ["uzaktan-kimlik", "Belge → Kişi → Güvenlik → Kayıt"],
    ["diger-yukumlulukler", "Bilgi ve belge → Muhafaza → Erişim → İbraz"],
  ].map(([id, caption]) => [id, { src: `${id}-sema.png`, alt: caption, caption }])),
  aklama: { src: "aklama-asamalari.png", alt: "Yerleştirme: suç gelirinin finansal sisteme sokulması. Ayrıştırma: kaynağın izinin karmaşıklaştırılması. Bütünleştirme: meşru görünümle ekonomiye dönmesi. Aşamalar her olayda ayrı ve sıralı görünmeyebilir.", caption: "Yerleştirme → Ayrıştırma → Bütünleştirme" },
  sib: { src: "sib-akisi.png", alt: "Şüpheyi fark et; bilgi ve bulguları değerlendir; MASAK’a bildir; gizliliği koru. Bildirim suçun ispatı değildir; işlem ertelemesi ayrı bir mekanizmadır.", caption: "Şüphe · Değerlendirme · Bildirim · Gizlilik" },
  "musterinin-taninmasi": { src: "kyc-haritasi.png", alt: "Müşterinin tanınması: kimlik tespiti ve teyit, gerçek faydalanıcı, risk değerlendirmesi ve sürekli izleme. Kimlik belgesi almak tek başına yeterli değildir.", caption: "Kimlik · Gerçek faydalanıcı · Risk · İzleme" },
};

export default function SchemaLibrary({ onStudy }: { onStudy: (id: string) => void }) {
  const [moduleId, setModuleId] = useState<ModuleId>("mod1");
  const [selected, setSelected] = useState(lessons[0].id);
  const moduleLessons = lessons.filter((lesson) => lesson.moduleId === moduleId);
  const lesson = moduleLessons.find((item) => item.id === selected) ?? moduleLessons[0];
  const content = lessonContentById[lesson.id];
  const illustration = { ...illustrations[lesson.id], src: `${lesson.id}-detayli-sema.jpg` };

  return <section className="schema-library">
    <div className="schema-controls">
      <div className="schema-modules" role="group" aria-label="Şema modülü">
        {(["mod1", "mod2"] as const).map((id, index) => <button type="button" key={id} aria-pressed={moduleId === id} onClick={() => { setModuleId(id); setSelected(lessons.find((item) => item.moduleId === id)!.id); }}>Modül {index + 1}</button>)}
      </div>
      <label htmlFor="schema-topic">Konu</label>
      <select id="schema-topic" value={lesson.id} onChange={(event) => setSelected(event.target.value)}>{moduleLessons.map((item) => <option value={item.id} key={item.id}>{item.title}</option>)}</select>
    </div>
    {illustration && <figure className="schema-infographic"><a href={illustration.src} target="_blank" rel="noopener noreferrer" aria-label={`${lesson.title} görselini büyük aç`}><img src={illustration.src} alt={illustration.alt} width={1536} height={1024} loading="lazy" /></a><figcaption>{illustration.caption}</figcaption></figure>}
    <details key={lesson.id} className="schema-distinctions"><summary>Sınav notları</summary><p>{content.examFocus}</p><ul>{content.pitfalls.slice(0, 4).map((item) => <li key={item}>{item}</li>)}</ul></details>
    <footer className="schema-footer"><button className="button primary" type="button" onClick={() => onStudy(lesson.id)}>İlgili dersi aç</button><details><summary>Kaynak izi</summary><p>{content.sourceTrace}</p></details></footer>
  </section>;
}
