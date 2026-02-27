import React from "react";
import Assesmentreuse from "../../../Reusablecomponents/Assesmentreuse/Assesmentreuse";
import Learnmore from "../../../Reusablecomponents/Learnmore/Learnmore";
import Manufactue from "../../../../images/Manufacturing2.png";
import FeatureShowcase from "../../../Reusablecomponents/Featureshowcase/Featureshowcase";
import Abiliti from "../../../../images/Abilities.png";
import Cardcomponent from "../../../Reusablecomponents/Cardcomponent/Cardcomponent";
import Testimonial from "../../../Reusablecomponents/Testimonial/Testimonial";
import Card3 from "../../../Reusablecomponents/Card3/Card3";

const Manufacturing = () => {
  const stats = [
    {
      value: "75%",
      text: "In a survey conducted by Accenture, 75% of executives say there is a shortage of skilled workers and 61% say they find it difficult to find employees with the right experience.",
    },
    {
      value: "70",
      text: "According to a recent study released by the Manufacturing Institute, it takes an average of 70 days to hire a qualified manufacturing employee.",
    },
    {
      value: "11%",
      text: "The U.S. Chamber of Commerce Foundation reports that unfilled manufacturing positions can result in an 11% loss in annual revenue.",
    },
  ];

  const detail = [
    {
      icon: "💼",
      title: "Standard Job-Based Tests",
      description:
        "Select from a wide range of ready-made assessments designed for common job roles like Financial Analyst, Firefighter, Office Manager, Emergency Responder, Maintenance Manager, and many others.",
    },
    {
      icon: "📚",
      title: "Standard Subject-Based Tests",
      description:
        "Access more than 600 single-topic assessments to evaluate expertise in specific areas such as Microsoft Word, Excel, Outlook, PowerPoint, and other essential subjects.",
    },
    {
      icon: "🧩",
      title: "Customize From 600+ Modular Subjects",
      description:
        "Create a tailored multi-subject assessment in seconds by choosing questions from a large library of technical and non-technical topics to match your exact hiring needs.",
    },
    {
      icon: "🖥️",
      title: "Job Simulations",
      description:
        "Evaluate real-world job ability by having candidates complete practical simulations such as multitasking exercises, chat scenarios, and tasks in Word or Excel. Custom simulations can also be developed to match your specific role requirements.",
    },
    {
      icon: "🧠",
      title: "Situational Judgment Tests (SJT)",
      description:
        "Measure how well candidates fit a role by analyzing their decision-making in workplace scenarios. SJTs cover areas like Customer Service, Sales, Remote Leadership, and Change Management to predict on-the-job success.",
    },
    {
      icon: "✍️",
      title: "Upload Your Own Content",
      description:
        "With TSA’s authoring tools, you can build personalized skills assessments using your own job-related materials and questions across a wide range of subject areas.",
    },
  ];
  return (
    
    <>
      <div>
        <Assesmentreuse
          tag="Industries > Manufacturing"
          title="Manufacturing Employment Assessments & Skill Evaluations"
          highlight="Manufacturing Employment Assessments & Skill Evaluations"
          description="Identify the right talent for industrial and production roles through role-specific testing and practical skill analysis. These assessments measure technical ability, safety awareness, machine handling knowledge, and problem-solving skills to ensure candidates are job-ready for manufacturing environments. Designed to improve hiring accuracy, reduce training time, and boost workforce productivity."
          buttonText="Get a Demo"
          image={Manufactue}
        />
      </div>

      <div>
        <Learnmore
          smallHeading="TSA"
          mainHeading="Manufacturing Pre-Employment Testing"
          description="Manufacturing and industrial positions require specialized hard skills, including mechanical and technical ability, along with the capacity to follow instructions and quickly learn new tasks. Organizations around the world rely on manufacturing skills assessments to hire equipment operators, assembly line staff, and to evaluate candidates’ understanding of warehouse procedures, shipping processes, and pick-and-pack roles."
          // onButtonClick={handleLearnMore}
        />
      </div>
<div>
      <Card3
      title="Statistics Speak For Themselves" 
      data={stats}
      bgColor="#f4f8fd"
      />
</div>

      <div>
        <FeatureShowcase
          tagText="TSA"
          titleHighlight="Top Skills & Abilities to"
          titleNormal="Look for in Manufacturing"
          description="Use TSA’s aptitude assessments to evaluate candidates’ understanding of topics ranging from workplace safety practices to legal terminology."
          imageSrc={Abiliti}
          imageAlt="Dashboard Preview"
          imageOnLeft={false}
          features={[
            {
              icon: "mechanical",
              iconColor: "blue",
              title: "Mechanical Aptitude",
              description:
                "Ability to apply technical knowledge in hands-on environments and use industry principles to diagnose issues and solve mechanical or operational problems efficiently.",
            },
            {
              icon: "math",
              iconColor: "green",
              title: "English & Math Comprehension",
              description:
                "Skill in reading and following instructions accurately, interpreting diagrams and blueprints, and performing essential industrial math involving measurements, units, and numerical patterns.",
            },
            {
              icon: "detail",
              iconColor: "orange",
              title: "Attention to Detail",
              description:
                "Strong focus on accuracy and quality standards, ensuring production tasks meet requirements, schedules are maintained, and all safety procedures are properly followed.",
            },
          ]}
        />
      </div>
      <div>
        <Cardcomponent
          heading="Assess cognitive abilities to create more "
          highlight="capable and effective teams."
          text="At TSA, our cognitive aptitude assessment solutions enable you to spot top talent quickly and with greater accuracy. Evaluate candidates’ problem-solving skills, critical thinking abilities, and capacity to learn—helping you build more capable, high-performing teams."
          skillsData={detail}
        />
      </div>
      <div className="testimonial-section">
        <Testimonial />
      </div>
    </>
  );
};

export default Manufacturing;