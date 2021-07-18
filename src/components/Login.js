import React from "react";
import { withRouter } from "react-router-dom";
import Button from "./Button.js";
import * as auth from "./../utils/auth.js";

function Login(props) {
  const [userEmail, setUserName] = React.useState("");
  const [userPassword, setUserPassword] = React.useState("");

  const handleChange = (e) => {
    const input = e.target;
    if (input.name === "username") {
      setUserName(input.value);
    } else if (input.name === "password") {
      setUserPassword(input.value);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    auth
      .authorize(userEmail, userPassword)
      .then((response) => {
        if (!response.ok) {
          if (response.status === 401)
            props.onTooltipOpen(
              true,
              "Пользователь с email не найден! Пройдите регистрацию",
              true
            );
          else if (response.status === 400) {
            props.onTooltipOpen(
              true,
              "Не передано одно из полей. Заполните оба поля",
              true
            );
          }

          return Promise.reject();
        }

        return response.json();
      })
      .then((data) => {
        if (data.token) {
          setUserName("");
          setUserPassword("");

          props.handleLogin(data.token, userEmail);
          props.history.push("/");
        }
      })
      .catch((err) => console.log(err));
  };

  const cssRules = {
    background: "white",
    color: "black",
  };

  return (
    <div className="login">
      <p className="login__welcome">Вход</p>

      <form onSubmit={handleSubmit} className="login__form" name="login">
        <input
          className="login__input"
          id="username"
          name="username"
          value={userEmail}
          onChange={handleChange}
          placeholder="Email"
        />
        <input
          className="login__input"
          id="password"
          name="password"
          value={userPassword}
          onChange={handleChange}
          placeholder="Пароль"
          type="password"
        />

        <Button
          type="submit"
          className="button button_type_save-form"
          buttonText="Войти"
          style={cssRules}
        ></Button>
      </form>
    </div>
  );
}

export default withRouter(Login);
