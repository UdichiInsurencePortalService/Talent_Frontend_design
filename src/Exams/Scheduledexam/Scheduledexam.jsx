import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const API_URL = "https://talent-backend-i83x.onrender.com";

const GlobalStyles = () => (
  <style>{`
    @import url('https://fonts.googleapis.com/css2?family=Sora:wght@300;400;500;600;700;800&family=JetBrains+Mono:wght@400;500;600&display=swap');

    *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

    body { font-family: 'Sora', sans-serif; background: #080d1a; min-height: 100vh; }

    .exam-bg {
      min-height: 100vh;
      background: #080d1a;
      background-image:
        radial-gradient(ellipse 90% 55% at 50% -10%, rgba(99,102,241,0.16) 0%, transparent 65%),
        radial-gradient(ellipse 45% 45% at 90% 90%, rgba(16,185,129,0.09) 0%, transparent 60%);
      display: flex;
      flex-direction: column;
      align-items: center;
      padding: 24px 16px 72px;
    }

    .topbar {
      width: 100%; max-width: 660px;
      display: flex; align-items: center; justify-content: space-between;
      margin-bottom: 20px; flex-wrap: wrap; gap: 8px;
    }
    .topbar-brand {
      display: flex; align-items: center; gap: 8px;
      font-size: 13px; font-weight: 700; color: #6366f1;
      letter-spacing: 0.04em; text-transform: uppercase;
    }
    .topbar-datetime { display: flex; align-items: center; gap: 8px; flex-wrap: wrap; }
    .dt-chip {
      display: flex; align-items: center; gap: 6px;
      background: rgba(255,255,255,0.04); border: 1px solid rgba(255,255,255,0.08);
      border-radius: 8px; padding: 5px 12px;
      font-size: 12px; font-family: 'JetBrains Mono', monospace;
      font-weight: 500; color: #94a3b8; white-space: nowrap;
    }
    .dt-live { color: #10b981; }

    .exam-card {
      width: 100%; max-width: 660px; border-radius: 20px;
      box-shadow: 0 24px 80px rgba(0,0,0,0.5);
      animation: slideUp 0.55s cubic-bezier(0.22,1,0.36,1) both;
    }
    @keyframes slideUp {
      from { opacity: 0; transform: translateY(32px); }
      to   { opacity: 1; transform: translateY(0); }
    }

    .exam-header {
      background: linear-gradient(140deg, #1a2240 0%, #131929 100%);
      border: 1px solid rgba(99,102,241,0.22); border-bottom: none;
      border-radius: 20px 20px 0 0;
      padding: 32px 36px 26px; position: relative; overflow: hidden;
    }
    .exam-header::before {
      content: ''; position: absolute; inset: 0;
      background: linear-gradient(120deg, rgba(99,102,241,0.07) 0%, transparent 55%);
      pointer-events: none;
    }
    .exam-header::after {
      content: ''; position: absolute; bottom: 0; left: 0; right: 0; height: 1px;
      background: linear-gradient(90deg, transparent, rgba(99,102,241,0.4), transparent);
    }
    .exam-badge {
      display: inline-flex; align-items: center; gap: 6px;
      background: rgba(99,102,241,0.14); border: 1px solid rgba(99,102,241,0.32);
      border-radius: 100px; padding: 4px 14px;
      font-size: 10.5px; font-weight: 700; color: #a5b4fc;
      letter-spacing: 0.1em; text-transform: uppercase; margin-bottom: 14px;
    }
    .exam-title {
      font-size: clamp(20px, 4.5vw, 28px); font-weight: 800; color: #f0f4ff;
      line-height: 1.2; margin-bottom: 18px; letter-spacing: -0.4px;
    }
    .exam-meta { display: flex; flex-wrap: wrap; gap: 10px; }
    .meta-chip {
      display: flex; align-items: center; gap: 6px;
      background: rgba(255,255,255,0.05); border: 1px solid rgba(255,255,255,0.09);
      border-radius: 8px; padding: 6px 13px; font-size: 12.5px; color: #94a3b8; font-weight: 500;
    }
    .meta-chip .val  { color: #e2e8f0; font-weight: 600; }
    .meta-chip .mono { font-family: 'JetBrains Mono', monospace; font-size: 12px; letter-spacing: 0.06em; }

    .exam-body {
      background: #0f1626;
      border: 1px solid rgba(255,255,255,0.06); border-top: none;
      border-radius: 0 0 20px 20px;
    }

    .section-block {
      padding: 26px 36px;
      border-bottom: 1px solid rgba(255,255,255,0.05);
    }
    .section-block:last-child { border-bottom: none; }

    .section-label {
      font-size: 10.5px; font-weight: 700; letter-spacing: 0.12em;
      text-transform: uppercase; color: #6366f1; margin-bottom: 16px;
      display: flex; align-items: center; gap: 8px;
    }
    .section-label::after { content: ''; flex: 1; height: 1px; background: rgba(99,102,241,0.18); }

    .instr-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 10px; }
    .instr-card {
      background: rgba(255,255,255,0.025); border: 1px solid rgba(255,255,255,0.06);
      border-radius: 12px; padding: 13px 15px;
      display: flex; align-items: flex-start; gap: 11px;
      transition: border-color 0.22s, background 0.22s, transform 0.18s;
    }
    .instr-card:hover      { border-color: rgba(99,102,241,0.32); background: rgba(99,102,241,0.05); transform: translateY(-1px); }
    .instr-card.warn:hover { border-color: rgba(239,68,68,0.3); background: rgba(239,68,68,0.04); }
    .instr-icon  { font-size: 19px; flex-shrink: 0; margin-top: 1px; }
    .instr-title { font-size: 11.5px; font-weight: 700; color: #e2e8f0; margin-bottom: 3px; }
    .instr-desc  { font-size: 11px; color: #4b5872; line-height: 1.55; }

    .result-row { display: flex; }
    .result-item { flex: 1; display: flex; align-items: center; gap: 12px; padding: 14px 0; }
    .result-item + .result-item { border-left: 1px solid rgba(255,255,255,0.05); padding-left: 22px; }
    .result-item:first-child { padding-right: 22px; }
    .result-icon-wrap { width: 38px; height: 38px; border-radius: 10px; display: grid; place-items: center; font-size: 17px; flex-shrink: 0; }
    .ri-green { background: rgba(16,185,129,0.1);  border: 1px solid rgba(16,185,129,0.22); }
    .ri-blue  { background: rgba(99,102,241,0.1);   border: 1px solid rgba(99,102,241,0.22); }
    .ri-amber { background: rgba(245,158,11,0.1);   border: 1px solid rgba(245,158,11,0.22); }
    .result-label { font-size: 10.5px; color: #4b5872; font-weight: 600; text-transform: uppercase; letter-spacing: 0.06em; margin-bottom: 3px; }
    .result-val   { font-size: 13px; color: #e2e8f0; font-weight: 700; font-family: 'JetBrains Mono', monospace; }

    /* ── FORM ── */
    .form-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 14px; }
    .form-grid .full { grid-column: 1 / -1; }
    .field-group { display: flex; flex-direction: column; }
    .field-label {
      display: flex; align-items: center; gap: 6px;
      font-size: 11px; font-weight: 700; color: #64748b;
      margin-bottom: 7px; letter-spacing: 0.07em; text-transform: uppercase;
    }

    .field-input,
    .field-select {
      width: 100%;
      background: rgba(255,255,255,0.04);
      border: 1px solid rgba(255,255,255,0.09);
      border-radius: 10px;
      padding: 11px 14px;
      font-size: 13.5px;
      color: #f1f5ff;
      font-family: 'Sora', sans-serif;
      outline: none;
      transition: border-color 0.2s, box-shadow 0.2s, background 0.2s;
    }
    .field-input::placeholder { color: #334155; }
    .field-input:focus,
    .field-select:focus {
      border-color: #6366f1;
      background: rgba(99,102,241,0.05);
      box-shadow: 0 0 0 3px rgba(99,102,241,0.11);
    }

    .field-select {
      appearance: none;
      -webkit-appearance: none;
      cursor: pointer;
      padding-right: 36px;
    }
    .field-select option {
      background: #1c2340;
      color: #f1f5ff;
      font-size: 14px;
    }

    .select-wrap { position: relative; }
    .select-wrap::after {
      content: '▾';
      position: absolute;
      right: 13px; top: 50%;
      transform: translateY(-50%);
      font-size: 14px; color: #64748b;
      pointer-events: none;
    }

    /* Start button */
    .start-btn {
      width: 100%; margin-top: 4px; padding: 15px;
      background: linear-gradient(135deg, #6366f1 0%, #4f46e5 100%);
      border: none; border-radius: 12px;
      color: #fff; font-size: 14.5px; font-weight: 700;
      font-family: 'Sora', sans-serif; letter-spacing: 0.03em;
      cursor: pointer; display: flex; align-items: center; justify-content: center; gap: 9px;
      transition: transform 0.18s, box-shadow 0.2s;
      box-shadow: 0 4px 20px rgba(99,102,241,0.35);
      position: relative; overflow: hidden;
    }
    .start-btn::before {
      content: ''; position: absolute; inset: 0;
      background: linear-gradient(120deg, rgba(255,255,255,0.13) 0%, transparent 55%);
      opacity: 0; transition: opacity 0.2s;
    }
    .start-btn:hover:not(:disabled)         { transform: translateY(-2px); box-shadow: 0 10px 34px rgba(99,102,241,0.5); }
    .start-btn:hover:not(:disabled)::before { opacity: 1; }
    .start-btn:active:not(:disabled)        { transform: translateY(0); }
    .start-btn:disabled                     { opacity: 0.45; cursor: not-allowed; }

    /* Loading */
    .loading-screen { min-height: 100vh; display: grid; place-items: center; background: #080d1a; }
    .loading-inner  { text-align: center; }
    .loading-spinner {
      width: 44px; height: 44px;
      border: 3px solid rgba(99,102,241,0.18); border-top-color: #6366f1;
      border-radius: 50%; animation: spin 0.85s linear infinite; margin: 0 auto 18px;
    }
    @keyframes spin { to { transform: rotate(360deg); } }
    .loading-text { color: #4b5872; font-size: 13px; font-family: 'Sora', sans-serif; }

    @media (max-width: 560px) {
      .exam-header, .section-block { padding-left: 18px; padding-right: 18px; }
      .exam-header                 { padding-top: 22px; padding-bottom: 18px; }
      .instr-grid, .form-grid      { grid-template-columns: 1fr; }
      .form-grid .full             { grid-column: 1; }
      .result-row                  { flex-direction: column; }
      .result-item + .result-item  { border-left: none; border-top: 1px solid rgba(255,255,255,0.05); padding-left: 0; padding-top: 14px; }
      .result-item:first-child     { padding-right: 0; padding-bottom: 14px; }
      .topbar                      { flex-direction: column; align-items: flex-start; }
    }
  `}</style>
);

/* ── constants ── */
const LANGUAGES = [
  { code: "en", label: "🇬🇧  English"        },
  { code: "hi", label: "🇮🇳  Hindi — हिन्दी"  },
];

const instructions = [
  { icon: "🚫", title: "No Tab Switching",  desc: "Switching tabs will be flagged and may disqualify you.",  warn: true  },
  { icon: "📷", title: "Camera Monitoring", desc: "AI proctoring is active. Keep your face visible.",         warn: true  },
  { icon: "🤖", title: "AI Anti-Cheat",     desc: "Suspicious eye movement and screen activity is tracked.",  warn: true  },
  { icon: "📵", title: "No External Aids",  desc: "No books, notes, or extra devices allowed.",               warn: true  },
  { icon: "⏱️", title: "Fixed Duration",    desc: "Timer starts on question 1. You cannot pause.",            warn: false },
  { icon: "✅", title: "Instant Result",    desc: "Score report is generated right after submission.",         warn: false },
];

/* ── localStorage key ── */
const LS_KEY = "examCandidateInfo";

/* ── helpers ── */
function saveToLocalStorage(examCode, form) {
  const payload = {
    exam_code:      examCode,
    candidate_name: form.candidate_name.trim(),
    father_name:    form.father_name.trim(),
    mobile_number:  form.mobile_number.trim(),
    language:       form.language,
    saved_at:       new Date().toISOString(),   // timestamp for debugging / expiry
  };
  localStorage.setItem(LS_KEY, JSON.stringify(payload));
  return payload;
}

function loadFromLocalStorage() {
  try {
    const raw = localStorage.getItem(LS_KEY);
    return raw ? JSON.parse(raw) : null;
  } catch {
    return null;
  }
}

/* ── live clock ── */
function useLiveClock() {
  const [now, setNow] = useState(new Date());
  useEffect(() => {
    const id = setInterval(() => setNow(new Date()), 1000);
    return () => clearInterval(id);
  }, []);
  return now;
}

/* ════════════════════════════════════════════
   MAIN COMPONENT
════════════════════════════════════════════ */
export default function ScheduledExam() {
  const { examCode } = useParams();
  const navigate     = useNavigate();
  const now          = useLiveClock();

  const [loading, setLoading] = useState(false);
  const [exam,    setExam]    = useState(null);

  /* Pre-fill form from localStorage if same exam code was used before */
  const [form, setForm] = useState(() => {
    const saved = loadFromLocalStorage();
    if (saved && saved.exam_code === examCode) {
      return {
        candidate_name: saved.candidate_name || "",
        father_name:    saved.father_name    || "",
        mobile_number:  saved.mobile_number  || "",
        language:       saved.language       || "en",
      };
    }
    return { candidate_name: "", father_name: "", mobile_number: "", language: "en" };
  });

  /* Fetch exam details */
  useEffect(() => {
    axios
      .get(`${API_URL}/api/scheduled-exam/${examCode}`)
      .then((r) => setExam(r.data.data))
      .catch(()  => toast.error("Invalid or expired exam link."));
  }, [examCode]);

  /* Auto-save to localStorage on every form change */
  useEffect(() => {
    if (!examCode) return;
    const payload = {
      exam_code:      examCode,
      candidate_name: form.candidate_name,
      father_name:    form.father_name,
      mobile_number:  form.mobile_number,
      language:       form.language,
      saved_at:       new Date().toISOString(),
    };
    localStorage.setItem(LS_KEY, JSON.stringify(payload));
  }, [form, examCode]);

  const handleChange = (e) =>
    setForm((p) => ({ ...p, [e.target.name]: e.target.value }));

  const handleStart = () => {
    const { candidate_name, father_name, mobile_number } = form;

    /* Validation */
    if (!candidate_name.trim()) {
      toast.error("Please enter candidate name.");
      return;
    }
    if (!father_name.trim()) {
      toast.error("Please enter father's name.");
      return;
    }
    if (!mobile_number.trim()) {
      toast.error("Please enter mobile number.");
      return;
    }
    if (!/^\d{10}$/.test(mobile_number.trim())) {
      toast.error("Mobile number must be exactly 10 digits.");
      return;
    }

    /* Save final confirmed data to localStorage */
    const payload = saveToLocalStorage(examCode, form);

    // Also keep a clean "candidateInfo" key for backward compat
    // with whatever StartExam page reads
    localStorage.setItem("candidateInfo", JSON.stringify(payload));

    // Clear any stale exam state
    localStorage.removeItem("examStarted");
    localStorage.removeItem("examAnswers");

    setLoading(true);
    navigate(`/startexam/${examCode}?lang=${form.language}`);
  };

  const dateStr = now.toLocaleDateString("en-IN", {
    weekday: "short", day: "2-digit", month: "short", year: "numeric",
  });
  const timeStr = now.toLocaleTimeString("en-IN", {
    hour: "2-digit", minute: "2-digit", second: "2-digit", hour12: true,
  });

  /* ── Loading screen ── */
  if (!exam) return (
    <>
      <GlobalStyles />
      <div className="loading-screen">
        <div className="loading-inner">
          <div className="loading-spinner" />
          <p className="loading-text">Fetching exam details…</p>
        </div>
      </div>
    </>
  );

  return (
    <>
      <GlobalStyles />
      <ToastContainer theme="dark" position="top-right" />

      <div className="exam-bg">

        {/* TOP BAR */}
        <div className="topbar">
          <div className="topbar-brand"><span>🎓</span> ExamPortal</div>
          <div className="topbar-datetime">
            <div className="dt-chip"><span>📅</span> {dateStr}</div>
            <div className="dt-chip"><span>🕐</span> <span className="dt-live">{timeStr}</span></div>
          </div>
        </div>

        <div className="exam-card">

          {/* HEADER */}
          <div className="exam-header">
            <div className="exam-badge">📋 &nbsp;Scheduled Examination</div>
            <h1 className="exam-title">{exam.exam_name}</h1>
            <div className="exam-meta">
              <div className="meta-chip"><span>📚</span> Subject:&nbsp;<span className="val">{exam.subject_name}</span></div>
              <div className="meta-chip"><span>⏳</span> Duration:&nbsp;<span className="val">{exam.duration_minutes} min</span></div>
              <div className="meta-chip"><span>🔑</span> Code:&nbsp;<span className="val mono">{examCode}</span></div>
            </div>
          </div>

          <div className="exam-body">

            {/* INSTRUCTIONS */}
            <div className="section-block">
              <div className="section-label">📌 &nbsp;Exam Instructions</div>
              <div className="instr-grid">
                {instructions.map((ins, i) => (
                  <div key={i} className={`instr-card${ins.warn ? " warn" : ""}`}>
                    <span className="instr-icon">{ins.icon}</span>
                    <div>
                      <div className="instr-title">{ins.title}</div>
                      <div className="instr-desc">{ins.desc}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* RESULT INFO */}
            <div className="section-block">
              <div className="section-label">📊 &nbsp;Result & Scoring</div>
              <div className="result-row">
                <div className="result-item">
                  <div className="result-icon-wrap ri-green">📊</div>
                  <div><div className="result-label">Result</div><div className="result-val">Instant</div></div>
                </div>
                <div className="result-item">
                  <div className="result-icon-wrap ri-blue">🏆</div>
                  <div><div className="result-label">Score</div><div className="result-val">Auto-Graded</div></div>
                </div>
                <div className="result-item">
                  <div className="result-icon-wrap ri-amber">📄</div>
                  <div><div className="result-label">Report</div><div className="result-val">Downloadable</div></div>
                </div>
              </div>
            </div>

            {/* CANDIDATE FORM */}
            <div className="section-block">
              <div className="section-label">👤 &nbsp;Candidate Details</div>

              <div className="form-grid">

                <div className="field-group">
                  <div className="field-label"><span>✏️</span> Candidate Name</div>
                  <input
                    className="field-input"
                    name="candidate_name"
                    placeholder="Your full name"
                    value={form.candidate_name}
                    onChange={handleChange}
                  />
                </div>

                <div className="field-group">
                  <div className="field-label"><span>👨‍👦</span> Father's Name</div>
                  <input
                    className="field-input"
                    name="father_name"
                    placeholder="Father's full name"
                    value={form.father_name}
                    onChange={handleChange}
                  />
                </div>

                <div className="field-group">
                  <div className="field-label"><span>📱</span> Mobile Number</div>
                  <input
                    className="field-input"
                    name="mobile_number"
                    placeholder="10-digit mobile number"
                    value={form.mobile_number}
                    onChange={handleChange}
                    type="tel"
                    maxLength={10}
                  />
                </div>

                <div className="field-group">
                  <div className="field-label"><span>🌐</span> Language</div>
                  <div className="select-wrap">
                    <select
                      className="field-select"
                      name="language"
                      value={form.language}
                      onChange={handleChange}
                    >
                      {LANGUAGES.map((l) => (
                        <option key={l.code} value={l.code}>{l.label}</option>
                      ))}
                    </select>
                  </div>
                </div>

                <div className="full">
                  <button className="start-btn" onClick={handleStart} disabled={loading}>
                    <span>🚀</span>
                    {loading ? "Starting…" : "Start Exam"}
                  </button>
                </div>

              </div>
            </div>

          </div>
        </div>
      </div>
    </>
  );
}