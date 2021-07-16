import headerLogo from "./../images/header_logo_white.svg";

// import headerLogo from "../../images/header_logo_white.svg";

function Header() {
  return (
    <header className="header page__container-item">
      <a className="header__link" href="#" target="_self">
        <img src={headerLogo} className="header__logo" alt="Лого" />
      </a>
    </header>
  );
}

export default Header;
