import React, { useState } from "react";
import { Container } from "react-bootstrap";
import "./FAQ.css";

const faqs = [
  {
    q: "Does eSkill integrate with my ATS?",
    a: "Yes. eSkill integrates with most major Applicant Tracking Systems (ATS) to streamline candidate assessment and hiring workflows.",
  },
  {
    q: "What does a Dedicated Assessment Expert do?",
    a: "A Dedicated Assessment Expert helps you design, customize, and optimize assessments to ensure they align with your hiring goals.",
  },
  {
    q: "How do I know which plan is right for my organization?",
    a: "Our team will work closely with you to understand your hiring volume, roles, and goals to recommend the best plan.",
  },
  {
    q: "Can I customize assessments for different roles?",
    a: "Yes. You can fully customize assessments based on role requirements, skills, difficulty level, and evaluation criteria.",
  },
  {
    q: "Is candidate support included in all plans?",
    a: "Yes. All plans include candidate support to ensure a smooth testing experience for applicants.",
  },
];

const FAQ = () => {
  const [activeIndex, setActiveIndex] = useState(null);

  const toggleFAQ = (index) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  return (
    <section className="faq-section">
      <Container>
        <div className="faq-card">
          <h2 className="faq-title">FAQs</h2>

          {faqs.map((item, index) => (
            <div
              key={index}
              className={`faq-item ${activeIndex === index ? "active" : ""}`}
            >
              <div
                className="faq-question"
                onClick={() => toggleFAQ(index)}
              >
                <span>{item.q}</span>
                <span className="faq-icon">
                  {activeIndex === index ? "−" : "+"}
                </span>
              </div>

              <div className="faq-answer">
                <p>{item.a}</p>
              </div>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
};

export default FAQ;
