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
      "MASAK 1996'da kuruldu, 2006'da görev alanı genişledi ve bugün 1 sayılı Cumhurbaşkanlığı Kararnamesi ile Hazine ve Maliye Bakanlığına bağlı, doğrudan Bakana bağlı bir ana hizmet birimidir; tüzel kişiliği yoktur. MASAK bir Mali İstihbarat Birimi (FIU) olarak bildirim toplar, analiz eder ve sonucu ilgili makamlarla paylaşır; arama, el koyma veya gözaltı yapamaz, doğrudan soruşturma yürütmez. Soruşturma yetkisi yalnızca Cumhuriyet savcılarındadır, MASAK savcıya suç duyurusu ileten uzman bir analiz birimidir.",
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
      "Dünyada dört mali istihbarat birimi (MİB/FIU) modeli vardır: İdari Tip (MASAK'ın da içinde olduğu, finansal sektör ile kolluk arasında tampon görevi gören model), Kolluk Tipi (polis/jandarma bünyesinde), Adli/Savcılık Tipi (yargı bünyesinde, hızlı dondurma/el koyma yapabilir) ve Karma/Hibrit Tip. FATF 1989'da G-7 girişimiyle kuruldu, Türkiye 1991'de üye oldu; 40 Tavsiye kararı 1990 (aklama), 2001 (terör sonrası özel tavsiyeler) ve 2012 (tek çatı altında birleştirme) aşamalarından geçti. Ülke uyumu Teknik Uyum (kanunların FATF standardına uygunluğu) ve Etkililik (11 Immediate Outcome ile ölçülen sahadaki sonuç) olmak üzere iki eksende değerlendirilir.",
    examFocus: "MİB modelleri arasındaki fark, FATF'in gri/kara liste mantığı, Türkiye'nin FATF süreci ve MONEYVAL/Egmont'un statüsü.",
    mustKnow: [
      "Türkiye İdari Tip MİB modelini benimser; MASAK finansal kuruluşlar ile kolluk/adli makamlar arasında tampon görevi görür.",
      "FATF 1989'da G-7 zirvesinde (Paris) kuruldu; Türkiye 1991'de üye oldu.",
      "Türkiye Ekim 2021'de FATF gri listesine (artırılmış izleme) girdi, 28 Haziran 2024'te listeden çıktı; Türkiye hiçbir zaman kara listeye girmedi.",
      "MONEYVAL, Avrupa Konseyi bünyesinde bir izleme organıdır (AB kurumu değildir); Türkiye FATF üyesi olduğu için doğrudan MONEYVAL değil FATF tarafından değerlendirilir.",
      "Egmont Grubu 1995'te Brüksel'de kuruldu, MASAK 1998'de üye oldu; 182 ülkenin MİB'i üyedir ve Egmont Güvenli Ağı (ESW) üzerinden gizli istihbarat paylaşır.",
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
      { term: "Türkiye FATF süreci", detail: "1991 üye, Ekim 2021 gri liste, 28 Haziran 2024 çıkış, hiç kara listeye girmedi." },
      { term: "MONEYVAL", detail: "Avrupa Konseyi organıdır; Türkiye FATF üzerinden değerlendirilir." },
      { term: "Egmont Grubu", detail: "1995 kuruldu, MASAK 1998'de üye oldu; Egmont Güvenli Ağı (ESW) ile veri paylaşır." },
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
      "Şüpheli işlem bildirimi (ŞİB), bir işleme konu malvarlığının yasa dışı yollardan elde edildiğine, yasa dışı amaçla kullanıldığına veya terör faaliyetiyle bağlantılı olduğuna dair bilgi, şüphe veya şüpheyi gerektiren bir hususun bulunması halinde MASAK'a yapılır; kesin delil aranmaz ve tutar gözetilmez. Bildirim, şüphenin oluştuğu tarihten itibaren en geç 10 iş günü içinde yapılır; gecikmesinde sakınca bulunan hallerde derhal, terör finansmanı şüphesinde ise 24 saat içinde bildirilir.",
    examFocus: "Bildirim şartları ve süreleri (10 iş günü / derhal / 24 saat), gizlilik (ihbar/tipping-off) yasağı ve koruma hükmü.",
    mustKnow: [
      "ŞİB için parasal alt veya üst sınır yoktur; 1 TL'lik bir işlem bile şüpheliyse bildirilir.",
      "İşlem tamamlanmasa dahi, yapılmaya teşebbüs edilen ve yükümlünün dikkati sayesinde gerçekleşmeyen işlemler de bildirim kapsamındadır.",
      "Genel bildirim süresi, şüphenin oluştuğu tarihten itibaren 10 iş günüdür; gecikmesinde sakınca bulunan hallerde bu süre beklenmeksizin derhal, terör finansmanı şüphesinde 24 saat içinde bildirim yapılır.",
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
      { term: "Süre", detail: "Genel: 10 iş günü; acil: derhal; terör finansmanı: 24 saat." },
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
      "5549 sayılı Kanun md. 13/1 uyarınca müşterinin tanınması ve devamlı bilgi verme ihlalinde 30.000 TL, ŞİB yapmama ihlalinde 50.000 TL maktu idari para cezası uygulanır; bu tutarlar 5326 sayılı Kanun'un 17/7. maddesi gereği her takvim yılı başında yeniden değerleme oranında artırılır.",
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
    legalAnchors: ["5549 sayılı Kanun md. 13 (idari para cezası)", "5549 sayılı Kanun md. 14 (adli ceza)", "5326 sayılı Kabahatler Kanunu md. 17/7 (yeniden değerleme)"],
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
