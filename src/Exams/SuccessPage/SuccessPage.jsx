import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const SuccessPage = () => {
  const navigate = useNavigate();

  // ✅ Auto redirect after 3 seconds
  useEffect(() => {
    const timer = setTimeout(() => {
      navigate("/");
    }, 3000);

    return () => clearTimeout(timer);
  }, [navigate]);

  return (
    <div className="success-wrapper">
      <div className="success-card">
        <div className="icon">✔</div>

        <h1>Exam Submitted</h1>

        <p className="subtitle">
          Your examination has been submitted successfully.
        </p>

        <div className="message-box">
          <p>Your answers have been securely saved.</p>
          <p>
            📩 Result will be shared with your organization and sent to your
            registered email.
          </p>
        </div>

        <p className="redirect-text">
          Redirecting to home page in <strong>3 seconds...</strong>
        </p>
      </div>

      <style>{`
        body {
          margin: 0;
        }

        .success-wrapper {
          min-height: 100vh;
          background: #f8fafc;
          display: flex;
          align-items: center;
          justify-content: center;
          font-family: system-ui, -apple-system, BlinkMacSystemFont;
        }

        .success-card {
          background: #ffffff;
          padding: 40px 32px;
          border-radius: 14px;
          text-align: center;
          max-width: 420px;
          width: 100%;
          box-shadow: 0 10px 30px rgba(0,0,0,0.08);
        }

        .icon {
          width: 64px;
          height: 64px;
          margin: 0 auto 16px;
          border-radius: 50%;
          background: #16a34a;
          color: #ffffff;
          font-size: 32px;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        h1 {
          font-size: 22px;
          font-weight: 600;
          color: #0f172a;
          margin-bottom: 8px;
        }

        .subtitle {
          font-size: 14px;
          color: #475569;
          margin-bottom: 20px;
        }

        .message-box {
          background: #f1f5f9;
          padding: 16px;
          border-radius: 10px;
          font-size: 14px;
          color: #334155;
          line-height: 1.6;
        }

        .redirect-text {
          margin-top: 18px;
          font-size: 13px;
          color: #64748b;
        }

        @media (max-width: 480px) {
          .success-card {
            padding: 28px 22px;
          }
        }
      `}</style>
    </div>
  );
};

export default SuccessPage;
