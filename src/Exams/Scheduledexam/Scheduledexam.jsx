import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import { Card, Button, Form, Container } from "react-bootstrap";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const API_URL = "http://localhost:8080";

export default function ScheduledExam() {
  const { examCode } = useParams();
  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);
  const [exam, setExam] = useState(null);

  const [form, setForm] = useState({
    candidate_name: "",
    father_name: "",
    mobile_number: "",
    language: "en",
  });

  /* ================= FETCH EXAM DETAILS ================= */
  useEffect(() => {
    axios
      .get(`${API_URL}/api/scheduled-exam/${examCode}`)
      .then((res) => setExam(res.data.data))
      .catch(() => toast.error("Invalid or expired exam"));
  }, [examCode]);

  /* ================= INPUT HANDLER ================= */
  const handleChange = (e) => {
    setForm((p) => ({ ...p, [e.target.name]: e.target.value }));
  };

  /* ================= START EXAM FLOW ================= */
  const handleStart = () => {
    const { candidate_name, father_name, mobile_number, language } = form;

    if (!candidate_name || !father_name || !mobile_number) {
      toast.error("Please fill all details");
      return;
    }

    // 🔒 Save candidate session (DO NOT start exam yet)
    localStorage.setItem("candidateInfo", JSON.stringify(form));

    // 🔁 Always reset examStarted here
    localStorage.removeItem("examStarted");

    navigate(`/startexam/${examCode}?lang=${language}`);
  };

  if (!exam) {
    return (
      <div style={{ height: "100vh", display: "grid", placeItems: "center" }}>
        Loading exam details…
      </div>
    );
  }

  return (
    <>
      <ToastContainer />

      <Container style={{ maxWidth: 520, marginTop: 40 }}>
        <Card>
          <Card.Body>
            <h4>{exam.exam_name}</h4>
            <p>
              <strong>Subject:</strong> {exam.subject_name}
            </p>
            <p>
              <strong>Duration:</strong> {exam.duration_minutes} minutes
            </p>
            <hr />

            <Form>
              <Form.Group className="mb-3">
                <Form.Label>Candidate Name</Form.Label>
                <Form.Control
                  name="candidate_name"
                  value={form.candidate_name}
                  onChange={handleChange}
                />
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Label>Father Name</Form.Label>
                <Form.Control
                  name="father_name"
                  value={form.father_name}
                  onChange={handleChange}
                />
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Label>Mobile Number</Form.Label>
                <Form.Control
                  name="mobile_number"
                  value={form.mobile_number}
                  onChange={handleChange}
                />
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Label>Language</Form.Label>
                <Form.Select
                  name="language"
                  value={form.language}
                  onChange={handleChange}
                >
                  <option value="en">English</option>
                  <option value="hi">Hindi</option>
                </Form.Select>
              </Form.Group>

              <Button
                variant="primary"
                disabled={loading}
                onClick={handleStart}
                style={{ width: "100%" }}
              >
                Proceed to Exam
              </Button>
            </Form>
          </Card.Body>
        </Card>
      </Container>
    </>
  );
}
