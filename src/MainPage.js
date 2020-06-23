import React, { useState, useEffect } from "react";
import Popup from "./Popup";
import "./MainPage.css";

function MainPage(props) {
  const [firstName, setFirstName] = useState("", "");
  const [lastName, setLastName] = useState("", "");
  const [emailAddress, setEmailAddress] = useState("", "");
  const [documents, updateDocuments] = useState([], []);
  const [oneTimeCall, updateOneTimeCall] = useState(false, false);
  const [popUpVisibility, updatePopUpVisibility] = useState("hidden", "hidden");
  const [errorMessage, setErrorMessage] = useState("", "");

  useEffect(() => {
    const axios = require("axios").default;
    async function GetInfosUser() {
      if (props.token !== null) {
        await axios
          .get("https://localhost:5001/api/main/mainpageuser", {
            headers: { Authorization: `Bearer ${props.token}` },
          })
          .then(function (response) {
            console.log(response.data);
            updateOneTimeCall(true);
            setFirstName(response.data.firstName);
            setLastName(response.data.lastName);
            setEmailAddress(response.data.emailAddress);
          })
          .catch(function () {
            setErrorMessage("*Something went wrong.");
          });
      }
    }

    async function GetInfosDocuments() {
      if (props.token !== null) {
        const requestOptions = {
          method: "GET",
          headers: { Authorization: `Bearer ${props.token}` },
        };
        const response = await fetch(
          "https://localhost:5001/api/documents/infos",
          requestOptions
        );
        const data = await response.json();
        console.log(data);
        updateOneTimeCall(true);
        updateDocuments(data);
      }
    }
    if (oneTimeCall === false) {
      GetInfosUser();
      GetInfosDocuments();
    }
  });

  function CheckType(id) {
    switch (id) {
      case 1:
        return "Romania";
      case 2:
        return "United Kingdom";
      case 3:
        return "Italy";
      case 4:
        return "Spain";
      case 5:
        return "Austria";
      case 6:
        return "France";
      default:
        return id;
    }
  }

  async function LogOut() {
    setErrorMessage("");
    if (props.token !== null) {
      const requestOptions = {
        method: "POST",
      };
      await fetch("https://localhost:5001/api/users/logout", requestOptions);
    }
    window.location.reload(true);
  }

  async function Compute() {
    const axios = require("axios").default;
    setErrorMessage("");
    await axios
      .get("https://localhost:5001/api/compute/sendsum", {
        headers: { Authorization: `Bearer ${props.token}` },
        params: {
          emailAddress: emailAddress,
        },
      })
      .then(function () {
        updatePopUpVisibility("visible");
      })
      .catch(function () {
        setErrorMessage("*Something went wrong.");
      });
  }

  function ClosePopup() {
    updatePopUpVisibility("hidden");
  }

  return (
    <div>
      <div className="mainPageContainer">
        <div className="UserInformation">
          <h4>First name:</h4>
          <input value={firstName} readOnly />
        </div>
        <div className="UserInformation">
          <h4>Last name:</h4>
          <input value={lastName} readOnly />
        </div>
        <div className="UserInformation">
          <h4>Email address:</h4>
          <input value={emailAddress} readOnly />
        </div>
        <div className="UserInformation">
          <h4>Documents:</h4>
          <select>
            {documents.map((document) => {
              return (
                <option key={document.id}>
                  {document.name}, {document.valueDue} lei,{" "}
                  {CheckType(document.countryId)}
                </option>
              );
            })}
          </select>
        </div>
        <div className="ButtonSend">
          <button type="submit" onClick={() => Compute()}>
            Calculate
          </button>
        </div>
        <div className="ButtonSend">
          <button type="submit" onClick={() => LogOut()}>
            Log out
          </button>
        </div>
        <div className="ErrorMessage">
          <h4>{errorMessage}</h4>
        </div>
        <Popup
          text="Email has been sent."
          buttonText="Great"
          isVisible={popUpVisibility}
          closePopup={() => ClosePopup()}
        />
      </div>
    </div>
  );
}

export default MainPage;
