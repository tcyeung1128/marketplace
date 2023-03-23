import React from "react";

export default function Bottom() {
  return (
    <div
      style={{
        backgroundColor: "#553939",
        height: "5vh",
        width: "100vw",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        position: "fixed",
        bottom: 0,
      }}
    >
      <h3 style={{ color: "white", bottom: "0px" }}>
        This project is only for finding a job.
      </h3>
    </div>
  );
}

