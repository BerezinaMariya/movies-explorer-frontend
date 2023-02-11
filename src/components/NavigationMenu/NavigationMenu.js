import { useRef, useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";

function NavigationMenu(props) {
  const { loggedIn, isOpen, onClose, onCloseByOverlay, onCloseByEsc } = props;

  const location = useLocation();
  const pathName = location.pathname;

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
      className={`navigation-menu ${
        width >= 1024
          ? pathName === "/signup" || pathName === "/signin"
            ? "navigation-menu_hidden"
            : ""
          : "popup"
      }
          ${(width < 1024) & isOpen ? "popup_opened" : ""}
      }`}
      ref={popupRef}
    >
      <div
        className={`navigation-menu__container ${
          width >= 1024
            ? pathName === "/signup" || pathName === "/signin"
              ? "navigation-menu__container_hidden"
              : "navigation-menu__container_big-screens"
            : "navigation-menu__container_small-screens"
        }`}
      >
        <div
          className={`navigation-menu__tab ${
            loggedIn ? "" : "navigation-menu__tab_hidden"
          }`}
        >
          <button
            type="button"
            onClick={onClose}
            className="navigation-menu__close-button"
          ></button>

          <Link
            to="/"
            onClick={onClose}
            className={`navigation-menu__link navigation-menu__link_main-link ${
              pathName === "/" ? "navigation-menu__link_active" : ""
            }`}
          >
            Главная
          </Link>
          <Link
            to="/movies"
            onClick={onClose}
            className={`navigation-menu__link navigation-menu__link_movies-link ${
              pathName === "/movies" ? "navigation-menu__link_active" : ""
            }`}
          >
            Фильмы
          </Link>
          <Link
            to="/saved-movies"
            onClick={onClose}
            className={`navigation-menu__link navigation-menu__link_saved-movies-link ${
              pathName === "/saved-movies" ? "navigation-menu__link_active" : ""
            }`}
          >
            Сохранённые фильмы
          </Link>
        </div>
        <Link
          to="/profile"
          onClick={onClose}
          className={`navigation-menu__profile-link ${
            loggedIn ? "" : "navigation-menu__profile-link_hidden"
          }`}
        >
          Аккаунт
        </Link>
      </div>
    </div>
  );
}

export default NavigationMenu;
