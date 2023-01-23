import { Route, Switch, Link, useHistory } from "react-router-dom";

function Navigation(props) {
  const history = useHistory();
  const { loggedIn } = props;

  const pathName = history.location.pathname;

  return (
    <div className="navigation">
      <div
        className={`navigation__left-side-links ${
          loggedIn ? "" : "navigation__left-side-links_hidden"
        }`}
      >
        <Link to="/movies" className="text__13-18 navigation__movies-link">
          Фильмы
        </Link>
        <Link
          to="/saved-movies"
          className="text__13-18 navigation__saved-movies-link"
        >
          Сохранённые фильмы
        </Link>
      </div>
      <div className="navigation__right-side-links">
        <Link
          to="/signup"
          className={`navigation__link_hidden ${
            !loggedIn
              ? pathName === "/signup" || pathName === "/signin"
                ? ""
                : "navigation__link navigation__reg-link"
              : ""
          }`}
        >
          Регистрация
        </Link>
        <button
          type="button"
          className={`${
            loggedIn ? "navigation__profile-button" : "navigation__logIn-button"
          }
          ${
            pathName === "/signup" || pathName === "/signin"
              ? "navigation__button_hidden"
              : ""
          }`}
        >
          <Switch>
            <Route path="/">
              <Link
                to={`${loggedIn ? "/profile" : "/signin"}`}
                className={`navigation__link ${
                  loggedIn
                    ? "navigation__profile-link"
                    : "navigation__logIn-link"
                }`}
              >{`${loggedIn ? "Аккаунт" : "Войти"}`}</Link>
            </Route>
          </Switch>
        </button>
      </div>
    </div>
  );
}

export default Navigation;
