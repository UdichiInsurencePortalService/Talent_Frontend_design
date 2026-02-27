import React from "react";

const Card3 = ({ title, data, bgColor = "#f4f8fd" }) => {
  return (
    <section style={{ background: bgColor, padding: "90px 20px" }}>
      <div style={{ maxWidth: "1200px", margin: "auto" }}>
        {title && (
          <h2
            style={{
              textAlign: "center",
              fontWeight: "700",
              marginBottom: "70px",
              color: "#0a2a66",
            }}
          >
            {title}
          </h2>
        )}

        {/* FLEX LAYOUT INSTEAD OF BOOTSTRAP */}
        <div
          style={{
            display: "flex",
            gap: "30px",   // 🔥 REAL GAP
            justifyContent: "space-between",
            flexWrap: "wrap",
          }}
        >
          {data?.map((item, index) => (
            <div
              key={index}
              style={{
                flex: "1 1 calc(33.33% - 20px)", // 3 in row
                background: "#fff",
                padding: "50px 35px",
                borderRadius: "16px",
                boxShadow: "0 15px 40px rgba(0,0,0,0.08)",
                minWidth: "280px",
              }}
            >
              <h1
                style={{
                  color: "#1e3a8a",
                  fontSize: "3rem",
                  marginBottom: "18px",
                }}
              >
                {item.value}
              </h1>

              <p
                style={{
                  color: "#6c757d",
                  lineHeight: "1.9",
                  margin: 0,
                }}
              >
                {item.text}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Card3;
