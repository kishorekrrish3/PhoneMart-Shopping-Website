import React, { useState } from "react";
import "./SignUp.css";
import { Link } from "react-router-dom";
import { auth } from "../../firebase"; // Import Firebase auth
import { createUserWithEmailAndPassword } from "firebase/auth"; // Import the sign-up method

const SignUp = () => {
  const [formData, setFormData] = useState({
    fname: "",
    lname: "",
    email: "",
    password: "",
  });
  const [error, setError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  // Handle input change
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    const { email, password } = formData;

    createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        // Successful sign-up
        const user = userCredential.user;
        setSuccessMessage("Account created successfully! You can now sign in.");
        setError(""); // Clear any previous errors
      })
      .catch((error) => {
        setError(error.message); // Display any errors
        setSuccessMessage("");
      });
  };

  return (
    <div className="sign-up">
      <div className="sign-up-container-1">
        <img
          src="/assets/sign-up.svg"
          alt="Sign Up"
          className="sign-up-image"
        />
      </div>
      <div className="sign-up-container-2">
        <h2 className="sign-up-title">Sign Up</h2>

        {/* Show success or error messages */}
        {successMessage && <p className="success-message">{successMessage}</p>}
        {error && <p className="error-message">{error}</p>}

        <form className="sign-up-form" onSubmit={handleSubmit}>
          <label className="sign-up-form-label form-label" htmlFor="fname">
            First Name
          </label>
          <input
            className="sign-up-form-input form-control"
            type="text"
            id="fname"
            name="fname"
            value={formData.fname}
            onChange={handleInputChange}
            required
          />

          <label className="sign-up-form-label form-label" htmlFor="lname">
            Last Name
          </label>
          <input
            className="sign-up-form-input form-control"
            type="text"
            id="lname"
            name="lname"
            value={formData.lname}
            onChange={handleInputChange}
            required
          />

          <label className="sign-up-form-label form-label" htmlFor="email">
            Email address
          </label>
          <input
            className="sign-up-form-input form-control"
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleInputChange}
            required
          />

          <label className="sign-up-form-label form-label" htmlFor="password">
            Password
          </label>
          <input
            className="sign-up-form-input form-control"
            type="password"
            id="password"
            name="password"
            value={formData.password}
            onChange={handleInputChange}
            required
          />

          <button className="sign-up-button" type="submit">
            Sign Up
          </button>
        </form>
        <p className="sign-up-link">
          Already have an account?{" "}
          <Link to="/sign-in" className="color-text">
            Sign In
          </Link>
        </p>
      </div>
    </div>
  );
};

export default SignUp;
