import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { Container, Row, Col, Spinner } from "react-bootstrap";
import {
  User,
  Languages,
  PlayCircle,
  Clock,
  Calendar,
  BookOpen,
  UserCheck,
  Shield,
  AlertCircle,
  Phone,
  Users
} from "lucide-react";
import "./scheduled.css";

const ScheduledExam = () => {
  const { examCode } = useParams();
  const navigate = useNavigate();

  const [exam, setExam] = useState(null);
  const [language, setLanguage] = useState("");
  const [loading, setLoading] = useState(true);

  const [candidateName, setCandidateName] = useState("");
  const [fatherName, setFatherName] = useState("");
  const [mobile, setMobile] = useState("");

  useEffect(() => {
    axios
      .get(`https://talent-backend-i83x.onrender.com/api/scheduled-exam/${examCode}`)
      .then((res) => {
        setExam(res.data.data);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, [examCode]);

  const startExam = () => {
    if (!candidateName || !fatherName || !mobile || !language) {
      alert("Fill all details");
      return;
    }

    localStorage.setItem(
      "candidateInfo",
      JSON.stringify({
        candidate_name: candidateName,
        father_name: fatherName,
        mobile_number: mobile,
      })
    );

    navigate(`/startexam/${examCode}?lang=${language}`);
  };

  if (loading) {
    return (
      <div className="loading-screen">
        <Spinner animation="border" />
        <p>Loading exam details...</p>
      </div>
    );
  }

  return (
    <div className="exam-page">
      <Container>

        {/* HEADER */}
        <div className="exam-header">
          <div className="ai-badge">
            <Shield size={16} /> AI-Proctored Examination
          </div>

          <h1 className="exam-title">
            {exam.exam_name?.replace(/_/g, " ").toUpperCase()}
          </h1>

          <p className="exam-subtitle">
            Secure Online Assessment Platform
          </p>
        </div>

        {/* INFO CARDS */}
        <Row className="info-row">
          {[
            { icon: <Calendar />, label: "Exam Date", value: new Date(exam.exam_date).toDateString() },
            { icon: <Clock />, label: "Start Time", value: exam.exam_time },
            { icon: <Clock />, label: "Duration", value: `${exam.duration_minutes} Minutes` },
            { icon: <UserCheck />, label: "Assessor", value: exam.assessor_name },
          ].map((item, i) => (
            <Col key={i} xs={12} sm={6} md={3}>
              <div className="info-card">
                <div className="icon">{item.icon}</div>
                <span className="label">{item.label}</span>
                <strong>{item.value}</strong>
              </div>
            </Col>
          ))}
        </Row>

        {/* SUBJECT */}
        <div className="subject-box">
          <BookOpen size={20} />
          <span>{exam.subject_name}</span>
        </div>

        {/* INSTRUCTIONS */}
        <div className="instructions-box">
          <AlertCircle size={18} />
          <p>
            This is an <b>AI-Proctored Exam</b>. Maintain proper lighting,
            stable internet and avoid tab switching.
          </p>
        </div>

        {/* FORM */}
        <div className="form-card">
          <h4><User size={18} /> Candidate Information</h4>

          <Row style={{justifyContent:'center'}}>
            <Col md={4}>
              <input
                placeholder="Candidate Name"
                value={candidateName}
                onChange={(e) => setCandidateName(e.target.value)}
                style={{margin:'30px'}}
              />
            </Col>
            <Col md={4}>
              <input
                placeholder="Father's Name"
                value={fatherName}
                onChange={(e) => setFatherName(e.target.value)}
                                style={{margin:'30px'}}

              />
            </Col>
            <Col md={4}>
              <input
                placeholder="Mobile Number"
                maxLength={10}
                value={mobile}
                onChange={(e) => setMobile(e.target.value.replace(/\D/g, ""))}
                                style={{margin:'30px'}}

              />
            </Col>
          </Row>
        </div>

        {/* LANGUAGE */}
        <div className="form-card">
          <h4><Languages size={18} /> Select Language</h4>
          <select value={language} onChange={(e) => setLanguage(e.target.value)}>
            <option value="">-- Choose Language --</option>
            <option value="en">English</option>
            <option value="hi">Hindi</option>
            <option value="bn">Bengali</option>
            <option value="ta">Tamil</option>
            <option value="te">Telugu</option>
          </select>
        </div>

        {/* BUTTON */}
        <div className="start-wrapper">
          <button className="start-btn" onClick={startExam}>
            <PlayCircle size={22} /> Start Examination
          </button>
        </div>

      </Container>
    </div>
  );
};

export default ScheduledExam;
