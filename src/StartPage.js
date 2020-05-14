import React, { useState, useEffect } from "react";
import "./StartPage.css";
import LoginPage from "./LoginPage";
import MainPage from "./MainPage";

function StartPage() {
  const [errorMessage, setErrorMessage] = useState([], []);
  const [isAuthenticated, updateIsAuthenticated] = useState(false, false);
  const [token, updateToken] = useState("", "");
  const [oneTimeCall, updateOneTimeCall] = useState(false, false);

  async function SendCall() {
    const axios = require("axios").default;

    await axios
      .get("https://localhost:5001/api/users/checkstatus")
      .then(function (response) {
        updateOneTimeCall(true);
        if (response.status === 204) {
          updateIsAuthenticated(false);
        } else {
          updateIsAuthenticated(true);
        }
        updateToken(response.data);
      })
      .catch(function (error) {
        try {
          if (
            error !== null &&
            error.response !== null &&
            error.response.data !== null
          ) {
            var sentence = error.response.data.split("*");
            updateIsAuthenticated(false);
            updateOneTimeCall(true);
            setErrorMessage(sentence);
          }
        } catch (Exception) {
          updateIsAuthenticated(false);
          updateOneTimeCall(true);
          setErrorMessage(["Something went wrong. Try again later."]);
        }
      });
  }

  useEffect(() => {
    if (oneTimeCall === false) {
      SendCall();
    }
  });

  return isAuthenticated === false ? (
    <div>
      <LoginPage errorMessage={errorMessage} />
    </div>
  ) : (
    <div>
      <MainPage token={token} />
    </div>
  );
}

export default StartPage;
