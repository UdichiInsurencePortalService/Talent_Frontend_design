import React, { useState } from "react";
import { Container, Row, Col, Card, Button, Modal, Form } from "react-bootstrap";
import "./Packages.css";

const Packages = () => {
  const [show, setShow] = useState(false);
  const [selectedPackage, setSelectedPackage] = useState("");

  const openModal = (pkg) => {
    setSelectedPackage(pkg);
    setShow(true);
  };

  return (
    <>
      <section className="packages-section">
        <Container>
          <div className="text-center mb-5">
            <span className="packages-label">PACKAGES</span>
            <h2 className="packages-title">
              Pre-employment skills tests that help you <br />
              accomplish your unique hiring goals.
            </h2>
          </div>

          <Row className="g-4 justify-content-center align-items-stretch">
            {/* GROWTH */}
            <Col lg={4} md={6}>
              <Card className="pricing-card light h-100">
                <Card.Body>
                  <h3 className="pricing-title">Growth</h3>
                  <p className="pricing-desc">
                    For organizations interested in getting started with basic
                    pre-hire assessments for a few roles.
                  </p>

                  <p className="includes-text">Includes:</p>
                  <ul className="pricing-list">
                    <li>Standardized Tests</li>
                    <li>Customized Mix-and-Match Tests</li>
                    <li>Complete Test Library</li>
                    <li>Anti-Cheat Tools</li>
                    <li>Standard ATS Integrations</li>
                    <li>Video Questions</li>
                    <li>Custom Branding</li>
                    <li>Behavioral Tests</li>
                    <li>30-Day Onboarding</li>
                    <li>Email, Chat & Phone Support</li>
                    <li>Candidate Support</li>
                  </ul>

                  <Button
                    className="talk-btn"
                    onClick={() => openModal("Growth")}
                  >
                    Talk To Sales
                  </Button>
                </Card.Body>
              </Card>
            </Col>

            {/* SCALE */}
            <Col lg={4} md={6}>
              <Card className="pricing-card dark highlight h-100">
                <Card.Body>
                  <h3 className="pricing-title text-white">Scale</h3>
                  <p className="pricing-desc dark-text">
                    For organizations who want to make pre-hire assessments a
                    key part of their hiring process for most roles.
                  </p>

                  <p className="includes-text dark-text">
                    Includes everything in Growth plus:
                  </p>

                  <ul className="pricing-list dark-text">
                    <li>One-Way Interviews</li>
                    <li>Custom Questions</li>
                    <li>Test Uploads & Digitization</li>
                    <li>Team Grading</li>
                    <li>Assessment Consulting</li>
                    <li>Dedicated Account Manager</li>
                  </ul>

                  <Button
                    className="talk-btn"
                    onClick={() => openModal("Scale")}
                  >
                    Talk To Sales
                  </Button>
                </Card.Body>
              </Card>
            </Col>

            {/* CUSTOM */}
            <Col lg={4} md={6}>
              <Card className="pricing-card light h-100">
                <Card.Body>
                  <h3 className="pricing-title">Custom</h3>
                  <p className="pricing-desc">
                    For larger organizations committed to assessing candidates'
                    skills across multiple divisions or locations.
                  </p>

                  <p className="pricing-desc">
                    Includes everything in Scale plus hyper-personalized
                    implementation solutions and best practices to achieve your
                    hiring goals.
                  </p>

                  <Button
                    className="talk-btn"
                    onClick={() => openModal("Custom")}
                  >
                    Talk To Sales
                  </Button>
                </Card.Body>
              </Card>
            </Col>
          </Row>
        </Container>
      </section>

      {/* MODAL */}
      <Modal show={show} onHide={() => setShow(false)} centered>
        <Modal.Header closeButton>
          <Modal.Title>Talk to Sales</Modal.Title>
        </Modal.Header>

        <Modal.Body>
          <Form>
            <Form.Group className="mb-3">
              <Form.Label>Full Name</Form.Label>
              <Form.Control placeholder="Enter full name" />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Email</Form.Label>
              <Form.Control type="email" placeholder="Enter email" />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Mobile Number</Form.Label>
              <Form.Control placeholder="Enter mobile number" />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Address</Form.Label>
              <Form.Control as="textarea" rows={2} />
            </Form.Group>

            <Form.Group className="mb-4">
              <Form.Label>Selected Package</Form.Label>
              <Form.Control value={selectedPackage} disabled />
            </Form.Group>

            <Button className="submit-btn w-100">
              Submit
            </Button>
          </Form>
        </Modal.Body>
      </Modal>
    </>
  );
};

export default Packages;
