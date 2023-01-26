import { Link, useHistory } from "react-router-dom";

function NavigationMenu(props) {
  const { loggedIn, isMenuOpen, onMenuOpen } = props;

  const history = useHistory();
  const pathName = history.location.pathname;

  return (
    <>
    <div className={`popup ${isMenuOpen ? "popup_opened" : ""}`}></div>
    <div className={`navigation-menu navigation-menu__container ${isMenuOpen ? "navigation-menu__container_opened" : ""}`}>
      <button
        type="button"
        onClick={onMenuOpen}
        className="button-hover navigation-menu__close-button"
      ></button>
      <div
        className={`${
          loggedIn ? "navigation-menu__tab" : "navigation-menu__link_hidden"
        }`}
      >
        <Link
          to="/"
          className={`button-hover navigation-menu__main-link ${
            pathName === "/" ? "navigation-menu__link_active" : ""
          }`}
        >
          Главная
        </Link>
        <Link
          to="/movies"
          className={`button-hover text__13-18 navigation-menu__movies-link ${
            pathName === "/movies" ? "navigation-menu__link_active" : ""
          }`}
        >
          Фильмы
        </Link>
        <Link
          to="/saved-movies"
          className={`button-hover text__13-18 navigation-menu__movies-link navigation-menu__saved-movies-link ${
            pathName === "/saved-movies" ? "navigation-menu__link_active" : ""
          }`}
        >
          Сохранённые фильмы
        </Link>
      </div>
      <button
        type="button"
        className={`button-hover ${
          loggedIn
            ? "navigation-menu__profile-button"
            : "navigation-menu__button_hidden"
        }`}
      >
        <Link
          to="/profile"
          className="button-hover navigation-menu__profile-link"
        >
          Аккаунт
        </Link>
      </button>
    </div>
    </>
  );
}

export default NavigationMenu;
