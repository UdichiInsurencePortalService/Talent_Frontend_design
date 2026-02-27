import React from "react";
import Assesmentreuse from "../../../Reusablecomponents/Assesmentreuse/Assesmentreuse";
import call from "../../../../images/Call.png";
import Learnmore from "../../../Reusablecomponents/Learnmore/Learnmore";
import Card3 from "../../../Reusablecomponents/Card3/Card3";
import FeatureShowcase from "../../../Reusablecomponents/Featureshowcase/Featureshowcase";
import call1 from "../../../../images/Call1.png";
import Cardcomponent from "../../../Reusablecomponents/Cardcomponent/Cardcomponent";
import Testimonial from "../../../Reusablecomponents/Testimonial/Testimonial";

const CallCenters = () => {
  const calldata = [
    {
      value: "96%",
      text: "Research from the Customer Experience Impact (CEI) Report shows that 96% of customers are willing to spend more when they receive outstanding customer service.",
    },
    {
      value: "95%",
      text: "HubSpot reports that 95% of consumers are more likely to become repeat buyers after experiencing excellent customer support.",
    },
    {
      value: "97%",
      text: "A Zendesk study found that 97% of customers switch to competitors due to poor customer service experiences.",
    },
  ];

  const calldetails = [
    {
      icon: "💼",
      title: "Role-Specific Job Assessments",
      description:
        "Access a comprehensive library of pre-built tests tailored for high-demand roles including Financial Analyst, Firefighter, Office Manager, Emergency Responder, Maintenance Manager, and many others.",
    },
    {
      icon: "📘",
      title: "Subject-Focused Skill Tests",
      description:
        "Select from 600+ individual subject assessments that evaluate proficiency in tools and topics such as Microsoft Word, Excel, Outlook, PowerPoint, and other professional competencies.",
    },
    {
      icon: "🧩",
      title: "Build Custom Multi-Subject Tests",
      description:
        "Quickly create personalized assessments by combining questions from over 600 technical and non-technical subjects available in the TSA assessment library.",
    },
    {
      icon: "🖥️",
      title: "Interactive Job Simulations",
      description:
        "Evaluate practical skills through real-world simulations including multitasking exercises, live chat scenarios, and Microsoft Word and Excel tasks. Custom simulations are also available upon request.",
    },
    {
      icon: "🎯",
      title: "Situational Judgment Assessments (SJT)",
      description:
        "Measure job compatibility and workplace behavior with targeted assessments for Customer Service, Sales, Remote Leadership, and Change Management roles.",
    },
    {
      icon: "✍️",
      title: "Create Your Own Assessments",
      description:
        "Use TSA Author to design fully customized tests using your own job-specific questions and content across multiple skill categories.",
    },
  ];
  return (
    <>
      <div>
        <Assesmentreuse
          tag="Industries > Call Centers"
          title="Employment Assessments & Skills Tests for Call Centers"
          highlight="Call Centers"
          description="Evaluate call center candidates with skill-based employment tests that measure communication, customer handling, and problem-solving abilities."
          //   buttonText="Get a Demo"
          image={call}
        />
      </div>
      <div>
        <Learnmore
          smallHeading="TSA"
          mainHeading="Call Centers Pre-Employment Testing"
          description="A high-performing call center depends on a skilled customer service team that connects with clients and builds lasting brand loyalty. With TSA, you can design tailored call center assessments by selecting questions that measure the exact competencies you need. Incorporate realistic simulations such as Chat and Multitasking exercises, along with video response and situational judgment questions, to evaluate real-world performance and determine overall job fit before hiring."
          // onButtonClick={handleLearnMore}
        />
      </div>
      <div>
        <Card3 title="Statistics Speak For Themselves" data={calldata} />
      </div>
      <div>
        <FeatureShowcase
          tagText="TSA"
          titleHighlight="Top Skills & Competencies to Consider,"
          titleNormal="When Hiring for Call Centers"
          description="Evaluate candidates effectively with TSA’s aptitude assessments, designed to measure their understanding of key areas ranging from workplace protocols and compliance to industry-specific terminology and communication standards."
          imageSrc={call1}
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
        heading="Cognitive Aptitude Assessments for Building High-Performance Teams"
        highlight=""
        text="At TSA, our cognitive aptitude assessments enable you to identify high-potential candidates quickly and with greater precision. Evaluate critical thinking, problem-solving capabilities, and learning agility to create stronger, more productive, and future-ready teams."
        skillsData={calldetails}
      />
      </div>
       <div className="testimonial-section">
        <Testimonial />
      </div>
    </>
  );
};
export default CallCenters;
