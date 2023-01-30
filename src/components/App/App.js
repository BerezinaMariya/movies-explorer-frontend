import { useState, useEffect } from "react";
import {
  Route,
  Switch,
  Redirect,
  useHistory,
  useLocation,
} from "react-router-dom";

import Header from "../Header/Header";
import Main from "../Main/Main";
import Movies from "../Movies/Movies";
import SavedMovies from "../SavedMovies/SavedMovies";
import Footer from "../Footer/Footer";
import Profile from "../Profile/Profile";
import Register from "../Register/Register";
import Login from "../Login/Login";
import Page404NotFound from "../Page404NotFound/Page404NotFound";
import InfoTooltip from "../InfoTooltip/InfoTooltip";

import { RegistrationInfoContext } from "../../contexts/RegistrationInfoContext";
import { CurrentUserContext } from "../../contexts/CurrentUserContext";
import { MoviesCardsContext } from "../../contexts/MoviesCardsContext";
import { SavedMoviesCardsContext } from "../../contexts/SavedMoviesCardsContext";
import { api } from "../../utils/Api";
import CurrentUser from "../../utils/CurrentUser";
import MoviesCards from "../../utils/MoviesCards";
import SavedMoviesCards from "../../utils/SavedMoviesCards";

// function register(
//   registrationInfo,
//   setRegistrationInfo,
//   setSuccessStatusMessage,
//   setRegOrLogSucsessStatus,
//   setInfoTooltipOpen,
//   history
// ) {
//   api
//     .register(registrationInfo.name, registrationInfo.email, registrationInfo.password )
//     .then((res) => {
//       if (res) {
//         setSuccessStatusMessage("Вы успешно зарегистрировались!");
//         setRegOrLogSucsessStatus(true);
//         setInfoTooltipOpen(true);
//         setRegistrationInfo({});
//       }
//     })
//     .then(() => history.push("/signin"))
//     .catch((err) => {
//       setSuccessStatusMessage(err.message || "Что-то пошло не так! Попробуйте ещё раз.");
//       setRegOrLogSucsessStatus(false);
//       setInfoTooltipOpen(true);
//     });
// }

// function authorize(
//   registrationInfo,
//   setCurrentUser,
//   setSuccessStatusMessage,
//   setLoggedIn,
//   setRegOrLogSucsessStatus,
//   setInfoTooltipOpen,
//   history
// ) {
//   if (!registrationInfo.email || !registrationInfo.password) {
//     console.log("ups")
//     return;
//   }
//   api
//     .authorize(registrationInfo.email, registrationInfo.password)
//     .then((res) => {
//       setLoggedIn(true);
//       history.push("/movies");
//       setCurrentUser(res);
//       localStorage.setItem('loggedIn', true);
//     })
//     .catch((err) => {
//       setSuccessStatusMessage(err.message || "Что-то пошло не так! Попробуйте ещё раз.");
//       setRegOrLogSucsessStatus(false);
//       setInfoTooltipOpen(true);
//     });
// }

function App() {
  document.title = "MoviesExplorer";
  document.documentElement.lang = "ru";

  const history = useHistory();
  const location = useLocation();

  const [loggedIn, setLoggedIn] = useState(false);
  const [pathName, setPathName] = useState("");

  const [registrationInfo, setRegistrationInfo] = useState({});
  const [currentUser, setCurrentUser] = useState({});
  const [moviesCards, setMoviesCards] = useState([]);
  const [savedMoviesCards, setSavedMoviesCards] = useState({});
  const [isInfoTooltipOpen, setInfoTooltipOpen] = useState(false);
  const [isNavigationMenuOpen, setNavigationMenuOpen] = useState(false);
  const [successStatusMessage, setSuccessStatusMessage] = useState("");
  const [RegOrLogSucsessStatus, setRegOrLogSucsessStatus] = useState(false);

  function closeAllPopups() {
    setInfoTooltipOpen(false);
    setNavigationMenuOpen(false);
  }

  function handleRegister() {
    // register(
    //   registrationInfo,
    //   setRegistrationInfo,
    //   setSuccessStatusMessage,
    //   setRegOrLogSucsessStatus,
    //   setInfoTooltipOpen,
    //   history
    // );
    setSuccessStatusMessage("Вы успешно зарегистрировались!");
    setRegOrLogSucsessStatus(true);
    setInfoTooltipOpen(true);
    history.push("/signin");
  }

  function handleLogin() {
    // authorize(
    //   registrationInfo,
    //   setCurrentUser,
    //   setSuccessStatusMessage,
    //   setLoggedIn,
    //   setRegOrLogSucsessStatus,
    //   setInfoTooltipOpen,
    //   history
    // );
    history.push("/movies");
  }

  function handleMenuButtonClick() {
    setNavigationMenuOpen(true);
  }

  //Закрытие popup по клику по overlay
  function setCloseByOverlayListener(popup) {
    popup.addEventListener("mousedown", (evt) => {
      const targetClasses = evt.target.classList;
      if (targetClasses.contains("popup_opened")) {
        closeAllPopups();
      }
    });
  }

  //Закрытие popup при нажатии на Esc
  function handleCloseByEsc(evt) {
    if (evt.key === "Escape") {
      closeAllPopups();
    }
  }

  useEffect(() => {
    setPathName(location.pathname);
  }, [location.pathname]);

  useEffect(() => {
    setCurrentUser(CurrentUser);
    setMoviesCards(MoviesCards);
    setSavedMoviesCards(SavedMoviesCards);
  }, []);

  return (
    <>
      <Header
        isLoggedIn={loggedIn}
        pathName={pathName}
        isOpen={isNavigationMenuOpen}
        onMenuButtonClick={handleMenuButtonClick}
        onClose={closeAllPopups}
        onCloseByOverlay={setCloseByOverlayListener}
        onCloseByEsc={handleCloseByEsc}
      />
      <CurrentUserContext.Provider value={currentUser}>
        <MoviesCardsContext.Provider value={moviesCards}>
          <SavedMoviesCardsContext.Provider value={savedMoviesCards}>
            <RegistrationInfoContext.Provider value={registrationInfo}>
              <Switch>
                <Route exact path="/">
                  <Main />
                </Route>
                <Route path="/movies">
                  <Movies />
                </Route>
                <Route path="/saved-movies">
                  <SavedMovies />
                </Route>
                <Route path="/profile">
                  <Profile />
                </Route>
                <Route path="/signup">
                  <Register onRegister={handleRegister} />
                </Route>
                <Route path="/signin">
                  <Login onLogin={handleLogin} />
                </Route>
                <Route path="/404">
                  <Page404NotFound />
                </Route>
                {/* <Route path="/">
                {loggedIn ? <Redirect to="/" /> : <Redirect to="/signin" />}
              </Route> */}
              </Switch>
            </RegistrationInfoContext.Provider>
          </SavedMoviesCardsContext.Provider>
        </MoviesCardsContext.Provider>
      </CurrentUserContext.Provider>
      <InfoTooltip
        isOpen={isInfoTooltipOpen}
        successStatusMessage={successStatusMessage}
        isRegOrLogSucsess={RegOrLogSucsessStatus}
        onClose={closeAllPopups}
        onCloseByOverlay={setCloseByOverlayListener}
        onCloseByEsc={handleCloseByEsc}
      />
      <Footer pathName={pathName} />
    </>
  );
}

export default App;
