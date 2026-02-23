import React, { useState, useRef } from "react";
import {
  Container,
  Row,
  Col,
  Form,
  Button,
  Card,
  Modal,
  Toast,
  ToastContainer,
  Badge,
} from "react-bootstrap";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";
import "./Attendence.css";

export default function AttendancePage() {
  const [formData, setFormData] = useState({
    examCode: "",
    institutionName: "",
    fullName: "",
    fatherName: "",
    mobileNumber: "",
    aadharNumber: "",
    photo: null,
  });

  const [photoPreview, setPhotoPreview] = useState(null);
  const [showCamera, setShowCamera] = useState(false);
  const [stream, setStream] = useState(null);

  const [locationEnabled, setLocationEnabled] = useState(false);
  const [candidateLat, setCandidateLat] = useState(null);
  const [candidateLng, setCandidateLng] = useState(null);

  const [toastMsg, setToastMsg] = useState("");
  const [toastVariant, setToastVariant] = useState("success");
  const [showToast, setShowToast] = useState(false);

  const videoRef = useRef(null);
  const canvasRef = useRef(null);

  /* ================= INPUT ================= */
  const handleChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  /* ================= LOCATION ================= */
  const enableLocation = () => {
    if (!navigator.geolocation) {
      setToastMsg("Geolocation not supported");
      setToastVariant("danger");
      setShowToast(true);
      return;
    }

    navigator.geolocation.getCurrentPosition(
      (pos) => {
        setCandidateLat(pos.coords.latitude);
        setCandidateLng(pos.coords.longitude);
        setLocationEnabled(true);
        setToastMsg("📍 Location enabled successfully");
        setToastVariant("success");
        setShowToast(true);
      },
      () => {
        setToastMsg("Location permission denied");
        setToastVariant("danger");
        setShowToast(true);
      },
      { enableHighAccuracy: true }
    );
  };

  /* ================= CAMERA ================= */
  const openCamera = async () => {
    const mediaStream = await navigator.mediaDevices.getUserMedia({ video: true });
    setStream(mediaStream);
    setShowCamera(true);
    setTimeout(() => (videoRef.current.srcObject = mediaStream), 200);
  };

  const closeCamera = () => {
    if (stream) stream.getTracks().forEach((t) => t.stop());
    setShowCamera(false);
  };

  const capturePhoto = () => {
    const canvas = canvasRef.current;
    const video = videoRef.current;

    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;
    canvas.getContext("2d").drawImage(video, 0, 0);

    canvas.toBlob((blob) => {
      setFormData({ ...formData, photo: blob });
      setPhotoPreview(canvas.toDataURL("image/jpeg"));
      closeCamera();
    });
  };

  /* ================= SUBMIT ================= */
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!locationEnabled) {
      setToastMsg("Please enable location");
      setToastVariant("danger");
      setShowToast(true);
      return;
    }

    if (!formData.photo) {
      setToastMsg("Please capture photo");
      setToastVariant("danger");
      setShowToast(true);
      return;
    }

    try {
      await axios.post("http://localhost:8080/api/attendance/submit", {
        exam_code: formData.examCode,
        institution_name: formData.institutionName,
        fullName: formData.fullName,
        fatherName: formData.fatherName,
        mobileNumber: formData.mobileNumber,
        aadharNumber: formData.aadharNumber,
        candidateLat,
        candidateLng,
        photoBase64: photoPreview.split(",")[1],
      });

      setToastMsg("✅ Attendance completed successfully");
      setToastVariant("success");
      setShowToast(true);

      /* RESET */
      setFormData({
        examCode: "",
        institutionName: "",
        fullName: "",
        fatherName: "",
        mobileNumber: "",
        aadharNumber: "",
        photo: null,
      });

      setPhotoPreview(null);
      setLocationEnabled(false);
      setCandidateLat(null);
      setCandidateLng(null);
    } catch (err) {
      setToastMsg(
        err?.response?.data?.error || "Attendance submission failed"
      );
      setToastVariant("danger");
      setShowToast(true);
    }
  };

  return (
    <>
      <Container className="py-5">
        <Card className="shadow-lg p-4 mx-auto" style={{ maxWidth: 900 }}>
          <h3 className="text-center fw-bold mb-4">
            📋 Attendance Registration
          </h3>

          <Form onSubmit={handleSubmit}>
            {/* EXAM DETAILS */}
            <Card className="p-3 mb-4 bg-light">
              <h5 className="fw-bold mb-3">Exam Details</h5>
              <Row>
                <Col md={6}>
                  <Form.Label>Exam Code</Form.Label>
                  <Form.Control
                    name="examCode"
                    value={formData.examCode}
                    placeholder="Enter exam code"
                    onChange={handleChange}
                    required
                  />
                </Col>
                <Col md={6}>
                  <Form.Label>Institution Name</Form.Label>
                  <Form.Control
                    name="institutionName"
                    value={formData.institutionName}
                    placeholder="Enter institution name"
                    onChange={handleChange}
                    required
                  />
                </Col>
              </Row>
            </Card>

            {/* CANDIDATE DETAILS */}
            <Card className="p-3 mb-4 bg-light">
              <h5 className="fw-bold mb-3">Candidate Details</h5>
              <Row className="mb-3">
                <Col md={6}>
                  <Form.Label>Full Name</Form.Label>
                  <Form.Control
                    name="fullName"
                    value={formData.fullName}
                    placeholder="Enter full name"
                    onChange={handleChange}
                    required
                  />
                </Col>
                <Col md={6}>
                  <Form.Label>Father Name</Form.Label>
                  <Form.Control
                    name="fatherName"
                    value={formData.fatherName}
                    placeholder="Enter father name"
                    onChange={handleChange}
                    required
                  />
                </Col>
              </Row>

              <Row>
                <Col md={6}>
                  <Form.Label>Mobile Number</Form.Label>
                  <Form.Control
                    name="mobileNumber"
                    value={formData.mobileNumber}
                    placeholder="Enter mobile number"
                    onChange={handleChange}
                    required
                  />
                </Col>
                <Col md={6}>
                  <Form.Label>Aadhar Number</Form.Label>
                  <Form.Control
                    name="aadharNumber"
                    value={formData.aadharNumber}
                    placeholder="Enter Aadhar number"
                    onChange={handleChange}
                    required
                  />
                </Col>
              </Row>
            </Card>

            {/* LOCATION */}
            <div className="text-center mb-4">
              <Button
                type="button"
                variant={locationEnabled ? "success" : "outline-primary"}
                onClick={enableLocation}
              >
                {locationEnabled ? "📍 Location Enabled" : "Enable Live Location"}
              </Button>
              {locationEnabled && (
                <div className="mt-2">
                  <Badge bg="success">Verified</Badge>
                </div>
              )}
            </div>

            {/* PHOTO */}
            <div className="text-center mb-4">
              {!photoPreview ? (
                <Button type="button" onClick={openCamera}>
                  📷 Open Camera
                </Button>
              ) : (
                <>
                  <img
                    src={photoPreview}
                    className="img-thumbnail mb-2"
                    width={220}
                    alt="preview"
                  />
                  <br />
                  <Button type="button" variant="warning" onClick={openCamera}>
                    Retake Photo
                  </Button>
                </>
              )}
            </div>

            <Button type="submit" size="lg" className="w-100">
              Submit Attendance
            </Button>
          </Form>
        </Card>
      </Container>

      {/* CAMERA MODAL */}
      <Modal show={showCamera} onHide={closeCamera} centered>
        <Modal.Body className="text-center">
          <video ref={videoRef} autoPlay className="w-100 rounded" />
          <canvas ref={canvasRef} hidden />
          <Button className="mt-3" onClick={capturePhoto}>
            Capture Photo
          </Button>
        </Modal.Body>
      </Modal>

      {/* TOAST */}
      <ToastContainer position="top-end">
        <Toast
          bg={toastVariant}
          show={showToast}
          onClose={() => setShowToast(false)}
          autohide
          delay={3000}
        >
          <Toast.Body className="text-white fw-semibold">
            {toastMsg}
          </Toast.Body>
        </Toast>
      </ToastContainer>
    </>
  );
}
