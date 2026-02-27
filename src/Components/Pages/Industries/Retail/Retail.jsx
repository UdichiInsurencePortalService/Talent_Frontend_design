import React from "react";
import Assesmentreuse from "../../../Reusablecomponents/Assesmentreuse/Assesmentreuse";
import ret from "../../../../images/retail1.png";
import Learnmore from "../../../Reusablecomponents/Learnmore/Learnmore";
import Card3 from "../../../Reusablecomponents/Card3/Card3";
import FeatureShowcase from "../../../Reusablecomponents/Featureshowcase/Featureshowcase";
import Cardcomponent from "../../../Reusablecomponents/Cardcomponent/Cardcomponent";
import retails2 from "../../../../images/retail2.png";
import Testimonial from "../../../Reusablecomponents/Testimonial/Testimonial";


const Retail = () => {
  const retaildata = [
    {
      value: "63%",
      text: "A global specialty retailer reduced its applicant pool by 63% after identifying candidates who failed to meet minimum qualification standards.",
    },
    {
      value: "54%",
      text: "Research by Adobe revealed that 54% of retailers consider customer experience their top strategic priority.",
    },
    {
      value: "68%",
      text: "According to HubSpot, 68% of consumers are willing to spend more on products and services when they receive an excellent customer experience.",
    },
  ];
  const retaildetails = [
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
  ];

  return (
    <>
      <div>
        <Assesmentreuse
          tag="Industries > Retail"
          title="Retail Employment Assessments & Skills Testing"
          highlight="Retail Employment"
          description="Evaluate call center candidates with skill-based employment tests that measure communication, customer handling, and problem-solving abilities."
          //   buttonText="Get a Demo"
          image={ret}
        />
      </div>
      <div>
        <Learnmore
          smallHeading="TSA"
          mainHeading="Retail Pre-Employment Assessments"
          description="Sales associates and customer service representatives are the face of your brand, ensuring accurate orders and delivering outstanding customer experiences. Meanwhile, warehouse staff and shipping coordinators must efficiently pack and dispatch products to guarantee timely and accurate deliveries. TSA’s retail skills assessments feature practical questions and real-world simulations that measure the critical abilities required for success—helping you confidently build a high-performing retail and distribution team."
          // onButtonClick={handleLearnMore}
        />
      </div>
      <div>
        <Card3 title="Statistics Speak For Themselves" data={retaildata} />
      </div>

      <div>
        <FeatureShowcase
          tagText="TSA"
          titleHighlight="Key Skills & Competencies to"
          titleNormal="Evaluate in Retail Professionals"
          description="Leverage TSA’s aptitude assessments to measure candidates’ understanding of essential areas ranging from workplace safety standards to industry regulations and professional terminology. Identify retail talent equipped with the knowledge and practical skills needed to succeed in dynamic customer-focused environments."
          imageSrc={retails2}
          imageAlt="Dashboard Preview"
          imageOnLeft={false}
          features={[
            {
              icon: "message",
              title: "Strong Communication Abilities",
              description:
                "Express ideas clearly and confidently, maintain a positive tone, use persuasive language wisely, and handle difficult or upset customers with professionalism.",
            },
            {
              icon: "settings",
              title: "Effective Multitasking",
              description:
                "Manage multiple customer interactions at once while staying organized and delivering quick, accurate resolutions.",
            },
            {
              icon: "target",
              title: "Analytical & Problem-Solving Skills",
              description:
                "Identify customer concerns efficiently, think critically to resolve product or service issues, and transform negative experiences into long-term customer loyalty.",
            },
          ]}
        />
      </div>
      <div>
        <Cardcomponent
          heading="Cognitive Ability Assessments for High-Performing Teams"
          highlight=""
          text="At TSA, our cognitive ability testing solutions empower you to identify high-potential candidates quickly and with greater confidence. Evaluate critical thinking, analytical reasoning, problem-solving skills, and learning agility to build resilient, capable, and future-ready teams."
          skillsData={retaildetails}
        />
      </div>
      <div className="testimonial-section">
        <Testimonial />
      </div>
    </>
  );
};

export default Retail;
