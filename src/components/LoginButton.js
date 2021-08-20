import React from "react";
import { useAuth0 } from "@auth0/auth0-react";

const LoginButton = () => {
  const { loginWithRedirect } = useAuth0();

  return <button onClick={() => loginWithRedirect({ redirectUri: window.location.origin + "/auth0-demo" })}>Log In</button>;
};

export default LoginButton;