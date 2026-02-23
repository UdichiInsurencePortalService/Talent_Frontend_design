import { Container, Row, Col, Button } from "react-bootstrap";
import "./IntegrationsHero.css";
import dashboardImg from "../../../images/dashboard.png";
import {
  FiSend,
  FiBarChart2,
  FiCheckSquare,
  FiLayers,
  FiTrendingUp,
} from "react-icons/fi";
const IntegrationsHero = () => {
  return (
    <>
    <section className="integration-hero">
      <Container>
        <Row className="align-items-center">
          
          {/* LEFT CONTENT */}
          <Col lg={6} md={12} className="text-section">
            <span className="integration-badge">
              &lt;/&gt; Integrations
            </span>

            <h1 className="hero-title">
              Seamless <span>Assessment</span><br />
              Integrations for Smarter<br />
              Hiring
            </h1>

            <p className="hero-desc">
              eSkill's talent assessment platform is equipped for seamless ATS,
              LMS, and HR system integration so you can manage applicant
              tracking in one place, with ease.
            </p>

            <Button className="hero-btn">Get a Demo</Button>
          </Col>

          {/* RIGHT IMAGE */}
          <Col lg={6} md={12} className="image-section">
            <img
              src={dashboardImg}
              alt="Assessment Integrations Dashboard"
              className="hero-image"
            />
          </Col>

        </Row>
      </Container>
    </section>

 <section className="integration-section">
      <Container>
        <Row className="align-items-center">
          
          {/* LEFT IMAGE */}
          <Col lg={6} md={12} className="image-col">
            <img
              src={dashboardImg}
              alt="ATS LMS HR Integrations Dashboard"
              className="integration-image"
            />
          </Col>

          {/* RIGHT CONTENT */}
          <Col lg={6} md={12} className="content-col">
            <span className="small-heading">INTEGRATION TYPES</span>

            <h2 className="main-heading">
              <span>ATS, LMS</span> and <span>HR</span> Integrations
            </h2>

            <p className="description">
              Manage your hiring process in one, centralized location.
              TSA’s talent assessment platform connects with top HR and ATS
              systems, allowing you to send pre-hire assessments, measure
              results, and extend offers all from one platform.
            </p>

            <p className="description">
              Need a custom solution? Reach out to see how our flexible API
              can help TSA fit into your existing tech stack.
            </p>

            <Button className="demo-btn">Get a Demo</Button>
          </Col>

        </Row>
      </Container>
    </section>


    {/*  */}



     <section className="integration-perks">
      <Container>
        {/* HEADER */}
        <div className="text-center mb-5">
          <span className="small-title">INTEGRATION PERKS</span>
          <h2 className="main-title">
            Optimize hiring with eSkill&apos;s integrations.
          </h2>
          <p className="subtitle">
            Managing your hiring process shouldn’t be complicated. With
            eSkill’s integrations, you can send tests, analyze results, and
            hire better — all while saving valuable time and resources.
            With an eSkill integration, you can:
          </p>
        </div>

        {/* PERKS GRID */}
        <Row className="gy-5">
          <Col lg={4} md={6}>
            <div className="perk-item">
              <FiSend className="perk-icon" />
              <h5>Send Assessments</h5>
              <p>
                Stop bouncing back and forth between platforms. Send talent
                assessments directly from your ATS.
              </p>
            </div>
          </Col>

          <Col lg={4} md={6}>
            <div className="perk-item">
              <FiBarChart2 className="perk-icon" />
              <h5>Measure Results</h5>
              <p>
                Get talent assessment results delivered straight to your ATS.
                Easily track candidates as they move through the hiring funnel.
              </p>
            </div>
          </Col>

          <Col lg={4} md={6}>
            <div className="perk-item">
              <FiCheckSquare className="perk-icon" />
              <h5>Increase Hiring Accuracy</h5>
              <p>
                Ensure consistent, data-driven hiring decisions with real-time
                access to testing results and candidate progress.
              </p>
            </div>
          </Col>

          <Col lg={6} md={6}>
            <div className="perk-item">
              <FiLayers className="perk-icon" />
              <h5>Integration Options</h5>
              <p>
                Keep hiring managers, recruiters, and HR teams aligned with
                centralized, easy-to-access talent assessment insights.
              </p>
            </div>
          </Col>

          <Col lg={6} md={6}>
            <div className="perk-item">
              <FiTrendingUp className="perk-icon" />
              <h5>Save Time & Boost Productivity</h5>
              <p>
                Streamline your pre-employment assessment process and focus
                on selecting top talent instead of managing disconnected tools.
              </p>
            </div>
          </Col>
        </Row>

        {/* CTA */}
        <div className="text-center mt-5">
          <Button className="demo-btn">Get a Demo</Button>
        </div>
      </Container>
    </section>

    {/*  */}



    <section className="integration-functionality">
      <Container>
        <Row className="align-items-center">
          
          {/* LEFT CONTENT */}
          <Col lg={6} md={12}>
            <span className="small-title">HOW TO INTEGRATE</span>

            <h2 className="main-heading">
              Integration <span>Functionality</span>
            </h2>

            <p className="intro-text">
              With eSkill's applicant tracking system integrations, you can
              send assessments and receive results directly within your HR
              system, eliminating the need to switch between platforms or
              manually enter candidate data. This ensures a streamlined,
              accurate, and automated hiring process from start to finish.
              Here’s how a typical integrated workflow works:
            </p>

            {/* STEP 1 */}
            <div className="step-card">
              <div className="step-number">1</div>
              <div>
                <h5>Assessment Creation</h5>
                <p>
                  Pre-employment assessments are created in eSkill and
                  automatically sync with your HR or ATS system, making them
                  available for candidate assignment.
                </p>
              </div>
            </div>

            {/* STEP 2 */}
            <div className="step-card">
              <div className="step-number">2</div>
              <div>
                <h5>Candidate Eligibility</h5>
                <p>
                  Once a candidate completes an application or other
                  prerequisite hiring steps, they become eligible for
                  pre-employment testing.
                </p>
              </div>
            </div>

            {/* STEP 3 */}
            <div className="step-card">
              <div className="step-number">3</div>
              <div>
                <h5>Assessment Invitation</h5>
                <p>
                  eSkill’s testing integration sends the relevant assessment
                  to candidates directly from your ATS, ensuring a seamless
                  experience.
                </p>
              </div>
            </div>

            {/* STEP 4 */}
            <div className="step-card">
              <div className="step-number">4</div>
              <div>
                <h5>Results Syncing</h5>
                <p>
                  Once the candidate completes the assessment, results are
                  instantly recorded in their HR profile—eliminating manual
                  data entry and enabling real-time review.
                </p>
              </div>
            </div>
          </Col>

          {/* RIGHT IMAGE */}
          <Col lg={6} md={12} className="image-col">
            <img
              src={dashboardImg}
              alt="Integration Workflow"
              className="workflow-image"
            />
          </Col>

        </Row>
      </Container>
    </section>

</>


  );
};

export default IntegrationsHero;
