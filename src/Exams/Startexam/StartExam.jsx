import { useParams, useSearchParams, useNavigate } from "react-router-dom";
import { useEffect, useState, useRef, useCallback, useMemo } from "react";
import axios from "axios";

const API = "https://talent-backend-i83x.onrender.com";
const TOTAL_TIME = 60 * 60;

/* ─── Axios instance with timeout ─── */
const api = axios.create({
  baseURL: API,
  timeout: 10000,
});

/* ─── Utility ─── */
const pad = (n) => String(n).padStart(2, "0");

/* ─── Toast (lightweight, no library) ─── */
let toastId = 0;
function useToast() {
  const [toasts, setToasts] = useState([]);
  const push = useCallback((msg, type = "info") => {
    const id = ++toastId;
    setToasts((p) => [...p, { id, msg, type }]);
    setTimeout(() => setToasts((p) => p.filter((t) => t.id !== id)), 3500);
  }, []);
  return { toasts, push };
}

/* ─── QuestionPalette ─── */
function QuestionPalette({ questions, answers, current, onJump }) {
  return (
    <div className="palette-grid">
      {questions.map((q, i) => (
        <button
          key={q.id}
          className={`palette-btn${i === current ? " active" : ""}${answers[q.id] ? " answered" : ""}`}
          onClick={() => onJump(i)}
          aria-label={`Go to question ${i + 1}`}
        >
          {i + 1}
        </button>
      ))}
    </div>
  );
}

/* ─── Main Component ─── */
export default function StartExam() {
  const { examCode } = useParams();
  const [params] = useSearchParams();
  const lang = params.get("lang") || "en";
  const navigate = useNavigate();

  const candidateInfo = useMemo(
    () => JSON.parse(localStorage.getItem("candidateInfo")) || {},
    []
  );
  const { candidate_name, father_name, mobile_number } = candidateInfo;

  const [questions, setQuestions] = useState([]);
  const [current, setCurrent] = useState(0);
  const [answers, setAnswers] = useState({});
  const [timeLeft, setTimeLeft] = useState(TOTAL_TIME);
  const [warnings, setWarnings] = useState(0);
  const [modal, setModal] = useState(null); // "submit" | "quit" | null
  const [loading, setLoading] = useState(false);
  const [fetching, setFetching] = useState(true);
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const videoRef = useRef(null);
  const streamRef = useRef(null);
  const startTimeRef = useRef(Date.now());
  const submittedRef = useRef(false);
  const warningsRef = useRef(0);
  const answersRef = useRef({});

  const { toasts, push: toast } = useToast();

  // Keep answersRef in sync for submitExam closure
  useEffect(() => { answersRef.current = answers; }, [answers]);

  /* ── Fullscreen ── */
  useEffect(() => {
    document.documentElement.requestFullscreen().catch(() => {});
  }, []);

  /* ── Fetch questions ── */
  useEffect(() => {
    setFetching(true);
    api
      .get(`/api/exam/${examCode}/questions?lang=${lang}`)
      .then((res) => setQuestions(res.data.data || []))
      .catch(() => toast("Failed to load questions", "error"))
      .finally(() => setFetching(false));
  }, [examCode, lang]);

  /* ── Camera ── */
  useEffect(() => {
    navigator.mediaDevices
      .getUserMedia({ video: true, audio: false })
      .then((stream) => {
        streamRef.current = stream;
        if (videoRef.current) videoRef.current.srcObject = stream;
      })
      .catch(() => toast("Camera permission denied", "error"));
    return () => streamRef.current?.getTracks().forEach((t) => t.stop());
  }, []);

  /* ── Submit (memoized, stable ref) ── */
  const submitExam = useCallback(
    async (reason) => {
      if (submittedRef.current) return;
      submittedRef.current = true;

      try {
        setLoading(true);
        const timeTaken = Math.floor((Date.now() - startTimeRef.current) / 1000);
        streamRef.current?.getTracks().forEach((t) => t.stop());
        if (document.fullscreenElement) await document.exitFullscreen().catch(() => {});

        const res = await api.post("/api/submit", {
          exam_code: examCode,
          candidate_name,
          father_name,
          mobile_number,
          language: lang,
          answers: answersRef.current,
          time_taken: timeTaken,
          reason,
        });

        if (res.data.success) {
          toast("Exam submitted successfully!", "success");
          setTimeout(() => navigate("/", { replace: true }), 1200);
        } else {
          submittedRef.current = false;
          toast("Submission failed. Try again.", "error");
        }
      } catch {
        submittedRef.current = false;
        toast("Submission failed!", "error");
      } finally {
        setLoading(false);
      }
    },
    [examCode, candidate_name, father_name, mobile_number, lang, navigate]
  );

  /* ── Timer ── */
  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          submitExam("Time Up");
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
    return () => clearInterval(timer);
  }, [submitExam]);

  /* ── Tab switch detection ── */
  useEffect(() => {
    const handleViolation = () => {
      warningsRef.current += 1;
      const count = warningsRef.current;
      setWarnings(count);
      toast(`Tab Switch Warning ${count}/3`, "error");
      if (count >= 3) submitExam("Tab Switch 3 Times");
    };
    window.addEventListener("blur", handleViolation);
    return () => window.removeEventListener("blur", handleViolation);
  }, [submitExam]);

  /* ── Handle option select ── */
  const handleOption = useCallback(
    (opt) => {
      const q = questions[current];
      if (!q) return;
      setAnswers((prev) => ({ ...prev, [q.id]: opt }));
    },
    [questions, current]
  );

  const q = questions[current];
  const answeredCount = Object.keys(answers).length;
  const timerPercent = (timeLeft / TOTAL_TIME) * 100;
  const timerColor =
    timeLeft < 300 ? "#ef4444" : timeLeft < 600 ? "#f59e0b" : "#22c55e";

  return (
    <>
      {/* ── Global Styles ── */}
      <style>{`
        *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

        :root {
          --bg: #0f1117;
          --surface: #1a1d27;
          --surface2: #22263a;
          --border: #2e3350;
          --accent: #6366f1;
          --accent2: #818cf8;
          --text: #e2e8f0;
          --muted: #8892a4;
          --success: #22c55e;
          --danger: #ef4444;
          --warn: #f59e0b;
          --radius: 12px;
          --font: 'DM Sans', 'Segoe UI', sans-serif;
        }

        @import url('https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;600;700&family=DM+Mono:wght@400;500&display=swap');

        body { background: var(--bg); color: var(--text); font-family: var(--font); }

        .exam-root {
          display: grid;
          grid-template-columns: 280px 1fr;
          grid-template-rows: 56px 1fr;
          height: 100dvh;
          overflow: hidden;
        }

        /* ── Top Bar ── */
        .topbar {
          grid-column: 1 / -1;
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 0 20px;
          background: var(--surface);
          border-bottom: 1px solid var(--border);
          z-index: 100;
          gap: 12px;
        }

        .topbar-left { display: flex; align-items: center; gap: 12px; }

        .candidate-badge {
          font-size: 13px;
          color: var(--muted);
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
          max-width: 200px;
        }
        .candidate-badge span { color: var(--text); font-weight: 600; }

        .timer-pill {
          display: flex;
          align-items: center;
          gap: 8px;
          background: var(--surface2);
          border: 1px solid var(--border);
          border-radius: 999px;
          padding: 6px 14px;
          font-family: 'DM Mono', monospace;
          font-size: 15px;
          font-weight: 500;
          color: var(--timer-color, #22c55e);
          transition: color 0.3s;
        }

        .timer-dot {
          width: 8px; height: 8px;
          border-radius: 50%;
          background: var(--timer-color, #22c55e);
          animation: pulse 1s ease-in-out infinite;
        }
        @keyframes pulse {
          0%,100% { opacity:1; transform:scale(1); }
          50% { opacity:0.5; transform:scale(0.7); }
        }

        .warn-badge {
          display: flex; align-items: center; gap: 6px;
          background: #2d1f1f; border: 1px solid #5c2a2a;
          border-radius: 999px; padding: 5px 12px;
          font-size: 13px; color: var(--danger); font-weight: 600;
        }

        .hamburger {
          display: none;
          background: var(--surface2); border: 1px solid var(--border);
          border-radius: 8px; padding: 7px 10px; cursor: pointer;
          color: var(--text); font-size: 18px;
        }

        /* ── Sidebar ── */
        .sidebar {
          background: var(--surface);
          border-right: 1px solid var(--border);
          display: flex;
          flex-direction: column;
          overflow: hidden;
        }

        .sidebar-scroll {
          flex: 1;
          overflow-y: auto;
          padding: 16px;
          scrollbar-width: thin;
          scrollbar-color: var(--border) transparent;
        }

        .sidebar-section { margin-bottom: 20px; }
        .sidebar-label {
          font-size: 11px; font-weight: 700; letter-spacing: 0.1em;
          color: var(--muted); text-transform: uppercase; margin-bottom: 10px;
        }

        /* Camera */
        .camera-wrap {
          position: relative; border-radius: var(--radius);
          overflow: hidden; border: 1px solid var(--border);
          background: #0a0c14;
        }
        .camera-wrap video {
          width: 100%; height: 160px; object-fit: cover; display: block;
        }
        .camera-overlay {
          position: absolute; top: 6px; left: 6px;
          background: rgba(0,0,0,0.6); border-radius: 6px;
          padding: 3px 8px; font-size: 11px; color: #4ade80;
          display: flex; align-items: center; gap: 5px;
        }
        .rec-dot {
          width: 6px; height: 6px; border-radius: 50%;
          background: #ef4444; animation: pulse 1s infinite;
        }

        /* Progress */
        .progress-info {
          display: flex; justify-content: space-between;
          font-size: 12px; color: var(--muted); margin-bottom: 8px;
        }
        .progress-info span { color: var(--text); font-weight: 600; }
        .progress-bar-bg {
          height: 6px; background: var(--surface2); border-radius: 999px; overflow: hidden;
        }
        .progress-bar-fill {
          height: 100%; background: linear-gradient(90deg, var(--accent), var(--accent2));
          border-radius: 999px; transition: width 0.3s;
        }

        /* Palette */
        .palette-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(34px, 1fr));
          gap: 6px;
        }
        .palette-btn {
          height: 34px; border-radius: 8px; border: 1px solid var(--border);
          background: var(--surface2); color: var(--muted);
          font-size: 12px; font-weight: 600; cursor: pointer;
          transition: all 0.15s; display: flex; align-items: center; justify-content: center;
        }
        .palette-btn:hover { border-color: var(--accent); color: var(--accent); }
        .palette-btn.active {
          background: var(--accent); border-color: var(--accent);
          color: #fff; box-shadow: 0 0 12px rgba(99,102,241,0.4);
        }
        .palette-btn.answered:not(.active) {
          background: rgba(34,197,94,0.15); border-color: #22c55e; color: #22c55e;
        }

        /* Legend */
        .legend { display: flex; gap: 12px; flex-wrap: wrap; margin-top: 6px; }
        .legend-item { display: flex; align-items: center; gap: 5px; font-size: 11px; color: var(--muted); }
        .legend-dot { width: 10px; height: 10px; border-radius: 3px; }

        /* Sidebar action buttons */
        .sidebar-actions {
          padding: 14px;
          border-top: 1px solid var(--border);
          display: flex;
          flex-direction: column;
          gap: 8px;
        }

        /* ── Main Area ── */
        .main-area {
          display: flex;
          flex-direction: column;
          overflow: hidden;
        }

        .question-panel {
          flex: 1;
          overflow-y: auto;
          padding: 24px;
          scrollbar-width: thin;
          scrollbar-color: var(--border) transparent;
        }

        .q-header {
          display: flex;
          align-items: center;
          justify-content: space-between;
          margin-bottom: 20px;
        }
        .q-counter {
          font-size: 12px; color: var(--muted); font-weight: 600;
          text-transform: uppercase; letter-spacing: 0.08em;
        }
        .q-counter span { color: var(--accent2); }

        .category-tag {
          background: rgba(99,102,241,0.12); color: var(--accent2);
          border: 1px solid rgba(99,102,241,0.3);
          border-radius: 6px; padding: 3px 10px; font-size: 12px;
        }

        .question-text {
          font-size: clamp(15px, 2vw, 18px);
          font-weight: 500;
          line-height: 1.7;
          color: var(--text);
          margin-bottom: 28px;
          padding-bottom: 20px;
          border-bottom: 1px solid var(--border);
        }

        /* Options */
        .options-grid { display: flex; flex-direction: column; gap: 10px; }

        .option-card {
          position: relative;
          display: flex;
          align-items: center;
          gap: 14px;
          padding: 14px 16px;
          background: var(--surface2);
          border: 1.5px solid var(--border);
          border-radius: var(--radius);
          cursor: pointer;
          transition: all 0.15s ease;
          user-select: none;
        }
        .option-card:hover:not(.selected) {
          border-color: var(--accent);
          background: rgba(99,102,241,0.06);
        }
        .option-card.selected {
          border-color: var(--accent);
          background: rgba(99,102,241,0.12);
          box-shadow: 0 0 0 1px var(--accent);
        }

        .option-label {
          width: 32px; height: 32px;
          border-radius: 8px;
          border: 1.5px solid var(--border);
          display: flex; align-items: center; justify-content: center;
          font-size: 13px; font-weight: 700;
          color: var(--muted);
          flex-shrink: 0;
          transition: all 0.15s;
          font-family: 'DM Mono', monospace;
        }
        .option-card.selected .option-label {
          background: var(--accent); border-color: var(--accent); color: #fff;
        }
        .option-card:hover:not(.selected) .option-label { border-color: var(--accent); color: var(--accent); }

        .option-text { font-size: 14px; line-height: 1.5; color: var(--text); flex: 1; }

        .option-check {
          width: 20px; height: 20px;
          border-radius: 50%;
          background: var(--accent);
          display: flex; align-items: center; justify-content: center;
          opacity: 0; transform: scale(0.5);
          transition: all 0.2s;
        }
        .option-card.selected .option-check { opacity: 1; transform: scale(1); }
        .option-check::after {
          content: '✓'; color: #fff; font-size: 11px; font-weight: 700;
        }

        /* Navigation */
        .nav-row {
          padding: 16px 24px;
          border-top: 1px solid var(--border);
          display: flex;
          align-items: center;
          justify-content: space-between;
          background: var(--surface);
          gap: 12px;
        }

        .nav-btns { display: flex; gap: 8px; }

        .btn {
          display: inline-flex; align-items: center; gap: 6px;
          padding: 9px 18px; border-radius: 8px; border: none;
          font-size: 14px; font-weight: 600; cursor: pointer;
          font-family: var(--font); transition: all 0.15s;
          white-space: nowrap;
        }
        .btn:disabled { opacity: 0.4; cursor: not-allowed; }
        .btn-ghost {
          background: var(--surface2); color: var(--muted);
          border: 1px solid var(--border);
        }
        .btn-ghost:hover:not(:disabled) { border-color: var(--accent); color: var(--accent); }
        .btn-primary {
          background: var(--accent); color: #fff;
          box-shadow: 0 0 16px rgba(99,102,241,0.3);
        }
        .btn-primary:hover:not(:disabled) { background: var(--accent2); }
        .btn-success {
          background: linear-gradient(135deg, #16a34a, #22c55e); color: #fff;
          box-shadow: 0 0 16px rgba(34,197,94,0.3);
        }
        .btn-success:hover:not(:disabled) { filter: brightness(1.1); }
        .btn-danger {
          background: linear-gradient(135deg, #b91c1c, #ef4444); color: #fff;
          box-shadow: 0 0 16px rgba(239,68,68,0.25);
        }
        .btn-danger:hover:not(:disabled) { filter: brightness(1.1); }
        .btn-outline-danger {
          background: transparent; color: var(--danger);
          border: 1.5px solid var(--danger);
        }
        .btn-outline-danger:hover:not(:disabled) { background: rgba(239,68,68,0.08); }

        .skip-btn { font-size: 13px; color: var(--muted); background: none; border: none; cursor: pointer; }
        .skip-btn:hover { color: var(--text); }

        /* ── Loading Screen ── */
        .loading-screen {
          height: 100dvh; display: flex; align-items: center; justify-content: center;
          flex-direction: column; gap: 16px; background: var(--bg);
        }
        .spinner {
          width: 40px; height: 40px; border: 3px solid var(--border);
          border-top-color: var(--accent); border-radius: 50%;
          animation: spin 0.7s linear infinite;
        }
        @keyframes spin { to { transform: rotate(360deg); } }

        /* ── Modal ── */
        .modal-overlay {
          position: fixed; inset: 0; background: rgba(0,0,0,0.7);
          backdrop-filter: blur(6px); z-index: 1000;
          display: flex; align-items: center; justify-content: center; padding: 20px;
        }
        .modal-box {
          background: var(--surface); border: 1px solid var(--border);
          border-radius: 16px; padding: 28px; max-width: 420px; width: 100%;
          box-shadow: 0 24px 64px rgba(0,0,0,0.5);
          animation: popIn 0.2s ease;
        }
        @keyframes popIn { from { transform: scale(0.9); opacity:0; } to { transform:scale(1); opacity:1; } }
        .modal-icon {
          width: 52px; height: 52px; border-radius: 14px;
          display: flex; align-items: center; justify-content: center;
          font-size: 22px; margin-bottom: 16px;
        }
        .modal-title { font-size: 18px; font-weight: 700; margin-bottom: 8px; }
        .modal-body { font-size: 14px; color: var(--muted); line-height: 1.6; margin-bottom: 24px; }
        .modal-stats {
          background: var(--surface2); border-radius: 10px; padding: 14px;
          display: flex; gap: 20px; margin-bottom: 20px;
        }
        .stat { flex: 1; text-align: center; }
        .stat-value { font-size: 22px; font-weight: 700; color: var(--text); }
        .stat-label { font-size: 11px; color: var(--muted); margin-top: 2px; }
        .modal-btns { display: flex; gap: 10px; }
        .modal-btns .btn { flex: 1; justify-content: center; }

        /* ── Toasts ── */
        .toast-stack {
          position: fixed; top: 70px; right: 16px; z-index: 2000;
          display: flex; flex-direction: column; gap: 8px; pointer-events: none;
        }
        .toast-item {
          padding: 10px 16px; border-radius: 10px;
          font-size: 13px; font-weight: 500;
          animation: slideIn 0.25s ease;
          backdrop-filter: blur(10px); pointer-events: all;
          border: 1px solid transparent;
          max-width: 300px;
        }
        @keyframes slideIn { from { transform: translateX(20px); opacity:0; } }
        .toast-success { background: rgba(34,197,94,0.15); color: #4ade80; border-color: rgba(34,197,94,0.3); }
        .toast-error { background: rgba(239,68,68,0.15); color: #f87171; border-color: rgba(239,68,68,0.3); }
        .toast-info { background: rgba(99,102,241,0.15); color: var(--accent2); border-color: rgba(99,102,241,0.3); }

        /* ── Mobile Overlay Sidebar ── */
        .sidebar-backdrop {
          display: none;
          position: fixed; inset: 0; background: rgba(0,0,0,0.6);
          z-index: 200;
        }

        /* ── RESPONSIVE ── */
        @media (max-width: 900px) {
          .exam-root {
            grid-template-columns: 1fr;
            grid-template-rows: 56px 1fr;
          }

          .sidebar {
            position: fixed;
            left: 0; top: 56px; bottom: 0;
            width: 300px;
            z-index: 300;
            transform: translateX(-100%);
            transition: transform 0.28s cubic-bezier(0.4,0,0.2,1);
            border-right: 1px solid var(--border);
          }
          .sidebar.open { transform: translateX(0); }

          .sidebar-backdrop { display: block; }
          .sidebar-backdrop.open { display: block; }
          .sidebar-backdrop:not(.open) { display: none; }

          .hamburger { display: flex; align-items: center; }

          .question-panel { padding: 16px; }
          .nav-row { padding: 12px 16px; }
          .candidate-badge { display: none; }
        }

        @media (max-width: 500px) {
          .topbar { padding: 0 12px; }
          .timer-pill { font-size: 13px; padding: 5px 11px; }
          .warn-badge { font-size: 12px; padding: 4px 10px; }
          .question-text { font-size: 15px; }
          .btn { padding: 9px 14px; font-size: 13px; }
          .modal-box { padding: 20px; }
          .modal-stats { flex-direction: column; gap: 10px; }
        }
      `}</style>

      {/* ── Toast Stack ── */}
      <div className="toast-stack">
        {toasts.map((t) => (
          <div key={t.id} className={`toast-item toast-${t.type}`}>{t.msg}</div>
        ))}
      </div>

      {/* ── Loading ── */}
      {fetching && (
        <div className="loading-screen">
          <div className="spinner" />
          <p style={{ color: "var(--muted)", fontSize: 14 }}>Loading exam questions…</p>
        </div>
      )}

      {!fetching && (
        <div className="exam-root">
          {/* ── Top Bar ── */}
          <header className="topbar">
            <div className="topbar-left">
              <button className="hamburger" onClick={() => setSidebarOpen((o) => !o)} aria-label="Toggle sidebar">
                ☰
              </button>
              <div className="candidate-badge">
                Candidate: <span>{candidate_name || "—"}</span>
              </div>
            </div>

            <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
              {warnings > 0 && (
                <div className="warn-badge">
                  ⚠ {warnings}/3
                </div>
              )}
              <div className="timer-pill" style={{ "--timer-color": timerColor }}>
                <span className="timer-dot" />
                {pad(Math.floor(timeLeft / 60))}:{pad(timeLeft % 60)}
              </div>
            </div>
          </header>

          {/* ── Sidebar Backdrop (mobile) ── */}
          <div
            className={`sidebar-backdrop${sidebarOpen ? " open" : ""}`}
            onClick={() => setSidebarOpen(false)}
          />

          {/* ── Sidebar ── */}
          <aside className={`sidebar${sidebarOpen ? " open" : ""}`}>
            <div className="sidebar-scroll">
              {/* Camera */}
              <div className="sidebar-section">
                <div className="sidebar-label">📷 Proctoring</div>
                <div className="camera-wrap">
                  <video ref={videoRef} autoPlay muted playsInline />
                  <div className="camera-overlay">
                    <span className="rec-dot" />
                    LIVE
                  </div>
                </div>
              </div>

              {/* Progress */}
              <div className="sidebar-section">
                <div className="sidebar-label">Progress</div>
                <div className="progress-info">
                  <span>Answered</span>
                  <span>{answeredCount} / {questions.length}</span>
                </div>
                <div className="progress-bar-bg">
                  <div
                    className="progress-bar-fill"
                    style={{ width: `${questions.length ? (answeredCount / questions.length) * 100 : 0}%` }}
                  />
                </div>
              </div>

              {/* Timer bar */}
              <div className="sidebar-section">
                <div className="sidebar-label">Time Remaining</div>
                <div className="progress-info">
                  <span>Elapsed</span>
                  <span style={{ color: timerColor, fontFamily: "DM Mono, monospace" }}>
                    {pad(Math.floor(timeLeft / 60))}:{pad(timeLeft % 60)}
                  </span>
                </div>
                <div className="progress-bar-bg">
                  <div
                    style={{
                      height: "100%",
                      borderRadius: "999px",
                      background: timerColor,
                      width: `${timerPercent}%`,
                      transition: "width 1s linear, background 0.5s",
                    }}
                  />
                </div>
              </div>

              {/* Question palette */}
              <div className="sidebar-section">
                <div className="sidebar-label">Questions</div>
                <QuestionPalette
                  questions={questions}
                  answers={answers}
                  current={current}
                  onJump={(i) => { setCurrent(i); setSidebarOpen(false); }}
                />
                <div className="legend">
                  <div className="legend-item">
                    <div className="legend-dot" style={{ background: "var(--accent)" }} />
                    Current
                  </div>
                  <div className="legend-item">
                    <div className="legend-dot" style={{ background: "rgba(34,197,94,0.5)" }} />
                    Answered
                  </div>
                  <div className="legend-item">
                    <div className="legend-dot" style={{ background: "var(--surface2)", border: "1px solid var(--border)" }} />
                    Skipped
                  </div>
                </div>
              </div>
            </div>

            {/* Sidebar action buttons */}
            <div className="sidebar-actions">
              <button className="btn btn-success" onClick={() => setModal("submit")} disabled={loading}>
                ✓ Submit Exam
              </button>
              <button className="btn btn-outline-danger" onClick={() => setModal("quit")} disabled={loading}>
                ✕ Quit Exam
              </button>
            </div>
          </aside>

          {/* ── Main Area ── */}
          <main className="main-area">
            <div className="question-panel">
              <div className="q-header">
                <div className="q-counter">
                  Question <span>{current + 1}</span> of <span>{questions.length}</span>
                </div>
                {q?.category && <div className="category-tag">{q.category}</div>}
              </div>

              {q ? (
                <>
                  <p className="question-text">{q.question_text}</p>

                  <div className="options-grid">
                    {["a", "b", "c", "d"].map((opt) => {
                      const text = q[`option_${opt}`];
                      if (!text) return null;
                      const selected = answers[q.id] === opt;
                      return (
                        <div
                          key={opt}
                          className={`option-card${selected ? " selected" : ""}`}
                          onClick={() => handleOption(opt)}
                          role="radio"
                          aria-checked={selected}
                          tabIndex={0}
                          onKeyDown={(e) => e.key === "Enter" && handleOption(opt)}
                        >
                          <div className="option-label">{opt.toUpperCase()}</div>
                          <div className="option-text">{text}</div>
                          <div className="option-check" />
                        </div>
                      );
                    })}
                  </div>
                </>
              ) : (
                <p style={{ color: "var(--muted)", textAlign: "center", marginTop: 60 }}>
                  No question available.
                </p>
              )}
            </div>

            {/* Navigation */}
            <div className="nav-row">
              <div className="nav-btns">
                <button
                  className="btn btn-ghost"
                  disabled={current === 0}
                  onClick={() => setCurrent((c) => c - 1)}
                >
                  ← Back
                </button>
                <button
                  className="btn btn-primary"
                  disabled={current >= questions.length - 1}
                  onClick={() => setCurrent((c) => c + 1)}
                >
                  Next →
                </button>
              </div>
              <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
                {answers[q?.id] && (
                  <button
                    className="skip-btn"
                    onClick={() => {
                      setAnswers((prev) => {
                        const n = { ...prev };
                        delete n[q.id];
                        return n;
                      });
                    }}
                  >
                    Clear
                  </button>
                )}
                <span style={{ fontSize: 13, color: "var(--muted)" }}>
                  {answeredCount}/{questions.length} done
                </span>
              </div>
            </div>
          </main>
        </div>
      )}

      {/* ── Confirm Modal ── */}
      {modal && (
        <div className="modal-overlay" onClick={(e) => e.target === e.currentTarget && !loading && setModal(null)}>
          <div className="modal-box">
            <div
              className="modal-icon"
              style={{
                background: modal === "submit" ? "rgba(34,197,94,0.15)" : "rgba(239,68,68,0.15)",
              }}
            >
              {modal === "submit" ? "📋" : "⚠️"}
            </div>
            <div className="modal-title">
              {modal === "submit" ? "Submit Exam?" : "Quit Exam?"}
            </div>

            <div className="modal-stats">
              <div className="stat">
                <div className="stat-value" style={{ color: "#22c55e" }}>{answeredCount}</div>
                <div className="stat-label">Answered</div>
              </div>
              <div className="stat">
                <div className="stat-value" style={{ color: "#f59e0b" }}>
                  {questions.length - answeredCount}
                </div>
                <div className="stat-label">Unanswered</div>
              </div>
              <div className="stat">
                <div className="stat-value" style={{ color: "var(--accent2)", fontFamily: "DM Mono, monospace", fontSize: 18 }}>
                  {pad(Math.floor(timeLeft / 60))}:{pad(timeLeft % 60)}
                </div>
                <div className="stat-label">Time Left</div>
              </div>
            </div>

            <div className="modal-body">
              {modal === "submit"
                ? `You have answered ${answeredCount} out of ${questions.length} questions. This action cannot be undone.`
                : "Quitting will end your exam session and submit your current answers. This cannot be undone."}
            </div>

            <div className="modal-btns">
              <button className="btn btn-ghost" onClick={() => setModal(null)} disabled={loading}>
                Cancel
              </button>
              <button
                className={`btn ${modal === "submit" ? "btn-success" : "btn-danger"}`}
                onClick={() => {
                  setModal(null);
                  submitExam(modal === "submit" ? "Student Submitted" : "Student Quit");
                }}
                disabled={loading}
              >
                {loading ? (
                  <span style={{ display: "flex", alignItems: "center", gap: 8 }}>
                    <span className="spinner" style={{ width: 16, height: 16, borderWidth: 2 }} />
                    Submitting…
                  </span>
                ) : modal === "submit" ? "Confirm Submit" : "Quit Exam"}
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}