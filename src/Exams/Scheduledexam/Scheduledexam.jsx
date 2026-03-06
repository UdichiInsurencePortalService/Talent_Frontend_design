import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState, useCallback } from "react";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const API_URL = "https://talent-backend-i83x.onrender.com";

const instructions = [
  {
    icon: "🚫",
    title: "No Tab Switching",
    titleHi: "टैब न बदलें",
    desc: "Switching tabs will be flagged and may disqualify you.",
    descHi: "टैब बदलने पर आपको अयोग्य घोषित किया जा सकता है।",
    warn: true,
    color: "#ef4444",
    bg: "#fef2f2",
    border: "#fecaca",
  },
  {
    icon: "📷",
    title: "Camera Monitoring",
    titleHi: "कैमरा निगरानी",
    desc: "AI proctoring is active. Keep your face visible.",
    descHi: "AI निगरानी सक्रिय है। अपना चेहरा दिखाई दे रखें।",
    warn: true,
    color: "#f97316",
    bg: "#fff7ed",
    border: "#fed7aa",
  },
  {
    icon: "🤖",
    title: "AI Anti-Cheat",
    titleHi: "AI नकल-रोधी",
    desc: "Suspicious eye movement and screen activity is tracked.",
    descHi: "संदिग्ध नेत्र गतिविधि और स्क्रीन उपयोग पर नज़र रखी जाती है।",
    warn: true,
    color: "#8b5cf6",
    bg: "#f5f3ff",
    border: "#ddd6fe",
  },
  {
    icon: "📵",
    title: "No External Aids",
    titleHi: "बाहरी सहायता नहीं",
    desc: "No books, notes, or extra devices allowed.",
    descHi: "किताबें, नोट्स या अतिरिक्त उपकरण की अनुमति नहीं है।",
    warn: true,
    color: "#dc2626",
    bg: "#fef2f2",
    border: "#fecaca",
  },
  {
    icon: "⏱️",
    title: "Fixed Duration",
    titleHi: "निश्चित समय",
    desc: "Timer starts on question 1. You cannot pause.",
    descHi: "टाइमर पहले प्रश्न पर शुरू होता है। रोका नहीं जा सकता।",
    warn: false,
    color: "#0ea5e9",
    bg: "#f0f9ff",
    border: "#bae6fd",
  },
  {
    icon: "✅",
    title: "Instant Result",
    titleHi: "तुरंत परिणाम",
    desc: "Score report is generated right after submission.",
    descHi: "जमा करने के तुरंत बाद स्कोर रिपोर्ट तैयार हो जाती है।",
    warn: false,
    color: "#10b981",
    bg: "#f0fdf4",
    border: "#bbf7d0",
  },
];

const LANGUAGES = [
  { code: "en", label: "🇬🇧  English" },
  { code: "hi", label: "🇮🇳  Hindi — हिन्दी" },
];

const LS_KEY = "examCandidateInfo";

function saveToLocalStorage(examCode, form) {
  const payload = {
    exam_code: examCode,
    candidate_name: form.candidate_name.trim(),
    father_name: form.father_name.trim(),
    mobile_number: form.mobile_number.trim(),
    language: form.language,
    saved_at: new Date().toISOString(),
  };
  try { localStorage.setItem(LS_KEY, JSON.stringify(payload)); } catch {}
  return payload;
}

function loadFromLocalStorage() {
  try {
    const raw = localStorage.getItem(LS_KEY);
    return raw ? JSON.parse(raw) : null;
  } catch { return null; }
}

function useLiveClock() {
  const [now, setNow] = useState(new Date());
  useEffect(() => {
    const id = setInterval(() => setNow(new Date()), 1000);
    return () => clearInterval(id);
  }, []);
  return now;
}

const GlobalStyles = () => (
  <style>{`
    @import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@300;400;500;600;700;800&family=Fira+Code:wght@400;500;600&display=swap');

    *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

    body {
      font-family: 'Plus Jakarta Sans', sans-serif;
      background: #f0f4ff;
      min-height: 100vh;
    }

    /* ── PAGE ── */
    .exam-page {
      min-height: 100vh;
      width: 100%;
      background: linear-gradient(145deg, #eef2ff 0%, #f0f9ff 40%, #faf5ff 70%, #f0fdf4 100%);
      position: relative;
      overflow-x: hidden;
    }

    /* Decorative blobs */
    .page-blob {
      position: fixed;
      border-radius: 50%;
      filter: blur(80px);
      pointer-events: none;
      z-index: 0;
      opacity: 0.45;
    }
    .blob-1 { width: 600px; height: 600px; background: radial-gradient(circle, #c7d2fe, transparent 70%); top: -200px; right: -200px; }
    .blob-2 { width: 500px; height: 500px; background: radial-gradient(circle, #bbf7d0, transparent 70%); bottom: -100px; left: -100px; }
    .blob-3 { width: 350px; height: 350px; background: radial-gradient(circle, #ddd6fe, transparent 70%); top: 40%; left: 30%; }

    /* ── CONTENT WRAPPER ── */
    .exam-wrapper {
      position: relative; z-index: 1;
      width: 100%;
      max-width: 1200px;
      margin: 0 auto;
      padding: 0 20px 80px;
    }

    /* ── TOPBAR ── */
    .topbar {
      display: flex; align-items: center; justify-content: space-between;
      padding: 20px 0 24px;
      flex-wrap: wrap; gap: 12px;
    }
    .brand {
      display: flex; align-items: center; gap: 10px;
    }
    .brand-icon {
      width: 40px; height: 40px; border-radius: 10px;
      background: linear-gradient(135deg, #6366f1, #4f46e5);
      display: grid; place-items: center; font-size: 18px;
      box-shadow: 0 4px 12px rgba(99,102,241,0.35);
    }
    .brand-text { font-size: 17px; font-weight: 800; color: #1e1b4b; letter-spacing: -0.3px; }
    .brand-sub  { font-size: 11px; color: #6366f1; font-weight: 600; letter-spacing: 0.06em; text-transform: uppercase; }

    .topbar-right { display: flex; align-items: center; gap: 10px; flex-wrap: wrap; }
    .dt-pill {
      display: flex; align-items: center; gap: 7px;
      background: rgba(255,255,255,0.85); backdrop-filter: blur(12px);
      border: 1px solid rgba(99,102,241,0.2); border-radius: 50px;
      padding: 7px 16px; font-size: 12px; font-weight: 600;
      color: #334155; box-shadow: 0 2px 8px rgba(99,102,241,0.1);
      white-space: nowrap;
    }
    .dt-pill .live { color: #10b981; font-family: 'Fira Code', monospace; font-weight: 700; }

    /* ── HERO HEADER ── */
    .hero {
      background: linear-gradient(135deg, #4f46e5 0%, #6366f1 40%, #7c3aed 100%);
      border-radius: 24px;
      padding: 48px 56px;
      position: relative; overflow: hidden;
      margin-bottom: 24px;
      box-shadow: 0 20px 60px rgba(79,70,229,0.35);
    }
    .hero::before {
      content: ''; position: absolute; inset: 0;
      background: url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.04'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E");
    }
    .hero::after {
      content: ''; position: absolute;
      right: -60px; top: -80px;
      width: 400px; height: 400px;
      border-radius: 50%;
      background: rgba(255,255,255,0.06);
    }
    .hero-badge {
      display: inline-flex; align-items: center; gap: 7px;
      background: rgba(255,255,255,0.18); border: 1px solid rgba(255,255,255,0.3);
      border-radius: 50px; padding: 5px 16px;
      font-size: 11px; font-weight: 700; color: #e0e7ff;
      letter-spacing: 0.1em; text-transform: uppercase; margin-bottom: 18px;
    }
    .hero-title {
      font-size: clamp(22px, 3.5vw, 38px); font-weight: 800;
      color: #fff; line-height: 1.15; margin-bottom: 24px;
      letter-spacing: -0.6px; max-width: 600px;
    }
    .hero-chips { display: flex; flex-wrap: wrap; gap: 10px; position: relative; z-index: 1; }
    .hero-chip {
      display: flex; align-items: center; gap: 7px;
      background: rgba(255,255,255,0.15); backdrop-filter: blur(8px);
      border: 1px solid rgba(255,255,255,0.25); border-radius: 10px;
      padding: 8px 16px; font-size: 13px; color: #e0e7ff; font-weight: 600;
    }
    .hero-chip .chip-val { color: #fff; font-weight: 800; }
    .hero-chip .mono { font-family: 'Fira Code', monospace; font-size: 12px; letter-spacing: 0.07em; }

    /* ── TWO COLUMN LAYOUT ── */
    .main-grid {
      display: grid;
      grid-template-columns: 1fr 380px;
      gap: 24px;
      align-items: start;
    }

    /* ── CARD ── */
    .card {
      background: rgba(255,255,255,0.92);
      backdrop-filter: blur(20px);
      border: 1px solid rgba(255,255,255,0.9);
      border-radius: 20px;
      box-shadow: 0 8px 32px rgba(99,102,241,0.08), 0 1px 0 rgba(255,255,255,0.9) inset;
      overflow: hidden;
      margin-bottom: 0;
    }

    .card-header {
      padding: 22px 28px 18px;
      border-bottom: 1px solid #f1f5f9;
      display: flex; align-items: center; gap: 10px;
    }
    .card-header-icon {
      width: 34px; height: 34px; border-radius: 9px;
      display: grid; place-items: center; font-size: 15px; flex-shrink: 0;
    }
    .chi-indigo { background: #eef2ff; }
    .chi-green  { background: #f0fdf4; }
    .chi-amber  { background: #fffbeb; }
    .card-header-title { font-size: 13px; font-weight: 800; color: #1e1b4b; letter-spacing: 0.04em; text-transform: uppercase; }
    .card-header-sub   { font-size: 11px; color: #94a3b8; font-weight: 500; margin-top: 1px; }

    /* ── INSTRUCTIONS ── */
    .instr-grid {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 0;
    }
    .instr-item {
      padding: 20px 24px;
      border-right: 1px solid #f1f5f9;
      border-bottom: 1px solid #f1f5f9;
      display: flex; gap: 14px;
      transition: background 0.2s;
      cursor: default;
    }
    .instr-item:hover { background: #fafbff; }
    .instr-item:nth-child(2n) { border-right: none; }
    .instr-item:nth-child(5),
    .instr-item:nth-child(6) { border-bottom: none; }

    .instr-icon-wrap {
      width: 42px; height: 42px; border-radius: 12px;
      display: grid; place-items: center; font-size: 20px;
      flex-shrink: 0; border: 1.5px solid;
    }
    .instr-texts { flex: 1; }
    .instr-en-title  { font-size: 13px; font-weight: 800; color: #1e293b; margin-bottom: 1px; }
    .instr-hi-title  { font-size: 12px; font-weight: 700; color: #64748b; margin-bottom: 6px; }
    .instr-en-desc   { font-size: 11.5px; color: #475569; line-height: 1.55; }
    .instr-hi-desc   { font-size: 11px; color: #94a3b8; line-height: 1.5; margin-top: 4px; font-style: italic; }
    .instr-lang-badge {
      display: inline-block;
      font-size: 9px; font-weight: 700;
      letter-spacing: 0.07em; text-transform: uppercase;
      padding: 2px 6px; border-radius: 4px; margin-right: 4px; margin-bottom: 2px;
    }
    .lb-en { background: #eff6ff; color: #3b82f6; }
    .lb-hi { background: #fef3c7; color: #d97706; }

    /* ── SCORING ROW ── */
    .scoring-row {
      display: flex;
    }
    .score-item {
      flex: 1; padding: 22px 24px;
      display: flex; align-items: center; gap: 14px;
      border-right: 1px solid #f1f5f9;
    }
    .score-item:last-child { border-right: none; }
    .score-icon {
      width: 46px; height: 46px; border-radius: 12px;
      display: grid; place-items: center; font-size: 20px; flex-shrink: 0;
    }
    .si-green { background: #f0fdf4; }
    .si-indigo { background: #eef2ff; }
    .si-amber { background: #fffbeb; }
    .score-label { font-size: 10px; color: #94a3b8; font-weight: 700; text-transform: uppercase; letter-spacing: 0.08em; margin-bottom: 3px; }
    .score-val   { font-size: 14px; font-weight: 800; color: #1e293b; }
    .score-val-sub { font-size: 10px; color: #94a3b8; margin-top: 1px; }

    /* ── RIGHT: FORM CARD ── */
    .form-card {
      background: rgba(255,255,255,0.95);
      backdrop-filter: blur(20px);
      border: 1px solid rgba(255,255,255,0.9);
      border-radius: 20px;
      box-shadow: 0 8px 32px rgba(99,102,241,0.1), 0 1px 0 rgba(255,255,255,0.9) inset;
      overflow: hidden;
      position: sticky;
      top: 24px;
    }

    .form-card-header {
      background: linear-gradient(135deg, #f8faff, #eef2ff);
      padding: 24px 28px 20px;
      border-bottom: 1px solid #e0e7ff;
    }
    .form-card-title { font-size: 16px; font-weight: 800; color: #1e1b4b; margin-bottom: 2px; }
    .form-card-sub   { font-size: 11px; color: #6366f1; font-weight: 600; letter-spacing: 0.05em; }

    .form-body { padding: 24px 28px; }

    .field { margin-bottom: 18px; }
    .field:last-child { margin-bottom: 0; }

    .field-label {
      font-size: 11px; font-weight: 800; color: #374151;
      letter-spacing: 0.07em; text-transform: uppercase;
      margin-bottom: 7px; display: flex; align-items: center; gap: 5px;
    }
    .field-label .req { color: #6366f1; }
    .field-label-hi { font-size: 10.5px; color: #94a3b8; font-weight: 500; margin-left: auto; }

    .field-input, .field-select {
      width: 100%;
      background: #f8faff;
      border: 1.5px solid #e2e8f0;
      border-radius: 11px;
      padding: 12px 14px;
      font-size: 13.5px;
      color: #1e293b;
      font-family: 'Plus Jakarta Sans', sans-serif;
      font-weight: 500;
      outline: none;
      transition: border-color 0.2s, box-shadow 0.2s, background 0.2s;
      -webkit-appearance: none;
    }
    .field-input::placeholder { color: #c4cdd8; font-weight: 400; }
    .field-input:focus, .field-select:focus {
      border-color: #6366f1;
      background: #fff;
      box-shadow: 0 0 0 3.5px rgba(99,102,241,0.13);
    }
    .field-input:hover:not(:focus), .field-select:hover:not(:focus) { border-color: #a5b4fc; }

    .select-wrap { position: relative; }
    .select-wrap::after {
      content: '▾'; position: absolute; right: 14px; top: 50%;
      transform: translateY(-50%); color: #6366f1; pointer-events: none; font-size: 13px;
    }
    .field-select { padding-right: 36px; cursor: pointer; appearance: none; }
    .field-select option { background: #fff; }

    .field-hint { font-size: 10.5px; color: #94a3b8; margin-top: 5px; display: flex; align-items: center; gap: 4px; }

    .start-btn {
      width: 100%; margin-top: 4px; padding: 16px 20px;
      background: linear-gradient(135deg, #6366f1 0%, #4f46e5 50%, #7c3aed 100%);
      border: none; border-radius: 13px;
      color: #fff; font-size: 15px; font-weight: 800;
      font-family: 'Plus Jakarta Sans', sans-serif;
      cursor: pointer; display: flex; align-items: center; justify-content: center; gap: 9px;
      transition: transform 0.18s, box-shadow 0.2s;
      box-shadow: 0 6px 24px rgba(99,102,241,0.45);
      letter-spacing: -0.2px; position: relative; overflow: hidden;
    }
    .start-btn::before {
      content: ''; position: absolute; inset: 0;
      background: linear-gradient(120deg, rgba(255,255,255,0.2) 0%, transparent 50%);
      opacity: 0; transition: opacity 0.2s;
    }
    .start-btn:hover:not(:disabled)         { transform: translateY(-2px); box-shadow: 0 12px 36px rgba(99,102,241,0.5); }
    .start-btn:hover:not(:disabled)::before { opacity: 1; }
    .start-btn:active:not(:disabled)        { transform: translateY(0px); }
    .start-btn:disabled                     { opacity: 0.55; cursor: not-allowed; }

    .start-btn-sub { font-size: 11px; opacity: 0.8; font-weight: 500; }

    /* ── LOADING ── */
    .loading-page { min-height: 100vh; display: grid; place-items: center; background: #f0f4ff; }
    .loading-box {
      text-align: center; padding: 48px;
      background: white; border-radius: 20px;
      box-shadow: 0 8px 40px rgba(99,102,241,0.12);
    }
    .loading-spinner {
      width: 46px; height: 46px; margin: 0 auto 18px;
      border: 3px solid #e0e7ff; border-top-color: #6366f1;
      border-radius: 50%; animation: spin 0.85s linear infinite;
    }
    @keyframes spin { to { transform: rotate(360deg); } }
    .loading-text { color: #6366f1; font-size: 14px; font-weight: 600; font-family: 'Plus Jakarta Sans', sans-serif; }

    /* ── DIVIDER ── */
    .or-divider {
      display: flex; align-items: center; gap: 10px; margin: 20px 0 0;
    }
    .or-line { flex: 1; height: 1px; background: #e2e8f0; }
    .or-text  { font-size: 10.5px; color: #94a3b8; font-weight: 700; letter-spacing: 0.06em; text-transform: uppercase; }

    /* ── RESPONSIVE ── */
    @media (max-width: 960px) {
      .main-grid { grid-template-columns: 1fr; }
      .form-card { position: static; }
      .hero { padding: 36px 28px; }
    }
    @media (max-width: 640px) {
      .exam-wrapper { padding: 0 12px 60px; }
      .topbar { padding: 14px 0 18px; }
      .hero { padding: 28px 20px; border-radius: 18px; margin-bottom: 18px; }
      .hero-title { font-size: 22px; }
      .hero::after { display: none; }
      .instr-grid { grid-template-columns: 1fr; }
      .instr-item { border-right: none !important; }
      .instr-item:nth-child(5) { border-bottom: 1px solid #f1f5f9 !important; }
      .instr-item:last-child { border-bottom: none !important; }
      .scoring-row { flex-direction: column; }
      .score-item { border-right: none !important; border-bottom: 1px solid #f1f5f9; }
      .score-item:last-child { border-bottom: none; }
      .form-card-header { padding: 20px 20px 16px; }
      .form-body { padding: 20px; }
      .card-header { padding: 18px 20px 14px; }
      .instr-item { padding: 16px 20px; }
      .brand-text { font-size: 15px; }
    }
    @media (max-width: 420px) {
      .hero-chips { gap: 7px; }
      .hero-chip  { font-size: 12px; padding: 7px 12px; }
      .start-btn  { font-size: 14px; padding: 14px 16px; }
    }
  `}</style>
);

export default function ScheduledExam() {
  const { examCode } = useParams();
  const navigate     = useNavigate();
  const now          = useLiveClock();

  const [loading, setLoading] = useState(false);
  const [exam,    setExam]    = useState(null);

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

  useEffect(() => {
    if (!examCode) return;
    axios
      .get(`${API_URL}/api/scheduled-exam/${examCode}`)
      .then((r) => setExam(r.data.data))
      .catch(()  => toast.error("Invalid or expired exam link."));
  }, [examCode]);

  useEffect(() => {
    if (!examCode) return;
    const payload = { exam_code: examCode, ...form, saved_at: new Date().toISOString() };
    try { localStorage.setItem(LS_KEY, JSON.stringify(payload)); } catch {}
  }, [form, examCode]);

  const handleChange = useCallback((e) =>
    setForm((p) => ({ ...p, [e.target.name]: e.target.value })), []);

  const handleStart = useCallback(() => {
    const { candidate_name, father_name, mobile_number } = form;
    if (!candidate_name.trim())  return toast.error("Please enter your full name.");
    if (!father_name.trim())     return toast.error("Please enter father's name.");
    if (!mobile_number.trim())   return toast.error("Please enter mobile number.");
    if (!/^\d{10}$/.test(mobile_number.trim())) return toast.error("Mobile number must be exactly 10 digits.");

    const payload = saveToLocalStorage(examCode, form);
    try {
      localStorage.setItem("candidateInfo",  JSON.stringify(payload));
      localStorage.removeItem("examStarted");
      localStorage.removeItem("examAnswers");
    } catch {}

    setLoading(true);
    navigate(`/startexam/${examCode}?lang=${form.language}`);
  }, [form, examCode, navigate]);

  const dateStr = now.toLocaleDateString("en-IN", { weekday: "short", day: "2-digit", month: "short", year: "numeric" });
  const timeStr = now.toLocaleTimeString("en-IN", { hour: "2-digit", minute: "2-digit", second: "2-digit", hour12: true });

  if (!exam) return (
    <>
      <GlobalStyles />
      <div className="loading-page">
        <div className="loading-box">
          <div className="loading-spinner" />
          <p className="loading-text">Fetching exam details…</p>
        </div>
      </div>
    </>
  );

  return (
    <>
      <GlobalStyles />
      <ToastContainer theme="light" position="top-right" autoClose={3500} />

      <div className="exam-page">
        <div className="page-blob blob-1" />
        <div className="page-blob blob-2" />
        <div className="page-blob blob-3" />

        <div className="exam-wrapper">

          {/* TOPBAR */}
          <div className="topbar">
            <div className="brand">
              <div className="brand-icon">🎓</div>
              <div>
                <div className="brand-text">ExamPortal</div>
                <div className="brand-sub">Online Assessment</div>
              </div>
            </div>
            <div className="topbar-right">
              <div className="dt-pill">📅 {dateStr}</div>
              <div className="dt-pill">🕐 <span className="live">{timeStr}</span></div>
            </div>
          </div>

          {/* HERO */}
          <div className="hero">
            <div className="hero-badge">📋 &nbsp;Scheduled Examination</div>
            <h1 className="hero-title">{exam.exam_name}</h1>
            <div className="hero-chips">
              <div className="hero-chip">📚 Subject:&nbsp;<span className="chip-val">{exam.subject_name}</span></div>
              <div className="hero-chip">⏳ Duration:&nbsp;<span className="chip-val">{exam.duration_minutes} min</span></div>
              <div className="hero-chip">🔑 Code:&nbsp;<span className="chip-val mono">{examCode}</span></div>
            </div>
          </div>

          {/* MAIN GRID */}
          <div className="main-grid">

            {/* LEFT COLUMN */}
            <div>

              {/* INSTRUCTIONS */}
              <div className="card" style={{marginBottom: 20}}>
                <div className="card-header">
                  <div className="card-header-icon chi-indigo">📌</div>
                  <div>
                    <div className="card-header-title">Exam Instructions</div>
                    <div className="card-header-sub">परीक्षा निर्देश — Read carefully before starting</div>
                  </div>
                </div>
                <div className="instr-grid">
                  {instructions.map((ins, i) => (
                    <div key={i} className="instr-item">
                      <div className="instr-icon-wrap" style={{background: ins.bg, borderColor: ins.border}}>
                        {ins.icon}
                      </div>
                      <div className="instr-texts">
                        <div style={{marginBottom: 4}}>
                          <span className="instr-lang-badge lb-en">EN</span>
                          <span className="instr-en-title">{ins.title}</span>
                        </div>
                        <div style={{marginBottom: 8}}>
                          <span className="instr-lang-badge lb-hi">HI</span>
                          <span className="instr-hi-title">{ins.titleHi}</span>
                        </div>
                        <div className="instr-en-desc">{ins.desc}</div>
                        <div className="instr-hi-desc">{ins.descHi}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* SCORING */}
              <div className="card">
                <div className="card-header">
                  <div className="card-header-icon chi-green">📊</div>
                  <div>
                    <div className="card-header-title">Result & Scoring</div>
                    <div className="card-header-sub">परिणाम और अंकन — Auto-graded on submission</div>
                  </div>
                </div>
                <div className="scoring-row">
                  <div className="score-item">
                    <div className="score-icon si-green">📊</div>
                    <div>
                      <div className="score-label">Result</div>
                      <div className="score-val">Instant</div>
                      <div className="score-val-sub">तुरंत परिणाम</div>
                    </div>
                  </div>
                  <div className="score-item">
                    <div className="score-icon si-indigo">🏆</div>
                    <div>
                      <div className="score-label">Score</div>
                      <div className="score-val">Auto-Graded</div>
                      <div className="score-val-sub">स्वतः अंकन</div>
                    </div>
                  </div>
                  <div className="score-item">
                    <div className="score-icon si-amber" style={{background:"#fffbeb"}}>📄</div>
                    <div>
                      <div className="score-label">Report</div>
                      <div className="score-val">Downloadable</div>
                      <div className="score-val-sub">डाउनलोड योग्य</div>
                    </div>
                  </div>
                </div>
              </div>

            </div>

            {/* RIGHT: FORM */}
            <div className="form-card">
              <div className="form-card-header">
                <div className="form-card-title">👤 Candidate Details</div>
                <div className="form-card-sub">उम्मीदवार विवरण — Fill all fields to proceed</div>
              </div>

              <div className="form-body">

                <div className="field">
                  <div className="field-label">
                    <span>✏️</span> Candidate Name <span className="req">*</span>
                    <span className="field-label-hi">पूरा नाम</span>
                  </div>
                  <input
                    className="field-input"
                    name="candidate_name"
                    placeholder="Enter your full name"
                    value={form.candidate_name}
                    onChange={handleChange}
                    autoComplete="name"
                  />
                  <div className="field-hint">🇮🇳 अपना पूरा नाम लिखें</div>
                </div>

                <div className="field">
                  <div className="field-label">
                    <span>👨‍👦</span> Father's Name <span className="req">*</span>
                    <span className="field-label-hi">पिता का नाम</span>
                  </div>
                  <input
                    className="field-input"
                    name="father_name"
                    placeholder="Enter father's full name"
                    value={form.father_name}
                    onChange={handleChange}
                    autoComplete="off"
                  />
                  <div className="field-hint">🇮🇳 पिता का पूरा नाम लिखें</div>
                </div>

                <div className="field">
                  <div className="field-label">
                    <span>📱</span> Mobile Number <span className="req">*</span>
                    <span className="field-label-hi">मोबाइल नंबर</span>
                  </div>
                  <input
                    className="field-input"
                    name="mobile_number"
                    placeholder="10-digit mobile number"
                    value={form.mobile_number}
                    onChange={handleChange}
                    type="tel"
                    maxLength={10}
                    inputMode="numeric"
                    autoComplete="tel"
                  />
                  <div className="field-hint">🇮🇳 10 अंकों का मोबाइल नंबर</div>
                </div>

                <div className="field">
                  <div className="field-label">
                    <span>🌐</span> Language — भाषा
                  </div>
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
                  <div className="field-hint">🇮🇳 प्रश्न-पत्र की भाषा चुनें</div>
                </div>

                <button className="start-btn" onClick={handleStart} disabled={loading} style={{marginTop: 8}}>
                  <span style={{fontSize: 18}}>{loading ? "⏳" : "🚀"}</span>
                  <div>
                    <div>{loading ? "Starting Exam…" : "Start Exam"}</div>
                    <div className="start-btn-sub">{loading ? "कृपया प्रतीक्षा करें…" : "परीक्षा शुरू करें"}</div>
                  </div>
                </button>

              </div>
            </div>

          </div>
        </div>
      </div>
    </>
  );
}