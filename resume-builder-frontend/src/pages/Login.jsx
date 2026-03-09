import React, { useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import API from "../utils/api";


function Login() {

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();


  const handleLogin = async (e) => {

    e.preventDefault();

    try {

      const res = await axios.post(
        `${API}/auth/login`,
        {
          email,
          password
        }
      );

      localStorage.setItem("token", res.data.token);
      localStorage.setItem("user", JSON.stringify(res.data.user));

      alert("Login successful!");

      navigate("/builder");

    } catch (error) {

      alert(error.response?.data?.message || "Login failed");

    }
  };

  return (

    <div className="container mt-5">

      <h2>Login</h2>

      <form onSubmit={handleLogin}>

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

        <button className="btn btn-success w-100">
          Login
        </button>

      </form>

      <p className="mt-3 text-center">
        Don't have an account?{" "}
        <Link to="/signup">Sign Up</Link>
      </p>

    </div>

  );
}

export default Login;
