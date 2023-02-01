import Navigation from "../Navigation/Navigation";

function Header(props) {
  const {
    loggedIn,
    isOpen,
    onMenuButtonClick,
    onClose,
    onCloseByOverlay,
    onCloseByEsc,
  } = props;

  const pathName = window.location.pathname;

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
        loggedIn={loggedIn}
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
