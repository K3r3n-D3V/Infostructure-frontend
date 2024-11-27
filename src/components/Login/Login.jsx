import React, { useContext, useState } from "react";
import "./Login.css";
import { InfostructureContext } from "../../context/context";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const baseURL = import.meta.env.VITE_EC2_PUBLIC_URL;

function Login({ setSignedIn }) {
  const navigate = useNavigate();
  const { AuthenticatedStatus } = useContext(InfostructureContext);

  const handleSignUpClick = () => {
    navigate("/signup");
  };

  const [inputValues, setInputValues] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;

    setInputValues((prevValues) => ({
      ...prevValues,
      [name]: value,
    }));

    //console.log(inputValues); // This will log the state before the update is applied
  };

  const handleSubmit = (e) => { 
    e.preventDefault();

    console.log("data", inputValues);

    axios
      .post(`${baseURL}:3000/login`, {
        email: inputValues.email,
        password: inputValues.password,
      })
      .then((response) => {
        console.log("Login successful:", response.data);
        if (response.data === "Success") {
          setSignedIn(true);
          AuthenticatedStatus(true);
          navigate("/cart");
          alert(`Welcome!!! ${name}`)
        }
      })
      .catch((error) => {
        console.error("There was an error logging in:", error);
      });
  };

 

  return (
    <div className="login-container">
      <div className="login-box" data-test="email">
        <h2>Login</h2>
        <hr />
        <form onSubmit={handleSubmit}>
          <div>
            <label htmlFor="email">
              <strong>Email Address</strong>
            </label>
            <input
              type="email"
              onChange={(e) => handleChange(e)}
              value={inputValues.email}
              placeholder="Enter Email Address"
              autoComplete="on"
              name="email"
              className="login-box"
              required
            />
          </div>
          <div>
            <label htmlFor="email">
              <strong>Password</strong>
            </label>
            <input
              type="password"
              placeholder="Enter Password"
              onChange={(e) => handleChange(e)}
              value={inputValues.password}
              autoComplete="off"
              name="password"
              className="login-box"
              required
            />
          </div>
          <button type="submit">LOG IN</button>
        </form>
        <p className="sign-up">
          Do not have an account?{" "} 
          <a href="" onClick={handleSignUpClick}>
             Sign Up
          </a>
        </p>
      </div>
    </div>
  );
}

export default Login;
