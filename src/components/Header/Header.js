import { Link, useHistory } from "react-router-dom";
import Navigation from "../Navigation/Navigation";
import headerLogo from "../../images/header-logo.svg";

function Header() {
  const history = useHistory();
  const pathName = history.location.pathname;

  function setLoggedIn() {
    let loggedIn = false;
    if (pathName === "/signin" || pathName === "/signup" || pathName === "/" || pathName === "/") {
      loggedIn= false;
    } else if (pathName === "/movies" || pathName === "/saved-movies" || pathName === "/profile" || pathName === "/404") {
      loggedIn= true;
    }
    return loggedIn;
  } 

  return (
    <header className="header">
      <Link
        to="/"
        className={`header__link ${
          pathName === "/signin" || pathName === "/signup" ? "header__link_logout" : ""
        }`}
      >
        <img src={headerLogo} alt="Логотип проекта" />
      </Link>
      <Navigation loggedIn={setLoggedIn()} />
    </header>
  );
}

export default Header;
