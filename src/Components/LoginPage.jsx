import React from "react";

import { useState } from "react";
import { useNavigate } from "react-router-dom";
//import { useHistory } from "react-router-dom";

const LoginPage = () => {
  const navigate = useNavigate();
  const [errorMessages, setErrorMessages] = useState({});
  const [isSubmitted, setIsSubmitted] = useState(false);

  const renderErrorMessage = (name) =>
    name === errorMessages.name && (
      <div className="error">{errorMessages.message}</div>
    ); //set focus on user input when component loads

  // User Login info
  const database = [
    {
      username: "Blona",
      password: "ToTheSky",
    },
  ];

  const errors = {
    uname: "invalid username",
    pass: "invalid password",
  };

  const handleSubmit = (event) => {
    //Prevent page reload
    event.preventDefault();

    console.log(event);

    var { uname, pass } = document.forms[0];

    //find username and password in database
    const userData = database.find((user) => user.username === uname.value);

    if (userData) {
      if (userData.password !== pass.value) {
        // Invalid password
        setErrorMessages({ name: "pass", message: errors.pass });
      } else {
        setIsSubmitted(true);
        // navigate to home page if login data is correct
        navigate("/home");
      }
    } else {
      // Username not found
      setErrorMessages({ name: "uname", message: errors.uname });
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <div className="input-container">
          <label>Username </label>
          <input type="text" class="heighttext" name="uname" required />
          {renderErrorMessage("uname")}
        </div>
        <div className="input-container">
          <label>Password </label>
          <input type="password" class="heighttext" name="pass" required />
          {renderErrorMessage("pass")}
        </div>
        <div className="button-container">
          <input type="submit" value="Login" />
        </div>
      </form>
    </div>
  );
};

export default LoginPage;
