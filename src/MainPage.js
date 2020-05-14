import React, { useState, useEffect } from "react";
import "./MainPage.css";

function MainPage(props) {
  const [firstName] = useState("George Iulian", "");
  const [lastName] = useState("Haraga", "");
  const [emailAddress] = useState("haragageorgeiulian@gmail.com", "");
  const [countries, updateCountries] = useState([], []);

  useEffect(() => {
    const axios = require("axios").default;
    console.log(props.token);
    async function GetCountries() {
      if (countries.length === 0 && props.token !== null) {
        await axios
          .get("https://localhost:5001/api/main/mainpage", {
            headers: { Authorization: `Bearer ${props.token}` },
          })
          .then(function (response) {
            updateCountries(response.data);
          })
          .catch();
      }
    }
    GetCountries();
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
            {countries.map((country) => {
              return <option key={country.id}>{country.name}</option>;
            })}
          </select>
        </div>
        <div className="UserInformation">
          <h4>Documents:</h4>
          <select>
            {countries.map((country) => {
              return <option key={country.id}>{country.name}</option>;
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
