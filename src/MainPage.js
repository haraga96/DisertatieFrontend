import React, { useState, useEffect } from "react";
import "./MainPage.css";

function MainPage() {
  const [firstName] = useState("George Iulian", "");
  const [lastName] = useState("Haraga", "");
  const [emailAddress] = useState("haragageorgeiulian@gmail.com", "");
  const [countries, updateCountries] = useState([], []);

  useEffect(() => {
    async function GetCountries() {
      const axios = require("axios").default;

      await axios
        .get("https://localhost:5001/api/main/mainpage")
        .then(function (response) {
          console.log(response);
          updateCountries(response.data);
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
            }
          } catch (Exception) {
            console.log("catch");
          }
        });
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
        <div className="UserInformation">
          <h4>Country:</h4>
          <select>
            <option>Romania</option>
            <option>Spain</option>
            <option>United Kingdom</option>
            <option>Italy</option>
          </select>
        </div>
        <div className="UserInformation">
          <h4>Documents:</h4>
          <select>
            <option>Masina</option>
            <option>Casa</option>
            <option>Teren</option>
            <option>Bijuterii</option>
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
