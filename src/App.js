import React from "react";
import { Router } from "@reach/router";
import LoginPage from "./LoginPage";
import ForgotPasswordPage from "./ForgotPasswordPage";
import CreateAccountPage from "./CreateAccountPage";
import ResetPasswordPage from "./ResetPasswordPage";
import NotFoundPage from "./NotFoundPage";

function App() {
  return (
    <div>
      <Router>
        <LoginPage path="/" />
        <ForgotPasswordPage path="/forgotpassword" />
        <CreateAccountPage path="/createaccount" />
        <ResetPasswordPage path="/resetpassword" />
        <NotFoundPage path="/notfound" default={true} />
      </Router>
    </div>
  );
}

export default App;
