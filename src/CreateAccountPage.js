import React, { useState } from "react";
import "./CreateAccountPage.css";
import Popup from "./Popup";
import { navigate } from "@reach/router";

function CreateAccountPage() {
  const [firstName, updateFirstName] = useState("", "");
  const [lastName, updateLastName] = useState("", "");
  const [emailAddress, updateEmailAddress] = useState("", "");
  const [password, updatePassword] = useState("", "");
  const [confirmPassword, updateConfirmPassword] = useState("", "");
  const [popUpVisibility, updatePopUpVisibility] = useState("hidden", "hidden");
  const [errorMessage, setErrorMessage] = useState([], []);

  function FirstNameChanged(value) {
    setErrorMessage([]);
    updateFirstName(value);
  }

  function LastNameChanged(value) {
    setErrorMessage([]);
    updateLastName(value);
  }

  function EmailAddressChanged(value) {
    setErrorMessage([]);
    updateEmailAddress(value);
  }

  function PasswordChanged(value) {
    setErrorMessage([]);
    updatePassword(value);
  }

  function ConfirmPasswordChanged(value) {
    setErrorMessage([]);
    updateConfirmPassword(value);
  }

  function ClearFirstName() {
    setErrorMessage([]);
    updateFirstName("");
  }

  function ClearLastName() {
    setErrorMessage([]);
    updateLastName("");
  }

  function ClearEmailAddress() {
    setErrorMessage([]);
    updateEmailAddress("");
  }

  function ClearPassword() {
    setErrorMessage([]);
    updatePassword("");
  }

  function ClearConfirmPassword() {
    setErrorMessage([]);
    updateConfirmPassword("");
  }

  function ClosePopup() {
    updatePopUpVisibility("hidden");
    navigate(-1);
  }

  async function SendCall() {
    const axios = require("axios").default;
    await axios
      .post("https://localhost:5001/api/users/create", {
        firstName: firstName,
        lastName: lastName,
        emailAddress: emailAddress,
        password: password,
        confirmPassword: confirmPassword,
      })
      .then(function (response) {
        console.log(response);
        setErrorMessage([]);
        updatePopUpVisibility("visible");
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
      <div className="createAccountContainer">
        <div className="TitlePage">
          <h1>Create new account</h1>
        </div>
        <div className="LoginInputs">
          <input
            value={firstName}
            placeholder="*First name"
            onChange={(e) => FirstNameChanged(e.target.value)}
          ></input>
          <input
            className="ClearImage"
            type="image"
            alt="Clear"
            src="https://img.icons8.com/ios/16/000000/close-window.png"
            onClick={() => ClearFirstName()}
            title="Clear text"
          />
        </div>
        <div className="LoginInputs">
          <input
            value={lastName}
            placeholder="*Last name"
            onChange={(e) => LastNameChanged(e.target.value)}
          ></input>
          <input
            className="ClearImage"
            type="image"
            alt="Clear"
            src="https://img.icons8.com/ios/16/000000/close-window.png"
            onClick={() => ClearLastName()}
            title="Clear text"
          />
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
            value={password}
            placeholder="*Password"
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
            placeholder="*Confirm password"
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
            Create new account
          </button>
        </div>
        <div className="ErrorMessage">
          {errorMessage.map(function (val, index) {
            return <h4 key={index}>{val}</h4>;
          })}
        </div>
      </div>
      <Popup
        text="Your account has been created successfully."
        buttonText="Great"
        isVisible={popUpVisibility}
        closePopup={() => ClosePopup()}
      />
    </div>
  );
}

export default CreateAccountPage;
