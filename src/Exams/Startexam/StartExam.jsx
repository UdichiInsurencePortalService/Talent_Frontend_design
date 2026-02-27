import { useParams, useSearchParams, useNavigate } from "react-router-dom";
import { useEffect, useState, useRef } from "react";
import axios from "axios";
import {
  Container,
  Row,
  Col,
  Card,
  Button,
  Form,
  Modal,
  Spinner,
} from "react-bootstrap";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const API = "https://talent-backend-i83x.onrender.com";
const TOTAL_TIME = 60 * 60;

export default function StartExam() {
  const { examCode } = useParams();
  const [params] = useSearchParams();
  const lang = params.get("lang") || "en";
  const navigate = useNavigate();

  const candidateInfo =
    JSON.parse(localStorage.getItem("candidateInfo")) || {};

  const { candidate_name, father_name, mobile_number } = candidateInfo;

  const [questions, setQuestions] = useState([]);
  const [current, setCurrent] = useState(0);
  const [answers, setAnswers] = useState({});
  const [timeLeft, setTimeLeft] = useState(TOTAL_TIME);
  const [warnings, setWarnings] = useState(0);

  const [showModal, setShowModal] = useState(false);
  const [actionType, setActionType] = useState("");
  const [loading, setLoading] = useState(false);

  const videoRef = useRef(null);
  const streamRef = useRef(null);
  const startTimeRef = useRef(Date.now());

  /* FULLSCREEN */
  useEffect(() => {
    document.documentElement.requestFullscreen().catch(() => {});
  }, []);

  /* FETCH QUESTIONS */
  useEffect(() => {
    axios
      .get(`${API}/api/exam/${examCode}/questions?lang=${lang}`)
      .then((res) => setQuestions(res.data.data || []))
      .catch(() => toast.error("Failed to load questions"));
  }, [examCode, lang]);

  /* TIMER */
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
  }, []);

  /* TAB SWITCH */
  useEffect(() => {
    const handleViolation = () => {
      setWarnings((prev) => {
        if (prev >= 3) return prev;
        const newCount = prev + 1;
        toast.error(`Tab Switch Warning ${newCount}/3`);
        if (newCount === 3) {
          submitExam("Tab Switch 3 Times");
        }
        return newCount;
      });
    };

    window.addEventListener("blur", handleViolation);
    return () => window.removeEventListener("blur", handleViolation);
  }, []);

  /* CAMERA */
  useEffect(() => {
    navigator.mediaDevices
      .getUserMedia({ video: true })
      .then((stream) => {
        streamRef.current = stream;
        videoRef.current.srcObject = stream;
      })
      .catch(() => toast.error("Camera permission denied"));

    return () =>
      streamRef.current?.getTracks().forEach((t) => t.stop());
  }, []);

  /* HANDLE ANSWER */
  const q = questions[current];

  const handleOption = (option) => {
    if (!q) return;
    setAnswers((prev) => ({
      ...prev,
      [q.id]: option,
    }));
  };

  /* OPEN MODAL */
  const openModal = (type) => {
    setActionType(type);
    setShowModal(true);
  };

  /* SUBMIT EXAM */
  const submitExam = async (reason) => {
    try {
      setLoading(true);

      const timeTaken = Math.floor(
        (Date.now() - startTimeRef.current) / 1000
      );

      streamRef.current?.getTracks().forEach((t) => t.stop());

      if (document.fullscreenElement) {
        await document.exitFullscreen();
      }

      const res = await axios.post(`${API}/api/submit`, {
        exam_code: examCode,
        candidate_name,
        father_name,
        mobile_number,
        language: lang,
        answers,
        time_taken: timeTaken,
        reason,
      });

      if (res.data.success) {
        toast.success("Exam submitted successfully!");
        setTimeout(() => {
          navigate("/", { replace: true });
        }, 1200);
      }
    } catch (err) {
      console.error(err);
      toast.error("Submission failed!");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <ToastContainer />

      {/* Responsive Styles */}
      <style>{`
        .exam-container {
          padding-bottom: 110px;
        }

        .exam-action-buttons {
          position: fixed;
          bottom: 20px;
          right: 20px;
          display: flex;
          gap: 10px;
          z-index: 999;
        }

        @media (max-width: 768px) {
          .exam-action-buttons {
            left: 0;
            right: 0;
            bottom: 0;
            padding: 10px;
            background: #ffffff;
            box-shadow: 0 -2px 10px rgba(0,0,0,0.1);
            justify-content: center;
          }

          .exam-action-buttons button {
            flex: 1;
          }

          video {
            height: 180px !important;
          }
        }
      `}</style>

      <Container fluid className="p-3 exam-container">
        <Row>
          {/* CAMERA */}
          <Col lg={3} md={4} sm={12} className="mb-3">
            <video
              ref={videoRef}
              autoPlay
              muted
              className="w-100 border rounded"
              style={{ height: "220px", objectFit: "cover" }}
            />
            <div className="text-center mt-2 text-danger">
              Warnings: {warnings}/3
            </div>
          </Col>

          {/* QUESTIONS */}
          <Col lg={9} md={8} sm={12}>
            <Card>
              <Card.Header className="d-flex justify-content-between">
                <span>
                  ⏱ {Math.floor(timeLeft / 60)}:
                  {String(timeLeft % 60).padStart(2, "0")}
                </span>
                <span>
                  Question {current + 1} / {questions.length}
                </span>
              </Card.Header>

              <Card.Body>
                <h5 className="mb-4">{q?.question_text}</h5>

                {["a", "b", "c", "d"].map((opt) => (
                  <Form.Check
                    key={opt}
                    type="radio"
                    label={q?.[`option_${opt}`]}
                    name="option"
                    checked={answers[q?.id] === opt}
                    onChange={() => handleOption(opt)}
                    className="mb-2"
                  />
                ))}

                {/* BACK & NEXT */}
                <div className="mt-4 d-flex gap-2">
                  <Button
                    variant="secondary"
                    disabled={current === 0}
                    onClick={() => setCurrent(current - 1)}
                  >
                    Back
                  </Button>

                  {current < questions.length - 1 && (
                    <Button onClick={() => setCurrent(current + 1)}>
                      Next
                    </Button>
                  )}
                </div>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>

      {/* FIXED SUBMIT + QUIT */}
      <div className="exam-action-buttons">
        <Button variant="success" onClick={() => openModal("submit")}>
          Submit
        </Button>

        <Button variant="danger" onClick={() => openModal("quit")}>
          Quit
        </Button>
      </div>

      {/* MODAL */}
      <Modal show={showModal} centered>
        <Modal.Header>
          <Modal.Title>
            {actionType === "submit"
              ? "Confirm Submit"
              : "Confirm Quit"}
          </Modal.Title>
        </Modal.Header>

        <Modal.Body>
          {actionType === "submit"
            ? "Are you sure you want to submit the exam?"
            : "Are you sure you want to quit the exam?"}
        </Modal.Body>

        <Modal.Footer>
          <Button
            variant="secondary"
            onClick={() => setShowModal(false)}
          >
            Cancel
          </Button>

          <Button
            variant={
              actionType === "submit" ? "success" : "danger"
            }
            onClick={() => {
              setShowModal(false);
              submitExam(
                actionType === "submit"
                  ? "Student Submitted"
                  : "Student Quit"
              );
            }}
          >
            {loading ? (
              <Spinner size="sm" animation="border" />
            ) : actionType === "submit" ? (
              "Submit Exam"
            ) : (
              "Quit Exam"
            )}
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}