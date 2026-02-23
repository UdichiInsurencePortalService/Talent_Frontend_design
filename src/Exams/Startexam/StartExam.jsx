import { useParams, useSearchParams, useNavigate } from "react-router-dom";
import { useEffect, useState, useRef } from "react";
import axios from "axios";
import { Button, Card, Container, Badge } from "react-bootstrap";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import { io } from "socket.io-client";
import * as FaceDetection from "@mediapipe/face_detection";
import { Camera } from "@mediapipe/camera_utils";

const SOCKET_URL = "http://localhost:8080";
const EXAM_TIME = 60 * 60;

const socket = io(SOCKET_URL, { transports: ["websocket"] });

export default function StartExam() {
  const { examCode } = useParams();
  const [params] = useSearchParams();
  const lang = params.get("lang") || "en";
  const navigate = useNavigate();

  const candidateInfo = JSON.parse(localStorage.getItem("candidateInfo") || "{}");
  const { candidate_name, father_name, mobile_number } = candidateInfo;

  const [started, setStarted] = useState(
    localStorage.getItem("examStarted") === "true"
  );
  const [questions, setQuestions] = useState([]);
  const [timeLeft, setTimeLeft] = useState(EXAM_TIME);

  const videoRef = useRef(null);
  const streamRef = useRef(null);
  const warningCount = useRef(0);
  const lastWarn = useRef(0);

  /* ================= SOCKET ================= */
  useEffect(() => {
    socket.on("connect", () =>
      console.log("🟢 SOCKET CONNECTED:", socket.id)
    );
    socket.emit("join_exam", { examCode, userId: mobile_number });
  }, []);

  /* ================= FETCH QUESTIONS ================= */
  useEffect(() => {
    axios
      .get(`${SOCKET_URL}/api/exam/${examCode}/questions?lang=${lang}`, {
        params: { mobile_number },
      })
      .then((res) => setQuestions(res.data.data || []));
  }, []);

  /* ================= TIMER ================= */
  useEffect(() => {
    if (!started) return;
    const t = setInterval(() => setTimeLeft((t) => t - 1), 1000);
    return () => clearInterval(t);
  }, [started]);

  /* ================= START EXAM ================= */
  const startExam = async () => {
    await document.documentElement.requestFullscreen();
    const u = new SpeechSynthesisUtterance("Exam started");
    speechSynthesis.speak(u);

    localStorage.setItem("examStarted", "true");
    setStarted(true);
  };

  /* ================= WARN ================= */
  const emitWarning = (reason) => {
    if (Date.now() - lastWarn.current < 6000) return;
    lastWarn.current = Date.now();

    warningCount.current++;

    socket.emit("exam_event", {
      examCode,
      userId: mobile_number,
      type: "warning",
      reason,
    });

    toast.error(reason);

    // 🔴 Voice may be blocked – DO NOT rely on it
    if (!document.hidden) {
      speechSynthesis.speak(
        new SpeechSynthesisUtterance(`Warning ${reason}`)
      );
    }

    if (warningCount.current >= 3) {
      submitExam("Auto terminated");
    }
  };

  /* ================= CAMERA + FACE ================= */
  useEffect(() => {
    if (!started) return;

    navigator.mediaDevices.getUserMedia({ video: true }).then((s) => {
      streamRef.current = s;
      videoRef.current.srcObject = s;
    });

    const fd = new FaceDetection.FaceDetection({
      locateFile: (f) =>
        `https://cdn.jsdelivr.net/npm/@mediapipe/face_detection/${f}`,
    });

    fd.setOptions({ minDetectionConfidence: 0.6 });

    fd.onResults((res) => {
      if (!res.detections.length) {
        emitWarning("Face not detected");
      }
    });

    const cam = new Camera(videoRef.current, {
      onFrame: async () => fd.send({ image: videoRef.current }),
    });

    cam.start();
    return () => cam.stop();
  }, [started]);

  /* ================= TAB SWITCH ================= */
  useEffect(() => {
    if (!started) return;

    const onBlur = () => emitWarning("Window focus lost");
    const onHidden = () => document.hidden && emitWarning("Tab switched");

    window.addEventListener("blur", onBlur);
    document.addEventListener("visibilitychange", onHidden);

    return () => {
      window.removeEventListener("blur", onBlur);
      document.removeEventListener("visibilitychange", onHidden);
    };
  }, [started]);

  /* ================= SUBMIT ================= */
  const submitExam = async (reason) => {
    localStorage.removeItem("examStarted");
    await axios.post(`${SOCKET_URL}/api/exam/submit`, {
      exam_code: examCode,
      candidate_name,
      father_name,
      mobile_number,
      reason,
    });
    streamRef.current?.getTracks().forEach((t) => t.stop());
    navigate("/successPage");
  };

  if (!started) {
    return (
      <div style={{ height: "100vh", display: "grid", placeItems: "center" }}>
        <Button size="lg" onClick={startExam}>
          ▶ Start Exam
        </Button>
      </div>
    );
  }

  const min = Math.floor(timeLeft / 60);
  const sec = timeLeft % 60;

  return (
    <>
      <ToastContainer />
      <video ref={videoRef} autoPlay muted className="exam-camera" />
      <Container>
        <Card>
          <Card.Header>
            ⏱ {min}:{sec}
          </Card.Header>
          <Card.Body>{questions[0]?.question_text}</Card.Body>
        </Card>
      </Container>
    </>
  );
}
