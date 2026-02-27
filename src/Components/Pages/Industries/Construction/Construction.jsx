import React from "react";
import Assesmentreuse from "../../../Reusablecomponents/Assesmentreuse/Assesmentreuse";
import constructions from "../../../../images/construction.png";
import constructions1 from "../../../../images/construction1.png";

import Learnmore from "../../../Reusablecomponents/Learnmore/Learnmore";
import Card3 from "../../../Reusablecomponents/Card3/Card3";
import FeatureShowcase from "../../../Reusablecomponents/Featureshowcase/Featureshowcase";
import Cardcomponent from "../../../Reusablecomponents/Cardcomponent/Cardcomponent";
import Testimonial from "../../../Reusablecomponents/Testimonial/Testimonial";

const Construction = () => {
  const cunstdata = [
    {
      value: "850K",
      text: "Labor projections show strong expansion in the construction sector, with roughly 850,000 new jobs expected due to industry growth over a decade.",
    },
    {
      value: "95%",
      text: "After introducing TSA assessments, interview attendance rates significantly improved, rising from about half of applicants to nearly 95% participation.",
    },
    {
      value: "$84T",
      text: "Global infrastructure demand is massive, with tens of trillions of dollars required for development projects worldwide over the next two decades.",
    },
  ];

  const cunstdetails = [
    {
      icon: "💼",
      title: "Role-Specific Job Tests",
      description:
        "Select from a wide range of ready-made assessments designed for common job roles like financial analysts, firefighters, office managers, emergency personnel, maintenance supervisors, and more.",
    },
    {
      icon: "📘",
      title: "Subject-Focused Skill Tests",
      description:
        "Access hundreds of individual subject tests that measure expertise in tools and topics such as Microsoft Word, Excel, Outlook, PowerPoint, and many other professional skills.",
    },
    {
      icon: "🧩",
      title: "Build Custom Multi-Subject Tests",
      description:
        "Quickly create tailored assessments by combining questions from various technical and non-technical subjects available in the TSA test library.",
    },
    {
      icon: "🖥️",
      title: "Real-World Simulations",
      description:
        "Evaluate practical job performance by having candidates complete realistic tasks like multitasking exercises, chat handling, and Word or Excel simulations. Custom simulations can also be developed.",
    },
    {
      icon: "🧠",
      title: "Situational Judgment Assessments",
      description:
        "Measure how well candidates align with a role and company culture through TSA’s SJTs covering customer service, sales, remote leadership, and change management scenarios.",
    },
    {
      icon: "✍️",
      title: "Create Tests with Your Own Content",
      description:
        "Use TSA Author to design fully customized skills assessments with your own job-related questions across multiple subject areas.",
    },
  ];

  return (
    <>
      <div>
        <Assesmentreuse
          tag="Industries > Construction"
          title="Pre-Employment Tests & Skill Evaluations for Construction Roles"
          highlight="for Construction Roles"
          description="Evaluate construction candidates with job-focused assessments that measure trade skills, safety awareness, and technical knowledge. Identify qualified workers faster and ensure your workforce is skilled, reliable, and site-ready from day one."
          //   buttonText="Get a Demo"
          image={constructions}
        />
      </div>

      <div>
        <Learnmore
          smallHeading="TSA"
          mainHeading="Construction Pre-Employment Testing"
          description="Construction and engineering companies rely on skilled workers who can construct structures, perform excavation for roads and highways, and manage demolition site operations. With TSA’s advanced construction aptitude assessments, employers can measure candidates’ ability to safely use power tools and evaluate their understanding of site preparation, debris management, and handling of hazardous materials."
          // onButtonClick={handleLearnMore}
        />
      </div>

      <div>
        <Card3 title="Statistics Speak For Themselves" data={cunstdata} />
      </div>

      <div>
        <FeatureShowcase
          tagText="TSA"
          titleHighlight="Key Skills and Capabilities to "
          titleNormal="Seek in Construction Professionals"
          description="Use TSA’s aptitude assessments to evaluate candidates’ understanding of topics ranging from workplace safety practices to industry-related legal terms."
          imageSrc={constructions1}
          imageAlt="Dashboard Preview"
          imageOnLeft={false}
          features={[
  {
    icon: "mechanical",
    title: "Mechanical Knowledge",
    description:
      "Strong numerical skills combined with practical expertise in operating machinery and both heavy and light power tools safely and efficiently.",
  },
  {
    icon: "settings",
    title: "Site Work Operations",
    description:
      "Experienced in taking site measurements, preparing and mixing materials, installing pipelines, performing concrete finishing, and handling demolition tasks.",
  },
  {
    icon: "target",
    title: "Construction Project Coordination",
    description:
      "Skilled in interpreting blueprints and technical drawings while managing teams, organizing workflows, and ensuring projects stay on schedule.",
  },
]}
        />
      </div>
      <div>
        <Cardcomponent
          heading="Cognitive aptitude assessments for building high-performing teams. "
          highlight="building high-performing teams."
          text="At TSA, our cognitive testing solutions help you recognize top talent quickly and with greater precision. Evaluate candidates’ problem-solving skills, critical thinking ability, and capacity to learn, so you can develop stronger and more effective teams."
          skillsData={cunstdetails}
        />
      </div>
      <div className="testimonial-section">
        <Testimonial />
      </div>
    </>
  );
};
export default Construction;