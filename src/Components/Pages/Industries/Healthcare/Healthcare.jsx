import React from "react";
import Assesmentreuse from "../../../Reusablecomponents/Assesmentreuse/Assesmentreuse";
import heath from "../../../../images/Health.png";
import Learnmore from "../../../Reusablecomponents/Learnmore/Learnmore";
import Card3 from "../../../Reusablecomponents/Card3/Card3";
import FeatureShowcase from "../../../Reusablecomponents/Featureshowcase/Featureshowcase";
import health1 from "../../../../images/health-1.png"
import Cardcomponent from "../../../Reusablecomponents/Cardcomponent/Cardcomponent";
import Testimonial from "../../../Reusablecomponents/Testimonial/Testimonial";

const Healthcare = () => {

  const Healt = [
    {
      value: "110K",
      text: "Industry research indicates that more than 110,000 new positions are expected to open for medical and clinical laboratory professionals, showing strong career growth in this field.",
    },
    {
      value: "40%",
      text: "Companies using customized skill evaluation tools have reported major hiring improvements, with some reducing recruitment time by up to 40%.",
    },
    {
      value: "22%",
      text: "The healthcare sector continues to expand, with job opportunities for medical billing and coding specialists projected to increase by over 20% in the coming years.",
    },
  ];
  const details = [
    {
    icon: "🧪",
    title: "Job Simulations",
    description:
      "Evaluate real-world job capability by having candidates complete practical simulations such as multitasking exercises, live chat tasks, and MS Word or Excel activities. Custom simulations can also be developed to match specific role requirements.",
  },
  {
    icon: "🧠",
    title: "Situational Judgment Assessments",
    description:
      "Measure role suitability and workplace behavior by assessing how candidates respond to job-related scenarios. Includes evaluations for customer service, sales, remote leadership, and organizational change environments.",
  },
  {
    icon: "🛠",
    title: "Custom Test Creation",
    description:
      "Design personalized skill assessments using your own job-focused questions and materials. Build tests across multiple subjects tailored specifically to your organization’s needs.",
  },

  // 🔽 New ones added

  {
    icon: "💼",
    title: "Pre-Built Job Role Tests",
    description:
      "Select from a wide range of ready-made assessments designed for common roles like Financial Analyst, Firefighter, Office Manager, Emergency Responder, Maintenance Supervisor, and many more.",
  },
  {
    icon: "📘",
    title: "Subject-Focused Standard Tests",
    description:
      "Access hundreds of single-topic assessments that measure proficiency in specific areas such as Microsoft Word, Excel, Outlook, PowerPoint, and other core subjects.",
  },
  {
    icon: "🧩",
    title: "Modular Test Builder",
    description:
      "Quickly create multi-topic exams by combining questions from a large library of computer and non-computer subjects to match your exact hiring needs.",
  },
  ]

  return (
    <>
      <div>
        <Assesmentreuse
          tag="Industries > Healthcare"
          title="Healthcare Employment Assessments & Skills Testing"
          highlight="Healthcare Employment"
          description="Evaluate healthcare candidates with role-specific assessments designed to measure clinical knowledge, patient care understanding, and job readiness. These tests help ensure professionals meet industry standards, follow safety protocols, and deliver high-quality care in fast-paced medical environments."
          buttonText="Get a Demo"
          image={heath}
        />
      </div>
      <div>
        <Learnmore
          smallHeading="TSA"
          mainHeading="Healthcare Pre-Employment Testing"
          description="Healthcare organizations perform at their highest level when backed by capable and driven professionals such as CNAs, lab technicians, medical assistants, and essential support staff including medical coders, administrative personnel, and maintenance teams. The strength of your workforce’s technical skills plays a critical role in delivering quality care and achieving your mission—because uncertainty in skills can impact patient outcomes. With TSA’s authoring tools, you can design fully customized healthcare assessments to measure competencies ranging from HIPAA compliance to infectious disease safety practices."
          // onButtonClick={handleLearnMore}
        />
      </div>

      <div>
        <Card3 title="Statistics Speak For Themselves" data={Healt} />
      </div>

      <div>
        <FeatureShowcase
          tagText="TSA"
          titleHighlight="Key Skills and Competencies to"
          titleNormal="Seek in Healthcare Professionals"
          description="Use TSA’s aptitude assessments to evaluate candidates’ understanding of topics ranging from workplace safety practices to legal terminology and compliance knowledge."
          imageSrc={health1}
          imageAlt="Dashboard Preview"
          imageOnLeft={false}
          features={[
            {
              icon: "mechanical",
              title: "Healthcare Terminology & Regulations",
              description:
                "Assess candidates’ understanding of clinical vocabulary, HIPAA standards, and general medical procedures used in healthcare environments.",
            },
            {
              icon: "math",
              title: "Computer & Digital Literacy",
              description:
                "Evaluate basic computer proficiency, MS Office knowledge, internet usage, and system familiarity required for modern telehealth operations.",
            },
            {
              icon: "detail",
              title: "Medical Billing, Coding & Records",
              description:
                "Measure knowledge of medical coding systems, billing workflows, bookkeeping basics, and accurate healthcare documentation handling.",
            },
          ]}
        />
      </div>
      <div>
        <Cardcomponent
          heading="Assess cognitive abilities to create more "
          highlight="capable and high-performing teams."
          text="At TSA, our cognitive aptitude assessments enable you to identify high-potential candidates quickly and with greater accuracy. Evaluate problem-solving capabilities, critical thinking, and learning agility to build stronger, high-performing teams."
          skillsData={details}
        />
      </div>

      <div className="testimonial-section">
              <Testimonial />
            </div>
    </>
  );
};

export default Healthcare;
