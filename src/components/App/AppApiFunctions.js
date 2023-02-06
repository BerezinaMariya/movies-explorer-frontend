import { mainApi } from "../../utils/MainApi";
import { moviesApi } from "../../utils/MoviesApi";

function setErrorMessage(
  errorMessage,
  err,
  setSuccessStatusMessage,
  setRegOrLogSucsessStatus,
  setInfoTooltipOpen
) {
  if (err.body) {
    err
      .json()
      .then((body) =>
        setSuccessStatusMessage(body.message ? body.message : errorMessage)
      );
  } else {
    setSuccessStatusMessage(errorMessage);
  }
  setRegOrLogSucsessStatus(false);
  setInfoTooltipOpen(true);
}

function register(
  registrationInfo,
  setRegistrationInfo,
  setSuccessStatusMessage,
  setRegOrLogSucsessStatus,
  setInfoTooltipOpen,
  history,
  handleLogin
) {
  mainApi
    .register(
      registrationInfo.name,
      registrationInfo.email,
      registrationInfo.password
    )
    .then(() => {
      setSuccessStatusMessage("Вы успешно зарегистрировались!");
      setRegOrLogSucsessStatus(true);
      setInfoTooltipOpen(true);
      setRegistrationInfo({});
      handleLogin();
    })
    .then(() => history.push("/movies"))
    .catch((err) => {
      setErrorMessage(
        "Регистрация не выполнена! Попробуйте ещё раз.",
        err,
        setSuccessStatusMessage,
        setRegOrLogSucsessStatus,
        setInfoTooltipOpen
      );
    });
}

function logIn(
  registrationInfo,
  setCurrentUser,
  setLoggedIn,
  setSuccessStatusMessage,
  setRegOrLogSucsessStatus,
  setInfoTooltipOpen,
  history
) {
  mainApi
    .logIn(registrationInfo.email, registrationInfo.password)
    .then((res) => {
      setLoggedIn(true);
      history.push("/movies");
      setCurrentUser(res);
      localStorage.setItem("loggedIn", true);
      localStorage.setItem("currentUser", res);
    })
    .catch((err) => {
      setErrorMessage(
        "Вход на сайт не выполнен! Попробуйте ещё раз.",
        err,
        setSuccessStatusMessage,
        setRegOrLogSucsessStatus,
        setInfoTooltipOpen
      );
    });
}

function getUserInfo(
  setCurrentUser,
  setLoggedIn,
  setSuccessStatusMessage,
  setRegOrLogSucsessStatus,
  setInfoTooltipOpen
) {
  mainApi
    .getUserInfo()
    .then((res) => {
      setLoggedIn(true);
      setCurrentUser(res);
    })
    .catch((err) => {
      setLoggedIn(false);
      setErrorMessage(
        "Необходима авторизация!",
        err,
        setSuccessStatusMessage,
        setRegOrLogSucsessStatus,
        setInfoTooltipOpen
      );
    });
}

function setUserInfo(
  user,
  setCurrentUser,
  setSuccessStatusMessage,
  setRegOrLogSucsessStatus,
  setInfoTooltipOpen
) {
  mainApi
    .setUserInfo(user)
    .then((res) => {
      setCurrentUser(res);
      setSuccessStatusMessage("Данные успешно обновились!");
      setRegOrLogSucsessStatus(true);
      setInfoTooltipOpen(true);
    })
    .catch((err) => {
      setErrorMessage(
        "Данные не обновились! Попробуйте ещё раз.",
        err,
        setSuccessStatusMessage,
        setRegOrLogSucsessStatus,
        setInfoTooltipOpen
      );
    });
}

function logOut(
  setLoggedIn,
  history,
  setCurrentUser,
  setMovieCardList,
  setSavedMovieCardList,
  setMovieName,
  setFilterCheckboxState,
  setSuccessStatusMessage,
  setRegOrLogSucsessStatus,
  setInfoTooltipOpen
) {
  mainApi
    .logOut()
    .then(() => {
      setLoggedIn(false);
      history.push("/");
      setCurrentUser({});
      setMovieCardList([]);
      setSavedMovieCardList([]);
      setMovieName("");
      setFilterCheckboxState(false);
      localStorage.setItem("loggedIn", false);
      localStorage.setItem("initialMoviesCardList", JSON.stringify([]));
      localStorage.setItem("initialSavedMoviesCardList", JSON.stringify([]));
      localStorage.setItem("сardList", JSON.stringify([]));
      localStorage.setItem("movieNameValue", "");
      localStorage.setItem("filterCheckboxState", false);
    })
    .catch((err) => {
      setErrorMessage(
        "Выход с сайта не выполнен!",
        err,
        setSuccessStatusMessage,
        setRegOrLogSucsessStatus,
        setInfoTooltipOpen
      );
    });
}

function getMoviesCards(
  setPreloader,
  setMovieCardList,
  setMoviesCardsReceived
) {
  setPreloader(true);

  moviesApi
    .getMoviesCards()
    .then((res) => {
      console.log("moviesAPI");
      localStorage.setItem("initialMoviesCardList", JSON.stringify(res));
      setMovieCardList(res);
      setMoviesCardsReceived(true);
    })
    .catch(() => {
      setMoviesCardsReceived(false);
    })
    .finally(() => {
      setPreloader(false);
    });
}

function getSavedMoviesCards(
  setSavedMovieCardList,
  setSavedMoviesCardsReceived
) {
  mainApi
    .getSavedMoviesCards()
    .then((res) => {
      localStorage.setItem("initialSavedMoviesCardList", JSON.stringify(res));
      setSavedMovieCardList(res);
      setSavedMoviesCardsReceived(true);
    })
    .catch(() => {
      setSavedMoviesCardsReceived(false);
    });
}

function saveMovieCard(
  movieCard,
  evt,
  savedMovieCardList,
  setSuccessStatusMessage,
  setRegOrLogSucsessStatus,
  setInfoTooltipOpen
) {
  mainApi
    .saveMovieCard(movieCard)
    .then((newCard) => {
      console.log(newCard);
      savedMovieCardList.push(newCard);
      evt.target.classList.toggle("movies-card__button_save-button");
      evt.target.classList.toggle("movies-card__button_save-button_inactive");
    })
    .then(() => {
      console.log(savedMovieCardList);
    })
    .catch((err) => {
      setErrorMessage(
        "Фильм не сохранился!",
        err,
        setSuccessStatusMessage,
        setRegOrLogSucsessStatus,
        setInfoTooltipOpen
      );
    });
}


function deleteCard(
  movieCard,
  evt,
  handleDeleteCardFromCardList,
  savedMovieCardList,
  isCardDeleteButtonClick,
  setCardDeleteButtonClick,
  setSuccessStatusMessage,
  setRegOrLogSucsessStatus,
  setInfoTooltipOpen
) {
  console.log("delete");
  console.log(movieCard);
  console.log(savedMovieCardList);

  let deletedCard = {};
  movieCard._id
    ? deletedCard = movieCard
    : deletedCard = savedMovieCardList.find((savedMovieCard) => {
        return movieCard.id === savedMovieCard.movieId;
      });

  console.log(deletedCard);
  mainApi
    .deleteCard(deletedCard)
    .then(() => {
      handleDeleteCardFromCardList(deletedCard);
      evt.target.classList.toggle("movies-card__button_save-button");
      evt.target.classList.toggle("movies-card__button_save-button_inactive");
      setCardDeleteButtonClick(!isCardDeleteButtonClick);
    })
    .then(() => {
      console.log(savedMovieCardList);
    })
    .catch((err) => {
      setErrorMessage(
        "Фильм не удалён!",
        err,
        setSuccessStatusMessage,
        setRegOrLogSucsessStatus,
        setInfoTooltipOpen
      );
    });
}

export {
  register,
  logIn,
  getUserInfo,
  setUserInfo,
  logOut,
  getMoviesCards,
  getSavedMoviesCards,
  saveMovieCard,
  deleteCard,
};
