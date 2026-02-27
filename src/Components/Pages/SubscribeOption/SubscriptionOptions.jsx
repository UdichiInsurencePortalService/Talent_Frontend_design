import React from "react";
import { Container, Row, Col, Button } from "react-bootstrap";
import "./SubscriptionOptions.css";
import Packages from "./Packages/Pacakages";
import FAQ from "./FAQ/FAQ.jsx";
import Testimonial from '../../Reusablecomponents/Testimonial/Testimonial'

const SubscriptionOptions = () => {
  return (
    <>
    <section className="subscription-hero">
      <Container>
        <Row className="align-items-center">
          
          {/* LEFT CONTENT */}
          <Col lg={6} md={12} className="text-section">
            <h1 className="hero-title">
              Pre-employment <br />
              assessment <br />
              subscription options
            </h1>

            <p className="hero-text">
              The eSkill Pre-Hire Assessment Platform helps you assess
              candidate skills to make better hires. With a large test
              library, customizable assessments, and Dedicated Assessment
              Expert support, you can confidently hire for virtually any
              position.
            </p>

            <p className="hero-text">
              Whatever your needs, we’ll work with you to put together a
              solution that makes sense for your business.
            </p>

            <div className="hero-buttons">
              <Button className="btn-primary-custom">
                Take Your Test
              </Button>
              <Button className="btn-secondary-custom">
                Get a Demo
              </Button>
            </div>
          </Col>

          {/* RIGHT – CODE BASED DESIGN */}
          <Col lg={6} md={12} className="cards-wrapper">
            <div className="cards-circle">

              <div className="package-card left">
                <div className="icon-circle" />
                <div className="line short" />
                <div className="line" />
              </div>

              <div className="package-card main">
                <div className="icon-circle active" />
                <div className="line short" />
                <div className="line" />
                <button className="select-btn">SELECT</button>
              </div>

              <div className="package-card right">
                <div className="icon-circle" />
                <div className="line short" />
                <div className="line" />
              </div>

            </div>
          </Col>

        </Row>
      </Container>
    </section>

    {/*  */}

  <div className="pakeages">
    <Packages/> 
    </div>

     <div className="pakeages">
    <FAQ/>
    </div>

    {/*  */}

    <div className="testimonial-section">
        <Testimonial/>
    </div>
    </>
  );
};

export default SubscriptionOptions;
