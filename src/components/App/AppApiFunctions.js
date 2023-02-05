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
  setPreloader,
  setCurrentUser,
  setSuccessStatusMessage,
  setRegOrLogSucsessStatus,
  setInfoTooltipOpen
) {
  setPreloader(true);

  mainApi
    .setUserInfo(user)
    .then((res) => {
      setCurrentUser(res);
    })
    .catch((err) => {
      setErrorMessage(
        "Данные пользователя не обновились! Попробуйте ещё раз.",
        err,
        setSuccessStatusMessage,
        setRegOrLogSucsessStatus,
        setInfoTooltipOpen
      );
    })
    .finally(() => {
      setPreloader(false);
    });
}

function logOut(
  setLoggedIn,
  history,
  setCurrentUser,
  setMovieCardList,
  setSavedMovieCardList,
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
  setSavedMovieCardList,
  setReceivedMoviesCards,
  setReceivedSavedMoviesCards,
  setMovieSearchButtonClick,
  isMovieSearchButtonClick
) {
  setPreloader(true);

  moviesApi
    .getMoviesCards()
    .then((res) => {
      getSavedMoviesCards(
        setSavedMovieCardList,
        setReceivedSavedMoviesCards
      );
      localStorage.setItem("initialMoviesCardList", JSON.stringify(res));
      setMovieCardList(res);
      setMovieSearchButtonClick(!isMovieSearchButtonClick);
      setReceivedMoviesCards(false);
    })
    .catch(() => {
      setReceivedMoviesCards(true);
    })
    .finally(() => {
      setPreloader(false);
    });
}

function getSavedMoviesCards(
  setSavedMovieCardList,
  setReceivedSavedMoviesCards
) {
  mainApi
    .getSavedMoviesCards()
    .then((res) => {
      localStorage.setItem("initialSavedMoviesCardList", JSON.stringify(res));
      setSavedMovieCardList(res);
      setReceivedSavedMoviesCards(false);
    })
    .catch(() => {
      setReceivedSavedMoviesCards(true);
    });
}

function saveMovieCard(
  movieCard,
  evt,
  setMovieCardList,
  setSavedMovieCardList,
  setSuccessStatusMessage,
  setRegOrLogSucsessStatus,
  setInfoTooltipOpen
) {
  console.log(movieCard);
  mainApi
    .saveMovieCard(movieCard)
    .then((newCard) => {
      console.log(newCard);
      setMovieCardList((state) =>
        state.map((c) => (c.movieId === movieCard.id ? newCard : c))
      );
      evt.target.classList.toggle("movies-card__button_save-button");
      evt.target.classList.toggle("movies-card__button_save-button_inactive");
    })
    .then(() => {
      getSavedMoviesCards(setSavedMovieCardList);
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
  savedMovieCardList,
  setSavedMovieCardList,
  isCardDeleteButtonClick,
  setCardDeleteButtonClick,
  setSuccessStatusMessage,
  setRegOrLogSucsessStatus,
  setInfoTooltipOpen
) {
  console.log(movieCard);
  console.log(savedMovieCardList);
  let deletedCard = {};
  if (movieCard._id) {
    deletedCard = movieCard;
  } else {
    deletedCard = savedMovieCardList.find((savedMovieCard) => {
      return movieCard.id === savedMovieCard.movieId;
    });
  }
  console.log(deletedCard);
  mainApi
    .deleteCard(deletedCard)
    .then(() => {
      evt.target.classList.toggle("movies-card__button_save-button");
      evt.target.classList.toggle("movies-card__button_save-button_inactive");
      setSavedMovieCardList((state) =>
        state.filter((c) => c._id !== deletedCard._id)
      );
      console.log("deleted");
      setCardDeleteButtonClick(!isCardDeleteButtonClick);
    })
    .then(() => {
      getSavedMoviesCards(setSavedMovieCardList);
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
