import { useParams, useSearchParams, useNavigate } from "react-router-dom";
import { useEffect, useState, useRef } from "react";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import { motion } from "framer-motion";
import "react-toastify/dist/ReactToastify.css";

const EXAM_TIME = 60 * 60;

const StartExam = () => {
  const { examCode } = useParams();
  const navigate = useNavigate();
  const [params] = useSearchParams();
  const lang = params.get("lang") || "en";

  const candidateInfo = JSON.parse(
    localStorage.getItem("candidateInfo") || "{}"
  );

  const { candidate_name, father_name, mobile_number } = candidateInfo;

  const [questions, setQuestions] = useState([]);
  const [current, setCurrent] = useState(0);
  const [answers, setAnswers] = useState({});
  const [visited, setVisited] = useState({});
  const [timeLeft, setTimeLeft] = useState(EXAM_TIME);
  const [submitting, setSubmitting] = useState(false);

  const videoRef = useRef(null);
  const streamRef = useRef(null);

  /* SAFETY CHECK */
  useEffect(() => {
    if (!candidate_name || !father_name || !mobile_number) {
      alert("Candidate information missing. Please start exam again.");
      navigate(`/scheduled-exam/${examCode}`);
    }
  }, []);

  /* FETCH QUESTIONS */
  useEffect(() => {
    axios
      .get(
        `https://talent-backend-i83x.onrender.com/api/exam/${examCode}/questions?lang=${lang}`
      )
      .then((res) => setQuestions(res.data.data || []))
      .catch(() => toast.error("Failed to load questions"));
  }, [examCode, lang]);

  /* RESTORE ANSWERS */
  useEffect(() => {
    const saved = localStorage.getItem(`answers_${examCode}_${lang}`);
    if (saved) setAnswers(JSON.parse(saved));
  }, [examCode, lang]);

  /* TIMER */
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

  /* CAMERA */
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

  const handleSelect = (opt) => {
    const qId = questions[current].id;
    const updated = { ...answers, [qId]: opt };

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

  const submitExam = async (reason) => {
    if (submitting) return;
    setSubmitting(true);

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
        }
      );

      if (!res.data?.success) throw new Error();

      localStorage.removeItem(`answers_${examCode}_${lang}`);
      streamRef.current?.getTracks().forEach((t) => t.stop());
      navigate("/successPage");
    } catch {
      toast.error("Submission failed");
      setSubmitting(false);
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
              <label key={o} className="option">
                <input
                  type="radio"
                  checked={answers[q.id] === o}
                  onChange={() => handleSelect(o)}
                />
                <span>{q[`option_${o.toLowerCase()}`]}</span>
              </label>
            ))}
          </motion.div>

          {/* DESKTOP ONLY */}
          <aside className="palette desktop-only">
            {questions.map((item, i) => {
              let cls = "num";
              if (current === i) cls += " active";
              else if (answers[item.id]) cls += " answered";
              else if (visited[i]) cls += " not-answered";

              return (
                <button key={item.id} className={cls} onClick={() => goToQuestion(i)}>
                  {i + 1}
                </button>
              );
            })}
          </aside>
        </div>

        <div className="nav">
          <button disabled={current === 0} onClick={() => goToQuestion(current - 1)}>
            Back
          </button>

          {current < questions.length - 1 ? (
            <button onClick={() => goToQuestion(current + 1)}>Next</button>
          ) : (
            <button className="submit" onClick={() => submitExam("Manual submit")}>
              {submitting ? "Submitting..." : "Submit Exam"}
            </button>
          )}
        </div>

        <button className="quit" onClick={() => submitExam("Quit exam")}>
          Quit Exam
        </button>
      </div>

      <style>{css}</style>
    </>
  );
};

const css = `
.exam-layout { max-width:1100px; margin:auto; padding:16px; }
.exam-header { display:flex; justify-content:space-between; font-weight:600; }
.timer { color:#dc2626; }

.exam-body { display:flex; gap:16px; margin-top:16px; }
.question-box { flex:1; background:white; padding:20px; border-radius:12px; }

.option { display:flex; gap:10px; margin-top:10px; padding:10px; border:1px solid #e5e7eb; border-radius:8px; }

.palette { width:140px; display:grid; grid-template-columns:repeat(4,1fr); gap:6px; }
.num { padding:6px; border-radius:6px; border:none; background:#e5e7eb; font-weight:600; }
.num.active { background:#2563eb; color:white; }
.num.answered { background:#22c55e; color:white; }
.num.not-answered { background:#ef4444; color:white; }

.nav { margin-top:16px; display:flex; justify-content:space-between; gap:10px; }
.submit { background:#16a34a; color:white; flex:1; }

.camera {
  position:fixed;
  top:10px;
  right:10px;
  width:80px;
  height:60px;
  border-radius:8px;
  border:2px solid black;
  z-index:1000;
}

.quit {
  position:fixed;
  bottom:12px;
  left:12px;
  background:#dc2626;
  color:white;
  padding:10px 14px;
  border-radius:8px;
  border:none;
}

/* MOBILE */
@media (max-width:768px) {
  .exam-body { flex-direction:column; }
  .desktop-only { display:none; }
  .submit { width:100%; }
}
`;

export default StartExam;
