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
import MoviesCardsFilter from "../MoviesCardsFilter/MoviesCardsFilter";

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

function App() {
  document.title = "MoviesExplorer";
  document.documentElement.lang = "ru";

  const history = useHistory();
  const location = useLocation();
  const pathName = location.pathname;

  const { filterCards, filterMoviesCards, setInitialCardListLength } =
    MoviesCardsFilter();

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
  const [savedMovieCardList, setSavedMovieCardList] = useState(
    savedMovieCardListArr
  );
  const [isMoviesCardsReceived, setMoviesCardsReceived] = useState(true);
  const [isSavedMoviesCardsReceived, setSavedMoviesCardsReceived] =
    useState(true);
  const loggedInBoolean = JSON.parse(localStorage.getItem("loggedIn"));
  const [loggedIn, setLoggedIn] = useState(loggedInBoolean);
  const [isPreloader, setPreloader] = useState(false);
  const [isLoading, setLoading] = useState(false);
  const [isRegOrAuthLoading, setRegOrAuthLoading] = useState(false);
  const [isUserInfoUpdating, setUserInfoUpdating] = useState(false);
  const [isMoviesSearchButtonClick, setMoviesSearchButtonClick] =
    useState(false);
  const [successStatusMessage, setSuccessStatusMessage] = useState("");
  const [RegOrLogSucsessStatus, setRegOrLogSucsessStatus] = useState(false);
  const [isInfoTooltipOpen, setInfoTooltipOpen] = useState(false);
  const [isNavigationMenuOpen, setNavigationMenuOpen] = useState(false);
  const filterCheckboxStateStringify = localStorage.getItem(
    "filterCheckboxState"
  );
  const [filterCheckboxState, setFilterCheckboxState] = useState(
    JSON.parse(filterCheckboxStateStringify)
  );
  const [savedMoviesFilterCheckboxState, setSavedMoviesFilterCheckboxState] =
    useState(false);
  const [isCardDeleteButtonClick, setCardDeleteButtonClick] = useState(false);
  const [cardListLength, setCardListLength] = useState(0);
  const [filteredMoviesCardList, setFilteredMoviesCardList] = useState([]);
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  const [movieName, setMovieName] = useState(
    localStorage.getItem("movieNameValue")
  );
  const [savedMovieName, setSavedMovieName] = useState("");
  const [isMovieName, setIsMovieName] = useState(true);
  const [cardList, setCardList] = useState([]);
  const [isErrorMessage, setErrorMessage] = useState(false);
  const isFirstRequestStringify = localStorage.getItem("isFirstRequest");
  const [isFirstRequest, setFirstRequest] = useState(
    JSON.parse(isFirstRequestStringify)
  );

  function closeAllPopups() {
    setInfoTooltipOpen(false);
    setNavigationMenuOpen(false);
  }

  function handleRegister() {
    register(
      registrationInfo,
      setRegOrAuthLoading,
      setRegistrationInfo,
      setSuccessStatusMessage,
      setRegOrLogSucsessStatus,
      setInfoTooltipOpen,
      history,
      handleLogin
    );
  }

  function handleLogin() {
    logIn(
      registrationInfo,
      setRegOrAuthLoading,
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
      setLoading,
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
      setUserInfoUpdating,
      setCurrentUser,
      setSuccessStatusMessage,
      setRegOrLogSucsessStatus,
      setInfoTooltipOpen
    );
  }

  function handleLogout() {
    logOut(
      setLoggedIn,
      setFirstRequest,
      history,
      setCurrentUser,
      setMovieCardList,
      setSavedMovieCardList,
      setMovieName,
      setFilterCheckboxState,
      setSuccessStatusMessage,
      setRegOrLogSucsessStatus,
      setInfoTooltipOpen
    );
  }

  function handleGetMoviesCards() {
    getMoviesCards(
      setFirstRequest,
      setPreloader,
      setMovieCardList,
      setMoviesCardsReceived
    );
  }

  function handleGetSavedMoviesCards() {
    getSavedMoviesCards(
      setLoading,
      setSavedMovieCardList,
      setSavedMoviesCardsReceived
    );
  }

  function handleSaveMovieCard(movieCard, evt) {
    saveMovieCard(
      movieCard,
      evt,
      savedMovieCardList,
      setSuccessStatusMessage,
      setRegOrLogSucsessStatus,
      setInfoTooltipOpen
    );
  }

  function handleDeleteMovieCard(movieCard, evt) {
    deleteCard(
      movieCard,
      evt,
      setSavedMovieCardList,
      savedMovieCardList,
      isCardDeleteButtonClick,
      setCardDeleteButtonClick,
      setSuccessStatusMessage,
      setRegOrLogSucsessStatus,
      setInfoTooltipOpen
    );
  }

  function handleMenuButtonClick(evt) {
    setNavigationMenuOpen(true);
  }

  function handleSetMovieCardList(movieNameInput, filterCheckbox) {
    setInitialCardListLength(windowWidth, setCardListLength);

    const filteredCardList = filterCards(
      movieCardList,
      movieNameInput,
      filterCheckbox
    );

    const filteredMoviesCardList = filterMoviesCards(
      filteredCardList,
      savedMovieCardList
    );

    setFilteredMoviesCardList(filteredMoviesCardList);
    setCardList(filteredMoviesCardList);
  }

  function handleSetSavedMovieCardList(movieNameInput, filterCheckbox) {
    const filteredCardList = filterCards(
      savedMovieCardList,
      movieNameInput,
      filterCheckbox
    );

    setFilteredMoviesCardList(filteredCardList);
    setCardList(filteredCardList);
  }

  function handleSearchMovieButtonClick() {
    if (pathName === "/movies") {
      if (isFirstRequest) {
        if (movieCardListArr.length > 0) {
          handleSetMovieCardList(movieName, filterCheckboxState);
        }
      } else {
        handleGetMoviesCards();
      }
    } else {
      handleSetSavedMovieCardList(
        savedMovieName,
        savedMoviesFilterCheckboxState
      );
    }
    setMoviesSearchButtonClick(!isMoviesSearchButtonClick);
  }

  function handleError() {
    if (isFirstRequest) {
      if (
        !isMovieName ||
        !isMoviesCardsReceived ||
        !isSavedMoviesCardsReceived ||
        cardList.length === 0
      ) {
        setErrorMessage(true);
      } else {
        setErrorMessage(false);
      }
    } else {
      setErrorMessage(false);
    }
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
    const isLoggedIn = JSON.parse(localStorage.getItem("loggedIn"));
    if (isLoggedIn) {
      handleGetUserInfo();
    }
  }, [loggedIn]);

  useEffect(() => {
    if (pathName === "/signin" || pathName === "/signout") {
      if (loggedIn) {
        history.push("/");
      }
    }
  }, []);

  return (
    <>
      <CurrentUserContext.Provider value={currentUser}>
        <RegistrationInfoContext.Provider value={registrationInfo}>
          <Header
            loggedIn={loggedIn}
            isOpen={isNavigationMenuOpen}
            onMenuButtonClick={handleMenuButtonClick}
            onClose={closeAllPopups}
            onCloseByOverlay={setCloseByOverlayListener}
            onCloseByEsc={handleCloseByEsc}
          />
          <Switch>
            <Route exact path="/">
              <Main />
            </Route>
            <ProtectedRoute
              path="/movies"
              loggedIn={loggedIn}
              onSaveMovieCard={handleSaveMovieCard}
              onDeleteMovieCard={handleDeleteMovieCard}
              onError={handleError}
              cardList={cardList}
              cardListLength={cardListLength}
              setCardListLength={setCardListLength}
              setInitialCardListLength={setInitialCardListLength}
              isMovieName={isMovieName}
              setIsMovieName={setIsMovieName}
              isPreloader={isPreloader}
              isLoading={isLoading}
              isMoviesCardsReceived={isMoviesCardsReceived}
              isSavedMoviesCardsReceived={isSavedMoviesCardsReceived}
              isErrorMessage={isErrorMessage}
              onSearchMovie={handleSearchMovieButtonClick}
              filterCheckboxState={filterCheckboxState}
              filterCheckboxStateStringify={filterCheckboxStateStringify}
              setFilterCheckboxState={setFilterCheckboxState}
              isMoviesSearchButtonClick={isMoviesSearchButtonClick}
              setMoviesSearchButtonClick={setMoviesSearchButtonClick}
              movieName={movieName}
              setMovieName={setMovieName}
              filteredMoviesCardList={filteredMoviesCardList}
              windowWidth={windowWidth}
              setWindowWidth={setWindowWidth}
              getSavedMoviesCards={handleGetSavedMoviesCards}
              setMoviesCardList={handleSetMovieCardList}
              isFirstRequest={isFirstRequest}
              component={Movies}
            />
            <ProtectedRoute
              path="/saved-movies"
              loggedIn={loggedIn}
              isLoading={isLoading}
              savedMovieCardList={savedMovieCardList}
              setSavedMoviesCardList={handleSetSavedMovieCardList}
              onDeleteMovieCard={handleDeleteMovieCard}
              onError={handleError}
              cardList={cardList}
              cardListLength={cardListLength}
              isMovieName={isMovieName}
              setIsMovieName={setIsMovieName}
              savedMovieName={savedMovieName}
              setSavedMovieName={setSavedMovieName}
              isPreloader={isPreloader}
              isSavedMoviesCardsReceived={isSavedMoviesCardsReceived}
              isErrorMessage={isErrorMessage}
              onSearchMovie={handleSearchMovieButtonClick}
              savedMoviesFilterCheckboxState={savedMoviesFilterCheckboxState}
              setSavedMoviesFilterCheckboxState={
                setSavedMoviesFilterCheckboxState
              }
              isMoviesSearchButtonClick={isMoviesSearchButtonClick}
              setMoviesSearchButtonClick={setMoviesSearchButtonClick}
              getSavedMoviesCards={handleGetSavedMoviesCards}
              isCardDeleteButtonClick={isCardDeleteButtonClick}
              component={SavedMovies}
            />
            <ProtectedRoute
              path="/profile"
              loggedIn={loggedIn}
              isLoading={isLoading}
              getUserInfo={handleGetUserInfo}
              updateUserInfo={handleUpdateUserInfo}
              onLogout={handleLogout}
              isUserInfoUpdating={isUserInfoUpdating}
              component={Profile}
            />
            <Route path="/signup">
              <Register
                onRegister={handleRegister}
                isRegOrAuthLoading={isRegOrAuthLoading}
              />
            </Route>
            <Route path="/signin">
              <Login
                onLogin={handleLogin}
                isRegOrAuthLoading={isRegOrAuthLoading}
              />
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
      </CurrentUserContext.Provider>
    </>
  );
}

export default App;
