import Navigation from "../Navigation/Navigation";

function Header(props) {
  const {
    pathName,
    isOpen,
    onMenuButtonClick,
    onClose,
    onCloseByOverlay,
    onCloseByEsc,
  } = props;

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
      className={`${
        pathName === "/" ||
        pathName === "/movies" ||
        pathName === "/saved-movies" ||
        pathName === "/profile" ||
        pathName === "/signin" ||
        pathName === "/signup"
          ? "header"
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
