import { useParams, useSearchParams, useNavigate } from "react-router-dom";
import { useEffect, useState, useRef } from "react";
import axios from "axios";
import { Container, Row, Col, Card, Button, Badge } from "react-bootstrap";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const EXAM_TIME = 60 * 60;

export default function StartExam() {
  const { examCode } = useParams();
  const navigate = useNavigate();
  const [params] = useSearchParams();
  const lang = params.get("lang") || "en";

  const candidateInfo = JSON.parse(localStorage.getItem("candidateInfo") || "{}");
  const { candidate_name, father_name, mobile_number } = candidateInfo;

  const [questions, setQuestions] = useState([]);
  const [current, setCurrent] = useState(0);
  const [answers, setAnswers] = useState({});
  const [timeLeft, setTimeLeft] = useState(EXAM_TIME);
  const [submitting, setSubmitting] = useState(false);

  const videoRef = useRef(null);
  const streamRef = useRef(null);

  /* ================= SAFETY ================= */
  useEffect(() => {
    if (!candidate_name || !father_name || !mobile_number) {
      navigate(`/scheduled-exam/${examCode}`);
    }
  }, []);

  /* ================= FETCH ================= */
  useEffect(() => {
    axios
      .get(
        `https://talent-backend-i83x.onrender.com/api/exam/${examCode}/questions?lang=${lang}`,
        { params: { mobile_number } }
      )
      .then(res => setQuestions(res.data.data || []))
      .catch(() => toast.error("Failed to load exam"));
  }, [examCode, lang]);

  /* ================= TIMER ================= */
  useEffect(() => {
    if (timeLeft <= 0 && !submitting) submitExam("Time expired");
    const t = setInterval(() => setTimeLeft(v => v - 1), 1000);
    return () => clearInterval(t);
  }, [timeLeft]);

  /* ================= CAMERA ================= */
  useEffect(() => {
    navigator.mediaDevices.getUserMedia({ video: true })
      .then(stream => {
        streamRef.current = stream;
        videoRef.current.srcObject = stream;
      })
      .catch(() => submitExam("Camera denied"));
  }, []);

  /* ================= FULLSCREEN ================= */
  useEffect(() => {
    const enterFullscreen = () => {
      if (!document.fullscreenElement) {
        document.documentElement.requestFullscreen().catch(() => {});
      }
    };

    const handleFullscreenExit = () => {
      if (!document.fullscreenElement) {
        toast.error("⚠ Please stay in full screen during the exam", {
          toastId: "fullscreen-warning"
        });
      }
    };

    enterFullscreen();
    document.addEventListener("fullscreenchange", handleFullscreenExit);

    return () => {
      document.removeEventListener("fullscreenchange", handleFullscreenExit);
    };
  }, []);

  /* ================= TAB SWITCH ================= */
  useEffect(() => {
    const handleVisibility = () => {
      if (document.hidden) {
        toast.error("⚠ Tab switching is not allowed during the exam", {
          toastId: "tab-warning"
        });
      }
    };

    document.addEventListener("visibilitychange", handleVisibility);

    return () => {
      document.removeEventListener("visibilitychange", handleVisibility);
    };
  }, []);

  const handleSelect = (opt) => {
    setAnswers(prev => ({ ...prev, [questions[current].id]: opt }));
  };

  const submitExam = async (reason) => {
    if (submitting) return;
    setSubmitting(true);

    try {
      await axios.post(
        "https://talent-backend-i83x.onrender.com/api/exam/submit",
        {
          exam_code: examCode,
          language_code: lang,
          candidate_name,
          father_name,
          mobile_number,
          answers: Object.entries(answers).map(([id, opt]) => ({
            question_id: Number(id),
            selected_option: opt,
          })),
          time_taken_minutes: Math.floor((EXAM_TIME - timeLeft) / 60),
          reason,
        }
      );

      streamRef.current?.getTracks().forEach(t => t.stop());
      if (document.fullscreenElement) document.exitFullscreen();
      navigate("/successPage");
    } catch {
      toast.error("Submission failed");
      setSubmitting(false);
    }
  };

  if (!questions.length) return <p className="text-center mt-5">Loading…</p>;

  const q = questions[current];
  const min = Math.floor(timeLeft / 60);
  const sec = timeLeft % 60;

  return (
    <>
      <ToastContainer position="top-center" autoClose={3000} />

      {/* CAMERA */}
      <video ref={videoRef} autoPlay muted className="exam-camera" />

      <Container fluid className="exam-container">
        <Row className="justify-content-center">
          {/* QUESTION */}
          <Col lg={7} md={12}>
            <Card className="exam-card">
              <Card.Header className="d-flex justify-content-between">
                <strong>Question {current + 1}/{questions.length}</strong>
                <Badge bg="dark">⏱ {min}:{sec.toString().padStart(2, "0")}</Badge>
              </Card.Header>

              <Card.Body>
                <h5 className="question-text">{q.question_text}</h5>

                {["A", "B", "C", "D"].map(o => (
                  <label
                    key={o}
                    className={`option ${answers[q.id] === o ? "active" : ""}`}
                  >
                    <input
                      type="radio"
                      name={`q_${q.id}`}
                      checked={answers[q.id] === o}
                      onChange={() => handleSelect(o)}
                    />
                    <span className="radio-custom" />
                    <span className="option-text">
                      <strong>{o}.</strong> {q[`option_${o.toLowerCase()}`]}
                    </span>
                  </label>
                ))}

                <div className="nav-buttons">
                  <Button
                    variant="secondary"
                    disabled={current === 0}
                    onClick={() => setCurrent(c => c - 1)}
                  >
                    ← Back
                  </Button>

                  {current < questions.length - 1 ? (
                    <Button variant="primary" onClick={() => setCurrent(c => c + 1)}>
                      Next →
                    </Button>
                  ) : (
                    <Button variant="success" onClick={() => submitExam("Manual submit")}>
                      Submit Exam
                    </Button>
                  )}
                </div>
              </Card.Body>
            </Card>
          </Col>

          {/* PALETTE */}
          <Col lg={3} md={12} className="palette">
            <Card>
              <Card.Header><strong>Question Palette</strong></Card.Header>
              <Card.Body className="palette-grid">
                {questions.map((_, i) => {
                  const qId = questions[i].id;
                  let v = "danger";
                  if (answers[qId]) v = "success";
                  if (i === current) v = "primary";

                  return (
                    <Button
                      key={i}
                      size="sm"
                      variant={v}
                      onClick={() => setCurrent(i)}
                    >
                      {i + 1}
                    </Button>
                  );
                })}
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>

      {/* QUIT */}
      <Button
        variant="danger"
        className="quit-btn"
        onClick={() => submitExam("Quit exam")}
      >
        Quit Exam
      </Button>

      {/* STYLES */}
      <style>{`
.exam-container { padding: 20px 20px 20px 160px; }
.exam-card { min-height: 70vh; }
.exam-camera {
  position: fixed;
  top: 15px;
  left: 15px;
  width: 120px;
  height: 90px;
  border: 2px solid #000;
  border-radius: 8px;
}
.question-text { margin-bottom: 24px; }
.option {
  display: flex;
  align-items: center;
  padding: 12px;
  border: 1px solid #ddd;
  border-radius: 8px;
  margin-bottom: 12px;
  cursor: pointer;
}
.option.active {
  background: #e7f1ff;
  border-color: #0d6efd;
}
.option input { display: none; }
.radio-custom {
  width: 18px;
  height: 18px;
  border: 2px solid #0d6efd;
  border-radius: 50%;
  margin-right: 12px;
  position: relative;
}
.option.active .radio-custom::after {
  content: "";
  width: 10px;
  height: 10px;
  background: #0d6efd;
  border-radius: 50%;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}
.nav-buttons {
  display: flex;
  justify-content: space-between;
  margin-top: 30px;
}
.palette-grid {
  display: grid;
  grid-template-columns: repeat(6, 1fr);
  gap: 6px;
}
.quit-btn {
  position: fixed;
  bottom: 25px;
  right: 25px;
}
@media (max-width: 768px) {
  .exam-container { padding: 20px; }
  .exam-camera {
    position: static;
    margin: 0 auto 10px;
    display: block;
  }
}
`}</style>
    </>
  );
}
