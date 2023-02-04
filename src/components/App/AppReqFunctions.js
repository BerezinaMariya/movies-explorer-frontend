import { mainApi } from "../../utils/MainApi";
import { moviesApi } from "../../utils/MoviesApi";
import ResponseConsts from "../../utils/ResponseConsts";

const { GET_MOVIES_CARD_LIST_ERROR } = ResponseConsts();

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
                : "Регистрация не выполнена! Попробуйте ещё раз."
            )
          );
      } else {
        setSuccessStatusMessage(
          "Регистрация не выполнена! Попробуйте ещё раз."
        );
      }
      setRegOrLogSucsessStatus(false);
      setInfoTooltipOpen(true);
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
      if (err.body) {
        err
          .json()
          .then((body) =>
            setSuccessStatusMessage(
              body.message
                ? body.message
                : "Вход на сайт не выполнен! Попробуйте ещё раз."
            )
          );
      } else {
        setSuccessStatusMessage(
          "Вход на сайт не выполнен! Попробуйте ещё раз."
        );
      }
      setRegOrLogSucsessStatus(false);
      setInfoTooltipOpen(true);
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
      if (err.body) {
        err
          .json()
          .then((body) =>
            setSuccessStatusMessage(
              body.message
                ? body.message
                : "Данные пользователя не загружены! Попробуйте ещё раз."
            )
          );
      } else {
        setSuccessStatusMessage(
          "Данные пользователя не загружены! Попробуйте ещё раз."
        );
      }
      setRegOrLogSucsessStatus(false);
      setInfoTooltipOpen(true);
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
      if (err.body) {
        err
          .json()
          .then((body) =>
            setSuccessStatusMessage(
              body.message
                ? body.message
                : "Данные пользователя не обновились! Попробуйте ещё раз."
            )
          );
      } else {
        setSuccessStatusMessage(
          "Данные пользователя не обновились! Попробуйте ещё раз."
        );
      }
      setRegOrLogSucsessStatus(false);
      setInfoTooltipOpen(true);
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
  setFilterCheckboxState
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
      localStorage.setItem("сardList", JSON.stringify([]));
      localStorage.setItem("movieNameValue", "");
      localStorage.setItem("filterCheckboxState", false);
    })
    .catch((err) => {
      alert(`${err} Что-то пошло не так! Выход с сайта не выполнен.`);
    });
}

function getMoviesCards(
  setPreloader,
  setMovieCardList,
  GET_MOVIES_CARD_LIST_ERROR
) {
  setPreloader(true);

  moviesApi
    .getMoviesCards()
    .then((res) => {
      localStorage.setItem("initialMoviesCardList", JSON.stringify(res));
      setMovieCardList(res);
    })
    .catch((err) => {
      alert(`${err} ${GET_MOVIES_CARD_LIST_ERROR}`);
    })
    .finally(() => {
      setPreloader(false);
    });
}

function getSavedMoviesCards(
  setSavedMovieCardList,
  setPreloader,
  GET_MOVIES_CARD_LIST_ERROR
) {
  setPreloader(true);

  mainApi
    .getSavedMoviesCards()
    .then((res) => {
      setSavedMovieCardList(res);
    })
    .catch((err) => {
      alert(`${err} ${GET_MOVIES_CARD_LIST_ERROR}`);
    })
    .finally(() => {
      setPreloader(false);
    });
}

function saveMovieCard(movieCard, setMovieCardSaved, setPreloader) {
  // setPreloader(true);

  mainApi
    .saveMovieCard(movieCard)
    .then(() => {
      setMovieCardSaved(true);
    })
    .catch((err) => {
      alert(`${err} Что-то пошло не так! Карточка не сохранена.`);
    })
    .finally(() => {
      // setPreloader(false);
    });
}

function deleteCard(movieCard, setMovieCardSaved, setPreloader) {
  // setPreloader(true);

  mainApi
    .deleteCard(movieCard)
    .then(() => {
      setMovieCardSaved(false);
    })
    .catch((err) => {
      alert(`${err} Карточка не удалилась`);
    })
    .finally(() => {
      // setPreloader(false);
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
