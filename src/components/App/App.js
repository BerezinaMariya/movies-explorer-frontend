import { useState, useEffect } from "react";
import { Route, Switch, Redirect, useHistory, useLocation } from "react-router-dom";

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
import ProtectedRoute from "../ProtectedRoute/ProtectedRoute";

import {
  register,
  logIn,
  getUserInfo,
  setUserInfo,
  logOut,
  getMoviesCards,
  getSavedMoviesCards,
  saveMovieCard,
  deleteCard,
} from "./AppApiFunctions";

import { RegistrationInfoContext } from "../../contexts/RegistrationInfoContext";
import { CurrentUserContext } from "../../contexts/CurrentUserContext";
import { SavedMoviesCardsContext } from "../../contexts/SavedMoviesCardsContext";
import { MoviesCardsContext } from "../../contexts/MoviesCardsContext";

function App() {
  document.title = "MoviesExplorer";
  document.documentElement.lang = "ru";

  const history = useHistory();
  const location = useLocation();
  const pathName = location.pathname;

  const [registrationInfo, setRegistrationInfo] = useState({});
  const [currentUser, setCurrentUser] = useState({});

  const initialMoviesCardListStringify = localStorage.getItem(
    "initialMoviesCardList"
  );
  const movieCardListArr = JSON.parse(initialMoviesCardListStringify);
  const [movieCardList, setMovieCardList] = useState(movieCardListArr);
  const initialSavedMoviesCardListStringify = localStorage.getItem(
    "initialSavedMoviesCardList"
  );
  const savedMovieCardListArr = JSON.parse(initialSavedMoviesCardListStringify);
  const [savedMovieCardList, setSavedMovieCardList] = useState(savedMovieCardListArr);
  const [isReceivedMoviesCards, setReceivedMoviesCards] = useState(false);
  const [isReceivedSavedMoviesCards, setReceivedSavedMoviesCards] =
    useState(false);
  const loggedInBoolean = JSON.parse(localStorage.getItem("loggedIn"));
  const [loggedIn, setLoggedIn] = useState(loggedInBoolean);
  const [isPreloader, setPreloader] = useState(false);
  const [successStatusMessage, setSuccessStatusMessage] = useState("");
  const [RegOrLogSucsessStatus, setRegOrLogSucsessStatus] = useState(false);
  const [isInfoTooltipOpen, setInfoTooltipOpen] = useState(false);
  const [isNavigationMenuOpen, setNavigationMenuOpen] = useState(false);
  const [isMovieSearchButtonClick, setMovieSearchButtonClick] = useState(false);
  const [filterCheckboxState, setFilterCheckboxState] = useState(false);
  const [isCardDeleteButtonClick, setCardDeleteButtonClick] = useState(false);
  const [cardListLength, setCardListLength] = useState(0);
  const [filteredMoviesCardList, setFilteredMoviesCardList] = useState([]);
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);

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
      setLoggedIn,
      setSuccessStatusMessage,
      setRegOrLogSucsessStatus,
      setInfoTooltipOpen,
      history
    );
  }

  function handleGetUserInfo() {
    getUserInfo(
      setCurrentUser,
      setLoggedIn,
      setSuccessStatusMessage,
      setRegOrLogSucsessStatus,
      setInfoTooltipOpen
    );
  }

  function handleUpdateUserInfo(user) {
    setUserInfo(
      user,
      setPreloader,
      setCurrentUser,
      setSuccessStatusMessage,
      setRegOrLogSucsessStatus,
      setInfoTooltipOpen
    );
  }

  function handleLogout() {
    logOut(
      setLoggedIn,
      history,
      setCurrentUser,
      setMovieCardList,
      setSavedMovieCardList,
      setFilterCheckboxState,
      setSuccessStatusMessage,
      setRegOrLogSucsessStatus,
      setInfoTooltipOpen
    );
  }

  function handleGetMoviesCards() {
    getMoviesCards(
      setPreloader,
      setMovieCardList,
      setSavedMovieCardList,
      setReceivedMoviesCards,
      setReceivedSavedMoviesCards,
      setMovieSearchButtonClick,
      isMovieSearchButtonClick
    );
  }

  function handleGetSavedMoviesCards() {
    getSavedMoviesCards(setSavedMovieCardList, setReceivedSavedMoviesCards);
  }

  function handleSaveMovieCard(movieCard, evt) {
    saveMovieCard(
      movieCard,
      evt,
      setMovieCardList,
      setSavedMovieCardList,
      setReceivedSavedMoviesCards,
      setSuccessStatusMessage,
      setRegOrLogSucsessStatus,
      setInfoTooltipOpen
    );
  }

  function handleDeleteMovieCard(movieCard, evt) {
    deleteCard(
      movieCard,
      evt,
      savedMovieCardList,
      setSavedMovieCardList,
      setReceivedSavedMoviesCards,
      isCardDeleteButtonClick,
      setCardDeleteButtonClick,
      setSuccessStatusMessage,
      setRegOrLogSucsessStatus,
      setInfoTooltipOpen
    );
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
    const handleResize = (evt) => {
      setTimeout(() => {
        setWindowWidth(evt.target.innerWidth);
      }, 500);
    };
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  useEffect(() => {
    if (loggedIn) {
      getSavedMoviesCards();
    }
  }, [loggedIn]);

  useEffect(() => {
    if (pathName === "/") {
      if (loggedIn) {
        history.push("/movies");
      }
    }
  }, []);

  return (
    <>
      <CurrentUserContext.Provider value={currentUser}>
        <MoviesCardsContext.Provider value={movieCardList}>
          <SavedMoviesCardsContext.Provider value={savedMovieCardList}>
            <RegistrationInfoContext.Provider value={registrationInfo}>
              <Header
                loggedIn={loggedIn}
                isOpen={isNavigationMenuOpen}
                onMenuButtonClick={handleMenuButtonClick}
                onClose={closeAllPopups}
                onCloseByOverlay={setCloseByOverlayListener}
                onCloseByEsc={handleCloseByEsc}
                onLogOut={handleLogout}
              />
              <Switch>
                <Route exact path="/">
                  <Main />
                </Route>
                <ProtectedRoute
                  path="/movies"
                  loggedIn={loggedIn}
                  getMoviesCards={handleGetMoviesCards}
                  onSaveMovieCard={handleSaveMovieCard}
                  onDeleteMovieCard={handleDeleteMovieCard}
                  isMovieSearchButtonClick={isMovieSearchButtonClick}
                  filterCheckboxState={filterCheckboxState}
                  setFilterCheckboxState={setFilterCheckboxState}
                  cardListLength={cardListLength}
                  setCardListLength={setCardListLength}
                  filteredMoviesCardList={filteredMoviesCardList}
                  setFilteredMoviesCardList={setFilteredMoviesCardList}
                  isPreloader={isPreloader}
                  isReceivedMoviesCards={isReceivedMoviesCards}
                  isReceivedSavedMoviesCards={isReceivedSavedMoviesCards}
                  windowWidth={windowWidth}
                  component={Movies}
                />
                <ProtectedRoute
                  path="/saved-movies"
                  loggedIn={loggedIn}
                  getSavedMoviesCards={handleGetSavedMoviesCards}
                  onDeleteMovieCard={handleDeleteMovieCard}
                  isCardDeleteButtonClick={isCardDeleteButtonClick}
                  filterCheckboxState={filterCheckboxState}
                  setFilterCheckboxState={setFilterCheckboxState}
                  cardListLength={cardListLength}
                  setCardListLength={setCardListLength}
                  filteredMoviesCardList={filteredMoviesCardList}
                  setFilteredMoviesCardList={setFilteredMoviesCardList}
                  isPreloader={isPreloader}
                  isReceivedSavedMoviesCards={isReceivedSavedMoviesCards}
                  windowWidth={windowWidth}
                  component={SavedMovies}
                />
                <ProtectedRoute
                  path="/profile"
                  loggedIn={loggedIn}
                  getUserInfo={handleGetUserInfo}
                  updateUserInfo={handleUpdateUserInfo}
                  onLogout={handleLogout}
                  component={Profile}
                />
                <Route path="/signup">
                  <Register onRegister={handleRegister} />
                </Route>
                <Route path="/signin">
                  <Login onLogin={handleLogin} />
                </Route>
                <Route path="/404">
                  <Page404NotFound />
                </Route>
                <Route path="/">
                  <Redirect to="/404" />
                </Route>
                <Route exact path="/">
                  {loggedIn ? <Redirect to="/movies" /> : <Redirect to="/" />}
                </Route>
              </Switch>
              <InfoTooltip
                isOpen={isInfoTooltipOpen}
                successStatusMessage={successStatusMessage}
                isRegOrLogSucsess={RegOrLogSucsessStatus}
                onClose={closeAllPopups}
                onCloseByOverlay={setCloseByOverlayListener}
                onCloseByEsc={handleCloseByEsc}
              />
              <Footer />
            </RegistrationInfoContext.Provider>
          </SavedMoviesCardsContext.Provider>
        </MoviesCardsContext.Provider>
      </CurrentUserContext.Provider>
    </>
  );
}

export default App;
