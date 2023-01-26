import { useHistory } from "react-router-dom";
import Navigation from "../Navigation/Navigation";

function Header() {
  const history = useHistory();
  const pathName = history.location.pathname;

  function setLoggedIn() {
    let loggedIn = false;
    if (
      pathName === "/signin" ||
      pathName === "/signup" ||
      pathName === "/" ||
      pathName === "/"
    ) {
      loggedIn = false;
    } else if (
      pathName === "/movies" ||
      pathName === "/saved-movies" ||
      pathName === "/profile" ||
      pathName === "/404"
    ) {
      loggedIn = true;
    }
    return loggedIn;
  }

  return (
    <header className="header">
      <Navigation loggedIn={setLoggedIn()} />
    </header>
  );
}

export default Header;
