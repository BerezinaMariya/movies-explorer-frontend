import { useHistory, Link } from "react-router-dom";
import NavigationMenu from "../NavigationMenu/NavigationMenu";
import navigationLogo from "../../images/navigation-logo.svg";

function Navigation(props) {
  const {
    loggedIn,
    isOpen,
    onMenuButtonClick,
    onClose,
    onCloseByOverlay,
    onCloseByEsc,
  } = props;

  const history = useHistory();
  const pathName = history.location.pathname;

  function handleButtonClick() {
    onMenuButtonClick();
  }

  return (
    <div
      className={`navigation ${
        pathName === "/signin" || pathName === "/signup"
          ? "navigation_logOut"
          : "navigation_logIn"
      }`}
    >
      <div
        className={`navigation__logo-link-block ${
          pathName === "/signin" || pathName === "/signup"
            ? "navigation__logo-link-block_logOut"
            : "navigation__logo-link-block_logIn"
        }`}
      >
        <Link to="/" className="navigation__logo-link">
          <img
            className="navigation__logo"
            src={navigationLogo}
            alt="Логотип проекта"
          />
        </Link>
      </div>

      <NavigationMenu
        loggedIn={loggedIn}
        isOpen={isOpen}
        onClose={onClose}
        onCloseByOverlay={onCloseByOverlay}
        onCloseByEsc={onCloseByEsc}
      />

      <div
        className={`navigation__tab ${
          !loggedIn
            ? pathName === "/signup" || pathName === "/signin"
              ? "navigation__tab_hidden"
              : "navigation__tab_visible"
            : "navigation__tab_hidden"
        }`}
      >
        <Link
          to="/signup"
          className="navigation__link navigation__link_reg"
        >
          Регистрация
        </Link>
        <Link
          to="/signin"
          className="navigation__link navigation__link_logIn"
        >
          Войти
        </Link>
      </div>
      <button
        type="button"
        onClick={handleButtonClick}
        className={`navigation__menu-button ${
          loggedIn ? "navigation__menu-button_visible" : "navigation__menu-button_hidden"
        }`}
      ></button>
    </div>
  );
}

export default Navigation;
