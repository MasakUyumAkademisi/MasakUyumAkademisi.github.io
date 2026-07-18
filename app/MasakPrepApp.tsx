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

type ViewId = "lessons" | "practice" | "exam" | "progress";
type ExamMode = ModuleId | "mixed";
type AnswerMap = Record<string, number>;

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
  { id: "lessons", label: "Dersler", icon: "D" },
  { id: "practice", label: "Soru Çöz", icon: "S" },
  { id: "exam", label: "Deneme", icon: "T" },
  { id: "progress", label: "İlerleme", icon: "I" },
];

const viewCopy: Record<ViewId, { eyebrow: string; title: string; subtitle: string }> = {
  lessons: {
    eyebrow: "Resmi Konu Dağılımı",
    title: "Dersler",
    subtitle: "Ana kaynak MASAK_Rehber_12-01-2026.pdf temel alınarak önceliklendirilmiş çalışma notları.",
  },
  practice: {
    eyebrow: "Açıklamalı Soru Çözümü",
    title: "Soru Çöz",
    subtitle: "Anında geri bildirim, çeldirici notu ve kaynak atfıyla çalış.",
  },
  exam: {
    eyebrow: "Süreli Simülasyon",
    title: "Deneme",
    subtitle: "50 soru, 45 dakika, boş/işaretli soru takibi ve resmi başarı kriteri.",
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

function formatTime(totalSeconds: number) {
  const minutes = Math.floor(totalSeconds / 60);
  const seconds = totalSeconds % 60;
  return `${String(minutes).padStart(2, "0")}:${String(seconds).padStart(2, "0")}`;
}

function pickExamQuestions(mode: ExamMode) {
  const pool = mode === "mixed" ? questions : getQuestionsForModule(mode);
  const selected = [...pool].sort((a, b) => a.id.localeCompare(b.id)).slice(0, examRules.questionCount);
  return selected.length >= examRules.questionCount ? selected : pool;
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
  const [activeView, setActiveView] = useState<ViewId>("lessons");
  const [activeModule, setActiveModule] = useState<ModuleId>("mod1");
  const [activeLesson, setActiveLesson] = useState(lessons[0].id);
  const [activeQuestion, setActiveQuestion] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [progress, setProgress] = useState<ProgressState>(defaultProgress);
  const [examSession, setExamSession] = useState<ExamSession | null>(null);
  const [lastResult, setLastResult] = useState<ExamResult | null>(null);

  useEffect(() => {
    setProgress(loadProgress());
    if ("serviceWorker" in navigator) {
      navigator.serviceWorker.register("/sw.js").catch(() => undefined);
    }
  }, []);

  useEffect(() => {
    window.localStorage.setItem("masak-prep-progress-v2", JSON.stringify(progress));
  }, [progress]);

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
  }, [examSession?.status, examSession?.remainingSeconds]);

  const currentLesson = getLessonById(activeLesson);
  const currentContent = lessonContentById[currentLesson.id];
  const filteredLessons = lessons.filter((lesson) => lesson.moduleId === activeModule);
  const currentQuestion = questions[activeQuestion];
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
            [currentQuestion.topicId]: (current.weakTags[currentQuestion.topicId] ?? 0) + 1,
          },
      lastSession: `${currentQuestion.sourceRef}: ${isCorrect ? "doğru" : "tekrar gerekli"}`,
    }));
  }

  function nextQuestion() {
    setSelectedAnswer(null);
    setActiveQuestion((current) => (current + 1) % questions.length);
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
    <div className="app-shell">
      <aside className="sidebar" aria-label="Ana gezinme">
        <div className="brand">
          <div className="brand-mark">M</div>
          <div>
            <p className="brand-title">MASAK Hazırlık v2</p>
            <p className="brand-subtitle">Güncel mevzuat ve SPL simülasyonu</p>
          </div>
        </div>
        <nav className="nav">
          {navItems.map((item) => (
            <button className={`nav-button ${activeView === item.id ? "active" : ""}`} key={item.id} onClick={() => setActiveView(item.id)} type="button">
              <span className="nav-icon" aria-hidden="true">{item.icon}</span>
              {item.label}
            </button>
          ))}
        </nav>
        <div className="sidebar-note">
          Mevzuat son kontrol: {examRules.legislationCheckedAt}. Eğitim amaçlıdır; resmi sınav sorusu değildir.
        </div>
      </aside>

      <main className="main">
        <header className="topbar">
          <div>
            <p className="eyebrow">{activeCopy.eyebrow}</p>
            <h1 className="page-title screen-title">{activeCopy.title}</h1>
            <p className="screen-subtitle">{activeCopy.subtitle}</p>
          </div>
        </header>

        {activeView === "lessons" && (
          <section className="lesson-grid">
            <div className="panel panel-inner">
              <div className="section-head">
                <div>
                  <h2 className="section-title">Modüller</h2>
                  <p className="section-subtitle">Ana kaynak: MASAK_Rehber_12-01-2026.pdf</p>
                </div>
                <span className="status-pill">{completedRatio}%</span>
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
                    <span className="module-meta">
                      {lessons.filter((lesson) => lesson.moduleId === module.id).reduce((sum, lesson) => sum + lesson.officialQuestionCount, 0)} resmi soru ağırlığı
                    </span>
                  </button>
                ))}
              </div>
              <div className="lesson-list">
                {filteredLessons.map((lesson) => (
                  <button className={`lesson-button ${activeLesson === lesson.id ? "active" : ""}`} key={lesson.id} onClick={() => setActiveLesson(lesson.id)} type="button">
                    <strong>{lesson.order}. {lesson.title}</strong>
                    <span className="lesson-meta">Resmi ağırlık: {lesson.officialQuestionCount} soru</span>
                  </button>
                ))}
              </div>
            </div>

            <article className="panel panel-inner lesson-body">
              <div>
                <p className="eyebrow">{getModuleById(currentLesson.moduleId).shortName}</p>
                <h2 className="section-title">{currentLesson.title}</h2>
                <p className="lesson-lead">{currentLesson.summary}</p>
              </div>
              <div className="lesson-stat-strip">
                <div><strong>{currentLesson.officialQuestionCount}</strong><span>Resmi ağırlık</span></div>
                <div><strong>{currentContent.priority === "high" ? "Yüksek" : currentContent.priority === "medium" ? "Orta" : "Kısa"}</strong><span>Öncelik</span></div>
                <div><strong>{progress.completedLessons.includes(currentLesson.id) ? "Tamam" : "Açık"}</strong><span>Ders durumu</span></div>
              </div>
              <div className="callout focus-callout"><p className="callout-title">Sınavda Çıkar</p><p>{currentContent.examFocus}</p></div>
              <section className="narrative-block">
                <h3>Ana Anlatım</h3>
                <p>{currentContent.coreNarrative}</p>
                <span>{currentContent.pdfRange}</span>
              </section>
              <div className="lesson-detail-grid priority-grid">
                <section className="detail-block">
                  <h3>Mutlaka Bil</h3>
                  <ul>{currentContent.mustKnow.map((item) => <li key={item}>{item}</li>)}</ul>
                </section>
                <section className="detail-block">
                  <h3>Kritik Ayrımlar</h3>
                  <ul>{currentContent.confusions.map((item) => <li key={item}>{item}</li>)}</ul>
                </section>
              </div>
              <div className="callout scenario"><p className="callout-title">Örnek Olay</p><p>{currentContent.casePattern}</p></div>
              <section className="review-section">
                <h3>Hızlı Tekrar</h3>
                <dl className="card-grid">
                  {currentContent.reviewCards.map((card) => (
                    <div className="study-card" key={card.term}><dt>{card.term}</dt><dd>{card.detail}</dd></div>
                  ))}
                </dl>
              </section>
              <details className="inline-source-panel">
                <summary>Mevzuat dayanakları</summary>
                <div className="source-note-list">
                  {currentContent.legalAnchors.map((item) => <span key={item}>{item}</span>)}
                </div>
              </details>
              <section className="mini-quiz-box">
                <div>
                  <h3>Mini Test Hazırlığı</h3>
                  <p>{currentContent.miniQuizSeed.join(" ")}</p>
                </div>
              </section>
              <div className="top-actions">
                <button className="button primary" onClick={completeLesson} type="button">Dersi Tamamla</button>
                <button
                  className="button"
                  onClick={() => {
                    const index = questions.findIndex((question) => question.topicId === currentLesson.id);
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
                <span className="tag">{getModuleById(currentQuestion.moduleId).shortName}</span>
                <span className="tag blue">{currentQuestion.difficulty}</span>
                <span className="tag">{getLessonById(currentQuestion.topicId).title}</span>
              </div>
              <p className="question-text">{currentQuestion.prompt}</p>
              <div className="options">
                {currentQuestion.options.map((option, index) => {
                  const isCorrect = index === currentQuestion.answer;
                  const isSelected = selectedAnswer === index;
                  const stateClass = selectedAnswer === null ? "" : isCorrect ? "correct" : isSelected ? "wrong" : "";
                  return (
                    <button className={`option ${isSelected ? "selected" : ""} ${stateClass}`} disabled={selectedAnswer !== null} key={option} onClick={() => answerQuestion(index)} type="button">
                      <span className="option-letter">{String.fromCharCode(65 + index)}</span>
                      <span>{option}</span>
                    </button>
                  );
                })}
              </div>
              {selectedAnswer !== null && (
                <div className="solution">
                  <strong>{selectedAnswer === currentQuestion.answer ? "Doğru cevap." : "Yanlış cevap."} Doğru seçenek {String.fromCharCode(65 + currentQuestion.answer)}.</strong>
                  <p>{currentQuestion.explanation}</p>
                  <p><strong>Çeldirici:</strong> {currentQuestion.trapNote}</p>
                  <p><strong>Kaynak:</strong> {currentQuestion.sourceRef}</p>
                </div>
              )}
              <div className="top-actions">
                <button className="button" onClick={nextQuestion} type="button">Sonraki Soru</button>
                <button className="button ghost" onClick={() => setSelectedAnswer(null)} type="button">Cevabı Temizle</button>
              </div>
            </div>
            <aside className="panel panel-inner">
              <h2 className="section-title">Soru Bankası</h2>
              <div className="metric-grid" style={{ gridTemplateColumns: "1fr" }}>
                <div className="metric"><p className="metric-value">{questions.length}</p><p className="metric-label">Toplam özgün soru</p></div>
                <div className="metric"><p className="metric-value">{answeredCount}</p><p className="metric-label">Çözülen pratik soru</p></div>
              </div>
            </aside>
          </section>
        )}

        {activeView === "exam" && renderExamRunner()}

        {activeView === "progress" && (
          <section className="progress-grid">
            <div className="panel panel-inner">
              <h2 className="section-title">İlerleme ve Deneme Geçmişi</h2>
              <div className="bar-list">
                <div className="bar-row"><div className="bar-label"><span>Ders tamamlama</span><span>{completedRatio}%</span></div><div className="bar-track"><div className="bar-fill" style={{ width: `${completedRatio}%` }} /></div></div>
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

      <nav className="mobile-nav" aria-label="Mobil gezinme">
        {navItems.map((item) => (
          <button className={activeView === item.id ? "active" : ""} key={item.id} onClick={() => setActiveView(item.id)} type="button">
            {item.label}
          </button>
        ))}
      </nav>
    </div>
  );
}
