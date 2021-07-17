import { Route, Switch, Link } from "react-router-dom";
import headerLogo from "./../images/header_logo_white.svg";

function Header(props) {
  return (
    <header className="header page__container-item">
      <a className="header__link" href="#" target="_self">
        <img src={headerLogo} className="header__logo" alt="Лого" />
      </a>

      <div>
        <span className="header__email">{props.userEmail}</span>

        <Switch>
          <Route path="/sign-in">
            <Link to="/sign-up" className="header__link">
              Регистрация
            </Link>
          </Route>

          <Route path="/sign-up">
            <Link to="/sign-in" className="header__link">
              Войти
            </Link>
          </Route>

          <Route path="/">
            <Link to="#" className="header__link">
              Выйти
            </Link>
          </Route>
        </Switch>
      </div>
    </header>
  );
}

export default Header;
