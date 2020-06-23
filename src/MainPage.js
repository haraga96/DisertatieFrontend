import React, { useState, useEffect } from "react";
import "./MainPage.css";

function MainPage(props) {
  const [firstName, setFirstName] = useState("", "");
  const [lastName, setLastName] = useState("", "");
  const [emailAddress, setEmailAddress] = useState("", "");
  const [documents, updateDocuments] = useState([], []);
  const [oneTimeCall, updateOneTimeCall] = useState(false, false);

  useEffect(() => {
    const axios = require("axios").default;
    async function GetInfos() {
      if (props.token !== null) {
        await axios
          .get("https://localhost:5001/api/main/mainpage", {
            headers: { Authorization: `Bearer ${props.token}` },
          })
          .then(function (response) {
            console.log(response.data);
            updateOneTimeCall(true);
            setFirstName(response.data.firstName);
            setLastName(response.data.lastName);
            setEmailAddress(response.data.emailAddress);
            updateDocuments(response.data.documents);
          })
          .catch();
      }
    }
    if (oneTimeCall === false) {
      GetInfos();
    }
  });

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
        {/* <div className="UserInformation">
          <h4>Country:</h4>
          <select>
            {documents.map((country) => {
              return <option key={country.id}>{country.name}</option>;
            })}
          </select>
        </div> */}
        <div className="UserInformation">
          <h4>Documents:</h4>
          <select>
            {documents.map((document) => {
              return <option key={document.id}>{document.name}</option>;
            })}
          </select>
        </div>
        <div className="ButtonSend">
          <button type="submit">Calculate</button>
        </div>
      </div>
    </div>
  );
}

export default MainPage;
