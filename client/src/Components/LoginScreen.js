import React from "react";
import Button from './Button';

const LoginScreen = (props) =>
  <Button onClick={() => props.login()}>
    Click me to authenticate.
  </Button>

export default LoginScreen