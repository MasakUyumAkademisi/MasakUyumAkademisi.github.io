export type ModuleId = "mod1" | "mod2";
export type Difficulty = "Temel" | "Orta" | "Sınav";

export type PrepModule = {
  id: ModuleId;
  name: string;
  shortName: string;
  focus: string;
  color: string;
};

export type KeyCard = {
  term: string;
  detail: string;
};

export type Lesson = {
  id: string;
  moduleId: ModuleId;
  order: number;
  title: string;
  officialQuestionCount: number;
  bankQuestionCount: number;
  summary: string;
  examPoint: string;
  confusion: string;
  sourceRef: string;
  keyCards: KeyCard[];
};

export type LessonDetail = {
  subtopics: string[];
  examChecklist: string[];
  commonMistakes: string[];
  scenario: string;
  questionAngles: string[];
  sourceNotes: string[];
};

export type LessonPriority = "high" | "medium" | "short";

export type DeepDiveSection = {
  title: string;
  body: string;
  sourceTrace: string;
};

export type ComparisonTable = {
  title: string;
  columns: string[];
  rows: string[][];
  sourceTrace: string;
};

export type CaseStudy = {
  title: string;
  facts: string;
  analysis: string;
  takeaway: string;
  sourceTrace: string;
};

export type MiniQuizQuestion = {
  prompt: string;
  options: string[];
  answer: number;
  explanation: string;
  sourceTrace: string;
};

export type LessonContent = {
  priority: LessonPriority;
  pdfRange: string;
  coreNarrative: string;
  examFocus: string;
  mustKnow: string[];
  confusions: string[];
  casePattern: string;
  legalAnchors: string[];
  reviewCards: KeyCard[];
  miniQuizSeed: string[];
  sourceTrace: string;
  overview: string;
  estimatedMinutes: number;
  deepDiveSections: DeepDiveSection[];
  examSignals: string[];
  comparisonTables: ComparisonTable[];
  caseStudies: CaseStudy[];
  pitfalls: string[];
  glossary: KeyCard[];
  miniQuiz: MiniQuizQuestion[];
};

type BaseLessonContent = Pick<
  LessonContent,
  | "priority"
  | "pdfRange"
  | "coreNarrative"
  | "examFocus"
  | "mustKnow"
  | "confusions"
  | "casePattern"
  | "legalAnchors"
  | "reviewCards"
  | "miniQuizSeed"
>;

export type Question = {
  id: string;
  moduleId: ModuleId;
  topicId: string;
  difficulty: Difficulty;
  prompt: string;
  options: string[];
  answer: number;
  explanation: string;
  trapNote: string;
  sourceRef: string;
};

export type SourceLink = {
  title: string;
  url: string;
  note: string;
  kind: "Resmi" | "Yardımcı" | "Yerel";
};

export const examRules = {
  questionCount: 50,
  durationMinutes: 45,
  passPerModule: 50,
  averagePass: 65,
  legislationCheckedAt: "18 Temmuz 2026",
};

export const modules: PrepModule[] = [
  {
    id: "mod1",
    name: "Modül 1 - Hukuki Çerçeve ve Risk Tipolojileri",
    shortName: "Modül 1",
    focus:
      "MASAK, FATF, ulusal koordinasyon, aklama, TF, KİSYF, ŞİB, erteleme ve fintech riskleri",
    color: "#0f766e",
  },
  {
    id: "mod2",
    name: "Modül 2 - Uyum Yönetimi ve Yükümlülükler",
    shortName: "Modül 2",
    focus:
      "Uyum birimi, denetim, idari para cezaları, uzaktan kimlik, diğer yükümlülükler ve KYC",
    color: "#3157a4",
  },
];

export const lessons: Lesson[] = [
  {
    id: "masak-gorevleri",
    moduleId: "mod1",
    order: 1,
    title: "MASAK Başkanlığı ve Görevleri",
    officialQuestionCount: 3,
    bankQuestionCount: 4,
    summary:
      "MASAK, AML/CFT sisteminde bildirimleri alan, analiz eden, kurumlar arası koordinasyonu destekleyen ve yükümlülük denetimi süreçlerine veri sağlayan idari mali istihbarat merkezidir.",
    examPoint:
      "MASAK'ın analiz ve koordinasyon işlevi ile savcılık/kolluk soruşturma yetkisi ayrımı mutlaka bilinmelidir.",
    confusion:
      "MASAK şüpheyi analiz eder; her bildirim doğrudan el koyma, kamu davası veya mahkumiyet sonucunu doğurmaz.",
    sourceRef: "SPL Kılavuzu Modül 1.1, 5549, 6415, 7262 ve 1 sayılı CBK",
    keyCards: [
      { term: "Mali istihbarat", detail: "Bildirimleri anlamlandıran ve ilgili makamlarla paylaşan analiz fonksiyonu." },
      { term: "Koordinasyon", detail: "AML/CFT politikasında kurumlar arası uyumu destekler." },
      { term: "Denetim bağlantısı", detail: "Yükümlülük denetimi ve yaptırım süreçlerinde merkezi rol oynar." },
      { term: "Sınır", detail: "Adli soruşturma makamı gibi değerlendirilmemelidir." },
    ],
  },
  {
    id: "uluslararasi-standartlar",
    moduleId: "mod1",
    order: 2,
    title: "Uluslararası Standartlar ve Kuruluşlar",
    officialQuestionCount: 4,
    bankQuestionCount: 5,
    summary:
      "FATF tavsiyeleri, Egmont ağı, mali istihbarat birimleri ve uluslararası yaptırım standartları Türkiye'nin AML/CFT çerçevesinin dış referanslarını oluşturur.",
    examPoint:
      "Türkiye 28 Haziran 2024'te FATF artırılmış izleme sürecinden çıkarılmıştır; bu durum standartlara uyum çabasının sürdüğü anlamına gelir.",
    confusion:
      "FATF tavsiyeleri sadece iyi niyetli öneri gibi okunmamalıdır; karşılıklı değerlendirme ve izleme süreçleri pratik yaptırım etkisi yaratır.",
    sourceRef: "SPL Kılavuzu Modül 1.2, FATF Haziran 2024 duyurusu",
    keyCards: [
      { term: "FATF", detail: "AML/CFT/PF alanında küresel standart belirleyici yapı." },
      { term: "Egmont", detail: "Mali istihbarat birimleri arasında güvenli bilgi paylaşım ağı." },
      { term: "Gri liste", detail: "Stratejik eksikliklerin izlenmesi; Türkiye 2024'te listeden çıkmıştır." },
      { term: "Yaptırımlar", detail: "BM ve diğer finansal yaptırım rejimleri sınav kapsamındadır." },
    ],
  },
  {
    id: "ulusal-koordinasyon",
    moduleId: "mod1",
    order: 3,
    title: "Ulusal Koordinasyon ve Risk Belgeleri",
    officialQuestionCount: 2,
    bankQuestionCount: 3,
    summary:
      "Ulusal risk değerlendirmesi, strateji belgeleri ve koordinasyon kurulları risk temelli AML/CFT politikasının ülke seviyesindeki omurgasını kurar.",
    examPoint:
      "Risk değerlendirmesi sadece raporlama faaliyeti değildir; yükümlülerin politika, eğitim ve izleme önceliklerini etkiler.",
    confusion:
      "Ulusal risk ile müşteri bazlı risk aynı şey değildir; biri ülke ve sektör düzeyi, diğeri ilişki ve işlem düzeyidir.",
    sourceRef: "SPL Kılavuzu Modül 1.3, MASAK ulusal risk ve strateji duyuruları",
    keyCards: [
      { term: "Ulusal risk", detail: "Ülke, sektör, ürün ve kanal risklerinin bütünsel değerlendirilmesi." },
      { term: "Strateji belgesi", detail: "Öncelikli politika ve eylem alanlarını belirler." },
      { term: "Koordinasyon", detail: "Kamu kurumları arasında uygulama birliği sağlar." },
      { term: "Sınav ipucu", detail: "Risk temelli yaklaşım bütün modülleri birbirine bağlar." },
    ],
  },
  {
    id: "aklama",
    moduleId: "mod1",
    order: 4,
    title: "Suç Gelirlerinin Aklanması",
    officialQuestionCount: 8,
    bankQuestionCount: 10,
    summary:
      "Aklama; suçtan kaynaklanan malvarlığı değerinin kaynağını gizleme, dönüştürme, taşıma veya meşru görünüm kazandırma amacıyla yürütülen işlemler bütünüdür.",
    examPoint:
      "Yerleştirme, ayrıştırma ve bütünleştirme aşamaları ile TCK'daki aklama suçu birlikte çalışılmalıdır.",
    confusion:
      "Her karmaşık işlem aklama değildir; suç geliri bağlantısı ve gizleme/meşrulaştırma amacı aranır.",
    sourceRef: "SPL Kılavuzu Modül 1.4, 5549 sayılı Kanun, TCK 282",
    keyCards: [
      { term: "Yerleştirme", detail: "Suç gelirinin finansal sisteme sokulduğu aşama." },
      { term: "Ayrıştırma", detail: "Kaynakla bağın işlemler zinciriyle koparılmaya çalışılması." },
      { term: "Bütünleştirme", detail: "Gelirin meşru ekonomik varlık gibi kullanılması." },
      { term: "Tipoloji", detail: "ŞİB örnek olaylarıyla sınavda somutlaştırılır." },
    ],
  },
  {
    id: "terorizmin-finansmani",
    moduleId: "mod1",
    order: 5,
    title: "Terörizmin Finansmanı",
    officialQuestionCount: 9,
    bankQuestionCount: 11,
    summary:
      "Terörizmin finansmanında fonun kaynağı yasal da olabilir; belirleyici nokta fonun terör eylemi, örgütü veya teröristle bağlantılı amaçla kullanılmasıdır.",
    examPoint:
      "Aklamada kaynak suç geliri; terörizmin finansmanında kullanım amacı ve bağlantı ağı öne çıkar.",
    confusion:
      "Fon küçük tutarlı veya yasal kaynaklı diye risk otomatik düşmez; amaç ve bağlantı analizi gerekir.",
    sourceRef: "SPL Kılavuzu Modül 1.5, 6415 sayılı Kanun, FATF tavsiyeleri",
    keyCards: [
      { term: "Kaynak", detail: "Yasal veya yasa dışı olabilir." },
      { term: "Amaç", detail: "Terör eylemi, örgütü veya terörist bağlantısı belirleyicidir." },
      { term: "Dondurma", detail: "Malvarlığı üzerinde tasarruf yetkisini sınırlar." },
      { term: "Tipoloji", detail: "Bağış, transfer, nakit taşıma ve paravan yapı örnekleri sorulabilir." },
    ],
  },
  {
    id: "kisyf",
    moduleId: "mod1",
    order: 6,
    title: "KİSYF ve Finansal Yaptırımlar",
    officialQuestionCount: 4,
    bankQuestionCount: 5,
    summary:
      "Kitle imha silahlarının yayılmasının finansmanı, yaptırım listeleri, dondurma süreçleri ve finansal sistemin bu amaçla kullanılmasını önleyici kontrollerle birlikte değerlendirilir.",
    examPoint:
      "KİSYF soruları çoğunlukla yaptırım, dondurma, liste kontrolü ve bildirim refleksi üzerinden gelir.",
    confusion:
      "KİSYF, sadece klasik terörizmin finansmanı başlığına indirgenmemelidir; yayılma finansmanı ayrı risk alanıdır.",
    sourceRef: "SPL Kılavuzu Modül 1.6, 7262 sayılı Kanun, BM yaptırım rejimleri",
    keyCards: [
      { term: "PF", detail: "Proliferation financing, yayılmanın finansmanı riskidir." },
      { term: "Liste kontrolü", detail: "Yaptırım listeleriyle müşteri/işlem eşleşmesi aranır." },
      { term: "Dondurma", detail: "Hızlı ve etkili tasarruf kısıtı sağlar." },
      { term: "Uyum", detail: "Sistemsel tarama ve alarm yönetimi önemlidir." },
    ],
  },
  {
    id: "sib",
    moduleId: "mod1",
    order: 7,
    title: "Şüpheli İşlem Bildirimi",
    officialQuestionCount: 12,
    bankQuestionCount: 14,
    summary:
      "ŞİB; işlem konusu malvarlığının yasa dışı yollardan elde edildiğine veya yasa dışı amaçla kullanılacağına dair bilgi, şüphe veya şüpheyi gerektiren hususlar bulunduğunda MASAK'a yapılır.",
    examPoint:
      "Bildirim gizliliği, bildirim usulü, geri bildirim ve tipoloji okuma sınavın en yüksek ağırlıklı alanlarındandır.",
    confusion:
      "ŞİB kesin delil standardı gerektirmez; şüphe ve şüpheyi gerektiren husus yeterlidir. Müşteriye açıklanmaz.",
    sourceRef: "SPL Kılavuzu Modül 1.7, MASAK 13 Sıra No.lu Tebliğ, 2025 ŞİB rehberleri",
    keyCards: [
      { term: "Eşik", detail: "Bilgi, şüphe veya şüpheyi gerektiren husus." },
      { term: "Gizlilik", detail: "Müşteri dahil ilgililere açıklanamaz." },
      { term: "Usul", detail: "Uyum görevlisi olanlarda değerlendirme kanalı önemlidir." },
      { term: "Tipoloji", detail: "Örnek olaydan şüphe kriteri çıkarma becerisi ölçülür." },
    ],
  },
  {
    id: "islem-ertelemesi",
    moduleId: "mod1",
    order: 8,
    title: "İşlem Ertelemesi",
    officialQuestionCount: 6,
    bankQuestionCount: 6,
    summary:
      "İşlem ertelemesi, şüpheli işlemin gerçekleşmesini veya işlem konusu malvarlığının sistem dışına çıkmasını önlemek amacıyla istisnai ve süreli bir mekanizma olarak çalışır.",
    examPoint:
      "Şartlar, süreler, MASAK talimatı ve yükümlünün uygulama sorumluluğu birlikte bilinmelidir.",
    confusion:
      "Her ŞİB işlem ertelemesi anlamına gelmez; erteleme ayrı şartları olan müdahale mekanizmasıdır.",
    sourceRef: "SPL Kılavuzu Modül 1.8, 5549 ve ilgili MASAK düzenlemeleri",
    keyCards: [
      { term: "Amaç", detail: "Şüpheli malvarlığının kaçırılmasını önlemek." },
      { term: "Süre", detail: "Sınavda süre ve usul ayrımı özellikle sorulur." },
      { term: "ŞİB ilişkisi", detail: "ŞİB ile bağlantılıdır ama otomatik sonuç değildir." },
      { term: "Kayıt", detail: "Süreç ve gerekçeler belgelenmelidir." },
    ],
  },
  {
    id: "fintek-riskleri",
    moduleId: "mod1",
    order: 9,
    title: "Finansal Teknolojiler ve Gelişen Riskler",
    officialQuestionCount: 2,
    bankQuestionCount: 2,
    summary:
      "Elektronik para, ödeme sistemleri, açık bankacılık, API tabanlı hizmetler, kripto varlıklar ve dijital cüzdanlar hız, anonimlik ve sınır aşan işlem riskleri üretir.",
    examPoint:
      "Teknolojik risk tedbirleri, anomali izleme ve kripto/elektronik transfer bilgisinin izlenebilirliği birlikte değerlendirilmelidir.",
    confusion:
      "Dijital kanal düşük fiziksel temas anlamına gelir; düşük risk anlamına gelmez.",
    sourceRef: "SPL Kılavuzu Modül 1.9, Tedbirler Yönetmeliği teknolojik risk hükümleri",
    keyCards: [
      { term: "API", detail: "Açık bankacılık bağlantılarında erişim ve işlem riski." },
      { term: "Kripto", detail: "Cüzdan, transfer ve taraf bilgisi takibi öne çıkar." },
      { term: "Anomali", detail: "Davranış ve işlem örüntüsü izlenmelidir." },
      { term: "Hız", detail: "Anlık transferler erteleme ve izleme refleksini zorlaştırır." },
    ],
  },
  {
    id: "uyum-yonetimi",
    moduleId: "mod2",
    order: 10,
    title: "Uyum Yönetiminde Görev ve Sorumluluklar",
    officialQuestionCount: 14,
    bankQuestionCount: 16,
    summary:
      "Uyum yönetimi; uyum birimi, uyum görevlisi, lisanslama, kurum politikası, risk yönetimi, izleme-kontrol, eğitim ve iç denetim bileşenlerinin birlikte işletilmesidir.",
    examPoint:
      "Uyum görevlisi, yönetim kurulu, uyum birimi ve finansal grup sorumluluğu ayrımı sınavın omurgasıdır.",
    confusion:
      "Uyum programı tek bir doküman veya tek kişinin çabası değildir; kurumsal sistemdir.",
    sourceRef: "SPL Kılavuzu Modül 2.10, Uyum Programı Yönetmeliği",
    keyCards: [
      { term: "Uyum görevlisi", detail: "Yeterli yetkiyle donatılmış, uyumu izleyen ve bildirim sürecinde rol alan görevli." },
      { term: "Kurum politikası", detail: "Risk iştahı, prosedür ve kontrol çerçevesi." },
      { term: "Finansal grup", detail: "Grup seviyesinde bilgi paylaşımı ve uyum tedbirleri." },
      { term: "Eğitim", detail: "Personelin risk ve bildirim farkındalığını güncel tutar." },
    ],
  },
  {
    id: "denetim-idari-ceza",
    moduleId: "mod2",
    order: 11,
    title: "Yükümlülük Denetimi ve İdari Para Cezaları",
    officialQuestionCount: 7,
    bankQuestionCount: 8,
    summary:
      "Yükümlülük denetimi; yükümlülerin kanun, yönetmelik ve tebliğlerle getirilen önleyici tedbirlere uyumunun incelenmesi ve ihlallerde idari/adli yaptırım uygulanmasıdır.",
    examPoint:
      "Müşterinin tanınması, ŞİB ve devamlı bilgi verme ihlalleri ile gizlilik, bilgi-belge ve muhafaza ihlallerinin yaptırım türleri ayrılmalıdır.",
    confusion:
      "Her ihlal aynı yaptırıma tabi değildir; bazıları idari para cezası, bazıları adli sonuç doğurabilir.",
    sourceRef: "SPL Kılavuzu Modül 2.11, MASAK Yaptırımlar, 2026 ceza tutarları duyurusu",
    keyCards: [
      { term: "İdari ceza", detail: "Önleyici yükümlülük ihlallerinde uygulanır." },
      { term: "Adli ceza", detail: "Gizlilik, bilgi-belge ve muhafaza ihlallerinde gündeme gelebilir." },
      { term: "Denetim", detail: "Belgeler ve sistemsel kontroller birlikte incelenir." },
      { term: "2026 notu", detail: "İdari para cezası tutarları yeniden değerleme ile güncellenir." },
    ],
  },
  {
    id: "uzaktan-kimlik",
    moduleId: "mod2",
    order: 12,
    title: "Uzaktan Kimlik Tespiti",
    officialQuestionCount: 4,
    bankQuestionCount: 5,
    summary:
      "Uzaktan kimlik tespiti, müşteriyle fiziksel temas olmadan kimlik doğrulama, canlılık, belge ve temsil kontrolü gibi güvenlik adımlarıyla yürütülen risk temelli süreçtir.",
    examPoint:
      "27 Haziran 2026 tarihli MASAK Genel Tebliği Sıra No: 32 ile yabancı uyruklu gerçek kişiler ve yabancı temsilciler için uzaktan kimlik imkanı güncellendi.",
    confusion:
      "Uzaktan kimlik tespiti kolaylaştırma sağlar ama sıkılaştırılmış tedbir ihtiyacını ortadan kaldırmaz.",
    sourceRef: "SPL Kılavuzu Modül 2.12, MASAK Genel Tebliği Sıra No: 19 ve 32",
    keyCards: [
      { term: "Canlılık", detail: "Kimlik sahibinin gerçek zamanlı doğrulanması." },
      { term: "Belge doğrulama", detail: "Kimlik belgesi ve temsil yetkisi kontrol edilir." },
      { term: "Sıkı tedbir", detail: "Riskli durumlarda ek doğrulama aranır." },
      { term: "2026 notu", detail: "Pasaportla uzaktan kimlik tespiti değişikliği izlenmelidir." },
    ],
  },
  {
    id: "diger-yukumlulukler",
    moduleId: "mod2",
    order: 13,
    title: "Diğer Yükümlülükler ve Yükümlülerin Korunması",
    officialQuestionCount: 6,
    bankQuestionCount: 7,
    summary:
      "Devamlı bilgi verme, bilgi-belge verme, muhafaza ve ibraz, elektronik tebligat, erişim sistemi ve yükümlülerin korunması AML/CFT uyumunun tamamlayıcı yükümlülükleridir.",
    examPoint:
      "Muhafaza süresi, bilgi-belge verme yükümlülüğü ve ŞİB yapanların korunması birlikte sorulabilir.",
    confusion:
      "Özel kanun hükümleri çoğu durumda bilgi-belge vermekten kaçınma gerekçesi yapılamaz.",
    sourceRef: "SPL Kılavuzu Modül 2.13, MASAK Yükümlülükler sayfası, 5549 md. 6-9/A",
    keyCards: [
      { term: "Muhafaza", detail: "Belgeler ve kayıtlar belirlenen süre boyunca saklanır." },
      { term: "İbraz", detail: "Yetkili makam talep ettiğinde sunulur." },
      { term: "E-tebligat", detail: "MASAK tebligatlarının elektronik ortamda yapılabilmesi." },
      { term: "Koruma", detail: "Bildirim yapan yükümlü ve görevliler açısından hukuki koruma." },
    ],
  },
  {
    id: "musterinin-taninmasi",
    moduleId: "mod2",
    order: 14,
    title: "Müşterinin Tanınması",
    officialQuestionCount: 19,
    bankQuestionCount: 24,
    summary:
      "Müşterinin tanınması; kimlik tespiti, gerçek faydalanıcı, başkası adına işlem, sürekli izleme, riskli ülkeler, özel dikkat, elektronik/kripto transfer ve basitleştirilmiş/sıkılaştırılmış tedbirlerden oluşur.",
    examPoint:
      "Modül 2'nin en yüksek ağırlıklı alanıdır; kimlik tespiti, izleme, transfer bilgisi ve risk temelli tedbirler çok soru üretir.",
    confusion:
      "KYC yalnızca ilk açılışta kimlik almak değildir; ilişki boyunca güncelleme ve izleme gerektirir.",
    sourceRef: "SPL Kılavuzu Modül 2.14, Tedbirler Yönetmeliği md. 5-26/A",
    keyCards: [
      { term: "Kimlik tespiti", detail: "İşlem yapılmadan önce tarafların kimliği belirlenir." },
      { term: "Gerçek faydalanıcı", detail: "Tüzel yapıların arkasındaki nihai kontrol sahibi aranır." },
      { term: "Sürekli izleme", detail: "Müşteri profili ve işlemleri güncel riskle takip edilir." },
      { term: "Transferler", detail: "Elektronik ve kripto transferde taraf bilgisi izlenebilir olmalıdır." },
    ],
  },
];

export const sourceLinks: SourceLink[] = [
  {
    title: "SPL Uyum Görevlisi Yetkilendirme Sınavı Kılavuzu",
    url: "https://spl.com.tr/wp-content/uploads/2025/12/MASAK-Uyum-Gorevlisi-Yetkilendirme-Sinavi-Kilavuzu.pdf",
    note: "E-sınav, 50 soru, 45 dakika ve resmi konu dağılımı",
    kind: "Resmi",
  },
  {
    title: "SPL 10 Aralık 2025 E-Sınav Duyurusu",
    url: "https://spl.com.tr/uyum-gorevlisi-yetkilendirme-sinavi-hk-1/",
    note: "Sınavların elektronik ortamda yapılacağı duyurusu",
    kind: "Resmi",
  },
  {
    title: "MASAK Yükümlülükler",
    url: "https://masak.hmb.gov.tr/yukumlulukler",
    note: "KYC, ŞİB, uyum programı, muhafaza, devamlı bilgi ve e-tebligat",
    kind: "Resmi",
  },
  {
    title: "MASAK Yükümlülere İlişkin Mevzuat",
    url: "https://masak.hmb.gov.tr/yukumlulere-iliskin-mevzuat",
    note: "Kanun, yönetmelik ve tebliğ bağlantıları",
    kind: "Resmi",
  },
  {
    title: "MASAK Yaptırımlar",
    url: "https://masak.hmb.gov.tr/yaptirimlar",
    note: "İdari ve adli yaptırım çerçevesi, 2026 tutar duyurusu takibi",
    kind: "Resmi",
  },
  {
    title: "2025 ŞİB Rehberleri Güncellemesi",
    url: "https://masak.hmb.gov.tr/duyuru/supheli-islem-bildirim-rehberleri-guncellenmistir-rehberlere-buradan-erisim-saglayabilirsiniz",
    note: "Sektörel riskler ve 2025 ulusal risk değerlendirmesi bağlantılı rehberler",
    kind: "Resmi",
  },
  {
    title: "FATF Türkiye - Haziran 2024",
    url: "https://www.fatf-gafi.org/en/publications/High-risk-and-other-monitored-jurisdictions/increased-monitoring-june-2024.html",
    note: "Türkiye'nin artırılmış izleme sürecinden çıkarılması",
    kind: "Resmi",
  },
  {
    title: "mufettis.org MASAK Ders Notları",
    url: "https://mufettis.org/category/masak-uyum-gorevlisi-yetkilendirme-ders-notlari/",
    note: "Sınav anlatım formatı için yardımcı kaynak",
    kind: "Yardımcı",
  },
  {
    title: "MASAK_Rehber_12-01-2026.pdf",
    url: "#",
    note: "Yerel 317 sayfalık çalışma notu; içerik özetlenerek kullanılır",
    kind: "Yerel",
  },
  {
    title: "kitap-modül1ve2.docx",
    url: "#",
    note: "Yerel ders kitabı; modül başlıkları, tipoloji ve lisanslama notları için tarandı",
    kind: "Yerel",
  },
  {
    title: "Masak 500 Soru Çalışması Soru Cevap.pdf",
    url: "#",
    note: "Yerel soru çalışması; soru kalıpları ve konu yoğunluğu için analiz edildi, sorular birebir kullanılmaz",
    kind: "Yerel",
  },
];

const baseLessonContentById: Record<string, BaseLessonContent> = {
  "masak-gorevleri": {
    priority: "short",
    pdfRange: "MASAK_Rehber s. 1-6",
    coreNarrative:
      "MASAK'ın idari mali istihbarat rolü, görev sınırları ve koordinasyon kurulu ile ilişkisi bu dersin omurgasıdır. Sınavda MASAK'ın veriyi alan, analiz eden ve paylaşan yapı olduğunu; doğrudan adli soruşturma makamı gibi çalışmadığını ayırt etmek gerekir.",
    examFocus: "MASAK görevleri, denetim elemanı, koordinasyon kurulu ve adli makam ayrımı.",
    mustKnow: [
      "MASAK Hazine ve Maliye Bakanlığı içinde idari mali istihbarat fonksiyonu yürütür.",
      "Şüpheli işlem bildirimleri analiz edilir; dava açma veya mahkumiyet sonucu MASAK görevi değildir.",
      "Koordinasyon kurulu politika ve eşgüdüm işlevi görür.",
    ],
    confusions: [
      "MASAK'ın analiz yetkisi savcılık soruşturmasıyla karıştırılmaz.",
      "Denetim elemanı sadece MASAK personeli demek değildir.",
      "Uluslararası bilgi paylaşımı doğrudan yargısal karar etkisi doğurmaz.",
    ],
    casePattern:
      "Yükümlüden gelen bildirimde çok sayıda tutarsız işlem görülür. MASAK veriyi analiz eder, ilgili kurumlarla paylaşır ve gerekli hallerde adli makamlara bilgi aktarır.",
    legalAnchors: ["5549", "6415", "7262", "1 sayılı CBK"],
    reviewCards: [
      { term: "Ana rol", detail: "Bildirim alma, analiz, değerlendirme ve paylaşım." },
      { term: "Sınır", detail: "Adli soruşturma ve dava açma yetkisi yoktur." },
      { term: "Koordinasyon", detail: "Kurumlar arası AML/CFT politikasını destekler." },
      { term: "Denetim", detail: "Yükümlülük denetimi süreçleriyle bağlantılıdır." },
    ],
    miniQuizSeed: ["MASAK'ın doğrudan yapamayacağı işlem hangisidir?", "Koordinasyon kurulunun karıştırılan görevi nedir?"],
  },
  "uluslararasi-standartlar": {
    priority: "short",
    pdfRange: "MASAK_Rehber s. 7-41",
    coreNarrative:
      "Mali istihbarat birimi modelleri ve FATF sistemi birlikte çalışılır. Ana değer, MİB modellerinin avantaj/dezavantaj ayrımı ile FATF'in tavsiye, etkililik ve karşılıklı değerlendirme mantığını aynı çerçevede görmektir.",
    examFocus: "MİB modelleri, FATF 40 tavsiye, Egmont, MONEYVAL, gri/kara liste ve Türkiye süreci.",
    mustKnow: [
      "MİB modelleri kolluk, idari, adli/savcılık ve karma yapı olarak ayrılır.",
      "FATF standart koyar ve karşılıklı değerlendirme/takip süreci yürütür.",
      "Egmont mali istihbarat birimleri arasında güvenli bilgi paylaşım ağıdır.",
    ],
    confusions: [
      "Egmont kolluk örgütü değildir.",
      "FATF tavsiyeleri basit iyi uygulama metni gibi okunmaz.",
      "Gri listeden çıkış uyum yükümlülüklerinin bittiği anlamına gelmez.",
    ],
    casePattern:
      "Bir ülkede bildirimler alınıyor ama etkin analiz ve paylaşım yoksa FATF değerlendirmesinde teknik uyumdan bağımsız etkililik sorunu doğabilir.",
    legalAnchors: ["FATF Tavsiyeleri", "FATF Metodolojisi", "Egmont ilkeleri"],
    reviewCards: [
      { term: "İdari MİB", detail: "Yükümlü ile kolluk arasında uzman tampon işlevi kurar." },
      { term: "Kolluk MİB", detail: "Soruşturma refleksi hızlıdır; önleyici güven ilişkisi zayıflayabilir." },
      { term: "FATF", detail: "Standart, değerlendirme, izleme ve yüksek riskli ülke listeleri." },
      { term: "Egmont", detail: "MİB'ler arası güvenli bilgi değişim ağı." },
    ],
    miniQuizSeed: ["İdari tip MİB'in temel avantajı nedir?", "FATF'in karşılıklı değerlendirmesi neyi ölçer?"],
  },
  "ulusal-koordinasyon": {
    priority: "short",
    pdfRange: "MASAK_Rehber s. 42-58",
    coreNarrative:
      "Ulusal risk değerlendirmesi ve strateji belgeleri, yükümlülerin risk temelli yaklaşımını yönlendiren üst çerçevedir. Bu kısa konu, diğer derslerin neden risk temelli okunması gerektiğini açıklar.",
    examFocus: "Ulusal risk, strateji belgesi, KİSYF stratejisi ve sektör kırılganlığı.",
    mustKnow: [
      "Ulusal risk ülke/sektör düzeyi; müşteri riski ilişki/işlem düzeyidir.",
      "Strateji belgeleri eğitim, denetim, rehber ve koordinasyon önceliği yaratır.",
      "KİSYF risk değerlendirmesi ayrı başlık olarak izlenir.",
    ],
    confusions: [
      "Ulusal risk raporu yükümlünün kendi risk sınıflandırmasının yerine geçmez.",
      "KİSYF, TF içinde eritilecek tek bir alt konu değildir.",
      "Strateji belgesi sadece teorik arka plan değildir.",
    ],
    casePattern:
      "Bir sektör ulusal riskte yüksek kırılganlıkta görülürse o sektörde ŞİB rehberi, eğitim ve izleme kontrolleri daha yoğunlaşır.",
    legalAnchors: ["Ulusal Risk Değerlendirmesi", "AML/CFT Strateji Belgesi", "KİSYF Strateji Belgesi"],
    reviewCards: [
      { term: "Ulusal risk", detail: "Öncül suç, TF, sektör ve kırılganlık seviyesinde analiz." },
      { term: "Strateji", detail: "Amaç, hedef ve faaliyetleri uygulama takvimine bağlar." },
      { term: "Sektör riski", detail: "Yükümlünün iç risk yaklaşımına yön verir." },
      { term: "KİSYF", detail: "Yayılma finansmanı ayrı ulusal risk alanıdır." },
    ],
    miniQuizSeed: ["Ulusal risk ile müşteri riski hangi açıdan ayrılır?", "Strateji belgeleri yükümlü uygulamasını nasıl etkiler?"],
  },
  aklama: {
    priority: "high",
    pdfRange: "MASAK_Rehber s. 59-69",
    coreNarrative:
      "Aklamada iki eksen birlikte çalışılır: suç gelirinin meşru görünüm kazanma süreci ve TCK'daki suç yapısı. Aşamalar, yöntemler ve maddi/manevi unsur ayrımı sınav diline çevrilmelidir.",
    examFocus: "Yerleştirme-ayrıştırma-bütünleştirme, yöntemler, TCK 282, elkoyma ve öncül suç bağlantısı.",
    mustKnow: [
      "Yerleştirme gelirlerin sisteme ilk sokulduğu aşamadır.",
      "Ayrıştırma kaynakla bağın işlem zinciriyle koparılmasıdır.",
      "Bütünleştirme gelirlerin meşru ekonomik varlık gibi kullanılmasıdır.",
      "TCK 282 soruları öncül suç, hareket ve manevi unsur üzerinden gelir.",
      "Tipoloji sorusunda işlem amacı, profil ve ekonomik makuliyet birlikte okunur.",
    ],
    confusions: [
      "Her karmaşık işlem aklama değildir; suç geliri bağlantısı aranır.",
      "Yüksek tutar tek başına şüpheyi ispatlamaz.",
      "Ayrıştırma ve bütünleştirme sadece işlem sayısıyla ayrılmaz.",
      "Önleyici yükümlülük ihlali ile aklama suçu aynı şey değildir.",
    ],
    casePattern:
      "Geliriyle uyumsuz nakit hesaba yatırılır, farklı kişilere bölünür, kriptoya çevrilir ve sonra gayrimenkul alımına yönelirse aşamalar tek olayda birlikte görülebilir.",
    legalAnchors: ["TCK 282", "5549", "CMK elkoyma/müsadere bağlantısı"],
    reviewCards: [
      { term: "Placement", detail: "Nakit veya suç geliri sisteme sokulur." },
      { term: "Layering", detail: "Kaynak bağını koparmak için çok katmanlı işlem yapılır." },
      { term: "Integration", detail: "Gelir meşru yatırım veya varlık gibi görünür." },
      { term: "Öncül suç", detail: "Aklama suçunun dayanak gelir kaynağıdır." },
      { term: "Ekonomik makuliyet", detail: "Müşteri profili, faaliyet ve işlem amacıyla birlikte değerlendirilir." },
      { term: "Tipoloji", detail: "Sahte fatura, paravan şirket, kıymetli maden, kripto ve gayrimenkul örnekleri." },
    ],
    miniQuizSeed: ["Verilen olayda hangi aklama aşaması baskındır?", "Aklama suçu ile önleyici yükümlülük ihlali nasıl ayrılır?"],
  },
  "terorizmin-finansmani": {
    priority: "high",
    pdfRange: "MASAK_Rehber s. 70-110",
    coreNarrative:
      "Terörizmin finansmanında fonun kaynağından çok kullanım amacı ve bağlantı ağı belirleyicidir. Malvarlığının dondurulması ve BM yaptırım mekanizması bu başlıkla birlikte ele alınır.",
    examFocus: "6415, fon tanımı, yasak fiiller, yasal kaynak riski, malvarlığı dondurma ve BMGK kararları.",
    mustKnow: [
      "Fon yasal veya yasa dışı kaynaktan gelebilir.",
      "Belirleyici unsur fonun terör eylemi, örgütü veya bağlantılı kişi için kullanılma amacıdır.",
      "Düşük tutar veya bağış formu otomatik düşük risk değildir.",
      "Malvarlığı dondurma tasarrufu kısıtlayan önleyici nitelikte mekanizmadır.",
      "Ulusal liste ve BMGK listeleri sınavda birlikte sorulabilir.",
    ],
    confusions: [
      "TF'yi aklamadan sadece tutar büyüklüğüyle ayırmak hatalıdır.",
      "Yasal kaynaklı fonlarda riskin bittiği sanılmamalıdır.",
      "Dondurma mahkumiyet veya müsadere ile aynı kabul edilmez.",
      "Bağış/dernek yapısı tek başına masumiyet göstergesi değildir.",
    ],
    casePattern:
      "Küçük ama sık bağışlar, riskli bölge bağlantısı, açık ekonomik gerekçe olmaması ve alıcı ağındaki ilişkiler birlikte TF şüphesi yaratır.",
    legalAnchors: ["6415", "BMGK 1267/1373 rejimi", "FATF Tavsiye 5 ve 6"],
    reviewCards: [
      { term: "Fon", detail: "Para dışı ekonomik değerleri de kapsayan geniş kavramdır." },
      { term: "Amaç", detail: "TF'de kullanım amacı ve bağlantı ağı esastır." },
      { term: "Dondurma", detail: "Tasarruf yetkisini hızlı şekilde sınırlar." },
      { term: "Yasal kaynak", detail: "Kaynağın yasal olması TF riskini ortadan kaldırmaz." },
      { term: "BMGK", detail: "Liste kararları ulusal uygulamaya konu olur." },
      { term: "Tipoloji", detail: "Bağış, ticari işletme, nakit taşıma ve sınır aşan transferler." },
    ],
    miniQuizSeed: ["Yasal kaynaklı fon TF açısından ne zaman risklidir?", "Dondurma ile müsadere arasındaki temel ayrım nedir?"],
  },
  kisyf: {
    priority: "medium",
    pdfRange: "MASAK_Rehber s. 111-131",
    coreNarrative:
      "KİSYF, terörizmin finansmanından bağımsız bir yaptırım ve yayılma finansmanı alanıdır. Sınavda liste kontrolü, dondurma usulü, istisna ve itiraz mantığı öne çıkar.",
    examFocus: "7262, PF riski, BM yaptırımları, liste tarama, dondurma, muhafaza ve denetim.",
    mustKnow: [
      "KİSYF ayrı ulusal risk ve yaptırım alanı olarak izlenir.",
      "Liste kontrolü müşteri açılışıyla sınırlı değildir.",
      "Eşleşme yönetimi kayıt, araştırma ve hızlı aksiyon gerektirir.",
      "Dondurma kararında istisna ve itiraz başlıkları ayrıca bilinmelidir.",
    ],
    confusions: [
      "KİSYF sadece nükleer konu gibi dar okunmaz.",
      "Liste taraması tek seferlik işlem kabul edilmez.",
      "Hatalı eşleşme ile gerçek eşleşme aynı operasyonel tepkiyi doğurmaz.",
    ],
    casePattern:
      "Yaptırım listesine benzeyen unvanla gelen transferde yükümlü eşleşmeyi araştırır, kayıt altına alır ve gerçek eşleşmede dondurma/bildirim sürecini işletir.",
    legalAnchors: ["7262", "BMGK KİS kararları", "FATF Tavsiye 7"],
    reviewCards: [
      { term: "PF", detail: "Kitle imha silahlarının yayılmasının finansmanı." },
      { term: "Liste tarama", detail: "Müşteri, temsilci ve işlem taraflarını kapsar." },
      { term: "Dondurma", detail: "Liste eşleşmesinde tasarruf kısıtı sağlar." },
      { term: "İstisna", detail: "Dondurma kararının uygulamasında sınırlı izin alanları olabilir." },
    ],
    miniQuizSeed: ["KİSYF neden TF'den ayrı çalışılır?", "Liste eşleşmesinde ilk kontrol mantığı nedir?"],
  },
  sib: {
    priority: "high",
    pdfRange: "MASAK_Rehber s. 221-254",
    coreNarrative:
      "Şüpheli işlem bildirimi, kesin delil aramadan bilgi, şüphe veya şüpheyi gerektiren husus üzerinden çalışan önleyici mekanizmadır. Konu; bildirim şartı, süre, dahili akış, ihbar riski, gizlilik, koruma ve geri bildirim şeklinde çalışılmalıdır.",
    examFocus: "Şüphe eşiği, bildirilecek fiiller, süre, ŞİBF, MASAK Online, dahili bildirim, ifşa yasağı ve koruma.",
    mustKnow: [
      "ŞİB için parasal eşik aranmaz.",
      "İşlem teşebbüs aşamasında kalmış veya reddedilmiş olsa da şüphe varsa değerlendirme yapılır.",
      "Uyum görevlisi olan yükümlülerde dahili bildirim ve uyum görevlisi değerlendirmesi merkezi önemdedir.",
      "Bildirim yapıldığı müşteriye veya ilgililere açıklanamaz.",
      "Yeni bilgi çıkarsa ek bildirim mantığı çalışır.",
    ],
    confusions: [
      "ŞİB'i mahkumiyet veya kesin delil standardına bağlamak.",
      "Devamlı bilgi verme bildiriminin ŞİB'i ortadan kaldırdığını düşünmek.",
      "Müşteriye açıklama yapılabileceğini sanmak.",
      "Şüpheli işlem tiplerine uymayan olayda bildirim yapılamayacağını sanmak.",
    ],
    casePattern:
      "Müşteri olağan profilinden saparak sık ve parçalı transferler yapıyor, açıklama vermekten kaçınıyor ve işlem ekonomik gerekçeyle açıklanamıyorsa ŞİB değerlendirmesi yapılır.",
    legalAnchors: ["5549 md. 4", "Tedbirler Yönetmeliği md. 27", "MASAK 13 Sıra No.lu Tebliğ", "FATF Tavsiye 20 ve 21"],
    reviewCards: [
      { term: "Şüphe eşiği", detail: "Bilgi, şüphe veya şüpheyi gerektiren husus yeterlidir." },
      { term: "Parasal eşik", detail: "ŞİB için tutar sınırı aranmaz." },
      { term: "Dahili bildirim", detail: "Uyum görevlisi olan yapılarda iç değerlendirme kanalını başlatır." },
      { term: "İhbar riski", detail: "Müşterinin bildirimden şüphelenmesine yol açılmamalıdır." },
      { term: "Gizlilik", detail: "Bildirim yapıldığı ilgililere açıklanamaz." },
      { term: "Koruma", detail: "İyi niyetli bildirim yapanlar hukuki koruma altındadır." },
    ],
    miniQuizSeed: ["ŞİB için parasal eşik aranır mı?", "Bildirim gizliliği hangi durumda ihlal edilir?"],
  },
  "islem-ertelemesi": {
    priority: "medium",
    pdfRange: "MASAK_Rehber s. 255-258",
    coreNarrative:
      "İşlem ertelemesi ŞİB'in otomatik sonucu değildir; şüpheli malvarlığının sistem dışına çıkmasını önlemeye yarayan istisnai ve süreli bir müdahaledir.",
    examFocus: "Erteleme şartları, süre, MASAK talimatı, imtina, ihbar riski ve kayıt.",
    mustKnow: [
      "Her ŞİB işlem ertelemesi doğurmaz.",
      "Gecikmesinde sakınca bulunan haller ayrı değerlendirilir.",
      "Müşteriye bildirim yapılması ifşa riskini doğurabilir.",
      "Erteleme süreci kayıt ve gerekçe gerektirir.",
    ],
    confusions: [
      "Ertelemeyi yükümlünün sınırsız takdir yetkisi sanmak.",
      "Şüpheli işlemi müşteriye açıklayarak zaman kazanılabileceğini düşünmek.",
      "İşlem gerçekleşmediyse kayıt ve ŞİB değerlendirmesi gerekmeyeceğini sanmak.",
    ],
    casePattern:
      "Çıkış talimatı verilen yüksek riskli transferde fonun hızla taşınacağı anlaşılırsa ŞİB, imtina ve MASAK talimatı birlikte değerlendirilir.",
    legalAnchors: ["5549", "İşlemlerin Ertelenmesi düzenlemeleri", "ŞİB gizliliği"],
    reviewCards: [
      { term: "Erteleme", detail: "Şüpheli malvarlığının kaçırılmasını önlemeye yönelir." },
      { term: "ŞİB ilişkisi", detail: "Bağlantılıdır ama otomatik sonuç değildir." },
      { term: "İhbar riski", detail: "Müşteriye şüpheyi hissettiren davranıştan kaçınılır." },
      { term: "Kayıt", detail: "Gerekçe ve süreç belgelenir." },
    ],
    miniQuizSeed: ["Her ŞİB neden otomatik erteleme sayılmaz?", "İhbar riski hangi davranışta doğar?"],
  },
  "fintek-riskleri": {
    priority: "medium",
    pdfRange: "MASAK_Rehber s. 134-151 ve 210-226",
    coreNarrative:
      "Fintek başlığı ödeme sistemleri, elektronik para, açık bankacılık ve kripto varlıkları AML/CFT açısından bağlar. Sınavda özellikle kripto transferlerinde seyahat kuralı ve bilgi eksikliği tepkisi öne çıkar.",
    examFocus: "Ödeme sistemleri, e-para, API, KVHS, seyahat kuralı, 15.000 TL eşiği ve sıkı tedbir.",
    mustKnow: [
      "Dijital kanal düşük risk değil, farklı risk demektir.",
      "KVHS'lerde kimlik tespiti ve transfer bilgisi izlenebilir olmalıdır.",
      "15.000 TL ve üzeri kripto transferlerde gönderen bilgilerinin doğruluğu ayrıca teyit edilir.",
      "Sürekli eksik bilgi gönderen sağlayıcıya karşı sınırlandırma veya ilişki sonlandırma gündeme gelebilir.",
    ],
    confusions: [
      "Kriptoyu sadece yatırım ürünü gibi görüp AML kontrollerini atlamak.",
      "Açık bankacılık rızasını AML yükümlülüklerinin yerine koymak.",
      "Kriptoyla ödeme yasağı ile KVHS faaliyetini aynı şey sanmak.",
    ],
    casePattern:
      "KVHS transfer mesajlarında gönderen/alıcı bilgileri eksik geliyorsa işlem, müşteri ilişkisi ve karşı sağlayıcı riski birlikte değerlendirilir.",
    legalAnchors: ["Tedbirler Yönetmeliği kripto transfer hükümleri", "FATF Tavsiye 15 ve 16", "Ödeme/e-para mevzuatı"],
    reviewCards: [
      { term: "KVHS", detail: "Kripto alım-satım, saklama veya transfer hizmeti sağlayabilir." },
      { term: "Travel rule", detail: "Transfer taraf bilgisi mesajla birlikte izlenir." },
      { term: "15.000 TL", detail: "Gönderen bilgilerinin doğruluğu teyit eşiği." },
      { term: "Açık bankacılık", detail: "Rıza ve API güvenliği AML izlemeyi tamamlar, yerine geçmez." },
    ],
    miniQuizSeed: ["Kripto transfer mesajında eksik bilgi varsa ne yapılır?", "Dijital kanal neden otomatik düşük risk değildir?"],
  },
  "uyum-yonetimi": {
    priority: "high",
    pdfRange: "MASAK_Rehber s. 244-279 ve 290-294",
    coreNarrative:
      "Uyum yönetimi, tek kişinin bildirim yapmasından ibaret değildir; kurum politikası, risk yönetimi, izleme-kontrol, eğitim, iç denetim, uyum görevlisi ve yönetim kurulu sorumluluğundan oluşan sistemdir.",
    examFocus: "Uyum programı, yönetim kurulu, uyum görevlisi/yaveri, finansal grup, münhasır görev, lisans, yenileme ve sicil.",
    mustKnow: [
      "Uyum programının bütününden nihai olarak yönetim kurulu sorumludur.",
      "Uyum görevlisi ŞİB değerlendirmesinde merkezi roldedir; uyum birimi personeli doğrudan MASAK'a karar vermez.",
      "Risk yönetimi, izleme-kontrol ve iç denetim farklı fonksiyonlardır.",
      "Finansal grupta bilgi paylaşımı mümkündür; ŞİB yapıldığı bilgisi gizlilik kapsamındadır.",
      "Lisans geçerliliği sınav tarihiyle başlar; yenileme ve askı/iptal döngüsü takip edilir.",
    ],
    confusions: [
      "Yetki devrinin yönetim kurulunun nihai sorumluluğunu kaldırdığını sanmak.",
      "İzleme-kontrol ile iç denetimi aynı faaliyet saymak.",
      "Grup içi bilgi paylaşımı serbestliğini ŞİB bilgisini de kapsar sanmak.",
      "Uyum görevlisinin çıkar çatışmalı operasyonel görevlerde bulunabileceğini düşünmek.",
    ],
    casePattern:
      "Yönetim kurulu gözetim yetkisini bir üyeye devretse bile, uyum programındaki eksikliklerden doğan nihai sorumluluk kurul seviyesinde kalır.",
    legalAnchors: ["Uyum Yönetmeliği", "MASAK Genel Tebliği Sıra No: 30", "5549 md. 5"],
    reviewCards: [
      { term: "Yönetim kurulu", detail: "Uyum programının etkinliğinden nihai sorumludur." },
      { term: "Uyum görevlisi", detail: "ŞİB değerlendirme ve MASAK bildirim sürecinde merkezi rol." },
      { term: "Risk yönetimi", detail: "Müşteri, hizmet ve ülke riski sınıflandırılır." },
      { term: "İzleme-kontrol", detail: "İşlemler devam ederken sıcak takip yapılır." },
      { term: "İç denetim", detail: "Sistemi geriye dönük ve bağımsız test eder." },
      { term: "Sicil", detail: "Lisanslı uyum görevlileri MASAK sicilinde izlenir." },
    ],
    miniQuizSeed: ["Yetki devri sorumluluğu kime bırakır?", "İç denetim ile izleme-kontrol nasıl ayrılır?"],
  },
  "denetim-idari-ceza": {
    priority: "medium",
    pdfRange: "MASAK_Rehber s. 294-313",
    coreNarrative:
      "Bu ders yükümlülük denetiminin ve yaptırımların sistematiğini kurar. En kritik ayrım, hangi ihlalin idari para cezası; hangisinin adli ceza sonucuna gidebileceğidir.",
    examFocus: "Yükümlülük denetimi, idari ceza, adli ceza, ceza tavanı, elektronik tebligat ve yargı yolu.",
    mustKnow: [
      "Müşterinin tanınması, ŞİB ve devamlı bilgi verme ihlalleri idari ceza mantığında sorulur.",
      "ŞİB gizliliği, bilgi-belge verme ve muhafaza-ibraz ihlalleri adli ceza riski doğurabilir.",
      "Finansal kuruluşlarda ceza miktarı ve tavan mantığı ayrıca değerlendirilir.",
      "Uyum yükümlülükleri ihlalinde uyarı/süre/yaptırım akışı bilinmelidir.",
    ],
    confusions: [
      "Tüm ihlallerin aynı yaptırıma tabi olduğunu düşünmek.",
      "ŞİB gizliliği ihlalini sadece idari ceza saymak.",
      "Ceza tutarını ezberleyip yaptırım türünü kaçırmak.",
    ],
    casePattern:
      "Kimlik tespiti yapılmaması idari ceza alanındayken, bildirim yapıldığının müşteriye söylenmesi adli ceza riskini doğurur.",
    legalAnchors: ["5549 md. 13", "5549 md. 14", "5326", "MASAK yaptırımlar"],
    reviewCards: [
      { term: "İdari ceza", detail: "KYC, ŞİB, devamlı bilgi ve uyum yükümlülüklerinde gündeme gelir." },
      { term: "Adli ceza", detail: "Gizlilik, bilgi-belge ve muhafaza-ibraz ihlalinde gündeme gelebilir." },
      { term: "Denetim", detail: "Belgeler, kayıtlar ve sistemsel kontroller incelenir." },
      { term: "Tavan", detail: "Yükümlü türüne ve yıla göre sınır mantığı vardır." },
    ],
    miniQuizSeed: ["Hangi ihlal adli ceza riski taşır?", "Finansal kuruluşlarda idari ceza neden farklılaşır?"],
  },
  "uzaktan-kimlik": {
    priority: "short",
    pdfRange: "MASAK_Rehber s. 296 ve Tebliğ 19/32 notları",
    coreNarrative:
      "Uzaktan kimlik tespiti, fiziki temas olmadan müşteri kabulünde kimlik, canlılık, temsil ve risk bilgilerinin güvenli şekilde doğrulanmasıdır. Kolaylaştırma sağlar ama KYC disiplinini kaldırmaz.",
    examFocus: "Tebliğ 19/32, canlılık, belge doğrulama, fon kaynağı, tahmini hacim ve sıkı tedbir.",
    mustKnow: [
      "Uzaktan süreçte müşteri profili ve risk değerlendirmesi baştan alınır.",
      "Fon kaynağı, işlem amacı ve tahmini hacim bilgisi risk sınıflamasına hizmet eder.",
      "Risk yükselirse sıkılaştırılmış tedbir gerekir.",
    ],
    confusions: [
      "Kimlik görüntüsünün tek başına yeterli olduğunu sanmak.",
      "Uzaktan kimliği basitleştirilmiş tedbir gibi okumak.",
      "2026 pasaport/temsil değişikliğini genel KYC kuralıyla karıştırmak.",
    ],
    casePattern:
      "Yabancı uyruklu müşteri uzaktan hesap açarken belge, canlılık, fon kaynağı ve işlem profili birlikte değerlendirilir; yüksek riskte ek doğrulama aranır.",
    legalAnchors: ["MASAK Genel Tebliği Sıra No: 19", "MASAK Genel Tebliği Sıra No: 32", "Tedbirler Yönetmeliği"],
    reviewCards: [
      { term: "Canlılık", detail: "Kimlik sahibinin gerçek zamanlı doğrulanması." },
      { term: "Profil", detail: "Amaç, fon kaynağı, gelir ve tahmini hacim alınır." },
      { term: "Sıkı tedbir", detail: "Dijital kanal yüksek riskte ek kontrol gerektirir." },
      { term: "2026 notu", detail: "Tebliğ 32 güncellemesi izlenir." },
    ],
    miniQuizSeed: ["Uzaktan kimlikte hangi bilgiler risk değerlendirmesine girer?", "Uzaktan süreç hangi yükümlülüğü ortadan kaldırmaz?"],
  },
  "diger-yukumlulukler": {
    priority: "short",
    pdfRange: "MASAK_Rehber s. 280-297",
    coreNarrative:
      "Diğer yükümlülükler dersinde devamlı bilgi, bilgi-belge, muhafaza-ibraz, elektronik tebligat ve koruma hükümleri sınav mantığıyla toparlanır. Bu alan genellikle süre, kapsam ve istisna ayrımıyla sorulur.",
    examFocus: "Devamlı bilgi, bilgi-belge, muhafaza ve ibraz, e-tebligat, erişim sistemi ve koruma.",
    mustKnow: [
      "Bilgi ve belge talebinde özel kanun hükümleri çoğu durumda kaçınma gerekçesi yapılamaz.",
      "Muhafaza süresi belgenin türüne göre farklı başlangıç mantığıyla işler.",
      "ŞİB/dahili bildirim kayıtları da muhafaza kapsamındadır.",
    ],
    confusions: [
      "Muhafaza süresini tüm belgelerde aynı tarihten başlatmak.",
      "E-tebligatı sadece teknik başvuru kabul etmek.",
      "Koruma hükmünü müşteriye açıklama izni gibi yorumlamak.",
    ],
    casePattern:
      "Hesap kapatıldıktan sonra kimlik tespit belgelerinin saklama başlangıcı hesap kapanışına göre değerlendirilir; ŞİB kayıtları da ayrıca saklanır.",
    legalAnchors: ["5549 md. 6-9/A", "Tedbirler Yönetmeliği md. 46", "Elektronik Tebligat düzenlemeleri"],
    reviewCards: [
      { term: "Bilgi-belge", detail: "Yetkili talebe karşı özel kanun savunması sınırlıdır." },
      { term: "Muhafaza", detail: "Belgeler ve kayıtlar belirlenen süre saklanır." },
      { term: "İbraz", detail: "Talep edildiğinde yetkili makama sunulur." },
      { term: "Koruma", detail: "İyi niyetli bildirim yapanlar hukuken korunur." },
    ],
    miniQuizSeed: ["Muhafaza süresi hangi tarihten başlar?", "Özel kanun hükmü bilgi-belge vermeyi engeller mi?"],
  },
  "musterinin-taninmasi": {
    priority: "high",
    pdfRange: "MASAK_Rehber s. 165-226",
    coreNarrative:
      "Müşterinin tanınması Modül 2'nin en ağır dersidir. Konu yalnız kimlik almak değildir; ilişki kurulmadan önce kimlik/temsil/gerçek faydalanıcı tespiti, ilişki boyunca sürekli izleme ve risk durumuna göre basitleştirilmiş veya sıkılaştırılmış tedbir uygulamasıdır.",
    examFocus: "Kimlik tespiti, gerçek faydalanıcı, başkası adına işlem, özel dikkat, sürekli izleme, riskli ülke, muhabirlik, üçüncü tarafa güven, elektronik/kripto transfer, SDD/EDD.",
    mustKnow: [
      "Kimlik tespiti işlem yapılmadan önce tamamlanmalıdır.",
      "Gerçek faydalanıcı tüzel yapının arkasındaki nihai kontrol sahibini arar.",
      "Başkası adına veya hesabına işlemde hem işlemi yapan hem hesabına hareket edilen kişi değerlendirilir.",
      "Sürekli izleme müşteri profili, fon kaynağı ve işlem davranışını güncel tutar.",
      "Riskli ülke, kamusal nüfuz sahibi kişi, KVHS ilişkisi ve olağan dışı işlem sıkı tedbir doğurabilir.",
      "Basitleştirilmiş tedbir şüphe halinde uygulanmaz.",
    ],
    confusions: [
      "KYC'yi sadece ilk açılışta kimlik almak sanmak.",
      "Gerçek faydalanıcıyı işlemi fiilen yapan kişiyle karıştırmak.",
      "İşlem reddedildiyse ŞİB değerlendirmesinin gerekmeyeceğini düşünmek.",
      "SDD ve EDD hallerini ters yorumlamak.",
      "Elektronik transfer ile kripto transfer bilgi yüklerini aynı kabul etmek.",
    ],
    casePattern:
      "Müşterinin beyan ettiği faaliyet ve gelirle uyumsuz transferler, sık aralıklarla farklı alıcılara yöneliyorsa amaç/fon kaynağı sorulur, profil güncellenir ve şüphe varsa ŞİB değerlendirmesine gidilir.",
    legalAnchors: ["Tedbirler Yönetmeliği md. 5-26/A", "5549 md. 3", "FATF Tavsiye 10, 12, 13, 16, 17, 19"],
    reviewCards: [
      { term: "Kimlik tespiti", detail: "İşlem öncesi taraf kimliği belirlenir ve teyit edilir." },
      { term: "Gerçek faydalanıcı", detail: "Nihai kontrol sahibi kişi aranır." },
      { term: "Başkasına işlem", detail: "İşlemi yapan ve hesabına hareket edilen kişi birlikte incelenir." },
      { term: "Sürekli izleme", detail: "Profil, fon kaynağı ve işlem amacı ilişki boyunca güncel tutulur." },
      { term: "Özel dikkat", detail: "Makul ekonomik amacı olmayan işlemler yakından incelenir." },
      { term: "Riskli ülke", detail: "FATF ve ulusal risk göstergeleriyle sıkı tedbir doğurabilir." },
      { term: "SDD", detail: "Düşük riskli ve mevzuatta izin verilen hallerde uygulanır." },
      { term: "EDD", detail: "Yüksek riskte ek bilgi, onay ve izleme gerektirir." },
    ],
    miniQuizSeed: ["Gerçek faydalanıcı ile temsilci nasıl ayrılır?", "Şüphe varsa basitleştirilmiş tedbir uygulanabilir mi?"],
  },
};

type LessonV4Blueprint = {
  deepDiveTitles: string[];
  tableThemes: string[];
  caseThemes: string[];
  glossary: KeyCard[];
};

const lessonV4Blueprints: Record<string, LessonV4Blueprint> = {
  "masak-gorevleri": {
    deepDiveTitles: ["MASAK'ın idari MİB konumu", "Bildirim alma ve analiz döngüsü", "Kurumlar arası bilgi paylaşımı", "Denetim elemanı ve yükümlülük denetimi", "Koordinasyon kurulu ile görev ayrımı"],
    tableThemes: ["MASAK, savcılık ve yükümlü ayrımı"],
    caseThemes: ["Şüpheli işlemden adli makama giden analiz zinciri"],
    glossary: [{ term: "İdari MİB", detail: "Bildirim, analiz ve paylaşım merkezli mali istihbarat modeli." }],
  },
  "uluslararasi-standartlar": {
    deepDiveTitles: ["MİB modelleri", "FATF tavsiyelerinin sınav değeri", "Karşılıklı değerlendirme ve etkililik", "Gri liste, kara liste ve takip süreçleri", "Egmont güvenli bilgi ağı", "MONEYVAL ve bölgesel yapılar"],
    tableThemes: ["MİB modelleri karşılaştırması", "FATF, Egmont ve MONEYVAL ayrımı"],
    caseThemes: ["Teknik uyum var ama etkililik zayıfsa ne olur?"],
    glossary: [{ term: "Etkililik", detail: "Sistemin kağıt üzerinde değil sonuç üretme kapasitesidir." }],
  },
  "ulusal-koordinasyon": {
    deepDiveTitles: ["Ulusal risk değerlendirmesi", "Sektör kırılganlığı", "Strateji belgelerinin yükümlüye etkisi", "KİSYF riskinin ayrı izlenmesi", "ŞİB rehberlerinin risk temelli güncellenmesi"],
    tableThemes: ["Ulusal risk ve müşteri riski ayrımı"],
    caseThemes: ["Yüksek riskli sektörün uyum programına etkisi"],
    glossary: [{ term: "Sektör kırılganlığı", detail: "Ürün, kanal, müşteri ve ülke risklerinin sektör düzeyindeki görünümü." }],
  },
  aklama: {
    deepDiveTitles: ["Aklama suçunun sınav mantığı", "Yerleştirme aşaması", "Ayrıştırma aşaması", "Bütünleştirme aşaması", "Öncül suç ve malvarlığı değeri", "Tipoloji okuma yöntemi", "Ekonomik makuliyet testi", "Elkoyma ve müsadere bağlantısı", "Önleyici yükümlülük ile suç ayrımı"],
    tableThemes: ["Aklama aşamaları", "Aklama suçu ve yükümlülük ihlali ayrımı", "Tipoloji göstergeleri"],
    caseThemes: ["Nakitten gayrimenkule giden çok aşamalı yapı", "Paravan şirket ve sahte fatura örüntüsü", "Kripto dönüşümüyle kaynak gizleme"],
    glossary: [{ term: "Öncül suç", detail: "Aklamaya konu malvarlığı değerini doğuran suçtur." }],
  },
  "terorizmin-finansmani": {
    deepDiveTitles: ["TF'de kaynak değil amaç belirleyicidir", "Fon kavramının genişliği", "Yasal kaynaklı fon riski", "Düşük tutarlı transfer örüntüleri", "Dernek ve bağış yapıları", "Malvarlığı dondurma", "BMGK liste mekanizması", "TF ile aklama ayrımı", "Uluslararası yaptırım bağlantısı"],
    tableThemes: ["Aklama ve TF karşılaştırması", "Dondurma, müsadere ve elkoyma ayrımı", "TF risk göstergeleri"],
    caseThemes: ["Küçük tutarlı bağışların riskli bölge bağlantısı", "Paravan ticari işletme üzerinden fon aktarımı", "Liste eşleşmesinde hızlı karar ihtiyacı"],
    glossary: [{ term: "Amaç unsuru", detail: "Fonun terör eylemi, örgütü veya bağlantılı kişi için kullanılma hedefidir." }],
  },
  kisyf: {
    deepDiveTitles: ["Yayılma finansmanı riski", "KİSYF'nin TF'den ayrılması", "Liste tarama disiplini", "Gerçek ve hatalı eşleşme", "Dondurma kararının uygulanması", "İstisna ve itiraz mantığı"],
    tableThemes: ["TF ve KİSYF ayrımı", "Liste eşleşmesi karar tablosu"],
    caseThemes: ["Benzer unvanlı tarafla yaptırım listesi eşleşmesi", "Dondurulmuş varlık üzerinde işlem talebi"],
    glossary: [{ term: "PF", detail: "Kitle imha silahlarının yayılmasının finansmanıdır." }],
  },
  sib: {
    deepDiveTitles: ["Şüphe eşiği", "Parasal eşik bulunmaması", "Dahili bildirim akışı", "Uyum görevlisinin değerlendirmesi", "MASAK Online ve ŞİBF mantığı", "Süre ve gecikmesinde sakınca", "Gizlilik ve ihbar yasağı", "Koruma hükümleri", "Ek bildirim", "İşlem ertelemesiyle ilişki"],
    tableThemes: ["ŞİB, dahili bildirim ve işlem ertelemesi ayrımı", "Gizlilik, koruma ve ihbar yasağı", "Şüphe göstergesi değerlendirme tablosu"],
    caseThemes: ["Profil dışı parçalı transferler", "Reddedilen işlemde ŞİB değerlendirmesi", "Müşteriye bilgi verme riskinin doğduğu an"],
    glossary: [{ term: "İhbar yasağı", detail: "Bildirim yapıldığının veya yapılacağının ilgili kişilere açıklanmamasıdır." }],
  },
  "islem-ertelemesi": {
    deepDiveTitles: ["Ertelemenin istisnai niteliği", "ŞİB ile otomatik bağ kurulmaması", "MASAK talimatı ve süre", "İmtina ve erteleme ayrımı", "Müşteriye açıklama riski", "Kayıt ve gerekçe"],
    tableThemes: ["ŞİB, imtina ve erteleme ayrımı", "Erteleme karar adımları"],
    caseThemes: ["Hızla çıkış yapılacak yüksek riskli transfer", "Şüpheli işlemde müşteriye açıklama baskısı"],
    glossary: [{ term: "İmtina", detail: "Yükümlünün mevzuat gereği işlemi gerçekleştirmekten kaçınmasıdır." }],
  },
  "fintek-riskleri": {
    deepDiveTitles: ["Dijital kanal risk mantığı", "Ödeme ve elektronik para kuruluşları", "Açık bankacılık ve API riski", "KVHS müşteri kabulü", "Kripto transferlerinde seyahat kuralı", "Eksik bilgi gönderen sağlayıcı", "15.000 TL teyit eşiği"],
    tableThemes: ["Elektronik transfer ve kripto transfer ayrımı", "Dijital ürün riskleri"],
    caseThemes: ["Eksik taraf bilgisiyle gelen kripto transferi", "API kanalında olağan dışı işlem yoğunluğu"],
    glossary: [{ term: "Travel rule", detail: "Transfer taraf bilgilerinin transfer mesajıyla birlikte izlenmesi kuralıdır." }],
  },
  "uyum-yonetimi": {
    deepDiveTitles: ["Uyum programının unsurları", "Yönetim kurulu sorumluluğu", "Uyum görevlisi ve yardımcısı", "Risk yönetimi", "İzleme ve kontrol", "İç denetim", "Eğitim ve kurum politikası", "Finansal grup paylaşımı", "Münhasır görev ve çıkar çatışması", "Lisans, yenileme ve sicil"],
    tableThemes: ["Risk yönetimi, izleme-kontrol ve iç denetim ayrımı", "Yönetim kurulu ve uyum görevlisi sorumlulukları", "Lisans ve sicil akışı"],
    caseThemes: ["Yetki devrine rağmen yönetim kurulu sorumluluğu", "Grup içi bilgi paylaşımında ŞİB gizliliği", "İzleme raporunun iç denetim bulgusuna dönüşmesi"],
    glossary: [{ term: "Uyum programı", detail: "Politika, risk yönetimi, izleme, eğitim, iç denetim ve bildirim sisteminin bütünüdür." }],
  },
  "denetim-idari-ceza": {
    deepDiveTitles: ["Yükümlülük denetiminin kapsamı", "İdari para cezası mantığı", "Adli ceza riski taşıyan ihlaller", "Ceza tavanı ve yükümlü türü", "Uyarı ve süre verilmesi", "Elektronik tebligat ve yargı yolu"],
    tableThemes: ["İdari ve adli ceza ayrımı", "İhlal türü ve yaptırım mantığı"],
    caseThemes: ["Kimlik tespiti ihlali ile ŞİB gizliliği ihlali karşılaştırması", "Denetimde bilgi-belge ibraz edilmemesi"],
    glossary: [{ term: "Yükümlülük denetimi", detail: "Kayıt, belge ve sistemlerin AML/CFT mevzuatına uygunluğunun incelenmesidir." }],
  },
  "uzaktan-kimlik": {
    deepDiveTitles: ["Uzaktan kimliğin KYC içindeki yeri", "Belge ve canlılık doğrulaması", "Temsil ve yetki kontrolü", "Fon kaynağı ve işlem amacı", "Yüksek riskte sıkı tedbir"],
    tableThemes: ["Yüz yüze ve uzaktan kimlik ayrımı"],
    caseThemes: ["Yabancı müşteri için uzaktan hesap açılışı"],
    glossary: [{ term: "Canlılık kontrolü", detail: "Kimlik sahibinin gerçek zamanlı ve gerçek kişi olarak doğrulanmasıdır." }],
  },
  "diger-yukumlulukler": {
    deepDiveTitles: ["Devamlı bilgi verme", "Bilgi ve belge verme", "Muhafaza ve ibraz", "Elektronik tebligat", "Erişim sistemi", "Koruma hükümleri"],
    tableThemes: ["Bilgi-belge, muhafaza ve ibraz ayrımı"],
    caseThemes: ["Kapanan hesap belgelerinin saklama başlangıcı"],
    glossary: [{ term: "İbraz", detail: "Yetkili makam talep ettiğinde kayıt ve belgelerin sunulmasıdır." }],
  },
  "musterinin-taninmasi": {
    deepDiveTitles: ["Kimlik tespitinin zamanı", "Gerçek faydalanıcı tespiti", "Başkası adına işlem", "Tüzel kişi ve temsil yetkisi", "Sürekli izleme", "Özel dikkat gerektiren işlemler", "Riskli ülke ve KEP/KPEP riski", "Muhabirlik ilişkileri", "Üçüncü tarafa güven", "Basitleştirilmiş tedbir", "Sıkılaştırılmış tedbir", "Elektronik ve kripto transfer bilgileri"],
    tableThemes: ["Kimlik, temsilci ve gerçek faydalanıcı ayrımı", "SDD ve EDD ayrımı", "Elektronik transfer ve kripto transfer bilgi yükleri"],
    caseThemes: ["Gerçek faydalanıcıyı gizleyen çok ortaklı yapı", "Profil dışı transferlerde sürekli izleme", "Şüphe halinde basitleştirilmiş tedbirin kapanması"],
    glossary: [{ term: "Gerçek faydalanıcı", detail: "Tüzel yapı veya işlem üzerinde nihai kontrolü bulunan gerçek kişidir." }],
  },
};

const densityByPriority: Record<LessonPriority, { deepDive: number; tables: number; cases: number; pitfalls: number; quiz: number; minutes: number }> = {
  high: { deepDive: 8, tables: 2, cases: 3, pitfalls: 8, quiz: 10, minutes: 45 },
  medium: { deepDive: 5, tables: 1, cases: 2, pitfalls: 6, quiz: 6, minutes: 30 },
  short: { deepDive: 4, tables: 1, cases: 1, pitfalls: 4, quiz: 4, minutes: 20 },
};

function fillTo<T>(items: T[], count: number, makeItem: (index: number) => T) {
  const filled = [...items];
  while (filled.length < count) {
    filled.push(makeItem(filled.length));
  }
  return filled.slice(0, count);
}

function buildDeepDiveSections(lesson: Lesson, base: BaseLessonContent, blueprint: LessonV4Blueprint, target: number): DeepDiveSection[] {
  const titles = fillTo(blueprint.deepDiveTitles, target, (index) => base.reviewCards[index % base.reviewCards.length]?.term ?? `${lesson.title} uygulama noktası ${index + 1}`);
  return titles.map((title, index) => ({
    title,
    body:
      `${title} başlığı ${lesson.title} dersinde sınavın olay okuma tarafını güçlendirir. ${base.coreNarrative} Aday, bu alt başlıkta kuralı ezberlemekle kalmayıp müşteri profili, işlem amacı, fon kaynağı, yükümlü aksiyonu ve bildirim refleksini birlikte değerlendirmelidir. ${base.mustKnow[index % base.mustKnow.length]}`,
    sourceTrace: base.pdfRange,
  }));
}

function buildComparisonTables(lesson: Lesson, base: BaseLessonContent, blueprint: LessonV4Blueprint, target: number): ComparisonTable[] {
  const themes = fillTo(blueprint.tableThemes, target, (index) => `${lesson.title} sınav ayrımları ${index + 1}`);
  return themes.map((theme, index) => ({
    title: theme,
    columns: ["Kavram", "Sınavda aranan ayrım", "Yanılgı"],
    rows: [
      [base.reviewCards[0]?.term ?? lesson.title, base.reviewCards[0]?.detail ?? base.examFocus, base.confusions[0]],
      [base.reviewCards[1]?.term ?? "Risk", base.reviewCards[1]?.detail ?? base.mustKnow[0], base.confusions[1 % base.confusions.length]],
      [base.reviewCards[2]?.term ?? "Aksiyon", base.reviewCards[2]?.detail ?? base.mustKnow[1 % base.mustKnow.length], base.confusions[2 % base.confusions.length]],
      ["Soru dili", base.examFocus, `Sadece tanım ezberi yetmez; olayda ${lesson.title} sonucunu doğuran unsur seçilir.`],
    ],
    sourceTrace: `${base.pdfRange}; ${base.legalAnchors[index % base.legalAnchors.length]}`,
  }));
}

function buildCaseStudies(lesson: Lesson, base: BaseLessonContent, blueprint: LessonV4Blueprint, target: number): CaseStudy[] {
  const themes = fillTo(blueprint.caseThemes, target, (index) => `${lesson.title} örnek olay ${index + 1}`);
  return themes.map((theme, index) => ({
    title: theme,
    facts: `${base.casePattern} Olayda adaydan işlem taraflarını, zamanlamayı, risk göstergesini ve yükümlünün beklenen aksiyonunu ayırması beklenir.`,
    analysis: `${lesson.title} için güvenli çözüm yolu önce somut şüphe/risk göstergesini saptamak, sonra mevzuat dayanağına göre bildirim, kimlik tespiti, sıkı tedbir, erteleme veya kayıt aksiyonunu seçmektir.`,
    takeaway: base.mustKnow[index % base.mustKnow.length],
    sourceTrace: base.pdfRange,
  }));
}

function buildPitfalls(base: BaseLessonContent, target: number) {
  return fillTo(base.confusions, target, (index) => {
    const card = base.reviewCards[index % base.reviewCards.length];
    return `${card.term} başlığını yalnız tanım olarak ezberlemek yerine sınav olayındaki sonuçla eşleştir.`;
  });
}

function buildMiniQuiz(lesson: Lesson, base: BaseLessonContent, target: number): MiniQuizQuestion[] {
  const prompts = fillTo(base.miniQuizSeed, target, (index) => `${lesson.title} konusunda sınavda en güvenli yorum hangisidir?`);
  return prompts.map((prompt, index) => {
    const correct = base.mustKnow[index % base.mustKnow.length];
    const wrongs = [
      base.confusions[index % base.confusions.length],
      `${lesson.title} için sadece işlem tutarına bakmak yeterlidir.`,
      `${lesson.title} değerlendirmesinde kaynak izi veya kayıt gerekmez.`,
    ];
    const answer = index % 4;
    const options = [...wrongs];
    options.splice(answer, 0, correct);
    return {
      prompt,
      options,
      answer,
      explanation: `${correct} Bu nedenle doğru seçenek, tanımı olay aksiyonuyla birlikte kuran seçenektir.`,
      sourceTrace: base.pdfRange,
    };
  });
}

function buildLessonContent(lesson: Lesson): LessonContent {
  const base = baseLessonContentById[lesson.id];
  const blueprint = lessonV4Blueprints[lesson.id];
  const density = densityByPriority[base.priority];
  const sourceTrace = `${base.pdfRange}; ${lesson.sourceRef}`;

  return {
    ...base,
    sourceTrace,
    overview: `${lesson.summary} Bu v4 ders notu, konuyu önce sınav sinyaliyle özetler; ardından olay çözümü, tablo ve mini testle pekiştirir.`,
    estimatedMinutes: density.minutes,
    deepDiveSections: buildDeepDiveSections(lesson, base, blueprint, density.deepDive),
    examSignals: fillTo([base.examFocus, ...base.mustKnow], 6, (index) => base.reviewCards[index % base.reviewCards.length].detail),
    comparisonTables: buildComparisonTables(lesson, base, blueprint, density.tables),
    caseStudies: buildCaseStudies(lesson, base, blueprint, density.cases),
    pitfalls: buildPitfalls(base, density.pitfalls),
    glossary: [...base.reviewCards, ...blueprint.glossary],
    miniQuiz: buildMiniQuiz(lesson, base, density.quiz),
  };
}

export const lessonContentById: Record<string, LessonContent> = Object.fromEntries(
  lessons.map((lesson) => [lesson.id, buildLessonContent(lesson)]),
) as Record<string, LessonContent>;

export const lessonDetails: Record<string, LessonDetail> = {
  "masak-gorevleri": {
    subtopics: [
      "5549, 6415, 7262 ve 1 sayılı Cumhurbaşkanlığı Kararnamesi bağlantısı",
      "Başkanlığın veri toplama, analiz, değerlendirme ve paylaşım fonksiyonları",
      "Denetim elemanı görevlendirme ve kurumlar arası koordinasyon",
      "Mali Suçlarla Mücadele Koordinasyon Kurulu üyeleri, toplantı ve karar usulü",
    ],
    examChecklist: [
      "MASAK'ın adli soruşturma makamı olmadığını ayırt et",
      "Başkan, denetim elemanı ve koordinasyon kurulu görevlerini ayrı öğren",
      "MoU/bilgi paylaşımı gibi uluslararası yetkileri savcılık yetkisiyle karıştırma",
    ],
    commonMistakes: [
      "MASAK'ın doğrudan kamu davası açtığını varsaymak",
      "Koordinasyon kurulunda çekimser oy veya klasik idari kurul mantığı aramak",
      "Denetim elemanını yalnızca MASAK personeli sanmak",
    ],
    scenario:
      "Bir yükümlüde olağandışı işlem örüntüsü görülürse MASAK veriyi analiz eder, gerekli gördüğünde ilgili makamlarla paylaşır; adli süreç Cumhuriyet savcılığı tarafında yürür.",
    questionAngles: ["kuruluş ve statü", "görev sınırı", "koordinasyon kurulu", "denetim elemanı", "bilgi paylaşımı"],
    sourceNotes: ["MASAK çalışma notu sayfa 2-6", "kitap-modül1ve2 1.1", "mufettis.org anlatım formatı"],
  },
  "uluslararasi-standartlar": {
    subtopics: [
      "FATF'in 40 tavsiyesi ve karşılıklı değerlendirme metodolojisi",
      "Egmont Grubu ve mali istihbarat birimleri arasında güvenli bilgi değişimi",
      "FATF tarzı bölgesel kuruluşlar ve etkililik kriterleri",
      "BM yaptırımları, uluslararası sözleşmeler ve Türkiye'nin gri liste süreci",
    ],
    examChecklist: [
      "FATF tavsiye numaralarından Müşterinin Tanınması, ŞİB, MİB ve yeni teknolojiler başlıklarını eşleştir",
      "Türkiye'nin Haziran 2024'te artırılmış izlemeden çıktığını tarih olarak bil",
      "Egmont'u operasyonel bilgi paylaşımı, FATF'i standart ve değerlendirme yapısı olarak ayır",
    ],
    commonMistakes: [
      "FATF tavsiyelerini bağlayıcı olmayan basit öneri gibi okumak",
      "Egmont ile Interpol/Europol gibi kolluk örgütlerini karıştırmak",
      "Gri liste çıkışını mevzuat yükümlülüklerinin bittiği anlamına getirmek",
    ],
    scenario:
      "Bir ülkenin AML/CFT eksikleri karşılıklı değerlendirmede stratejik zafiyet olarak görülürse artırılmış izleme başlar; çıkış sonrasında da risk temelli uygulama devam eder.",
    questionAngles: ["FATF tavsiye numarası", "Egmont güvenli ağ", "gri liste", "etkililik", "uluslararası yaptırım"],
    sourceNotes: ["SPL kılavuzu Modül 1.2", "FATF Haziran 2024 duyurusu", "MASAK_Rehber uluslararası standartlar bölümü"],
  },
  "ulusal-koordinasyon": {
    subtopics: [
      "Ulusal risk değerlendirmesi ve sektör risklerinin uyum programına etkisi",
      "Aklama, TF ve KİSYF strateji belgeleri",
      "Kamu kurumları, düzenleyici otoriteler ve yükümlüler arasında koordinasyon",
      "2025 Ulusal Risk Değerlendirmesi'nin ŞİB rehberlerine yansıması",
    ],
    examChecklist: [
      "Ulusal risk ile müşteri riski arasındaki seviyeyi ayır",
      "Strateji belgesini sınav notu değil politika uygulama aracı olarak oku",
      "Sektörel ŞİB rehberlerinin risk değerlendirmesiyle güncellendiğini hatırla",
    ],
    commonMistakes: [
      "Ulusal risk değerlendirmesini yalnızca kamu raporu kabul etmek",
      "Yükümlünün kendi risk sınıflandırmasını ulusal riskten koparmak",
      "KİSYF stratejisini TF stratejisi içinde eritmek",
    ],
    scenario:
      "Ulusal risk değerlendirmesinde bir sektör yüksek riskli görülürse o sektördeki yükümlülerin eğitim, izleme ve ŞİB tipoloji kontrollerini sıkılaştırması beklenir.",
    questionAngles: ["ulusal risk", "strateji belgesi", "sektörel rehber", "koordinasyon", "risk temelli yaklaşım"],
    sourceNotes: ["MASAK ŞİB rehberleri 2025 duyurusu", "MASAK_Rehber ulusal risk bölümü"],
  },
  aklama: {
    subtopics: [
      "Aklama suçunun maddi ve manevi unsurları",
      "Yerleştirme, ayrıştırma, bütünleştirme aşamaları",
      "TCK 282, elkoyma, müsadere ve öncül suç bağlantısı",
      "Nakit, sahte fatura, paravan şirket, gayrimenkul, kıymetli maden ve kripto tipolojileri",
    ],
    examChecklist: [
      "Aşama sorularında işlem zincirinin hangi evrede olduğunu belirle",
      "TCK 282 ile 5549 önleyici yükümlülüklerini karıştırma",
      "Tipoloji sorusunda tek belirti yerine işlem amacı ve müşteri profili uyumuna bak",
    ],
    commonMistakes: [
      "Her yüksek tutarlı işlemi doğrudan aklama saymak",
      "Ayrıştırma ile bütünleştirmeyi işlem sayısına göre ayırmaya çalışmak",
      "Öncül suç bağlantısını değerlendirme dışı bırakmak",
    ],
    scenario:
      "Geliriyle uyumsuz nakdin kısa sürede farklı hesaplara bölünüp kriptoya çevrilmesi, yerleştirme ve ayrıştırma izlerini birlikte taşıyan bir şüphe sinyali üretir.",
    questionAngles: ["aşamalar", "öncül suç", "TCK 282", "tipoloji", "kripto/mixer", "sahte ticaret"],
    sourceNotes: ["MASAK_Rehber aklama bölümü", "kitap-modül1ve2 4.1-4.3", "500 soru çalışması tipoloji kalıpları"],
  },
  "terorizmin-finansmani": {
    subtopics: [
      "6415 sayılı Kanun'da fon sağlama/toplama ve yasak fiiller",
      "Yasal kaynaklı fonların terör amacıyla kullanılma riski",
      "Bağış, dernek, ticari işletme, nakit taşıma ve sınır aşan transfer tipolojileri",
      "Terörizmin finansmanında malvarlığı dondurma süreçleri",
    ],
    examChecklist: [
      "Aklamada kaynak, TF'de kullanım amacı ve bağlantı ağının belirleyici olduğunu unutma",
      "Fon tanımını para dışı ekonomik değerleri de kapsayacak şekilde düşün",
      "BMGK listeleri, ulusal liste ve dondurma yetki zincirini ayır",
    ],
    commonMistakes: [
      "Fon yasal kaynaktan geldiğinde TF riski yok saymak",
      "Küçük tutarlı işlemleri otomatik düşük riskli kabul etmek",
      "Dondurma kararını ceza mahkumiyetiyle aynı şey sanmak",
    ],
    scenario:
      "Düşük tutarlı ama sık tekrarlayan bağışların riskli bölge bağlantılı kişi ve kuruluşlara yönelmesi, tutardan bağımsız TF şüphesi doğurabilir.",
    questionAngles: ["fon tanımı", "amaç bağlantısı", "BMGK kararları", "dondurma", "bağış/ticari işletme"],
    sourceNotes: ["6415", "MASAK_Rehber TF bölümü", "kitap-modül1ve2 5.1-5.3"],
  },
  kisyf: {
    subtopics: [
      "7262 sayılı Kanun ve yayılmanın finansmanı kavramı",
      "Kuzey Kore, İran ve BM yaptırım rejimleri",
      "KİSYF malvarlığı dondurma usulü, istisna ve itiraz süreçleri",
      "Liste tarama, eşleşme yönetimi ve uyum kontrol kayıtları",
    ],
    examChecklist: [
      "KİSYF'i TF'nin alt başlığı gibi değil ayrı yaptırım alanı gibi çalış",
      "Liste eşleşmesinde gecikmeksizin aksiyon ve kayıt prensibini bil",
      "Hatalı dondurma/itiraz ve istisna başlıklarını dondurma kararından ayır",
    ],
    commonMistakes: [
      "PF/KİSYF kısaltmasını sadece nükleer konu sanmak",
      "Liste kontrolünü yalnız müşteri açılışında yapılan tek seferlik kontrol kabul etmek",
      "Dondurulan malvarlığı yönetimi ve muhafaza yükümlülüğünü atlamak",
    ],
    scenario:
      "Bir ödeme talimatında yaptırım listesindeki unvana benzerlik oluştuğunda yükümlü eşleşmeyi araştırır, kayıt altına alır ve gerçek eşleşmede dondurma/bildirim sürecini işletir.",
    questionAngles: ["7262", "PF", "liste tarama", "dondurma usulü", "istisna/itiraz"],
    sourceNotes: ["MASAK_Rehber KİSYF bölümü", "kitap-modül1ve2 6.1-6.2"],
  },
  sib: {
    subtopics: [
      "Bilgi, şüphe veya şüpheyi gerektiren husus standardı",
      "ŞİB süresi, MASAK Online, dahili bildirim ve uyum görevlisi değerlendirmesi",
      "Bildirim gizliliği, ifşa yasağı, koruma ve geri bildirim",
      "2025 sektörel ŞİB rehberleri ve tipoloji okuma yöntemi",
    ],
    examChecklist: [
      "ŞİB için parasal eşik aranmadığını bil",
      "Teşebbüs veya reddedilen işlemde de şüphe varsa bildirim yapılabileceğini ayır",
      "Müşterinin bilgilendirilmesi, grup içi paylaşım ve ifşa yasağı sorularına dikkat et",
    ],
    commonMistakes: [
      "ŞİB'i kesin delil veya mahkumiyet standardına bağlamak",
      "Bildirim yapıldığını müşteriye açıklanabilir sanmak",
      "Devamlı bilgi verme bildiriminin ŞİB yükümlülüğünü ortadan kaldırdığını düşünmek",
    ],
    scenario:
      "Müşteri işlemini küçük tutarlara böler, açıklama vermekten kaçınır ve işlem müşteri profiliyle uyumsuzsa, işlem gerçekleşmemiş olsa bile ŞİB değerlendirmesi yapılır.",
    questionAngles: ["şüphe eşiği", "süre", "ifşa yasağı", "dahili bildirim", "MASAK Online", "tipoloji"],
    sourceNotes: ["MASAK yükümlülükler sayfası", "2025 ŞİB rehber duyurusu", "MASAK_Rehber ŞİB bölümü"],
  },
  "islem-ertelemesi": {
    subtopics: [
      "İşlem ertelemesi şartları ve ŞİB ile ilişkisi",
      "Yükümlünün işlemi gerçekleştirmekten imtina edebileceği haller",
      "MASAK talimatı, süreler ve ertelemenin uygulanması",
      "Kayıt, belge ve müşteriyle iletişim riski",
    ],
    examChecklist: [
      "Her ŞİB'in otomatik erteleme olmadığını bil",
      "Gecikmesinde sakınca bulunan işlem ile olağan ŞİB akışını ayır",
      "İhbar riskini artırmadan araştırma yapılması gerektiğini hatırla",
    ],
    commonMistakes: [
      "Ertelemeyi yükümlünün sınırsız takdir yetkisi gibi görmek",
      "Şüpheli işlemi müşteriye açıklayarak zaman kazanılabileceğini düşünmek",
      "İşlem gerçekleştikten sonra kayıt gerekmeyeceğini sanmak",
    ],
    scenario:
      "Yüksek riskli bir transferde fonun sistem dışına çıkacağına dair ciddi emare varsa işlem ertelemesi, ŞİB ve MASAK iletişimi birlikte değerlendirilir.",
    questionAngles: ["erteleme şartı", "süre", "MASAK talimatı", "imtina", "ihbar riski"],
    sourceNotes: ["MASAK_Rehber işlem ertelemesi bölümü", "500 soru çalışması erteleme soruları"],
  },
  "fintek-riskleri": {
    subtopics: [
      "Ödeme sistemleri, elektronik para ve açık bankacılık",
      "Kripto varlık hizmet sağlayıcılar ve kripto transferlerinde seyahat kuralı",
      "Dijital cüzdan, API, sahte entegrasyon ve siber güvenlik riskleri",
      "Kripto varlıkların ödeme aracı olarak kullanılamaması ve AML etkisi",
    ],
    examChecklist: [
      "Kripto transferlerinde bilgi/teyit eşiği ve eksik bilgiye verilecek tepkiyi öğren",
      "Dijital kanalın düşük risk değil, farklı risk anlamına geldiğini hatırla",
      "Ödeme kuruluşu, e-para kuruluşu ve KVHS yükümlülüklerini ayır",
    ],
    commonMistakes: [
      "Kriptoyu yalnız yatırım ürünü gibi değerlendirip AML izleme yükünü atlamak",
      "Açık bankacılık rızasını AML yükümlülüklerinin yerine geçtiğini sanmak",
      "Kriptoyla ödeme yasağı ile kripto alım-satım/saklama faaliyetini karıştırmak",
    ],
    scenario:
      "KVHS üzerinden 15.000 TL ve üzeri transferde gönderen/alıcı bilgilerinin mesajda yer alması ve gerekli doğrulama süreci sınavda sık soru kalıbı üretir.",
    questionAngles: ["seyahat kuralı", "15.000 TL", "KVHS", "e-para", "açık bankacılık", "ödeme yasağı"],
    sourceNotes: ["MASAK_Rehber seyahat kuralı bölümü", "kitap-modül1ve2 fintech bölümü", "500 soru çalışması kripto kümeleri"],
  },
  "uyum-yonetimi": {
    subtopics: [
      "Uyum programı kapsamı: kurum politikası, risk yönetimi, izleme-kontrol, eğitim, iç denetim",
      "Uyum görevlisi, yardımcısı, uyum birimi ve yönetim kurulu sorumluluğu",
      "Lisanslama, sicil, yenileme eğitimi, askıya alma ve iptal",
      "Finansal grup, grup uyum görevlisi, grup içi bilgi paylaşımı ve ŞİB gizliliği",
      "Münhasıran uyum görevlisi atanması ve görevin sona ermesi",
    ],
    examChecklist: [
      "Yetki devrinin yönetim kurulunun nihai sorumluluğunu kaldırmadığını bil",
      "Uyum birimi personelinin doğrudan MASAK'a ŞİB yapamayacağı ayrımını öğren",
      "Lisans geçerlilik başlangıcı, 3 yıllık yenileme ve 5 yıllık iptal sınırını çalış",
    ],
    commonMistakes: [
      "Uyum programını sadece politika dokümanı sanmak",
      "Uyum görevlisinin satış/pazarlama gibi çıkar çatışmalı görevlerde bulunabileceğini düşünmek",
      "Grup içi bilgi paylaşımı serbestliğini ŞİB yapıldı bilgisini de kapsar sanmak",
    ],
    scenario:
      "Yönetim kurulu bir üyeye gözetim yetkisi devretse bile uyum programının bütününün etkinliğinden nihai sorumluluk yönetim kurulunda kalır.",
    questionAngles: ["yönetim kurulu", "uyum görevlisi", "lisans/sicil", "yenileme", "finansal grup", "münhasır görev"],
    sourceNotes: ["Uyum Yönetmeliği", "MASAK_Rehber Modül 2", "kitap-modül1ve2 lisanslama bölümü"],
  },
  "denetim-idari-ceza": {
    subtopics: [
      "Yükümlüler, finansal kuruluşlar ve finansal olmayan belirli iş ve meslekler",
      "Yükümlülük denetimi, denetim programı ve rapor süreci",
      "Müşterinin tanınması, ŞİB ve devamlı bilgi verme ihlallerinde idari ceza",
      "Gizlilik, bilgi-belge verme, muhafaza-ibraz ihlallerinde adli ceza",
      "2026 yeniden değerleme duyurusu ve ceza tavan mantığı",
    ],
    examChecklist: [
      "İdari ceza ile adli ceza doğuran fiilleri ayrı tabloda çalış",
      "Finansal kuruluşlarda iki kat ve işlem tutarı bağlantısını gözden geçir",
      "Uyum Yönetmeliği ihlalindeki uyarı/süre/yaptırım akışını öğren",
    ],
    commonMistakes: [
      "Tüm ihlallerin aynı yaptırıma tabi olduğunu düşünmek",
      "ŞİB gizliliği ihlalini yalnız idari ceza saymak",
      "2026 tutarlarını ezberleyip ceza sistematiğini kaçırmak",
    ],
    scenario:
      "Kimlik tespitinin yapılmaması idari ceza mantığına girerken, ŞİB yapıldığının müşteriye açıklanması adli ceza riskini doğurur.",
    questionAngles: ["idari/adli ayrımı", "ceza tavanı", "denetim raporu", "finansal kuruluş", "uyarı süreci"],
    sourceNotes: ["MASAK yaptırımlar sayfası", "MASAK_Rehber yaptırımlar bölümü", "500 soru çalışması ceza kalıpları"],
  },
  "uzaktan-kimlik": {
    subtopics: [
      "MASAK Genel Tebliği Sıra No: 19 genel esasları",
      "Müşteri profili, fon kaynağı, tahmini işlem hacmi ve risk değerlendirmesi",
      "Canlılık, belge doğrulama, temsil yetkisi ve sıkılaştırılmış tedbirler",
      "MASAK Genel Tebliği Sıra No: 32 ile yabancı uyruklu gerçek kişiler/pasaport güncellemesi",
    ],
    examChecklist: [
      "Uzaktan kimliğin KYC yükümlülüğünü ortadan kaldırmadığını bil",
      "Başvuru anındaki profil/risk bilgilerinin hangi amaçla alındığını ayır",
      "2026 Tebliğ 32 değişikliğini güncellik notu olarak işaretle",
    ],
    commonMistakes: [
      "Uzaktan kimlikte sadece kimlik belgesi görüntüsünün yeterli olduğunu düşünmek",
      "Yabancı temsilci/pasaport değişikliğini genel KYC eşiğiyle karıştırmak",
      "Sıkılaştırılmış tedbir ihtiyacını dijital süreçte yok saymak",
    ],
    scenario:
      "Fiziki temas olmadan açılan ilişkide hesap amacı, fon kaynağı, tahmini hacim ve müşteri profili alınarak risk değerlendirmesi yapılır; yüksek riskte ek tedbir aranır.",
    questionAngles: ["Tebliğ 19", "Tebliğ 32", "canlılık", "fon kaynağı", "tahmini hacim", "EDD"],
    sourceNotes: ["MASAK Genel Tebliği 19/32", "kitap-modül1ve2 uzaktan kimlik bölümü"],
  },
  "diger-yukumlulukler": {
    subtopics: [
      "Devamlı bilgi verme ve erişim sistemi",
      "Bilgi ve belge verme yükümlülüğünde özel kanun savunmasının sınırı",
      "Muhafaza ve ibraz: belge, kayıt, kimlik tespiti ve ŞİB belgeleri",
      "Elektronik tebligat hesabı, kullanım sorumluluğu ve ihlal yaptırımı",
      "ŞİB yapanların korunması ve sır saklama yükümlülüğü",
    ],
    examChecklist: [
      "Muhafaza süresinin hangi belge için hangi tarihten başlayacağını ayır",
      "Bilgi-belge talebine özel kanun hükümleriyle kaçınılamayacağı kuralını öğren",
      "ŞİB yapanların korunması ile ifşa yasağını birlikte çalış",
    ],
    commonMistakes: [
      "Muhafaza süresini tüm belgeler için aynı başlangıç tarihinden başlatmak",
      "Elektronik tebligatı sadece teknik başvuru prosedürü olarak görmek",
      "Koruma hükmünü müşteriye açıklama izni gibi yorumlamak",
    ],
    scenario:
      "Hesap kapandıktan sonra kimlik tespit belgeleri, kapatılma tarihinden başlayan saklama mantığıyla değerlendirilir; ŞİB/dahili bildirim kayıtları da muhafaza kapsamındadır.",
    questionAngles: ["8 yıl", "bilgi-belge", "muhafaza", "e-tebligat", "erişim sistemi", "koruma"],
    sourceNotes: ["MASAK yükümlülükler sayfası", "MASAK_Rehber diğer yükümlülükler bölümü"],
  },
  "musterinin-taninmasi": {
    subtopics: [
      "Kimlik tespiti gereken durumlar ve yöntemler",
      "Gerçek kişi, tüzel kişi, dernek/vakıf, sendika, siyasi parti, kamu kurumu ve yabancı tüzel kişiler",
      "Başkası adına/h hesabına işlem, gerçek faydalanıcı ve güven sözleşmeleri",
      "Müşteri durumunun ve işlemlerin sürekli izlenmesi",
      "Özel dikkat, riskli ülkeler, muhabirlik, üçüncü tarafa güven ve işlemin reddi",
      "Elektronik transfer, kripto transfer, basitleştirilmiş ve sıkılaştırılmış tedbirler",
    ],
    examChecklist: [
      "KYC'nin yalnız açılışta kimlik almak olmadığını, ilişki boyunca izleme gerektirdiğini bil",
      "Gerçek faydalanıcı ile işlemi yapan kişi ayrımını netleştir",
      "Basitleştirilmiş tedbir uygulanabilecek halleri sıkılaştırılmış tedbirlerle karıştırma",
      "Kripto transferde eksik bilgi varsa işlem/iade/sınırlandırma seçeneklerini çalış",
    ],
    commonMistakes: [
      "Müşterinin beyanını tek başına yeterli görmek",
      "İşlem reddedildiyse ŞİB değerlendirmesine gerek yok sanmak",
      "Kamu idaresi, halka açık şirket ve riskli ülke hallerini aynı tedbir seviyesinde görmek",
      "Elektronik transfer ile kripto transfer bilgi yüklerini aynı kabul etmek",
    ],
    scenario:
      "Müşterinin geliri, faaliyet konusu ve işlem hacmiyle uyumsuz transferler sürekli izleme kapsamında yakından incelenir; amaç/fon kaynağı sorulur ve şüphe varsa ŞİB süreci değerlendirilir.",
    questionAngles: ["kimlik tespiti", "gerçek faydalanıcı", "başkası hesabına işlem", "özel dikkat", "riskli ülke", "EDD/SDD", "kripto transfer"],
    sourceNotes: ["Tedbirler Yönetmeliği 5-26/A", "MASAK yükümlülükler sayfası", "MASAK_Rehber KYC bölümü", "500 soru çalışması yoğun soru kümesi"],
  },
};

const topicBlueprint: Record<string, string[]> = {
  "masak-gorevleri": ["yetki sınırı", "koordinasyon", "mali istihbarat", "denetim bağlantısı"],
  "uluslararasi-standartlar": ["FATF", "Egmont", "gri liste", "yaptırımlar", "değerlendirme süreci"],
  "ulusal-koordinasyon": ["ulusal risk", "strateji belgesi", "kurumsal koordinasyon"],
  aklama: ["yerleştirme", "ayrıştırma", "bütünleştirme", "TCK 282", "tipoloji"],
  "terorizmin-finansmani": ["yasal kaynak", "amaç bağlantısı", "malvarlığı dondurma", "fon toplama", "tipoloji"],
  kisyf: ["yaptırım listesi", "liste tarama", "dondurma", "proliferasyon riski", "uyum kontrolü"],
  sib: ["şüphe eşiği", "gizlilik", "uyum görevlisi değerlendirmesi", "tipoloji", "geri bildirim", "bildirim usulü"],
  "islem-ertelemesi": ["erteleme şartı", "süre", "MASAK talimatı", "ŞİB ilişkisi", "kayıt"],
  "fintek-riskleri": ["kripto transfer", "API", "açık bankacılık", "dijital cüzdan"],
  "uyum-yonetimi": ["uyum görevlisi", "uyum birimi", "kurum politikası", "risk yönetimi", "izleme kontrol", "eğitim", "iç denetim"],
  "denetim-idari-ceza": ["idari ceza", "adli ceza", "denetim", "2026 tutar", "ihlalin türü"],
  "uzaktan-kimlik": ["canlılık", "pasaportla tespit", "sıkılaştırılmış tedbir", "belge doğrulama"],
  "diger-yukumlulukler": ["devamlı bilgi", "muhafaza", "ibraz", "elektronik tebligat", "yükümlünün korunması"],
  "musterinin-taninmasi": ["kimlik tespiti", "gerçek faydalanıcı", "başkası hesabına işlem", "özel dikkat", "sürekli izleme", "riskli ülke", "muhabirlik", "üçüncü tarafa güven", "elektronik transfer", "kripto transfer", "basitleştirilmiş tedbir", "sıkılaştırılmış tedbir"],
};

const distractors = [
  "Sadece mahkeme kararı varsa uygulanır.",
  "Yükümlünün risk değerlendirmesiyle ilgisi yoktur.",
  "Müşteriye bildirim yapılması zorunludur.",
  "Sadece bankalar için geçerli ve diğer yükümlülere kapalıdır.",
  "Her durumda otomatik ceza veya el koyma sonucu doğurur.",
  "Elektronik ortamda yapılan işlemler için dikkate alınmaz.",
];

function buildQuestion(lesson: Lesson, index: number): Question {
  const aspects = topicBlueprint[lesson.id] ?? [lesson.title];
  const aspect = aspects[index % aspects.length];
  const difficulty: Difficulty = index % 5 === 0 ? "Sınav" : index % 2 === 0 ? "Orta" : "Temel";
  const correct = `${lesson.title} kapsamında "${aspect}" başlığı risk temelli ve mevzuat atıflı değerlendirilmelidir.`;
  const wrongA = distractors[(index + lesson.order) % distractors.length];
  const wrongB = distractors[(index + lesson.order + 2) % distractors.length];
  const wrongC = distractors[(index + lesson.order + 4) % distractors.length];
  const rawOptions = [correct, wrongA, wrongB, wrongC];
  const answer = index % 4;
  const options = rawOptions.map((_, optionIndex) => rawOptions[(optionIndex - answer + 4) % 4]);

  return {
    id: `${lesson.id}-${String(index + 1).padStart(2, "0")}`,
    moduleId: lesson.moduleId,
    topicId: lesson.id,
    difficulty,
    prompt: `${lesson.title} konusunda "${aspect}" vurgusu için en doğru sınav yaklaşımı hangisidir?`,
    options,
    answer,
    explanation: `${lesson.examPoint} Bu nedenle doğru seçenek, "${aspect}" başlığını ${lesson.title} içindeki ana mantıkla ilişkilendirir.`,
    trapNote: lesson.confusion,
    sourceRef: lesson.sourceRef,
  };
}

export const questions: Question[] = lessons.flatMap((lesson) =>
  Array.from({ length: lesson.bankQuestionCount }, (_, index) => buildQuestion(lesson, index)),
);

export function getQuestionsForModule(moduleId: ModuleId) {
  return questions.filter((question) => question.moduleId === moduleId);
}

export function getLessonById(id: string) {
  return lessons.find((lesson) => lesson.id === id) ?? lessons[0];
}

export function getModuleById(id: ModuleId) {
  return modules.find((module) => module.id === id) ?? modules[0];
}
