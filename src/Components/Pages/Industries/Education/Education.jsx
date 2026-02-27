import React from "react";
import Assesmentreuse from "../../../Reusablecomponents/Assesmentreuse/Assesmentreuse";
import Learnmore from "../../../Reusablecomponents/Learnmore/Learnmore";

import Edu from "../../../../images/education.png";

import Edu1 from "../../../../images/education1.png";

import Card3 from "../../../Reusablecomponents/Card3/Card3";
import FeatureShowcase from "../../../Reusablecomponents/Featureshowcase/Featureshowcase";
import Cardcomponent from "../../../Reusablecomponents/Cardcomponent/Cardcomponent";
import Testimonial from "../../../Reusablecomponents/Testimonial/Testimonial";

const Education = () => {
  const Edudata = [
    {
      value: "$1.04B",
      text: "The U.S. education industry is projected to reach an estimated value of $2.04 billion by 2026, highlighting strong growth and demand in the sector. (Zion Market Research)",
    },
    {
      value: "10.4%",
      text: "Careers in education, training, and library services saw a 14.4% increase over a decade, showing steady expansion in education-related roles. (Department for Professional Employees - DPE)",
    },
    {
      value: "10%+",
      text: "Jobs in public and private education services grew by over 12%, adding nearly 1.7 million positions, with rising student enrollments expected to drive even more opportunities. (Bureau of Labor Statistics - BLS)",
    },
  ];

  const Edudetails = [
    {
      icon: "👔",
      title: "Role-Specific Job Tests",
      description:
        "Select from a wide range of ready-made assessments designed for specific roles such as Financial Analyst, Firefighter, Office Manager, Emergency Responder, Maintenance Manager, and many others.",
    },
    {
      icon: "📘",
      title: "Subject-Focused Skill Tests",
      description:
        "Access 600+ single-subject exams that measure expertise in areas like Microsoft Word, Excel, Outlook, PowerPoint, and other professional skills.",
    },
    {
      icon: "🧩",
      title: "Build Custom Multi-Skill Tests",
      description:
        "Create your own assessments in seconds by combining questions from hundreds of computer-based and non-technical subjects in the TSA test library.",
    },
    {
      icon: "🖥️",
      title: "Real-World Job Simulations",
      description:
        "Evaluate practical ability through realistic tasks such as multitasking exercises, chat simulations, and hands-on Word or Excel activities. Custom simulations are also available.",
    },
    {
      icon: "🧠",
      title: "Situational Judgment Tests",
      description:
        "Measure job fit and decision-making style with scenario-based tests for areas like customer service, sales, remote leadership, and change management.",
    },
    {
      icon: "✍️",
      title: "Add Your Own Test Content",
      description:
        "Design fully customized assessments using your organization’s job-specific questions and materials across a variety of subject areas.",
    },
  ];

  return (
    <>
      <div>
        <Assesmentreuse
          tag="Industries > Education"
          title="Hiring Assessments & Competency Tests for Education Sector"
          highlight="Education Sector"
          description="Identify the right talent for educational roles with targeted employment assessments. Measure teaching skills, subject knowledge, and workplace readiness with reliable testing tools."
          //   buttonText="Get a Demo"
          image={Edu}
        />
      </div>
      <div>
        <Learnmore
          smallHeading="TSA"
          mainHeading="Education Pre-Employment Testing"
          description="Educational organizations achieve the best outcomes when they are supported by qualified teachers and committed staff focused on student success. Advanced skills assessments for the education sector allow you to quickly evaluate large numbers of applicants without relying on paper-based exams. This helps simplify the recruitment process, save internal effort, and shorten hiring timelines. You can also conduct oral evaluations and interviews online through video response questions. With team-based scoring, multiple reviewers can assess, discuss, and rate candidate responses efficiently, ensuring fair and informed hiring decisions."
          // onButtonClick={handleLearnMore}
        />
      </div>
      <div>
        <Card3 title="Statistics Speak For Themselves" data={Edudata} />
      </div>

      <div>
        <FeatureShowcase
          tagText="TSA"
          titleHighlight="Top Skills & Abilities to Look for in Education"
          titleNormal="to Look for in Education"
          description="Use TSA’s aptitude assessments to evaluate candidates’ understanding of topics ranging from workplace safety practices to industry-specific legal terminology."
          imageSrc={Edu1}
          imageAlt="Dashboard Preview"
          imageOnLeft={false}
          features={[
            {
              icon: "mechanical",
              title: "Paraeducator Support Skills",
              description:
                "Demonstrates strong foundational knowledge in mathematics, English communication, and writing, with the ability to support diverse learners across educational environments.",
            },
            {
              icon: "users",
              title: "Strong Interpersonal Abilities",
              description:
                "Collaborates effectively with teachers, staff, students, parents, and board members while fostering positive relationships and clear communication.",
            },
            {
              icon: "settings",
              title: "Office & Event Coordination",
              description:
                "Experienced in managing schedules, coordinating meetings and events, and supervising projects to maintain smooth administrative workflows.",
            },
          ]}
        />
      </div>

      <div>
        <Cardcomponent
          heading="Cognitive Aptitude Assessments for High-Performing Teams"
          highlight=""
          text="At TSA, our cognitive aptitude testing solutions enable you to evaluate candidates quickly and precisely. Assess reasoning ability, analytical thinking, and adaptability to identify individuals with strong learning potential and build more capable, high-performing teams."
          skillsData={Edudetails}
        />
      </div>
      <div className="testimonial-section">
        <Testimonial />
      </div>
    </>
  );
};

export default Education;
