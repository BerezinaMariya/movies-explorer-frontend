import { useState, useEffect } from "react";
import { Route, Switch, Redirect, useHistory } from "react-router-dom";

import Main from "../Main/Main";
import Movies from "../Movies/Movies";
import SavedMovies from "../SavedMovies/SavedMovies";
import Profile from "../Profile/Profile";
import Register from "../Register/Register";
import Login from "../Login/Login";
import Page404NotFound from "../Page404NotFound/Page404NotFound";
import InfoTooltip from "../InfoTooltip/InfoTooltip";

import { RegistrationInfoContext } from "../../contexts/RegistrationInfoContext";
import { CurrentUserContext } from "../../contexts/CurrentUserContext";
import { MoviesCardsContext } from "../../contexts/MoviesCardsContext";
import { SavedMoviesCardsContext } from "../../contexts/SavedMoviesCardsContext";

import CurrentUser from "../../utils/CurrentUser";
import MoviesCards from "../../utils/MoviesCards";
import SavedMoviesCards from "../../utils/SavedMoviesCards";

function App() {
  const history = useHistory();

  const [registrationData, setRegistrationData] = useState({});
  const [currentUser, setCurrentUser] = useState({});
  const [moviesCards, setMoviesCards] = useState([]);
  const [savedMoviesCards, setSavedMoviesCards] = useState({});
  const [isInfoTooltipOpen, setInfoTooltipOpen] = useState(false);
  const [successStatusMessage, setSuccessStatusMessage] = useState("");
  const [RegOrLogSucsessStatus, setRegOrLogSucsessStatus] = useState(false);

  function closeInfoTooltip() {
    setInfoTooltipOpen(false);
  }

  function handleRegister() {
    setInfoTooltipOpen(true);
    setRegOrLogSucsessStatus(true);
    setSuccessStatusMessage("Вы успешно зарегистрировались!");
    history.push("/signin");
  }

  function handleLogin() {
    history.push("/movies");
  }

  //Закрытие InfoTooltip по клику по overlay
  function setCloseByOverlayListener(infoTooltip) {
    infoTooltip.addEventListener("mousedown", (evt) => {
      const targetClasses = evt.target.classList;
      if (targetClasses.contains("info-tooltip_opened")) {
        closeInfoTooltip();
      }
    });
  }

  //Закрытие InfoTooltip при нажатии на Esc
  function handleCloseByEsc(evt) {
    if (evt.key === "Escape") {
      closeInfoTooltip();
    }
  }

  useEffect(() => {
    document.title = "MoviesExplorer";
    setCurrentUser(CurrentUser);
    setMoviesCards(MoviesCards);
    setSavedMoviesCards(SavedMoviesCards);
  }, []);

  return (
    <>
      <CurrentUserContext.Provider value={currentUser}>
        <MoviesCardsContext.Provider value={moviesCards}>
          <SavedMoviesCardsContext.Provider value={savedMoviesCards}>
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
              <RegistrationInfoContext.Provider value={registrationData}>
                <Route path="/signup">
                  <Register
                    onRegister={handleRegister}
                  />
                </Route>
              <Route path="/signin">
                <Login
                  onLogin={handleLogin}
                />
              </Route>
              </RegistrationInfoContext.Provider>
              <Route path="/404">
                <Page404NotFound />
              </Route>
              {/* <Route path="/">
                {loggedIn ? <Redirect to="/" /> : <Redirect to="/signin" />}
              </Route> */}
            </Switch>
          </SavedMoviesCardsContext.Provider>
        </MoviesCardsContext.Provider>
      </CurrentUserContext.Provider>
      <InfoTooltip
        isOpen={isInfoTooltipOpen}
        successStatusMessage={successStatusMessage}
        isRegOrLogSucsess={RegOrLogSucsessStatus}
        onClose={closeInfoTooltip}
        onCloseByOverlay={setCloseByOverlayListener}
        onCloseByEsc={handleCloseByEsc}
      />
    </>
  );
}

export default App;
