import React, { useState } from "react";
import "./SignIn.css";
import { Link, useNavigate } from "react-router-dom";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth"; // Firebase auth functions
import { auth } from "../../firebase"; // Your Firebase configuration file

const SignIn = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate(); // Hook to programmatically navigate

  const handleSubmit = async (e) => {
    e.preventDefault();
    const auth = getAuth();

    try {
      await signInWithEmailAndPassword(auth, email, password);
      // On successful sign-in, navigate to the Home page
      navigate("/"); // Adjust this path based on your routes
    } catch (error) {
      setError("Failed to sign in. Please check your credentials.");
      console.error("Error during sign-in:", error.message);
    }
  };

  return (
    <div className="sign-in">
      <div className="sign-in-container-1">
        <img
          src="/assets/sign-in.svg"
          alt="Sign In"
          className="sign-in-image"
        />
      </div>
      <div className="sign-in-container-2">
        <h2 className="sign-in-title">Sign In</h2>
        {error && <p className="error-message">{error}</p>}{" "}
        {/* Display error message if sign-in fails */}
        <form className="sign-in-form" onSubmit={handleSubmit}>
          <label className="sign-in-form-label form-label" htmlFor="email">
            Email address
          </label>
          <input
            className="sign-in-form-input form-control"
            type="email"
            id="email"
            name="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)} // Update email state
          />

          <label className="sign-in-form-label form-label" htmlFor="password">
            Password
          </label>
          <input
            className="sign-in-form-input form-control"
            type="password"
            id="password"
            name="password"
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)} // Update password state
          />

          <button className="sign-in-button" type="submit">
            Sign In
          </button>
        </form>
        <p className="sign-up-link">
          Don't have an account?{" "}
          <Link className="color-text" to="/sign-up">
            Sign Up
          </Link>
        </p>
      </div>
    </div>
  );
};

export default SignIn;
