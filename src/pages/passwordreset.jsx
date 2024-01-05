import React, { useEffect, useState } from "react";
import style from "./passwordreset.module.css";
import httpClient from "../httpClient";
import { Link } from "react-router-dom";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // TODO: Implement password reset logic here
    console.log("Password reset email sent to:", email);
    setEmail("");
  };

  const main = {
    display: "grid",
    gridTemplateColumns: "repeat(8, 1fr)",
    gridTemplateRows: "repeat(8, 1fr)",
    gridColumnGap: "0px",
    gridRowGap: "0px",
  };
  const navbar = {
    gridArea: "1 / 1 / 2 / 11",
    padding: "15px",
    fontSize: "1.5em",
  };
  const loginbox = {
    gridArea: "3 / 3 / 8 / 7",
    backgroundColor: "#1a1818",
    padding: "25px",
    webkitBoxShadow: "0 0.25em 0.75em black",
  };

  return (
    <div style={main}>
      <div style={navbar}> Omegle </div>
      <h2>Enter email to receive your reset token</h2>
      <form onSubmit={handleSubmit}>
        <label>Email:</label>
        <input
          type="email"
          value={email}
          onChange={handleEmailChange}
          required
        />
        <button type="submit" onClick={ForgotPassword}>
          Reset Password
        </button>
      </form>
    </div>
  );
};

export default ForgotPassword;
