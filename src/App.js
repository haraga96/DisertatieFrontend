import React from "react";
import { Router } from "@reach/router";
import ForgotPasswordPage from "./ForgotPasswordPage";
import CreateAccountPage from "./CreateAccountPage";
import ResetPasswordPage from "./ResetPasswordPage";
import NotFoundPage from "./NotFoundPage";
import StartPage from "./StartPage";

function App() {
  return (
    <div>
      <Router>
        <StartPage path="/" />
        <ForgotPasswordPage path="/forgotpassword" />
        <CreateAccountPage path="/createaccount" />
        <ResetPasswordPage path="/resetpassword" />
        <NotFoundPage path="/notfound" default={true} />
      </Router>
    </div>
  );
}

export default App;
