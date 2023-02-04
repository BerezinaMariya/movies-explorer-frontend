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
} from "./AppReqFunctions";

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
  const [savedMovieCardList, setSavedMovieCardList] = useState([]);
  const [movieCardList, setMovieCardList] = useState([]);
  const [loggedIn, setLoggedIn] = useState(localStorage.getItem("loggedIn"));
  const [isPreloader, setPreloader] = useState(false);
  const [isInfoTooltipOpen, setInfoTooltipOpen] = useState(false);
  const [isNavigationMenuOpen, setNavigationMenuOpen] = useState(false);
  const [successStatusMessage, setSuccessStatusMessage] = useState("");
  const [RegOrLogSucsessStatus, setRegOrLogSucsessStatus] = useState(false);
  const [SearchFilmButtonClick, setSearchFilmButtonClick] = useState(false);
  const [isMovieCardSaved, setMovieCardSaved] = useState(false);
  const [filterCheckboxState, setFilterCheckboxState] = useState(false);
  const [cardListLength, setCardListLength] = useState(0);
  const [filteredMoviesCardList, setFilteredMoviesCardList] = useState([]);

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
      setFilterCheckboxState
    );
  }

  function handleGetMoviesCards() {
    getMoviesCards(setPreloader, setMovieCardList);
    setSearchFilmButtonClick(!SearchFilmButtonClick);
  }

  function handleGetSavedMoviesCards() {
    getSavedMoviesCards(
      setSavedMovieCardList,
      setPreloader
    );
  }

  function handleSaveMovieCard(movieCard) {
    saveMovieCard(movieCard, setMovieCardSaved, setPreloader);
  }

  async function handleDeleteMovieCard(movieCard) {
    let card;
    await getSavedMoviesCards(
      setSavedMovieCardList,
      setPreloader
    );
    if (pathName === "/movies") {
      card = savedMovieCardList.filter((c) => c.movieId === movieCard.id);
    } else {
      card = movieCard;
    }

    //  deleteCard(card, setMovieCardSaved, setPreloader);
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
    if (loggedIn) {
      getUserInfo(
        setCurrentUser,
        setLoggedIn,
        setSuccessStatusMessage,
        setRegOrLogSucsessStatus,
        setInfoTooltipOpen
      );
      handleGetSavedMoviesCards();
    }
  }, [loggedIn]);

  useEffect(() => {
    if (localStorage.getItem("loggedIn") === "true") {
      getUserInfo(
        setCurrentUser,
        setLoggedIn,
        setSuccessStatusMessage,
        setRegOrLogSucsessStatus,
        setInfoTooltipOpen
      );
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
                  SearchFilmButtonClick={SearchFilmButtonClick}
                  onSaveMovieCard={handleSaveMovieCard}
                  onDeleteMovieCard={handleDeleteMovieCard}
                  isMovieCardSaved={isMovieCardSaved}
                  filterCheckboxState={filterCheckboxState}
                  setFilterCheckboxState={setFilterCheckboxState}
                  cardListLength={cardListLength}
                  setCardListLength={setCardListLength}
                  filteredMoviesCardList={filteredMoviesCardList}
                  setFilteredMoviesCardList={setFilteredMoviesCardList}
                  isPreloader={isPreloader}
                  component={Movies}
                />
                <ProtectedRoute
                  path="/saved-movies"
                  loggedIn={loggedIn}
                  filterCheckboxState={filterCheckboxState}
                  setFilterCheckboxState={setFilterCheckboxState}
                  cardListLength={cardListLength}
                  setCardListLength={setCardListLength}
                  filteredMoviesCardList={filteredMoviesCardList}
                  setFilteredMoviesCardList={setFilteredMoviesCardList}
                  isPreloader={isPreloader}
                  component={SavedMovies}
                />
                <ProtectedRoute
                  path="/profile"
                  loggedIn={loggedIn}
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
                {/* <Route path="/movies">
                {loggedIn ? (
                  <Redirect to="/movies" />
                ) : (
                  <Redirect to="/signin" />
                )}
              </Route> */}
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
