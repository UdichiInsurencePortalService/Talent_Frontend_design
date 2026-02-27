import react from "react";
import Assesmentreuse from "../../../Reusablecomponents/Assesmentreuse/Assesmentreuse";
import utiliti from "../../../../images/utilities.png";
import utiliti1 from "../../../../images/utilities2.png";
import Learnmore from "../../../Reusablecomponents/Learnmore/Learnmore";
import Card3 from "../../../Reusablecomponents/Card3/Card3";
import FeatureShowcase from "../../../Reusablecomponents/Featureshowcase/Featureshowcase";
import Cardcomponent from "../../../Reusablecomponents/Cardcomponent/Cardcomponent";
import Testimonial from "../../../Reusablecomponents/Testimonial/Testimonial";

const UtilitiesEnergy = () => {
  const utilitidata = [
    {
      value: "10%",
      text: "Our assessment solutions supported Conservice, the largest utility management and billing provider in the U.S., in lowering employee turnover by 10%.",
    },
    {
      value: "65%",
      text: "By streamlining their hiring process, Texas811 successfully reduced their time-to-hire by 65% with our testing platform.",
    },
    {
      value: "30,000+",
      text: "In 2023, energy-related manufacturing saw a 3% employment growth, resulting in the addition of more than 30,000 new jobs.",
    },
  ];

  const utilitidetails = [
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
          tag="Industries > Utilities & Energy"
          title="Employment Assessments & Skills Tests for Utilities/Energy"
          highlight="for Utilities/Energy"
          description="Identify top talent in the utilities and energy sector with targeted pre-employment assessments. Evaluate technical expertise, safety awareness, and problem-solving skills to ensure candidates are prepared for high-responsibility roles in power, infrastructure, and energy operations."
          //   buttonText="Get a Demo"
          image={utiliti}
        />
      </div>
      <div>
        <Learnmore
          smallHeading="TSA"
          mainHeading="Utilities/Energy Pre-Employment Testing"
          description="Utilities and energy organizations depend on highly skilled, safety-focused professionals to manage and maintain essential infrastructure — including power grids, water treatment facilities, renewable energy systems, and pipeline networks.
With TSA’s pre-employment assessment solutions, you can verify that candidates possess the technical knowledge, mechanical capability, and regulatory understanding needed to operate systems safely and efficiently. Evaluate competencies such as troubleshooting, equipment handling, and safety compliance through customizable assessments and interactive simulations."
          //   onButtonClick={handleLearnMore}
        />
      </div>
      <div>
        <Card3 title="Statistics Speak For Themselves" data={utilitidata} />
      </div>
      <div>
        <FeatureShowcase
          tagText="TSA"
          titleHighlight="Top Skills & Abilities to"
          titleNormal="Evaluate in Utilities/Energy Professionals"
          description="Use TSA’s aptitude assessments to measure candidates’ expertise in essential areas — from workplace safety standards and regulatory compliance to technical knowledge and operational procedures — ensuring you hire reliable and job-ready talent."
          imageSrc={utiliti1}
          imageAlt="Dashboard Preview"
          imageOnLeft={false}
          features={[
            {
              icon: "Settings",
              iconColor: "text-blue-600",
              title: "Technical & Mechanical Skills",
              description:
                "Measure a candidate’s capability to handle equipment, diagnose mechanical issues, and effectively work with tools and operational systems commonly used in the utilities and energy sector.",
            },
            {
              icon: "SearchCheck",
              iconColor: "text-green-600",
              title: "Accuracy & Precision",
              description:
                "Determine how well candidates focus on small details, follow standard operating procedures, and maintain high levels of accuracy to ensure safe and efficient performance in critical environments.",
            },
            {
              icon: "ShieldCheck",
              iconColor: "text-red-600",
              title: "Regulatory & Safety Knowledge",
              description:
                "Evaluate understanding of workplace safety standards, environmental compliance requirements, and industry regulations such as OSHA to promote secure and compliant operations.",
            },
          ]}
        />
      </div>
      <div>
        <Cardcomponent
          heading="Cognitive aptitude testing for building high-performing teams."
          highlight=""
          text="At TSA, our cognitive aptitude assessment solutions empower you to identify top talent quickly and confidently. Evaluate problem-solving skills, critical thinking abilities, and learning agility to create stronger, more productive teams."
          skillsData={utilitidetails}
        />
      </div>
      <div className="testimonial-section">
        <Testimonial />
      </div>
    </>
  );
};

export default UtilitiesEnergy;
