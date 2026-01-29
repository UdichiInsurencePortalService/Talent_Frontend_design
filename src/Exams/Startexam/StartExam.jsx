import { useParams, useSearchParams, useNavigate } from "react-router-dom";
import { useEffect, useState, useRef } from "react";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import { motion } from "framer-motion";
import "react-toastify/dist/ReactToastify.css";

const EXAM_TIME = 60 * 60; // 60 minutes

const StartExam = () => {
  const { examCode } = useParams();
  const navigate = useNavigate();
  const [params] = useSearchParams();
  const lang = params.get("lang") || "en";

  /* ================= CANDIDATE INFO ================= */
  const candidateInfo = JSON.parse(
    localStorage.getItem("candidateInfo") || "{}"
  );

  const { candidate_name, father_name, mobile_number } = candidateInfo;

  /* ================= STATE ================= */
  const [questions, setQuestions] = useState([]);
  const [current, setCurrent] = useState(0);
  const [answers, setAnswers] = useState({});
  const [visited, setVisited] = useState({});
  const [timeLeft, setTimeLeft] = useState(EXAM_TIME);
  const [submitting, setSubmitting] = useState(false);

  const videoRef = useRef(null);
  const streamRef = useRef(null);

  /* ================= SAFETY CHECK ================= */
  useEffect(() => {
    if (!candidate_name || !father_name || !mobile_number) {
      alert("Candidate information missing. Please start exam again.");
      navigate(`/scheduled-exam/${examCode}`);
    }
  }, []);

  /* ================= FETCH QUESTIONS ================= */
  useEffect(() => {
    axios
      .get(
        `https://talent-backend-i83x.onrender.com/api/exam/${examCode}/questions?lang=${lang}`
      )
      .then((res) => setQuestions(res.data.data || []))
      .catch(() => toast.error("Failed to load questions"));
  }, [examCode, lang]);

  /* ================= RESTORE SAVED ANSWERS ================= */
  useEffect(() => {
    const saved = localStorage.getItem(`answers_${examCode}_${lang}`);
    if (saved) setAnswers(JSON.parse(saved));
  }, [examCode, lang]);

  /* ================= TIMER ================= */
  useEffect(() => {
    if (timeLeft <= 0 && !submitting) {
      submitExam("Time expired");
      return;
    }

    const timer = setInterval(() => {
      setTimeLeft((t) => t - 1);
    }, 1000);

    return () => clearInterval(timer);
  }, [timeLeft]);

  /* ================= CAMERA ================= */
  useEffect(() => {
    navigator.mediaDevices
      .getUserMedia({ video: true })
      .then((stream) => {
        streamRef.current = stream;
        videoRef.current.srcObject = stream;
      })
      .catch(() => {
        toast.error("Camera access required");
        submitExam("Camera denied");
      });
  }, []);

  /* ================= ANSWER SELECT ================= */
  const handleSelect = (opt) => {
    const qId = questions[current].id;

    const updated = {
      ...answers,
      [qId]: opt,
    };

    setAnswers(updated);
    setVisited({ ...visited, [current]: true });

    localStorage.setItem(
      `answers_${examCode}_${lang}`,
      JSON.stringify(updated)
    );
  };

  const goToQuestion = (i) => {
    setVisited({ ...visited, [i]: true });
    setCurrent(i);
  };

  /* ================= SUBMIT ================= */
  const submitExam = async (reason) => {
    if (submitting) return;
    setSubmitting(true);

    // ✅ FORMAT ANSWERS (VERY IMPORTANT)
    const formattedAnswers = Object.entries(answers).map(
      ([question_id, selected_option]) => ({
        question_id: Number(question_id),
        selected_option,
      })
    );

    try {
      const res = await axios.post(
        "https://talent-backend-i83x.onrender.com/api/exam/submit",
        {
          exam_code: examCode,
          language_code: lang,
          candidate_name,
          father_name,
          mobile_number,
          answers: formattedAnswers,
          time_taken_minutes: Math.floor(
            (EXAM_TIME - timeLeft) / 60
          ),
          reason,
        },
        { timeout: 15000 }
      );

      if (!res.data?.success) {
        throw new Error("Server submission failed");
      }

      localStorage.removeItem(`answers_${examCode}_${lang}`);

      if (streamRef.current) {
        streamRef.current.getTracks().forEach((t) => t.stop());
      }

      navigate("/successPage");
    } catch (err) {
      toast.error("Submission failed. Please try again.");
      setSubmitting(false);
    }
  };

  const confirmQuit = () => {
    if (window.confirm("Are you sure you want to quit and submit the exam?")) {
      submitExam("Quit exam");
    }
  };

  if (!questions.length) {
    return <p style={{ textAlign: "center" }}>Loading exam…</p>;
  }

  const q = questions[current];
  const min = Math.floor(timeLeft / 60);
  const sec = timeLeft % 60;

  return (
    <>
      <ToastContainer />

      {/* CAMERA */}
      <video ref={videoRef} autoPlay muted className="camera" />

      <div className="exam-layout">
        <header className="exam-header">
          <span>
            Question {current + 1} / {questions.length}
          </span>
          <span className="timer">
            ⏱ {min}:{sec.toString().padStart(2, "0")}
          </span>
        </header>

        <div className="exam-body">
          <motion.div
            key={current}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="question-box"
          >
            <h3>{q.question_text}</h3>

            {["A", "B", "C", "D"].map((o) => (
              <label key={`${q.id}_${o}`} className="option">
                <input
                  type="radio"
                  name={`question_${q.id}`}
                  checked={answers[q.id] === o}
                  onChange={() => handleSelect(o)}
                />
                <span>{q[`option_${o.toLowerCase()}`]}</span>
              </label>
            ))}
          </motion.div>

          <aside className="palette">
            {questions.map((item, i) => {
              let cls = "num";
              if (current === i) cls += " active";
              else if (answers[item.id]) cls += " answered";
              else if (visited[i]) cls += " not-answered";

              return (
                <button
                  key={item.id}
                  className={cls}
                  onClick={() => goToQuestion(i)}
                >
                  {i + 1}
                </button>
              );
            })}
          </aside>
        </div>

        <div className="nav">
          <button
            disabled={current === 0 || submitting}
            onClick={() => goToQuestion(current - 1)}
          >
            Back
          </button>

          {current < questions.length - 1 ? (
            <button disabled={submitting} onClick={() => goToQuestion(current + 1)}>
              Next
            </button>
          ) : (
            <button
              className="submit"
              disabled={submitting}
              onClick={() => submitExam("Manual submit")}
            >
              {submitting ? "Submitting..." : "Submit Exam"}
            </button>
          )}
        </div>

        <button className="quit" disabled={submitting} onClick={confirmQuit}>
          Quit Exam
        </button>
      </div>

      <style>{css}</style>
    </>
  );
};

/* ================= CSS ================= */
const css = `
.exam-layout { max-width:1100px; margin:auto; padding:20px; }
.exam-header { display:flex; justify-content:space-between; font-weight:600; }
.timer { color:#dc2626; }
.exam-body { display:flex; gap:16px; margin-top:16px; }
.question-box { flex:1; background:white; padding:24px; border-radius:14px; box-shadow:0 6px 20px rgba(0,0,0,.06); }
.option { display:flex; gap:10px; margin-top:12px; padding:12px; border-radius:10px; border:1px solid #e5e7eb; }
.palette { width:140px; display:grid; grid-template-columns:repeat(4,1fr); gap:6px; }
.num { padding:6px; border-radius:6px; border:none; background:#e5e7eb; font-size:12px; font-weight:600; }
.num.active { background:#2563eb; color:white; }
.num.answered { background:#22c55e; color:white; }
.num.not-answered { background:#ef4444; color:white; }
.nav { margin-top:20px; display:flex; justify-content:space-between; }
.submit { background:#16a34a; color:white; }
.camera { position:fixed; top:12px; left:12px; width:110px; height:90px; border-radius:10px; border:2px solid black; z-index:1000; }
.quit { position:fixed; bottom:20px; right:20px; background:#dc2626; color:white; padding:10px 16px; border-radius:10px; border:none; }
@media (max-width:768px) {
  .exam-body { flex-direction:column; }
  .palette { grid-template-columns:repeat(6,1fr); width:100%; }
}
`;

export default StartExam;
