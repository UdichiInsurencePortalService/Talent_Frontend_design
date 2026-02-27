import React from "react";
import Assesmentreuse from "../../../Reusablecomponents/Assesmentreuse/Assesmentreuse";
import fi1 from "../../../../images/Financial1.png";
import finance from "../../../../images/Financial.png";

import Learnmore from "../../../Reusablecomponents/Learnmore/Learnmore";
import Card3 from "../../../Reusablecomponents/Card3/Card3";
import FeatureShowcase from "../../../Reusablecomponents/Featureshowcase/Featureshowcase";
import Cardcomponent from "../../../Reusablecomponents/Cardcomponent/Cardcomponent";
import Testimonial from "../../../Reusablecomponents/Testimonial/Testimonial";
const FinancialServices = () => {
  const Financdata = [
    {
      value: "$190,000+ in Savings",
      text: "A leading credit card provider cut hiring-related costs by more than $190,000 after implementing TSA’s assessment solutions.",
    },
    {
      value: "33% Faster Hiring",
      text: "TSA supported Encore Exchange, a healthcare billing organization, in shortening their recruitment cycle by 33%, helping them onboard talent more efficiently.",
    },
  ];
  
  const financdetails = [
    {
      icon: "🩺",
      title: "Medical Language & Healthcare Terms",
      description:
        "Assess understanding of clinical vocabulary, medical terminology, HIPAA concepts, and general healthcare procedures used in medical environments.",
    },
    {
      icon: "📋",
      title: "Healthcare Protocol Knowledge",
      description:
        "Evaluate awareness of standard medical practices, patient data privacy rules, and essential procedures followed in healthcare settings.",
    },
    {
      icon: "💻",
      title: "Basic Computer Proficiency",
      description:
        "Measure comfort with MS Office tools, online systems, and general computer operations required for modern healthcare and telehealth services.",
    },
    {
      icon: "🌐",
      title: "Digital & Internet Skills",
      description:
        "Test the ability to navigate web-based platforms, manage digital records, and adapt to technology-driven healthcare workflows.",
    },
    {
      icon: "💳",
      title: "Medical Billing Knowledge",
      description:
        "Assess familiarity with billing procedures, insurance documentation, and financial record handling within healthcare organizations.",
    },
    {
      icon: "🗂️",
      title: "Coding & Record Management",
      description:
        "Evaluate skills in medical coding, documentation accuracy, bookkeeping basics, and the use of healthcare data systems.",
    },
  ];
  return (
    <>
      <div>
        <Assesmentreuse
          tag="Industries > Financial Services"
          title="Employment Assessments & Skills Tests for Financial Services"
          highlight="Financial Services"
          description="TSA provides specialized assessment solutions to help financial organizations hire accurate, detail-oriented, and trustworthy professionals. Our tests evaluate critical skills like numerical ability, compliance awareness, data accuracy, and financial decision-making. Identify candidates who can handle sensitive financial tasks with precision and confidence."
          //   buttonText="Get a Demo"
          image={finance}
        />
      </div>
      <div>
        <Learnmore
          smallHeading="TSA"
          mainHeading="Financial Services Pre-Employment Testing"
          description="When recruiting analysts, advisors, or client-facing professionals, precision, ethics, and strong analytical skills are essential in the financial sector. Even a small error can impact credibility and client confidence. TSA’s pre-employment assessments help you select candidates with the right technical expertise, numerical aptitude, and attention to detail needed in finance roles. Measure abilities such as Excel skills, bookkeeping, financial analysis, customer support, and regulatory knowledge through customizable tests and practical, job-focused simulations."
          // onButtonClick={handleLearnMore}
        />
      </div>

      <div>
        <Card3 title="Statistics Speak For Themselves" data={Financdata} />
      </div>

      <div>
        <FeatureShowcase
          tagText="TSA"
          titleHighlight="Key Skills & Competencies to Seek in"
          titleNormal="Financial Services Professionals"
          description="Leverage TSA’s aptitude assessments to measure candidates’ understanding across important areas, ranging from regulatory compliance and workplace standards to financial terminology and industry-specific knowledge."
          imageSrc={fi1}
          imageAlt="Dashboard Preview"
          imageOnLeft={false}
          features={[
            {
              icon: "excel",
              title: "Excel Proficiency & Financial Data Handling",
              description:
                "Measure a candidate’s skill in using spreadsheets, advanced formulas, pivot tables, and data analysis techniques to support accurate financial planning and decision-making.",
            },
            {
              icon: "detail",
              title: "High Level of Accuracy",
              description:
                "Critical for reviewing financial records, reconciling statements, and preventing expensive mistakes in large-scale financial operations.",
            },
            {
              icon: "compliance",
              title: "Client Communication & Regulatory Knowledge",
              description:
                "Evaluate how well candidates simplify complex financial topics for clients while following industry regulations and compliance standards such as FINRA, SEC, and data protection laws.",
            },
          ]}
        />
      </div>

      <div>
        <Cardcomponent
          heading="Cognitive aptitude assessments for building high-performing teams. "
          highlight="building high-performing teams."
          text="At TSA, our cognitive testing solutions help you recognize top talent quickly and with greater precision. Evaluate candidates’ problem-solving skills, critical thinking ability, and capacity to learn, so you can develop stronger and more effective teams."
          skillsData={financdetails}
        />
      </div>
      <div className="testimonial-section">
        <Testimonial />
      </div>
    </>
  );
};

export default FinancialServices;
