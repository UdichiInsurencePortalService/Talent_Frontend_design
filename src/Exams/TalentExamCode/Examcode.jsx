import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { message } from "antd";

const Examcode = () => {
  const [examCode, setExamCode] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleCheckExamCode = async () => {
    if (!examCode.trim()) {
      message.warning("Please enter exam code");
      return;
    }

    try {
      setLoading(true);

      await axios.get(
        `http://localhost:8080/api/exam/${examCode.trim()}`
      );

      const scheduledRes = await axios.get(
        `http://localhost:8080/api/scheduled-exam/${examCode.trim()}`
      );

      localStorage.setItem(
        "scheduledExamData",
        JSON.stringify(scheduledRes.data.data)
      );

      message.success("Exam verified! Redirecting...");

      setTimeout(() => {
        navigate(`/scheduledexam/${examCode.trim()}`);
      }, 2000);
    } catch (error) {
      message.error("Invalid or unscheduled exam code");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="exam-wrapper">
      <div className="exam-card">
        <h1 className="title">
          Welcome to <span>Talent Assessment</span>
        </h1>

        <p className="subtitle">
          Enter your exam code to begin your AI-based assessment
        </p>

        <div className="instruction-box">
          <ul>
            <li>🧠 AI-monitored examination</li>
            <li>⏱️ Finish within the allotted time</li>
            <li>🚫 No tab switch or refresh</li>
            <li>📷 Camera & microphone access required</li>
          </ul>
        </div>

        <div className="input-group">
          <input
            type="text"
            placeholder="Enter Exam Code"
            value={examCode}
            onChange={(e) => setExamCode(e.target.value)}
            disabled={loading}
          />
          <button onClick={handleCheckExamCode} disabled={loading}>
            {loading ? "Verifying..." : "Continue"}
          </button>
        </div>
      </div>

      {/* ---------- STYLES ---------- */}
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap');

        * {
          box-sizing: border-box;
        }

        body {
          margin: 0;
          font-family: 'Inter', sans-serif;
        }

        .exam-wrapper {
          display: flex;
          align-items: center;
          justify-content: center;
          background: #f8fafc;
          padding: 20px;
          animation: fadeIn 0.6s ease-in-out;
        }

        .exam-card {
          width: 100%;
          max-width: 620px;
          background: #ffffff;
          border-radius: 20px;
          padding: 42px;
          box-shadow: 0 20px 40px rgba(0,0,0,0.08);
          text-align: center;
          animation: slideUp 0.6s ease;
        }

        .title {
          font-size: 32px;
          font-weight: 700;
          margin-bottom: 10px;
          color: #0f172a;
        }

        .title span {
          background: linear-gradient(90deg, #4f46e5, #06b6d4);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
        }

        .subtitle {
          font-size: 15px;
          color: #475569;
          margin-bottom: 28px;
        }

        .instruction-box {
          background: #f1f5f9;
          border-radius: 14px;
          padding: 20px;
          margin-bottom: 30px;
          text-align: left;
        }

        .instruction-box ul {
          list-style: none;
          padding: 0;
          margin: 0;
        }

        .instruction-box li {
          font-size: 14px;
          font-weight: 500;
          color: #334155;
          margin-bottom: 10px;
        }

        .input-group {
          display: flex;
          gap: 12px;
        }

        .input-group input {
          flex: 1;
          padding: 14px 16px;
          border-radius: 12px;
          border: 1px solid #cbd5e1;
          font-size: 15px;
          transition: border-color 0.2s, box-shadow 0.2s;
        }

        .input-group input:focus {
          outline: none;
          border-color: #4f46e5;
          box-shadow: 0 0 0 3px rgba(79,70,229,0.15);
        }

        .input-group button {
          padding: 14px 26px;
          border-radius: 12px;
          border: none;
          background: #4f46e5;
          color: #ffffff;
          font-size: 15px;
          font-weight: 600;
          cursor: pointer;
          transition: background 0.2s, transform 0.1s;
        }

        .input-group button:hover:not(:disabled) {
          background: #4338ca;
        }

        .input-group button:active:not(:disabled) {
          transform: scale(0.98);
        }

        .input-group button:disabled {
          background: #a5b4fc;
          cursor: not-allowed;
        }

        @media (max-width: 640px) {
          .exam-card {
            padding: 28px;
          }

          .title {
            font-size: 26px;
          }

          .input-group {
            flex-direction: column;
          }

          .input-group button {
            width: 100%;
          }
        }

        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }

        @keyframes slideUp {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </div>
  );
};

export default Examcode;
