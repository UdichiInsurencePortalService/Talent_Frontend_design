import React from "react";
import Assesmentreuse from "../../../Reusablecomponents/Assesmentreuse/Assesmentreuse";
import engineer from "../../../../images/engineer.png";
import Learnmore from "../../../Reusablecomponents/Learnmore/Learnmore";
import Card3 from "../../../Reusablecomponents/Card3/Card3";
import FeatureShowcase from "../../../Reusablecomponents/Featureshowcase/Featureshowcase";
import eng from "../../../../images/engineer1.png";
import Cardcomponent from "../../../Reusablecomponents/Cardcomponent/Cardcomponent";
import Testimonial from "../../../Reusablecomponents/Testimonial/Testimonial";

const Engineering = () => {
  const engineerdata = [
    {
      value: "8.4%",
      text: "Based on data from the U.S. Bureau of Labor Statistics, employment opportunities in civil engineering are projected to increase by 8.4% over the next five years.",
    },
    {
      value: "5%",
      text: "According to projections from the U.S. Bureau of Labor Statistics, mechanical engineering roles are expected to grow by 5% within the next five years.",
    },
    {
      value: "3%",
      text: "The U.S. Bureau of Labor Statistics estimates that computer engineering positions will see a 3% growth rate over the next five years.",
    },
  ];

  const engidetails = [
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
          tag="Industries > Engineering"
          title="Government Employment Assessments & Skills Testing for Federal, State & Local Agencies"
          highlight="Federal, State & Local Agencies"
          description="Identify qualified candidates with comprehensive assessments designed for public sector roles. Evaluate job-specific knowledge, compliance awareness, critical thinking, and administrative skills to ensure you hire professionals who can effectively serve communities and meet regulatory standards."
          //   buttonText="Get a Demo"
          image={engineer}
        />
      </div>
      <div>
        <Learnmore
          smallHeading="TSA"
          mainHeading="Engineering Pre-Employment Testing"
          description="Technical professionals must understand your products and how customers interact with them to perform effectively. That’s why organizations around the world rely on TSA’s engineering assessments to ensure technicians, technical support staff, and engineering candidates possess the appropriate knowledge and experience required for the role."
          //   onButtonClick={handleLearnMore}
        />
      </div>
      <div>
        <Card3 title="Statistics Speak For Themselves" data={engineerdata} />
      </div>

      <div>
        <FeatureShowcase
          tagText="TSA"
          titleHighlight="Top Skills & Abilities to"
          titleNormal="Evaluate in Engineering Candidates"
          description="Leverage TSA’s aptitude assessments to measure candidates’ understanding of essential subjects ranging from workplace safety regulations to legal terminology and public sector compliance standards. Identify professionals equipped with the knowledge and practical skills required to serve communities effectively and uphold government regulations."
          imageSrc={eng}
          imageAlt="Dashboard Preview"
          imageOnLeft={false}
          features={[
            {
              icon: "mechanical", // Wrench icon
              iconColor: "blue",
              title: "Mechanical Aptitude",
              description:
                "Foundational knowledge of mechanical systems and the capability to apply mechanical and electronic principles to solve technical problems effectively.",
            },
            {
              icon: "detail", // Search icon
              iconColor: "green",
              title: "Attention to Detail",
              description:
                "Strong accuracy and precision skills, as even small errors can cause major project delays or financial losses.",
            },
            {
              icon: "message", // MessageSquare icon
              iconColor: "purple",
              title: "Communication Skills",
              description:
                "Ability to explain technical concepts clearly and translate complex ideas for non-technical audiences.",
            },
          ]}
        />
      </div>

      <div>
        <Cardcomponent
          heading="Cognitive aptitude testing for building high-performing teams."
          highlight=""
          text="At TSA, our cognitive aptitude assessment solutions empower you to identify top talent quickly and confidently. Evaluate problem-solving skills, critical thinking abilities, and learning agility to create stronger, more productive teams."
          skillsData={engidetails}
        />
      </div>
      <div className="testimonial-section">
        <Testimonial />
      </div>
    </>
  );
};

export default Engineering;
