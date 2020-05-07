import React, { useState } from "react";
import "./ForgotPasswordPage.css";

function ForgotPasswordPage() {
  const [emailAddress, updateEmailAddress] = useState("", "");
  const [errorMessage, setErrorMessage] = useState("", "");

  function EmailAddressChanged(value) {
    setErrorMessage("");
    updateEmailAddress(value);
  }

  function ClearEmailAddress() {
    setErrorMessage("");
    updateEmailAddress("");
  }

  function SendCall() {
    const emailEntered = emailAddress;
    const axios = require("axios").default;

    axios
      .post("https://localhost:5001/api/users/forgotpassword", {
        emailAddress: emailEntered,
      })
      .then(function (response) {
        console.log(response);
        setErrorMessage("");
      })
      .catch(function (error) {
        if (error.response.status !== 404) {
          console.log(error.response.data);
          setErrorMessage(error.response.data);
        }
      });
  }

  return (
    <div>
      <div className="forgotContainer">
        <div className="TitlePage">
          <h1>Forgot password</h1>
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
            src="https://img.icons8.com/ios/50/000000/circled-x.png"
            onClick={() => ClearEmailAddress()}
            title="Clear text"
          />
        </div>
        <div className="ErrorMessage">
          <h4>{errorMessage}</h4>
        </div>
        <div className="ButtonSend">
          <button type="submit" onClick={() => SendCall()}>
            Send request
          </button>
        </div>
      </div>
    </div>
  );
}

export default ForgotPasswordPage;
