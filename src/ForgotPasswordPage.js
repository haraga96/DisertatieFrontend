import React, { useState } from "react";
import "./ForgotPasswordPage.css";

function ForgotPasswordPage() {
  const [emailAddress, updateEmailAddress] = useState("", "");
  const [errorMessage, setErrorMessage] = useState([], []);

  function EmailAddressChanged(value) {
    setErrorMessage([]);
    updateEmailAddress(value);
  }

  function ClearEmailAddress() {
    setErrorMessage([]);
    updateEmailAddress("");
  }

  function SendCall() {
    const emailEntered = emailAddress;
    const axios = require("axios").default;

    axios
      .post("https://localhost:5001/api/users/forgot", {
        emailAddress: emailEntered,
      })
      .then(function (response) {
        console.log(response);
        setErrorMessage([]);
      })
      .catch(function (error) {
        try {
          if (
            error !== null &&
            error.response !== null &&
            error.response.data !== null
          ) {
            var sentence = error.response.data.split("*");
            console.log(sentence);
            setErrorMessage(sentence);
          }
        } catch (Exception) {
          setErrorMessage(["", "Something went wrong."]);
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
            placeholder="*Email Address"
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

        <div className="ButtonSend">
          <button type="submit" onClick={() => SendCall()}>
            Send request
          </button>
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

export default ForgotPasswordPage;
