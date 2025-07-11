import React from "react";

const TestComponent: React.FC = () => {
  return (
    <div
      style={{
        padding: "20px",
        backgroundColor: "#f0f0f0",
        margin: "20px",
        border: "2px solid #333",
        borderRadius: "8px",
      }}
    >
      <h1 style={{ color: "green" }}>✅ Test Component Berhasil!</h1>
      <p>Jika Anda melihat ini, React sudah berjalan dengan baik.</p>
      <p>Timestamp: {new Date().toLocaleString()}</p>
    </div>
  );
};

export default TestComponent;
