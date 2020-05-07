import React from "react";
import { Router } from "@reach/router";
import LoginPage from "./LoginPage";
import ForgotPasswordPage from "./ForgotPasswordPage";
import CreateAccountPage from "./CreateAccountPage";

function App() {
  return (
    <div>
      <Router>
        <LoginPage path="/" />
        <ForgotPasswordPage path="/forgotpassword" />
        <CreateAccountPage path="/createaccount" />
      </Router>
    </div>
  );
}

export default App;
