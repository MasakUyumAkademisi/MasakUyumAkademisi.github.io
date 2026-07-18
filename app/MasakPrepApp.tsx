"use client";

import { useEffect, useMemo, useState } from "react";

type ViewId = "today" | "lessons" | "practice" | "exam" | "progress";

type Lesson = {
  id: string;
  moduleId: string;
  title: string;
  summary: string;
  examPoint: string;
  confusion: string;
  keyCards: { term: string; detail: string }[];
};

type Module = {
  id: string;
  name: string;
  shortName: string;
  focus: string;
  color: string;
};

type Question = {
  id: string;
  lessonId: string;
  moduleId: string;
  difficulty: "Temel" | "Orta" | "Sınav";
  prompt: string;
  options: string[];
  answer: number;
  explanation: string;
  confusion: string;
  source: string;
};

type ProgressState = {
  completedLessons: string[];
  answered: Record<string, boolean>;
  weakTags: Record<string, number>;
  lastSession: string;
};

const defaultProgress: ProgressState = {
  completedLessons: [],
  answered: {},
  weakTags: {},
  lastSession: "Henüz oturum yok",
};

const modules: Module[] = [
  {
    id: "mod1",
    name: "Modül 1 - Kurumsal Çerçeve ve Suç Tipleri",
    shortName: "Modül 1",
    focus: "MASAK, MİB modelleri, FATF, yaptırımlar ve temel suçlar",
    color: "#0f766e",
  },
  {
    id: "mod2",
    name: "Modül 2 - Uyum Programı ve Yükümlülükler",
    shortName: "Modül 2",
    focus: "Yükümlüler, uyum görevlisi, KYC, ŞİB, erteleme ve transferler",
    color: "#3157a4",
  },
];

const lessons: Lesson[] = [
  {
    id: "masak-gorev",
    moduleId: "mod1",
    title: "MASAK ve Görevleri",
    summary:
      "MASAK, suç gelirlerinin aklanması ve terörizmin finansmanıyla mücadelede mali istihbarat üreten, veriyi analiz eden ve ilgili makamlarla paylaşan merkezî idari birimdir. Kolluk veya mahkeme gibi doğrudan soruşturma yürüten bir yapı değildir.",
    examPoint:
      "Sınavda MASAK'ın analiz-inceleme görevi ile savcılığın soruşturma yetkisi sık karıştırılır.",
    confusion:
      "MASAK dava açmaz; şüpheyi analiz eder, raporlar ve ilgili adli/idari sürece bilgi sağlar.",
    keyCards: [
      { term: "Statü", detail: "Hazine ve Maliye Bakanlığına bağlı idari birim." },
      { term: "Ana rol", detail: "Bildirimleri almak, analiz etmek ve paylaşmak." },
      { term: "Yetki sınırı", detail: "Kolluk faaliyeti veya kamu davası açma yetkisi yoktur." },
      { term: "Koordinasyon", detail: "Kurumlar arası politika ve uygulama uyumunu destekler." },
    ],
  },
  {
    id: "mib-fatf",
    moduleId: "mod1",
    title: "Mali İstihbarat Birimleri ve FATF",
    summary:
      "Mali istihbarat birimleri finansal bildirimleri toplar, operasyonel ve stratejik analiz yapar. FATF ise ülkelerin aklama, terörizmin finansmanı ve kitle imha silahlarının yayılmasının finansmanıyla mücadele standartlarını belirleyen yapıdır.",
    examPoint:
      "FATF tavsiyeleri 'tavsiye' adını taşısa da karşılıklı değerlendirme, gri liste ve takip süreçleri nedeniyle sınavda bağlayıcı etki mantığıyla ele alınır.",
    confusion:
      "İdari tip MİB ile kolluk/adli tip MİB arasındaki fark, soru köklerinde yetki örnekleriyle sorulur.",
    keyCards: [
      { term: "İdari tip", detail: "Finans sektörü ile adli makamlar arasında analiz tamponu kurar." },
      { term: "FATF 40 Tavsiye", detail: "Küresel AML/CFT standardının ana çerçevesidir." },
      { term: "Operasyonel analiz", detail: "Belirli kişi, işlem veya olaya odaklanır." },
      { term: "Stratejik analiz", detail: "Eğilim, tipoloji ve risk alanlarını ortaya çıkarır." },
    ],
  },
  {
    id: "aklama-tf",
    moduleId: "mod1",
    title: "Aklama, Terörizmin Finansmanı ve Yaptırımlar",
    summary:
      "Aklama suçu, suçtan kaynaklanan malvarlığı değerinin kaynağını gizleme veya meşru görünüm kazandırma ekseninde değerlendirilir. Terörizmin finansmanında kaynağın yasal veya yasa dışı olması tek başına belirleyici değildir; kullanım amacı önemlidir.",
    examPoint:
      "Aklamada kaynak suç geliri, terörizmin finansmanında ise fonun terör amacıyla bağlantısı kritik ayrımdır.",
    confusion:
      "Malvarlığının dondurulması, el koyma veya müsadere ile aynı kavram değildir; tasarruf yetkisinin sınırlandırılmasıdır.",
    keyCards: [
      { term: "Aklama", detail: "Suç gelirine meşru görünüm kazandırma amacı öne çıkar." },
      { term: "TF", detail: "Fonun amacı ve bağlantısı belirleyicidir." },
      { term: "Dondurma", detail: "Malvarlığı üzerinde tasarruf imkanını sınırlar." },
      { term: "KİS finansmanı", detail: "Yayılmanın finansmanı uluslararası yaptırım rejimleriyle ilişkilidir." },
    ],
  },
  {
    id: "yukumluler",
    moduleId: "mod2",
    title: "Yükümlüler ve Uyum Sorumluluğu",
    summary:
      "Yükümlü kavramı sadece bankaları değil, finansal sisteme giriş veya transfer kanalı olabilen birçok kişi ve kurumu kapsar. Uyum programı, risk yönetimi, izleme-kontrol, eğitim ve iç denetim bileşenleriyle yürütülür.",
    examPoint:
      "Yükümlü, uyum görevlisi ve yönetim kurulu sorumluluğu sınavda rol ayrımı olarak sorulur.",
    confusion:
      "Uyum görevlisi operasyonu tek başına üstlenen kişi değildir; kurumun uyum sisteminin izlenmesinde kilit sorumludur.",
    keyCards: [
      { term: "Yükümlü", detail: "Mevzuatta AML/CFT tedbirlerini uygulamakla sorumlu aktör." },
      { term: "Uyum programı", detail: "Politika, risk yönetimi, kontrol, eğitim ve denetim bütünü." },
      { term: "Yönetim sorumluluğu", detail: "Uyum kültürü ve kaynak tahsisinde üst yönetim belirleyicidir." },
      { term: "Finansal grup", detail: "Grup seviyesinde ortak politika ve gözetim gerektirebilir." },
    ],
  },
  {
    id: "kyc-sib",
    moduleId: "mod2",
    title: "Müşterinin Tanınması ve ŞİB",
    summary:
      "Müşterinin tanınması kimlik tespiti, gerçek faydalanıcıyı anlama, iş ilişkisinin amacını değerlendirme ve risk seviyesine göre sürekli izleme bileşenlerinden oluşur. Şüpheli işlem bildirimi ise şüphe oluştuğunda gecikmeden MASAK'a iletilen bildirimdir.",
    examPoint:
      "KYC sadece başlangıçta kimlik almak değildir; risk temelli ve sürekli izleme gerektirir.",
    confusion:
      "ŞİB yapılması, müşteriye bildirilmez; bildirim gizliliği sınavın klasik çeldiricisidir.",
    keyCards: [
      { term: "KYC", detail: "Kimlik, temsil yetkisi, gerçek faydalanıcı ve iş ilişkisinin amacı." },
      { term: "Risk temelli yaklaşım", detail: "Tedbir yoğunluğu müşteri, ürün, kanal ve ülke riskine göre artar." },
      { term: "ŞİB", detail: "Şüphe olduğunda MASAK'a yapılan gizli bildirim." },
      { term: "Gizlilik", detail: "Bildirim yapıldığı müşteriye veya ilgililere açıklanmaz." },
    ],
  },
  {
    id: "erteleme-transfer",
    moduleId: "mod2",
    title: "İşlem Erteleme, Elektronik ve Kripto Transferler",
    summary:
      "Riskli işlemlerde özel dikkat, işlem amacı hakkında bilgi toplama ve kayıtların muhafazası gerekir. Elektronik ve kripto varlık transferlerinde gönderici/alıcı bilgisinin aktarımı, izleme ve riskli ülke ilişkileri sınav odağıdır.",
    examPoint:
      "İşlem erteleme ve transfer bilgisi yükümlülükleri süre, kapsam ve bildirim mantığıyla çalışılmalıdır.",
    confusion:
      "Elektronik transfer yükümlülüğü sadece bankacılık havalesi gibi düşünülmemelidir; ödeme ve kripto ekosistemi de risk odağıdır.",
    keyCards: [
      { term: "Özel dikkat", detail: "Karmaşık, olağandışı veya makul amacı belirsiz işlemler." },
      { term: "Erteleme", detail: "Şüpheli işlemin gerçekleşmesini önlemek için devreye giren mekanizma." },
      { term: "Seyahat kuralı", detail: "Transferde taraf bilgilerinin izlenebilirliğini güçlendirir." },
      { term: "Teknolojik risk", detail: "Uzaktan kanal, dolandırıcılık ve anomali izleme kontrolleri gerekir." },
    ],
  },
];

const questions: Question[] = [
  {
    id: "q1",
    lessonId: "masak-gorev",
    moduleId: "mod1",
    difficulty: "Temel",
    prompt: "MASAK'ın sınavlarda özellikle vurgulanan temel niteliği aşağıdakilerden hangisidir?",
    options: [
      "Doğrudan kamu davası açan adli makamdır.",
      "Mali istihbarat üreten ve analiz yapan idari birimdir.",
      "Her şüpheli işlemde otomatik el koyma kararı verir.",
      "Sadece bankaların iç denetimini yapan özel kuruldur.",
    ],
    answer: 1,
    explanation:
      "MASAK mali istihbarat ve analiz fonksiyonuyla öne çıkar. Soruşturma ve kamu davası açma yetkisi adli makamların alanındadır.",
    confusion: "Analiz-inceleme ile soruşturma-kovuşturma ayrımını ayır.",
    source: "mufettis.org Modül 1 konu anlatımı",
  },
  {
    id: "q2",
    lessonId: "mib-fatf",
    moduleId: "mod1",
    difficulty: "Orta",
    prompt: "İdari tip mali istihbarat biriminin ayırt edici avantajı hangisidir?",
    options: [
      "Tüm dosyalarda mahkeme kararı olmadan ceza verir.",
      "Finans sektörü ile adli/kolluk makamları arasında analiz tamponu kurar.",
      "Sadece stratejik analiz yapar, operasyonel analiz yapamaz.",
      "Bildirimleri doğrudan kamuoyuna açıklar.",
    ],
    answer: 1,
    explanation:
      "İdari tip modelde bildirimler önce uzmanlaşmış idari birimde analiz edilir; bu yapı finans sektörü ile kolluk/adli süreç arasında filtre görevi görür.",
    confusion: "İdari tip MİB kolluk tipi MİB değildir.",
    source: "mufettis.org ana konu anlatımı",
  },
  {
    id: "q3",
    lessonId: "aklama-tf",
    moduleId: "mod1",
    difficulty: "Sınav",
    prompt: "Aklama suçu ile terörizmin finansmanı arasındaki sınavlık ayrım için en doğru ifade hangisidir?",
    options: [
      "Aklamada fonun kullanım amacı, terörizmin finansmanında kaynağı tek belirleyicidir.",
      "İki kavram aynı unsurlarla oluşur, ayrım sadece ceza miktarındadır.",
      "Aklamada suçtan kaynaklanan malvarlığı değeri, terörizmin finansmanında fonun amacı ve bağlantısı önemlidir.",
      "Terörizmin finansmanı sadece yasa dışı kaynaktan sağlanan fonlarla oluşur.",
    ],
    answer: 2,
    explanation:
      "Aklamada suç geliri ve meşru görünüm kazandırma mantığı öne çıkar. Terörizmin finansmanında fonun yasal kaynaktan gelmesi ihtimali ayrımı ortadan kaldırmaz.",
    confusion: "TF sorularında 'yasal kaynak' çeldiricisine dikkat et.",
    source: "MASAK çalışma notları ve mufettis.org özetleri",
  },
  {
    id: "q4",
    lessonId: "yukumluler",
    moduleId: "mod2",
    difficulty: "Temel",
    prompt: "Uyum programı aşağıdaki unsurlardan hangisini doğal olarak içerir?",
    options: [
      "Sadece yılda bir yapılan personel sınavını",
      "Politika, risk yönetimi, izleme-kontrol, eğitim ve iç denetim bileşenlerini",
      "Yalnızca müşteriden imza örneği alınmasını",
      "Sadece dış denetçinin hazırladığı finansal raporu",
    ],
    answer: 1,
    explanation:
      "Uyum programı tek işlemden ibaret değildir; kurum politikası, risk yönetimi, izleme-kontrol, eğitim ve iç denetim gibi bileşenlerle sistem kurar.",
    confusion: "Uyum programını tek belge veya tek kişi gibi düşünme.",
    source: "mufettis.org Modül 2 konu anlatımı",
  },
  {
    id: "q5",
    lessonId: "kyc-sib",
    moduleId: "mod2",
    difficulty: "Sınav",
    prompt: "Şüpheli işlem bildirimiyle ilgili aşağıdaki ifadelerden hangisi sınav mantığına göre doğrudur?",
    options: [
      "Bildirim yapıldığı müşteriye açıklanmalıdır.",
      "Şüphe oluştuğunda MASAK'a gizli şekilde bildirilir.",
      "Sadece işlem tamamlandıktan bir yıl sonra yapılabilir.",
      "Yalnızca mahkeme talimatı varsa yapılır.",
    ],
    answer: 1,
    explanation:
      "ŞİB şüphe oluştuğunda yapılır ve bildirim gizliliği korunur. Müşteriye veya ilgililere açıklama yapılması sınavda tipik yanlış seçenektir.",
    confusion: "ŞİB ile müşteriyi uyarma davranışını aynılaştırma.",
    source: "mufettis.org özet ve MASAK çalışma notları",
  },
  {
    id: "q6",
    lessonId: "erteleme-transfer",
    moduleId: "mod2",
    difficulty: "Orta",
    prompt: "Karmaşık ve olağandışı büyüklükte, makul ekonomik amacı belirsiz işlemler için yükümlünün temel yaklaşımı ne olmalıdır?",
    options: [
      "İşlemi her durumda sorgusuz tamamlamak",
      "Özel dikkat göstermek, işlem amacı hakkında bilgi edinmek ve kayıtları muhafaza etmek",
      "Müşteriyi bildirim yapıldığı konusunda bilgilendirmek",
      "Sadece işlem küçük tutarlıysa kayıt almak",
    ],
    answer: 1,
    explanation:
      "Özel dikkat gerektiren işlemlerde amaç ve mahiyet mümkün olduğunca anlaşılmalı, bilgi ve belgeler yetkililere sunulabilecek şekilde muhafaza edilmelidir.",
    confusion: "Küçük tutar her zaman düşük risk anlamına gelmez.",
    source: "MASAK çalışma notları, özel dikkat gerektiren işlemler",
  },
];

const sources = [
  {
    title: "MASAK Uyum Görevlisi Yetkilendirme Ders Notları",
    url: "https://mufettis.org/category/masak-uyum-gorevlisi-yetkilendirme-ders-notlari/",
    note: "Kategori ve modül listesi",
  },
  {
    title: "Konu Anlatımı ve Çözümlü Sorular",
    url: "https://mufettis.org/masak-uyum-gorevlisi-yetkilendirme-sinavi-konu-anlatimi-ve-cozumlu-sorular/",
    note: "Modül başlıkları ve örnek soru formatı",
  },
  {
    title: "MASAK_Rehber_12-01-2026.pdf",
    url: "#",
    note: "Yerel rehber PDF, 317 sayfalık çalışma notu",
  },
];

const navItems: { id: ViewId; label: string; icon: string }[] = [
  { id: "today", label: "Bugün", icon: "G" },
  { id: "lessons", label: "Dersler", icon: "D" },
  { id: "practice", label: "Soru Çöz", icon: "S" },
  { id: "exam", label: "Deneme", icon: "T" },
  { id: "progress", label: "İlerleme", icon: "I" },
];

function loadProgress(): ProgressState {
  if (typeof window === "undefined") {
    return defaultProgress;
  }

  try {
    const raw = window.localStorage.getItem("masak-prep-progress-v1");
    return raw ? { ...defaultProgress, ...JSON.parse(raw) } : defaultProgress;
  } catch {
    return defaultProgress;
  }
}

export default function MasakPrepApp() {
  const [activeView, setActiveView] = useState<ViewId>("today");
  const [activeModule, setActiveModule] = useState("mod1");
  const [activeLesson, setActiveLesson] = useState(lessons[0].id);
  const [activeQuestion, setActiveQuestion] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [progress, setProgress] = useState<ProgressState>(defaultProgress);

  useEffect(() => {
    setProgress(loadProgress());
    if ("serviceWorker" in navigator) {
      navigator.serviceWorker.register("/sw.js").catch(() => undefined);
    }
  }, []);

  useEffect(() => {
    window.localStorage.setItem("masak-prep-progress-v1", JSON.stringify(progress));
  }, [progress]);

  const currentLesson = lessons.find((lesson) => lesson.id === activeLesson) ?? lessons[0];
  const filteredLessons = lessons.filter((lesson) => lesson.moduleId === activeModule);
  const currentQuestion = questions[activeQuestion];
  const answeredCount = Object.keys(progress.answered).length;
  const correctCount = Object.values(progress.answered).filter(Boolean).length;
  const accuracy = answeredCount ? Math.round((correctCount / answeredCount) * 100) : 0;
  const completedRatio = Math.round((progress.completedLessons.length / lessons.length) * 100);

  const moduleScores = useMemo(() => {
    return modules.map((module) => {
      const moduleQuestions = questions.filter((question) => question.moduleId === module.id);
      const answered = moduleQuestions.filter((question) => question.id in progress.answered);
      const correct = answered.filter((question) => progress.answered[question.id]);
      return {
        ...module,
        score: answered.length ? Math.round((correct.length / answered.length) * 100) : 0,
      };
    });
  }, [progress.answered]);

  function completeLesson() {
    setProgress((current) => {
      if (current.completedLessons.includes(currentLesson.id)) {
        return current;
      }

      return {
        ...current,
        completedLessons: [...current.completedLessons, currentLesson.id],
        lastSession: `${currentLesson.title} tamamlandı`,
      };
    });
  }

  function answerQuestion(index: number) {
    if (selectedAnswer !== null) {
      return;
    }

    const isCorrect = index === currentQuestion.answer;
    setSelectedAnswer(index);
    setProgress((current) => ({
      ...current,
      answered: { ...current.answered, [currentQuestion.id]: isCorrect },
      weakTags: isCorrect
        ? current.weakTags
        : {
            ...current.weakTags,
            [currentQuestion.lessonId]: (current.weakTags[currentQuestion.lessonId] ?? 0) + 1,
          },
      lastSession: `${currentQuestion.source}: ${isCorrect ? "doğru" : "tekrar gerekli"}`,
    }));
  }

  function nextQuestion() {
    setSelectedAnswer(null);
    setActiveQuestion((current) => (current + 1) % questions.length);
  }

  function startExam(moduleId: string | "mixed") {
    const firstIndex = questions.findIndex((question) =>
      moduleId === "mixed" ? true : question.moduleId === moduleId,
    );
    setActiveQuestion(firstIndex >= 0 ? firstIndex : 0);
    setSelectedAnswer(null);
    setActiveView("practice");
    setProgress((current) => ({
      ...current,
      lastSession:
        moduleId === "mixed" ? "Karışık deneme başlatıldı" : `${moduleId === "mod1" ? "Modül 1" : "Modül 2"} denemesi başlatıldı`,
    }));
  }

  const weakLessons = Object.entries(progress.weakTags)
    .sort((a, b) => b[1] - a[1])
    .map(([lessonId]) => lessons.find((lesson) => lesson.id === lessonId)?.title)
    .filter(Boolean) as string[];

  return (
    <div className="app-shell">
      <aside className="sidebar" aria-label="Ana gezinme">
        <div className="brand">
          <div className="brand-mark">M</div>
          <div>
            <p className="brand-title">MASAK Hazırlık</p>
            <p className="brand-subtitle">Uyum görevlisi sınav prototipi</p>
          </div>
        </div>
        <nav className="nav">
          {navItems.map((item) => (
            <button
              className={`nav-button ${activeView === item.id ? "active" : ""}`}
              key={item.id}
              onClick={() => setActiveView(item.id)}
              type="button"
            >
              <span className="nav-icon" aria-hidden="true">{item.icon}</span>
              {item.label}
            </button>
          ))}
        </nav>
        <div className="sidebar-note">
          Eğitim amaçlı prototiptir. Resmi sınav sorusu değildir; mevzuat ve duyuru güncelliği ayrıca kontrol edilmelidir.
        </div>
      </aside>

      <main className="main">
        <header className="topbar">
          <div>
            <p className="eyebrow">MASAK Uyum Görevlisi Yetkilendirme</p>
            <h1 className="page-title">Ders anlatımı ve açıklamalı soru çözüm kokpiti</h1>
          </div>
          <div className="top-actions">
            <button className="button" onClick={() => setActiveView("lessons")} type="button">
              Dersi Aç
            </button>
            <button className="button primary" onClick={() => setActiveView("practice")} type="button">
              Soru Çöz
            </button>
          </div>
        </header>

        {activeView === "today" && (
          <section className="dashboard">
            <div className="panel hero-panel">
              <div className="hero-copy">
                <p className="eyebrow">Bugünkü Plan</p>
                <h2 className="page-title">40 dakikalık net çalışma akışı</h2>
                <p>
                  Önce bir ders özeti oku, karıştırılan noktayı işaretle, ardından açıklamalı mini test çöz. Yanlışların ilerleme panelinde tekrar gündemine düşer.
                </p>
                <div className="top-actions">
                  <button className="button primary" onClick={() => setActiveView("lessons")} type="button">
                    Kaldığım Derse Git
                  </button>
                  <button className="button" onClick={() => startExam("mixed")} type="button">
                    Karışık Deneme
                  </button>
                </div>
              </div>
              <div className="study-visual" aria-label="Çalışma akışı">
                {[
                  ["1", "Ders", currentLesson.title],
                  ["2", "Kart", "Sınavda sorulur alanını tekrar et"],
                  ["3", "Test", `${questions.length} prototip sorudan devam et`],
                ].map(([icon, title, text]) => (
                  <div className="visual-row" key={title}>
                    <span className="visual-icon">{icon}</span>
                    <div>
                      <p className="visual-title">{title}</p>
                      <p className="visual-text">{text}</p>
                    </div>
                    <span className="status-pill">Hazır</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="dashboard">
              <div className="panel panel-inner">
                <div className="metric-grid">
                  <div className="metric">
                    <p className="metric-value">{completedRatio}%</p>
                    <p className="metric-label">Ders ilerlemesi</p>
                  </div>
                  <div className="metric">
                    <p className="metric-value">{accuracy}%</p>
                    <p className="metric-label">Doğruluk</p>
                  </div>
                  <div className="metric">
                    <p className="metric-value">{answeredCount}</p>
                    <p className="metric-label">Çözülen soru</p>
                  </div>
                </div>
              </div>
              <div className="panel panel-inner">
                <div className="section-head">
                  <div>
                    <h2 className="section-title">Zayıf Konular</h2>
                    <p className="section-subtitle">Yanlış cevaplara göre oluşur.</p>
                  </div>
                </div>
                <div className="weak-list">
                  {(weakLessons.length ? weakLessons : ["ŞİB gizliliği", "FATF tavsiyeleri", "KYC kapsamı"]).map((item) => (
                    <span className="tag" key={item}>{item}</span>
                  ))}
                </div>
              </div>
            </div>

            <div className="panel panel-inner">
              <div className="section-head">
                <div>
                  <h2 className="section-title">Kaynaklar ve İçerik Notu</h2>
                  <p className="section-subtitle">Özgün özet ve atıf yaklaşımıyla hazırlandı.</p>
                </div>
              </div>
              <div className="source-list">
                {sources.map((source) => (
                  <a className="source-link" href={source.url} key={source.title} rel="noreferrer" target={source.url === "#" ? undefined : "_blank"}>
                    {source.title}
                    <span>{source.note}</span>
                  </a>
                ))}
              </div>
            </div>
          </section>
        )}

        {activeView === "lessons" && (
          <section className="lesson-grid">
            <div className="panel panel-inner">
              <div className="section-head">
                <div>
                  <h2 className="section-title">Modüller</h2>
                  <p className="section-subtitle">Konu başlığı seç.</p>
                </div>
              </div>
              <div className="module-list">
                {modules.map((module) => (
                  <button
                    className={`module-button ${activeModule === module.id ? "active" : ""}`}
                    key={module.id}
                    onClick={() => {
                      setActiveModule(module.id);
                      setActiveLesson(lessons.find((lesson) => lesson.moduleId === module.id)?.id ?? lessons[0].id);
                    }}
                    type="button"
                  >
                    <strong>{module.name}</strong>
                    <span className="module-meta">{module.focus}</span>
                  </button>
                ))}
              </div>
              <hr style={{ border: 0, borderTop: "1px solid var(--line)", margin: "1rem 0" }} />
              <div className="lesson-list">
                {filteredLessons.map((lesson) => (
                  <button
                    className={`lesson-button ${activeLesson === lesson.id ? "active" : ""}`}
                    key={lesson.id}
                    onClick={() => setActiveLesson(lesson.id)}
                    type="button"
                  >
                    <strong>{lesson.title}</strong>
                    <span className="lesson-meta">
                      {progress.completedLessons.includes(lesson.id) ? "Tamamlandı" : "Okunacak"}
                    </span>
                  </button>
                ))}
              </div>
            </div>

            <article className="panel panel-inner lesson-body">
              <div>
                <p className="eyebrow">{modules.find((module) => module.id === currentLesson.moduleId)?.shortName}</p>
                <h2 className="section-title">{currentLesson.title}</h2>
                <p className="lesson-lead">{currentLesson.summary}</p>
              </div>
              <div className="callout">
                <p className="callout-title">Sınavda Sorulur</p>
                <p>{currentLesson.examPoint}</p>
              </div>
              <div className="callout warning">
                <p className="callout-title">Karıştırılan Nokta</p>
                <p>{currentLesson.confusion}</p>
              </div>
              <dl className="card-grid">
                {currentLesson.keyCards.map((card) => (
                  <div className="study-card" key={card.term}>
                    <dt>{card.term}</dt>
                    <dd>{card.detail}</dd>
                  </div>
                ))}
              </dl>
              <div className="top-actions">
                <button className="button primary" onClick={completeLesson} type="button">
                  Dersi Tamamla
                </button>
                <button
                  className="button"
                  onClick={() => {
                    const index = questions.findIndex((question) => question.lessonId === currentLesson.id);
                    setActiveQuestion(index >= 0 ? index : 0);
                    setSelectedAnswer(null);
                    setActiveView("practice");
                  }}
                  type="button"
                >
                  Mini Test
                </button>
              </div>
            </article>
          </section>
        )}

        {activeView === "practice" && (
          <section className="practice-grid">
            <div className="panel panel-inner question-card">
              <div className="question-meta">
                <span className="tag">{modules.find((module) => module.id === currentQuestion.moduleId)?.shortName}</span>
                <span className="tag blue">{currentQuestion.difficulty}</span>
                <span className="tag">{currentQuestion.source}</span>
              </div>
              <p className="question-text">{currentQuestion.prompt}</p>
              <div className="options">
                {currentQuestion.options.map((option, index) => {
                  const isCorrect = index === currentQuestion.answer;
                  const isSelected = selectedAnswer === index;
                  const stateClass =
                    selectedAnswer === null
                      ? ""
                      : isCorrect
                        ? "correct"
                        : isSelected
                          ? "wrong"
                          : "";
                  return (
                    <button
                      className={`option ${isSelected ? "selected" : ""} ${stateClass}`}
                      disabled={selectedAnswer !== null}
                      key={option}
                      onClick={() => answerQuestion(index)}
                      type="button"
                    >
                      <span className="option-letter">{String.fromCharCode(65 + index)}</span>
                      <span>{option}</span>
                    </button>
                  );
                })}
              </div>
              {selectedAnswer !== null && (
                <div className="solution">
                  <strong>
                    {selectedAnswer === currentQuestion.answer ? "Doğru cevap." : "Yanlış cevap."} Doğru seçenek {String.fromCharCode(65 + currentQuestion.answer)}.
                  </strong>
                  <p>{currentQuestion.explanation}</p>
                  <p><strong>Karıştırma:</strong> {currentQuestion.confusion}</p>
                </div>
              )}
              <div className="top-actions">
                <button className="button" onClick={nextQuestion} type="button">
                  Sonraki Soru
                </button>
                <button className="button ghost" onClick={() => setSelectedAnswer(null)} type="button">
                  Cevabı Temizle
                </button>
              </div>
            </div>

            <aside className="panel panel-inner">
              <h2 className="section-title">Soru Çözüm Özeti</h2>
              <p className="section-subtitle">Cihazda saklanan oturum verisi.</p>
              <div className="metric-grid" style={{ gridTemplateColumns: "1fr" }}>
                <div className="metric">
                  <p className="metric-value">{answeredCount}</p>
                  <p className="metric-label">Çözülen soru</p>
                </div>
                <div className="metric">
                  <p className="metric-value">{accuracy}%</p>
                  <p className="metric-label">Doğruluk oranı</p>
                </div>
              </div>
            </aside>
          </section>
        )}

        {activeView === "exam" && (
          <section className="exam-grid">
            {[
              ["Modül 1 Deneme", "Kurumsal yapı, FATF, MİB, aklama, TF ve yaptırım başlıklarından kısa prototip deneme.", "mod1"],
              ["Modül 2 Deneme", "Yükümlüler, uyum programı, KYC, ŞİB, erteleme ve transfer yükümlülükleri.", "mod2"],
              ["Karışık Deneme", "Gerçek sınav ritmine yaklaşmak için iki modülden harmanlanmış kısa soru seti.", "mixed"],
            ].map(([title, text, id]) => (
              <article className="panel panel-inner exam-card" key={title}>
                <div>
                  <p className="eyebrow">50 soruluk yapıya hazır</p>
                  <h2 className="section-title">{title}</h2>
                  <p>{text}</p>
                </div>
                <button className="button primary" onClick={() => startExam(id as "mod1" | "mod2" | "mixed")} type="button">
                  Denemeyi Başlat
                </button>
              </article>
            ))}
          </section>
        )}

        {activeView === "progress" && (
          <section className="progress-grid">
            <div className="panel panel-inner">
              <div className="section-head">
                <div>
                  <h2 className="section-title">Modül Bazlı İlerleme</h2>
                  <p className="section-subtitle">Ders tamamlama ve soru doğruluğu birlikte izlenir.</p>
                </div>
              </div>
              <div className="bar-list">
                <div className="bar-row">
                  <div className="bar-label">
                    <span>Ders tamamlama</span>
                    <span>{completedRatio}%</span>
                  </div>
                  <div className="bar-track"><div className="bar-fill" style={{ width: `${completedRatio}%` }} /></div>
                </div>
                {moduleScores.map((module) => (
                  <div className="bar-row" key={module.id}>
                    <div className="bar-label">
                      <span>{module.shortName} doğruluk</span>
                      <span>{module.score}%</span>
                    </div>
                    <div className="bar-track"><div className="bar-fill" style={{ width: `${module.score}%` }} /></div>
                  </div>
                ))}
              </div>
            </div>
            <aside className="panel panel-inner">
              <h2 className="section-title">Tekrar Önerisi</h2>
              <p className="section-subtitle">Son oturum: {progress.lastSession}</p>
              <div className="weak-list" style={{ marginTop: "1rem" }}>
                {(weakLessons.length ? weakLessons : ["MASAK görev sınırı", "Müşterinin tanınması", "İşlem erteleme"]).map((item) => (
                  <span className="tag" key={item}>{item}</span>
                ))}
              </div>
            </aside>
          </section>
        )}
      </main>

      <nav className="mobile-nav" aria-label="Mobil gezinme">
        {navItems.map((item) => (
          <button
            className={activeView === item.id ? "active" : ""}
            key={item.id}
            onClick={() => setActiveView(item.id)}
            type="button"
          >
            {item.label}
          </button>
        ))}
      </nav>
    </div>
  );
}
