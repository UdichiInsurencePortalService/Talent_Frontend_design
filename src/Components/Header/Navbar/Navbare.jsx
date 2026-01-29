import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Navbar, Nav, NavDropdown, Container, Button } from "react-bootstrap";
import {
  FaCube,
  FaIndustry,
  FaBook,
  FaFolder,
  FaPlug,
  FaCreditCard,
} from "react-icons/fa";
import logo3 from "../../../../src/images/LOGO3.png";
import "bootstrap/dist/css/bootstrap.min.css";
import "./Navbar.css";

const PhoneIcon = () => <span>📞</span>;

const Topbar = () => {
  return (
    <div className="topbar-wrapper">
      <Container>
        <div className="topbar-inner">
          <ul className="top-links">
            <li>
              <PhoneIcon className="icon" />
              <Link to="/contact">08069640455</Link>
            </li>
          </ul>
          <ul className="top-contact">
            <li>
              <a href="#" role="button">
                Assessment Taker Resources
              </a>
            </li>
            
            <li>
              <Link to="/attendence" role="button">
                Attendence Login
              </Link>
            </li>
          </ul>
        </div>
      </Container>
    </div>
  );
};

const Navbare = () => {
  const [expanded, setExpanded] = useState(false);
  const handleNavClick = () => setExpanded(false);

  return (
    <>
      <Topbar />
      <Navbar
        expand="lg"
        className="custom-navbar"
        expanded={expanded}
        onToggle={setExpanded}
      >
        <Container fluid>
          <Navbar.Brand as={Link} to="/" onClick={handleNavClick}>
            <img src={logo3} alt="Talent Assessor" className="logo-img" />
          </Navbar.Brand>

          <Navbar.Toggle aria-controls="basic-navbar-nav" />

          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="ms-auto align-items-lg-center">
              {/* 🌐 PLATFORM DROPDOWN */}
              <NavDropdown
                title={
                  <>
                    <FaCube className="d-lg-none me-2" />
                    Platform
                  </>
                }
                id="platform-dropdown"
                className="mega-dropdown"
              >
                <Container>
                  <div className="row p-4 mega-dropdown-row">
                    {/* 🧩 Assessment Types column */}
                    <div className="col-lg-3 col-md-6 col-12 mb-4">
                      <Link to="/AssessmentTypes" onClick={handleNavClick}>
                        <h6 className="dropdown-header">Assessment Types</h6>
                      </Link>
                      <ul className="dropdown-list">
                        <li>
                          <Link to="/Skills" onClick={handleNavClick}>
                            Skills
                          </Link>
                        </li>
                        <li>
                          <Link to="/Cognitive" onClick={handleNavClick}>
                            Cognitive
                          </Link>
                        </li>
                        <li>
                          <Link to="/Behavioral" onClick={handleNavClick}>
                            Behavioral
                          </Link>
                        </li>
                        <li>
                          <Link
                            to="/PopularAssessments"
                            onClick={handleNavClick}
                          >
                            Popular Assessments
                          </Link>
                        </li>
                      </ul>
                    </div>

                    {/* ⚙️ Other Features column */}
                    <div className="col-lg-3 col-md-6 col-12 mb-4">
                      <h6 className="dropdown-header">Other Features</h6>
                      <ul className="dropdown-list">
                        <li>
                          <Link to="/Customization" onClick={handleNavClick}>
                            Customization
                          </Link>
                        </li>
                        <li>
                          <Link
                            to="/Dedicatedassessment"
                            onClick={handleNavClick}
                          >
                            Dedicated Assessment Experts
                          </Link>
                        </li>
                        <li>
                          <Link to="/Reporting" onClick={handleNavClick}>
                            Reporting
                          </Link>
                        </li>
                        <li>
                          <Link to="/Proctoring" onClick={handleNavClick}>
                            Proctoring
                          </Link>
                        </li>
                        <li>
                          <Link to="/TestDigitization" onClick={handleNavClick}>
                            Test Digitization
                          </Link>
                        </li>
                        <li>
                          <Link to="/Security" onClick={handleNavClick}>
                            Security & Compliance
                          </Link>
                        </li>
                      </ul>
                    </div>

                    {/* ❓ Question Styles column */}
                    <div className="col-lg-3 col-md-6 col-12 mb-4">
                      <Link to="/QuestionStyles" onClick={handleNavClick}>
                        <h6 className="dropdown-header">Question Styles</h6>
                      </Link>
                      <ul className="dropdown-list">
                        <li>
                          <Link to="/Simulation" onClick={handleNavClick}>
                            Simulation
                          </Link>
                        </li>
                        <li>
                          <Link
                            to="/QuestionStyles#multiple-choice"
                            onClick={handleNavClick}
                          >
                            Multiple Choice
                          </Link>
                        </li>
                        <li>
                          <Link
                            to="/QuestionStyles#Free-Response"
                            onClick={handleNavClick}
                          >
                            Free Response
                          </Link>
                        </li>
                        <li>
                          <Link to="/Video" onClick={handleNavClick}>
                            Video
                          </Link>
                        </li>
                      </ul>
                    </div>

                    {/* 🖥️ Platform Overview */}
                    <div className="col-lg-3 col-md-6 col-12">
                      <h6 className="dropdown-header">Platform Overview</h6>
                      <div className="mt-2">
                        <Link
                          to="/LearnMore"
                          className="learn-more-link text-decoration-none"
                          style={{
                            fontSize: "20px",
                            backgroundColor: "blue",
                            color: "white",
                            padding: "6px 12px",
                            borderRadius: "6px",
                            display: "inline-block",
                          }}
                          onClick={handleNavClick}
                        >
                          Learn More →
                        </Link>
                      </div>
                    </div>
                  </div>
                </Container>
              </NavDropdown>

              {/* INDUSTRIES DROPDOWN */}
              <NavDropdown
                title={
                  <>
                    <FaIndustry className="d-lg-none me-2" />
                    Industries
                  </>
                }
                id="industries-dropdown"
              >
                <Container style={{ width: "530px" }}>
                  <div className="row p-3">
                    <div className="col-6">
                      <NavDropdown.Item onClick={handleNavClick}>
                        Manufacturing
                      </NavDropdown.Item>
                      <NavDropdown.Item onClick={handleNavClick}>
                        Healthcare
                      </NavDropdown.Item>
                      <NavDropdown.Item onClick={handleNavClick}>
                        Construction
                      </NavDropdown.Item>
                      <NavDropdown.Item onClick={handleNavClick}>
                        Financial Services
                      </NavDropdown.Item>
                      <NavDropdown.Item onClick={handleNavClick}>
                        Education
                      </NavDropdown.Item>
                      <NavDropdown.Item onClick={handleNavClick}>
                        Call Centers
                      </NavDropdown.Item>
                      <NavDropdown.Item onClick={handleNavClick}>
                        Retail
                      </NavDropdown.Item>
                    </div>
                    <div className="col-6">
                      <NavDropdown.Item onClick={handleNavClick}>
                        Federal, State & Local Government
                      </NavDropdown.Item>
                      <NavDropdown.Item onClick={handleNavClick}>
                        Engineering
                      </NavDropdown.Item>
                      <NavDropdown.Item onClick={handleNavClick}>
                        Utilities/Energy
                      </NavDropdown.Item>
                      <NavDropdown.Item onClick={handleNavClick}>
                        Transportation and Logistics
                      </NavDropdown.Item>
                      <NavDropdown.Item onClick={handleNavClick}>
                        Staffing
                      </NavDropdown.Item>
                      <NavDropdown.Item onClick={handleNavClick}>
                        Hospitality
                      </NavDropdown.Item>
                      <NavDropdown.Item onClick={handleNavClick}>
                        Legal Services
                      </NavDropdown.Item>
                    </div>
                  </div>
                </Container>
              </NavDropdown>

              {/* RESOURCES DROPDOWN */}
              <NavDropdown
                title={
                  <>
                    <FaBook className="d-lg-none me-2" />
                    Resources
                  </>
                }
                id="resources-dropdown"
              >
                <NavDropdown.Item onClick={handleNavClick}>
                  Blog
                </NavDropdown.Item>
                <NavDropdown.Item onClick={handleNavClick}>
                  Case Studies
                </NavDropdown.Item>
                <NavDropdown.Item onClick={handleNavClick}>
                  Webinars
                </NavDropdown.Item>
                <NavDropdown.Item onClick={handleNavClick}>
                  ROI Calculator
                </NavDropdown.Item>
                <NavDropdown.Item onClick={handleNavClick}>
                  Hiring Glossary
                </NavDropdown.Item>
                <NavDropdown.Item onClick={handleNavClick}>
                  Assessment Taker Resources
                </NavDropdown.Item>
              </NavDropdown>

              {/* REGULAR NAV LINKS */}

              <Nav.Link
                as={Link}
                to="/AssessmentLibrary"
                onClick={handleNavClick}
                style={{ textDecoration: "none" }}
              >
                <FaFolder className="d-lg-none me-2" />
                Assessment Library
              </Nav.Link>
              <Nav.Link href="#" onClick={handleNavClick}>
                <FaPlug className="d-lg-none me-2" />
                Integrations
              </Nav.Link>
              <Nav.Link href="#" onClick={handleNavClick}>
                <FaCreditCard className="d-lg-none me-2" />
                Subscription Options
              </Nav.Link>

              {/* BUTTONS */}
              <div className="d-flex flex-column flex-lg-row gap-2 mt-3 mt-lg-0 ms-lg-3">
               <Link to="/examcode"
  className="custom-button"
  onClick={handleNavClick}
  style={{ color: "black", textDecoration: "none" }}
>
  Take Your Test
</Link>

                <Button
                  variant="outline-primary"
                  className="custom-button-2"
                  onClick={handleNavClick}
                >
                  Get a Demo
                </Button>
              </div>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>

      {/* 🧾 Custom styling */}
      <style jsx>{`
        /* Hover effect for dropdown list items */
        .dropdown-list li a {
          display: block;
          padding: 4px 6px;
          border-radius: 6px;
          color: #333;
          text-decoration: none !important;
          transition: all 0.3s ease;
          font-weight: 500;
          font-family: "Poppins", sans-serif;
        }

        .dropdown-list li a:hover {
          background-color: #0d6efd;
          color: #fff;
          padding-left: 16px;
        }

        .custom-navbar {
          background-color: #fff;
          box-shadow: 0 2px 6px rgba(0, 0, 0, 0.1);
          position: sticky;
          top: 0;
          z-index: 200;
        }

        .logo-img {
          height: 80px;
          width: auto;
        }

        .mega-dropdown .dropdown-menu {
          min-width: 950px;
          padding: 0;
        }

        .dropdown-header {
          font-weight: 700;
          font-size: 1rem;
          color: #0a0a0a;
          margin-bottom: 0.5rem;
          border-bottom: 2px solid #007bff;
          display: inline-block;
        }

        .dropdown-list {
          list-style: none;
          padding: 0;
          margin: 0;
        }

        .dropdown-list li {
          margin-bottom: 0.4rem;
        }

        .dropdown-list a {
          text-decoration: none;
          color: #333;
          transition: all 0.3s;
        }

        .dropdown-list a:hover {
          color: #007bff;
        }

        .menu-image {
          border-radius: 10px;
          box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
        }

        .learn-more-link {
          transition: all 0.3s ease;
        }

        .learn-more-link:hover {
          opacity: 0.9;
          transform: translateY(-2px);
        }

        @media (max-width: 991px) {
          .mega-dropdown .dropdown-menu {
            min-width: 100%;
          }

          .logo-img {
            height: 60px;
          }
        }

        @media (max-width: 576px) {
          .logo-img {
            height: 50px;
          }
        }
        /* ==================== Dropdown Scrollable Fix ==================== */
        .dropdown-menu {
          border: none;
          box-shadow: 0 8px 24px rgba(0, 0, 0, 0.12);
          border-radius: 12px;
          margin-top: 8px;
          padding: 0;
          animation: dropdownFadeIn 0.3s ease;
          overflow: hidden;
          max-height: 80vh;
          overflow-y: auto;
        }

        /* Mega Dropdown Specific */
        .mega-dropdown .dropdown-menu {
          min-width: 950px;
          max-height: 85vh;
          overflow-y: auto;
        }

        .mega-dropdown .dropdown-menu .row {
          padding: 20px !important;
        }

        /* Custom Scrollbar Styling */
        .dropdown-menu::-webkit-scrollbar {
          width: 8px;
        }

        .dropdown-menu::-webkit-scrollbar-track {
          background: #f1f1f1;
          border-radius: 10px;
        }

        .dropdown-menu::-webkit-scrollbar-thumb {
          background: #007bff;
          border-radius: 10px;
          transition: background 0.3s ease;
        }

        .dropdown-menu::-webkit-scrollbar-thumb:hover {
          background: #0056b3;
        }

        /* Firefox Scrollbar */
        .dropdown-menu {
          scrollbar-color: #007bff #f1f1f1;
          scrollbar-width: thin;
        }

        /* ==================== Container Fix ==================== */
        .mega-dropdown-container {
          background: white;
          max-height: calc(100vh - 200px);
          overflow-y: auto;
        }

        /* ==================== Tablet Responsive (768px - 991px) ==================== */
        @media (max-width: 991px) and (min-width: 768px) {
          .mega-dropdown .dropdown-menu {
            min-width: 100%;
            max-height: 75vh;
            overflow-y: auto;
          }

          .mega-dropdown .dropdown-menu .row {
            padding: 15px !important;
          }

          .dropdown-menu::-webkit-scrollbar {
            width: 6px;
          }
        }

        /* ==================== Mobile Responsive (576px - 767px) ==================== */
        @media (max-width: 767px) and (min-width: 576px) {
          .mega-dropdown .dropdown-menu {
            min-width: 100%;
            max-height: 70vh;
            overflow-y: auto;
          }

          .mega-dropdown .dropdown-menu .row {
            padding: 12px !important;
          }

          .dropdown-menu::-webkit-scrollbar {
            width: 5px;
          }

          .dropdown-header {
            font-size: 0.9rem;
          }

          .dropdown-list li a {
            font-size: 0.85rem;
            padding: 6px;
          }
        }

        /* ==================== Small Mobile (< 576px) ==================== */
        @media (max-width: 575px) {
          .dropdown-menu {
            max-height: 65vh;
            overflow-y: auto;
          }

          .mega-dropdown .dropdown-menu {
            min-width: 100%;
            max-height: 65vh;
            padding: 0 !important;
          }

          .mega-dropdown .dropdown-menu .row {
            padding: 10px !important;
          }

          .dropdown-menu .col-lg-3 {
            margin-bottom: 15px;
          }

          .dropdown-header {
            font-size: 0.85rem;
            margin-bottom: 0.6rem;
          }

          .dropdown-list li {
            margin-bottom: 0.3rem;
          }

          .dropdown-list li a {
            font-size: 0.8rem;
            padding: 5px 4px;
          }

          .dropdown-menu::-webkit-scrollbar {
            width: 4px;
          }
        }

        /* ==================== Landscape Orientation Fix ==================== */
        @media (max-width: 991px) and (orientation: landscape) {
          .dropdown-menu {
            max-height: 70vh;
          }

          .mega-dropdown .dropdown-menu {
            max-height: 70vh;
          }
        }

        /* ==================== Animation ==================== */
        @keyframes dropdownFadeIn {
          from {
            opacity: 0;
            transform: translateY(-10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>
    </>
  );
};

export default Navbare;
