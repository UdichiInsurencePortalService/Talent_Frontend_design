import React from "react";
import { Routes, Route, useLocation } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";

import Navbar from "./Components/Header/Navbar/Navbare.jsx";
import Footer from "./Components/Header/Footer/Footer";

// Pages
import Home from "./Components/Pages/Home/Home.jsx";
import AssessmentTypes from "./Components/Pages/AssessmentTypes/AssessmentTypes";
import QuestionStyles from "./Components/Pages/QuestionStyles/QuestionStyles.jsx";
import Skills from "./Components/Pages/Skills/Skills.jsx";
import Cognitive from "./Components/Pages/Cognitive/Cognitive.jsx";
import Behavioral from "./Components/Pages/Behavioral/Behavioral.jsx";
import PopularAssessments from "./Components/Pages/PopularAssessments/PopularAssessments.jsx";
import Simulation from "./Components/Pages/Simulation/Simulation.jsx";
import Video from "./Components/Pages/Video/Video.jsx";
import Customization from "./Components/Pages/Customization/Customization.jsx";
import Dedicatedassessment from "./Components/Pages/Dedicatedassessment/Dedicatedassessment.jsx";
import AssessmentLibrary from "./Components/Pages/AssessmentLibrary/AssessmentLibrary.jsx";

// ✅ NEW: Exam Start Page
import Examcode from "./Exams/TalentExamCode/Examcode.jsx";
import Scheduledexam from "./Exams/Scheduledexam/Scheduledexam.jsx";
import StartExam from "./Exams/Startexam/StartExam.jsx";
import SuccessPage from "./Exams/SuccessPage/SuccessPage.jsx";
import Studentdemo from "./Components/Pages/Studentdemo/Studentdemo.jsx";
import AttendancePage from "./Exams/Attendance/Attendence.jsx";

const App = () => {
  const location = useLocation();

  /*
  |--------------------------------------------------------------------------
  | Routes where Navbar & Footer should be hidden
  |--------------------------------------------------------------------------
  */
  const hideLayoutRoutes = [
    "/studentdemo",
  ];

  // hide layout also for exam code routes
  const hideLayout =
  hideLayoutRoutes.includes(location.pathname) ||
  location.pathname.startsWith("/startexam") ||
  location.pathname.startsWith("/scheduledexam") ||
  location.pathname.startsWith("/exam/");

  return (
    <>
      {/* ✅ Navbar */}
      {!hideLayout && <Navbar />}

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/AssessmentTypes" element={<AssessmentTypes />} />
        <Route path="/QuestionStyles" element={<QuestionStyles />} />
        <Route path="/Skills" element={<Skills />} />
        <Route path="/Cognitive" element={<Cognitive />} />
        <Route path="/Behavioral" element={<Behavioral />} />
        <Route path="/PopularAssessments" element={<PopularAssessments />} />
        <Route path="/Simulation" element={<Simulation />} />
        <Route path="/Video" element={<Video />} />
        <Route path="/Customization" element={<Customization />} />
        <Route path="/Dedicatedassessment" element={<Dedicatedassessment />} />
        <Route path="/AssessmentLibrary" element={<AssessmentLibrary />} />

        {/* ❌ No Navbar/Footer */}
        <Route path="/studentdemo" element={<Studentdemo/>}/>
        <Route path="/examcode" element={<Examcode/>}/>
        <Route path="/scheduledexam/:examCode" element={<Scheduledexam/>}/>
      <Route path="/startexam/:examCode" element={<StartExam/>}/>

      <Route path="/successPage" element={<SuccessPage/>}/>

              <Route path="/Attendence" element={<AttendancePage/>} />



      </Routes>

      {/* ✅ Footer */}
      {!hideLayout && <Footer />}
    </>
  );
};

export default App;
