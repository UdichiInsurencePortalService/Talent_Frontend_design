import React from "react";
import Assesmentreuse from "../../../Reusablecomponents/Assesmentreuse/Assesmentreuse";

import federal from "../../../../images/federal.png";
import Learnmore from "../../../Reusablecomponents/Learnmore/Learnmore";
import Card3 from "../../../Reusablecomponents/Card3/Card3";
import FeatureShowcase from "../../../Reusablecomponents/Featureshowcase/Featureshowcase";

import fed from "../../../../images/Federal2.png";
import Cardcomponent from "../../../Reusablecomponents/Cardcomponent/Cardcomponent";
import Testimonial from "../../../Reusablecomponents/Testimonial/Testimonial";

const FederalState = () => {
  const federaldata = [
    {
      value: "10%",
      text: "Research by IDC indicates that while 10% of advancement-oriented roles currently require Microsoft Office proficiency, that number is expected to rise to 10% in the coming years.",
    },
    {
      value: "7%",
      text: "Data from the Bureau of Labor Statistics projects an 7% growth in firefighter employment between 2020 and 2030, with approximately 27,000 job openings expected annually.",
    },
    {
      value: "9%",
      text: "According to the Bureau of Labor Statistics, administrative management positions are forecasted to grow by 9% over the projected employment period.",
    },
  ];

  const federaldetails = [
    {
      icon: "💼",
      title: "Role-Specific Job Assessments",
      description:
        "Access a broad library of ready-made assessments tailored for in-demand roles such as Financial Analyst, Firefighter, Office Manager, Emergency Responder, Maintenance Manager, and many others.",
    },
    {
      icon: "📘",
      title: "Individual Subject Skill Tests",
      description:
        "Choose from 600+ focused assessments designed to measure expertise in specific areas including Microsoft Word, Excel, Outlook, PowerPoint, and other essential workplace skills.",
    },
    {
      icon: "🧩",
      title: "Custom Multi-Subject Assessments",
      description:
        "Quickly create personalized evaluations by selecting questions from over 600 technical and non-technical subjects available in the TSA assessment library.",
    },
    {
      icon: "🖥️",
      title: "Real-World Simulations",
      description:
        "Evaluate practical ability through interactive simulations such as multitasking scenarios, live chat exercises, and Microsoft Word and Excel tasks. Custom simulations are also available upon request.",
    },
    {
      icon: "🎯",
      title: "Situational Judgment Assessments (SJT)",
      description:
        "Measure job compatibility and behavioral fit with assessments focused on Customer Service, Sales, Remote Leadership, and Change Management roles.",
    },
    {
      icon: "✍️",
      title: "Create & Upload Your Own Tests",
      description:
        "Use TSA Author to design fully customized skill assessments using your own job-specific questions and tailored content across multiple subject areas.",
    },
  ]

  return (
    <>
      <div>
        <Assesmentreuse
          tag="Industries > Federal, State & Local Government"
          title="Government Employment Assessments & Skills Testing for Federal, State & Local Agencies"
          highlight="Federal, State & Local Agencies"
          description="Identify qualified candidates with comprehensive assessments designed for public sector roles. Evaluate job-specific knowledge, compliance awareness, critical thinking, and administrative skills to ensure you hire professionals who can effectively serve communities and meet regulatory standards."
          //   buttonText="Get a Demo"
          image={federal}
        />
      </div>
      <div>
        <Learnmore
          smallHeading="TSA"
          mainHeading="Federal, State & Local Government Pre-Employment Assessments"
          description="Public sector organizations require skilled professionals—from administrative staff and emergency responders to maintenance personnel—to deliver essential community services efficiently. At the same time, agencies must modernize their hiring processes by transitioning from paper-based exams to secure digital testing environments. Our online assessment solutions support remote hiring with advanced features such as identity verification, online proctoring, and customizable exams. Video response questions allow panel interviews to be conducted virtually, while Team Scoring tools enable hiring committees to collaboratively evaluate and rate candidate responses with accuracy and fairness."
          // onButtonClick={handleLearnMore}
        />
      </div>
      <div>
        <Card3 title="Statistics Speak For Themselves" data={federaldata} />
      </div>

      <div>
        <FeatureShowcase
          tagText="TSA"
          titleHighlight="Key Skills & Competencies to Evaluate in"
          titleNormal="Federal, State & Local Government Roles"
          description="Leverage TSA’s aptitude assessments to measure candidates’ understanding of essential subjects ranging from workplace safety regulations to legal terminology and public sector compliance standards. Identify professionals equipped with the knowledge and practical skills required to serve communities effectively and uphold government regulations."
          imageSrc={fed}
          imageAlt="Dashboard Preview"
          imageOnLeft={false}
          features={[
            {
              icon: "settings",
              title: "Administrative Expertise",
              description:
                "Strong clerical and office management skills including typing, data entry, bookkeeping, contract coordination, and quality customer service.",
            },
            {
              icon: "users",
              title: "Organizational & Collaboration Skills",
              description:
                "Works effectively with managers, elected officials, and community members while maintaining structured communication and workflow management.",
            },
            {
              icon: "shield",
              title: "Technical & Specialized Capabilities",
              description:
                "Role-specific expertise for firefighters, EMTs, dispatchers, maintenance teams, and other specialized public service professionals.",
            },
          ]}
        />
      </div>
      <div>
        <Cardcomponent
          heading="Cognitive aptitude testing for building high-performing teams."
          highlight=""
          text="At TSA, our cognitive aptitude assessment solutions empower you to identify top talent quickly and confidently. Evaluate problem-solving skills, critical thinking abilities, and learning agility to create stronger, more productive teams."
          skillsData={federaldetails}
        />
      </div>
      <div className="testimonial-section">
        <Testimonial />
      </div>
    </>
  );
};

export default FederalState;
