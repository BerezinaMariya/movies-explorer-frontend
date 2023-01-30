// import { useHistory } from "react-router-dom";
import Navigation from "../Navigation/Navigation";

function Header(props) {
  const {
    isOpen,
    pathName,
    onMenuButtonClick,
    onClose,
    onCloseByOverlay,
    onCloseByEsc,
  } = props;

  // const history = useHistory();
  // const pathName = history.location.pathname;

  function setLoggedIn() {
    let loggedIn = false;
    if (pathName === "/signin" || pathName === "/signup" || pathName === "/") {
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
    <header
      className={`header ${
        pathName === "/" ||
        pathName === "/movies" ||
        pathName === "/saved-movies" ||
        pathName === "/profile" ||
        pathName === "/signin" ||
        pathName === "/signup"
          ? ""
          : "header_hidden"
      }`}
    >
      <Navigation
        loggedIn={setLoggedIn()}
        pathName={pathName}
        isOpen={isOpen}
        onMenuButtonClick={onMenuButtonClick}
        onClose={onClose}
        onCloseByOverlay={onCloseByOverlay}
        onCloseByEsc={onCloseByEsc}
      />
    </header>
  );
}

export default Header;
