import { useState } from "react";
import { Link, useHistory } from "react-router-dom";
import NavigationMenu from "../NavigationMenu/NavigationMenu";
import navigationLogo from "../../images/navigation-logo.svg";

function Navigation(props) {
  const { loggedIn } = props;

  const history = useHistory();
  const pathName = history.location.pathname;

  const [isMenuOpen, setMenuOpen] = useState(false);

  function handleButtonClick() {
    setMenuOpen(!isMenuOpen);
  }

  return (
    <div className="navigation">
      <Link
        to="/"
        className={`button-hover navigation__logo-link ${
          pathName === "/signin" || pathName === "/signup"
            ? "navigation__logo-link_logout"
            : ""
        }`}
      >
        <img src={navigationLogo} alt="Логотип проекта" />
      </Link>

        <NavigationMenu
          loggedIn={loggedIn}
          isMenuOpen={isMenuOpen}
          onMenuOpen={handleButtonClick}
        />

      <div
        className={`${
          !loggedIn
            ? pathName === "/signup" || pathName === "/signin"
              ? "navigation__link_hidden"
              : "navigation__tab"
            : "navigation__link_hidden"
        }`}
      >
        <Link
          to="/signup"
          className="button-hover navigation__link navigation__reg-link"
        >
          Регистрация
        </Link>
        <button
          type="button"
          className="button-hover navigation__logIn navigation__logIn-button"
        >
          <Link
            to="/signin"
            className="button-hover navigation__link navigation__logIn-link"
          >
            Войти
          </Link>
        </button>
      </div>

      <button
        type="button"
        onClick={handleButtonClick}
        className={`button-hover ${
          loggedIn ? "navigation__menu-button" : "navigation__button_hidden"
        }`}
      ></button>
    </div>
  );
}

export default Navigation;
