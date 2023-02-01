import { useState, useEffect } from "react";
import { Route, Switch, Redirect, useHistory } from "react-router-dom";

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
import { mainApi } from "../../utils/MainApi";
import { moviesApi } from "../../utils/MoviesApi";

function register(
  registrationInfo,
  setRegistrationInfo,
  setSuccessStatusMessage,
  setRegOrLogSucsessStatus,
  setInfoTooltipOpen,
  history
) {
  mainApi
    .register(
      registrationInfo.name,
      registrationInfo.email,
      registrationInfo.password
    )
    .then((res) => {
      if (res) {
        setSuccessStatusMessage("Вы успешно зарегистрировались!");
        setRegOrLogSucsessStatus(true);
        setInfoTooltipOpen(true);
        setRegistrationInfo({});
      }
    })
    .then(() => history.push("/signin"))
    .catch((err) => {
      if (err.body) {
        err
          .json()
          .then((body) =>
            setSuccessStatusMessage(
              body.message
                ? body.message
                : "Что-то пошло не так! Попробуйте ещё раз."
            )
          );
      } else {
        setSuccessStatusMessage(
          err || "Что-то пошло не так! Попробуйте ещё раз."
        );
        setRegOrLogSucsessStatus(false);
        setInfoTooltipOpen(true);
      }
    });
}

function logIn(
  registrationInfo,
  setCurrentUser,
  setSuccessStatusMessage,
  setLoggedIn,
  setRegOrLogSucsessStatus,
  setInfoTooltipOpen,
  history
) {
  if (!registrationInfo.email || !registrationInfo.password) {
    return;
  }
  mainApi
    .logIn(registrationInfo.email, registrationInfo.password)
    .then((res) => {
      console.log(res);
      setLoggedIn(true);
      history.push("/movies");
      setCurrentUser(res);
      localStorage.setItem("loggedIn", true);
      localStorage.setItem("currentUser", res);
    })
    .catch((err) => {
      if (err.body) {
        err
          .json()
          .then((body) =>
            setSuccessStatusMessage(
              body.message
                ? body.message
                : "Что-то пошло не так! Попробуйте ещё раз."
            )
          );
      } else {
        setSuccessStatusMessage(
          err || "Что-то пошло не так! Попробуйте ещё раз."
        );
        setRegOrLogSucsessStatus(false);
        setInfoTooltipOpen(true);
      }
    });
}

function logOut(setLoggedIn, history, setCurrentUser) {
  mainApi
    .logOut()
    .then(() => {
      setLoggedIn(false);
      history.push("/signin");
      setCurrentUser({});
      localStorage.setItem("loggedIn", false);
    })
    .catch((err) => {
      alert(`${err} Что-то пошло не так! Выход с сайта не выполнен.`);
    });
}

function getUserInfo(setLoggedIn, setCurrentUser, history) {
  mainApi
    .getUserInfo()
    .then((res) => {
      setLoggedIn(true);
      setCurrentUser(res);
      history.push("/movies");
    })
    .catch((err) => {
      alert(`${err} Что-то пошло не так! Данные пользователя не загружены.`);
    });
}

function getMoviesCards() {
  moviesApi
    .getMoviesCards()
    .then((res) => {
      localStorage.setItem('initialMoviesCardList', JSON.stringify(res));
      console.log(JSON.stringify(res));
    })
    .catch((err) => {
      alert(`${err} Что-то пошло не так! Карточки не загружены`);
    });
}

function App() {
  document.title = "MoviesExplorer";
  document.documentElement.lang = "ru";

  const history = useHistory();

  const [loggedIn, setLoggedIn] = useState(false);

  const [registrationInfo, setRegistrationInfo] = useState({});
  const [currentUser, setCurrentUser] = useState({});

  const [isInfoTooltipOpen, setInfoTooltipOpen] = useState(false);
  const [isNavigationMenuOpen, setNavigationMenuOpen] = useState(false);
  const [successStatusMessage, setSuccessStatusMessage] = useState("");
  const [RegOrLogSucsessStatus, setRegOrLogSucsessStatus] = useState(false);
  const [isSearchFilmButtonClick, setSearchFilmButtonClick] = useState(false);

  function closeAllPopups() {
    setInfoTooltipOpen(false);
    setNavigationMenuOpen(false);
  }

  function handleRegister() {
    register(
      registrationInfo,
      setRegistrationInfo,
      setSuccessStatusMessage,
      setRegOrLogSucsessStatus,
      setInfoTooltipOpen,
      history
    );
  }

  function handleLogin() {
    logIn(
      registrationInfo,
      setCurrentUser,
      setSuccessStatusMessage,
      setLoggedIn,
      setRegOrLogSucsessStatus,
      setInfoTooltipOpen,
      history
    );
  }

  function handleTokenCheck() {
    if (localStorage.getItem("loggedIn") === "true") {
      getUserInfo(setLoggedIn, setCurrentUser, history);
    }
  }

  function handleGetMoviesCards() {
    getMoviesCards();
    setSearchFilmButtonClick(!isSearchFilmButtonClick);
  }

  function handleLogout() {
    logOut();
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
    if (loggedIn & localStorage.getItem('currentUser')) {
      setCurrentUser(localStorage.getItem('currentUser'));
    }
  }, [loggedIn]);

  useEffect(() => {
    if (
      window.location.pathname === "/" ||
      window.location.pathname === "/signin" ||
      window.location.pathname === "/signup"
    )
      handleTokenCheck();
  }, []);

  return (
    <>
      <Header
        loggedIn={loggedIn}
        isOpen={isNavigationMenuOpen}
        onMenuButtonClick={handleMenuButtonClick}
        onClose={closeAllPopups}
        onCloseByOverlay={setCloseByOverlayListener}
        onCloseByEsc={handleCloseByEsc}
      />
      <CurrentUserContext.Provider value={currentUser}>
        <RegistrationInfoContext.Provider value={registrationInfo}>
          <Switch>
            <Route exact path="/">
              <Main />
            </Route>
            <Route path="/movies">
              <Movies
                getMoviesCards={handleGetMoviesCards}
                isSearchFilmButtonClick={isSearchFilmButtonClick}
              />
            </Route>
            <Route path="/saved-movies">
              <SavedMovies />
            </Route>
            <Route path="/profile">
              <Profile onLogout={handleLogout} />
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
      </CurrentUserContext.Provider>
      <InfoTooltip
        isOpen={isInfoTooltipOpen}
        successStatusMessage={successStatusMessage}
        isRegOrLogSucsess={RegOrLogSucsessStatus}
        onClose={closeAllPopups}
        onCloseByOverlay={setCloseByOverlayListener}
        onCloseByEsc={handleCloseByEsc}
      />
      <Footer />
    </>
  );
}

export default App;
