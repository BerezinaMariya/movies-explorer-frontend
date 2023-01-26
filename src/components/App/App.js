import { useState, useEffect } from "react";
import { Route, Switch, Redirect, useHistory } from "react-router-dom";

import Main from "../Main/Main";
import Movies from "../Movies/Movies";
import SavedMovies from "../SavedMovies/SavedMovies";
import Profile from "../Profile/Profile";
import Register from "../Register/Register";
import Login from "../Login/Login";
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
  const [isPopupOpen, setPopupOpen] = useState(false);
  const [successStatusMessage, setSuccessStatusMessage] = useState("");
  const [RegOrLogSucsessStatus, setRegOrLogSucsessStatus] = useState(false);

  function closePopup() {
    setPopupOpen(false);
  }

  function handleRegister() {
    setPopupOpen(true);
    setRegOrLogSucsessStatus(true);
    setSuccessStatusMessage("Вы успешно зарегистрировались!");
    history.push("/signin");
  }

  function handleLogin() {
    history.push("/movies");
  }

  //Закрытие popup по клику по overlay
  function setCloseByOverlayListener(popup) {
    popup.addEventListener("mousedown", (evt) => {
      const targetClasses = evt.target.classList;
      if (targetClasses.contains("popup_opened")) {
        closePopup();
      }
    });
  }

  //Закрытие popup при нажатии на Esc
  function handleCloseByEsc(evt) {
    if (evt.key === "Escape") {
      closePopup();
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
            <RegistrationInfoContext.Provider value={registrationData}>
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
                {/* <Route path="/">
                {loggedIn ? <Redirect to="/" /> : <Redirect to="/signin" />}
              </Route> */}
              </Switch>
            </RegistrationInfoContext.Provider>
          </SavedMoviesCardsContext.Provider>
        </MoviesCardsContext.Provider>
      </CurrentUserContext.Provider>
      <InfoTooltip
        isOpen={isPopupOpen}
        successStatusMessage={successStatusMessage}
        isRegOrLogSucsess={RegOrLogSucsessStatus}
        onClose={closePopup}
        onCloseByOverlay={setCloseByOverlayListener}
        onCloseByEsc={handleCloseByEsc}
      />
    </>
  );
}

export default App;
