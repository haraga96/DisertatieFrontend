import React, { useState } from "react";
import "./LoginPage.css";

import { navigate } from "@reach/router";
import MainPage from "./MainPage";

function LoginPage(props) {
  const [emailAddress, updateEmailAddress] = useState("", "");
  const [password, updatePassword] = useState("", "");
  const [errorMessage, setErrorMessage] = useState([props.errorMessage], []);
  const [isAuthenticated, updateIsAuthenticated] = useState(false, false);

  function EmailAddressChanged(value) {
    setErrorMessage([]);
    updateEmailAddress(value);
  }
  function PasswordChanged(value) {
    setErrorMessage([]);
    updatePassword(value);
  }

  function ClearEmailAddress() {
    setErrorMessage([]);
    updateEmailAddress("");
  }
  function ClearPassword() {
    setErrorMessage([]);
    updatePassword("");
  }

  async function SendCall() {
    const emailEntered = emailAddress;
    const passwordEntered = password;
    const axios = require("axios").default;

    await axios
      .post("https://localhost:5001/api/users/login", {
        emailAddress: emailEntered,
        password: passwordEntered,
      })
      .then(function () {
        setErrorMessage([]);
        updateIsAuthenticated(true);
      })
      .catch(function (error) {
        try {
          if (
            error !== null &&
            error.response !== null &&
            error.response.data !== null
          ) {
            var sentence = error.response.data.split("*");
            setErrorMessage(sentence);
          }
        } catch (Exception) {
          setErrorMessage(["Something went wrong."]);
        }
      });
  }

  return isAuthenticated === true ? (
    <MainPage />
  ) : (
    <div>
      <div className="loginContainer">
        <div className="TitlePage">
          <h1>
            Log into&nbsp; <span>&nbsp;Tax App&nbsp;</span>
          </h1>
        </div>
        <div className="LoginInputs">
          <input
            value={emailAddress}
            placeholder="Email Address"
            onChange={(e) => EmailAddressChanged(e.target.value)}
          ></input>
          <input
            className="ClearImage"
            type="image"
            alt="Clear"
            src="https://img.icons8.com/ios/16/000000/close-window.png"
            onClick={() => ClearEmailAddress()}
            title="Clear text"
          />
        </div>
        <div className="LoginInputs">
          <input
            value={password}
            placeholder="Password"
            type="password"
            onChange={(e) => PasswordChanged(e.target.value)}
          ></input>
          <input
            className="ClearImage"
            type="image"
            alt="Clear"
            src="https://img.icons8.com/ios/16/000000/close-window.png"
            onClick={() => ClearPassword()}
            title="Clear text"
          />
        </div>
        <div className="ButtonSend">
          <button type="submit" onClick={() => SendCall()}>
            Log in
          </button>
        </div>
        <div className="CreationAndForgot">
          <input
            type="button"
            value="Create new account"
            onClick={() => navigate("/createaccount")}
          />
          <input
            type="button"
            value="Forgot password"
            onClick={() => navigate("/forgotpassword")}
          />
        </div>
        <div className="ErrorMessage">
          {errorMessage.map(function (val, index) {
            return <h4 key={index}>{val}</h4>;
          })}
        </div>
      </div>
    </div>
  );
}

export default LoginPage;
