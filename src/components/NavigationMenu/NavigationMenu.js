import { useRef, useState, useEffect } from "react";
import { Link } from "react-router-dom";

function NavigationMenu(props) {
  const {
    pathName,
    loggedIn,
    isOpen,
    onClose,
    onCloseByOverlay,
    onCloseByEsc,
  } = props;

  const popupRef = useRef();

  const [width, setWidth] = useState(window.innerWidth);

  useEffect(() => {
    if (isOpen) {
      onCloseByOverlay(popupRef.current);
    }
  }, [isOpen]);

  useEffect(() => {
    if (isOpen) {
      // Список действий внутри одного хука
      document.addEventListener("keydown", onCloseByEsc);
      // Возвращаем функцию, которая удаляет эффекты
      return () => {
        document.removeEventListener("keydown", onCloseByEsc);
      };
    }
  }, [isOpen]);

  useEffect(() => {
    const handleResize = (evt) => {
      setWidth(evt.target.innerWidth);
    };
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <div
      className={`${
        width >= 1024
          ? pathName === "/signup" || pathName === "/signin"
            ? "navigation-menu_hidden"
            : "navigation-menu"
          : "popup navigation-menu"}
          ${ width < 1024 & isOpen
            ? "popup_opened"
            : "" }

      }`}
      ref={popupRef}
    >
      <div
        className={`${
          width >= 1024
            ? "navigation-menu__container_big-screens"
            : "navigation-menu__container_small-screens"
        }`}
      >
        <button
          type="button"
          onClick={onClose}
          className="button-hover navigation-menu__close-button"
        ></button>
        <div
          className={`${
            loggedIn ? "navigation-menu__tab" : "navigation-menu__tab_hidden"
          }`}
        >
          <button
            type="button"
            onClick={onClose}
            className={`button-hover navigation-menu__link-button navigation-menu__main-link-button ${
              pathName === "/" ? "navigation-menu__link-button_active" : ""
            }`}
          >
            <Link
              to="/"
              className={`button-hover navigation-menu__link ${
                pathName === "/" ? "navigation-menu__link_active" : ""
              }`}
            >
              Главная
            </Link>
          </button>
          <button
            type="button"
            onClick={onClose}
            className={`button-hover navigation-menu__link-button navigation-menu__movies-link-button navigation-menu__movies-link-button ${
              pathName === "/movies"
                ? "navigation-menu__link-button_active"
                : ""
            }`}
          >
            <Link
              to="/movies"
              onClick={onClose}
              className={`button-hover navigation-menu__link ${
                pathName === "/movies" ? "navigation-menu__link_active" : ""
              }`}
            >
              Фильмы
            </Link>
          </button>
          <button
            type="button"
            onClick={onClose}
            className={`button-hover navigation-menu__link-button navigation-menu__movies-link-button navigation-menu__saved-movies-link-button ${
              pathName === "/saved-movies"
                ? "navigation-menu__link-button_active"
                : ""
            }`}
          >
            <Link
              to="/saved-movies"
              onClick={onClose}
              className={`button-hover navigation-menu__link ${
                pathName === "/saved-movies"
                  ? "navigation-menu__link_active"
                  : ""
              }`}
            >
              Сохранённые фильмы
            </Link>
          </button>
        </div>
        <button
          type="button"
          onClick={onClose}
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
    </div>
  );
}

export default NavigationMenu;
