import React from "react";
import { withRouter, Link } from "react-router-dom";
import Button from "./Button.js";
import * as auth from "./../utils/auth.js";

function Register(props) {
  const [userName, setUserName] = React.useState("");
  const [userPassword, setUserPassword] = React.useState("");

  const handleChange = (e) => {
    const input = e.target;
    if (input.name === "username") {
      setUserName(input.value);
    } else if (input.name === "password") {
      setUserPassword(input.value);
    }
  };

  let isMistakeHappened = false;

  const handleSubmit = (e) => {
    e.preventDefault();

    auth
      .register(userName, userPassword)
      .then((response) => {
        isMistakeHappened = !response.ok;        
        return response.json();
      })
      .then((data) => {
        debugger;
        if (isMistakeHappened || data.error){

            props.onTooltipOpen(true, data.error || data.message || "Что-то пошло не так! Попробуйте ещё раз.", true);
            return Promise.reject();

        } else {

            props.onTooltipOpen(true, "Вы успешно зарегистрировались!", false);
            props.history.push('/sign-in');
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
      <p className="login__welcome">Регистрация</p>

      <form onSubmit={handleSubmit} className="login__form" name="login">
        <input
          className="login__input"
          id="username"
          name="username"
          value={userName}
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
          buttonText="Зарегистрироваться"
          style={cssRules}
        ></Button>
      </form>

      <div className="login__signin">
          <span>Уже зарегистрированы?</span>
          <Link to="/sign-in" className="login__link">Войти</Link>
        </div>
    </div>
  );
}

export default withRouter(Register);
