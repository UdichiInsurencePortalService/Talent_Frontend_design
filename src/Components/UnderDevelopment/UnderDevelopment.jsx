// UnderDevelopment.jsx
import React from "react";
import { useNavigate } from "react-router-dom";

const UnderDevelopment = () => {
  const navigate = useNavigate();

  return (
    <div
      className="d-flex justify-content-center align-items-center vh-100"
      style={{
        background: "linear-gradient(135deg, #1e3c72, #2a5298)",
        color: "white",
      }}
    >
      <div
        className="text-center p-5 rounded-4 shadow-lg"
        style={{
          backgroundColor: "rgba(255, 255, 255, 0.1)",
          backdropFilter: "blur(10px)",
          maxWidth: "500px",
          width: "100%",
        }}
      >
        <div style={{ fontSize: "60px" }}>🚧</div>

        <h2 className="mt-3 fw-bold">Page Under Development</h2>

        <p className="mt-3 text-light">
          We're currently working hard to bring this feature to life.
          Stay tuned for updates!
        </p>

        <button
          className="btn btn-light mt-4 px-4"
          onClick={() => navigate("/")}
        >
          Back to Home
        </button>
      </div>
    </div>
  );
};

export default UnderDevelopment;
