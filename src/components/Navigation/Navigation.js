import { Link } from "react-router-dom";
import NavigationMenu from "../NavigationMenu/NavigationMenu";
import navigationLogo from "../../images/navigation-logo.svg";

function Navigation(props) {
  const { loggedIn, pathName, isOpen, onMenuButtonClick, onClose, onCloseByOverlay, onCloseByEsc } = props;

  function handleButtonClick() {
    onMenuButtonClick();
  }

  return (
    <div
    className={`${
      pathName === "/signin" || pathName === "/signup"
        ? "navigation_logout"
        : "navigation"
    }`}
    >
      <div 
      className={`${
        pathName === "/signin" || pathName === "/signup"
          ? "navigation__logo-link-block_logout"
          : "navigation__logo-link-block"
      }`}
      >
      <Link
        to="/"
        className="button-hover navigation__logo-link">
        <img className="button-hover navigation__logo" src={navigationLogo} alt="Логотип проекта" />
      </Link>
      </div>

        <NavigationMenu
          pathName={pathName}
          loggedIn={loggedIn}
          isOpen={isOpen}
          onClose={onClose}
          onCloseByOverlay={onCloseByOverlay}
          onCloseByEsc={onCloseByEsc}
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
