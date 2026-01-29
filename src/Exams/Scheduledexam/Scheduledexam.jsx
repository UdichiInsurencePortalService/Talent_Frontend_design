import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { Container, Row, Col, Spinner, Button, Card, Badge, Alert } from "react-bootstrap";
import { 
  User, 
  Languages, 
  PlayCircle, 
  Clock, 
  Calendar, 
  BookOpen, 
  UserCheck, 
  Shield, 
  CheckCircle,
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

  // Candidate states
  const [candidateName, setCandidateName] = useState("");
  const [fatherName, setFatherName] = useState("");
  const [mobile, setMobile] = useState("");

  /* FETCH EXAM */
  useEffect(() => {
    setLoading(true);
    axios
      .get(`https://talent-backend-i83x.onrender.com/api/scheduled-exam/${examCode}`)
      .then((res) => {
        setExam(res.data.data);
        setLoading(false);
      })
      .catch(() => {
        alert("Failed to load exam details");
        setLoading(false);
      });
  }, [examCode]);

  const startExam = () => {
    // Validation
    if (!candidateName.trim() || !fatherName.trim() || !mobile) {
      alert("Please fill all candidate details");
      return;
    }

    if (mobile.length !== 10) {
      alert("Enter valid 10 digit mobile number");
      return;
    }

    if (!language) {
      alert("Please select exam language");
      return;
    }

    // Store in localStorage
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

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-IN', { 
      day: '2-digit', 
      month: 'short', 
      year: 'numeric' 
    });
  };

  const formatTime = (timeString) => {
    if (!timeString) return '';
    const [hours, minutes] = timeString.split(':');
    const hour = parseInt(hours);
    const ampm = hour >= 12 ? 'PM' : 'AM';
    const displayHour = hour % 12 || 12;
    return `${displayHour}:${minutes} ${ampm}`;
  };

  if (loading) {
    return (
      <div className="loading-screen">
        <Spinner animation="border" variant="primary" />
        <p className="mt-3">Loading exam details...</p>
      </div>
    );
  }

  if (!exam) {
    return (
      <div className="error-screen">
        <AlertCircle size={48} className="text-danger mb-3" />
        <h4>Exam not found</h4>
        <p>Please check your exam code and try again</p>
      </div>
    );
  }

  return (
    <div className="exam-page">
      <Container className="py-4">
        {/* Header Section */}
        <div className="exam-header mb-4">
          <div className="text-center mb-4">
            <Badge bg="primary" className="mb-2 px-3 py-2 fs-6">
              <Shield size={16} className="me-2" />
              AI-Proctored Examination
            </Badge>
            <h2 className="exam-title">{exam.exam_name?.replace(/_/g, ' ').toUpperCase()}</h2>
            <p className="text-muted mb-0">Secure Online Assessment Platform</p>
          </div>

          {/* Exam Details Cards */}
          <Row className="g-3 mb-4">
            <Col md={3} sm={6}>
              <Card className="detail-card h-100">
                <Card.Body className="text-center">
                  <Calendar className="detail-icon text-primary mb-2" size={28} />
                  <p className="detail-label">Exam Date</p>
                  <h6 className="detail-value">{formatDate(exam.exam_date)}</h6>
                </Card.Body>
              </Card>
            </Col>

            <Col md={3} sm={6}>
              <Card className="detail-card h-100">
                <Card.Body className="text-center">
                  <Clock className="detail-icon text-success mb-2" size={28} />
                  <p className="detail-label">Start Time</p>
                  <h6 className="detail-value">{formatTime(exam.exam_time)}</h6>
                </Card.Body>
              </Card>
            </Col>

            <Col md={3} sm={6}>
              <Card className="detail-card h-100">
                <Card.Body className="text-center">
                  <Clock className="detail-icon text-warning mb-2" size={28} />
                  <p className="detail-label">Duration</p>
                  <h6 className="detail-value">{exam.duration_minutes} Minutes</h6>
                </Card.Body>
              </Card>
            </Col>

            <Col md={3} sm={6}>
              <Card className="detail-card h-100">
                <Card.Body className="text-center">
                  <UserCheck className="detail-icon text-info mb-2" size={28} />
                  <p className="detail-label">Assessor</p>
                  <h6 className="detail-value">{exam.assessor_name}</h6>
                </Card.Body>
              </Card>
            </Col>
          </Row>

          {/* Subject Info */}
          <Card className="subject-card mb-4">
            <Card.Body className="d-flex align-items-center">
              <BookOpen className="text-primary me-3" size={24} />
              <div>
                <p className="mb-0 text-muted small">Subject</p>
                <h6 className="mb-0">{exam.subject_name?.replace(/_/g, ' ')}</h6>
              </div>
            </Card.Body>
          </Card>
        </div>

        {/* Instructions Section */}
        <Card className="instructions-card mb-4">
          <Card.Header className="bg-primary text-white">
            <h5 className="mb-0">
              <AlertCircle size={20} className="me-2" />
              Important Instructions
            </h5>
          </Card.Header>
          <Card.Body>
            <Alert variant="warning" className="mb-3">
              <strong>AI-Proctored Exam:</strong> This examination is monitored by artificial intelligence. 
              Please ensure you are in a well-lit, quiet environment.
            </Alert>

            <Row>
              <Col md={6}>
                <ul className="instruction-list">
                  <li>
                    <CheckCircle size={16} className="me-2 text-success" />
                    Ensure stable internet connection throughout the exam
                  </li>
                  <li>
                    <CheckCircle size={16} className="me-2 text-success" />
                    Keep your camera and microphone enabled
                  </li>
                  <li>
                    <CheckCircle size={16} className="me-2 text-success" />
                    Use a desktop or laptop for better experience
                  </li>
                  <li>
                    <CheckCircle size={16} className="me-2 text-success" />
                    Do not switch tabs or minimize the browser
                  </li>
                </ul>
              </Col>
              <Col md={6}>
                <ul className="instruction-list">
                  <li>
                    <CheckCircle size={16} className="me-2 text-success" />
                    Keep a valid photo ID ready for verification
                  </li>
                  <li>
                    <CheckCircle size={16} className="me-2 text-success" />
                    No external help or reference materials allowed
                  </li>
                  <li>
                    <CheckCircle size={16} className="me-2 text-success" />
                    Submit the exam before time runs out
                  </li>
                  <li>
                    <CheckCircle size={16} className="me-2 text-success" />
                    Contact support if you face technical issues
                  </li>
                </ul>
              </Col>
            </Row>
          </Card.Body>
        </Card>

        {/* Candidate Information Form */}
        <Card className="candidate-card mb-4">
          <Card.Header className="bg-light">
            <h5 className="mb-0">
              <User size={20} className="me-2" />
              Candidate Information
            </h5>
          </Card.Header>
          <Card.Body>
            <Row className="g-3">
              <Col md={4} sm={12}>
                <div className="form-group">
                  <label className="form-label">
                    <User size={16} className="me-2" />
                    Candidate Name <span className="text-danger">*</span>
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Enter your full name"
                    value={candidateName}
                    onChange={(e) => setCandidateName(e.target.value)}
                    required
                   style={{border:'1px solid black ' , textDecoration:'none',boxShadow:'none'}}

                  />
                </div>
              </Col>

              <Col md={4} sm={12}>
                <div className="form-group">
                  <label className="form-label">
                    <Users size={16} className="me-2" />
                    Father's Name <span className="text-danger">*</span>
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Enter father's name"
                    value={fatherName}
                    onChange={(e) => setFatherName(e.target.value)}
                    required
              style={{border:'1px solid black ' , textDecoration:'none',boxShadow:'none'}}


                  />
                </div>
              </Col>

              <Col md={4} sm={12}>
                <div className="form-group">
                  <label className="form-label">
                    <Phone size={16} className="me-2" />
                    Mobile Number <span className="text-danger">*</span>
                  </label>
                  <input
                    type="tel"
                    className="form-control"
                    placeholder="10 digit mobile number"
                    maxLength={10}
                    value={mobile}
                    onChange={(e) => setMobile(e.target.value.replace(/\D/g, ""))}
                    required
                   style={{border:'1px solid black ' , textDecoration:'none',boxShadow:'none'}}

                  />
                </div>
              </Col>
            </Row>
          </Card.Body>
        </Card>

        {/* Language Selection */}
        <Card className="language-card mb-4">
          <Card.Header className="bg-light">
            <h5 className="mb-0">
              <Languages size={20} className="me-2" />
              Select Exam Language
            </h5>
          </Card.Header>
          <Card.Body>
            <Row>
              <Col md={6} sm={12}>
                <div className="form-group">
                  <label className="form-label">
                    Preferred Language <span className="text-danger">*</span>
                  </label>
                  <select 
                    className="form-select form-select-lg" 
                    value={language} 
                    onChange={(e) => setLanguage(e.target.value)}
                  >
                    <option value="">-- Choose Language --</option>
                    <option value="en">English</option>
                    <option value="hi">हिंदी (Hindi)</option>
                    <option value="bn">বাংলা (Bengali)</option>
                    <option value="ta">தமிழ் (Tamil)</option>
                    <option value="te">తెలుగు (Telugu)</option>
                  </select>
                </div>
              </Col>
            </Row>
          </Card.Body>
        </Card>

        {/* Start Exam Button */}
        <div className="text-center">
          <Button
            variant="success"
            size="lg"
            disabled={!language || !candidateName || !fatherName || !mobile}
            onClick={startExam}
            className="start-exam-btn px-5 py-3"
          >
            <PlayCircle size={24} className="me-2" />
            Start Examination
          </Button>
          {(!language || !candidateName || !fatherName || !mobile) && (
            <p className="text-muted mt-3 mb-0">
              <AlertCircle size={16} className="me-1" />
              Please fill all required fields to proceed
            </p>
          )}
        </div>

        {/* Footer */}
        <div className="text-center mt-4 pt-4 border-top">
          <p className="text-muted small mb-0">
            <Shield size={14} className="me-1" />
            Your data is secure and encrypted. Good luck with your examination!
          </p>
        </div>
      </Container>
    </div>
  );
};

export default ScheduledExam;