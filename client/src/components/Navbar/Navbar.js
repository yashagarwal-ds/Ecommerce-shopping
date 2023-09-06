import React from "react";
import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        padding: "5px",
        backgroundColor: "#f8f9fa",
      }}
    >
      <div>
        <Link to="/" style={{ all: "unset" }}>
          <h2>E-commerce</h2>
        </Link>
      </div>
      <div style={{ display: "flex", gap: "10px" }}>
        <Link
          to="/register"
          style={{ all: "unset", fontSize: "20px", cursor: "pointer" }}
        >
          Register
        </Link>
        <Link
          to="/login"
          style={{ all: "unset", fontSize: "20px", cursor: "pointer" }}
        >
          Login
        </Link>
      </div>
    </div>
  );
};

export default Navbar;
