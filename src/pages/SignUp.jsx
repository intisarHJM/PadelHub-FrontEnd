import React, { useState } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";

const SignUp = () => {
  const navigate = useNavigate();
  const initialState = {
    username: "",
    password: "",
    phoneNum: "",
    email: "",
  };
  const [userData, setUserData] = useState(initialState);

  const handleChange = (event) => {
    setUserData({
      ...userData,
      [event.target.name]: event.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(
        "http://localhost:3001/auth/sign-up",
        userData
      );
      console.log("Success:", res.data);
      setUserData(initialState);
      navigate('/Sign-in');
    } catch (err) {
      console.error("Error signing up:", err);
    }
  };

  return (
    <div className="signup-container">
      <form className="signup-form" onSubmit={handleSubmit}>
        <h1 id="signUp-title">Create Account</h1>

        <div className="form-card">
          <div className="input-field">
            <label htmlFor="username">Username</label>
            <input
              type="text"
              name="username"
              placeholder="Enter username"
              onChange={handleChange}
              value={userData.username}
              required
            />
          </div>

          <div className="input-field">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              name="email"
              placeholder="username@gmail.com"
              onChange={handleChange}
              value={userData.email}
              required
            />
          </div>

          <div className="input-field">
            <label htmlFor="phoneNum">Phone Number</label>
            <input
              type="text"
              name="phoneNum"
              placeholder="Your phone number"
              onChange={handleChange}
              value={userData.phoneNum}
              required
            />
          </div>

          <div className="input-field">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              name="password"
              placeholder="*******"
              onChange={handleChange}
              value={userData.password}
              required
            />
          </div>
        </div>

        <Link to="/sign-in" className="signin-link">
          Already have an account?
        </Link>

        <button type="submit" className="signup-button">
          Register
        </button>
      </form>
    </div>
  );
};

export default SignUp
