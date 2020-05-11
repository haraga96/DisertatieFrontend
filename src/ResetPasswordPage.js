import React, { useState } from "react";
import "./ResetPasswordPage.css";
import { navigate } from "@reach/router";

function ResetPasswordPage() {
  const [emailAddress, updateEmailAddress] = useState("", "");
  const [oldPassword, updateOldPassword] = useState("", "");
  const [password, updatePassword] = useState("", "");
  const [confirmPassword, updateConfirmPassword] = useState("", "");
  const [errorMessage, setErrorMessage] = useState([], []);

  function EmailAddressChanged(value) {
    setErrorMessage([]);
    updateEmailAddress(value);
  }

  function OldPasswordChanged(value) {
    setErrorMessage([]);
    updateOldPassword(value);
  }

  function PasswordChanged(value) {
    setErrorMessage([]);
    updatePassword(value);
  }

  function ConfirmPasswordChanged(value) {
    setErrorMessage([]);
    updateConfirmPassword(value);
  }

  function ClearEmailAddress() {
    setErrorMessage([]);
    updateEmailAddress("");
  }

  function ClearOldPassword() {
    setErrorMessage([]);
    updateOldPassword("");
  }

  function ClearPassword() {
    setErrorMessage([]);
    updatePassword("");
  }

  function ClearConfirmPassword() {
    setErrorMessage([]);
    updateConfirmPassword("");
  }

  async function SendCall() {
    const axios = require("axios").default;

    await axios
      .post("https://localhost:5001/api/users/reset", {
        emailAddress: emailAddress,
        oldPassword: oldPassword,
        newPassword: password,
        confirmNewPassword: confirmPassword,
      })
      .then(function (response) {
        console.log(response);
        navigate("/");
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
          setErrorMessage(["Something went wrong."]);
        }
      });
  }

  return (
    <div>
      <div className="resetContainer">
        <div className="TitlePage">
          <h1>Reset your password</h1>
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
        <div className="LoginInputs">
          <input
            value={oldPassword}
            placeholder="*Old password"
            type="password"
            onChange={(e) => OldPasswordChanged(e.target.value)}
          ></input>
          <input
            className="ClearImage"
            type="image"
            alt="Clear"
            src="https://img.icons8.com/ios/16/000000/close-window.png"
            onClick={() => ClearOldPassword()}
            title="Clear text"
          />
        </div>
        <div className="LoginInputs">
          <input
            value={password}
            placeholder="*New password"
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
        <div className="LoginInputs">
          <input
            value={confirmPassword}
            placeholder="*Confirm new password"
            type="password"
            onChange={(e) => ConfirmPasswordChanged(e.target.value)}
          ></input>
          <input
            className="ClearImage"
            type="image"
            alt="Clear"
            src="https://img.icons8.com/ios/16/000000/close-window.png"
            onClick={() => ClearConfirmPassword()}
            title="Clear text"
          />
        </div>
        <div className="ButtonSend">
          <button type="submit" onClick={() => SendCall()}>
            Reset
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

export default ResetPasswordPage;
