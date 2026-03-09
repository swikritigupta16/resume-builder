import React, { useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

function Signup() {

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSignup = async (e) => {

    e.preventDefault();

    try {

     const API =
  process.env.NODE_ENV === "production"
    ? "https://resume-builder-8d5l.onrender.com/api"
    : "http://localhost:5000/api";

await axios.post(`${API}/auth/signup`, {
  name,
  email,
  password
});

      alert("Signup successful!");

    } catch (error) {

      alert(error.response?.data?.message || "Signup failed");

    }
  };

  return (

    <div className="container mt-5">

      <h2>Sign Up</h2>

      <form onSubmit={handleSignup}>

        <input
          type="text"
          placeholder="Name"
          className="form-control mb-3"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />

        <input
          type="email"
          placeholder="Email"
          className="form-control mb-3"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <input
          type="password"
          placeholder="Password"
          className="form-control mb-3"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <button className="btn btn-primary">
          Sign Up
        </button>

      </form>

      <p className="mt-3 text-center">
        Already have an account?{" "}
        <Link to="/login">Login</Link>
      </p>

    </div>

  );

}

export default Signup;
