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
      "MASAK, 1996 yılında yürürlüğe giren 4208 sayılı Kanun'la kurulmuş ve 17 Şubat 1997'de fiilen faaliyete başlamıştır; 2006'da görev alanı genişledi ve bugün 1 sayılı Cumhurbaşkanlığı Kararnamesi ile Hazine ve Maliye Bakanlığına bağlı, doğrudan Bakana bağlı bir ana hizmet birimidir; tüzel kişiliği yoktur. MASAK bir Mali İstihbarat Birimi (FIU) olarak bildirim toplar, analiz eder ve sonucu ilgili makamlarla paylaşır; arama, el koyma veya gözaltı yapamaz, doğrudan soruşturma yürütmez. Soruşturma yetkisi yalnızca Cumhuriyet savcılarındadır, MASAK savcıya suç duyurusu ileten uzman bir analiz birimidir.",
    examFocus: "MASAK'ın statüsü ve yetki sınırı, denetim elemanı tanımı ve Koordinasyon Kurulu'nun başkanlık/oylama usulü.",
    mustKnow: [
      "MASAK'ın bağlı olduğu makam Hazine ve Maliye Bakanı'dır; MASAK'ın tüzel kişiliği yoktur.",
      "MASAK istihbarat toplar ve analiz eder; arama, el koyma, gözaltı YAPAMAZ, dava açma yetkisi yoktur.",
      "5549 sayılı Kanun md. 2'de tanımlanan denetim elemanları: Vergi Müfettişleri, Hazine ve Maliye Uzmanları, Gümrük ve Ticaret Müfettişleri, Bankalar Yeminli Murakıpları, BDDK/SPK uzmanları ve TCMB denetçileridir; SMMM, YMM ve kolluk (polis/jandarma) bu tanıma girmez.",
      "MASAK Başkanı yabancı muadil kurumlarla Mutabakat Muhtırası (MoU) imzalayabilir, ancak bu metnin yürürlüğe girmesi Cumhurbaşkanı kararına bağlıdır.",
      "Malî Suçlarla Mücadele Koordinasyon Kurulu'na Hazine ve Maliye Bakan Yardımcısı başkanlık eder (MASAK Başkanı değil); Kurul yılda en az iki kez (genellikle Nisan ve Eylül) toplanır.",
      "Kurul üye tam sayısının yarıdan bir fazlasıyla toplanır, kararlar katılanların çoğunluğuyla alınır, üyeler çekimser oy KULLANAMAZ; oy eşitliğinde başkanın bulunduğu taraf üstün sayılır (başkanın oyu iki oy gibi çalışır).",
    ],
    confusions: [
      "Denetim elemanı listesinde SMMM, YMM ve kolluk (polis/jandarma) YOKTUR; bunlar MASAK ile iş birliği yapar ama yasal tanımda denetim elemanı sayılmaz.",
      "Koordinasyon Kurulu'na MASAK Başkanı değil, Hazine ve Maliye Bakan Yardımcısı başkanlık eder; sekretaryayı MASAK yürütür.",
      "MASAK Başkanı'nın MoU imzası tek başına yürürlük kazandırmaz; Cumhurbaşkanı kararı şarttır.",
      "Kurul üyeleri çekimser oy kullanamaz; bu nedenle 'üyeler çekimser kalabilir' ifadesi geçen şıklar yanlıştır.",
    ],
    casePattern:
      "Bir sınav sorusunda Koordinasyon Kurulu'nun 1 sayılı CBK md. 232'deki doğal üyeleri sıralanır ve arasına SPK Başkanı gibi kurulda yer almayan bir isim eklenir; doğru cevap bu ismi ayıklamaktır. Benzer şekilde denetim elemanı sorularında Jandarma KOM personeli gibi kolluk unsurları çeldirici olarak eklenir.",
    legalAnchors: ["1 sayılı CBK md. 231-232", "5549 sayılı Kanun md. 2", "mufettis.org Modül 1 §1"],
    reviewCards: [
      { term: "Ana rol", detail: "Bildirim alma, analiz, değerlendirme ve ilgili makamlarla paylaşım." },
      { term: "Sınır", detail: "Arama, el koyma, gözaltı ve dava açma yetkisi yoktur; tüzel kişiliği yoktur." },
      { term: "Denetim elemanı", detail: "Vergi Müfettişleri, Hazine ve Maliye Uzmanları, Gümrük ve Ticaret Müfettişleri, BDDK/SPK Uzmanları, TCMB denetçileri, Bankalar Yeminli Murakıpları; SMMM/YMM ve kolluk dahil değildir." },
      { term: "Koordinasyon Kurulu", detail: "Bakan Yardımcısı başkanlığında, yılda en az 2 kez (Nisan/Eylül) toplanır; oy eşitliğinde başkanın oyu üstün sayılır." },
    ],
    miniQuizSeed: ["Denetim elemanları arasında SMMM/YMM sayılır mı?", "Koordinasyon Kurulu'na kim başkanlık eder ve oy eşitliğinde ne olur?"],
  },
  "uluslararasi-standartlar": {
    priority: "short",
    pdfRange: "MASAK_Rehber s. 7-41",
    coreNarrative:
      "Dünyada dört mali istihbarat birimi (MİB/FIU) modeli vardır: İdari Tip (MASAK'ın da içinde olduğu, finansal sektör ile kolluk arasında tampon görevi gören model), Kolluk Tipi (polis/jandarma bünyesinde), Adli/Savcılık Tipi (yargı bünyesinde, hızlı dondurma/el koyma yapabilir) ve Karma/Hibrit Tip. FATF 1989'da G-7 girişimiyle kuruldu, Türkiye 1991'de üye oldu; 40 Tavsiye kararı 1990 (aklama), 2001 (terör sonrası özel tavsiyeler) ve 2012 (tek çatı altında birleştirme) aşamalarından geçti. 2025 itibarıyla FATF'in 38 ülke ve iki bölgesel organizasyon (Avrupa Komisyonu, Körfez İşbirliği Konseyi) üyesi vardır; Rusya'nın üyeliği askıya alınmış durumdadır. Ülke uyumu Teknik Uyum (kanunların FATF standardına uygunluğu) ve Etkililik (11 Immediate Outcome ile ölçülen sahadaki sonuç) olmak üzere iki eksende değerlendirilir.",
    examFocus: "MİB modelleri arasındaki fark, FATF'in gri/kara liste mantığı, Türkiye'nin FATF süreci ve MONEYVAL/Egmont'un statüsü.",
    mustKnow: [
      "Türkiye İdari Tip MİB modelini benimser; MASAK finansal kuruluşlar ile kolluk/adli makamlar arasında tampon görevi görür.",
      "FATF 1989'da G-7 zirvesinde (Paris) kuruldu; Türkiye 1991'de üye oldu; 2025 itibarıyla 38 ülke ve 2 bölgesel organizasyon (AK, Körfez İşbirliği Konseyi) üyedir.",
      "Türkiye Ekim 2021'de FATF gri listesine (artırılmış izleme) girdi; 3-6 Mayıs 2024'te ICRG'nin Avrupa-Asya Ortak Grubu ülke ziyareti yaptı, Haziran 2024 Genel Kurulu'nda kabul edilen raporla gri listeden çıktı ve FATF'in 4. tur karşılıklı değerlendirme süreci tamamlandı; Türkiye hiçbir zaman kara listeye girmedi.",
      "2025 Haziran itibarıyla FATF kara listesinde yalnızca 3 ülke vardır: İran, Kuzey Kore ve Myanmar.",
      "MONEYVAL, Avrupa Konseyi bünyesinde bir izleme organıdır (AB kurumu değildir); Türkiye FATF üyesi olduğu için doğrudan MONEYVAL değil FATF tarafından değerlendirilir.",
      "Egmont Grubu 1995'te Brüksel'de kuruldu, Türkiye 1998'de üye oldu; MASAK, Egmont Güvenli Ağı'na (ESW) 2001'de dahil olmuştur ve 182 ülkenin MİB'i bu ağ üzerinden gizli istihbarat paylaşır.",
    ],
    confusions: [
      "Gri liste bir iyileştirme/izleme sürecidir, kara liste ise finansal sistemden dışlanmaya varan ağır yaptırımı temsil eder; ikisi karıştırılmamalıdır.",
      "MONEYVAL bir Avrupa Konseyi organıdır, AB kurumu değildir; Türkiye MONEYVAL'e değil FATF'e karşı sorumludur.",
      "Teknik uyum (kağıt üzerindeki mevzuat) ile etkililik (sahadaki sonuç) farklı ölçütlerdir; mükemmel mevzuat etkililiği garanti etmez.",
      "Egmont operasyonel bir bilgi paylaşım ağıdır, FATF ise standart koyan bir hükümetler arası kuruluştur; ikisi aynı işlevi görmez.",
    ],
    casePattern:
      "Bir ülkenin mevzuatı FATF standartlarına kağıt üzerinde tam uyumlu olsa da (yüksek teknik uyum) hiç mahkumiyet kararı çıkmıyor veya şüpheli işlemler analiz edilmiyorsa, o ülke Etkililik (Immediate Outcome) testinden geçemez ve gri listeye alınabilir.",
    legalAnchors: ["FATF 40 Tavsiye (özellikle Tavsiye 29)", "Egmont Grubu ilkeleri", "MONEYVAL tüzüğü", "mufettis.org Modül 1 §2-4"],
    reviewCards: [
      { term: "İdari MİB (MASAK)", detail: "Bakanlığa bağlı, yükümlü ile kolluk arasında tampon görevi görür." },
      { term: "Türkiye FATF süreci", detail: "1991 üye, Ekim 2021 gri liste, 28 Haziran 2024 çıkış (4. tur tamamlandı), hiç kara listeye girmedi." },
      { term: "FATF üyeliği", detail: "2025 itibarıyla 38 ülke + 2 bölgesel organizasyon (AK, Körfez İşbirliği Konseyi); kara listede sadece İran, Kuzey Kore, Myanmar var." },
      { term: "MONEYVAL", detail: "Avrupa Konseyi organıdır; Türkiye FATF üzerinden değerlendirilir." },
      { term: "Egmont Grubu", detail: "1995 kuruldu, Türkiye 1998'de üye oldu; MASAK Egmont Güvenli Ağı'na (ESW) 2001'de dahil oldu." },
    ],
    miniQuizSeed: ["Türkiye hangi MİB modelini benimser ve neden?", "Türkiye'nin FATF gri liste giriş-çıkış tarihleri nedir?"],
  },
  "ulusal-koordinasyon": {
    priority: "short",
    pdfRange: "MASAK_Rehber s. 42-58",
    coreNarrative:
      "FATF'in 1 numaralı Tavsiyesi'ndeki Risk Temelli Yaklaşım gereği Türkiye, AK/TF Ulusal Risk Değerlendirmesi (URD) ile Kitle İmha Silahlarının Yayılmasının Finansmanı (KİSYF) URD'sini ayrı ayrı hazırlar. Bu raporlar suç türlerini, terör örgütlerini ve sektörleri risk seviyesine göre derecelendirir; MASAK her iki stratejik sürecin de sekretarya ve koordinasyon görevini yürütür.",
    examFocus: "Aklama/TF risk derecelendirmesi, sektörel kırılganlık tablosu ve 2021-2025 / 2025-2029 strateji belgelerinin kapsamı.",
    mustKnow: [
      "Aklama suçlarında öncül suç risk sıralaması: Yüksek risk dolandırıcılık; orta-yüksek risk yasa dışı bahis/kumar, uyuşturucu ticareti, hırsızlık/yağma; orta risk vergi kaçakçılığı, yolsuzluk, sahtecilik, gümrük/göçmen kaçakçılığı; düşük risk tefecilik.",
      "Terörün finansmanında en yüksek riskli yapı FETÖ, ardından PKK/KCK ve dini istismar eden örgütler gelir; sol terör örgütleri orta-düşük risk grubundadır.",
      "Sektörel kırılganlıkta Bankalar ve Kripto Varlık Hizmet Sağlayıcıları yüksek riskli; ödeme kuruluşları, döviz büroları, kuyumcular ve emlakçılar orta-yüksek riskli; avukatlık, sigortacılık ve kargo orta-düşük risklidir.",
      "2021-2025 Strateji Belgesi adli süreçlerin etkinleştirilmesi ve müsadere mekanizmalarının güçlendirilmesi gibi 5 ana amaç belirler; 2025-2029 Strateji Belgesi ise KİSYF ile mücadeleye odaklanır.",
    ],
    confusions: [
      "Ulusal risk değerlendirmesi (ülke/sektör düzeyi) yükümlünün kendi müşteri/işlem risk sınıflandırmasının yerine geçmez, sadece referans çerçeve sunar.",
      "KİSYF, ayrı bir Ulusal Risk Değerlendirmesi ve ayrı bir strateji belgesiyle izlenir; TF'nin bir alt başlığı gibi eritilmemelidir.",
      "'Dolandırıcılık en yüksek risk' ile 'tefecilik en düşük risk' sık karıştırılan iki uç noktadır.",
    ],
    casePattern:
      "Ulusal Risk Değerlendirmesi'nde bir sektör (ör. kripto varlık hizmet sağlayıcıları) yüksek kırılganlıkta gösterilirse, o sektörde ŞİB rehberleri, eğitim yükümlülüğü ve izleme sıklığı MASAK tarafından daha yoğun tutulur.",
    legalAnchors: ["AK/TF Ulusal Risk Değerlendirmesi", "2021-2025 AML/CFT Strateji Belgesi", "2025-2029 KİSYF Strateji Belgesi", "mufettis.org Modül 1 §7"],
    reviewCards: [
      { term: "En yüksek aklama riski", detail: "Dolandırıcılık; en düşük risk tefecilik." },
      { term: "En yüksek TF riski", detail: "FETÖ, ardından PKK/KCK ve dini istismar eden örgütler." },
      { term: "Yüksek riskli sektör", detail: "Bankalar ve kripto varlık hizmet sağlayıcıları." },
      { term: "Strateji belgeleri", detail: "2021-2025 (AK/TF, 5 amaç) ve 2025-2029 (KİSYF); sekretarya MASAK'tır." },
    ],
    miniQuizSeed: ["Aklama suçlarında en yüksek risk grubu hangi suçtur?", "Hangi sektörler ulusal risk değerlendirmesinde yüksek riskli kabul edilir?"],
  },
  aklama: {
    priority: "high",
    pdfRange: "MASAK_Rehber s. 59-69",
    coreNarrative:
      "Aklama, yasa dışı faaliyetlerden elde edilen değerin yasal bir kaynaktan geldiği görüntüsü verilerek sisteme dahil edilmesidir ve TCK 282'de düzenlenir. Süreç Yerleştirme (Placement - nakdin sisteme ilk girişi), Katmanlaştırma (Layering - karmaşık işlemlerle kaynağın gizlenmesi) ve Bütünleştirme (Integration - paranın meşru varlık gibi geri dönmesi) aşamalarından oluşur. Kanun, aklama suçunun oluşması için alt sınırı 6 ay veya daha fazla hapis cezası gerektiren bir 'öncül suç' bulunmasını şart koşar.",
    examFocus: "Aşamaların ayrımı, TCK 282'nin fıkraları, ağırlaştırıcı nedenler, öncül suç eşiği ve etkin pişmanlık.",
    mustKnow: [
      "Yerleştirme (Placement): suç gelirinin finansal sisteme ilk girdiği, yakalanma riskinin en yüksek olduğu aşamadır.",
      "Katmanlaştırma (Layering): paranın kaynağıyla bağını koparmak için çok sayıda karmaşık işlem yapılan aşamadır.",
      "Bütünleştirme (Integration): aklanmış paranın gayrimenkul, şirket hissesi gibi yasal bir varlık görünümüyle ekonomiye döndüğü son aşamadır.",
      "TCK 282/1 temel ceza 3 yıldan 7 yıla kadar hapis ve 20.000 güne kadar adli para cezasıdır; TCK 282/2 (iştirak etmeksizin bilerek kabul/kullanma) 2-5 yıl hapis öngörür.",
      "Ağırlaştırıcı nedenler: kamu görevlisi veya meslek sahibi tarafından işlenirse ceza yarı oranında, suç işlemek için kurulmuş bir örgüt faaliyeti kapsamında işlenirse bir kat artırılır.",
      "Öncül suç eşiği: işlenen suçun hapis cezası alt sınırının en az 6 ay olması gerekir; aklama suçu öncül suçtan bağımsızdır, öncül suçtan kesinleşmiş mahkumiyet şart değildir.",
      "TCK 282/6 etkin pişmanlık: kovuşturma başlamadan önce malın ele geçirilmesini sağlayan veya yerini bildiren kişiye ceza verilmez.",
    ],
    confusions: [
      "Her karmaşık işlem aklama değildir; suç geliri bağlantısı ve gizleme/meşrulaştırma amacı aranır.",
      "Öncül suçu işleyen kişi parayı kendisi aklarsa 'aklama oluşmaz' sanılır; oysa fail hem öncül suçtan hem aklamadan ayrı ayrı cezalandırılır.",
      "Malı yurt dışına çıkarmak için 'suçtan geldiğini bilmek' (genel kast) yeterliyken, sistemde gizleme amaçlı işlem için 'özel kast' (gizleme/meşrulaştırma amacı) aranır.",
      "Aklama suçundan mahkumiyet için öncül suçtan kesinleşmiş bir karar şart değildir; malın bir suçtan geldiğinin yargılamada ispatı yeterlidir.",
    ],
    casePattern:
      "Geliriyle uyumsuz nakit önce hesaba yatırılır (yerleştirme), farklı kişi ve ülkelere bölünerek aktarılır veya kriptoya çevrilir (katmanlaştırma), sonunda gayrimenkul alımına yönelirse (bütünleştirme) üç aşama tek bir olayda birlikte görülebilir; sınav bu üç aşamayı ayırt etmeyi ister.",
    legalAnchors: ["TCK 282/1-2-3-4-6", "5549 sayılı Kanun", "mufettis.org Modül 1 §8"],
    reviewCards: [
      { term: "Placement", detail: "Nakit veya suç geliri sisteme sokulur; en riskli aşamadır." },
      { term: "Layering", detail: "Kaynak bağını koparmak için çok katmanlı işlem yapılır." },
      { term: "Integration", detail: "Gelir meşru yatırım veya varlık gibi görünür." },
      { term: "Öncül suç eşiği", detail: "Hapis cezası alt sınırı 6 ay veya daha fazla olan suçlar öncül suç sayılabilir." },
      { term: "Ağırlaştırıcı nedenler", detail: "Kamu görevlisi/meslek sahibi: yarı oranı artım; suç örgütü faaliyeti: bir kat artım." },
      { term: "Etkin pişmanlık", detail: "Kovuşturma başlamadan önce bildirim/yardım yapan cezalandırılmaz." },
    ],
    miniQuizSeed: ["Verilen olayda hangi aklama aşaması baskındır?", "Öncül suç için aranan hapis cezası eşiği nedir?"],
  },
  "terorizmin-finansmani": {
    priority: "high",
    pdfRange: "MASAK_Rehber s. 70-110",
    coreNarrative:
      "Terörizmin finansmanında (6415 sayılı Kanun) belirleyici unsur fonun kaynağı değil, kullanım amacıdır; fonun belirli bir terör eylemiyle ilişkilendirilmiş olması veya fiilen kullanılmış olması şart değildir, sağlanması veya toplanması suçun tamamlanması için yeterlidir. Malvarlığının dondurulması, BMGK'nın 1267 sayılı (hazır liste, gecikmeksizin dondurma) ve 1373 sayılı (ulusal liste/karşılıklı talep) kararları ile 6415 sayılı Kanun'daki iç dondurma mekanizması üzerinden yürütülür.",
    examFocus: "6415 md. 3-4, fon tanımının genişliği, BMGK 1267/1373 farkı, iç dondurma usulü ve Değerlendirme Komisyonu.",
    mustKnow: [
      "Fon, para dışında taşınır/taşınmaz mal, hak, alacak ve elektronik/dijital değerleri de kapsayan geniş bir kavramdır; sadece nakit ile sınırlı değildir.",
      "Terörizmin finansmanı suçunun oluşması için fonun bir terör eyleminde fiilen kullanılmış olması gerekmez; terör örgütüne veya teröriste bilerek ve isteyerek sağlanması yeterlidir; ceza 5 yıldan 10 yıla kadar hapistir.",
      "1267 sayılı BMGK kararı ve devamı (Taliban, El-Kaide, IŞİD/DEAŞ) listeleri doğrudan BMGK'dan gelir ve gecikmeksizin dondurulur; 1373 sayılı karar ise ülkelerin kendi ulusal listelerini oluşturmasını veya karşılıklılık esasıyla başka bir devletin talebini değerlendirmesini öngörür.",
      "İç dondurma kararını Hazine ve Maliye Bakanı ile İçişleri Bakanı birlikte verir; karar 48 saat içinde Ankara Ağır Ceza Mahkemesi'nin onayına sunulur, mahkeme 5 gün içinde karar verir.",
      "Değerlendirme Komisyonu, MASAK Başkanı başkanlığında 7 kurum temsilcisinden oluşur (Cumhurbaşkanlığı, MİT, Adalet, Dışişleri, İçişleri, Hazine ve Maliye); karar için en az 5 üyenin aynı yönde oyu gerekir.",
      "Dondurulan malvarlığının mülkiyeti kişide kalır, sadece tasarruf yetkisi MASAK denetimine girer; temel ihtiyaçlar (gıda, kira, ilaç) için MASAK izniyle ödeme yapılabilir.",
    ],
    confusions: [
      "TF'de fonun kaynağı tamamen yasal (maaş, miras, ticari kâr) olabilir; suçu oluşturan kaynak değil, fonun yöneldiği amaçtır.",
      "1267 kararında liste hazır BMGK listesidir, tartışılmaz; 1373'te ülkeler kendi listelerini oluşturur veya karşılıklılık ilkesiyle talep değerlendirir.",
      "Dondurma geçici ve idari bir tedbirdir, mülkiyeti değiştirmez; el koyma/müsadere ise yargı kararıyla mülkiyetin devlete geçmesidir.",
      "Küçük tutarlı veya yasal görünümlü (dernek/bağış) fonlar otomatik düşük risk sayılmaz; TF'de tespit büyük tutarlı aklamaya göre daha zordur.",
    ],
    casePattern:
      "Küçük ama sık tekrarlanan bağışların riskli bir bölgeye yönelik alıcı ağıyla eşleşmesi, ekonomik gerekçesi olmayan aktarımlar ve paravan bir ticari işletme üzerinden fon aktarımı bir arada görülürse TF şüphesi doğar; fonun yasal görünen bir kaynaktan gelmesi bu şüpheyi ortadan kaldırmaz.",
    legalAnchors: ["6415 sayılı Kanun md. 3-4, md. 7/2", "BMGK 1267 ve 1373 sayılı kararlar", "mufettis.org Modül 1 §5, §9"],
    reviewCards: [
      { term: "Fon", detail: "Para dışı hak, alacak ve dijital değerleri de kapsayan geniş kavramdır." },
      { term: "Amaç unsuru", detail: "TF'de kullanım amacı belirleyicidir, fonun fiilen kullanılması şart değildir." },
      { term: "1267 vs 1373", detail: "1267'de liste BMGK'dan hazır gelir; 1373'te ulusal liste veya karşılıklı talep esastır." },
      { term: "İç dondurma", detail: "2 Bakan ortak kararı + 48 saat içinde Ankara Ağır Ceza Mahkemesi onayı." },
      { term: "Değerlendirme Komisyonu", detail: "MASAK Başkanı + 7 kurum temsilcisi; karar için en az 5 üye oyu." },
    ],
    miniQuizSeed: ["Yasal kaynaklı fon TF açısından ne zaman risklidir?", "İç dondurma kararını hangi makamlar birlikte verir?"],
  },
  kisyf: {
    priority: "medium",
    pdfRange: "MASAK_Rehber s. 111-131",
    coreNarrative:
      "KİSYF (7262 sayılı Kanun), terörizmin finansmanından bağımsız, ayrı bir yaptırım ve risk alanıdır. Kuzey Kore (1718 sayılı BMGK kararı, 2006) ve İran (2231 sayılı BMGK kararı, 2015/JCPOA) rejimleri en önemli iki uluslararası çerçevedir. Denetim ve İş Birliği Komisyonu, MASAK Başkanı başkanlığında çok sayıda kurum temsilcisinden oluşur ve yılda en az iki kez toplanarak 9 üyenin katılımı ve 9 üyenin aynı yöndeki oyuyla (nitelikli çoğunluk) karar alır.",
    examFocus: "7262 sayılı Kanun, Kuzey Kore/İran rejimleri, Denetim ve İş Birliği Komisyonu'nun 9/9 oy kuralı ve KİSYF'nin TF'den ayrımı.",
    mustKnow: [
      "7262 sayılı Kanun, BMGK listesindeki kişi/kurumlara doğrudan veya dolaylı fon sağlanmasını, toplanmasını ve yasaklı programlara aktarılmasını yasaklar; ayrıca temsilcilik açma, bankacılık faaliyeti ve yasaklı teknoloji transferini de yasaklar.",
      "Denetim ve İş Birliği Komisyonu'na MASAK Başkanı başkanlık eder; komisyon Adalet, Dışişleri, Enerji, İçişleri, Milli Savunma, Ticaret Bakanlıkları ile BDDK, MİT, NDK, SPK ve Hazine Kontrolörleri Kurulu temsilcilerinden oluşur.",
      "Komisyon yılda en az iki kez toplanır; kararlar en az 9 üyenin katılımı ve 9 üyenin aynı yöndeki oyuyla alınır (TF'deki Değerlendirme Komisyonu'nun 5 üye kuralından farklıdır).",
      "Dondurma iki şekilde olur: BMGK listeleri doğrudan Cumhurbaşkanı kararıyla Resmî Gazete'de yayımlanarak uygulanır; ya da makul sebep varsa Komisyon önerisi ve Cumhurbaşkanı kararıyla dondurma tesis edilir.",
    ],
    confusions: [
      "KİSYF, TF ile aynı komisyon ve aynı oy kuralına tabi değildir: TF Komisyonu 5 üye oyuyla, KİSYF Komisyonu 9 üye oyuyla karar alır.",
      "KİSYF sadece nükleer silahlarla sınırlı değildir; biyolojik ve kimyasal silahların finansmanını da kapsar.",
      "Liste taraması tek seferlik bir işlem değildir; müşteri, temsilci ve işlem taraflarını sürekli kapsar.",
    ],
    casePattern:
      "Yaptırım listesindeki bir kuruma benzer unvanla gelen bir transferde yükümlü önce eşleşmenin gerçek olup olmadığını araştırır, kaydını tutar; gerçek eşleşme doğrulanırsa dondurma ve bildirim süreci işletilir, hatalı eşleşmede ise araştırma sonucu kayıt altına alınarak işleme devam edilir.",
    legalAnchors: ["7262 sayılı Kanun", "BMGK 1718 (Kuzey Kore) ve 2231 (İran) sayılı kararlar", "mufettis.org Modül 1 §6"],
    reviewCards: [
      { term: "PF", detail: "Kitle imha silahlarının yayılmasının finansmanı riskidir." },
      { term: "Denetim ve İş Birliği Komisyonu", detail: "MASAK Başkanı başkanlığında, 9 üye katılımı + 9 üye oyuyla karar alır." },
      { term: "Kuzey Kore rejimi", detail: "1718 sayılı karar (2006), geniş kapsamlı ambargo ve finansal yasaklar." },
      { term: "İran rejimi", detail: "2231 sayılı karar (2015), JCPOA çerçevesinde kademeli kısıtlamalar." },
    ],
    miniQuizSeed: ["KİSYF Komisyonu'nun karar yeter sayısı nedir?", "KİSYF neden TF'den ayrı bir komisyonla yönetilir?"],
  },
  sib: {
    priority: "high",
    pdfRange: "MASAK_Rehber s. 221-254",
    coreNarrative:
      "Şüpheli işlem bildirimi (ŞİB), bir işleme konu malvarlığının yasa dışı yollardan elde edildiğine, yasa dışı amaçla kullanıldığına veya terör faaliyetiyle bağlantılı olduğuna dair bilgi, şüphe veya şüpheyi gerektiren bir hususun bulunması halinde MASAK'a yapılır; kesin delil aranmaz ve tutar gözetilmez. Bildirim, şüphenin oluştuğu tarihten itibaren en geç 10 iş günü içinde yapılır; gecikmesinde sakınca bulunan hallerde bu süre beklenmeksizin derhal bildirilir.",
    examFocus: "Bildirim şartları ve süreleri (10 iş günü / derhal), gizlilik (ihbar/tipping-off) yasağı ve koruma hükmü.",
    mustKnow: [
      "ŞİB için parasal alt veya üst sınır yoktur; 1 TL'lik bir işlem bile şüpheliyse bildirilir.",
      "İşlem tamamlanmasa dahi, yapılmaya teşebbüs edilen ve yükümlünün dikkati sayesinde gerçekleşmeyen işlemler de bildirim kapsamındadır.",
      "Genel bildirim süresi, şüphenin oluştuğu tarihten itibaren 10 iş günüdür; gecikmesinde sakınca bulunan hallerde bu süre beklenmeksizin derhal bildirim yapılır (Tedbirler Yönetmeliği md. 27, 13 Sıra No'lu Tebliğ).",
      "Bildirimde bulunulduğu veya bulunulacağı bilgisi; denetim elemanları ve mahkemeler dışında işlem tarafları dahil hiç kimseye (yurt dışındaki merkeze bile) açıklanamaz; ihlalin cezası 1-3 yıl hapis ve 5.000 güne kadar adli para cezasıdır.",
      "İyi niyetle yapılan bildirimler nedeniyle bildirimi yapan kişi ve kurum hiçbir hukuki veya cezai sorumluluk taşımaz.",
      "Elektronik bildirimde yasal sürenin takibinde esas alınan tarih, bildirimin MASAK (Başkanlık) kayıtlarına giriş tarihidir; dahili bildirim usulü serbestçe belirlenebilir ama sadece sözlü (şifahi) bildirim kabul edilemez.",
    ],
    confusions: [
      "ŞİB, ceza muhakemesindeki 'suç şüphesi' standardına bağlanamaz; bilgi, şüphe veya şüpheyi gerektiren bir husus yeterlidir.",
      "Bildirim süresi işlemin yapıldığı tarihte değil, şüphenin oluştuğu/anlaşıldığı tarihte başlar.",
      "Devamlı bilgi verme yükümlülüğü ŞİB'in yerini almaz; ikisi ayrı mekanizmadır.",
      "Rehberlerdeki şüpheli işlem tipleri sınırlayıcı değildir; bir işlem bu tiplerin hiçbirine uymasa da şüpheliyse bildirilmelidir.",
    ],
    casePattern:
      "Müşteri olağan profilinden saparak sık ve parçalı transferler yapıyor, açıklama vermekten kaçınıyor ve işlem ekonomik gerekçeyle açıklanamıyorsa uyum görevlisi durumu değerlendirip en geç 10 iş günü içinde MASAK'a bildirir; süreç boyunca müşteriye bildirimden söz edilmez.",
    legalAnchors: ["5549 sayılı Kanun md. 4", "Tedbirler Yönetmeliği md. 27-29", "MASAK 13 Sıra No.lu Tebliği", "mufettis.org Modül 1 §11 / Modül 2 §9"],
    reviewCards: [
      { term: "Şüphe eşiği", detail: "Bilgi, şüphe veya şüpheyi gerektiren husus yeterlidir; kesin delil aranmaz." },
      { term: "Süre", detail: "Genel: 10 iş günü; gecikmesinde sakınca bulunan hallerde: derhal." },
      { term: "Gizlilik (tipping-off)", detail: "Denetim elemanı ve mahkeme dışında kimseye açıklanamaz; ihlali 1-3 yıl hapis." },
      { term: "Koruma", detail: "İyi niyetli bildirimde bulunanlar hukuki/cezai sorumluluk taşımaz." },
      { term: "Bildirim tarihi", detail: "Elektronik bildirimde MASAK kayıtlarına giriş tarihi esastır." },
    ],
    miniQuizSeed: ["ŞİB için parasal eşik aranır mı?", "Terör finansmanı şüphesinde bildirim süresi nedir?"],
  },
  "islem-ertelemesi": {
    priority: "medium",
    pdfRange: "MASAK_Rehber s. 255-258",
    coreNarrative:
      "İşlemlerin ertelenmesi, ŞİB'in otomatik bir sonucu değil, şüpheli malvarlığının sistemden hızla çıkmasını önlemeye yönelik istisnai ve süreli bir acil durum mekanizmasıdır. Yetki nihai olarak Hazine ve Maliye Bakanı'na aittir (yalnızca Bakan Yardımcısına devredilebilir); yükümlü 'erteleme talepli' bir ŞİB ile süreci başlatabileceği gibi, MASAK re'sen veya yabancı bir FIU'nun karşılıklılık esasına dayalı talebiyle de erteleme tetiklenebilir.",
    examFocus: "Erteleme yetkisi ve süresi (7 iş günü), tetikleyiciler ve sürenin dolmasının sonucu.",
    mustKnow: [
      "Erteleme kararını Hazine ve Maliye Bakanı verir; yetki yalnızca Bakan Yardımcısına devredilebilir, MASAK Başkanı bu kararı veremez.",
      "Yükümlü, erteleme talepli ŞİB'i ilettiği andan itibaren en fazla 7 iş günü boyunca işlemi gerçekleştirmekten imtina etmekle yükümlüdür; bu süre kesindir ve uzatılamaz.",
      "7 iş günü içinde Bakanlık kararı tebliğ edilmezse yükümlünün işlemi gerçekleştirmeme yükümlülüğü kendiliğinden sona erer ve işlem yapılabilir.",
      "Erteleme; yükümlünün talebiyle, MASAK'ın re'sen incelemesiyle veya yabancı bir ülkenin muadil kuruluşunun (FIU) karşılıklılık esasına dayalı talebiyle tetiklenebilir.",
      "Ertelemenin kendisi için kanunda ayrı bir parasal alt limit aranmaz; karar, tutardan bağımsız olarak şüphenin ciddiyetine göre verilir. Erteleme talimatına uyulmaması ayrı bir idari/adli yaptırım nedenidir; güncel tutar ve usul MASAK'ın yıllık duyurularından teyit edilmelidir.",
    ],
    confusions: [
      "Her ŞİB otomatik olarak erteleme doğurmaz; erteleme ayrı ve istisnai bir taleple başlatılır.",
      "Erteleme süresi (7 iş günü) ile genel ŞİB bildirim süresi (10 iş günü) sık karıştırılır; erteleme süresi daha kısadır.",
      "Müşteriye erteleme veya şüphe hakkında bilgi verilmesi ihbar (tipping-off) yasağını ihlal eder; 'zaman kazanmak için açıklama yapılabilir' düşüncesi yanlıştır.",
      "İşlem gerçekleşmese bile kayıt tutma ve ŞİB değerlendirmesi yükümlülüğü ortadan kalkmaz.",
    ],
    casePattern:
      "Yüksek riskli bir hesaptan hızlı çıkış talimatı verildiğinde ve fonun derhal başka hesaplara dağılacağı öngörüldüğünde yükümlü erteleme talepli ŞİB hazırlar, Bakanlık kararına kadar (en fazla 7 iş günü) işlemi gerçekleştirmez; süre dolar da karar gelmezse işlemi yapmak zorundadır.",
    legalAnchors: ["5549 sayılı Kanun md. 19/A", "mufettis.org Modül 2 §10"],
    reviewCards: [
      { term: "Karar makamı", detail: "Hazine ve Maliye Bakanı; devredilirse yalnızca Bakan Yardımcısına." },
      { term: "Süre", detail: "En fazla 7 iş günü; kesindir, uzatılamaz." },
      { term: "Süre dolduğunda", detail: "Karar tebliğ edilmezse işlem gerçekleştirilebilir hale gelir." },
      { term: "Tetikleyiciler", detail: "Yükümlü talebi, MASAK re'sen incelemesi veya yabancı FIU talebi." },
    ],
    miniQuizSeed: ["Erteleme kararını kim verir ve süresi nedir?", "7 iş günü içinde karar gelmezse ne olur?"],
  },
  "fintek-riskleri": {
    priority: "medium",
    pdfRange: "MASAK_Rehber s. 134-151 ve 210-226",
    coreNarrative:
      "Ödeme sistemlerinde EFT (mesai saatleri içinde, anlık değil), FAST (7/24 anlık, Kolay Adres ile, günlük limit 250.000 TL) ve SWIFT (bir ödeme sistemi değil, sadece mesajlaşma ağı) ayrımı sınavda sık sorulur. 6493 sayılı Kanun ile ödeme ve elektronik para kuruluşları sisteme dahil olmuştur; bu kuruluşlar faiz veremez ve kredi kullandıramaz. Kripto varlık hizmet sağlayıcıları (KVHS) 2024'ten itibaren finansal kuruluş sayılır ve SPK izni zorunludur; 15.000 TL ve üzeri transferlerde Seyahat Kuralı (Travel Rule) uygulanır.",
    examFocus: "EFT/FAST/SWIFT farkı, 6493 ve kripto mevzuatı, Seyahat Kuralı'nın 15.000 TL eşiği ve privacy coin yasağı.",
    mustKnow: [
      "EFT bankalar arası TL transferini mesai saatleri içinde yapar; FAST 7/24 anlık çalışır ve Kolay Adres (telefon/TCKN) ile günlük 250.000 TL limitle işler; SWIFT bir ödeme sistemi değil, uluslararası mesajlaşma ağıdır.",
      "6493 sayılı Kanun kapsamındaki ödeme ve elektronik para kuruluşları, bankalardan farklı olarak faiz veremez ve kredi kullandıramaz; temel işlevleri transfer ve ödemeye aracılıktır.",
      "2024'ten itibaren kripto varlık hizmet sağlayıcıları (KVHS) finansal kuruluş statüsündedir, SPK'dan izin almak ve uyum programı/uyum görevlisi bulundurmak zorundadır.",
      "Seyahat Kuralı (Travel Rule): 15.000 TL ve üzerindeki kripto transferlerinde gönderen ve alıcıya ait kimlik/hesap bilgileri transfer mesajına eklenir; eksik bilgi varsa tamamlatılır, sağlanamazsa işlem iade edilir.",
      "Bağımsız (unhosted) cüzdanlara transferde bilgi aktarımı teknik olarak mümkün olmadığından hizmet sağlayıcı müşteriden yazılı beyan alarak risk temelli değerlendirme yapar; gizlilik odaklı (privacy coin) varlıkların ticaretine izin veren platformlar UKT/işlem kabul edemez.",
      "KVHS'lerde ilk finansal hareketin müşterinin kendi adına kayıtlı bir banka hesabından gelmesi ve kayıtların 8 yıl saklanması beklenir.",
    ],
    confusions: [
      "SWIFT bir ödeme sistemi değildir; EFT parayı doğrudan transfer ederken SWIFT sadece talimatı ileten güvenli bir mesajlaşma ağıdır.",
      "Elektronik para her zaman bir itibari para (TL, USD) karşılığıdır ve değeri sabittir; kripto varlık ise değeri piyasada belirlenen gayri maddi bir varlıktır.",
      "Ödeme/e-para kuruluşları banka gibi görünse de kredi veremez ve müşteri parasına faiz işletemez.",
      "Seyahat kuralında bilgi eksikliği tespit edildiğinde işlem doğrudan bloke edilmez; önce eksikliğin tamamlanması istenir, sağlanamazsa iade edilir.",
    ],
    casePattern:
      "Bir KVHS, 15.000 TL üzerindeki bir transferde karşı taraf bilgilerini eksik alırsa önce göndericiden eksik bilgiyi tamamlamasını ister; bilgi tamamlanamazsa transferi iade eder ve durumu risk değerlendirmesine yansıtır.",
    legalAnchors: ["6493 sayılı Kanun", "6362 sayılı Kanun (kripto varlık düzenlemesi)", "Tedbirler Yönetmeliği kripto transfer hükümleri", "mufettis.org Modül 1 §10"],
    reviewCards: [
      { term: "EFT / FAST / SWIFT", detail: "EFT mesai saatinde, FAST 7/24 anlık (250.000 TL/gün), SWIFT sadece mesajlaşma ağıdır." },
      { term: "6493 sayılı Kanun", detail: "Ödeme ve e-para kuruluşları; faiz ve kredi veremezler." },
      { term: "Seyahat Kuralı", detail: "15.000 TL ve üzeri kripto transferinde taraf bilgisi zorunludur." },
      { term: "Privacy coin", detail: "Gizlilik odaklı varlık sunan KVHS'ler UKT/işlem yapamaz." },
    ],
    miniQuizSeed: ["Seyahat Kuralı hangi tutardan itibaren uygulanır?", "SWIFT ile EFT arasındaki temel fark nedir?"],
  },
  "uyum-yonetimi": {
    priority: "high",
    pdfRange: "MASAK_Rehber s. 244-279 ve 290-294",
    coreNarrative:
      "Uyum programı; kurum politikası, risk yönetimi, izleme-kontrol, uyum görevlisi/birimi, eğitim ve iç denetimden oluşan altı bileşenli bir sistemdir. Programın etkinliğinden nihai olarak Yönetim Kurulu sorumludur; yetki devri bu sorumluluğu ortadan kaldırmaz. Lisans zorunluluğunun hukuki dayanağı 25 Aralık 2024 tarihli (RG 32763) Uyum Programları Yönetmeliği değişikliğiyle oluşturulmuş, uygulama usulü ise 9 Eylül 2025 tarihli MASAK Genel Tebliği Sıra No: 30 (RG 33012) ile detaylandırılmıştır; uyum görevlisi/yardımcısı olarak görev yapabilmek için bu lisans zorunludur.",
    examFocus: "Altı bileşen, yönetim kurulu/uyum görevlisi sorumluluk ayrımı, finansal grup bilgi paylaşımı ve lisans sınavı/yenileme kuralları.",
    mustKnow: [
      "Uyum programının altı bileşeni: kurum politikası ve prosedürleri, risk yönetimi, izleme ve kontrol, uyum görevlisi ve uyum birimi, eğitim, iç denetim.",
      "Yönetim Kurulu, uyum programının etkinliğinden nihai olarak sorumludur; gözetim yetkisini bir üyeye devretse bile bu sorumluluk kurulun bütününde kalır.",
      "MASAK'a şüpheli işlem bildiriminde bulunma yetkisi münhasıran uyum görevlisine aittir ve devredilemez; kurum politikası en az 2 yılda bir gözden geçirilir.",
      "Finansal grupta 'kontrol' için %51 hisse şartı aranmaz, yönetim kurulu çoğunluğunu atama/görevden alma gücü yeterlidir; grup içi bilgi paylaşımı serbesttir ama ŞİB yapıldığı bilgisi grup içinde dahi paylaşılamaz.",
      "Uyum Görevlisi Lisansı sınavında genel başarı notu en az 65, modüllü sınavlarda her modülden en az 50 puan şarttır; lisans MASAK sicilinde izlenir ve her 3 yılda bir yenileme eğitimi gerekir.",
      "Son sınav veya yenileme eğitiminden itibaren 5 yıl geçerse lisans tamamen iptal olur; MASAK'ta idari düzeyde en az 4 yıl veya uzman/denetim elemanı olarak en az 12 yıl çalışanlar sınavdan muaftır (yenileme muafiyeti sadece MASAK'ta halen görevli olanlara tanınır).",
      "Münhasıran uyum görevlisi atanan kişinin yönetim kurulu üyeleri/genel müdürle 2. dereceye kadar kan veya kayın hısımlığı bulunamaz ve kurumda nitelikli pay (%10 ve üzeri) sahibi olamaz.",
    ],
    confusions: [
      "Yetki devri yönetim kurulunun nihai sorumluluğunu kaldırmaz; sorumluluk her zaman kurulun bütününde kalır.",
      "İzleme-kontrol (işlemler sürerken yapılan sıcak takip) ile iç denetim (sistemin geriye dönük ve bağımsız test edilmesi) farklı fonksiyonlardır.",
      "Grup içi bilgi paylaşımı serbestliği ŞİB yapıldığı bilgisini kapsamaz; bu bilgi grup içinde dahi mutlak gizlidir.",
      "Lisansın geçerlilik süresi belgenin basıldığı tarihte değil, sınavın yapıldığı tarihte başlar; yenileme muafiyeti kurumdan ayrılan eski MASAK personeline uygulanmaz.",
      "Sınav muafiyeti (4/12 yıl deneyim) ile yenileme eğitimi muafiyeti farklı kurallardır; biri sınavı, diğeri 3 yıllık döngüyü kapsar.",
    ],
    casePattern:
      "Bir aday modül sınavlarından 48, 72 ve 70 puan alırsa ortalaması 65'in altında kalmasa bile 48 puanla modül barajı olan 50'nin altında kaldığından sınavı geçemez; MASAK'ta 5 yıl daire başkanlığı yapıp ayrılan biri sınav muafiyetini korusa da kurumdan ayrıldığı için yenileme eğitimi muafiyetinden yararlanamaz.",
    legalAnchors: ["5549 sayılı Kanun md. 5", "Uyum Programları Yönetmeliği", "MASAK Genel Tebliği Sıra No: 30 (Uyum Görevlisi Lisansı, RG 9 Eylül 2025/33012)", "mufettis.org Modül 2 §2-4"],
    reviewCards: [
      { term: "Altı bileşen", detail: "Kurum politikası, risk yönetimi, izleme-kontrol, uyum görevlisi/birimi, eğitim, iç denetim." },
      { term: "Nihai sorumluluk", detail: "Yönetim Kurulu'ndadır; yetki devri sorumluluğu kaldırmaz." },
      { term: "Lisans sınavı", detail: "Genel not en az 65, her modülden en az 50." },
      { term: "Lisans döngüsü", detail: "3 yılda bir yenileme; 5 yıl aksama halinde tam iptal." },
      { term: "Muafiyetler", detail: "MASAK'ta idari görevde 4 yıl veya uzman/denetim elemanı olarak 12 yıl çalışanlar sınavdan muaf." },
      { term: "Grup gizliliği", detail: "ŞİB bilgisi grup içinde dahi paylaşılamaz." },
    ],
    miniQuizSeed: ["Yönetim kurulu yetki devrettiğinde nihai sorumluluk kime aittir?", "Uyum görevlisi lisans sınavının baraj ve ortalama şartı nedir?"],
  },
  "denetim-idari-ceza": {
    priority: "medium",
    pdfRange: "MASAK_Rehber s. 294-313",
    coreNarrative:
      "Yükümlülük denetiminde temel ayrım, hangi ihlalin idari para cezasıyla, hangisinin adli ceza (hapis) riskiyle sonuçlanacağıdır: kimlik tespiti, ŞİB yapmama ve devamlı bilgi verme ihlalleri idari ceza mantığında değerlendirilirken; ŞİB gizliliği (tipping-off), bilgi-belge verme ve muhafaza-ibraz yükümlülüklerinin ihlali adli/cezai suç oluşturur. Finansal kuruluşlarda idari para cezası sabit tutarın katlanması değil, işlem tutarına bağlı ayrı bir hesaplamayla uygulanır ve yıllık iki kademeli bir üst sınıra tabidir.",
    examFocus: "İdari/adli ceza ayrımı, 5549 sayılı Kanun md. 13-14 ceza mekanizması, finansal kuruluş çarpanı, yıllık tavan ve YKÜ/üst düzey yöneticiye ayrı ceza uygulaması.",
    mustKnow: [
      "5549 sayılı Kanun md. 13/1 uyarınca müşterinin tanınması ve devamlı bilgi verme ihlalinde 30.000 TL, ŞİB yapmama ihlalinde 50.000 TL maktu idari para cezası uygulanır; bu tutarlar 5549 sayılı Kanun md. 28 uyarınca (213 sayılı Vergi Usul Kanunu'ndaki yeniden değerleme oranı esas alınarak) her yıl başında artırılır.",
      "Finansal kuruluşlar (banka, ödeme/e-para kuruluşu, aracı kurum, sigorta/emeklilik şirketi, yetkili müessese vb.) için ceza sabit tutarın basitçe 2 katı değildir: işlem tutarının yüzde beşinden az olmamak üzere iki kat oranında hesaplanır.",
      "Yıllık ceza üst sınırı iki kademelidir: iki kat ceza uygulanan finansal kuruluşlar için 40.000.000 TL, diğer yükümlüler için 4.000.000 TL'dir.",
      "Adli ceza kapsamı sadece ŞİB gizliliği (md. 4/2) ile sınırlı değildir; bilgi ve belge verme yükümlülüğünün (md. 7) ve muhafaza-ibraz yükümlülüğünün (md. 8) ihlali de md. 14 uyarınca 1-3 yıl hapis ve 5.000 güne kadar adli para cezasını gerektirebilir.",
      "Yönetim kurulu üyesi veya sorumlu üst düzey yöneticiye, yükümlüye kesilen idari para cezasının dörtte biri (1/4) oranında ayrıca ceza uygulanabilir.",
      "İkinci idari para cezasının tebliğinden itibaren 30 gün içinde eksiklikler giderilmezse yükümlünün faaliyetinin durdurulması, kısıtlanması veya faaliyet izin belgesinin iptaline yönelik tedbirler gündeme gelebilir.",
    ],
    confusions: [
      "Tüm ihlaller aynı yaptırıma tabi değildir: kimlik tespiti/ŞİB yapmama idari cezaya, ŞİB gizliliği/bilgi-belge/muhafaza-ibraz ihlalleri ise adli (hapis) sonuca tabidir.",
      "Finansal kuruluş cezası 'sabit tutarın 2 katı' değil, 'işlem tutarının en az %5'i, iki kat oranında' hesaplanan ayrı bir mekanizmadır; iki kademeli yıllık tavan (40.000.000 TL / 4.000.000 TL) da yükümlü türüne göre değişir.",
      "İdari para cezası sadece yükümlü tüzel kişiye kesilmez; sorumlu yönetim kurulu üyesi/üst düzey yöneticiye de yükümlüye kesilen cezanın 1/4'ü oranında ayrı ceza uygulanabilir.",
    ],
    casePattern:
      "Bir bankada kimlik tespiti yapılmadığı tespit edilirse idari para cezası, banka finansal kuruluş olduğu için işlem tutarının en az %5'i esas alınarak iki kat oranında hesaplanır ve sorumlu üst düzey yöneticiye de bu cezanın 1/4'ü ayrıca uygulanabilir; aynı bankada bir çalışan ŞİB yapıldığını müşteriye söylerse bu idari değil adli bir suç olup 1-3 yıl hapis riskini doğurur.",
    legalAnchors: ["5549 sayılı Kanun md. 13 (idari para cezası)", "5549 sayılı Kanun md. 14 (adli ceza)", "5549 sayılı Kanun md. 28 (yeniden değerleme, VUK oranı esaslı)"],
    reviewCards: [
      { term: "Temel maktu cezalar", detail: "Kimlik tespiti/devamlı bilgi verme: 30.000 TL; ŞİB yapmama: 50.000 TL (md. 13/1, yıllık yeniden değerleme ile artar)." },
      { term: "Finansal kuruluş çarpanı", detail: "İşlem tutarının en az %5'i, iki kat oranında; yıllık tavan 40.000.000 TL (diğerlerinde 4.000.000 TL)." },
      { term: "YKÜ/üst düzey yönetici cezası", detail: "Yükümlüye kesilen idari para cezasının 1/4'ü oranında ayrıca uygulanabilir." },
      { term: "Adli ceza kapsamı", detail: "ŞİB gizliliği + bilgi-belge verme + muhafaza-ibraz ihlalleri: 1-3 yıl hapis + 5.000 güne kadar adli para cezası." },
    ],
    miniQuizSeed: ["Hangi ihlaller idari değil adli ceza riski taşır?", "Finansal kuruluşlarda ceza nasıl hesaplanır ve yıllık tavan nedir?"],
  },
  "uzaktan-kimlik": {
    priority: "short",
    pdfRange: "MASAK_Rehber s. 296 ve Tebliğ 19/32 notları",
    coreNarrative:
      "Uzaktan Kimlik Tespiti (UKT), müşteri ile yükümlünün fiziksel olarak aynı ortamda bulunmasına gerek kalmadan kimlik doğrulamasını sağlar; hem sektörel mevzuatın (BDDK/SPK) izni hem de MASAK'ın 19 No'lu Genel Tebliği'ndeki usul birlikte aranır. Süreç görüntülü görüşme veya yapay zekâ destekli otomatik doğrulama ile yürütülür; her durumda çevrimiçi, kesintisiz ve gerçek zamanlı olması, canlılık testi ve biyometrik yüz eşleşmesi içermesi zorunludur.",
    examFocus: "UKT'nin hukuki dayanağı, NFC/güvenlik öğesi doğrulaması, ilk finansal hareket kuralı ve UKT yapamayacak yükümlüler.",
    mustKnow: [
      "UKT için hem sektörel mevzuatın (BDDK, SPK vb.) izni hem de MASAK 19 No'lu Genel Tebliği'ndeki düzenleme birlikte bulunmalıdır; mevcut çerçeve sadece gerçek kişiler içindir.",
      "Yeni nesil kimlik kartlarındaki çip NFC ile doğrulanır; NFC mümkün değilse hologram, mikro yazı ve kinegram gibi en az dört farklı güvenlik öğesinin görüntülü görüşmede teyit edilmesi gerekir.",
      "Canlılık testi (liveness detection) ve kimlik fotoğrafı ile o anki yüzün biyometrik eşleşmesi sürecin ayrılmaz parçasıdır.",
      "UKT ile açılan hesapta ilk finansal hareketin, müşterinin daha önce yüz yüze kimlik tespiti yapılmış bir banka hesabından gelmesi şarttır.",
      "Süreçte insan müdahalesi olmadan yapay zekâ kullanılıyorsa, yanlış kabul oranının on milyonda birden (1/10.000.000) az olduğunu gösteren bir TSE raporu gerekir (MASAK Genel Tebliği Sıra No: 19); yurt dışı menşeli ürünlerde uluslararası geçerliliği olan bir sertifika varsa TSE raporu aranmayabilir.",
      "Gizlilik odaklı (privacy coin) kripto varlık sunan platformlar ile MASAK'ça yetkilendirilmeyen yükümlüler (ör. kuyumcu, emlakçı) UKT yapamaz.",
    ],
    confusions: [
      "UKT her yükümlü tarafından serbestçe yapılamaz; sadece MASAK tebliğ kapsamına alınan yükümlü grupları (bankalar, aracı kurumlar, portföy yönetim şirketleri, hayat sigortası, belirli ödeme/e-para kuruluşları) bu yöntemi kullanabilir.",
      "NFC doğrulaması yapılamadığında sadece sözlü beyan veya kimlik fotokopisi yeterli değildir; en az dört farklı güvenlik öğesinin görsel teyidi zorunludur.",
      "UKT bir kolaylık aracıdır, KYC disiplinini (profil, fon kaynağı, sürekli izleme) ortadan kaldırmaz.",
    ],
    casePattern:
      "Yabancı uyruklu bir müşteri uzaktan hesap açarken kimlik NFC ile doğrulanır, canlılık testi ve biyometrik eşleşme yapılır, fon kaynağı ve işlem amacı sorulur; hesaba yapılacak ilk transferin müşterinin daha önce yüz yüze doğrulanmış bir banka hesabından gelmesi beklenir.",
    legalAnchors: ["MASAK Genel Tebliği Sıra No: 19", "Tedbirler Yönetmeliği", "mufettis.org Modül 2 §8"],
    reviewCards: [
      { term: "Hukuki dayanak", detail: "Sektörel mevzuat izni + MASAK 19 No'lu Tebliği birlikte gerekir." },
      { term: "Doğrulama katmanları", detail: "NFC (veya 4 güvenlik öğesi), canlılık testi, biyometrik yüz eşleşmesi." },
      { term: "İlk finansal hareket", detail: "Müşterinin yüz yüze doğrulanmış banka hesabından gelmelidir." },
      { term: "Kapsam dışı", detail: "Tüzel kişiler, privacy coin sunan KVHS'ler ve yetkilendirilmemiş yükümlüler UKT yapamaz." },
    ],
    miniQuizSeed: ["NFC doğrulaması yapılamazsa hangi asgari kural uygulanır?", "UKT ile açılan hesapta ilk finansal hareket kuralı nedir?"],
  },
  "diger-yukumlulukler": {
    priority: "short",
    pdfRange: "MASAK_Rehber s. 280-297",
    coreNarrative:
      "Yükümlüler; devamlı bilgi verme, bilgi-belge verme, muhafaza-ibraz ve elektronik tebligat gibi ek yükümlülüklere tabidir. Muhafaza süresi 5549 sayılı Kanun md. 8 uyarınca 8 yıldır. Bilgi-belge verme (md. 7) ve muhafaza-ibraz (md. 8) yükümlülüklerinin ihlali sadece idari değil, md. 14 uyarınca 1-3 yıl hapis ve 5.000 güne kadar adli para cezası gerektirebilen adli bir suçtur.",
    examFocus: "Bilgi-belge verme sınırları, muhafaza süresinin başlangıcı, elektronik tebligat usulü ve koruma hükmü.",
    mustKnow: [
      "Yetkili makamdan gelen bilgi ve belge taleplerinde özel kanunlardaki (bankacılık sırrı vb.) gizlilik hükümleri genellikle kaçınma gerekçesi yapılamaz.",
      "Muhafaza süresi 8 yıldır ('8 yıl = her şey' hafıza kuralı: muhafaza, kayıt saklama) ve 5549 sayılı Kanun md. 8'de açıkça düzenlenmiştir.",
      "Bilgi-belge verme veya muhafaza-ibraz yükümlülüğüne uymamak idari değil adli suçtur; md. 14 uyarınca 1-3 yıl hapis ve 5.000 güne kadar adli para cezası riski doğurur.",
      "Kimlik tespiti belgelerinin muhafaza başlangıcı iş ilişkisinin SONA ERDİĞİ tarihtir; işlem belge ve kayıtlarının başlangıcı ise işlemin/son kaydın yapıldığı tarihtir.",
      "Elektronik tebligatta belge, muhatabın elektronik adresine ulaştığı anda tebliğ edilmiş sayılır; genel idari usuldeki '5 gün sonra tebliğ edilmiş sayılır' kuralı burada uygulanmaz.",
      "Devamlı bilgi verme yükümlülüğünde parasal bir eşik şu an için aktif/belirlenmiş değildir.",
    ],
    confusions: [
      "Muhafaza süresinin tüm belge türlerinde aynı tarihten başladığı sanılır; oysa kimlik belgeleri ilişkinin bitişinden, işlem belgeleri işlem tarihinden sayılır.",
      "Elektronik tebligatı sadece teknik bir başvuru usulü sanmak yanlıştır; tebliğ anı doğrudan hukuki sonuç (süre başlangıcı) doğurur ve 5 günlük genel idari kural burada geçerli değildir.",
      "Koruma hükmü, iyi niyetli bildirim yapanları korur; bunu müşteriye açıklama yapma izni gibi yorumlamak yanlıştır.",
      "Bilgi-belge ve muhafaza-ibraz ihlalleri sadece idari para cezası gerektiren teknik aksaklıklar sanılmamalıdır; bunlar md. 14 kapsamında hapis cezası riski taşıyan adli suçlardır.",
    ],
    casePattern:
      "Bir hesap kapatıldıktan sonra, kimlik tespiti belgelerinin saklama süresi hesabın kapandığı (iş ilişkisinin sona erdiği) tarihten itibaren başlar; aynı müşteriye ait işlem kayıtlarının saklama süresi ise ilgili işlemin yapıldığı tarihten itibaren ayrıca işler.",
    legalAnchors: ["5549 sayılı Kanun md. 6-9/A", "Tedbirler Yönetmeliği (muhafaza-ibraz hükümleri)", "Elektronik Tebligat düzenlemeleri", "mufettis.org Özet §12"],
    reviewCards: [
      { term: "Bilgi-belge", detail: "Yetkili talebe karşı özel kanun savunması genellikle sınırlıdır." },
      { term: "Muhafaza süresi", detail: "8 yıl (5549 sayılı Kanun md. 8)." },
    { term: "İhlalin niteliği", detail: "Bilgi-belge/muhafaza-ibraz ihlali adlidir: 1-3 yıl hapis + 5.000 güne kadar adli para cezası." },
      { term: "Başlangıç tarihi", detail: "Kimlik belgeleri: ilişkinin bitişi; işlem belgeleri: işlem tarihi." },
      { term: "Elektronik tebligat", detail: "Elektronik adrese ulaştığı anda tebliğ edilmiş sayılır, 5 gün kuralı yoktur." },
    ],
    miniQuizSeed: ["Kimlik tespiti belgelerinin muhafaza süresi hangi tarihten başlar?", "Elektronik tebligat ne zaman yapılmış sayılır?"],
  },
  "musterinin-taninmasi": {
    priority: "high",
    pdfRange: "MASAK_Rehber s. 165-226",
    coreNarrative:
      "Müşterinin tanınması (KYC), sadece kimlik almak değil; gerçek faydalanıcının tespiti, ilişki boyunca sürekli izleme ve risk seviyesine göre basitleştirilmiş veya sıkılaştırılmış tedbir uygulamasıdır. Gerçek kişilerde ad-soyad, doğum tarihi, T.C. kimlik numarası ve kimlik belge türü/numarası mutlaka teyit edilir; meslek bilgisi alınır ama teyidi zorunlu değildir. Gerçek faydalanıcı, tüzel yapının %25'ini aşan hisseye sahip gerçek kişi ortak, yoksa nihai kontrol sahibi gerçek kişi, o da yoksa ticaret sicilindeki en üst düzey icra yetkilisi olarak üç aşamalı bulunur.",
    examFocus: "Teyit edilmesi zorunlu/zorunlu olmayan bilgiler, gerçek faydalanıcı hiyerarşisi, PEP/sıkılaştırılmış tedbir ve basitleştirilmiş tedbirin sınırı.",
    mustKnow: [
      "Gerçek kişilerde ad-soyad, doğum tarihi, T.C. kimlik numarası ve kimlik belgesinin tür/numarası mutlaka güvenilir belgeyle teyit edilir; meslek ve iletişim bilgisi alınır ama teyidi zorunlu değildir.",
      "Adres teyidi sadece sürekli iş ilişkisi tesisinde zorunludur (yerleşim yeri belgesi, son 3 aya ait fatura vb.); tüzel kişilerde teyit kaynağı MERSİS veya Ticaret Sicili Gazetesi'dir.",
      "Gerçek faydalanıcı üç aşamada belirlenir: önce %25'i aşan hisseye sahip gerçek kişi ortak aranır, yoksa oy hakkı/YK atama gücüyle nihai kontrolü elinde tutan gerçek kişi aranır, o da bulunamazsa ticaret sicilindeki en üst düzey icra yetkilisi (GM/CEO) gerçek faydalanıcı kabul edilir.",
      "Yabancı kamusal nüfuz sahibi kişiler (PEP) her zaman yüksek riskli kabul edilir; yerli PEP ve uluslararası kuruluş görevlileri ise yükümlünün kendi risk değerlendirmesine göre sıkılaştırılmış tedbire tabi tutulur.",
      "PEP görevden ayrılsa veya bu sıfatını kaybetse dahi risk hemen bitmez; MASAK Genel Tebliği Sıra No: 21 uyarınca sıkılaştırılmış tedbirler görevin bırakıldığı/kaybedildiği tarihten itibaren en az 1 yıl süreyle sürdürülür, işlem veya iş ilişkisi risk taşımaya devam ediyorsa bu süre uzatılabilir.",
      "Basitleştirilmiş tedbir bir muafiyet değil kolaylıktır; en ufak aklama/TF şüphesi doğduğu an derhal sona erer ve standart/sıkılaştırılmış tedbir ile ŞİB değerlendirmesi başlar.",
      "Sıkılaştırılmış tedbirde üst düzey yönetici onayı, servet kaynağının araştırılması ve yoğun izleme şarttır; KVHS ile kurulan ilişkiler de yapısal olarak yüksek riskli kabul edilir.",
    ],
    confusions: [
      "KYC sadece ilk hesap açılışında yapılan bir işlem değildir; sürekli izleme gereği müşteri profili düzenli güncellenmeli ve risk değişince (ör. ev hanımı bir hesaba aniden büyük tutar gelmesi) yeniden teyit yapılmalıdır.",
      "Gerçek faydalanıcı, işlemi fiilen yapan temsilciyle karıştırılmamalıdır; gerçek faydalanıcı nihai kontrol/menfaat sahibidir.",
      "İşlem reddedilse bile durumun ŞİB olarak bildirilip bildirilmeyeceği ayrıca değerlendirilmelidir; ret otomatik olarak bildirim gerekliliğini ortadan kaldırmaz.",
      "Basitleştirilmiş tedbir, kimlik tespitinden tam muafiyet anlamına gelmez; sadece teyit/adres tespiti gibi süreçlerde kolaylık sağlar.",
      "'Başkası hesabına hareket edildiği' beyan edilmese bile işlemden şüpheleniliyorsa yükümlü doğrudan gerçek faydalanıcıyı bulmaya yönelik araştırma yapmalıdır.",
    ],
    casePattern:
      "Bir şirkette %25'i aşan hisseye sahip gerçek kişi ortak bulunamaz ve nihai kontrol sahibi bir gerçek kişiye de ulaşılamazsa, ticaret sicilinde kayıtlı en üst düzey icra yetkilisi (genel müdür) gerçek faydalanıcı olarak kabul edilir; müşterinin profiliyle uyumsuz, ekonomik gerekçesi olmayan zincirleme küçük işlemler ise tutarı ne olursa olsun izleme biriminin dikkatini çekmelidir.",
    legalAnchors: ["Tedbirler Yönetmeliği md. 5-26/A", "5549 sayılı Kanun md. 3, md. 15", "mufettis.org Modül 2 §5-7"],
    reviewCards: [
      { term: "Teyidi zorunlu bilgiler", detail: "Ad-soyad, doğum tarihi, TCKN, kimlik belge tür/no; meslek bilgisi teyide tabi değildir." },
      { term: "Gerçek faydalanıcı", detail: "%25 hisse sahibi -> nihai kontrol sahibi -> en üst düzey icra yetkilisi (üç aşamalı arama)." },
      { term: "PEP", detail: "Yabancı PEP her zaman yüksek riskli; görevden ayrılsa da en az 1 yıl sıkılaştırılmış tedbir sürer." },
      { term: "Basitleştirilmiş tedbir", detail: "Şüphe anında derhal sona eren bir kolaylıktır, muafiyet değildir." },
      { term: "Sıkılaştırılmış tedbir", detail: "Üst düzey onay + servet kaynağı araştırması + yoğun izleme gerektirir." },
      { term: "Görevler ayrılığı", detail: "İşlemi yapan personel aynı işlemin izleme/kontrolünü yapamaz." },
    ],
    miniQuizSeed: ["Gerçek faydalanıcı bulunamadığında son çare kim kabul edilir?", "Şüphe halinde basitleştirilmiş tedbir uygulanmaya devam eder mi?"],
  },
};

type LessonV4Blueprint = {
  deepDiveTitles: string[];
  deepDiveNotes: string[];
  tableThemes: string[];
  caseThemes: string[];
  glossary: KeyCard[];
};

const lessonV4Blueprints: Record<string, LessonV4Blueprint> = {
  "masak-gorevleri": {
    deepDiveTitles: ["Kuruluş kanunu ve faaliyete geçiş tarihi", "MASAK'ın idari MİB konumu", "Bildirim alma ve analiz döngüsü", "Kurumlar arası bilgi paylaşımı", "Denetim elemanı ve yükümlülük denetimi", "Koordinasyon kurulu ile görev ayrımı"],
    deepDiveNotes: [
      "MASAK, 1996 yılında yürürlüğe giren 4208 sayılı Karaparanın Aklanmasının Önlenmesine Dair Kanun ile kurulmuş ve 17 Şubat 1997'de fiilen faaliyete başlamıştır. Sınav sorularında bu iki tarih (kuruluş kanunu 1996, fiili faaliyet 17 Şubat 1997) sıkça karıştırılacak şekilde birbirine yakın yıllarla çeldirilir.",
      "MASAK idari modelde konumlanır: yükümlülerle kolluk/adli makam arasında analiz ve koordinasyon köprüsü kurar. Sınavda MASAK'ı doğrudan soruşturma makamı gibi gösteren seçenekler elenir.",
      "Bildirim alma, veriyi zenginleştirme, örüntü analizi ve ilgili makama aktarma zinciri tek süreçtir. ŞİB gelmesi otomatik dava veya dondurma anlamına gelmez.",
      "Bilgi paylaşımı ulusal ve uluslararası düzeyde yapılabilir; ancak paylaşım, yargısal kararın yerine geçmez. Bu ayrım MASAK görevi sorularında ana çeldiricidir.",
      "Denetim elemanı kavramı yükümlülük denetiminde görevlendirilebilecek denetim kapasitesini ifade eder; sadece MASAK personeline indirgenmez.",
      "Koordinasyon kurulu politika, eşgüdüm ve strateji işlevi görür. Tekil ŞİB dosyasını yargılayan veya ceza veren kurul gibi düşünülmemelidir.",
    ],
    tableThemes: ["MASAK, savcılık ve yükümlü ayrımı"],
    caseThemes: ["Şüpheli işlemden adli makama giden analiz zinciri"],
    glossary: [{ term: "İdari MİB", detail: "Bildirim, analiz ve paylaşım merkezli mali istihbarat modeli." }],
  },
  "uluslararasi-standartlar": {
    deepDiveTitles: ["MİB modelleri", "FATF tavsiyelerinin sınav değeri", "Karşılıklı değerlendirme ve etkililik", "Gri liste, kara liste ve takip süreçleri", "Türkiye'nin 2021-2024 gri liste süreci", "Egmont güvenli bilgi ağı", "MONEYVAL ve bölgesel yapılar"],
    deepDiveNotes: [
      "MİB modellerinde idari, kolluk, adli/savcılık ve karma yapı ayrılır. İdari model yükümlü güvenini ve finansal analiz uzmanlığını; kolluk modeli hızlı soruşturma refleksini öne çıkarır.",
      "FATF tavsiyeleri yalnız tavsiye metni gibi okunmaz; ülkelerin teknik uyum ve etkililik değerlendirmesini belirleyen sınav omurgasıdır. 2025 itibarıyla FATF'in 38 ülke ve 2 bölgesel organizasyon (Avrupa Komisyonu, Körfez İşbirliği Konseyi) üyesi vardır.",
      "Karşılıklı değerlendirme iki düzeyde okunur: mevzuat var mı ve fiilen sonuç üretiyor mu. Kağıt üzerindeki düzenleme güçlü olsa bile uygulama zayıfsa etkililik sorunu doğar.",
      "Gri liste stratejik eksikliklerin artırılmış izleme sürecidir; kara liste daha ağır karşı tedbir riskini çağrıştırır. Listeden çıkış yükümlülüklerin bittiği anlamına gelmez. 2025 Haziran itibarıyla kara listede yalnızca İran, Kuzey Kore ve Myanmar bulunur.",
      "Türkiye Ekim 2021'de gri listeye girdi; eylem planı kapsamında 3-6 Mayıs 2024'te ICRG'nin Avrupa-Asya Ortak Grubu ülke ziyareti yaptı ve hazırlanan Ülke Ziyaret Raporu Haziran 2024 Genel Kurulu'nda kabul edilerek Türkiye gri listeden çıktı; bu süreçle FATF'in 4. tur karşılıklı değerlendirmesi tamamlanmış oldu.",
      "Egmont, MİB'ler arası güvenli bilgi değişimi ağıdır; kolluk teşkilatı değildir. Sınavda Interpol/Europol gibi yapılardan ayrıştırılır. MASAK, Egmont Güvenli Ağı'na (ESW) 2001'de dahil olmuştur.",
      "MONEYVAL gibi bölgesel yapılar FATF metodolojisini bölgesel izleme ve değerlendirme kapasitesiyle uygular.",
    ],
    tableThemes: ["MİB modelleri karşılaştırması", "FATF, Egmont ve MONEYVAL ayrımı"],
    caseThemes: ["Teknik uyum var ama etkililik zayıfsa ne olur?"],
    glossary: [{ term: "Etkililik", detail: "Sistemin kağıt üzerinde değil sonuç üretme kapasitesidir." }],
  },
  "ulusal-koordinasyon": {
    deepDiveTitles: ["Ulusal risk değerlendirmesi", "Sektör kırılganlığı", "Strateji belgelerinin yükümlüye etkisi", "KİSYF riskinin ayrı izlenmesi", "ŞİB rehberlerinin risk temelli güncellenmesi"],
    deepDiveNotes: [
      "Ulusal risk değerlendirmesi ülke, sektör, ürün, hizmet ve kanal seviyesindeki tehdidi gösterir. Yükümlünün kendi müşteri risk modeli bu üst çerçeveden kopuk kurulamaz.",
      "Sektör kırılganlığı aynı yükümlülüğün her sektörde aynı yoğunlukta uygulanmayacağını gösterir; yüksek riskli sektörde eğitim, izleme ve ŞİB tetikleyicileri sıkılaşır.",
      "Strateji belgeleri sınavda teorik belge değil, denetim ve rehber önceliklerini yönlendiren uygulama aracı olarak okunmalıdır.",
      "KİSYF ayrı izlenir çünkü yayılma finansmanı klasik aklama/TF göstergelerinden farklı liste, yaptırım ve ihracat bağlantıları üretebilir.",
      "ŞİB rehberleri ulusal risk sonuçlarına göre güncellenir; rehberdeki tipoloji örneği sınırlı liste değil olay okuma yardımcısıdır.",
    ],
    tableThemes: ["Ulusal risk ve müşteri riski ayrımı"],
    caseThemes: ["Yüksek riskli sektörün uyum programına etkisi"],
    glossary: [{ term: "Sektör kırılganlığı", detail: "Ürün, kanal, müşteri ve ülke risklerinin sektör düzeyindeki görünümü." }],
  },
  aklama: {
    deepDiveTitles: ["Aklama suçunun sınav mantığı", "Yerleştirme aşaması", "Ayrıştırma aşaması", "Bütünleştirme aşaması", "Öncül suç ve malvarlığı değeri", "Tipoloji okuma yöntemi", "Ekonomik makuliyet testi", "Elkoyma ve müsadere bağlantısı", "Önleyici yükümlülük ile suç ayrımı"],
    deepDiveNotes: [
      "Aklama sorularında önce malvarlığı değerinin suçtan kaynaklanıp kaynaklanmadığı, sonra bu değerin kaynağının gizlenip gizlenmediği aranır. Salt yüksek tutar veya karmaşıklık tek başına yeterli değildir.",
      "Yerleştirme aşaması suç gelirinin finansal sisteme ilk girişidir. Nakit yatırma, parçalama, üçüncü kişi hesabı kullanma ve kıymetli maden/kripto alımı bu aşamada karşına çıkar.",
      "Ayrıştırma aşamasında amaç kaynakla bağın koparılmasıdır. Çok sayıda transfer, farklı ülke/kuruluş, sahte ticaret ve varlık dönüşümü bu aşamanın tipik sinyalidir.",
      "Bütünleştirme aşaması gelirin meşru varlık gibi ekonomiye dönmesidir. Gayrimenkul, şirket sermayesi, lüks tüketim veya yatırım görünümü sınavda bu aşamaya bağlanır.",
      "Öncül suç aklamaya konu değeri doğuran suçtur; öncül suç bağlantısı tamamen yoksa TCK 282 düzleminde aklama yorumu zayıflar.",
      "Tipoloji okurken tek emareye değil emare kümelerine bakılır: müşteri profili, işlem amacı, fon kaynağı, ekonomik makuliyet ve taraf ilişkisi birlikte tartılır.",
      "Ekonomik makuliyet testi, işlemin müşteri mesleği, gelir düzeyi, şirket faaliyeti ve piyasa davranışıyla uyumlu olup olmadığını sorar.",
      "Elkoyma geçici koruma, müsadere nihai mülkiyet sonucu, dondurma ise tasarruf kısıtı mantığıyla ayrılır; kavramlar birbirinin yerine kullanılmaz.",
      "Önleyici yükümlülük ihlali idari/adli yaptırım doğurabilir; bu, kişinin aklama suçunu işlediği anlamına otomatik gelmez.",
    ],
    tableThemes: ["Aklama aşamaları", "Aklama suçu ve yükümlülük ihlali ayrımı", "Tipoloji göstergeleri"],
    caseThemes: ["Nakitten gayrimenkule giden çok aşamalı yapı", "Paravan şirket ve sahte fatura örüntüsü", "Kripto dönüşümüyle kaynak gizleme"],
    glossary: [{ term: "Öncül suç", detail: "Aklamaya konu malvarlığı değerini doğuran suçtur." }],
  },
  "terorizmin-finansmani": {
    deepDiveTitles: ["TF'de kaynak değil amaç belirleyicidir", "Fon kavramının genişliği", "Yasal kaynaklı fon riski", "Düşük tutarlı transfer örüntüleri", "Dernek ve bağış yapıları", "Malvarlığı dondurma", "BMGK liste mekanizması", "TF ile aklama ayrımı", "Uluslararası yaptırım bağlantısı"],
    deepDiveNotes: [
      "TF'de fonun suçtan gelmesi şart değildir; belirleyici unsur fonun terör eylemi, örgütü veya terörist kişiyle amaç bağlantısıdır.",
      "Fon kavramı para, mal, hak, alacak, kripto değer, hizmet veya ekonomik değeri olan başka unsurları kapsayacak genişlikte düşünülür.",
      "Yasal kaynaklı maaş, bağış veya ticari gelir de riskli bölge/kişi/amaç bağlantısıyla TF şüphesi doğurabilir.",
      "Düşük tutarlı transferler tek başına önemsiz görülmemelidir; sık tekrar, çoklu gönderici, ortak alıcı, coğrafi risk ve açıklama tutarsızlığı birlikte okunur.",
      "Dernek ve bağış yapıları sosyal amaçlı görünse de fon akışının nihai yararlanıcısı ve kullanım amacı izlenmelidir.",
      "Malvarlığı dondurma, hüküm verilmesini bekleyen müsadere değildir; hızlı tasarruf kısıtı sağlayan önleyici mekanizmadır.",
      "BMGK liste mekanizması ulusal uygulamayla birleşir; liste kontrolü yalnız müşteri açılışında değil ilişki boyunca sürer.",
      "Aklamada kaynak suç geliri ve gizleme öne çıkar; TF'de kaynak yasal olabilir ve kullanım amacı öne çıkar.",
      "Uluslararası yaptırım bağlantısı liste tarama, riskli ülke, muhabirlik ve işlem tarafı kontrollerinde sınav sorusuna dönüşür.",
    ],
    tableThemes: ["Aklama ve TF karşılaştırması", "Dondurma, müsadere ve elkoyma ayrımı", "TF risk göstergeleri"],
    caseThemes: ["Küçük tutarlı bağışların riskli bölge bağlantısı", "Paravan ticari işletme üzerinden fon aktarımı", "Liste eşleşmesinde hızlı karar ihtiyacı"],
    glossary: [{ term: "Amaç unsuru", detail: "Fonun terör eylemi, örgütü veya bağlantılı kişi için kullanılma hedefidir." }],
  },
  kisyf: {
    deepDiveTitles: ["Yayılma finansmanı riski", "KİSYF'nin TF'den ayrılması", "Liste tarama disiplini", "Gerçek ve hatalı eşleşme", "Dondurma kararının uygulanması", "İstisna ve itiraz mantığı"],
    deepDiveNotes: [
      "KİSYF, kitle imha silahlarının geliştirilmesi, temini, taşınması veya yayılmasına finansal destek sağlayan akışları hedefler.",
      "TF ile benzer yaptırım araçları kullanılsa da risk nesnesi farklıdır: burada terör eylemi değil yayılma programı ve yaptırım rejimi bağlantısı aranır.",
      "Liste tarama müşteri, temsilci, gerçek faydalanıcı, işlem tarafı ve karşı kurum düzeyinde sürekli yapılmalıdır.",
      "Hatalı eşleşmede benzer isim nedeniyle işlem durabilir ama araştırma sonucu gerçek eşleşme yoksa süreç kayda alınarak çözümlenir.",
      "Gerçek eşleşmede tasarruf kısıtı, bildirim ve iç eskalasyon hızlı yürütülür; gecikme yaptırımın amacını boşa çıkarabilir.",
      "İstisna ve itiraz, dondurmanın tüm sonuçlarını ortadan kaldırmaz; sınırlı izin veya hatalı kayıt düzeltme mantığıyla okunur.",
    ],
    tableThemes: ["TF ve KİSYF ayrımı", "Liste eşleşmesi karar tablosu"],
    caseThemes: ["Benzer unvanlı tarafla yaptırım listesi eşleşmesi", "Dondurulmuş varlık üzerinde işlem talebi"],
    glossary: [{ term: "PF", detail: "Kitle imha silahlarının yayılmasının finansmanıdır." }],
  },
  sib: {
    deepDiveTitles: ["Şüphe eşiği", "Parasal eşik bulunmaması", "Dahili bildirim akışı", "Uyum görevlisinin değerlendirmesi", "MASAK Online ve ŞİBF mantığı", "Süre ve gecikmesinde sakınca", "Gizlilik ve ihbar yasağı", "Koruma hükümleri", "Ek bildirim", "İşlem ertelemesiyle ilişki"],
    deepDiveNotes: [
      "ŞİB kesin delil standardıyla çalışmaz; bilgi, şüphe veya şüpheyi gerektiren husus yeterlidir. Bu nedenle mahkumiyet beklemek bildirim mantığına aykırıdır.",
      "ŞİB için parasal eşik yoktur; düşük tutarlı ama profil dışı veya bağlantılı işlem de bildirime konu olabilir.",
      "Dahili bildirim akışında ön personel şüpheyi uyum görevlisine taşır; nihai MASAK bildirimi yetkili yapı tarafından değerlendirilir.",
      "Uyum görevlisi olayı sadece tek işlem olarak değil müşteri geçmişi, taraflar, açıklamalar ve önceki uyarılarla birlikte analiz eder.",
      "MASAK Online/ŞİBF, şüphe kategorisi, işlem bilgileri, taraflar ve ek belgelerle bildirim standardını sağlar; form mantığı sadece teknik gönderim değildir.",
      "Olağan hallerde süre şüphenin oluştuğu tarihten itibaren işler; gecikmesinde sakınca varsa beklemek yerine derhal aksiyon alınır.",
      "Gizlilik ve ihbar yasağı müşteriye, temsilciye veya üçüncü kişiye bildirim yapıldığını hissettirecek açıklamalardan kaçınmayı gerektirir.",
      "İyi niyetli bildirim yapanlar korunur; bu koruma, bildirimi müşteriye açıklama veya kötü niyetli bildirim yapma serbestisi değildir.",
      "Yeni bilgi veya belge sonradan elde edilirse önceki bildirimle bağlantılı ek bildirim mantığı çalışır.",
      "İşlem ertelemesi ŞİB'in otomatik sonucu değildir; fon kaçırma riski, imtina ve MASAK talimatı ayrıca değerlendirilir.",
    ],
    tableThemes: ["ŞİB, dahili bildirim ve işlem ertelemesi ayrımı", "Gizlilik, koruma ve ihbar yasağı", "Şüphe göstergesi değerlendirme tablosu"],
    caseThemes: ["Profil dışı parçalı transferler", "Reddedilen işlemde ŞİB değerlendirmesi", "Müşteriye bilgi verme riskinin doğduğu an"],
    glossary: [{ term: "İhbar yasağı", detail: "Bildirim yapıldığının veya yapılacağının ilgili kişilere açıklanmamasıdır." }],
  },
  "islem-ertelemesi": {
    deepDiveTitles: ["Ertelemenin istisnai niteliği", "ŞİB ile otomatik bağ kurulmaması", "MASAK talimatı ve süre", "İmtina ve erteleme ayrımı", "Müşteriye açıklama riski", "Kayıt ve gerekçe"],
    deepDiveNotes: [
      "Erteleme istisnai bir koruma aracıdır; her şüpheli işlemde kullanılmaz. Amaç, şüpheli malvarlığının sistem dışına kaçırılmasını önlemektir.",
      "ŞİB yapılması otomatik olarak işlem ertelemesi doğurmaz; olayda fon çıkışı, telafisi güç zarar veya acil kaçırma riski aranır.",
      "MASAK talimatı ve süre sınırları yükümlünün keyfi bekletme yapmasını engeller. Yükümlü, kendi başına sınırsız bloke uygulayan taraf gibi davranamaz.",
      "İmtina, işlemi yapmaktan kaçınmadır; erteleme ise belirli şartlarda işlemin geçici olarak bekletilmesidir. Sınavda bu iki kavram sık karıştırılır.",
      "Müşteriye 'ŞİB yapacağız' veya 'MASAK'tan cevap bekliyoruz' gibi açıklamalar ihbar riskini doğurur.",
      "Her karar gerekçeli kayıtla desteklenmelidir; sonradan denetimde hangi bilgiyle hangi aksiyonun seçildiği gösterilebilmelidir.",
    ],
    tableThemes: ["ŞİB, imtina ve erteleme ayrımı", "Erteleme karar adımları"],
    caseThemes: ["Hızla çıkış yapılacak yüksek riskli transfer", "Şüpheli işlemde müşteriye açıklama baskısı"],
    glossary: [{ term: "İmtina", detail: "Yükümlünün mevzuat gereği işlemi gerçekleştirmekten kaçınmasıdır." }],
  },
  "fintek-riskleri": {
    deepDiveTitles: ["Dijital kanal risk mantığı", "Ödeme ve elektronik para kuruluşları", "Açık bankacılık ve API riski", "KVHS müşteri kabulü", "Kripto transferlerinde seyahat kuralı", "Eksik bilgi gönderen sağlayıcı", "15.000 TL teyit eşiği"],
    deepDiveNotes: [
      "Dijital kanal düşük risk anlamına gelmez; hız, uzaktan erişim, anonimleşme, çoklu hesap ve sınır aşan hareket kapasitesi farklı kontrol ihtiyacı doğurur.",
      "Ödeme ve elektronik para kuruluşlarında müşteri kabulü, cüzdan limiti, işlem hacmi, alıcı-gönderici ilişkisi ve şüpheli örüntü izleme birlikte çalışır.",
      "Açık bankacılıkta rıza ve API güvenliği AML yükümlülüklerinin yerine geçmez; veri akışı, yetki, kanal ve işlem davranışı ayrıca izlenir.",
      "KVHS müşteri kabulünde kimlik, gerçek faydalanıcı, transfer tarafı bilgisi ve riskli cüzdan/karşı sağlayıcı bağlantısı dikkate alınır.",
      "Seyahat kuralı, kripto transferlerinde gönderen ve alıcı bilgilerinin transferle birlikte izlenmesini sağlar; eksik bilgi işlem riskini yükseltir.",
      "Sürekli eksik veya hatalı bilgi gönderen sağlayıcıyla ilişki sınırlandırma, askıya alma veya sonlandırma gündeme gelebilir.",
      "15.000 TL teyit eşiği, belirli kripto transferlerinde gönderen bilgilerinin doğruluğunu ayrıca teyit etme refleksi üretir; eşiğin altı otomatik risksiz demek değildir.",
    ],
    tableThemes: ["Elektronik transfer ve kripto transfer ayrımı", "Dijital ürün riskleri"],
    caseThemes: ["Eksik taraf bilgisiyle gelen kripto transferi", "API kanalında olağan dışı işlem yoğunluğu"],
    glossary: [{ term: "Travel rule", detail: "Transfer taraf bilgilerinin transfer mesajıyla birlikte izlenmesi kuralıdır." }],
  },
  "uyum-yonetimi": {
    deepDiveTitles: ["Uyum programının unsurları", "Yönetim kurulu sorumluluğu", "Uyum görevlisi ve yardımcısı", "Risk yönetimi", "İzleme ve kontrol", "İç denetim", "Eğitim ve kurum politikası", "Finansal grup paylaşımı", "Münhasır görev ve çıkar çatışması", "Lisans, yenileme ve sicil"],
    deepDiveNotes: [
      "Uyum programı tek doküman değil, politika, prosedür, risk yönetimi, izleme-kontrol, eğitim ve iç denetimin birlikte işlemesidir.",
      "Yönetim kurulu gözetim yetkisini devretse bile nihai sorumluluk kurul düzeyinde kalır; sınavda yetki devri-sorumluluk devri ayrımı aranır.",
      "Uyum görevlisi ve yardımcısı ŞİB değerlendirme, MASAK iletişimi ve uyum programının işleyişinde merkezi aktördür; operasyonel satış hedefleriyle çatışmamalıdır.",
      "Risk yönetimi müşteriyi, ürünü, ülkeyi, kanalı ve işlemi sınıflandırır; yüksek riskli sınıf daha sık izleme ve ek onay gerektirir.",
      "İzleme-kontrol günlük/periodik operasyonel kontrollerdir; alarm, senaryo, limit aşımı ve profil dışı işlem takibi bu başlıkta okunur.",
      "İç denetim sistemin bağımsız testidir; izleme-kontrolün yaptığı işi tekrar etmek değil, tasarım ve işleyiş etkinliğini ölçmek için vardır.",
      "Eğitim ve kurum politikası personelin şüpheyi fark etmesini sağlar; yalnız e-imza alınmış eğitim kaydı etkinlik kanıtı değildir.",
      "Finansal grup paylaşımı risk yönetimini destekler; ancak ŞİB yapıldığı bilgisi gizlilik/ihbar yasağı kapsamında ayrıca korunur.",
      "Münhasır görev kuralı çıkar çatışmasını önler; uyum görevlisinin satış, pazarlama, iç denetim gibi görevlerle aynı anda ilişkilendirilmesi risklidir.",
      "Lisans, yenileme ve sicil süreçleri süre ve şart sorularına döner; sınavda teknik süreler kadar görevin sona ermesi ve askı/iptal mantığı da aranır.",
    ],
    tableThemes: ["Risk yönetimi, izleme-kontrol ve iç denetim ayrımı", "Yönetim kurulu ve uyum görevlisi sorumlulukları", "Lisans ve sicil akışı"],
    caseThemes: ["Yetki devrine rağmen yönetim kurulu sorumluluğu", "Grup içi bilgi paylaşımında ŞİB gizliliği", "İzleme raporunun iç denetim bulgusuna dönüşmesi"],
    glossary: [{ term: "Uyum programı", detail: "Politika, risk yönetimi, izleme, eğitim, iç denetim ve bildirim sisteminin bütünüdür." }],
  },
  "denetim-idari-ceza": {
    deepDiveTitles: ["Yükümlülük denetiminin kapsamı", "İdari para cezası mantığı", "Adli ceza riski taşıyan ihlaller", "Ceza tavanı ve yükümlü türü", "Uyarı ve süre verilmesi", "Elektronik tebligat ve yargı yolu"],
    deepDiveNotes: [
      "Denetim, yalnız tek işlem dosyası incelemesi değildir; müşteri kabulü, kayıt, eğitim, senaryo, raporlama ve yönetim kurulu gözetimi birlikte incelenir.",
      "İdari para cezası KYC, ŞİB, devamlı bilgi verme ve uyum programı ihlallerinde farklı mantıklarla uygulanır; yükümlü türü tutarı etkileyebilir.",
      "Adli ceza riski özellikle ŞİB gizliliği, bilgi-belge verme ve muhafaza-ibraz ihlallerinde öne çıkar. Bu ihlalleri sadece teknik eksiklik gibi görmek yanlıştır.",
      "Ceza tavanı ve yükümlü türü finansal kuruluşlarda daha ağır sonuç doğurabilir; işlem tutarı ve yıllık üst sınır mantığı birlikte okunur.",
      "Uyum programı eksikliklerinde uyarı, süre verilmesi ve tekrar eden eksiklikte yaptırım akışı vardır; her eksiklik doğrudan aynı ceza sonucuna gitmez.",
      "Elektronik tebligat hukuki süreleri başlatır; tebliğ adresinin takip edilmemesi savunma imkanı sağlamaz.",
    ],
    tableThemes: ["İdari ve adli ceza ayrımı", "İhlal türü ve yaptırım mantığı"],
    caseThemes: ["Kimlik tespiti ihlali ile ŞİB gizliliği ihlali karşılaştırması", "Denetimde bilgi-belge ibraz edilmemesi"],
    glossary: [{ term: "Yükümlülük denetimi", detail: "Kayıt, belge ve sistemlerin AML/CFT mevzuatına uygunluğunun incelenmesidir." }],
  },
  "uzaktan-kimlik": {
    deepDiveTitles: ["Uzaktan kimliğin KYC içindeki yeri", "Belge ve canlılık doğrulaması", "Temsil ve yetki kontrolü", "Fon kaynağı ve işlem amacı", "Yüksek riskte sıkı tedbir"],
    deepDiveNotes: [
      "Uzaktan kimlik, yüz yüze kimlik tespitinin dijital alternatifi olarak okunur; KYC yükümlülüğünü hafifleten genel muafiyet değildir.",
      "Belge ve canlılık doğrulaması kimliğin gerçek kişiye ait olduğunu ve başvurunun gerçek zamanlı yapıldığını gösterir.",
      "Temsil ve yetki kontrolü özellikle tüzel kişi, yabancı kişi ve vekalet ilişkilerinde önem kazanır; işlem yapanla menfaat sahibi ayrılmalıdır.",
      "Fon kaynağı, işlem amacı ve tahmini hacim baştan alınırsa sonraki profil dışı hareketler daha sağlıklı yakalanır.",
      "Risk yükseldiğinde dijital kanal kolaylığı sona ermez ama sıkı tedbir eklenir: ek belge, üst onay, kaynak araştırması ve yoğun izleme gündeme gelir.",
    ],
    tableThemes: ["Yüz yüze ve uzaktan kimlik ayrımı"],
    caseThemes: ["Yabancı müşteri için uzaktan hesap açılışı"],
    glossary: [{ term: "Canlılık kontrolü", detail: "Kimlik sahibinin gerçek zamanlı ve gerçek kişi olarak doğrulanmasıdır." }],
  },
  "diger-yukumlulukler": {
    deepDiveTitles: ["Devamlı bilgi verme", "Bilgi ve belge verme", "Muhafaza ve ibraz", "Elektronik tebligat", "Erişim sistemi", "Koruma hükümleri"],
    deepDiveNotes: [
      "Devamlı bilgi verme, belirli bilgilerin düzenli ve sistematik aktarılmasıdır; ŞİB'i ortadan kaldıran alternatif bildirim yolu değildir.",
      "Bilgi-belge talebinde özel kanun hükümleri çoğu durumda kaçınma gerekçesi yapılamaz; yetkili talebin kapsamı ve süreleri önemlidir.",
      "Muhafaza ve ibrazda belge türüne göre başlangıç tarihi değişir. Kimlik belgeleri ilişki bitişinden, işlem belgeleri işlem tarihinden itibaren düşünülür.",
      "Elektronik tebligat teknik kayıt gibi değil, süre başlatan resmi tebligat aracı gibi okunur.",
      "Erişim sistemi MASAK'ın yükümlü verisine etkin ulaşmasını destekler; yükümlünün veri kalitesi ve sürekliliği sorumluluğu devam eder.",
      "Koruma hükümleri iyi niyetli bildirim yapanı korur; bildirim gizliliğini ihlal etmeye veya müşteriye açıklama yapmaya izin vermez.",
    ],
    tableThemes: ["Bilgi-belge, muhafaza ve ibraz ayrımı"],
    caseThemes: ["Kapanan hesap belgelerinin saklama başlangıcı"],
    glossary: [{ term: "İbraz", detail: "Yetkili makam talep ettiğinde kayıt ve belgelerin sunulmasıdır." }],
  },
  "musterinin-taninmasi": {
    deepDiveTitles: ["Kimlik tespitinin zamanı", "Gerçek faydalanıcı tespiti", "Başkası adına işlem", "Tüzel kişi ve temsil yetkisi", "Sürekli izleme", "Özel dikkat gerektiren işlemler", "Riskli ülke ve KEP/KPEP riski", "Muhabirlik ilişkileri", "Üçüncü tarafa güven", "Basitleştirilmiş tedbir", "Sıkılaştırılmış tedbir", "Elektronik ve kripto transfer bilgileri"],
    deepDiveNotes: [
      "Kimlik tespiti işlem veya sürekli iş ilişkisi kurulmadan önce tamamlanır. Gerçek kişilerde teyidi zorunlu bilgilerle alınan ama teyidi zorunlu olmayan bilgiler ayrılır.",
      "Gerçek faydalanıcı üç aşamalı aranır: %25'i aşan gerçek kişi ortak, nihai kontrol sahibi, bulunamazsa en üst düzey icra yetkilisi.",
      "Başkası adına işlemde işlemi yapan kişi ile hesabına hareket edilen kişi birlikte değerlendirilir; beyan yoksa ama şüphe varsa yükümlü araştırma yapar.",
      "Tüzel kişi ve temsil yetkisi MERSİS, ticaret sicili, imza yetkisi ve ortaklık yapısıyla kontrol edilir; yalnız kartvizit veya beyan yeterli değildir.",
      "Sürekli izleme müşteri kabulünden sonra başlar: profil, gelir, fon kaynağı, beklenen hacim ve fiili işlem davranışı karşılaştırılır.",
      "Özel dikkat gerektiren işlemler görünürde yasal olsa bile makul ekonomik amaç, taraf ilişkisi ve olağan faaliyetle uyum açısından incelenir.",
      "Yabancı PEP her zaman yüksek risk kabul edilir; yerli/uluslararası PEP için yükümlünün risk değerlendirmesi belirleyici olur. Görevden ayrılma riski hemen bitirmez.",
      "Muhabirlik ilişkileri karşı finansal kuruluşun düzenleme, denetim, itibarı ve AML kapasitesi üzerinden değerlendirilir.",
      "Üçüncü tarafa güven, yükümlünün nihai sorumluluğunu kaldırmaz; dayanak bilgi ve belgelerin erişilebilir olması gerekir.",
      "Basitleştirilmiş tedbir muafiyet değil kolaylıktır; şüphe, yüksek risk veya uyumsuz profil varsa uygulanamaz.",
      "Sıkılaştırılmış tedbir üst düzey onay, servet/fon kaynağı araştırması ve daha sıkı izleme gerektirir.",
      "Elektronik ve kripto transferlerde taraf bilgisi, eksik bilgiye tepki ve karşı sağlayıcı riski KYC'nin işlem izleme ayağıyla birleşir.",
    ],
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
  // Elle yazılmış deepDiveNotes hiçbir zaman kesilmez; hedef sayı sadece daha kısa
  // blueprint'leri doldurmak için bir taban değeridir.
  const effectiveTarget = Math.max(target, blueprint.deepDiveTitles.length, blueprint.deepDiveNotes.length);
  const titles = fillTo(blueprint.deepDiveTitles, effectiveTarget, (index) => base.reviewCards[index % base.reviewCards.length]?.term ?? `${lesson.title} uygulama noktası ${index + 1}`);
  const notes = fillTo(blueprint.deepDiveNotes, effectiveTarget, (index) => base.mustKnow[index % base.mustKnow.length]);
  return titles.map((title, index) => ({
    title,
    body: notes[index],
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
  const prompts = fillTo(
    base.miniQuizSeed,
    target,
    (index) => `${lesson.title} ile ilgili ${index + 1}. sınav sorusunda en güvenli yorum hangisidir?`,
  );
  return prompts.map((prompt, index) => {
    const correct = base.mustKnow[index % base.mustKnow.length];
    const distractorTerm = base.reviewCards[index % base.reviewCards.length]?.term ?? lesson.title;
    const wrongs = [
      base.confusions[index % base.confusions.length],
      base.confusions[(index + 1) % base.confusions.length],
      `${lesson.title} konusunda ${distractorTerm} yalnızca ezber tanımıyla değerlendirilir, olay bağlamı aranmaz.`,
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

// NOT: Soru bankası artık şablonla üretilmiyor. Gerçek, el yazımı sorular
// dosyanın sonunda `authoredQuestionsByLessonId` altında tanımlanır ve
// `export const questions` oradan inşa edilir (bkz. "HAFIZA MODÜLÜ" bölümü).

export function getQuestionsForModule(moduleId: ModuleId) {
  return questions.filter((question) => question.moduleId === moduleId);
}

export function getLessonById(id: string) {
  return lessons.find((lesson) => lesson.id === id) ?? lessons[0];
}

export function getModuleById(id: ModuleId) {
  return modules.find((module) => module.id === id) ?? modules[0];
}

// =============================================================================
// HAFIZA MODÜLÜ (Doping Hafıza Teknikleri)
// Bu bölüm; mnemonik/akronim kartları, hafıza sarayı rotaları, aktif hatırlama
// egzersizleri ve gerçek (el yazımı) sınav sorusu bankasını içerir. Tüm veriler
// yukarıdaki `baseLessonContentById` içinde zaten doğrulanmış mustKnow /
// confusions / casePattern alanlarından türetilmiştir; yeni bir hukuki iddia
// üretilmemiştir.
// =============================================================================

export type MnemonicCard = {
  id: string;
  lessonId: string;
  hook: string;
  expansion: string;
  story: string;
  targetFact: string;
};

export type MemoryPalaceStop = {
  order: number;
  location: string;
  lessonId: string;
  image: string;
  detail: string;
};

export type MemoryPalace = {
  moduleId: ModuleId;
  title: string;
  routeIntro: string;
  stops: MemoryPalaceStop[];
};

export type RecallDrill = {
  id: string;
  lessonId: string;
  type: "fill-blank" | "closed-book";
  prompt: string;
  answer: string;
  keywords: string[];
};

export const mnemonics: MnemonicCard[] = [
  // --- Modül 1 ---
  {
    id: "mn-masak-gorevleri-1",
    lessonId: "masak-gorevleri",
    hook: "MASAK ADEG YAPAMAZ",
    expansion: "Arama, Dava açma, El koyma, Gözaltı",
    story:
      "MASAK'ı bir istihbarat masası gibi düşün: telefonla dinler, not alır, dosya hazırlar ama asla sahaya inmez. 'ADEG' kapısından hiç çıkmaz — Arama yapamaz, Dava açamaz, El koyamaz, Gözaltına alamaz. Bu dört kapı sadece savcının elindedir.",
    targetFact: "MASAK istihbarat toplar ve analiz eder; arama, el koyma, gözaltı YAPAMAZ, dava açma yetkisi yoktur.",
  },
  {
    id: "mn-masak-gorevleri-2",
    lessonId: "masak-gorevleri",
    hook: "Vergi-Hazine-Gümrük-Banka-BDDK-SPK-TCMB çayı; SMMM/YMM/polis davetli değil",
    expansion: "Denetim elemanı = Vergi Müfettişi + Hazine ve Maliye Uzmanı + Gümrük ve Ticaret Müfettişi + Bankalar Yeminli Murakıbı + BDDK/SPK Uzmanı + TCMB Denetçisi",
    story:
      "Yedi kişilik bir denetim çayı hayal et: Vergi Müfettişi, Hazine Uzmanı, Gümrük Müfettişi, Bankalar Murakıbı, BDDK'lı, SPK'lı ve TCMB'li masaya oturur. Kapıda SMMM, YMM ve polis bekler ama içeri giremez — onlar denetim elemanı tanımına girmez.",
    targetFact: "Denetim elemanları: Vergi Müfettişleri, Hazine ve Maliye Uzmanları, Gümrük ve Ticaret Müfettişleri, Bankalar Yeminli Murakıpları, BDDK/SPK uzmanları, TCMB denetçileri; SMMM, YMM ve kolluk bu tanıma girmez.",
  },
  {
    id: "mn-masak-gorevleri-3",
    lessonId: "masak-gorevleri",
    hook: "Nisan-Eylül'de Yardımcı Başkanlık yapar, çekimser yoktur",
    expansion: "Koordinasyon Kurulu'na Bakan Yardımcısı başkanlık eder, yılda en az 2 kez (Nisan/Eylül) toplanır, çekimser oy yok, eşitlikte başkan ağır basar",
    story:
      "Kurul odasına gir: baş koltukta MASAK Başkanı değil, Bakan Yardımcısı oturur. Takvimde sadece iki tarih işaretli: Nisan ve Eylül. Oylamada 'çekimserim' diyen sandalye yok; oylar eşit çıkarsa başkanın oyu iki kişilik sayılır.",
    targetFact: "Koordinasyon Kurulu'na Bakan Yardımcısı başkanlık eder (MASAK Başkanı değil), yılda en az 2 kez toplanır, üyeler çekimser oy kullanamaz, oy eşitliğinde başkanın tarafı üstün sayılır.",
  },
  {
    id: "mn-uluslararasi-standartlar-1",
    lessonId: "uluslararasi-standartlar",
    hook: "89'da Paris'te doğdu, 91'de Türkiye evlat edindi",
    expansion: "FATF 1989 G-7 Paris zirvesinde kuruldu, Türkiye 1991'de üye oldu",
    story: "Paris'te 1989 yılında doğan bir bebek (FATF) düşün; 1991'de Türkiye onu evlat edinip üye ailesine katıyor.",
    targetFact: "FATF 1989'da G-7 zirvesinde (Paris) kuruldu; Türkiye 1991'de üye oldu.",
  },
  {
    id: "mn-uluslararasi-standartlar-2",
    lessonId: "uluslararasi-standartlar",
    hook: "21'de girdi (Ekim), 24 yazında (28 Haziran) çıktı",
    expansion: "Türkiye Ekim 2021'de FATF gri listesine girdi, 28 Haziran 2024'te çıktı",
    story: "2021'in soğuk Ekim ayında gri kapıdan içeri giren Türkiye, 2024'ün sıcak yaz gününde (28 Haziran) aynı kapıdan dışarı çıkıyor.",
    targetFact: "Türkiye Ekim 2021'de FATF gri listesine girdi, 28 Haziran 2024'te listeden çıktı; hiçbir zaman kara listeye girmedi.",
  },
  {
    id: "mn-uluslararasi-standartlar-3",
    lessonId: "uluslararasi-standartlar",
    hook: "95 Brüksel doğumlu Egmont, 98'de MASAK'ı ağırladı",
    expansion: "Egmont Grubu 1995'te Brüksel'de kuruldu, MASAK 1998'de üye oldu",
    story: "Brüksel'de 1995'te kurulan Egmont kulübüne, 1998'de MASAK üyelik kartını alıp giriyor.",
    targetFact: "Egmont Grubu 1995'te Brüksel'de kuruldu, MASAK 1998'de üye oldu; 182 ülkenin MİB'i üyedir.",
  },
  {
    id: "mn-ulusal-koordinasyon-1",
    lessonId: "ulusal-koordinasyon",
    hook: "D tepede, T dipte",
    expansion: "Aklamada en yüksek risk Dolandırıcılık, en düşük risk Tefecilik",
    story: "Bir risk piramidi çiz: en tepede kocaman bir 'D' (Dolandırıcılık) parlıyor, en altta küçük bir 'T' (Tefecilik) sessizce duruyor.",
    targetFact: "Aklama suçlarında en yüksek risk dolandırıcılık, en düşük risk tefeciliktir.",
  },
  {
    id: "mn-ulusal-koordinasyon-2",
    lessonId: "ulusal-koordinasyon",
    hook: "F-P-D-S merdiveni",
    expansion: "Terör finansmanı riski sırayla: FETÖ, PKK/KCK, Dini istismar eden örgütler, Sol örgütler",
    story: "Dört basamaklı bir merdiven düşün: en üst basamakta FETÖ, sonra PKK/KCK, sonra dini istismar eden örgütler, en alt basamakta sol terör örgütleri.",
    targetFact: "Terörün finansmanında en yüksek riskli yapı FETÖ, ardından PKK/KCK ve dini istismar eden örgütler gelir; sol örgütler orta-düşük risktedir.",
  },
  {
    id: "mn-ulusal-koordinasyon-3",
    lessonId: "ulusal-koordinasyon",
    hook: "21-25 AKTF, 25-29 KİSYF",
    expansion: "2021-2025 Strateji Belgesi AK/TF'ye, 2025-2029 Strateji Belgesi KİSYF'ye odaklanır",
    story: "Bir takvimde iki dönem işaretli: 2021-2025 arası 'AKTF' yazıyor, 2025-2029 arası 'KİSYF' yazıyor — sırayla bayrak değişiyor.",
    targetFact: "2021-2025 Strateji Belgesi aklama/TF'ye odaklanır (5 ana amaç); 2025-2029 Strateji Belgesi KİSYF ile mücadeleye odaklanır.",
  },
  {
    id: "mn-aklama-1",
    lessonId: "aklama",
    hook: "YAB: Yıka, Ayır, Bitir",
    expansion: "Yerleştirme (Placement) → Ayrıştırma/Katmanlaştırma (Layering) → Bütünleştirme (Integration)",
    story: "Kirli parayı bir çamaşır makinesine at: önce içeri Yerleştirirsin, sonra defalarca çalkalayıp kaynağıyla bağını Ayırırsın (katmanlaştırma), en sonda tertemiz görünümle dolaba (ekonomiye) Bütünleştirirsin.",
    targetFact: "Aklama üç aşamadan oluşur: Yerleştirme (sisteme giriş), Katmanlaştırma/Ayrıştırma (kaynak bağının koparılması), Bütünleştirme (meşru varlık görünümü).",
  },
  {
    id: "mn-aklama-2",
    lessonId: "aklama",
    hook: "3-7 arası yıka, altı ay alt sınır",
    expansion: "TCK 282/1: 3-7 yıl hapis + 20.000 güne kadar adli para; öncül suç eşiği: hapis cezası alt sınırı en az 6 ay",
    story: "Aklama suçunun cezası 3 ile 7 arasında bir sayaçta döner; öncül suç kapısından geçmek için de en az '6 ay' yazan bir bilet gerekir.",
    targetFact: "TCK 282/1 temel ceza 3-7 yıl hapis ve 20.000 güne kadar adli para cezasıdır; öncül suç için hapis cezası alt sınırının en az 6 ay olması gerekir.",
  },
  {
    id: "mn-aklama-3",
    lessonId: "aklama",
    hook: "Memur yarım kat, örgüt tam kat",
    expansion: "Kamu görevlisi/meslek sahibi işlerse ceza yarı oranında artar; örgüt faaliyeti kapsamında işlenirse bir kat artar",
    story: "İki terazi düşün: memur kefesine yarım ağırlık eklenir, örgüt kefesine ise tam bir ağırlık eklenir.",
    targetFact: "Ağırlaştırıcı nedenler: kamu görevlisi veya meslek sahibi işlerse ceza yarı oranında, suç örgütü faaliyeti kapsamında işlenirse bir kat artırılır.",
  },
  {
    id: "mn-terorizmin-finansmani-1",
    lessonId: "terorizmin-finansmani",
    hook: "TF'de kaynak masum olabilir, amaç suçlu olur",
    expansion: "Terörizmin finansmanında belirleyici unsur fonun kaynağı değil, kullanım amacıdır",
    story: "Tertemiz bir maaş bordrosu düşün — para yasal kaynaklı. Ama o para terör örgütüne yönlendirilirse, temiz kaynak kirli amaca hizmet eder. Kaynağa değil, varış noktasına bak.",
    targetFact: "TF'de belirleyici unsur fonun kaynağı değil kullanım amacıdır; fon yasal kaynaklı olsa bile terör amacına yönelirse suç oluşur.",
  },
  {
    id: "mn-terorizmin-finansmani-2",
    lessonId: "terorizmin-finansmani",
    hook: "12-67 hazır gelir, 13-73 kendin yap",
    expansion: "BMGK 1267 sayılı karar: hazır liste, gecikmeksizin dondurma; BMGK 1373 sayılı karar: ulusal liste veya karşılıklı talep",
    story: "1267 numaralı kutu BM'den hazır paketlenmiş gelir, açar açmaz dondurursun. 1373 numaralı kutuda ise malzemeler var, ulusal listeni kendin oluşturman veya başka bir ülkenin talebini değerlendirmen gerekir.",
    targetFact: "1267 sayılı BMGK kararı hazır listeyle gecikmeksizin dondurma sağlar; 1373 sayılı karar ülkelerin kendi ulusal listesini oluşturmasını veya karşılıklılık esasını öngörür.",
  },
  {
    id: "mn-terorizmin-finansmani-3",
    lessonId: "terorizmin-finansmani",
    hook: "2 Bakan el sıkışır, 48 saatte Ankara'ya koşar, 7 kurum 5 oyla karar verir",
    expansion: "İç dondurma: Hazine ve Maliye Bakanı + İçişleri Bakanı ortak kararı, 48 saat içinde Ankara Ağır Ceza Mahkemesi onayı (mahkeme 5 gün içinde karar verir); Değerlendirme Komisyonu 7 kurum temsilcisinden oluşur, en az 5 üye oyu gerekir",
    story: "İki bakan bir kağıda birlikte imza atar, 48 saat içinde kağıt Ankara Ağır Ceza Mahkemesi'ne koşarak götürülür, mahkeme 5 gün içinde 'evet' der. Ayrı bir odada 7 kurumdan gelen temsilciler oturur, karar için en az 5'i aynı yöne el kaldırmalıdır.",
    targetFact: "İç dondurma kararını Hazine ve Maliye Bakanı ile İçişleri Bakanı birlikte verir; 48 saat içinde Ankara Ağır Ceza Mahkemesi onayına sunulur, mahkeme 5 gün içinde karar verir. Değerlendirme Komisyonu MASAK Başkanı + 7 kurum temsilcisinden oluşur, karar için en az 5 üye oyu gerekir.",
  },
  {
    id: "mn-kisyf-1",
    lessonId: "kisyf",
    hook: "17-18 Kuzey, 22-31 İran",
    expansion: "BMGK 1718 sayılı karar (2006) Kuzey Kore; BMGK 2231 sayılı karar (2015, JCPOA) İran",
    story: "Kuzey kutbunda '1718' yazan bir bayrak (Kuzey Kore, 2006), güneyde '2231' yazan başka bir bayrak (İran, 2015) dalgalanıyor.",
    targetFact: "KİSYF'de Kuzey Kore rejimi 1718 sayılı BMGK kararına (2006), İran rejimi 2231 sayılı BMGK kararına (2015/JCPOA) dayanır.",
  },
  {
    id: "mn-kisyf-2",
    lessonId: "kisyf",
    hook: "KİSYF'te dokuz-dokuz, TF'de beş yeter",
    expansion: "Denetim ve İş Birliği Komisyonu: en az 9 üye katılımı + 9 üye aynı yönde oy; TF Değerlendirme Komisyonu'nda ise 5 üye oyu yeterlidir",
    story: "İki farklı komisyon odası hayal et: KİSYF odasında karar için dokuz elin birden kalkması gerekir; TF odasında beş el yeter.",
    targetFact: "KİSYF Denetim ve İş Birliği Komisyonu kararları en az 9 üyenin katılımı ve 9 üyenin aynı yöndeki oyuyla alınır; bu, TF Değerlendirme Komisyonu'nun 5 üye oyu kuralından farklıdır.",
  },
  {
    id: "mn-kisyf-3",
    lessonId: "kisyf",
    hook: "PF sadece nükleer değil, biyo-kimya da işin içinde",
    expansion: "KİSYF nükleer, biyolojik ve kimyasal silahların yayılmasının finansmanını kapsar",
    story: "Üç renkli kutu düşün: nükleer (sarı), biyolojik (yeşil), kimyasal (mavi) — üçü de aynı 'PF' etiketini taşır.",
    targetFact: "KİSYF sadece nükleer silahlarla sınırlı değildir; biyolojik ve kimyasal silahların finansmanını da kapsar.",
  },
  {
    id: "mn-sib-1",
    lessonId: "sib",
    hook: "10 ve DERHAL: eşik yok, iki hız var",
    expansion: "ŞİB süresi genel olarak 10 iş günü; gecikmesinde sakınca varsa derhal — parasal alt/üst sınır hiç aranmaz",
    story: "İki saat düşün: normal saat '10 iş günü' gösterir, kırmızı acil saat sadece 'DERHAL' yazar; ikisinin de altında '0 TL eşik' levhası asılıdır.",
    targetFact: "ŞİB genel bildirim süresi şüphenin oluştuğu tarihten itibaren 10 iş günüdür; gecikmesinde sakınca bulunan hallerde bu süre beklenmeksizin derhal bildirim yapılır; parasal eşik aranmaz.",
  },
  {
    id: "mn-sib-2",
    lessonId: "sib",
    hook: "1 TL bile şüpheyse bildir, tutar aranmaz",
    expansion: "ŞİB için parasal alt veya üst sınır yoktur",
    story: "Cebindeki tek bir madeni parayı düşün — tutarı önemsiz ama şüpheliyse yine de MASAK'a bildirilir.",
    targetFact: "ŞİB için parasal alt veya üst sınır yoktur; küçük tutarlı bir işlem bile şüpheliyse bildirilir.",
  },
  {
    id: "mn-sib-3",
    lessonId: "sib",
    hook: "1-3 yıla girme, ağzını sıkı tut",
    expansion: "Bildirim gizliliği (tipping-off) ihlalinin cezası 1-3 yıl hapis ve 5.000 güne kadar adli para cezası",
    story: "Ağzından ŞİB sırrını kaçıran birinin önünde '1-3 yıl' yazan bir kapı beliriyor — sır saklamak bu kapıyı kapalı tutar.",
    targetFact: "Bildirim yapıldığı bilgisi işlem tarafları dahil hiç kimseye açıklanamaz; ihlalin cezası 1-3 yıl hapis ve 5.000 güne kadar adli para cezasıdır.",
  },
  {
    id: "mn-islem-ertelemesi-1",
    lessonId: "islem-ertelemesi",
    hook: "7 gün bekle, Bakan karar versin",
    expansion: "Erteleme süresi en fazla 7 iş günü; karar makamı Hazine ve Maliye Bakanı (yalnızca Bakan Yardımcısına devredilebilir)",
    story: "Yedi günlük bir kum saati çevir: kum bitene kadar işlem yapılmaz, kararı sadece Bakan (ya da yardımcısı) verebilir.",
    targetFact: "Erteleme kararını Hazine ve Maliye Bakanı verir, yetki yalnızca Bakan Yardımcısına devredilebilir; süre en fazla 7 iş günüdür ve kesindir.",
  },
  {
    id: "mn-islem-ertelemesi-2",
    lessonId: "islem-ertelemesi",
    hook: "7. günde sessizlik = izin",
    expansion: "7 iş günü içinde Bakanlık kararı tebliğ edilmezse yükümlünün imtina yükümlülüğü kendiliğinden sona erer",
    story: "Kum saati durur, kimseden ses çıkmazsa kapı otomatik açılır ve işlem yapılabilir hale gelir.",
    targetFact: "7 iş günü içinde Bakanlık kararı tebliğ edilmezse yükümlünün işlemi gerçekleştirmeme yükümlülüğü kendiliğinden sona erer.",
  },
  {
    id: "mn-islem-ertelemesi-3",
    lessonId: "islem-ertelemesi",
    hook: "3 kapı: ben, MASAK, yabancı",
    expansion: "Erteleme; yükümlünün talebiyle, MASAK'ın re'sen incelemesiyle veya yabancı bir FIU'nun karşılıklılık talebiyle tetiklenebilir",
    story: "Üç ayrı kapıdan aynı odaya girilebilir: 'Ben talep ettim' kapısı, 'MASAK kendi baktı' kapısı, 'Yabancı FIU istedi' kapısı.",
    targetFact: "Erteleme yükümlünün talebiyle, MASAK'ın re'sen incelemesiyle veya yabancı bir FIU'nun karşılıklılık esasına dayalı talebiyle tetiklenebilir.",
  },
  {
    id: "mn-fintek-riskleri-1",
    lessonId: "fintek-riskleri",
    hook: "FAST hep açık, EFT mesaide, SWIFT sadece mektup taşır",
    expansion: "FAST 7/24 anlık çalışır (günlük limit 250.000 TL), EFT mesai saatlerinde çalışır, SWIFT bir ödeme sistemi değil sadece mesajlaşma ağıdır",
    story: "FAST gişesi gece gündüz açık (7/24, günde 250.000 TL'ye kadar), EFT gişesi sadece mesai saatinde açık, SWIFT ise para değil sadece zarf taşıyan bir postacıdır.",
    targetFact: "FAST 7/24 anlık çalışır ve günlük limiti 250.000 TL'dir; EFT mesai saatleri içinde çalışır; SWIFT bir ödeme sistemi değil uluslararası mesajlaşma ağıdır.",
  },
  {
    id: "mn-fintek-riskleri-2",
    lessonId: "fintek-riskleri",
    hook: "15 binde pasaport sorulur",
    expansion: "Seyahat Kuralı (Travel Rule): 15.000 TL ve üzerindeki kripto transferlerinde taraf bilgisi zorunludur",
    story: "Gişe memuru 15.000 TL'lik bir kripto transferinde elini kaldırıp 'kimlik bilgisi lazım' der; altındaki tutarlarda bu talep yoktur ama risk sıfırlanmaz.",
    targetFact: "Seyahat Kuralı: 15.000 TL ve üzerindeki kripto transferlerinde gönderen ve alıcıya ait kimlik/hesap bilgileri transfer mesajına eklenir.",
  },
  {
    id: "mn-fintek-riskleri-3",
    lessonId: "fintek-riskleri",
    hook: "6493'ün çocukları faizsiz kredisiz büyür",
    expansion: "6493 sayılı Kanun kapsamındaki ödeme ve elektronik para kuruluşları faiz veremez, kredi kullandıramaz",
    story: "6493 numaralı ailenin çocukları (ödeme/e-para kuruluşları) bankalar gibi büyümez — ne faiz cebi ne kredi cüzdanı vardır, sadece transfere aracılık ederler.",
    targetFact: "6493 sayılı Kanun kapsamındaki ödeme ve elektronik para kuruluşları faiz veremez ve kredi kullandıramaz; temel işlevleri transfer ve ödemeye aracılıktır.",
  },
  // --- Modül 2 ---
  {
    id: "mn-uyum-yonetimi-1",
    lessonId: "uyum-yonetimi",
    hook: "Politika-Risk-İzle/Kontrol-Görevli-Eğitim-Denetim",
    expansion: "Uyum programının 6 bileşeni: kurum politikası, risk yönetimi, izleme-kontrol, uyum görevlisi/birimi, eğitim, iç denetim",
    story: "Bir fabrika hattı düşün: önce Politika yazılır, sonra Risk ölçülür, sonra hat boyunca İzleme-Kontrol yapılır, ürünü Uyum Görevlisi imzalar, işçilere Eğitim verilir, son istasyonda İç Denetim kalite kontrolü yapar.",
    targetFact: "Uyum programının altı bileşeni: kurum politikası ve prosedürleri, risk yönetimi, izleme ve kontrol, uyum görevlisi ve uyum birimi, eğitim, iç denetim.",
  },
  {
    id: "mn-uyum-yonetimi-2",
    lessonId: "uyum-yonetimi",
    hook: "65 ortalama, 50 baraj, 3 yılda yenile, 5 yılda sil",
    expansion: "Lisans sınavında genel ortalama en az 65, her modülden en az 50; her 3 yılda bir yenileme eğitimi; 5 yıl aksarsa lisans tamamen iptal",
    story: "Bir karne hayal et: genel not '65' üstünde olmalı, ama hiçbir ders '50'nin altına düşmemeli. Karne her '3' yılda yenilenir; '5' yıl karne almazsan okuldan atılırsın (lisans iptal).",
    targetFact: "Lisans sınavında genel başarı notu en az 65, her modülden en az 50 puan şarttır; her 3 yılda bir yenileme eğitimi gerekir; 5 yıl geçerse lisans tamamen iptal olur.",
  },
  {
    id: "mn-uyum-yonetimi-3",
    lessonId: "uyum-yonetimi",
    hook: "4 yönetici, 12 uzman",
    expansion: "Sınav muafiyeti: MASAK'ta idari düzeyde en az 4 yıl veya uzman/denetim elemanı olarak en az 12 yıl çalışanlar",
    story: "İki farklı kıdem rozeti düşün: yöneticilik rozetini '4' yılda kazanırsın, uzmanlık rozetini ise '12' yılda kazanırsın — ikisi de sınavdan muafiyet kapısını açar.",
    targetFact: "MASAK'ta idari düzeyde en az 4 yıl veya uzman/denetim elemanı olarak en az 12 yıl çalışanlar lisans sınavından muaftır.",
  },
  {
    id: "mn-denetim-idari-ceza-1",
    lessonId: "denetim-idari-ceza",
    hook: "30'da kimliğini söyle, 50'de ŞİB'i unutma",
    expansion: "Kimlik tespiti/devamlı bilgi verme ihlalinde 30.000 TL, ŞİB yapmama ihlalinde 50.000 TL maktu idari para cezası",
    story: "İki fiyat etiketi düşün: 'Kimliğini söylemedin: 30.000 TL', 'ŞİB'i unuttun: 50.000 TL' — ikisi de md. 13/1'in temel etiketleridir.",
    targetFact: "5549 sayılı Kanun md. 13/1 uyarınca kimlik tespiti/devamlı bilgi verme ihlalinde 30.000 TL, ŞİB yapmama ihlalinde 50.000 TL maktu idari para cezası uygulanır.",
  },
  {
    id: "mn-denetim-idari-ceza-2",
    lessonId: "denetim-idari-ceza",
    hook: "5-2-40-4: yüzde beş, iki kat, kırk milyon finansal, dört milyon diğer",
    expansion: "Finansal kuruluş cezası işlem tutarının en az %5'i, iki kat oranında hesaplanır; yıllık tavan finansal kuruluşta 40.000.000 TL, diğer yükümlülerde 4.000.000 TL",
    story: "Bir hesap makinesi hayal et: ekranda sırayla '%5', 'x2', '40.000.000', '4.000.000' rakamları yanıp söner — finansal kuruluş cezasının dört anahtar sayısı.",
    targetFact: "Finansal kuruluşlarda ceza işlem tutarının en az %5'i, iki kat oranında hesaplanır; yıllık tavan finansal kuruluşlarda 40.000.000 TL, diğer yükümlülerde 4.000.000 TL'dir.",
  },
  {
    id: "mn-denetim-idari-ceza-3",
    lessonId: "denetim-idari-ceza",
    hook: "Yöneticiye çeyrek düşer",
    expansion: "Yönetim kurulu üyesi/sorumlu üst düzey yöneticiye, yükümlüye kesilen cezanın 1/4'ü oranında ayrıca ceza uygulanabilir",
    story: "Büyük cezayı dört eşit dilime böl; en küçük dilimi (çeyreği) sorumlu yönetici de yer.",
    targetFact: "Yönetim kurulu üyesi veya sorumlu üst düzey yöneticiye, yükümlüye kesilen idari para cezasının dörtte biri (1/4) oranında ayrıca ceza uygulanabilir.",
  },
  {
    id: "mn-uzaktan-kimlik-1",
    lessonId: "uzaktan-kimlik",
    hook: "NFC yoksa dörtlü kontrol şart",
    expansion: "NFC mümkün değilse hologram, mikro yazı, kinegram gibi en az 4 farklı güvenlik öğesinin görüntülü görüşmede teyidi gerekir",
    story: "Çip okunamazsa dört büyüteç çıkar masaya: hologram, mikro yazı, kinegram ve bir güvenlik öğesi daha — dördü birden kontrol edilmeden geçiş yok.",
    targetFact: "NFC mümkün değilse hologram, mikro yazı ve kinegram gibi en az dört farklı güvenlik öğesinin görüntülü görüşmede teyit edilmesi gerekir.",
  },
  {
    id: "mn-uzaktan-kimlik-2",
    lessonId: "uzaktan-kimlik",
    hook: "İlk para, yüz yüze tanıdık hesaptan gelir",
    expansion: "UKT ile açılan hesapta ilk finansal hareket, müşterinin daha önce yüz yüze kimlik tespiti yapılmış bir banka hesabından gelmelidir",
    story: "Yeni uzaktan açılan hesaba ilk para girerken, gönderen hesabın da 'yüz yüze tanışılmış' bir hesap olması gerekir — tanımadığın bir kapıdan ilk para giremez.",
    targetFact: "UKT ile açılan hesapta ilk finansal hareketin, müşterinin daha önce yüz yüze kimlik tespiti yapılmış bir banka hesabından gelmesi şarttır.",
  },
  {
    id: "mn-uzaktan-kimlik-3",
    lessonId: "uzaktan-kimlik",
    hook: "On milyonda bir hata, TSE onaylar",
    expansion: "İnsan müdahalesi olmadan yapay zekâ kullanılıyorsa yanlış kabul oranının on milyonda birden az olduğunu gösteren TSE raporu gerekir",
    story: "On milyon kişilik bir stadyumda sadece bir kişinin yanlışlıkla içeri alınmasına izin var — bunu bir TSE raporu belgeler.",
    targetFact: "İnsan müdahalesi olmadan yapay zekâ kullanılan UKT'de yanlış kabul oranının on milyonda birden (1/10.000.000) az olduğunu gösteren TSE raporu gerekir.",
  },
  {
    id: "mn-diger-yukumlulukler-1",
    lessonId: "diger-yukumlulukler",
    hook: "8 yıl sakla, unutma",
    expansion: "Muhafaza süresi 5549 sayılı Kanun md. 8 uyarınca 8 yıldır",
    story: "Sekiz çekmeceli bir dolap düşün, her yıl bir çekmece dolar; sekiz yıl boyunca hiçbir çekmece boşaltılmaz.",
    targetFact: "Muhafaza süresi 5549 sayılı Kanun md. 8 uyarınca 8 yıldır.",
  },
  {
    id: "mn-diger-yukumlulukler-2",
    lessonId: "diger-yukumlulukler",
    hook: "Kimlik bitişte başlar, işlem anında başlar",
    expansion: "Kimlik tespiti belgelerinin muhafaza başlangıcı iş ilişkisinin sona erdiği tarih; işlem belgelerinin başlangıcı işlemin yapıldığı tarih",
    story: "Kimlik dosyası kapanış gününde saat sıfırlanır; işlem makbuzu ise kesildiği anda saat sıfırlanır — iki farklı saat, iki farklı başlangıç.",
    targetFact: "Kimlik tespiti belgelerinin muhafaza başlangıcı iş ilişkisinin sona erdiği tarih; işlem belgelerinin başlangıcı işlemin yapıldığı tarihtir.",
  },
  {
    id: "mn-diger-yukumlulukler-3",
    lessonId: "diger-yukumlulukler",
    hook: "E-tebligatta 5 gün yok, ulaştı mı bitti",
    expansion: "Elektronik tebligat, muhatabın elektronik adresine ulaştığı anda tebliğ edilmiş sayılır; genel idari usuldeki '5 gün sonra tebliğ' kuralı burada uygulanmaz",
    story: "Normal postada mektup 5 gün sonra 'okunmuş sayılır', ama e-tebligat kutusuna düşen mesaj o saniye okunmuş sayılır — bekleme yok.",
    targetFact: "Elektronik tebligatta belge, muhatabın elektronik adresine ulaştığı anda tebliğ edilmiş sayılır; genel idari usuldeki 5 günlük kural burada uygulanmaz.",
  },
  {
    id: "mn-musterinin-taninmasi-1",
    lessonId: "musterinin-taninmasi",
    hook: "Önce yüzde 25, sonra kontrol, olmazsa genel müdür",
    expansion: "Gerçek faydalanıcı üç aşamada belirlenir: %25'i aşan hisseye sahip gerçek kişi ortak, yoksa nihai kontrol sahibi, o da yoksa ticaret sicilindeki en üst düzey icra yetkilisi",
    story: "Bir merdivenin üç basamağı: birinci basamakta '%25 hisse sahibi' aranır, yoksa ikinci basamağa çıkıp 'nihai kontrol sahibi' aranır, o da yoksa en üst basamaktaki 'genel müdür' gerçek faydalanıcı kabul edilir.",
    targetFact: "Gerçek faydalanıcı üç aşamada belirlenir: %25'i aşan hisseye sahip gerçek kişi ortak, yoksa nihai kontrol sahibi gerçek kişi, o da yoksa ticaret sicilindeki en üst düzey icra yetkilisi.",
  },
  {
    id: "mn-musterinin-taninmasi-2",
    lessonId: "musterinin-taninmasi",
    hook: "Yabancı PEP hep yüksek, ayrılsa da 1 yıl takipte",
    expansion: "Yabancı PEP her zaman yüksek riskli kabul edilir; görevden ayrılsa bile en az 1 yıl sıkılaştırılmış tedbir sürer",
    story: "Yabancı bir bakanın üzerinde hep kırmızı bir 'yüksek risk' ışığı yanar; koltuktan inse bile ışık en az 1 yıl daha sönmez.",
    targetFact: "Yabancı PEP her zaman yüksek riskli kabul edilir; görevden ayrılsa/kaybetse dahi sıkılaştırılmış tedbirler en az 1 yıl süreyle sürdürülür.",
  },
  {
    id: "mn-musterinin-taninmasi-3",
    lessonId: "musterinin-taninmasi",
    hook: "Tek seferlik işlemde adres sorulmaz, sürekli ilişkide sorulur",
    expansion: "Adres teyidi sadece sürekli iş ilişkisi tesisinde zorunludur",
    story: "Bir defalık bir alışverişte adres kartı istenmez; ama uzun süreli bir üyelik açarken adres kartını göstermen istenir.",
    targetFact: "Adres teyidi sadece sürekli iş ilişkisi tesisinde zorunludur (yerleşim yeri belgesi, son 3 aya ait fatura vb.).",
  },
];

export const memoryPalaces: MemoryPalace[] = [
  {
    moduleId: "mod1",
    title: "MASAK Binası Turu",
    routeIntro:
      "Zihninde dokuz odalı bir MASAK binasında yürüdüğünü hayal et. Her oda bir dersi temsil eder; sınavda o konu geldiğinde önce odayı, sonra odadaki sahneyi hatırla.",
    stops: [
      {
        order: 1,
        location: "Giriş kapısı",
        lessonId: "masak-gorevleri",
        image: "Kapının üstünde kırmızı harflerle 'ADEG YASAK' tabelası asılı: Arama, Dava açma, El koyma, Gözaltı.",
        detail: "MASAK arama, el koyma, gözaltı yapamaz ve dava açamaz; sadece istihbarat toplar ve analiz eder.",
      },
      {
        order: 2,
        location: "Resepsiyon duvarı",
        lessonId: "uluslararasi-standartlar",
        image: "Duvarda iki çerçeveli rozet var: '1989 Paris / 1991 Türkiye' (FATF) ve '1995 Brüksel / 1998 MASAK' (Egmont); altında gri-beyaz bir liste panosu (2021 giriş, 2024 çıkış).",
        detail: "FATF 1989 Paris'te kuruldu, Türkiye 1991'de üye oldu; Türkiye Ekim 2021'de gri listeye girdi, 28 Haziran 2024'te çıktı; Egmont 1995 Brüksel, MASAK 1998 üye.",
      },
      {
        order: 3,
        location: "Harita odası",
        lessonId: "ulusal-koordinasyon",
        image: "Duvarda kocaman bir risk haritası: en tepede kırmızı 'DOLANDIRICILIK', en altta yeşil 'TEFECİLİK'; yanında FETÖ-PKK/KCK-Dini istismar-Sol sırasıyla dizilmiş dört terör rozeti.",
        detail: "Aklamada en yüksek risk dolandırıcılık, en düşük tefecilik; TF'de en yüksek risk FETÖ, sonra PKK/KCK ve dini istismar eden örgütler, sonra sol örgütler.",
      },
      {
        order: 4,
        location: "Çamaşırhane",
        lessonId: "aklama",
        image: "Üç bölmeli dev bir çamaşır makinesi: 'Yerleştir', 'Ayrıştır', 'Bütünleştir' etiketli üç bölme; makinenin üstünde '3-7 yıl / 6 ay eşik' yazan bir sayaç.",
        detail: "Aklama üç aşamadan oluşur (yerleştirme-ayrıştırma-bütünleştirme); TCK 282/1 cezası 3-7 yıl hapistir, öncül suç eşiği en az 6 ay hapis cezasıdır.",
      },
      {
        order: 5,
        location: "Kırmızı alarm odası",
        lessonId: "terorizmin-finansmani",
        image: "Dondurulmuş bir kasa: üstünde '1267 hazır liste' ve '1373 ulusal liste' yazan iki ayrı anahtarlık; yanında '2 Bakan + 48 saat + 5 gün' yazan bir saat.",
        detail: "1267 sayılı BMGK kararı hazır listeyle gecikmeksizin dondurur, 1373 ulusal liste/karşılıklılık öngörür; iç dondurma 2 Bakan kararı + 48 saatte mahkeme onayı (5 günde karar) gerektirir.",
      },
      {
        order: 6,
        location: "Nükleer-kimya laboratuvarı",
        lessonId: "kisyf",
        image: "Camlı bir laboratuvar: '1718 Kuzey Kore' ve '2231 İran' etiketli iki kavanoz; kontrol panelinde dokuz düğme, hepsi birden basılmadan alarm çalmıyor.",
        detail: "Kuzey Kore rejimi 1718 sayılı karara (2006), İran rejimi 2231 sayılı karara (2015) dayanır; KİSYF Komisyonu kararları 9 üye katılımı + 9 üye oyuyla alınır.",
      },
      {
        order: 7,
        location: "Şikâyet kutusu odası",
        lessonId: "sib",
        image: "Mühürlü bir posta kutusu; üstünde iki saat: '10 iş günü' ve 'DERHAL'; kutunun yanında 'tutar sınırı YOK' yazan bir levha.",
        detail: "ŞİB genel süresi 10 iş günü, gecikmesinde sakınca bulunan hallerde derhaldir; parasal alt/üst sınır yoktur, gizliliği ihlalin cezası 1-3 yıl hapistir.",
      },
      {
        order: 8,
        location: "Kırmızı buton odası",
        lessonId: "islem-ertelemesi",
        image: "Duvarda yedi günlük bir kum saati; altında 'sadece Bakan basar' yazan kırmızı bir buton; üç kapı: 'Ben', 'MASAK', 'Yabancı FIU'.",
        detail: "Erteleme kararını Bakan verir (devri sadece Bakan Yardımcısına), süre en fazla 7 iş günüdür; tetikleyiciler yükümlü talebi, MASAK re'sen incelemesi veya yabancı FIU talebidir.",
      },
      {
        order: 9,
        location: "Sunucu odası",
        lessonId: "fintek-riskleri",
        image: "Üç ekran yan yana: 'FAST 7/24 - 250.000 TL', 'EFT mesai saati', 'SWIFT sadece mesaj'; köşede '15.000 TL' yazan bir kripto terminali.",
        detail: "FAST 7/24 anlık çalışır (günlük 250.000 TL), EFT mesai saatinde çalışır, SWIFT sadece mesajlaşma ağıdır; Seyahat Kuralı 15.000 TL ve üzeri kripto transferinde uygulanır.",
      },
    ],
  },
  {
    moduleId: "mod2",
    title: "Uyum Departmanı Koridoru",
    routeIntro:
      "Şimdi beş odalı bir uyum departmanı koridorunda yürü. Her oda bir dersi temsil eder; Modül 1'deki binadan farklı bir bina olarak hayal etmen karışmayı önler.",
    stops: [
      {
        order: 1,
        location: "Yönetim kurulu toplantı odası",
        lessonId: "uyum-yonetimi",
        image: "Altı bölmeli bir pano: Politika-Risk-İzleme/Kontrol-Uyum Görevlisi-Eğitim-İç Denetim; duvarda '65 ortalama / 50 baraj / 3 yılda yenile / 5 yılda sil' yazan bir sertifika çerçevesi.",
        detail: "Uyum programının 6 bileşeni ve lisans sınavının 65 ortalama/50 baraj, 3 yılda bir yenileme, 5 yılda tam iptal kuralları.",
      },
      {
        order: 2,
        location: "Kasa / ceza masası",
        lessonId: "denetim-idari-ceza",
        image: "Fiyat etiketli bir tezgah: '30.000 TL' ve '50.000 TL' iki etiket; yanında '%5 x2 / 40.000.000 TL / 4.000.000 TL' yazan büyük bir pano; köşede 'yöneticiye çeyrek' yazan küçük bir dilim.",
        detail: "Kimlik/bilgi ihlali 30.000 TL, ŞİB yapmama 50.000 TL; finansal kuruluşta işlem tutarının en az %5'i x2, yıllık tavan 40.000.000 TL (diğerlerinde 4.000.000 TL); yöneticiye cezanın 1/4'ü uygulanabilir.",
      },
      {
        order: 3,
        location: "Video görüşme kabini",
        lessonId: "uzaktan-kimlik",
        image: "Bir kabin içinde NFC okuyucu ve dört büyüteç (hologram, mikro yazı, kinegram, +1); ekranda 'ilk para yüz yüze tanıdık hesaptan' yazısı, altında 'on milyonda bir hata' göstergesi.",
        detail: "NFC yoksa 4 güvenlik öğesi teyidi gerekir; ilk finansal hareket yüz yüze doğrulanmış hesaptan gelmeli; yapay zekâ ile UKT'de yanlış kabul oranı on milyonda birden az olmalı (TSE raporu).",
      },
      {
        order: 4,
        location: "Arşiv deposu",
        lessonId: "diger-yukumlulukler",
        image: "Sekiz çekmeceli bir dolap; bir çekmecede 'kimlik: ilişki bitince başlar', diğerinde 'işlem: işlem anında başlar' etiketi; duvarda 'e-tebligat: 5 gün YOK' yazan bir saat.",
        detail: "Muhafaza süresi 8 yıldır; kimlik belgeleri ilişkinin bitişinden, işlem belgeleri işlem tarihinden sayılır; elektronik tebligat ulaştığı an tebliğ sayılır.",
      },
      {
        order: 5,
        location: "Müşteri karşılama masası",
        lessonId: "musterinin-taninmasi",
        image: "Üç basamaklı bir merdiven: '%25 hisse' → 'nihai kontrol' → 'genel müdür'; yanında kırmızı ışıklı bir 'Yabancı PEP: 1 yıl' lambası; masada 'sürekli ilişkide adres sor' notu.",
        detail: "Gerçek faydalanıcı üç aşamada aranır (%25 hisse, nihai kontrol, en üst icra yetkilisi); yabancı PEP her zaman yüksek risklidir ve görevden ayrılsa da en az 1 yıl sıkı tedbir sürer; adres teyidi sadece sürekli ilişkide zorunludur.",
      },
    ],
  },
];

export const recallDrills: RecallDrill[] = [
  { id: "rd-masak-gorevleri-1", lessonId: "masak-gorevleri", type: "fill-blank",
    prompt: "MASAK; arama, el koyma ve ___ yapamaz, ___ açma yetkisi yoktur.",
    answer: "gözaltı; dava", keywords: ["gözaltı", "dava"] },
  { id: "rd-masak-gorevleri-2", lessonId: "masak-gorevleri", type: "closed-book",
    prompt: "Kitabı kapat: MASAK hangi makama bağlıdır, tüzel kişiliği var mıdır ve Koordinasyon Kurulu'na kim başkanlık eder? 2-3 cümleyle anlat.",
    answer: "MASAK, Hazine ve Maliye Bakanına bağlı, tüzel kişiliği olmayan bir ana hizmet birimidir. Koordinasyon Kurulu'na MASAK Başkanı değil Hazine ve Maliye Bakan Yardımcısı başkanlık eder; kurul yılda en az iki kez (Nisan/Eylül) toplanır.",
    keywords: ["Hazine ve Maliye Bakanı", "tüzel kişiliği yok", "Bakan Yardımcısı", "Nisan", "Eylül"] },

  { id: "rd-uluslararasi-standartlar-1", lessonId: "uluslararasi-standartlar", type: "fill-blank",
    prompt: "Türkiye FATF gri listesine ___ 2021'de girdi, ___ 2024'te çıktı.",
    answer: "Ekim; 28 Haziran", keywords: ["Ekim 2021", "28 Haziran 2024"] },
  { id: "rd-uluslararasi-standartlar-2", lessonId: "uluslararasi-standartlar", type: "closed-book",
    prompt: "MONEYVAL hangi kuruluşa bağlıdır ve Türkiye doğrudan hangi kuruluşa karşı sorumludur?",
    answer: "MONEYVAL, Avrupa Konseyi bünyesinde bir izleme organıdır (AB kurumu değildir); Türkiye FATF üyesi olduğu için doğrudan FATF'e karşı sorumludur.",
    keywords: ["Avrupa Konseyi", "AB kurumu değil", "FATF"] },

  { id: "rd-ulusal-koordinasyon-1", lessonId: "ulusal-koordinasyon", type: "fill-blank",
    prompt: "Aklama suçlarında en yüksek risk ___, en düşük risk ___tir.",
    answer: "dolandırıcılık; tefecilik", keywords: ["dolandırıcılık", "tefecilik"] },
  { id: "rd-ulusal-koordinasyon-2", lessonId: "ulusal-koordinasyon", type: "closed-book",
    prompt: "2021-2025 ve 2025-2029 Strateji Belgelerinin odak noktalarını karşılaştır.",
    answer: "2021-2025 Strateji Belgesi aklama/terörün finansmanına odaklanır (5 ana amaç); 2025-2029 Strateji Belgesi KİSYF ile mücadeleye odaklanır.",
    keywords: ["2021-2025", "aklama/TF", "2025-2029", "KİSYF"] },

  { id: "rd-aklama-1", lessonId: "aklama", type: "fill-blank",
    prompt: "Aklamanın üç aşaması sırasıyla ___, ___ ve ___tir.",
    answer: "yerleştirme; ayrıştırma (katmanlaştırma); bütünleştirme",
    keywords: ["yerleştirme", "ayrıştırma", "katmanlaştırma", "bütünleştirme"] },
  { id: "rd-aklama-2", lessonId: "aklama", type: "closed-book",
    prompt: "TCK 282'deki ağırlaştırıcı nedenleri ve öncül suç eşiğini anlat.",
    answer: "Kamu görevlisi veya meslek sahibi tarafından işlenirse ceza yarı oranında, suç örgütü faaliyeti kapsamında işlenirse bir kat artırılır. Öncül suç için işlenen suçun hapis cezası alt sınırının en az 6 ay olması gerekir.",
    keywords: ["yarı oranı", "bir kat", "6 ay"] },

  { id: "rd-terorizmin-finansmani-1", lessonId: "terorizmin-finansmani", type: "fill-blank",
    prompt: "Terörizmin finansmanında belirleyici unsur fonun ___ değil ___dır.",
    answer: "kaynağı; kullanım amacı", keywords: ["kaynağı", "kullanım amacı"] },
  { id: "rd-terorizmin-finansmani-2", lessonId: "terorizmin-finansmani", type: "closed-book",
    prompt: "İç dondurma kararının alınma sürecini adım adım anlat.",
    answer: "Hazine ve Maliye Bakanı ile İçişleri Bakanı birlikte karar verir; karar 48 saat içinde Ankara Ağır Ceza Mahkemesi'nin onayına sunulur; mahkeme 5 gün içinde karar verir.",
    keywords: ["2 Bakan", "48 saat", "Ankara Ağır Ceza", "5 gün"] },

  { id: "rd-kisyf-1", lessonId: "kisyf", type: "fill-blank",
    prompt: "Kuzey Kore rejimi ___ sayılı, İran rejimi ___ sayılı BMGK kararına dayanır.",
    answer: "1718; 2231", keywords: ["1718", "2231"] },
  { id: "rd-kisyf-2", lessonId: "kisyf", type: "closed-book",
    prompt: "KİSYF Denetim ve İş Birliği Komisyonu'nun karar yeter sayısını TF Değerlendirme Komisyonu ile karşılaştır.",
    answer: "KİSYF Komisyonu en az 9 üye katılımı ve 9 üye aynı yönde oyla karar alır; TF Değerlendirme Komisyonu'nda ise en az 5 üye oyu yeterlidir.",
    keywords: ["9 üye", "5 üye"] },

  { id: "rd-sib-1", lessonId: "sib", type: "fill-blank",
    prompt: "ŞİB genel bildirim süresi ___ iş günü, gecikmesinde sakınca bulunan hallerde ise ___ bildirilir.",
    answer: "10; derhal", keywords: ["10 iş günü", "derhal"] },
  { id: "rd-sib-2", lessonId: "sib", type: "closed-book",
    prompt: "ŞİB gizliliğinin (tipping-off) kapsamını ve ihlalinin cezasını anlat.",
    answer: "Bildirimde bulunulduğu bilgisi denetim elemanları ve mahkemeler dışında işlem tarafları dahil hiç kimseye açıklanamaz; ihlalin cezası 1-3 yıl hapis ve 5.000 güne kadar adli para cezasıdır.",
    keywords: ["kimseye açıklanamaz", "1-3 yıl", "5.000 gün"] },

  { id: "rd-islem-ertelemesi-1", lessonId: "islem-ertelemesi", type: "fill-blank",
    prompt: "Erteleme kararını ___ verir, süresi en fazla ___ iş günüdür.",
    answer: "Hazine ve Maliye Bakanı; 7", keywords: ["Hazine ve Maliye Bakanı", "7 iş günü"] },
  { id: "rd-islem-ertelemesi-2", lessonId: "islem-ertelemesi", type: "closed-book",
    prompt: "Erteleme üç farklı şekilde nasıl tetiklenebilir?",
    answer: "Yükümlünün erteleme talepli ŞİB göndermesiyle, MASAK'ın re'sen incelemesiyle veya yabancı bir ülkenin muadil FIU'sunun karşılıklılık esasına dayalı talebiyle tetiklenebilir.",
    keywords: ["yükümlü talebi", "re'sen", "yabancı FIU"] },

  { id: "rd-fintek-riskleri-1", lessonId: "fintek-riskleri", type: "fill-blank",
    prompt: "FAST günde en fazla ___ TL işler ve ___ çalışır; EFT ___ saatlerinde çalışır.",
    answer: "250.000; 7/24; mesai", keywords: ["250.000", "7/24", "mesai"] },
  { id: "rd-fintek-riskleri-2", lessonId: "fintek-riskleri", type: "closed-book",
    prompt: "Seyahat Kuralı'nın (Travel Rule) hangi tutardan itibaren ve ne şekilde uygulandığını anlat.",
    answer: "15.000 TL ve üzerindeki kripto transferlerinde gönderen ve alıcıya ait kimlik/hesap bilgileri transfer mesajına eklenir; eksik bilgi tamamlatılır, sağlanamazsa işlem iade edilir.",
    keywords: ["15.000 TL", "taraf bilgisi", "iade"] },

  { id: "rd-uyum-yonetimi-1", lessonId: "uyum-yonetimi", type: "fill-blank",
    prompt: "Uyum programının altı bileşeni: kurum politikası, ___, izleme-kontrol, ___, eğitim, ___tir.",
    answer: "risk yönetimi; uyum görevlisi/birimi; iç denetim",
    keywords: ["risk yönetimi", "uyum görevlisi", "iç denetim"] },
  { id: "rd-uyum-yonetimi-2", lessonId: "uyum-yonetimi", type: "closed-book",
    prompt: "Uyum görevlisi lisans sınavının puanlama kuralını ve yenileme döngüsünü anlat.",
    answer: "Genel ortalama en az 65, her modülden en az 50 puan alınmalıdır; lisans her 3 yılda bir yenileme eğitimi gerektirir, 5 yıl aksarsa lisans tamamen iptal olur.",
    keywords: ["65 ortalama", "50 baraj", "3 yıl", "5 yıl"] },

  { id: "rd-denetim-idari-ceza-1", lessonId: "denetim-idari-ceza", type: "fill-blank",
    prompt: "Kimlik tespiti/devamlı bilgi verme ihlalinde ___ TL, ŞİB yapmama ihlalinde ___ TL idari para cezası uygulanır.",
    answer: "30.000; 50.000", keywords: ["30.000", "50.000"] },
  { id: "rd-denetim-idari-ceza-2", lessonId: "denetim-idari-ceza", type: "closed-book",
    prompt: "Finansal kuruluşlarda idari para cezası nasıl hesaplanır ve yıllık tavanları nedir?",
    answer: "İşlem tutarının en az %5'i, iki kat oranında hesaplanır; yıllık tavan finansal kuruluşlarda 40.000.000 TL, diğer yükümlülerde 4.000.000 TL'dir.",
    keywords: ["%5", "iki kat", "40.000.000", "4.000.000"] },

  { id: "rd-uzaktan-kimlik-1", lessonId: "uzaktan-kimlik", type: "fill-blank",
    prompt: "NFC doğrulaması yapılamazsa en az ___ farklı güvenlik öğesinin görüntülü görüşmede teyidi gerekir.",
    answer: "dört (4)", keywords: ["dört", "4"] },
  { id: "rd-uzaktan-kimlik-2", lessonId: "uzaktan-kimlik", type: "closed-book",
    prompt: "UKT ile açılan hesapta ilk finansal hareket kuralını ve yapay zekâ kullanımında aranan TSE şartını anlat.",
    answer: "İlk finansal hareketin müşterinin daha önce yüz yüze kimlik tespiti yapılmış bir banka hesabından gelmesi şarttır; insan müdahalesi olmadan yapay zekâ kullanılıyorsa yanlış kabul oranının on milyonda birden az olduğunu gösteren TSE raporu gerekir.",
    keywords: ["yüz yüze hesap", "on milyonda bir", "TSE"] },

  { id: "rd-diger-yukumlulukler-1", lessonId: "diger-yukumlulukler", type: "fill-blank",
    prompt: "Muhafaza süresi ___ yıldır (5549 sayılı Kanun md. ___).",
    answer: "8; 8", keywords: ["8 yıl", "md. 8"] },
  { id: "rd-diger-yukumlulukler-2", lessonId: "diger-yukumlulukler", type: "closed-book",
    prompt: "Kimlik belgeleri ile işlem belgelerinin muhafaza başlangıç tarihleri nasıl farklılaşır?",
    answer: "Kimlik tespiti belgelerinin muhafaza başlangıcı iş ilişkisinin sona erdiği tarihtir; işlem belgelerinin başlangıcı ise ilgili işlemin yapıldığı tarihtir.",
    keywords: ["ilişkinin bitişi", "işlem tarihi"] },

  { id: "rd-musterinin-taninmasi-1", lessonId: "musterinin-taninmasi", type: "fill-blank",
    prompt: "Gerçek faydalanıcı üç aşamada aranır: önce %___ hisse sahibi, sonra ___, olmazsa ___.",
    answer: "25; nihai kontrol sahibi; en üst düzey icra yetkilisi",
    keywords: ["%25", "nihai kontrol", "en üst düzey icra yetkilisi"] },
  { id: "rd-musterinin-taninmasi-2", lessonId: "musterinin-taninmasi", type: "closed-book",
    prompt: "Yabancı PEP'in risk statüsünü ve görevden ayrılma sonrasındaki durumunu anlat.",
    answer: "Yabancı PEP her zaman yüksek riskli kabul edilir; görevden ayrılsa veya bu sıfatı kaybetse dahi sıkılaştırılmış tedbirler en az 1 yıl süreyle sürdürülür, risk devam ediyorsa süre uzatılabilir.",
    keywords: ["her zaman yüksek risk", "en az 1 yıl"] },
];

// ---- Gerçek (el yazımı) soru bankası ----
// Her soru, yukarıdaki `baseLessonContentById` içindeki doğrulanmış mustKnow /
// confusions / casePattern alanlarından türetilmiştir.

type AuthoredQuestion = {
  prompt: string;
  options: [string, string, string, string];
  answer: number;
  explanation: string;
  trapNote: string;
  difficulty?: Difficulty;
};

const authoredQuestionsByLessonId: Record<string, AuthoredQuestion[]> = {
  "masak-gorevleri": [
    {
      prompt: "MASAK'ın hukuki statüsü hakkında aşağıdakilerden hangisi doğrudur?",
      options: [
        "Hazine ve Maliye Bakanına doğrudan bağlı, tüzel kişiliği bulunmayan bir ana hizmet birimidir.",
        "Cumhurbaşkanlığına bağlı ve tüzel kişiliği bulunan bağımsız bir kuruldur.",
        "İçişleri Bakanlığı bünyesinde kolluk yetkisine sahip bir birimdir.",
        "Adalet Bakanlığına bağlı adli bir soruşturma makamıdır.",
      ],
      answer: 0,
      explanation: "MASAK, 1 sayılı Cumhurbaşkanlığı Kararnamesi uyarınca Hazine ve Maliye Bakanına bağlı, tüzel kişiliği olmayan bir ana hizmet birimidir; adli soruşturma yetkisi yoktur.",
      trapNote: "MASAK'ı bağımsız bir kurul ya da adli/kolluk makamı gibi gösteren seçenekler klasik çeldiricidir.",
    },
    {
      prompt: "Bir şüpheli işlem bildirimi sonrasında MASAK'ın doğrudan yapabileceği işlem aşağıdakilerden hangisidir?",
      options: [
        "Bildirimi analiz edip sonucu ilgili makamlarla (savcılık dahil) paylaşmak",
        "Şüpheli hesaba doğrudan el koymak",
        "Şüpheliyi gözaltına almak",
        "Doğrudan kamu davası açmak",
      ],
      answer: 0,
      explanation: "MASAK analiz ve paylaşım yapar; arama, el koyma, gözaltı ve dava açma yetkisi Cumhuriyet savcılarına/yargı makamlarına aittir.",
      trapNote: "MASAK'a soruşturma/yaptırım yetkisi atfeden seçenekler sınavın klasik tuzağıdır.",
    },
    {
      prompt: "Aşağıdakilerden hangisi 5549 sayılı Kanun md. 2 anlamında 'denetim elemanı' tanımına girmez?",
      options: [
        "Serbest Muhasebeci Mali Müşavir (SMMM)",
        "Vergi Müfettişi",
        "Bankalar Yeminli Murakıbı",
        "BDDK Uzmanı",
      ],
      answer: 0,
      explanation: "Denetim elemanları Vergi Müfettişleri, Hazine ve Maliye Uzmanları, Gümrük ve Ticaret Müfettişleri, Bankalar Yeminli Murakıpları, BDDK/SPK uzmanları ve TCMB denetçileridir; SMMM, YMM ve kolluk bu tanıma girmez.",
      trapNote: "SMMM/YMM ve kolluk (polis/jandarma) MASAK ile iş birliği yapsa da yasal tanımda denetim elemanı sayılmaz.",
    },
    {
      prompt: "Malî Suçlarla Mücadele Koordinasyon Kurulu ile ilgili aşağıdaki ifadelerden hangisi YANLIŞTIR?",
      options: [
        "Kurula MASAK Başkanı başkanlık eder.",
        "Kurul yılda en az iki kez toplanır.",
        "Üyeler çekimser oy kullanamaz.",
        "Oy eşitliğinde başkanın bulunduğu taraf üstün sayılır.",
      ],
      answer: 0,
      explanation: "Kurula MASAK Başkanı değil, Hazine ve Maliye Bakan Yardımcısı başkanlık eder; diğer üç ifade doğrudur.",
      trapNote: "MASAK Başkanı'nı kurul başkanı gibi gösteren ifade en sık karışan yanlıştır.",
    },
  ],
  "uluslararasi-standartlar": [
    {
      prompt: "Türkiye'nin benimsediği mali istihbarat birimi (MİB) modeli ve MASAK'ın bu modeldeki konumu için hangisi doğrudur?",
      options: [
        "İdari Tip; MASAK yükümlüler ile kolluk/adli makamlar arasında tampon görevi görür.",
        "Kolluk Tipi; MASAK doğrudan emniyet teşkilatı bünyesinde çalışır.",
        "Adli/Savcılık Tipi; MASAK yargı bünyesinde hızlı el koyma yapar.",
        "Karma/Hibrit Tip; MASAK hem savcılık hem kolluk yetkisine sahiptir.",
      ],
      answer: 0,
      explanation: "Türkiye İdari Tip MİB modelini benimser; MASAK finansal sektör ile kolluk/adli makamlar arasında analiz ve tampon görevi görür.",
      trapNote: "MASAK'a kolluk veya adli yetki atfeden seçenekler yanlıştır.",
    },
    {
      prompt: "FATF ve Türkiye ile ilgili tarihler hakkında hangisi doğrudur?",
      options: [
        "FATF 1989'da G-7 zirvesinde kuruldu, Türkiye 1991'de üye oldu.",
        "FATF 1995'te Brüksel'de kuruldu, Türkiye 1998'de üye oldu.",
        "FATF 2001'de kuruldu, Türkiye kurucu üyedir.",
        "FATF 1989'da kuruldu ama Türkiye hiçbir zaman üye olmadı.",
      ],
      answer: 0,
      explanation: "FATF 1989'da G-7 zirvesinde (Paris) kuruldu; Türkiye 1991'de üye oldu. (1995/1998 tarihleri Egmont Grubu ile MASAK'ın üyeliğine aittir.)",
      trapNote: "FATF ve Egmont'un kuruluş/üyelik tarihleri sınavda kasıtlı olarak karıştırılır.",
    },
    {
      prompt: "Türkiye'nin FATF gri liste süreciyle ilgili hangisi doğrudur?",
      options: [
        "Ekim 2021'de gri listeye girdi, 28 Haziran 2024'te çıktı; hiç kara listeye girmedi.",
        "2019'da kara listeye girdi, 2022'de çıktı.",
        "Halen gri listededir.",
        "Gri listeye hiç girmedi, sadece izlemeye alındı.",
      ],
      answer: 0,
      explanation: "Türkiye FATF kararıyla Ekim 2021'de gri listeye (artırılmış izleme) alındı, 28 Haziran 2024'te listeden çıkarıldı; kara listeye hiç girmedi.",
      trapNote: "Kara liste ile gri liste kavramları ve tarihler sıkça karıştırılır.",
    },
    {
      prompt: "MONEYVAL hakkında hangisi doğrudur?",
      options: [
        "Avrupa Konseyi bünyesinde bir izleme organıdır; Türkiye doğrudan FATF'e karşı sorumludur.",
        "Avrupa Birliği'nin resmi bir kurumudur ve Türkiye doğrudan MONEYVAL'e karşı sorumludur.",
        "FATF'in yerini alan küresel bir örgüttür.",
        "Sadece Balkan ülkelerini kapsayan bir anlaşmadır.",
      ],
      answer: 0,
      explanation: "MONEYVAL, Avrupa Konseyi bünyesinde bir izleme organıdır (AB kurumu değildir); Türkiye FATF üyesi olduğu için doğrudan FATF tarafından değerlendirilir.",
      trapNote: "MONEYVAL'i AB kurumu sanmak ve Türkiye'nin ona karşı sorumlu olduğunu düşünmek yaygın bir hatadır.",
    },
    {
      prompt: "Egmont Grubu ile ilgili hangisi doğrudur?",
      options: [
        "1995'te Brüksel'de kuruldu, MASAK 1998'de üye oldu ve Egmont Güvenli Ağı (ESW) üzerinden bilgi paylaşır.",
        "1989'da Paris'te kuruldu, MASAK kurucu üyesidir.",
        "Sadece Avrupa ülkelerinin katıldığı kapalı bir birliktir.",
        "FATF'in bir alt komitesidir, ayrı bir kuruluş değildir.",
      ],
      answer: 0,
      explanation: "Egmont Grubu 1995'te Brüksel'de kuruldu, MASAK 1998'de üye oldu; 182 ülkenin MİB'i üyedir ve Egmont Güvenli Ağı (ESW) üzerinden gizli istihbarat paylaşılır.",
      trapNote: "Egmont'un FATF'ten bağımsız, operasyonel bir bilgi paylaşım ağı olduğu unutulmamalı.",
    },
  ],
  "ulusal-koordinasyon": [
    {
      prompt: "Ulusal Risk Değerlendirmesi'ne göre aklama suçlarında risk sıralaması hakkında hangisi doğrudur?",
      options: [
        "En yüksek risk dolandırıcılık, en düşük risk tefeciliktir.",
        "En yüksek risk tefecilik, en düşük risk dolandırıcılıktır.",
        "Tüm öncül suçlar aynı risk seviyesindedir.",
        "En yüksek risk vergi kaçakçılığıdır.",
      ],
      answer: 0,
      explanation: "Ulusal Risk Değerlendirmesi'nde en yüksek risk dolandırıcılık, orta-yüksek risk yasa dışı bahis/uyuşturucu/hırsızlık, orta risk vergi kaçakçılığı/yolsuzluk, en düşük risk tefeciliktir.",
      trapNote: "Dolandırıcılık-tefecilik uçları sınavda sık yer değiştirilerek sorulur.",
    },
    {
      prompt: "Terörün finansmanında en yüksek riskli yapı hangisidir?",
      options: [
        "FETÖ",
        "Sol terör örgütleri",
        "Yalnızca yabancı terör örgütleri",
        "Tüm örgütler eşit risktedir",
      ],
      answer: 0,
      explanation: "Terörün finansmanında en yüksek riskli yapı FETÖ, ardından PKK/KCK ve dini istismar eden örgütler gelir; sol terör örgütleri orta-düşük risk grubundadır.",
      trapNote: "Risk sıralamasını göz ardı edip 'tüm örgütler eşittir' diyen seçenekler yanıltıcıdır.",
    },
    {
      prompt: "2021-2025 ve 2025-2029 AML/CFT strateji belgeleri hakkında hangisi doğrudur?",
      options: [
        "2021-2025 aklama/TF'ye, 2025-2029 KİSYF'e odaklanır; sekretaryayı MASAK yürütür.",
        "Her iki belge de sadece KİSYF'i kapsar.",
        "Strateji belgeleri sadece kolluk için bağlayıcıdır, yükümlüleri etkilemez.",
        "Strateji belgeleri MASAK dışında bir kurum tarafından yürütülür.",
      ],
      answer: 0,
      explanation: "2021-2025 Strateji Belgesi aklama/TF'ye odaklanır (5 ana amaç); 2025-2029 Strateji Belgesi KİSYF ile mücadeleye odaklanır; MASAK her iki sürecin sekretaryasını yürütür.",
      trapNote: "Strateji belgelerinin yükümlüleri de etkilediği (rehber/eğitim/izleme önceliği) unutulmamalı.",
    },
  ],
  aklama: [
    {
      prompt: "Aklama sürecinin üç aşaması ve sırası aşağıdakilerden hangisinde doğru verilmiştir?",
      options: [
        "Yerleştirme → Katmanlaştırma (Ayrıştırma) → Bütünleştirme",
        "Bütünleştirme → Yerleştirme → Katmanlaştırma",
        "Katmanlaştırma → Bütünleştirme → Yerleştirme",
        "Yerleştirme ve Bütünleştirme aynı aşamadır, Katmanlaştırma ayrı değildir",
      ],
      answer: 0,
      explanation: "Aklama; suç gelirinin sisteme sokulduğu Yerleştirme, kaynak bağının koparıldığı Katmanlaştırma/Ayrıştırma ve gelirin meşru varlık gibi göründüğü Bütünleştirme aşamalarından oluşur.",
      trapNote: "Aşamaların sırası karıştırılarak sorulur; yerleştirme her zaman ilk aşamadır.",
    },
    {
      prompt: "TCK 282/1 uyarınca aklama suçunun temel cezası nedir?",
      options: [
        "3 yıldan 7 yıla kadar hapis ve 20.000 güne kadar adli para cezası",
        "1 yıldan 3 yıla kadar hapis cezası",
        "Sadece idari para cezası",
        "5 yıldan 10 yıla kadar hapis cezası",
      ],
      answer: 0,
      explanation: "TCK 282/1 temel ceza 3 yıldan 7 yıla kadar hapis ve 20.000 güne kadar adli para cezasıdır.",
      trapNote: "Bu ceza aralığı terörün finansmanı suçunun cezasıyla (5-10 yıl) karıştırılmamalıdır.",
    },
    {
      prompt: "TCK 282/2'de düzenlenen, aklamaya iştirak etmeksizin suç gelirini bilerek kabul/kullanma fiilinin cezası nedir?",
      options: [
        "2 yıldan 5 yıla kadar hapis cezası",
        "3 yıldan 7 yıla kadar hapis cezası",
        "6 aydan 1 yıla kadar hapis cezası",
        "Yalnızca idari para cezası",
      ],
      answer: 0,
      explanation: "TCK 282/2, iştirak etmeksizin bilerek suç gelirini kabul veya kullanma fiilini 2-5 yıl hapis cezasıyla düzenler; bu, 282/1'deki temel aklama suçundan (3-7 yıl) daha hafiftir.",
      trapNote: "282/1 ve 282/2 cezaları birbirine karıştırılır.",
    },
    {
      prompt: "Aklama suçunda ağırlaştırıcı nedenler hakkında hangisi doğrudur?",
      options: [
        "Kamu görevlisi veya meslek sahibi tarafından işlenirse ceza yarı oranında, suç işlemek için kurulmuş örgüt faaliyeti kapsamında işlenirse bir kat artırılır.",
        "Her iki durumda da ceza aynı oranda (bir kat) artırılır.",
        "Ağırlaştırıcı neden sadece kamu görevlisi için uygulanır, örgüt faaliyeti için uygulanmaz.",
        "Ağırlaştırıcı neden yalnızca banka çalışanları için geçerlidir.",
      ],
      answer: 0,
      explanation: "Kamu görevlisi veya meslek sahibi tarafından işlenirse ceza yarı oranında, suç işlemek için kurulmuş bir örgütün faaliyeti kapsamında işlenirse bir kat artırılır.",
      trapNote: "İki ağırlaştırıcı neden farklı oranlara sahiptir; bunlar eşitlenerek sorulabilir.",
    },
    {
      prompt: "Aklama suçunda öncül suç sayılabilmesi için aranan asgari şart nedir?",
      options: [
        "İşlenen suçun hapis cezası alt sınırının en az 6 ay olması",
        "İşlenen suçtan kesinleşmiş bir mahkumiyet kararı bulunması",
        "Suçun mutlaka bir örgüt tarafından işlenmiş olması",
        "Suçun yurt dışında işlenmiş olması",
      ],
      answer: 0,
      explanation: "Kanun, aklama suçunun oluşması için alt sınırı 6 ay veya daha fazla hapis cezası gerektiren bir öncül suç bulunmasını şart koşar; kesinleşmiş mahkumiyet şart değildir.",
      trapNote: "Öncül suçtan kesinleşmiş mahkumiyet arandığı sanılır; oysa malın bir suçtan geldiğinin yargılamada ispatı yeterlidir.",
    },
    {
      prompt: "Öncül suç ile aklama suçu arasındaki ilişki hakkında hangisi doğrudur?",
      options: [
        "Aklama suçunun oluşması için öncül suçtan kesinleşmiş bir mahkumiyet kararı şart değildir.",
        "Öncül suçtan beraat edilmesi halinde aklama suçu da otomatik olarak düşer.",
        "Öncül suç ile aklama suçu her zaman aynı davada birlikte görülmek zorundadır.",
        "Öncül suç işlenmeden aklamadan söz edilemez; ayrıca öncül suçun kesinleşmiş mahkumiyetle sabit olması zorunludur.",
      ],
      answer: 0,
      explanation: "Aklama suçu öncül suçtan bağımsız olarak değerlendirilir; malın bir suçtan geldiğinin yargılamada ispatı yeterlidir, ayrı ve kesinleşmiş bir mahkumiyet şart değildir.",
      trapNote: "'Önce öncül suç kesinleşmeli' varsayımı sınavın klasik tuzağıdır.",
    },
    {
      prompt: "TCK 282/6'da düzenlenen etkin pişmanlık hükmü kime ceza verilmeyeceğini öngörür?",
      options: [
        "Kovuşturma başlamadan önce malın ele geçirilmesini sağlayan veya yerini bildiren kişiye",
        "Yakalandıktan sonra pişmanlık beyan eden herkese",
        "Sadece kamu görevlisi faillere",
        "Mahkumiyet kesinleştikten sonra iade yapan kişiye",
      ],
      answer: 0,
      explanation: "TCK 282/6 uyarınca, kovuşturma başlamadan önce malın ele geçirilmesini sağlayan veya yerini bildiren kişiye ceza verilmez.",
      trapNote: "Etkin pişmanlığın zamanlaması (kovuşturmadan önce) kritik ayrımdır; sonradan pişmanlık bu hükmü karşılamaz.",
    },
    {
      prompt: "Öncül suçu bizzat işleyen kişi, elde ettiği geliri kendisi aklarsa hukuki durum nedir?",
      options: [
        "Fail hem öncül suçtan hem aklama suçundan ayrı ayrı cezalandırılır.",
        "Aklama suçu oluşmaz, çünkü kişi kendi suç gelirini aklamaktadır.",
        "Sadece öncül suçtan cezalandırılır, aklama ayrıca değerlendirilmez.",
        "Sadece aklama suçundan cezalandırılır, öncül suç cezası düşer.",
      ],
      answer: 0,
      explanation: "Öncül suçu işleyen kişi parayı kendisi aklarsa 'aklama oluşmaz' sanılır; oysa fail hem öncül suçtan hem aklamadan ayrı ayrı cezalandırılır.",
      trapNote: "'Kendi suçunun geliriyse aklama sayılmaz' inancı yaygın ama yanlıştır.",
    },
    {
      prompt: "Aklama suçunda kast unsuruyla ilgili hangisi doğrudur?",
      options: [
        "Malı sistemde gizleme/meşrulaştırma amacıyla işlem yapmak için özel kast aranırken, malın suçtan geldiğini bilerek yurt dışına çıkarmak için genel kast yeterlidir.",
        "Aklama suçu taksirle de işlenebilir.",
        "Kast unsuru aklama suçunda hiç aranmaz.",
        "Genel kast ve özel kast ayrımı aklama suçunda uygulanmaz.",
      ],
      answer: 0,
      explanation: "Malı yurt dışına çıkarmak için suçtan geldiğini bilmek (genel kast) yeterliyken, sistemde gizleme amaçlı işlem için özel kast (gizleme/meşrulaştırma amacı) aranır.",
      trapNote: "Aklama suçunun taksirle işlenebileceği iddiası yanlıştır; kasıtlı bir suçtur.",
    },
    {
      prompt: "Bir kişi geliriyle uyumsuz nakdi önce bankaya yatırıyor, ardından bu parayı farklı kişi ve ülkelere bölerek aktarıyor, en sonunda gayrimenkul satın alıyor. Bu olayda sırasıyla hangi aşamalar görülmektedir?",
      options: [
        "Yerleştirme (yatırma) → Katmanlaştırma (bölerek aktarma) → Bütünleştirme (gayrimenkul alımı)",
        "Sadece Bütünleştirme aşaması gerçekleşmiştir.",
        "Sadece Yerleştirme aşaması gerçekleşmiştir, diğerleri aklama kapsamında değildir.",
        "Olayda aklamanın hiçbir aşaması yoktur, çünkü tek bir suç değil üç ayrı işlemdir.",
      ],
      answer: 0,
      explanation: "Nakdin bankaya yatırılması yerleştirme, farklı kişi/ülkelere bölünerek aktarılması katmanlaştırma, gayrimenkul alımına yönelmesi ise bütünleştirme aşamasıdır; üç aşama aynı olayda art arda görülebilir.",
      trapNote: "Üç aşamanın aynı olayda peş peşe yaşanabileceği gözden kaçırılmamalıdır.",
      difficulty: "Sınav",
    },
  ],
  "terorizmin-finansmani": [
    {
      prompt: "Terörizmin finansmanı suçu kapsamında 'fon' kavramı için hangisi doğrudur?",
      options: [
        "Para dışında taşınır/taşınmaz mal, hak, alacak ve elektronik/dijital değerleri de kapsayan geniş bir kavramdır.",
        "Sadece nakit parayla sınırlıdır.",
        "Sadece banka hesabındaki bakiyeyi ifade eder.",
        "Yalnızca yurt dışı kaynaklı değerleri kapsar.",
      ],
      answer: 0,
      explanation: "Fon; para dışında taşınır/taşınmaz mal, hak, alacak ve elektronik/dijital değerleri de kapsayan geniş bir kavramdır.",
      trapNote: "Fonu sadece nakitle sınırlı sanmak yaygın bir hatadır.",
    },
    {
      prompt: "Terörizmin finansmanı suçunda belirleyici unsur nedir?",
      options: [
        "Fonun terör eylemi, örgütü veya teröristle bağlantılı amaçla kullanılması; kaynağın yasal olması bunu değiştirmez.",
        "Fonun mutlaka suç geliri olması.",
        "Fonun büyük tutarlı olması.",
        "Fonun nakit olarak taşınması.",
      ],
      answer: 0,
      explanation: "TF'de belirleyici unsur fonun kaynağı değil kullanım amacıdır; kaynak tamamen yasal (maaş, miras, bağış) olsa bile amaç terör bağlantılıysa suç oluşur.",
      trapNote: "Aklamada kaynak suç geliri aranırken, TF'de kaynağın yasal olması suçu ortadan kaldırmaz.",
    },
    {
      prompt: "Terörizmin finansmanı suçunun oluşması için hangisi gereklidir?",
      options: [
        "Fonun terör örgütüne veya teröriste bilerek ve isteyerek sağlanması veya toplanması yeterlidir; fiilen bir terör eyleminde kullanılmış olması şart değildir.",
        "Fonun mutlaka bir terör eyleminde fiilen kullanılmış olması şarttır.",
        "Sadece toplanan fonun 10.000 TL'yi aşması şarttır.",
        "Fonun sadece yurt dışına transfer edilmiş olması şarttır.",
      ],
      answer: 0,
      explanation: "Terörizmin finansmanı suçunun oluşması için fonun bir terör eyleminde fiilen kullanılmış olması gerekmez; terör örgütüne veya teröriste bilerek ve isteyerek sağlanması veya toplanması yeterlidir; ceza 5 yıldan 10 yıla kadar hapistir.",
      trapNote: "'Fiilen kullanılmadıysa suç oluşmaz' varsayımı yanlıştır.",
    },
    {
      prompt: "BMGK 1267 ve 1373 sayılı kararları arasındaki fark için hangisi doğrudur?",
      options: [
        "1267'de liste doğrudan BMGK'dan hazır gelir ve gecikmeksizin dondurulur; 1373'te ülkeler kendi ulusal listelerini oluşturur veya karşılıklılık esasıyla talebi değerlendirir.",
        "Her iki karar da aynı prosedürü öngörür.",
        "1373 sadece Taliban ve El-Kaide'yi kapsar.",
        "1267 sadece ulusal liste oluşturmayı öngörür.",
      ],
      answer: 0,
      explanation: "1267 sayılı BMGK kararı (Taliban, El-Kaide, IŞİD/DEAŞ listeleri) doğrudan BMGK'dan gelir ve gecikmeksizin dondurulur; 1373 sayılı karar ülkelerin kendi ulusal listelerini oluşturmasını veya karşılıklılık esasıyla başka bir devletin talebini değerlendirmesini öngörür.",
      trapNote: "1267 ile 1373'ün liste kaynağı ve dondurma usulü karıştırılır.",
    },
    {
      prompt: "Malvarlığının iç dondurma kararını hangi makamlar birlikte verir?",
      options: [
        "Hazine ve Maliye Bakanı ile İçişleri Bakanı",
        "Sadece MASAK Başkanı",
        "Cumhurbaşkanı tek başına",
        "Cumhuriyet Başsavcılığı",
      ],
      answer: 0,
      explanation: "İç dondurma kararını Hazine ve Maliye Bakanı ile İçişleri Bakanı birlikte verir.",
      trapNote: "Kararın tek bir bakan veya MASAK Başkanı tarafından verildiği sanılır.",
    },
    {
      prompt: "İç dondurma kararı verildikten sonraki süreç için hangisi doğrudur?",
      options: [
        "Karar 48 saat içinde Ankara Ağır Ceza Mahkemesi'nin onayına sunulur; mahkeme 5 gün içinde karar verir.",
        "Karar hiçbir mahkeme onayı gerektirmez.",
        "Karar 30 gün içinde herhangi bir asliye mahkemesine sunulur.",
        "Karar doğrudan Anayasa Mahkemesi'nce onaylanır.",
      ],
      answer: 0,
      explanation: "İç dondurma kararı 48 saat içinde Ankara Ağır Ceza Mahkemesi'nin onayına sunulur, mahkeme 5 gün içinde karar verir.",
      trapNote: "Süre ve mahkeme türü (Ankara Ağır Ceza) sınavda sıkça karıştırılır.",
    },
    {
      prompt: "Değerlendirme Komisyonu'nun yapısı ve karar yeter sayısı için hangisi doğrudur?",
      options: [
        "MASAK Başkanı başkanlığında 7 kurum temsilcisinden oluşur; karar için en az 5 üyenin aynı yönde oyu gerekir.",
        "Sadece MASAK ve İçişleri Bakanlığı temsilcilerinden oluşur.",
        "Karar oy birliğiyle alınır.",
        "9 kurum temsilcisinden oluşur ve 9 oy gerekir.",
      ],
      answer: 0,
      explanation: "Değerlendirme Komisyonu, MASAK Başkanı başkanlığında 7 kurum temsilcisinden oluşur (Cumhurbaşkanlığı, MİT, Adalet, Dışişleri, İçişleri, Hazine ve Maliye); karar için en az 5 üyenin aynı yönde oyu gerekir.",
      trapNote: "9 üye/9 oy kuralı KİSYF Komisyonu'na aittir, TF Değerlendirme Komisyonu'yla karıştırılmamalıdır.",
    },
    {
      prompt: "Malvarlığının dondurulması ile el koyma/müsadere arasındaki fark için hangisi doğrudur?",
      options: [
        "Dondurma geçici ve idari bir tedbirdir, mülkiyeti değiştirmez; sadece tasarruf yetkisini kısıtlar. El koyma/müsadere ise yargı kararıyla mülkiyetin devlete geçmesidir.",
        "Dondurma ile müsadere aynı hukuki sonucu doğurur.",
        "Dondurma kararıyla mülkiyet otomatik olarak devlete geçer.",
        "Müsadere idari bir tedbirdir, yargı kararı gerektirmez.",
      ],
      answer: 0,
      explanation: "Dondurma geçici ve idari bir tedbirdir, mülkiyeti değiştirmez; el koyma/müsadere ise yargı kararıyla mülkiyetin devlete geçmesidir.",
      trapNote: "Dondurma ile müsaderenin hukuki sonucu (mülkiyet değişimi) karıştırılır.",
    },
    {
      prompt: "Malvarlığı dondurulan bir kişinin temel ihtiyaçları (gıda, kira, ilaç) için ödeme yapılabilmesi hangi şartla mümkündür?",
      options: [
        "MASAK izniyle",
        "Hiçbir şekilde mümkün değildir.",
        "Sadece mahkeme kararıyla.",
        "Kişinin kendi inisiyatifiyle serbestçe.",
      ],
      answer: 0,
      explanation: "Dondurulan malvarlığının mülkiyeti kişide kalır, sadece tasarruf yetkisi MASAK denetimine girer; temel ihtiyaçlar için MASAK izniyle ödeme yapılabilir.",
      trapNote: "Dondurmanın 'hiçbir ödeme yapılamaz' anlamına geldiği sanılır; oysa MASAK izniyle temel ihtiyaç ödemesi mümkündür.",
    },
    {
      prompt: "Küçük tutarlı veya yasal görünümlü (dernek/bağış) fonlarla ilgili hangisi doğrudur?",
      options: [
        "Bu fonlar otomatik olarak düşük risk sayılmaz; TF'de tespit büyük tutarlı aklamaya göre daha zor olabilir.",
        "Küçük tutarlı fonlar her zaman risksiz kabul edilir.",
        "Dernek/bağış yapıları hiçbir zaman TF riski taşımaz.",
        "Sadece 100.000 TL üzeri fonlar TF açısından incelenir.",
      ],
      answer: 0,
      explanation: "Küçük tutarlı veya yasal görünümlü fonlar otomatik düşük risk sayılmaz; TF'de tespit büyük tutarlı aklamaya göre daha zordur.",
      trapNote: "'Küçük tutar = düşük risk' varsayımı TF'de yanıltıcıdır.",
    },
    {
      prompt: "Küçük ama sık tekrarlanan bağışların riskli bir bölgeye yönelik alıcı ağıyla eşleştiği, ekonomik gerekçesi olmayan aktarımların ve paravan bir ticari işletme üzerinden fon aktarımının bir arada görüldüğü bir olayda en doğru değerlendirme hangisidir?",
      options: [
        "Fonun yasal görünen bir kaynaktan gelmesi TF şüphesini ortadan kaldırmaz; emare kümesi birlikte değerlendirilerek ŞİB değerlendirmesi yapılmalıdır.",
        "Bağışlar küçük tutarlı olduğu için hiçbir işlem yapılmasına gerek yoktur.",
        "Sadece tek bir aktarım incelenir, örüntü bir bütün olarak değerlendirilmez.",
        "Paravan işletme tespit edilse bile yasal kayıtlı olduğu için risk oluşturmaz.",
      ],
      answer: 0,
      explanation: "Küçük ama sık tekrarlanan bağışların riskli bölge bağlantısı, ekonomik gerekçesi olmayan aktarımlar ve paravan ticari işletme birlikte görüldüğünde TF şüphesi doğar; fonun yasal görünen kaynaktan gelmesi bu şüpheyi ortadan kaldırmaz.",
      trapNote: "Tek tek işlemlere bakıp örüntüyü (emare kümesini) gözden kaçırmak yaygın bir hatadır.",
      difficulty: "Sınav",
    },
  ],
  kisyf: [
    {
      prompt: "7262 sayılı Kanun'un kapsamı için hangisi doğrudur?",
      options: [
        "BMGK listesindeki kişi/kurumlara doğrudan/dolaylı fon sağlanmasını, toplanmasını, yasaklı programlara aktarılmasını, temsilcilik açılmasını ve yasaklı teknoloji transferini yasaklar.",
        "Sadece nakit para transferlerini yasaklar.",
        "Sadece Kuzey Kore vatandaşlarını kapsar.",
        "Sadece bankacılık işlemlerini düzenler, temsilcilik açmayı kapsamaz.",
      ],
      answer: 0,
      explanation: "7262 sayılı Kanun, BMGK listesindeki kişi/kurumlara fon sağlanmasını/toplanmasını, yasaklı programlara aktarımı, temsilcilik açmayı, bankacılık faaliyetini ve yasaklı teknoloji transferini yasaklar.",
      trapNote: "Kanunun kapsamının sadece finansal işlemlerle sınırlı olduğu sanılır; oysa temsilcilik ve teknoloji transferini de kapsar.",
    },
    {
      prompt: "KİSYF Denetim ve İş Birliği Komisyonu'na kim başkanlık eder ve komisyon ne sıklıkla toplanır?",
      options: [
        "MASAK Başkanı başkanlık eder; komisyon yılda en az iki kez toplanır.",
        "Hazine ve Maliye Bakanı başkanlık eder; ayda bir toplanır.",
        "Cumhurbaşkanı başkanlık eder; yılda bir toplanır.",
        "Komisyonun sabit bir toplantı takvimi yoktur.",
      ],
      answer: 0,
      explanation: "Denetim ve İş Birliği Komisyonu'na MASAK Başkanı başkanlık eder; komisyon yılda en az iki kez toplanır.",
      trapNote: "KİSYF Komisyonu ile TF Değerlendirme Komisyonu'nun ikisinde de başkan MASAK Başkanı'dır ama oy kuralları farklıdır.",
    },
    {
      prompt: "KİSYF Denetim ve İş Birliği Komisyonu'nun karar yeter sayısı için hangisi doğrudur?",
      options: [
        "En az 9 üyenin katılımı ve 9 üyenin aynı yöndeki oyuyla karar alınır.",
        "5 üyenin aynı yöndeki oyu yeterlidir.",
        "Oy birliği aranmaz, basit çoğunluk yeterlidir.",
        "Tek başına MASAK Başkanı karar verebilir.",
      ],
      answer: 0,
      explanation: "KİSYF Komisyonu kararları en az 9 üyenin katılımı ve 9 üyenin aynı yöndeki oyuyla alınır; bu, TF Değerlendirme Komisyonu'nun 5 üye oyu kuralından farklıdır.",
      trapNote: "9/9 kuralı ile TF'nin 5 oy kuralı sınavda kasıtlı olarak karıştırılır.",
    },
    {
      prompt: "KİSYF kapsamında dondurma nasıl gerçekleştirilir?",
      options: [
        "BMGK listeleri doğrudan Cumhurbaşkanı kararıyla Resmî Gazete'de yayımlanarak uygulanır; makul sebep varsa Komisyon önerisi ve Cumhurbaşkanı kararıyla da dondurma tesis edilebilir.",
        "Dondurma sadece mahkeme kararıyla yapılabilir.",
        "Dondurma MASAK Başkanı'nın tek imzasıyla yürürlüğe girer.",
        "Dondurma yalnızca yabancı devletlerin talebiyle mümkündür.",
      ],
      answer: 0,
      explanation: "Dondurma iki şekilde olur: BMGK listeleri doğrudan Cumhurbaşkanı kararıyla Resmî Gazete'de yayımlanarak uygulanır; ya da makul sebep varsa Komisyon önerisi ve Cumhurbaşkanı kararıyla dondurma tesis edilir.",
      trapNote: "Dondurmanın tek bir yolu olduğu (sadece mahkeme veya sadece MASAK) sanılır.",
    },
    {
      prompt: "KİSYF'nin kapsamı için hangisi doğrudur?",
      options: [
        "Sadece nükleer silahlarla sınırlı değildir; biyolojik ve kimyasal silahların finansmanını da kapsar.",
        "Sadece nükleer silah programlarını kapsar.",
        "Sadece konvansiyonel silahları kapsar.",
        "Sadece siber silahları kapsar.",
      ],
      answer: 0,
      explanation: "KİSYF (kitle imha silahlarının yayılmasının finansmanı) sadece nükleer silahlarla sınırlı değildir; biyolojik ve kimyasal silahların finansmanını da kapsar.",
      trapNote: "KİSYF'nin sadece nükleer silahlara indirgenmesi yaygın bir hatadır.",
    },
  ],
  sib: [
    {
      prompt: "ŞİB için parasal eşik hakkında hangisi doğrudur?",
      options: [
        "Parasal alt veya üst sınır yoktur; küçük tutarlı bir işlem bile şüpheliyse bildirilir.",
        "Sadece 50.000 TL üzeri işlemler bildirilir.",
        "Sadece nakit işlemler için eşik aranır.",
        "Eşik yükümlü türüne göre değişir, sabit değildir.",
      ],
      answer: 0,
      explanation: "ŞİB için parasal alt veya üst sınır yoktur; 1 TL'lik bir işlem bile şüpheliyse bildirilir.",
      trapNote: "Bir parasal eşik olduğu varsayımı en sık yapılan hatadır.",
    },
    {
      prompt: "Gerçekleşmeyen, teşebbüs aşamasında kalmış ve yükümlünün dikkati sayesinde tamamlanmayan bir işlem için hangisi doğrudur?",
      options: [
        "Bu işlem de ŞİB kapsamındadır, bildirime konu olabilir.",
        "İşlem tamamlanmadığı için hiçbir bildirim yükümlülüğü doğmaz.",
        "Sadece tamamlanmış işlemler bildirilir.",
        "Teşebbüs aşamasındaki işlemler sadece kayıt altına alınır, MASAK'a bildirilmez.",
      ],
      answer: 0,
      explanation: "İşlem tamamlanmasa dahi, yapılmaya teşebbüs edilen ve yükümlünün dikkati sayesinde gerçekleşmeyen işlemler de bildirim kapsamındadır.",
      trapNote: "'Gerçekleşmeyen işlem bildirilmez' varsayımı yanlıştır.",
    },
    {
      prompt: "ŞİB için genel bildirim süresi nedir ve ne zaman başlar?",
      options: [
        "Şüphenin oluştuğu tarihten itibaren 10 iş günüdür.",
        "İşlemin yapıldığı tarihten itibaren 10 takvim günüdür.",
        "Ay sonuna kadar herhangi bir zamanda yapılabilir.",
        "Şüphe oluşsa bile süre işlemez, MASAK talep ettiğinde bildirilir.",
      ],
      answer: 0,
      explanation: "Genel bildirim süresi, şüphenin oluştuğu tarihten itibaren 10 iş günüdür.",
      trapNote: "Sürenin işlem tarihinden değil, şüphenin oluştuğu/anlaşıldığı tarihten başladığı unutulmamalıdır.",
    },
    {
      prompt: "Gecikmesinde sakınca bulunan hallerde ŞİB bildirim süresi için hangisi doğrudur?",
      options: [
        "10 iş günü süresi beklenmeksizin derhal bildirim yapılır.",
        "Süre yine 10 iş günüdür, herhangi bir istisna yoktur.",
        "Süre 30 iş gününe uzar.",
        "Bu durumda bildirim yapma zorunluluğu ortadan kalkar.",
      ],
      answer: 0,
      explanation: "Gecikmesinde sakınca bulunan hallerde 10 iş günü süresi beklenmeksizin derhal bildirim yapılır.",
      trapNote: "Acil hallerde sürenin uzadığı değil, kısaldığı (derhal) unutulmamalıdır.",
    },
    {
      prompt: "Daha önce ŞİB yapılmış bir işlemle ilgili sonradan yeni bilgi ve bulgular elde edilirse ne yapılır?",
      options: [
        "Yeniden Şüpheli İşlem Bildirim Formu doldurulur, önceki bildirime ek olduğu belirtilerek gecikmeksizin Başkanlığa gönderilir.",
        "Önceki bildirim yeterlidir, yeni bilgi ayrıca bildirilmez.",
        "Yeni bilgiler sadece yıllık faaliyet raporunda MASAK'a iletilir.",
        "Yeni bilgiler için önce mahkemeden izin alınması gerekir.",
      ],
      answer: 0,
      explanation: "Bildirimde bulunulan işlemle ilgili sonradan yeni bilgi ve bulgular elde edildiğinde, tekrar Şüpheli İşlem Bildirim Formu doldurulur ve daha önce yapılan bildirime ek olduğu belirtilerek gecikmeksizin Başkanlığa gönderilir.",
      trapNote: "'İlk bildirim yeterlidir' varsayımı yanlıştır; her yeni bulgu ayrıca ve gecikmeksizin bildirilmelidir.",
    },
    {
      prompt: "Bir ŞİB yapıldığı veya yapılacağı bilgisi kimlere açıklanabilir?",
      options: [
        "Sadece denetim elemanları ve mahkemelere; işlem tarafları dahil başka hiç kimseye açıklanamaz.",
        "Müşteriye açıklanabilir, ancak yazılı olarak yapılmalıdır.",
        "Yurt dışındaki merkeze her zaman açıklanabilir.",
        "Yükümlünün üst yönetimi dışında kimseye açıklanamaz, denetim elemanına da açıklanamaz.",
      ],
      answer: 0,
      explanation: "Bildirimde bulunulduğu bilgisi; denetim elemanları ve mahkemeler dışında işlem tarafları dahil hiç kimseye (yurt dışındaki merkeze bile) açıklanamaz.",
      trapNote: "Yurt dışı merkeze bilgi verilebileceği yanılgısı sık karşılaşılan bir tuzaktır.",
    },
    {
      prompt: "ŞİB gizliliğinin (tipping-off) ihlali hangi yaptırımı doğurur?",
      options: [
        "1-3 yıl hapis ve 5.000 güne kadar adli para cezası",
        "Sadece 30.000 TL idari para cezası",
        "Hiçbir yaptırım öngörülmemiştir.",
        "Sadece uyarı cezası",
      ],
      answer: 0,
      explanation: "Bildirim gizliliğinin ihlalinin cezası 1-3 yıl hapis ve 5.000 güne kadar adli para cezasıdır (adli suçtur, idari değil).",
      trapNote: "Gizlilik ihlalinin idari değil adli bir suç olduğu unutulmamalıdır.",
    },
    {
      prompt: "İyi niyetle yapılan bir ŞİB'in sonradan yanlış çıkması durumunda bildirimi yapan kişi/kurumun hukuki durumu nedir?",
      options: [
        "İyi niyetle yapılan bildirimler nedeniyle bildirimi yapan kişi ve kurum hiçbir hukuki veya cezai sorumluluk taşımaz.",
        "Bildirimi yapan kişi müşteriye tazminat ödemekle yükümlü olur.",
        "Kurum idari para cezasına çarptırılır.",
        "Bildirim geçersiz sayılır ve tekrar yapılması gerekir.",
      ],
      answer: 0,
      explanation: "İyi niyetle yapılan bildirimler nedeniyle bildirimi yapan kişi ve kurum hiçbir hukuki veya cezai sorumluluk taşımaz; bu koruma hükmü doğru ve dürüst bildirimi teşvik eder.",
      trapNote: "'Şüphe yanlış çıkarsa sorumluluk doğar' varsayımı yanlıştır.",
    },
    {
      prompt: "Elektronik ortamda yapılan bir ŞİB'de yasal sürenin takibinde esas alınan tarih hangisidir?",
      options: [
        "Bildirimin MASAK (Başkanlık) kayıtlarına giriş tarihi",
        "Bildirimin uyum görevlisi tarafından hazırlandığı tarih",
        "Şüpheli işlemin banka sisteminde onaylandığı tarih",
        "Bildirimin gönderildiği e-posta sunucusunun zaman damgası",
      ],
      answer: 0,
      explanation: "Elektronik bildirimde yasal sürenin takibinde esas alınan tarih, bildirimin MASAK (Başkanlık) kayıtlarına giriş tarihidir.",
      trapNote: "Hazırlık tarihi ile MASAK'a fiilen ulaşma tarihi karıştırılmamalıdır.",
    },
    {
      prompt: "Dahili bildirim usulüyle ilgili hangisi doğrudur?",
      options: [
        "Dahili bildirim usulü serbestçe belirlenebilir ancak sadece sözlü (şifahi) bildirim kabul edilemez.",
        "Dahili bildirim mutlaka yazılı ve noter onaylı olmalıdır.",
        "Dahili bildirim usulü MASAK tarafından tek tip olarak belirlenmiştir, yükümlü değiştiremez.",
        "Sözlü bildirim her koşulda yeterlidir.",
      ],
      answer: 0,
      explanation: "Yükümlü içindeki dahili bildirim usulü serbestçe belirlenebilir ama sadece sözlü (şifahi) bildirim kabul edilemez; iz bırakan bir usul gerekir.",
      trapNote: "Sözlü bildirimin yeterli olduğu varsayımı yanlıştır.",
    },
    {
      prompt: "ŞİB için aranan şüphe standardı hangisidir?",
      options: [
        "Bilgi, şüphe veya şüpheyi gerektiren husus yeterlidir; ceza muhakemesindeki 'suç şüphesi' standardına bağlanamaz.",
        "Kesin delil ve somut suç unsuru aranır.",
        "Mahkeme kararı olmadan bildirim yapılamaz.",
        "Sadece savcılığın talep ettiği hallerde bildirim yapılır.",
      ],
      answer: 0,
      explanation: "ŞİB, ceza muhakemesindeki 'suç şüphesi' standardına bağlanamaz; bilgi, şüphe veya şüpheyi gerektiren bir husus yeterlidir.",
      trapNote: "Kesin delil arandığı yanılgısı ŞİB'in özünü kaçırır.",
    },
    {
      prompt: "ŞİB bildirim süresinin başlangıcı için hangisi doğrudur?",
      options: [
        "Süre, işlemin yapıldığı tarihte değil, şüphenin oluştuğu/anlaşıldığı tarihte başlar.",
        "Süre her zaman işlemin banka sistemine kaydedildiği tarihte başlar.",
        "Süre ay sonundan itibaren hesaplanır.",
        "Süre müşteri ile ilişkinin başladığı tarihte başlar.",
      ],
      answer: 0,
      explanation: "Bildirim süresi işlemin yapıldığı tarihte değil, şüphenin oluştuğu/anlaşıldığı tarihte başlar; şüphe işlemden çok sonra da doğabilir.",
      trapNote: "İşlem tarihi ile şüphenin oluştuğu tarih karıştırılır.",
    },
    {
      prompt: "Devamlı bilgi verme yükümlülüğü ile ŞİB arasındaki ilişki için hangisi doğrudur?",
      options: [
        "Devamlı bilgi verme yükümlülüğü ŞİB'in yerini almaz; ikisi ayrı mekanizmadır.",
        "Devamlı bilgi verme yapıldıysa ayrıca ŞİB yapılmasına gerek yoktur.",
        "ŞİB, devamlı bilgi vermenin bir alt türüdür.",
        "İkisi aynı formla, aynı süreçte yürütülür.",
      ],
      answer: 0,
      explanation: "Devamlı bilgi verme yükümlülüğü ŞİB'in yerini almaz; ikisi ayrı mekanizmadır ve ayrı ayrı yerine getirilmelidir.",
      trapNote: "Devamlı bilgi verme yapıldığında ŞİB'e gerek kalmadığı yanılgısı yaygındır.",
    },
    {
      prompt: "Bir müşteri olağan işlem profilinden saparak sık ve parçalı transferler yapıyor, açıklama vermekten kaçınıyor ve işlem ekonomik gerekçeyle açıklanamıyor. Uyum görevlisinin en doğru aksiyonu nedir?",
      options: [
        "Durumu değerlendirip en geç 10 iş günü içinde MASAK'a bildirmek; süreç boyunca müşteriye bildirimden söz etmemek.",
        "Müşteriden açık yazılı beyan alıp işlemi onaylamak.",
        "Sadece işlemi reddetmek, ŞİB değerlendirmesi yapmamak.",
        "Müşteriyi 'şüpheli görüldüğü' konusunda bilgilendirip açıklama istemek.",
      ],
      answer: 0,
      explanation: "Müşteri olağan profilinden saparak sık ve parçalı transferler yapıyor, açıklama vermekten kaçınıyor ve işlem ekonomik gerekçeyle açıklanamıyorsa uyum görevlisi durumu değerlendirip en geç 10 iş günü içinde MASAK'a bildirir; süreç boyunca müşteriye bildirimden söz edilmez.",
      trapNote: "Müşteriyi bilgilendirmek ihbar (tipping-off) yasağını ihlal eder.",
      difficulty: "Sınav",
    },
  ],
  "islem-ertelemesi": [
    {
      prompt: "İşlem ertelemesi kararını kim verir?",
      options: [
        "Hazine ve Maliye Bakanı; yetki yalnızca Bakan Yardımcısına devredilebilir.",
        "MASAK Başkanı.",
        "Uyum görevlisi kendi başına.",
        "Cumhuriyet savcısı.",
      ],
      answer: 0,
      explanation: "Erteleme kararını Hazine ve Maliye Bakanı verir; yetki yalnızca Bakan Yardımcısına devredilebilir, MASAK Başkanı bu kararı veremez.",
      trapNote: "MASAK Başkanı'nın erteleme kararı verebileceği sanılması yaygın bir hatadır.",
    },
    {
      prompt: "İşlem ertelemesi süresi için hangisi doğrudur?",
      options: [
        "En fazla 7 iş günüdür; bu süre kesindir ve uzatılamaz.",
        "En fazla 10 iş günüdür ve gerekirse uzatılabilir.",
        "30 gündür.",
        "Süre sınırı yoktur, MASAK karar verene kadar sürer.",
      ],
      answer: 0,
      explanation: "Yükümlü, erteleme talepli ŞİB'i ilettiği andan itibaren en fazla 7 iş günü boyunca işlemi gerçekleştirmekten imtina etmekle yükümlüdür; bu süre kesindir ve uzatılamaz.",
      trapNote: "7 iş günlük erteleme süresi ile 10 iş günlük genel ŞİB süresi karıştırılır.",
    },
    {
      prompt: "7 iş günü içinde Bakanlık kararı tebliğ edilmezse ne olur?",
      options: [
        "Yükümlünün işlemi gerçekleştirmeme yükümlülüğü kendiliğinden sona erer ve işlem yapılabilir.",
        "Erteleme süresi otomatik olarak bir 7 gün daha uzar.",
        "İşlem kalıcı olarak engellenmiş sayılır.",
        "Yükümlü MASAK'tan tekrar izin almak zorundadır.",
      ],
      answer: 0,
      explanation: "7 iş günü içinde Bakanlık kararı tebliğ edilmezse yükümlünün işlemi gerçekleştirmeme yükümlülüğü kendiliğinden sona erer ve işlem yapılabilir.",
      trapNote: "Sürenin otomatik uzadığı ya da işlemin kalıcı olarak engellendiği yanılgısı yaygındır.",
    },
    {
      prompt: "İşlem ertelemesi hangi yollarla tetiklenebilir?",
      options: [
        "Yükümlünün erteleme talepli ŞİB'i, MASAK'ın re'sen incelemesi veya yabancı bir FIU'nun karşılıklılık esasına dayalı talebiyle.",
        "Sadece yükümlünün talebiyle.",
        "Sadece mahkeme kararıyla.",
        "Sadece MASAK'ın re'sen kararıyla, başka hiçbir yolla tetiklenemez.",
      ],
      answer: 0,
      explanation: "Erteleme; yükümlünün talebiyle, MASAK'ın re'sen incelemesiyle veya yabancı bir ülkenin muadil kuruluşunun (FIU) karşılıklılık esasına dayalı talebiyle tetiklenebilir.",
      trapNote: "Ertelemenin sadece tek bir yolla tetiklenebileceği sanılması eksik bir bilgidir.",
    },
    {
      prompt: "Bir ŞİB yapılması otomatik olarak işlem ertelemesi sonucunu doğurur mu?",
      options: [
        "Hayır; erteleme ayrı ve istisnai bir taleple/şartla başlatılan bir mekanizmadır.",
        "Evet, her ŞİB otomatik olarak erteleme doğurur.",
        "Evet, ancak sadece bankalar için geçerlidir.",
        "Hayır, ŞİB ile erteleme hiçbir zaman ilişkili değildir.",
      ],
      answer: 0,
      explanation: "Her ŞİB işlem ertelemesi anlamına gelmez; erteleme ayrı şartları olan istisnai bir müdahale mekanizmasıdır.",
      trapNote: "ŞİB ile erteleme arasında otomatik bir bağ kurulması sınavda sık görülen bir hatadır.",
    },
    {
      prompt: "Yüksek riskli bir hesaptan hızlı çıkış talimatı verildiğinde ve fonun derhal başka hesaplara dağılacağı öngörüldüğünde yükümlünün en doğru aksiyonu nedir?",
      options: [
        "Erteleme talepli ŞİB hazırlamak ve Bakanlık kararına kadar (en fazla 7 iş günü) işlemi gerçekleştirmemek; süre dolar da karar gelmezse işlemi yapmak.",
        "Hiçbir işlem yapmadan süresiz olarak hesabı bloke etmek.",
        "Müşteriye durumu açıklayıp işlemi ertelediğini söylemek.",
        "Sadece genel ŞİB göndermek, erteleme talep etmemek çünkü tutar önemli değildir.",
      ],
      answer: 0,
      explanation: "Yükümlü erteleme talepli ŞİB hazırlar, Bakanlık kararına kadar (en fazla 7 iş günü) işlemi gerçekleştirmez; süre dolar da karar gelmezse işlemi yapmak zorundadır.",
      trapNote: "Süresiz bloke uygulamak veya müşteriye açıklama yapmak, ertelemenin usul ve gizlilik kurallarını ihlal eder.",
      difficulty: "Sınav",
    },
  ],
  "fintek-riskleri": [
    {
      prompt: "EFT, FAST ve SWIFT arasındaki fark için hangisi doğrudur?",
      options: [
        "EFT mesai saatleri içinde çalışır, FAST 7/24 anlık çalışır (günlük limit 250.000 TL), SWIFT bir ödeme sistemi değil sadece mesajlaşma ağıdır.",
        "Üçü de aynı sistemin farklı isimleridir.",
        "SWIFT parayı doğrudan transfer eden tek sistemdir.",
        "FAST sadece mesai saatlerinde, EFT ise 7/24 çalışır.",
      ],
      answer: 0,
      explanation: "EFT bankalar arası TL transferini mesai saatleri içinde yapar; FAST 7/24 anlık çalışır ve günlük limiti 250.000 TL'dir; SWIFT bir ödeme sistemi değil uluslararası mesajlaşma ağıdır.",
      trapNote: "SWIFT'in parayı doğrudan transfer ettiği sanılır; oysa sadece talimatı ileten bir mesajlaşma ağıdır.",
    },
    {
      prompt: "Kripto varlık hizmet sağlayıcıları (KVHS) ve Seyahat Kuralı hakkında hangisi doğrudur?",
      options: [
        "2024'ten itibaren KVHS'ler finansal kuruluş sayılır, SPK izni gerekir; 15.000 TL ve üzeri kripto transferlerinde taraf bilgisi (Seyahat Kuralı) zorunludur.",
        "KVHS'ler finansal kuruluş sayılmaz, herhangi bir izin gerekmez.",
        "Seyahat Kuralı sadece 100.000 TL üzeri transferlerde uygulanır.",
        "KVHS'ler faiz verebilir ve kredi kullandırabilir.",
      ],
      answer: 0,
      explanation: "2024'ten itibaren kripto varlık hizmet sağlayıcıları (KVHS) finansal kuruluş statüsündedir, SPK'dan izin almak zorundadır; Seyahat Kuralı 15.000 TL ve üzerindeki kripto transferlerinde taraf bilgisi zorunlu kılar.",
      trapNote: "KVHS'lerin denetim dışı olduğu veya Seyahat Kuralı eşiğinin farklı bir tutar olduğu yanılgısı yaygındır.",
    },
  ],
  "uyum-yonetimi": [
    {
      prompt: "Uyum programının altı bileşeni aşağıdakilerden hangisinde eksiksiz sıralanmıştır?",
      options: [
        "Kurum politikası ve prosedürleri, risk yönetimi, izleme ve kontrol, uyum görevlisi ve uyum birimi, eğitim, iç denetim.",
        "Sadece kurum politikası ve iç denetim.",
        "Risk yönetimi, pazarlama, satış, eğitim.",
        "Uyum görevlisi, hukuk birimi, halkla ilişkiler, arşiv.",
      ],
      answer: 0,
      explanation: "Uyum programının altı bileşeni: kurum politikası ve prosedürleri, risk yönetimi, izleme ve kontrol, uyum görevlisi ve uyum birimi, eğitim, iç denetim.",
      trapNote: "Bileşenlerden birinin eksik veya yanlış (örn. pazarlama, hukuk birimi) eklenmesi klasik çeldiricidir.",
    },
    {
      prompt: "Yönetim Kurulu, uyum programı gözetim yetkisini bir üyeye devrederse ne olur?",
      options: [
        "Nihai sorumluluk yine Yönetim Kurulu'nun bütününde kalır.",
        "Sorumluluk tamamen yetki devredilen üyeye geçer, kurul sorumlu tutulamaz.",
        "Sorumluluk uyum görevlisine geçer.",
        "Yetki devri hukuken geçersizdir, hiçbir zaman devredilemez.",
      ],
      answer: 0,
      explanation: "Yönetim Kurulu, uyum programının etkinliğinden nihai olarak sorumludur; gözetim yetkisini bir üyeye devretse bile bu sorumluluk kurulun bütününde kalır.",
      trapNote: "Yetki devrinin sorumluluğu da devrettiği sanılır; oysa nihai sorumluluk kurulda kalır.",
    },
    {
      prompt: "MASAK'a şüpheli işlem bildiriminde bulunma yetkisi kimdedir?",
      options: [
        "Münhasıran uyum görevlisine aittir ve devredilemez.",
        "Yönetim Kurulu Başkanı'na aittir.",
        "Herhangi bir çalışan tarafından doğrudan kullanılabilir.",
        "İç denetim birimine aittir.",
      ],
      answer: 0,
      explanation: "MASAK'a şüpheli işlem bildiriminde bulunma yetkisi münhasıran uyum görevlisine aittir ve devredilemez.",
      trapNote: "Bu yetkinin yönetim kuruluna veya başka bir birime ait olduğu sanılması yanlıştır.",
    },
    {
      prompt: "Kurum politikası ne sıklıkla gözden geçirilmelidir?",
      options: [
        "En az 2 yılda bir",
        "En az 5 yılda bir",
        "Sadece denetimde talep edildiğinde",
        "Hiçbir periyodik gözden geçirme zorunluluğu yoktur",
      ],
      answer: 0,
      explanation: "Kurum politikası en az 2 yılda bir gözden geçirilir.",
      trapNote: "Gözden geçirme periyodunun lisans yenileme süresiyle (3 yıl) karıştırılmaması gerekir.",
    },
    {
      prompt: "Finansal grup içinde 'kontrol' kavramı için hangisi doğrudur?",
      options: [
        "%51 hisse şartı aranmaz; yönetim kurulu çoğunluğunu atama/görevden alma gücü yeterlidir.",
        "Kontrol için mutlaka %51 ve üzeri hisse sahipliği gerekir.",
        "Kontrol sadece doğrudan hisse sahipliğiyle mümkündür.",
        "Kontrol kavramı finansal grup tanımında kullanılmaz.",
      ],
      answer: 0,
      explanation: "Finansal grupta 'kontrol' için %51 hisse şartı aranmaz, yönetim kurulu çoğunluğunu atama/görevden alma gücü yeterlidir.",
      trapNote: "%51 hisse şartının arandığı varsayımı yanlıştır.",
    },
    {
      prompt: "Finansal grup içi bilgi paylaşımı ile ŞİB bilgisinin paylaşımı için hangisi doğrudur?",
      options: [
        "Grup içi bilgi paylaşımı serbesttir ama ŞİB yapıldığı bilgisi grup içinde dahi paylaşılamaz.",
        "Grup içinde her türlü bilgi, ŞİB bilgisi dahil serbestçe paylaşılabilir.",
        "Grup içi bilgi paylaşımı tamamen yasaktır.",
        "ŞİB bilgisi sadece yurt dışındaki grup şirketleriyle paylaşılabilir.",
      ],
      answer: 0,
      explanation: "Grup içi bilgi paylaşımı risk yönetimini desteklemek amacıyla serbesttir; ancak ŞİB yapıldığı bilgisi gizlilik/ihbar yasağı kapsamında grup içinde dahi ayrıca korunur, paylaşılamaz.",
      trapNote: "'Grup içiyse paylaşılabilir' varsayımı ŞİB gizliliği için geçerli değildir.",
    },
    {
      prompt: "Uyum görevlisi lisans sınavında başarılı sayılmak için hangi kural uygulanır?",
      options: [
        "Genel ortalama en az 65 olmalı ve her modülden en az 50 puan alınmalıdır.",
        "Sadece genel ortalamanın 50 olması yeterlidir, modül bazlı baraj yoktur.",
        "Her modülden en az 65 alınmalı, ortalama aranmaz.",
        "Sadece bir modülden geçmek yeterlidir.",
      ],
      answer: 0,
      explanation: "Lisans sınavında genel başarı notu en az 65, modüllü sınavlarda her modülden en az 50 puan şarttır.",
      trapNote: "Sadece ortalamaya bakıp modül barajını gözden kaçırmak yaygın bir hatadır.",
    },
    {
      prompt: "Uyum görevlisi lisansının yenileme ve iptal süreleri için hangisi doğrudur?",
      options: [
        "Her 3 yılda bir yenileme eğitimi gerekir; son sınav/yenileme eğitiminden itibaren 5 yıl geçerse lisans tamamen iptal olur.",
        "Lisans süresizdir, hiçbir yenileme gerekmez.",
        "Her yıl yeniden sınava girmek gerekir.",
        "1 yıl aksama halinde lisans iptal olur.",
      ],
      answer: 0,
      explanation: "Lisans MASAK sicilinde izlenir ve her 3 yılda bir yenileme eğitimi gerekir; son sınav veya yenileme eğitiminden itibaren 5 yıl geçerse lisans tamamen iptal olur.",
      trapNote: "Yenileme periyodu (3 yıl) ile tam iptal eşiği (5 yıl) karıştırılmamalıdır.",
    },
    {
      prompt: "Uyum görevlisi lisans sınavından muafiyet için hangisi doğrudur?",
      options: [
        "MASAK'ta idari düzeyde en az 4 yıl veya uzman/denetim elemanı olarak en az 12 yıl çalışanlar sınavdan muaftır.",
        "Sadece 20 yıl kamu deneyimi olanlar muaftır.",
        "Hiç kimse sınavdan muaf değildir.",
        "Sadece üniversite öğretim üyeleri muaftır.",
      ],
      answer: 0,
      explanation: "MASAK'ta idari düzeyde en az 4 yıl veya uzman/denetim elemanı olarak en az 12 yıl çalışanlar lisans sınavından muaftır.",
      trapNote: "4 yıl (idari) ile 12 yıl (uzman/denetim elemanı) eşikleri karıştırılır.",
    },
    {
      prompt: "MASAK'ta 5 yıl daire başkanlığı yapıp kurumdan ayrılan bir kişi için hangisi doğrudur?",
      options: [
        "Sınav muafiyetini korur, ancak kurumdan ayrıldığı için yenileme eğitimi muafiyetinden yararlanamaz.",
        "Hem sınav hem yenileme eğitimi muafiyetini süresiz olarak korur.",
        "Kurumdan ayrıldığı için hiçbir muafiyeti kalmaz.",
        "Sadece yenileme eğitimi muafiyetini korur, sınav muafiyeti geçersizdir.",
      ],
      answer: 0,
      explanation: "Sınav muafiyeti (4/12 yıl deneyim şartı sağlanmışsa) korunur; ancak yenileme eğitimi muafiyeti sadece MASAK'ta halen görevli olanlara tanınır, kurumdan ayrılanlara uygulanmaz.",
      trapNote: "Sınav muafiyeti ile yenileme eğitimi muafiyetinin farklı kapsamlara sahip olduğu unutulmamalıdır.",
      difficulty: "Sınav",
    },
    {
      prompt: "Münhasıran uyum görevlisi olarak atanan bir kişi için hangi kısıtlama uygulanır?",
      options: [
        "Yönetim kurulu üyeleri/genel müdürle 2. dereceye kadar kan veya kayın hısımlığı bulunamaz.",
        "Hiçbir akrabalık kısıtlaması yoktur.",
        "Sadece 1. derece akrabalık yasaktır, 2. derece serbesttir.",
        "Kısıtlama sadece genel müdürle ilgilidir, yönetim kurulu üyeleriyle ilgili değildir.",
      ],
      answer: 0,
      explanation: "Münhasıran uyum görevlisi atanan kişinin yönetim kurulu üyeleri/genel müdürle 2. dereceye kadar kan veya kayın hısımlığı bulunamaz.",
      trapNote: "Derece sınırının (2. dereceye kadar) tam olarak hatırlanması gerekir.",
    },
    {
      prompt: "Münhasıran uyum görevlisinin kurumdaki pay sahipliğiyle ilgili hangisi doğrudur?",
      options: [
        "Kurumda nitelikli pay (%10 ve üzeri) sahibi olamaz.",
        "Pay sahipliğine ilişkin hiçbir kısıtlama yoktur.",
        "Sadece %50 ve üzeri pay sahipliği yasaktır.",
        "Uyum görevlisi kurumun hakim ortağı olmak zorundadır.",
      ],
      answer: 0,
      explanation: "Münhasıran uyum görevlisi atanan kişi kurumda nitelikli pay (%10 ve üzeri) sahibi olamaz.",
      trapNote: "%10 eşiği unutulup 'hiç kısıtlama yok' sanılması hatalıdır.",
    },
    {
      prompt: "İzleme-kontrol ile iç denetim arasındaki fark için hangisi doğrudur?",
      options: [
        "İzleme-kontrol işlemler sürerken yapılan sıcak takiptir; iç denetim sistemin geriye dönük ve bağımsız test edilmesidir.",
        "İkisi aynı fonksiyonun farklı isimleridir.",
        "İç denetim işlem anında yapılır, izleme-kontrol geriye dönüktür.",
        "İzleme-kontrol sadece yılda bir kez yapılır.",
      ],
      answer: 0,
      explanation: "İzleme-kontrol (işlemler sürerken yapılan sıcak takip) ile iç denetim (sistemin geriye dönük ve bağımsız test edilmesi) farklı fonksiyonlardır.",
      trapNote: "İki fonksiyonun zamanlaması (anlık vs geriye dönük) karıştırılır.",
    },
    {
      prompt: "Personele verilen eğitimle ilgili hangisi doğrudur?",
      options: [
        "Yalnızca e-imza alınmış eğitim kaydının bulunması, eğitimin etkinliğinin kanıtı değildir.",
        "Eğitim kaydı tek başına eğitimin etkin olduğunu kanıtlar.",
        "Eğitim zorunlu değildir, sadece tavsiye niteliğindedir.",
        "Eğitim sadece uyum görevlisine verilir, diğer personele verilmez.",
      ],
      answer: 0,
      explanation: "Eğitim ve kurum politikası personelin şüpheyi fark etmesini sağlar; yalnız e-imza alınmış eğitim kaydı etkinlik kanıtı değildir, içeriğin ve anlaşılırlığın da gösterilmesi gerekir.",
      trapNote: "Kayıt tutmanın tek başına yeterli olduğu varsayımı yanlıştır.",
    },
    {
      prompt: "Uyum görevlisi lisansı zorunluluğunun hukuki dayanağı için hangisi doğrudur?",
      options: [
        "25 Aralık 2024 tarihli (RG 32763) Uyum Programları Yönetmeliği değişikliği ile getirilmiş, uygulama usulü 9 Eylül 2025 tarihli MASAK Genel Tebliği Sıra No: 30 (RG 33012) ile detaylandırılmıştır.",
        "Sadece 5549 sayılı Kanun'un ilk halinde düzenlenmiştir, hiç değişmemiştir.",
        "Lisans zorunluluğu bir yönetmelikle değil, doğrudan bir kanunla getirilmiştir.",
        "Lisans zorunluluğunun hiçbir resmi dayanağı yoktur, sadece SPL uygulamasıdır.",
      ],
      answer: 0,
      explanation: "Lisans zorunluluğunun hukuki dayanağı 25 Aralık 2024 tarihli (RG 32763) Uyum Programları Yönetmeliği değişikliği, uygulama usulü ise 9 Eylül 2025 tarihli MASAK Genel Tebliği Sıra No: 30 (RG 33012) ile detaylandırılmıştır.",
      trapNote: "Tarih ve tebliğ numarası (Sıra No: 30) sınavda doğrudan sorulabilir.",
    },
    {
      prompt: "Bir aday modül sınavlarından 48, 72 ve 70 puan alıyor. Bu adayın sınav sonucu için hangisi doğrudur?",
      options: [
        "Ortalaması 65'in altında kalmasa bile 48 puanla modül barajı olan 50'nin altında kaldığı için sınavı geçemez.",
        "Ortalama tek başına yeterlidir, adaya lisans verilir.",
        "Sadece en yüksek puan (72) dikkate alınır, aday başarılı sayılır.",
        "48 puan alınan modül otomatik olarak 50'ye yuvarlanır.",
      ],
      answer: 0,
      explanation: "Sınavda başarılı sayılmak için her bir modülden en az 50 puan alınması ve modüllerin aritmetik ortalamasının en az 65 olması gerekir; 48 puanla modül barajının altında kalındığından bu aday, ortalaması yeterli görünse bile başarısız sayılır.",
      trapNote: "Sadece ortalamaya bakıp modül barajının (50) altında kalan bir puanı gözden kaçırmak klasik bir tuzaktır.",
      difficulty: "Sınav",
    },
  ],
  "denetim-idari-ceza": [
    {
      prompt: "Yükümlülük denetiminde hangi ihlal türleri idari para cezası ile sonuçlanır?",
      options: [
        "Kimlik tespiti ve ŞİB yapmama ihlalleri",
        "ŞİB gizliliği (tipping-off) ihlali",
        "Bilgi-belge verme yükümlülüğü ihlali",
        "Muhafaza-ibraz yükümlülüğü ihlali",
      ],
      answer: 0,
      explanation: "Kimlik tespiti, ŞİB yapmama ve devamlı bilgi verme ihlalleri idari para cezası mantığında değerlendirilir; ŞİB gizliliği, bilgi-belge verme ve muhafaza-ibraz ihlalleri ise adli/cezai sonuç doğurur.",
      trapNote: "Adli sonuç doğuran ihlalleri idari zannetmek klasik bir hatadır.",
    },
    {
      prompt: "5549 sayılı Kanun md. 13/1 uyarınca temel maktu idari para cezaları için hangisi doğrudur?",
      options: [
        "Kimlik tespiti/devamlı bilgi verme ihlalinde 30.000 TL, ŞİB yapmama ihlalinde 50.000 TL (tutarlar her yıl yeniden değerleme oranında artırılır).",
        "Her iki ihlal türü için de aynı tutar (40.000 TL) uygulanır.",
        "Tutarlar sabittir, hiçbir zaman güncellenmez.",
        "Kimlik tespiti ihlalinde 50.000 TL, ŞİB yapmama ihlalinde 30.000 TL uygulanır.",
      ],
      answer: 0,
      explanation: "Md. 13/1 uyarınca kimlik tespiti/devamlı bilgi verme ihlalinde 30.000 TL, ŞİB yapmama ihlalinde 50.000 TL maktu idari para cezası uygulanır; bu tutarlar her takvim yılı başında yeniden değerleme oranında artırılır.",
      trapNote: "30.000 TL ve 50.000 TL rakamlarının hangi ihlale karşılık geldiği ters çevrilerek sorulur.",
    },
    {
      prompt: "Finansal kuruluşlarda (banka, ödeme kuruluşu, aracı kurum vb.) idari para cezası nasıl hesaplanır?",
      options: [
        "Sabit tutarın basitçe 2 katı değil; işlem tutarının yüzde beşinden az olmamak üzere iki kat oranında hesaplanır.",
        "Sabit tutarın (30.000/50.000 TL) tam olarak 2 katı uygulanır.",
        "İşlem tutarından bağımsız, sabit 100.000 TL uygulanır.",
        "Finansal kuruluşlar için ayrı bir hesaplama yoktur, diğer yükümlülerle aynıdır.",
      ],
      answer: 0,
      explanation: "Finansal kuruluşlar için ceza, işlem tutarının yüzde beşinden az olmamak üzere iki kat oranında hesaplanan ayrı bir mekanizmadır; sabit tutarın basit katı değildir.",
      trapNote: "'Sabit tutarın 2 katı' basitleştirmesi yanlıştır; hesaplama işlem tutarına bağlıdır.",
    },
    {
      prompt: "İdari para cezasının yıllık üst sınırı için hangisi doğrudur?",
      options: [
        "İki kat ceza uygulanan finansal kuruluşlar için 40.000.000 TL, diğer yükümlüler için 4.000.000 TL'dir.",
        "Tüm yükümlüler için tek bir tavan (10.000.000 TL) uygulanır.",
        "Yıllık tavan uygulanmaz, ceza sınırsız birikebilir.",
        "Finansal kuruluşlar için 4.000.000 TL, diğerleri için 40.000.000 TL'dir.",
      ],
      answer: 0,
      explanation: "Yıllık ceza üst sınırı iki kademelidir: iki kat ceza uygulanan finansal kuruluşlar için 40.000.000 TL, diğer yükümlüler için 4.000.000 TL'dir.",
      trapNote: "İki tavan rakamının hangi yükümlü grubuna ait olduğu ters çevrilerek sorulur.",
    },
    {
      prompt: "Yönetim kurulu üyesi veya sorumlu üst düzey yöneticiye uygulanabilecek ayrı idari para cezası oranı nedir?",
      options: [
        "Yükümlüye kesilen cezanın dörtte biri (1/4)",
        "Yükümlüye kesilen cezanın yarısı (1/2)",
        "Yükümlüye kesilen cezanın tamamı (1/1)",
        "Yöneticiye ayrıca ceza uygulanmaz.",
      ],
      answer: 0,
      explanation: "Yönetim kurulu üyesine veya sorumlu üst düzey yöneticiye, yükümlüye kesilen idari para cezasının dörtte biri (1/4) oranında ayrıca ceza uygulanabilir.",
      trapNote: "Oranın 1/4 olduğu, 1/2 ile karıştırılmamalıdır.",
    },
    {
      prompt: "Aşağıdaki ihlallerden hangisi idari değil, adli (hapis riski taşıyan) bir suçtur?",
      options: [
        "ŞİB gizliliğinin (tipping-off) ihlali",
        "Kimlik tespiti yapmama",
        "Devamlı bilgi verme yükümlülüğünün ihlali",
        "ŞİB yapmama",
      ],
      answer: 0,
      explanation: "ŞİB gizliliği (md. 4/2), bilgi-belge verme (md. 7) ve muhafaza-ibraz (md. 8) yükümlülüklerinin ihlali md. 14 uyarınca 1-3 yıl hapis ve 5.000 güne kadar adli para cezası gerektirebilen adli suçlardır; kimlik tespiti ve ŞİB yapmama ise idari para cezası kapsamındadır.",
      trapNote: "Adli suç oluşturan ihlallerin kapsamı sadece ŞİB gizliliğiyle sınırlı sanılır; bilgi-belge ve muhafaza-ibraz ihlalleri de dahildir.",
    },
    {
      prompt: "İkinci idari para cezasının tebliğinden sonra öngörülen süreç için hangisi doğrudur?",
      options: [
        "30 gün içinde eksiklikler giderilmezse faaliyetin durdurulması, kısıtlanması veya faaliyet izin belgesinin iptaline yönelik tedbirler gündeme gelebilir.",
        "Hiçbir ek tedbir uygulanmaz, süreç idari para cezasıyla sona erer.",
        "Yükümlünün faaliyeti otomatik ve süresiz olarak durdurulur.",
        "Sadece uyum görevlisi görevden alınır, yükümlü faaliyetine devam eder.",
      ],
      answer: 0,
      explanation: "İkinci idari para cezasının tebliğinden itibaren 30 gün içinde eksiklikler giderilmezse yükümlünün faaliyetinin durdurulması, kısıtlanması veya faaliyet izin belgesinin iptaline yönelik tedbirler gündeme gelebilir.",
      trapNote: "Sürecin idari para cezasıyla bittiği, ek tedbir öngörülmediği yanılgısı yanlıştır.",
    },
    {
      prompt: "Bir bankada kimlik tespiti yapılmadığı tespit ediliyor; ayrı bir olayda banka çalışanı ŞİB yapıldığını müşteriye söylüyor. Bu iki ihlal için hangisi doğrudur?",
      options: [
        "Kimlik tespiti ihlali idari para cezası (işlem tutarının en az %5'i, iki kat) gerektirirken; ŞİB'in müşteriye açıklanması adli bir suçtur ve 1-3 yıl hapis riski doğurur.",
        "İki ihlal de aynı şekilde sadece idari para cezasına tabidir.",
        "İki ihlal de sadece adli suç oluşturur, idari ceza uygulanmaz.",
        "Kimlik tespiti ihlali adli suçtur, ŞİB'in açıklanması ise sadece idari para cezası gerektirir.",
      ],
      answer: 0,
      explanation: "Banka finansal kuruluş olduğu için kimlik tespiti ihlalinde ceza işlem tutarının en az %5'i esas alınarak iki kat oranında hesaplanır (idari); ŞİB yapıldığının müşteriye söylenmesi ise idari değil adli bir suç olup 1-3 yıl hapis riskini doğurur.",
      trapNote: "İki ihlal türünün (idari/adli) birbirine karıştırılması sınavın klasik tuzağıdır.",
      difficulty: "Sınav",
    },
  ],
  "uzaktan-kimlik": [
    {
      prompt: "Uzaktan Kimlik Tespiti'nin (UKT) hukuki dayanağı ve kapsamı için hangisi doğrudur?",
      options: [
        "Hem sektörel mevzuatın (BDDK/SPK vb.) izni hem de MASAK'ın 19 No'lu Genel Tebliği'ndeki usul birlikte aranır; mevcut çerçeve sadece gerçek kişiler içindir.",
        "Sadece MASAK'ın izni yeterlidir, sektörel mevzuata gerek yoktur.",
        "UKT hem gerçek hem tüzel kişiler için aynı şekilde uygulanır.",
        "UKT'nin herhangi bir tebliğ dayanağı yoktur, sadece teamülle uygulanır.",
      ],
      answer: 0,
      explanation: "UKT için hem sektörel mevzuatın izni hem de MASAK 19 No'lu Genel Tebliği'ndeki düzenleme birlikte bulunmalıdır; mevcut çerçeve sadece gerçek kişiler içindir.",
      trapNote: "UKT'nin tüzel kişiler için de doğrudan uygulanabileceği yanılgısı yaygındır.",
    },
    {
      prompt: "Yeni nesil kimlik kartındaki çip NFC ile doğrulanamıyorsa hangi kural uygulanır?",
      options: [
        "Hologram, mikro yazı ve kinegram gibi en az dört farklı güvenlik öğesinin görüntülü görüşmede teyit edilmesi gerekir.",
        "Sadece sözlü beyan yeterlidir.",
        "Kimlik fotokopisi tek başına yeterlidir.",
        "Bu durumda UKT hiçbir şekilde yapılamaz.",
      ],
      answer: 0,
      explanation: "NFC mümkün değilse hologram, mikro yazı ve kinegram gibi en az dört farklı güvenlik öğesinin görüntülü görüşmede teyit edilmesi gerekir.",
      trapNote: "Sözlü beyan veya fotokopinin tek başına yeterli olduğu sanılması yanlıştır.",
    },
    {
      prompt: "UKT ile açılan hesapta ilk finansal hareket kuralı nedir?",
      options: [
        "İlk finansal hareketin, müşterinin daha önce yüz yüze kimlik tespiti yapılmış bir banka hesabından gelmesi şarttır.",
        "İlk finansal hareket herhangi bir hesaptan gelebilir, kısıtlama yoktur.",
        "İlk finansal hareket mutlaka nakit olarak yapılmalıdır.",
        "İlk finansal hareket sınırı yalnızca yabancı uyruklular için geçerlidir.",
      ],
      answer: 0,
      explanation: "UKT ile açılan hesapta ilk finansal hareketin, müşterinin daha önce yüz yüze kimlik tespiti yapılmış bir banka hesabından gelmesi şarttır.",
      trapNote: "Bu kural, yükümlülerin uzaktan açılan hesapları bilinmeyen kaynaklardan gelen ilk parayla 'temizlemesini' önler.",
    },
    {
      prompt: "İnsan müdahalesi olmadan yapay zekâ ile yürütülen UKT süreçlerinde hangisi doğrudur?",
      options: [
        "Yanlış kabul oranının on milyonda birden az olduğunu gösteren bir TSE raporu gerekir; yurt dışı menşeli ürünlerde uluslararası geçerli sertifika varsa TSE raporu aranmayabilir.",
        "Herhangi bir teknik rapor veya sertifika gerekmez.",
        "Yanlış kabul oranı sınırı yüzde birdir.",
        "TSE raporu her durumda zorunludur, uluslararası sertifika kabul edilmez.",
      ],
      answer: 0,
      explanation: "İnsan müdahalesi olmadan yapay zekâ kullanılıyorsa, yanlış kabul oranının on milyonda birden (1/10.000.000) az olduğunu gösteren bir TSE raporu gerekir; yurt dışı menşeli ürünlerde uluslararası geçerliliği olan bir sertifika varsa TSE raporu aranmayabilir.",
      trapNote: "Yanlış kabul oranı eşiği (on milyonda bir) ile sertifika istisnası birlikte hatırlanmalıdır.",
    },
    {
      prompt: "27 Haziran 2026 tarihli MASAK Genel Tebliği Sıra No: 32 ile ilgili hangisi doğrudur?",
      options: [
        "Yabancı uyruklu gerçek kişilerin ICAO 9303 standardına uygun, NFC özellikli pasaportla uzaktan kimlik tespiti yapabilmesine ilişkin yeni bir düzenleme (19 No'lu Tebliğ'de değişiklik) getirmiştir.",
        "Uzaktan kimlik tespitini tamamen yürürlükten kaldırmıştır.",
        "Sadece Türkiye Cumhuriyeti vatandaşlarını ilgilendiren bir düzenlemedir.",
        "Kripto varlık hizmet sağlayıcılarını UKT kapsamından tamamen çıkarmıştır.",
      ],
      answer: 0,
      explanation: "27 Haziran 2026 tarihli (RG 33293) MASAK Genel Tebliği Sıra No: 32, 19 No'lu Genel Tebliğ'de değişiklik yaparak yabancı uyruklu gerçek kişilerin ICAO 9303 standardına uygun NFC özellikli pasaportla uzaktan kimlik tespiti yapabilmesini düzenlemiştir; KVHS'ler de bu kapsamda yükümlüler arasında sayılmıştır.",
      trapNote: "Bu çok güncel bir düzenleme olduğu için sınavda doğrudan tarih/tebliğ numarasıyla sorulabilir.",
    },
  ],
  "diger-yukumlulukler": [
    {
      prompt: "Yetkili makamdan gelen bilgi ve belge taleplerine karşı özel kanunlardaki (örn. bankacılık sırrı) gizlilik hükümleri hakkında hangisi doğrudur?",
      options: [
        "Genellikle bilgi-belge vermekten kaçınma gerekçesi yapılamaz.",
        "Her zaman mutlak bir kaçınma gerekçesidir, bilgi verilemez.",
        "Sadece mahkeme kararı varsa uygulanmaz.",
        "Sadece yabancı bankalar için geçerlidir.",
      ],
      answer: 0,
      explanation: "Yetkili makamdan gelen bilgi ve belge taleplerinde özel kanunlardaki (bankacılık sırrı vb.) gizlilik hükümleri genellikle kaçınma gerekçesi yapılamaz.",
      trapNote: "Bankacılık sırrının MASAK talebine karşı mutlak bir engel olduğu sanılması yanlıştır.",
    },
    {
      prompt: "5549 sayılı Kanun md. 8 uyarınca muhafaza süresi ne kadardır?",
      options: ["8 yıl", "5 yıl", "10 yıl", "Süresiz"],
      answer: 0,
      explanation: "Muhafaza süresi 5549 sayılı Kanun md. 8 uyarınca 8 yıldır.",
      trapNote: "Muhafaza süresi genel ticari defter saklama süreleriyle (örn. 10 yıl) karıştırılmamalıdır.",
    },
    {
      prompt: "Bilgi-belge verme ve muhafaza-ibraz yükümlülüklerine uyulmaması hangi sonucu doğurabilir?",
      options: [
        "Sadece idari değil, md. 14 uyarınca 1-3 yıl hapis ve 5.000 güne kadar adli para cezası riski taşıyan adli bir suçtur.",
        "Sadece uyarı yazısı gönderilir, başka bir yaptırım yoktur.",
        "Sadece 5.000 TL sabit idari para cezası uygulanır.",
        "Hiçbir yaptırımı yoktur, tavsiye niteliğindedir.",
      ],
      answer: 0,
      explanation: "Bilgi-belge verme (md. 7) ve muhafaza-ibraz (md. 8) yükümlülüklerinin ihlali idari değil, md. 14 uyarınca 1-3 yıl hapis ve 5.000 güne kadar adli para cezası riski taşıyan adli bir suçtur.",
      trapNote: "Bu ihlallerin sadece teknik/idari bir aksaklık olduğu sanılması ciddi bir yanılgıdır.",
    },
    {
      prompt: "Muhafaza süresinin başlangıç tarihi için hangisi doğrudur?",
      options: [
        "Kimlik tespiti belgelerinde iş ilişkisinin sona erdiği tarih; işlem belgelerinde ise işlemin/son kaydın yapıldığı tarihtir.",
        "Tüm belge türlerinde hesabın açıldığı tarihtir.",
        "Tüm belge türlerinde MASAK'ın talep tarihidir.",
        "Tüm belge türlerinde aynı tarihten, müşteri kaydının oluşturulduğu andan başlar.",
      ],
      answer: 0,
      explanation: "Kimlik tespiti belgelerinin muhafaza başlangıcı iş ilişkisinin SONA ERDİĞİ tarihtir; işlem belge ve kayıtlarının başlangıcı ise işlemin/son kaydın yapıldığı tarihtir.",
      trapNote: "Tüm belge türlerinin aynı tarihten başladığı sanılması yaygın bir hatadır.",
    },
    {
      prompt: "Elektronik tebligat ne zaman yapılmış sayılır?",
      options: [
        "Belge, muhatabın elektronik adresine ulaştığı anda tebliğ edilmiş sayılır; genel idari usuldeki '5 gün sonra tebliğ' kuralı burada uygulanmaz.",
        "Gönderimden 5 gün sonra tebliğ edilmiş sayılır.",
        "Muhatap belgeyi açıp okuduğunda tebliğ edilmiş sayılır, ulaşma yeterli değildir.",
        "Elektronik tebligat hiçbir zaman hukuki sonuç doğurmaz.",
      ],
      answer: 0,
      explanation: "Elektronik tebligatta belge, muhatabın elektronik adresine ulaştığı anda tebliğ edilmiş sayılır; genel idari usuldeki '5 gün sonra tebliğ edilmiş sayılır' kuralı burada uygulanmaz.",
      trapNote: "Genel idari usuldeki 5 günlük kuralın elektronik tebligata da uygulandığı sanılması yanlıştır.",
    },
    {
      prompt: "Devamlı bilgi verme yükümlülüğünde parasal eşik için hangisi doğrudur?",
      options: [
        "Şu an için aktif/belirlenmiş bir parasal eşik yoktur.",
        "Eşik sabit olarak 50.000 TL'dir.",
        "Eşik sabit olarak 100.000 TL'dir.",
        "Eşik her yıl otomatik olarak yeniden değerleme oranında belirlenir.",
      ],
      answer: 0,
      explanation: "Devamlı bilgi verme yükümlülüğünde parasal bir eşik şu an için aktif/belirlenmiş değildir.",
      trapNote: "ŞİB'in aksine devamlı bilgi vermede sabit bir tutar eşiği bulunduğu varsayılmamalıdır.",
    },
    {
      prompt: "Bir hesap kapatıldıktan sonra, kimlik tespiti belgelerinin saklama süresi hangi tarihten itibaren işlemeye başlar?",
      options: [
        "Hesabın kapandığı, yani iş ilişkisinin sona erdiği tarihten itibaren.",
        "Hesabın ilk açıldığı tarihten itibaren.",
        "Müşterinin doğum tarihinden itibaren.",
        "MASAK'ın denetim yaptığı tarihten itibaren.",
      ],
      answer: 0,
      explanation: "Kimlik tespiti belgelerinin saklama süresi hesabın kapandığı (iş ilişkisinin sona erdiği) tarihten itibaren başlar; aynı müşteriye ait işlem kayıtlarının saklama süresi ise ilgili işlemin yapıldığı tarihten itibaren ayrıca işler.",
      trapNote: "Hesabın açılış tarihinin esas alındığı sanılması yaygın bir hatadır.",
      difficulty: "Sınav",
    },
  ],
  "musterinin-taninmasi": [
    {
      prompt: "Gerçek kişilerde kimlik tespitinde hangi bilgilerin güvenilir bir belgeyle teyit edilmesi zorunludur?",
      options: [
        "Ad-soyad, doğum tarihi, T.C. kimlik numarası ve kimlik belgesinin tür/numarası.",
        "Sadece ad-soyad.",
        "Meslek ve gelir düzeyi.",
        "Sadece iletişim bilgileri (telefon, e-posta).",
      ],
      answer: 0,
      explanation: "Gerçek kişilerde ad-soyad, doğum tarihi, T.C. kimlik numarası ve kimlik belgesinin tür/numarası mutlaka güvenilir bir belgeyle teyit edilir; meslek ve iletişim bilgisi alınır ama teyidi zorunlu değildir.",
      trapNote: "Meslek bilgisinin de teyide tabi olduğu sanılması yaygın bir hatadır.",
    },
    {
      prompt: "Müşterinin adres bilgisinin teyidi hangi durumda zorunludur?",
      options: [
        "Sadece sürekli iş ilişkisi tesis edilirken.",
        "Her tek seferlik işlemde.",
        "Hiçbir zaman zorunlu değildir.",
        "Sadece yabancı uyruklu müşterilerde.",
      ],
      answer: 0,
      explanation: "Adres teyidi sadece sürekli iş ilişkisi tesisinde zorunludur (yerleşim yeri belgesi, son 3 aya ait fatura vb.).",
      trapNote: "Tek seferlik işlemlerde de adres teyidinin zorunlu olduğu sanılması hatalıdır.",
    },
    {
      prompt: "Tüzel kişilerde kimlik/adres bilgisinin teyit kaynağı için hangisi doğrudur?",
      options: [
        "MERSİS veya Ticaret Sicili Gazetesi",
        "Sadece şirketin kendi beyanı",
        "Sosyal medya hesapları",
        "Sadece vergi levhası",
      ],
      answer: 0,
      explanation: "Tüzel kişilerde teyit kaynağı MERSİS veya Ticaret Sicili Gazetesi'dir.",
      trapNote: "Sadece şirket beyanının yeterli olduğu varsayımı doğrulama yükümlülüğünü karşılamaz.",
    },
    {
      prompt: "Gerçek faydalanıcı tespitinde ilk aranan kriter nedir?",
      options: [
        "Tüzel yapının %25'ini aşan hisseye sahip gerçek kişi ortağın bulunup bulunmadığı.",
        "Şirketin en yaşlı ortağının kim olduğu.",
        "Şirketin kayıtlı sermayesinin miktarı.",
        "Şirketin faaliyet konusu.",
      ],
      answer: 0,
      explanation: "Gerçek faydalanıcı üç aşamalı aranır: önce %25'i aşan hisseye sahip gerçek kişi ortak aranır.",
      trapNote: "Gerçek faydalanıcı tespitinin hisse oranıyla değil yaş veya sermaye büyüklüğüyle ilgili olduğu sanılması yanlıştır.",
    },
    {
      prompt: "%25'i aşan hisseye sahip bir gerçek kişi ortak bulunamazsa gerçek faydalanıcı tespiti nasıl devam eder?",
      options: [
        "Oy hakkı veya yönetim kurulu atama gücüyle nihai kontrolü elinde tutan gerçek kişi aranır.",
        "Süreç sona erer, gerçek faydalanıcı yok kabul edilir.",
        "Doğrudan en büyük hissedar tüzel kişi gerçek faydalanıcı sayılır.",
        "Şirketin kurucusu otomatik olarak gerçek faydalanıcı kabul edilir.",
      ],
      answer: 0,
      explanation: "%25'i aşan hisseye sahip gerçek kişi ortak bulunamazsa, oy hakkı veya yönetim kurulu atama/görevden alma gücüyle nihai kontrolü elinde tutan gerçek kişi aranır.",
      trapNote: "Sürecin ilk aşamada bulunamayınca sona erdiği sanılması yanlıştır; ikinci aşamaya geçilir.",
    },
    {
      prompt: "Bir şirkette %25'i aşan hisseye sahip gerçek kişi ortak bulunamıyor ve nihai kontrol sahibi bir gerçek kişiye de ulaşılamıyorsa, gerçek faydalanıcı olarak kim kabul edilir?",
      options: [
        "Ticaret sicilinde kayıtlı en üst düzey icra yetkilisi (örn. genel müdür).",
        "Şirketin en büyük müşterisi.",
        "Şirketin denetçisi.",
        "Hiç kimse; şirketin gerçek faydalanıcısı olmadığı kabul edilir.",
      ],
      answer: 0,
      explanation: "%25'i aşan hisseye sahip gerçek kişi ortak bulunamaz ve nihai kontrol sahibi bir gerçek kişiye de ulaşılamazsa, ticaret sicilinde kayıtlı en üst düzey icra yetkilisi (genel müdür) gerçek faydalanıcı olarak kabul edilir.",
      trapNote: "Üçüncü aşamanın (en üst icra yetkilisi) atlanması sınavın klasik tuzağıdır.",
      difficulty: "Sınav",
    },
    {
      prompt: "Yabancı kamusal nüfuz sahibi kişilerin (yabancı PEP) risk statüsü için hangisi doğrudur?",
      options: [
        "Her zaman yüksek riskli kabul edilirler.",
        "Risk statüleri yükümlünün inisiyatifine bırakılmıştır, otomatik yüksek risk değildir.",
        "Sadece görevdeyken risk taşırlar, göreve gelmeden önce risksizdirler.",
        "PEP kavramı sadece yerli kişiler için geçerlidir.",
      ],
      answer: 0,
      explanation: "Yabancı kamusal nüfuz sahibi kişiler (PEP) her zaman yüksek riskli kabul edilir.",
      trapNote: "Yabancı PEP riskinin yükümlünün takdirine bırakıldığı sanılması yanlıştır; bu otomatik bir sınıflandırmadır.",
    },
    {
      prompt: "Yerli PEP ve uluslararası kuruluş görevlileri için risk değerlendirmesi nasıl yapılır?",
      options: [
        "Yükümlünün kendi risk değerlendirmesine göre sıkılaştırılmış tedbire tabi tutulabilirler.",
        "Yabancı PEP ile aynı şekilde otomatik olarak her zaman yüksek risk kabul edilirler.",
        "Hiçbir özel tedbire tabi değildirler.",
        "Sadece basitleştirilmiş tedbir uygulanabilir.",
      ],
      answer: 0,
      explanation: "Yerli PEP ve uluslararası kuruluş görevlileri, yabancı PEP'in aksine, yükümlünün kendi risk değerlendirmesine göre sıkılaştırılmış tedbire tabi tutulur.",
      trapNote: "Yerli PEP'in de yabancı PEP gibi otomatik yüksek risk sayıldığı sanılması hatalıdır.",
    },
    {
      prompt: "Bir kişi PEP sıfatını (görevini) kaybettiğinde risk durumu ne olur?",
      options: [
        "Risk hemen bitmez; MASAK Genel Tebliği Sıra No: 21 uyarınca sıkılaştırılmış tedbirler en az 1 yıl süreyle sürdürülür.",
        "Risk anında ve otomatik olarak sona erer.",
        "Kişi artık hiçbir şekilde izlenmez.",
        "Sadece 3 ay süreyle izlemeye devam edilir.",
      ],
      answer: 0,
      explanation: "PEP görevden ayrılsa veya bu sıfatını kaybetse dahi risk hemen bitmez; MASAK Genel Tebliği Sıra No: 21 uyarınca sıkılaştırılmış tedbirler en az 1 yıl süreyle sürdürülür.",
      trapNote: "Görevin bitmesiyle riskin de anında bittiği varsayımı yanlıştır.",
    },
    {
      prompt: "PEP sıfatının kaybedilmesinden sonraki 1 yıllık sıkılaştırılmış tedbir süresi için hangisi doğrudur?",
      options: [
        "İşlem veya iş ilişkisi risk taşımaya devam ediyorsa bu süre uzatılabilir.",
        "Süre hiçbir koşulda uzatılamaz, kesin 1 yıldır.",
        "Süre otomatik olarak 5 yıla çıkar.",
        "Süre sadece yabancı PEP için değil, tüm müşteriler için standarttır.",
      ],
      answer: 0,
      explanation: "1 yıllık süre asgari bir süredir; işlem veya iş ilişkisi risk taşımaya devam ediyorsa bu süre uzatılabilir.",
      trapNote: "1 yılın kesin ve uzatılamaz bir üst sınır olduğu sanılması yanlıştır; bu asgari süredir.",
    },
    {
      prompt: "Basitleştirilmiş tedbir kavramı için hangisi doğrudur?",
      options: [
        "Bir muafiyet değil kolaylıktır; en ufak aklama/TF şüphesi doğduğu an derhal sona erer.",
        "Müşterinin kimlik tespitinden tamamen muaf tutulması anlamına gelir.",
        "Sadece yüksek riskli müşterilere uygulanır.",
        "Bir kez uygulandıktan sonra ilişkinin sonuna kadar değiştirilemez.",
      ],
      answer: 0,
      explanation: "Basitleştirilmiş tedbir bir muafiyet değil kolaylıktır; en ufak aklama/TF şüphesi doğduğu an derhal sona erer ve standart/sıkılaştırılmış tedbir devreye girer.",
      trapNote: "Basitleştirilmiş tedbirin kalıcı bir muafiyet olduğu sanılması yanlıştır.",
    },
    {
      prompt: "Basitleştirilmiş tedbir uygulanan bir müşteride şüphe doğarsa ne olur?",
      options: [
        "Basitleştirilmiş tedbir derhal sona erer, standart veya sıkılaştırılmış tedbir ile ŞİB değerlendirmesi başlar.",
        "Hiçbir şey değişmez, basitleştirilmiş tedbir aynen devam eder.",
        "Sadece hesap süresiz olarak kapatılır, başka aksiyon alınmaz.",
        "Şüphe basitleştirilmiş tedbir kapsamında göz ardı edilir.",
      ],
      answer: 0,
      explanation: "Basitleştirilmiş tedbir, en ufak aklama/TF şüphesi doğduğu an derhal sona erer ve standart/sıkılaştırılmış tedbir ile ŞİB değerlendirmesi başlar.",
      trapNote: "Basitleştirilmiş tedbirin şüpheye rağmen devam edeceği sanılması ciddi bir hatadır.",
    },
    {
      prompt: "Sıkılaştırılmış tedbir kapsamında hangi unsurlar bir arada aranır?",
      options: [
        "Üst düzey yönetici onayı, servet kaynağının araştırılması ve yoğun izleme.",
        "Sadece ek bir imzanın alınması.",
        "Sadece müşteriden yazılı beyan alınması.",
        "Sadece işlem limitinin düşürülmesi.",
      ],
      answer: 0,
      explanation: "Sıkılaştırılmış tedbirde üst düzey yönetici onayı, servet kaynağının araştırılması ve yoğun izleme şarttır.",
      trapNote: "Sıkılaştırılmış tedbirin tek bir unsurdan (örn. sadece imza) ibaret olduğu sanılması eksik bir bilgidir.",
    },
    {
      prompt: "Kripto varlık hizmet sağlayıcıları (KVHS) ile kurulan ilişkilerin risk statüsü için hangisi doğrudur?",
      options: [
        "Yapısal olarak yüksek riskli kabul edilir.",
        "Otomatik olarak düşük risk kabul edilir.",
        "Risk değerlendirmesi dışında tutulur.",
        "Sadece yurt dışı KVHS'ler yüksek risklidir, yerli olanlar değildir.",
      ],
      answer: 0,
      explanation: "KVHS ile kurulan ilişkiler de yapısal olarak yüksek riskli kabul edilir.",
      trapNote: "KVHS ilişkilerinin risk değerlendirmesi dışında tutulduğu sanılması yanlıştır.",
    },
    {
      prompt: "Müşterinin tanınması (KYC) süreci için hangisi doğrudur?",
      options: [
        "Sadece ilk hesap açılışında yapılan bir işlem değildir; ilişki boyunca sürekli izleme ve güncelleme gerektirir.",
        "Sadece hesap açılışında yapılır, sonrasında tekrar gözden geçirilmez.",
        "KYC sadece yüksek riskli müşteriler için sürekli izlenir.",
        "KYC yalnızca yıllık bir kez güncellenir, ara dönemde izleme yapılmaz.",
      ],
      answer: 0,
      explanation: "KYC yalnızca ilk açılışta kimlik almak değildir; ilişki boyunca güncelleme ve izleme gerektirir.",
      trapNote: "KYC'nin tek seferlik bir işlem olduğu sanılması temel bir yanılgıdır.",
    },
    {
      prompt: "Uzun süredir hareketsiz duran, ev hanımı olarak kayıtlı bir müşterinin hesabına aniden büyük tutarlı bir para girişi olması durumunda en doğru yaklaşım nedir?",
      options: [
        "Müşteri profilinin risk değişikliğine göre yeniden teyit edilmesi ve gerekirse ŞİB değerlendirmesi yapılması.",
        "Hesap profili değişmediği için hiçbir aksiyon alınmaz.",
        "Doğrudan hesap kapatılır, başka inceleme yapılmaz.",
        "Müşteriden sadece sözlü açıklama alınıp işlem onaylanır.",
      ],
      answer: 0,
      explanation: "Sürekli izleme gereği müşteri profili düzenli güncellenmeli ve risk değişince (ör. ev hanımı bir hesaba aniden büyük tutar gelmesi) yeniden teyit ve gerekirse ŞİB değerlendirmesi yapılmalıdır.",
      trapNote: "Profil dışı bir hareketin görmezden gelinmesi ciddi bir uyum açığıdır.",
    },
    {
      prompt: "Gerçek faydalanıcı ile işlemi fiilen yapan temsilci arasındaki fark için hangisi doğrudur?",
      options: [
        "Gerçek faydalanıcı nihai kontrol/menfaat sahibidir; işlemi fiilen yapan temsilciyle karıştırılmamalıdır.",
        "İkisi her zaman aynı kişidir.",
        "Temsilci her zaman gerçek faydalanıcıdan daha yüksek risk taşır.",
        "Gerçek faydalanıcı kavramı sadece temsilcisi olmayan işlemlerde kullanılır.",
      ],
      answer: 0,
      explanation: "Gerçek faydalanıcı, işlemi fiilen yapan temsilciyle karıştırılmamalıdır; gerçek faydalanıcı nihai kontrol/menfaat sahibidir.",
      trapNote: "Temsilci ile gerçek faydalanıcının aynı kişi olduğu varsayılmamalıdır.",
    },
    {
      prompt: "Şüpheli olduğu için reddedilen bir işlemle ilgili hangisi doğrudur?",
      options: [
        "İşlemin reddedilmesi, durumun ŞİB olarak bildirilip bildirilmeyeceğinin ayrıca değerlendirilmesi gerekliliğini ortadan kaldırmaz.",
        "İşlem reddedildiği için ayrıca bir bildirim yapılmasına gerek yoktur.",
        "Ret kararı otomatik olarak ŞİB yerine geçer.",
        "Reddedilen işlemler MASAK'ı hiçbir şekilde ilgilendirmez.",
      ],
      answer: 0,
      explanation: "İşlem reddedilse bile durumun ŞİB olarak bildirilip bildirilmeyeceği ayrıca değerlendirilmelidir; ret otomatik olarak bildirim gerekliliğini ortadan kaldırmaz.",
      trapNote: "'Reddettim, sorun kalmadı' düşüncesi ŞİB değerlendirmesini atlamaya yol açan yaygın bir hatadır.",
    },
    {
      prompt: "Basitleştirilmiş tedbir uygulanan bir müşteri için kimlik tespiti açısından hangisi doğrudur?",
      options: [
        "Kimlik tespitinden tam muafiyet anlamına gelmez; sadece teyit/adres tespiti gibi süreçlerde kolaylık sağlar.",
        "Müşterinin hiçbir kimlik belgesi istenmeden hesap açılabilir.",
        "Kimlik tespiti tamamen MASAK'ın takdirine bırakılır.",
        "Basitleştirilmiş tedbirde kimlik tespiti kavramı hiç uygulanmaz.",
      ],
      answer: 0,
      explanation: "Basitleştirilmiş tedbir, kimlik tespitinden tam muafiyet anlamına gelmez; sadece teyit/adres tespiti gibi süreçlerde kolaylık sağlar.",
      trapNote: "Basitleştirilmiş tedbirin kimlik tespitini tamamen ortadan kaldırdığı sanılması yanlıştır.",
    },
    {
      prompt: "'Başkası hesabına/adına hareket edildiği' müşteri tarafından beyan edilmese bile hangi durumda araştırma yapılmalıdır?",
      options: [
        "İşlemden şüpheleniliyorsa, yükümlü doğrudan gerçek faydalanıcıyı/hesap sahibini bulmaya yönelik araştırma yapmalıdır.",
        "Hiçbir zaman araştırma yapılmaz, sadece beyana güvenilir.",
        "Sadece müşteri kendisi bunu itiraf ederse araştırma yapılır.",
        "Araştırma yalnızca MASAK'ın doğrudan talimatıyla başlatılabilir.",
      ],
      answer: 0,
      explanation: "'Başkası hesabına hareket edildiği' beyan edilmese bile işlemden şüpheleniliyorsa yükümlü doğrudan gerçek faydalanıcıyı bulmaya yönelik araştırma yapmalıdır.",
      trapNote: "Sadece beyana güvenip araştırma yapmamak önemli bir uyum açığıdır.",
    },
    {
      prompt: "Bir kuyumcuda, müşterinin mesleği ve gelir düzeyiyle uyumsuz, zincirleme ve küçük tutarlı altın alım satımları tespit ediliyor ve ekonomik gerekçesi açıklanamıyor. En doğru değerlendirme hangisidir?",
      options: [
        "İşlemlerin tutarı küçük olsa da profil uyumsuzluğu ve ekonomik gerekçe eksikliği izleme biriminin dikkatini çekmeli, gerekirse ŞİB değerlendirmesi yapılmalıdır.",
        "Tutar küçük olduğu için herhangi bir işlem yapılmasına gerek yoktur.",
        "Sadece toplam yıllık tutar 1.000.000 TL'yi geçerse incelenir.",
        "Kuyumcular ŞİB yükümlüsü olmadığı için bu değerlendirme gereksizdir.",
      ],
      answer: 0,
      explanation: "Müşterinin profiliyle uyumsuz, ekonomik gerekçesi olmayan zincirleme küçük işlemler tutarı ne olursa olsun izleme biriminin dikkatini çekmelidir.",
      trapNote: "'Küçük tutar önemsizdir' varsayımı KYC'nin risk temelli mantığına aykırıdır.",
      difficulty: "Sınav",
    },
    {
      prompt: "Müşterinin mesleği hakkında hangisi doğrudur?",
      options: [
        "Meslek bilgisi alınır ancak güvenilir bir belgeyle teyidi zorunlu değildir.",
        "Meslek bilgisi hiçbir zaman sorulmaz.",
        "Meslek bilgisinin teyidi TCKN teyidiyle aynı derecede zorunludur.",
        "Meslek bilgisi sadece tüzel kişi müşterilerde alınır.",
      ],
      answer: 0,
      explanation: "Meslek ve iletişim bilgisi alınır ama teyidi zorunlu değildir; buna karşın ad-soyad, doğum tarihi, TCKN ve kimlik belge tür/numarası mutlaka teyit edilir.",
      trapNote: "Meslek bilgisinin de zorunlu teyit kapsamında olduğu sanılması yaygın bir hatadır.",
    },
    {
      prompt: "Sürekli izleme kapsamında hangi karşılaştırma yapılır?",
      options: [
        "Müşterinin profili, gelir düzeyi ve beklenen işlem hacmi ile fiili işlem davranışı karşılaştırılır.",
        "Sadece müşterinin yaşı kontrol edilir.",
        "Sadece müşterinin ilk açılış tarihindeki bakiyesi izlenir.",
        "Sürekli izleme sadece yılda bir kez, hesap kapanışında yapılır.",
      ],
      answer: 0,
      explanation: "Sürekli izleme müşteri kabulünden sonra başlar: profil, gelir, fon kaynağı, beklenen hacim ve fiili işlem davranışı karşılaştırılır.",
      trapNote: "Sürekli izlemenin yıllık tek seferlik bir kontrole indirgenmesi yanlıştır.",
    },
    {
      prompt: "Yabancı bir PEP, bir şirket üzerinden hesap açtırmak istiyor; şirkette %25'i aşan hisseye sahip gerçek kişi ortak yok, nihai kontrol sahibi de belirlenemiyor. Yükümlünün izlemesi gereken en doğru sıra nedir?",
      options: [
        "Yabancı PEP olduğu için otomatik yüksek risk kabul edilir ve sıkılaştırılmış tedbir uygulanır; gerçek faydalanıcı olarak da ticaret sicilindeki en üst düzey icra yetkilisi belirlenir.",
        "PEP statüsü göz ardı edilir, sadece gerçek faydalanıcı aranır.",
        "Gerçek faydalanıcı bulunamadığı için hesap hiçbir şekilde açılamaz.",
        "Yabancı PEP riski sadece kişisel hesaplar için geçerlidir, şirket hesaplarında dikkate alınmaz.",
      ],
      answer: 0,
      explanation: "Yabancı PEP her zaman yüksek risklidir ve sıkılaştırılmış tedbire tabi tutulur; ayrıca %25 hisse sahibi ve nihai kontrol sahibi bulunamadığından gerçek faydalanıcı olarak ticaret sicilindeki en üst düzey icra yetkilisi kabul edilir. İki kural birlikte uygulanır.",
      trapNote: "PEP riski ile gerçek faydalanıcı tespitinin birbirinden bağımsız iki ayrı kontrol olduğu ve birlikte uygulanması gerektiği unutulmamalıdır.",
      difficulty: "Sınav",
    },
  ],
};

export const questions: Question[] = lessons.flatMap((lesson) => {
  const authored = authoredQuestionsByLessonId[lesson.id] ?? [];
  return authored.map((item, index) => {
    const fallbackDifficulty: Difficulty = index % 5 === 0 ? "Sınav" : index % 2 === 0 ? "Orta" : "Temel";
    return {
      id: `${lesson.id}-${String(index + 1).padStart(2, "0")}`,
      moduleId: lesson.moduleId,
      topicId: lesson.id,
      difficulty: item.difficulty ?? fallbackDifficulty,
      prompt: item.prompt,
      options: item.options,
      answer: item.answer,
      explanation: item.explanation,
      trapNote: item.trapNote,
      sourceRef: lesson.sourceRef,
    } satisfies Question;
  });
});

// ---- Hafıza modülü yardımcı fonksiyonları ----

export function getMnemonicsForLesson(lessonId: string): MnemonicCard[] {
  return mnemonics.filter((card) => card.lessonId === lessonId);
}

export function getMemoryPalace(moduleId: ModuleId): MemoryPalace | undefined {
  return memoryPalaces.find((palace) => palace.moduleId === moduleId);
}

export function getRecallDrillsForLesson(lessonId: string): RecallDrill[] {
  return recallDrills.filter((drill) => drill.lessonId === lessonId);
}

export type SrsDeckCard = {
  id: string;
  lessonId: string;
  front: string;
  back: string;
  kind: "glossary" | "mnemonic";
};

export function buildSrsDeck(): SrsDeckCard[] {
  const glossaryCards: SrsDeckCard[] = lessons.flatMap((lesson) => {
    const content = lessonContentById[lesson.id];
    return content.glossary.map((card, index) => ({
      id: `srs-glossary-${lesson.id}-${index}`,
      lessonId: lesson.id,
      front: card.term,
      back: card.detail,
      kind: "glossary" as const,
    }));
  });

  const mnemonicCards: SrsDeckCard[] = mnemonics.map((card) => ({
    id: `srs-mnemonic-${card.id}`,
    lessonId: card.lessonId,
    front: card.hook,
    back: `${card.expansion} — ${card.targetFact}`,
    kind: "mnemonic" as const,
  }));

  return [...glossaryCards, ...mnemonicCards];
}
