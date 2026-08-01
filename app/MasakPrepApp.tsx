"use client";

import { useEffect, useMemo, useState } from "react";
import {
  examRules,
  getLessonById,
  getModuleById,
  getQuestionsForModule,
  lessonContentById,
  lessons,
  modules,
  questions,
  type ModuleId,
  type Question,
} from "./content";
import MemoryLab from "./MemoryLab";

type ViewId = "study" | "exam" | "memory" | "progress";
type ExamMode = ModuleId | "mixed";
type AnswerMap = Record<string, number>;
type StudyPhase = "lesson" | "questions" | "done";
type ThemeMode = "light" | "dark";

type ExamResult = {
  id: string;
  mode: ExamMode;
  title: string;
  total: number;
  correct: number;
  wrong: number;
  blank: number;
  score: number;
  durationSeconds: number;
  finishedAt: string;
  topicBreakdown: Record<string, { total: number; correct: number; wrong: number; blank: number }>;
};

type ExamSession = {
  mode: ExamMode;
  title: string;
  questions: Question[];
  currentIndex: number;
  answers: AnswerMap;
  marked: string[];
  remainingSeconds: number;
  status: "running" | "review" | "finished";
  startedAt: number;
};

type ProgressState = {
  version: 2;
  completedLessons: string[];
  answered: Record<string, boolean>;
  weakTags: Record<string, number>;
  lastSession: string;
  examHistory: ExamResult[];
  lastLegislationCheck: string;
};

const navItems: { id: ViewId; label: string; icon: string }[] = [
  { id: "study", label: "Çalış", icon: "Ç" },
  { id: "exam", label: "Deneme", icon: "T" },
  { id: "memory", label: "Hafıza", icon: "H" },
  { id: "progress", label: "İlerleme", icon: "İ" },
];

const viewCopy: Record<ViewId, { eyebrow: string; title: string; subtitle: string }> = {
  study: {
    eyebrow: "Adım Adım Çalışma",
    title: "Çalış",
    subtitle: "Önce dersi oku, sonra o dersin sorularını çöz. Bitirince otomatik olarak bir sonraki derse geçersin.",
  },
  exam: {
    eyebrow: "Süreli Simülasyon",
    title: "Deneme",
    subtitle: "50 soru, 45 dakika, boş/işaretli soru takibi ve resmi başarı kriteri.",
  },
  memory: {
    eyebrow: "Doping Hafıza Teknikleri",
    title: "Hafıza",
    subtitle: "Aralıklı tekrar, mnemonikler, hafıza sarayı ve aktif hatırlama ile kalıcı öğrenme.",
  },
  progress: {
    eyebrow: "Performans",
    title: "İlerleme",
    subtitle: "Ders tamamlama, pratik doğruluk ve deneme geçmişini izle.",
  },
};

const defaultProgress: ProgressState = {
  version: 2,
  completedLessons: [],
  answered: {},
  weakTags: {},
  lastSession: "Henüz oturum yok",
  examHistory: [],
  lastLegislationCheck: examRules.legislationCheckedAt,
};

function loadProgress(): ProgressState {
  if (typeof window === "undefined") {
    return defaultProgress;
  }

  try {
    const v2Raw = window.localStorage.getItem("masak-prep-progress-v2");
    if (v2Raw) {
      return { ...defaultProgress, ...JSON.parse(v2Raw), version: 2 };
    }

    const v1Raw = window.localStorage.getItem("masak-prep-progress-v1");
    if (v1Raw) {
      const v1 = JSON.parse(v1Raw);
      return {
        ...defaultProgress,
        completedLessons: v1.completedLessons ?? [],
        answered: v1.answered ?? {},
        weakTags: v1.weakTags ?? {},
        lastSession: v1.lastSession ?? defaultProgress.lastSession,
      };
    }
  } catch {
    return defaultProgress;
  }

  return defaultProgress;
}

function loadTheme(): ThemeMode {
  if (typeof window === "undefined") {
    return "light";
  }

  const savedTheme = window.localStorage.getItem("masak-prep-theme");
  if (savedTheme === "light" || savedTheme === "dark") {
    return savedTheme;
  }

  return window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
}

function formatTime(totalSeconds: number) {
  const minutes = Math.floor(totalSeconds / 60);
  const seconds = totalSeconds % 60;
  return `${String(minutes).padStart(2, "0")}:${String(seconds).padStart(2, "0")}`;
}

function shuffle<T>(items: T[]): T[] {
  const result = [...items];
  for (let i = result.length - 1; i > 0; i -= 1) {
    const j = Math.floor(Math.random() * (i + 1));
    [result[i], result[j]] = [result[j], result[i]];
  }
  return result;
}

function pickExamQuestions(mode: ExamMode) {
  const pool = mode === "mixed" ? questions : getQuestionsForModule(mode);
  const shuffled = shuffle(pool);
  const selected = shuffled.slice(0, examRules.questionCount);
  return selected.length >= examRules.questionCount ? selected : shuffled;
}

function scoreExam(session: ExamSession): ExamResult {
  const topicBreakdown: ExamResult["topicBreakdown"] = {};
  let correct = 0;
  let wrong = 0;
  let blank = 0;

  session.questions.forEach((question) => {
    const selected = session.answers[question.id];
    const isBlank = selected === undefined;
    const isCorrect = selected === question.answer;
    const current = topicBreakdown[question.topicId] ?? { total: 0, correct: 0, wrong: 0, blank: 0 };

    current.total += 1;
    if (isBlank) {
      blank += 1;
      current.blank += 1;
    } else if (isCorrect) {
      correct += 1;
      current.correct += 1;
    } else {
      wrong += 1;
      current.wrong += 1;
    }
    topicBreakdown[question.topicId] = current;
  });

  const score = Math.round((correct / session.questions.length) * 100);
  return {
    id: `${session.mode}-${session.startedAt}`,
    mode: session.mode,
    title: session.title,
    total: session.questions.length,
    correct,
    wrong,
    blank,
    score,
    durationSeconds: examRules.durationMinutes * 60 - session.remainingSeconds,
    finishedAt: new Date().toLocaleString("tr-TR"),
    topicBreakdown,
  };
}

export default function MasakPrepApp() {
  const [activeView, setActiveView] = useState<ViewId>("study");
  const [studyLessonId, setStudyLessonId] = useState(lessons[0].id);
  const [studyPhase, setStudyPhase] = useState<StudyPhase>("lesson");
  const [studyQIndex, setStudyQIndex] = useState(0);
  const [studyAnswer, setStudyAnswer] = useState<number | null>(null);
  const [studyScore, setStudyScore] = useState({ correct: 0, total: 0 });
  const [studyExpanded, setStudyExpanded] = useState(false);
  const [showLessonPicker, setShowLessonPicker] = useState(false);
  const [progress, setProgress] = useState<ProgressState>(defaultProgress);
  const [examSession, setExamSession] = useState<ExamSession | null>(null);
  const [lastResult, setLastResult] = useState<ExamResult | null>(null);
  const [flippedTerms, setFlippedTerms] = useState<string[]>([]);
  const [theme, setTheme] = useState<ThemeMode>("light");

  useEffect(() => {
    // Hydrate from localStorage after mount (SSR-safe: server and first client
    // render both use defaultProgress, so this intentionally updates state
    // once the real external-store value is available). Resume study at the
    // first lesson the learner hasn't completed yet.
    const loadedProgress = loadProgress();
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setProgress(loadedProgress);
    const resumeLesson =
      lessons.find((lesson) => !loadedProgress.completedLessons.includes(lesson.id)) ?? lessons[lessons.length - 1];
    setStudyLessonId(resumeLesson.id);
    setTheme(loadTheme());
    if ("serviceWorker" in navigator) {
      navigator.serviceWorker.register("/sw.js").catch(() => undefined);
    }
  }, []);

  useEffect(() => {
    window.localStorage.setItem("masak-prep-progress-v2", JSON.stringify(progress));
  }, [progress]);

  useEffect(() => {
    document.documentElement.dataset.theme = theme;
    document.documentElement.style.colorScheme = theme;
    window.localStorage.setItem("masak-prep-theme", theme);
  }, [theme]);

  useEffect(() => {
    if (!examSession || examSession.status !== "running") {
      return;
    }

    if (examSession.remainingSeconds <= 0) {
      finishExam();
      return;
    }

    const timer = window.setInterval(() => {
      setExamSession((current) =>
        current && current.status === "running"
          ? { ...current, remainingSeconds: Math.max(0, current.remainingSeconds - 1) }
          : current,
      );
    }, 1000);

    return () => window.clearInterval(timer);
    // Deliberately narrowed deps: only status/remainingSeconds should restart
    // the timer. Including the full examSession object would reset the
    // interval on every answer/mark click during a running exam.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [examSession?.status, examSession?.remainingSeconds]);

  const studyLesson = getLessonById(studyLessonId);
  const studyContent = lessonContentById[studyLesson.id];
  const studyIndex = lessons.findIndex((lesson) => lesson.id === studyLesson.id);
  const lessonQuestions = useMemo(
    () => questions.filter((question) => question.topicId === studyLesson.id),
    [studyLesson.id],
  );
  const studyQuestion = lessonQuestions[studyQIndex];
  const answeredCount = Object.keys(progress.answered).length;
  const correctCount = Object.values(progress.answered).filter(Boolean).length;
  const accuracy = answeredCount ? Math.round((correctCount / answeredCount) * 100) : 0;
  const completedRatio = Math.round((progress.completedLessons.length / lessons.length) * 100);
  const mod1Last = progress.examHistory.find((result) => result.mode === "mod1");
  const mod2Last = progress.examHistory.find((result) => result.mode === "mod2");
  const averageScore = mod1Last && mod2Last ? Math.round((mod1Last.score + mod2Last.score) / 2) : null;

  const moduleScores = useMemo(() => {
    return modules.map((module) => {
      const moduleQuestions = questions.filter((question) => question.moduleId === module.id);
      const answered = moduleQuestions.filter((question) => question.id in progress.answered);
      const correct = answered.filter((question) => progress.answered[question.id]);
      return {
        ...module,
        score: answered.length ? Math.round((correct.length / answered.length) * 100) : 0,
        questionCount: moduleQuestions.length,
      };
    });
  }, [progress.answered]);

  const weakLessons = Object.entries(progress.weakTags)
    .sort((a, b) => b[1] - a[1])
    .map(([lessonId]) => getLessonById(lessonId).title);
  const activeCopy = viewCopy[activeView];

  function toggleTheme() {
    const nextTheme = theme === "dark" ? "light" : "dark";
    setTheme(nextTheme);
    document.documentElement.dataset.theme = nextTheme;
    document.documentElement.style.colorScheme = nextTheme;
    window.localStorage.setItem("masak-prep-theme", nextTheme);
  }

  function beginLessonQuestions() {
    setStudyQIndex(0);
    setStudyAnswer(null);
    setStudyScore({ correct: 0, total: 0 });
    setStudyPhase("questions");
  }

  function answerStudyQuestion(index: number) {
    if (studyAnswer !== null || !studyQuestion) {
      return;
    }

    const isCorrect = index === studyQuestion.answer;
    setStudyAnswer(index);
    setStudyScore((current) => ({
      correct: current.correct + (isCorrect ? 1 : 0),
      total: current.total + 1,
    }));
    setProgress((current) => ({
      ...current,
      answered: { ...current.answered, [studyQuestion.id]: isCorrect },
      weakTags: isCorrect
        ? current.weakTags
        : {
            ...current.weakTags,
            [studyQuestion.topicId]: (current.weakTags[studyQuestion.topicId] ?? 0) + 1,
          },
      lastSession: `${studyQuestion.sourceRef}: ${isCorrect ? "doğru" : "tekrar gerekli"}`,
    }));
  }

  function nextStudyQuestion() {
    if (studyQIndex + 1 >= lessonQuestions.length) {
      setProgress((current) =>
        current.completedLessons.includes(studyLesson.id)
          ? current
          : {
              ...current,
              completedLessons: [...current.completedLessons, studyLesson.id],
              lastSession: `${studyLesson.title} tamamlandı`,
            },
      );
      setStudyPhase("done");
      return;
    }
    setStudyQIndex((current) => current + 1);
    setStudyAnswer(null);
  }

  function retryLessonQuestions() {
    setStudyQIndex(0);
    setStudyAnswer(null);
    setStudyScore({ correct: 0, total: 0 });
    setStudyPhase("questions");
  }

  function goToLesson(lessonId: string) {
    setStudyLessonId(lessonId);
    setStudyPhase("lesson");
    setStudyExpanded(false);
    setShowLessonPicker(false);
  }

  function goToNextLesson() {
    const next = lessons[studyIndex + 1];
    if (next) {
      goToLesson(next.id);
    } else {
      setStudyPhase("lesson");
      setStudyExpanded(false);
    }
  }

  function startExam(mode: ExamMode) {
    const title =
      mode === "mixed" ? "Karışık Çalışma Denemesi" : `${getModuleById(mode).shortName} Resmi Simülasyon`;
    const examQuestions = pickExamQuestions(mode);
    setExamSession({
      mode,
      title,
      questions: examQuestions,
      currentIndex: 0,
      answers: {},
      marked: [],
      remainingSeconds: examRules.durationMinutes * 60,
      status: "running",
      startedAt: Date.now(),
    });
    setLastResult(null);
    setActiveView("exam");
    setProgress((current) => ({ ...current, lastSession: `${title} başlatıldı` }));
  }

  function setExamAnswer(questionId: string, answer: number) {
    setExamSession((current) =>
      current ? { ...current, answers: { ...current.answers, [questionId]: answer } } : current,
    );
  }

  function toggleMarked(questionId: string) {
    setExamSession((current) => {
      if (!current) {
        return current;
      }
      return {
        ...current,
        marked: current.marked.includes(questionId)
          ? current.marked.filter((id) => id !== questionId)
          : [...current.marked, questionId],
      };
    });
  }

  function finishExam() {
    setExamSession((current) => {
      if (!current) {
        return current;
      }

      const result = scoreExam({ ...current, status: "finished" });
      setLastResult(result);
      setProgress((progressState) => ({
        ...progressState,
        examHistory: [result, ...progressState.examHistory.filter((item) => item.id !== result.id)].slice(0, 8),
        lastSession: `${result.title}: ${result.score} puan`,
        weakTags: Object.entries(result.topicBreakdown).reduce(
          (acc, [topicId, value]) => ({
            ...acc,
            [topicId]: (acc[topicId] ?? 0) + value.wrong + value.blank,
          }),
          { ...progressState.weakTags },
        ),
      }));
      return { ...current, status: "finished" };
    });
  }

  function renderExamRunner() {
    if (!examSession) {
      return (
        <section className="exam-grid">
          {[
            ["Modül 1 Deneme", "50 soru, 45 dakika. SPL dağılımına uygun resmi simülasyon.", "mod1"],
            ["Modül 2 Deneme", "50 soru, 45 dakika. Uyum yönetimi ve yükümlülükler ağırlıklı.", "mod2"],
            ["Karışık Çalışma", "İki modülden hızlı tekrar; resmi simülasyon olarak işaretlenmez.", "mixed"],
          ].map(([title, text, id]) => (
            <article className="panel panel-inner exam-card" key={title}>
              <div>
                <p className="eyebrow">{id === "mixed" ? "Çalışma modu" : "Resmi simülasyon"}</p>
                <h2 className="section-title">{title}</h2>
                <p>{text}</p>
              </div>
              <button className="button primary" onClick={() => startExam(id as ExamMode)} type="button">
                Denemeyi Başlat
              </button>
            </article>
          ))}
        </section>
      );
    }

    if (lastResult) {
      const modulePass = lastResult.score >= examRules.passPerModule;
      const averagePass =
        averageScore === null
          ? "İki modül çözülünce ortalama hesaplanır."
          : averageScore >= examRules.averagePass
            ? `Ortalama ${averageScore}: başarılı.`
            : `Ortalama ${averageScore}: tekrar gerekli.`;

      return (
        <section className="progress-grid">
          <div className="panel panel-inner">
            <p className="eyebrow">Deneme Sonucu</p>
            <h2 className="page-title">{lastResult.title}</h2>
            <div className="metric-grid">
              <div className="metric"><p className="metric-value">{lastResult.score}</p><p className="metric-label">Puan</p></div>
              <div className="metric"><p className="metric-value">{lastResult.correct}</p><p className="metric-label">Doğru</p></div>
              <div className="metric"><p className="metric-value">{lastResult.blank}</p><p className="metric-label">Boş</p></div>
            </div>
            <div className={`callout ${modulePass ? "" : "warning"}`}>
              <p className="callout-title">Resmi başarı kriteri simülasyonu</p>
              <p>
                Modül puanı {lastResult.score}. Modül eşiği {examRules.passPerModule}; iki modül ortalaması eşiği {examRules.averagePass}. {averagePass}
              </p>
            </div>
            <div className="bar-list">
              {Object.entries(lastResult.topicBreakdown).map(([topicId, value]) => {
                const lesson = getLessonById(topicId);
                const ratio = Math.round((value.correct / value.total) * 100);
                return (
                  <div className="bar-row" key={topicId}>
                    <div className="bar-label"><span>{lesson.title}</span><span>{ratio}%</span></div>
                    <div className="bar-track"><div className="bar-fill" style={{ width: `${ratio}%` }} /></div>
                  </div>
                );
              })}
            </div>
          </div>
          <aside className="panel panel-inner">
            <h2 className="section-title">Sonraki Adım</h2>
            <p className="section-subtitle">Yanlış ve boş konular tekrar listesine eklendi.</p>
            <div className="top-actions">
              <button className="button primary" onClick={() => startExam(lastResult.mode)} type="button">Tekrar Çöz</button>
              <button className="button" onClick={() => setExamSession(null)} type="button">Deneme Menüsü</button>
            </div>
          </aside>
        </section>
      );
    }

    const question = examSession.questions[examSession.currentIndex];
    const answered = Object.keys(examSession.answers).length;
    const blank = examSession.questions.length - answered;

    return (
      <section className="practice-grid">
        <div className="panel panel-inner question-card">
          <div className="exam-toolbar">
            <span className="tag blue">{examSession.title}</span>
            <span className="tag">Kalan süre: {formatTime(examSession.remainingSeconds)}</span>
            <span className="tag">Cevaplanan: {answered}</span>
            <span className="tag">Boş: {blank}</span>
          </div>
          <div className="question-meta">
            <span className="tag">{getModuleById(question.moduleId).shortName}</span>
            <span className="tag blue">{question.difficulty}</span>
            <span className="tag">{getLessonById(question.topicId).title}</span>
          </div>
          <p className="question-text">{examSession.currentIndex + 1}. {question.prompt}</p>
          <div className="options">
            {question.options.map((option, index) => (
              <button
                className={`option ${examSession.answers[question.id] === index ? "selected" : ""}`}
                key={option}
                onClick={() => setExamAnswer(question.id, index)}
                type="button"
              >
                <span className="option-letter">{String.fromCharCode(65 + index)}</span>
                <span>{option}</span>
              </button>
            ))}
          </div>
          <div className="top-actions">
            <button
              className="button"
              disabled={examSession.currentIndex === 0}
              onClick={() => setExamSession((current) => current ? { ...current, currentIndex: current.currentIndex - 1 } : current)}
              type="button"
            >
              Önceki
            </button>
            <button
              className="button"
              disabled={examSession.currentIndex === examSession.questions.length - 1}
              onClick={() => setExamSession((current) => current ? { ...current, currentIndex: current.currentIndex + 1 } : current)}
              type="button"
            >
              Sonraki
            </button>
            <button className="button" onClick={() => toggleMarked(question.id)} type="button">
              {examSession.marked.includes(question.id) ? "İşareti Kaldır" : "İşaretle"}
            </button>
            <button className="button primary" onClick={finishExam} type="button">
              Sınavı Bitir
            </button>
          </div>
        </div>
        <aside className="panel panel-inner">
          <h2 className="section-title">Soru Paleti</h2>
          <p className="section-subtitle">İşaretli sorular koyu çerçeveyle görünür.</p>
          <div className="question-palette">
            {examSession.questions.map((item, index) => (
              <button
                className={`${examSession.currentIndex === index ? "active" : ""} ${examSession.answers[item.id] !== undefined ? "answered" : ""} ${examSession.marked.includes(item.id) ? "marked" : ""}`}
                key={item.id}
                onClick={() => setExamSession((current) => current ? { ...current, currentIndex: index } : current)}
                type="button"
              >
                {index + 1}
              </button>
            ))}
          </div>
        </aside>
      </section>
    );
  }

  return (
    <div className="app-shell" data-theme={theme}>
      <header className="topnav">
        <div className="topnav-brand">
          <div className="topnav-mark" aria-hidden="true">M</div>
          <div>
            <p className="topnav-title">MASAK Hazırlık</p>
            <p className="topnav-subtitle">Uyum görevlisi yetkilendirme sınavı</p>
          </div>
        </div>
        <nav className="topnav-links" aria-label="Ana gezinme">
          {navItems.map((item) => (
            <button
              aria-current={activeView === item.id ? "page" : undefined}
              className={activeView === item.id ? "active" : ""}
              key={item.id}
              onClick={() => setActiveView(item.id)}
              type="button"
            >
              {item.label}
            </button>
          ))}
        </nav>
        <div className="topnav-actions">
          <span className="topnav-meta">Mevzuat kontrol: {examRules.legislationCheckedAt}</span>
          <button
            aria-label={theme === "dark" ? "Açık moda geç" : "Koyu moda geç"}
            aria-pressed={theme === "dark"}
            className="theme-toggle"
            onClick={toggleTheme}
            type="button"
          >
            <span aria-hidden="true">{theme === "dark" ? "☀" : "◐"}</span>
            <strong>{theme === "dark" ? "Açık" : "Koyu"}</strong>
          </button>
        </div>
      </header>

      <main className="main">
        <header className="topbar">
          <div>
            <p className="eyebrow">{activeCopy.eyebrow}</p>
            <h1 className="page-title screen-title">{activeCopy.title}</h1>
            <p className="screen-subtitle">{activeCopy.subtitle}</p>
          </div>
        </header>

        {activeView === "study" && (
          <section className="study-shell">
            <div className="panel panel-inner study-progress-card">
              <div className="study-progress-head">
                <span className="status-pill">Ders {studyIndex + 1} / {lessons.length}</span>
                <span className="study-progress-note">{progress.completedLessons.length} ders tamamlandı</span>
              </div>
              <div className="study-progress-track">
                <div className="study-progress-fill" style={{ width: `${completedRatio}%` }} />
              </div>
              <button
                className="button ghost study-picker-toggle"
                onClick={() => setShowLessonPicker((current) => !current)}
                type="button"
              >
                {showLessonPicker ? "Ders listesini gizle" : "Başka bir ders seç"}
              </button>
              {showLessonPicker && (
                <div className="lesson-picker-list">
                  {lessons.map((lesson) => (
                    <button
                      className={`lesson-picker-row ${lesson.id === studyLesson.id ? "active" : ""}`}
                      key={lesson.id}
                      onClick={() => goToLesson(lesson.id)}
                      type="button"
                    >
                      <span className="lesson-picker-check" aria-hidden="true">
                        {progress.completedLessons.includes(lesson.id) ? "✓" : lesson.order}
                      </span>
                      <span className="lesson-picker-title">{lesson.title}</span>
                      <span className="tag">{getModuleById(lesson.moduleId).shortName}</span>
                    </button>
                  ))}
                </div>
              )}
            </div>

            {studyPhase === "lesson" && (
              <article className="panel panel-inner study-lesson-card">
                <p className="eyebrow">{getModuleById(studyLesson.moduleId).shortName}</p>
                <h2 className="page-title study-title">{studyLesson.title}</h2>
                <p className="study-lead">{studyLesson.summary}</p>
                <section className="study-mustknow study-narrative">
                  <h3>Konu Anlatımı</h3>
                  <p>{studyContent.coreNarrative}</p>
                </section>
                <div className="callout focus-callout">
                  <p className="callout-title">Sınavda Çıkar</p>
                  <p>{studyContent.examFocus}</p>
                </div>
                <section className="study-mustknow">
                  <h3>Mutlaka Bil</h3>
                  <ul>{studyContent.mustKnow.map((item) => <li key={item}>{item}</li>)}</ul>
                </section>

                {studyExpanded && (
                  <>
                    <section className="review-section">
                      <div className="section-head">
                        <h3>Derinlemesine</h3>
                        <span className="hint-text">Sınavda bu ayrımlar çeldirici olarak kullanılır</span>
                      </div>
                      <div className="deepdive-list">
                        {studyContent.deepDiveSections.map((section) => (
                          <div className="deepdive-item" key={section.title}>
                            <p className="deepdive-title">{section.title}</p>
                            <p className="deepdive-body">{section.body}</p>
                          </div>
                        ))}
                      </div>
                    </section>
                    <section className="study-mustknow">
                      <h3>Kritik Ayrımlar</h3>
                      <ul>{studyContent.pitfalls.map((item) => <li key={item}>{item}</li>)}</ul>
                    </section>
                    <section className="review-section">
                      <div className="section-head">
                        <h3>Hızlı Tekrar Kartları</h3>
                        <span className="hint-text">Önce hatırlamayı deneyin, sonra karta dokunup kontrol edin</span>
                      </div>
                      <div className="card-grid">
                        {studyContent.glossary.map((card) => {
                          const isFlipped = flippedTerms.includes(card.term);
                          return (
                            <button
                              className={`study-card flip-card ${isFlipped ? "flipped" : ""}`}
                              key={card.term}
                              onClick={() =>
                                setFlippedTerms((current) =>
                                  current.includes(card.term) ? current.filter((term) => term !== card.term) : [...current, card.term],
                                )
                              }
                              type="button"
                            >
                              <span className="study-card-term">{card.term}</span>
                              <span className="study-card-detail">{isFlipped ? card.detail : "Tanımı görmek için dokunun"}</span>
                            </button>
                          );
                        })}
                      </div>
                    </section>
                  </>
                )}

                <button
                  className="button ghost study-toggle"
                  onClick={() => setStudyExpanded((current) => !current)}
                  type="button"
                >
                  {studyExpanded ? "Daha az göster" : "Daha fazla detay göster"}
                </button>

                <button className="button primary study-cta" onClick={beginLessonQuestions} type="button">
                  Soruları Çöz ({lessonQuestions.length} soru) →
                </button>
              </article>
            )}

            {studyPhase === "questions" && studyQuestion && (
              <article className="panel panel-inner study-question-card">
                <div className="question-meta">
                  <span className="tag">{studyLesson.title}</span>
                  <span className="tag blue">Soru {studyQIndex + 1} / {lessonQuestions.length}</span>
                </div>
                <p className="question-text">{studyQuestion.prompt}</p>
                <div className="options">
                  {studyQuestion.options.map((option, index) => {
                    const isCorrect = index === studyQuestion.answer;
                    const isSelected = studyAnswer === index;
                    const stateClass = studyAnswer === null ? "" : isCorrect ? "correct" : isSelected ? "wrong" : "";
                    return (
                      <button
                        className={`option ${isSelected ? "selected" : ""} ${stateClass}`}
                        disabled={studyAnswer !== null}
                        key={option}
                        onClick={() => answerStudyQuestion(index)}
                        type="button"
                      >
                        <span className="option-letter">{String.fromCharCode(65 + index)}</span>
                        <span>{option}</span>
                      </button>
                    );
                  })}
                </div>
                {studyAnswer !== null && (
                  <div className="solution">
                    <strong>
                      {studyAnswer === studyQuestion.answer ? "Doğru cevap." : "Yanlış cevap."} Doğru seçenek{" "}
                      {String.fromCharCode(65 + studyQuestion.answer)}.
                    </strong>
                    <p>{studyQuestion.explanation}</p>
                    <p><strong>Çeldirici:</strong> {studyQuestion.trapNote}</p>
                  </div>
                )}
                <div className="top-actions">
                  <button
                    className="button primary study-cta"
                    disabled={studyAnswer === null}
                    onClick={nextStudyQuestion}
                    type="button"
                  >
                    {studyQIndex + 1 >= lessonQuestions.length ? "Dersi Bitir →" : "Sonraki Soru →"}
                  </button>
                </div>
              </article>
            )}

            {studyPhase === "done" && (
              <article className="panel panel-inner study-done-card">
                <p className="eyebrow">Tebrikler</p>
                <h2 className="page-title">{studyLesson.title} tamamlandı</h2>
                <p className="study-lead">
                  {studyScore.total} sorudan {studyScore.correct} tanesini doğru cevapladınız.
                </p>
                <div className="top-actions study-done-actions">
                  <button className="button ghost" onClick={retryLessonQuestions} type="button">
                    Bu Dersi Tekrar Çöz
                  </button>
                  {studyIndex + 1 < lessons.length ? (
                    <button className="button primary study-cta" onClick={goToNextLesson} type="button">
                      Sonraki Derse Geç →
                    </button>
                  ) : (
                    <button className="button primary study-cta" onClick={() => setActiveView("exam")} type="button">
                      Tüm Dersler Bitti — Deneme Sınavına Gir →
                    </button>
                  )}
                </div>
              </article>
            )}
          </section>
        )}

        {activeView === "exam" && renderExamRunner()}

        {activeView === "memory" && <MemoryLab />}

        {activeView === "progress" && (
          <section className="progress-grid">
            <div className="panel panel-inner">
              <h2 className="section-title">İlerleme ve Deneme Geçmişi</h2>
              <div className="bar-list">
                <div className="bar-row"><div className="bar-label"><span>Ders tamamlama</span><span>{completedRatio}%</span></div><div className="bar-track"><div className="bar-fill" style={{ width: `${completedRatio}%` }} /></div></div>
                <div className="bar-row"><div className="bar-label"><span>Genel doğruluk ({answeredCount} soru çözüldü)</span><span>{accuracy}%</span></div><div className="bar-track"><div className="bar-fill" style={{ width: `${accuracy}%` }} /></div></div>
                {moduleScores.map((module) => (
                  <div className="bar-row" key={module.id}>
                    <div className="bar-label"><span>{module.shortName} pratik doğruluk ({module.questionCount} soru)</span><span>{module.score}%</span></div>
                    <div className="bar-track"><div className="bar-fill" style={{ width: `${module.score}%` }} /></div>
                  </div>
                ))}
              </div>
              <div className="source-list" style={{ marginTop: "1rem" }}>
                {progress.examHistory.map((result) => (
                  <div className="source-link" key={result.id}>
                    {result.title}: {result.score} puan
                    <span>{result.finishedAt} | D:{result.correct} Y:{result.wrong} B:{result.blank}</span>
                  </div>
                ))}
              </div>
            </div>
            <aside className="panel panel-inner">
              <h2 className="section-title">Tekrar Önerisi</h2>
              <p className="section-subtitle">Son oturum: {progress.lastSession}</p>
              <p className="section-subtitle">Mevzuat son kontrol: {progress.lastLegislationCheck}</p>
              <div className="weak-list" style={{ marginTop: "1rem" }}>
                {(weakLessons.length ? weakLessons.slice(0, 8) : ["ŞİB", "Müşterinin Tanınması", "Uyum Yönetimi"]).map((item) => (
                  <span className="tag" key={item}>{item}</span>
                ))}
              </div>
            </aside>
          </section>
        )}
      </main>
    </div>
  );
}
