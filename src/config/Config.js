// Для AppApiFunctions
const REG_SUCCESS_MESSAGE = "Вы успешно зарегистрировались!";
const REG_UNSUCCESS_MESSAGE = "Регистрация не выполнена! Попробуйте ещё раз";
const LOGIN_UNSUCCESS_MESSAGE = "Вход на сайт не выполнен! Попробуйте ещё раз";
const LOGOUT_UNSUCCESS_MESSAGE =
  "Выход с сайта не выполнен! Попробуйте ещё раз";
const AUTH_UNSUCCESS_MESSAGE = "Необходима авторизация!";
const USER_INFO_UPDATE_SUCCESS_MESSAGE = "Данные успешно обновились!";
const USER_INFO_UPDATE_UNSUCCESS_MESSAGE =
  "Данные не обновились! Попробуйте ещё раз";
const MOVIE_SAVE_UNSUCCESS_MESSAGE = "Фильм не сохранился! Попробуйте ещё раз";
const MOVIE_DELETE_UNSUCCESS_MESSAGE = "Фильм не удалён! Попробуйте ещё раз";

// Для ErrorMovieMessage
const NOTHING_FOUND = "Ничего не найдено";
const KEY_WORD_REQUIRED = "Нужно ввести ключевое слово";
const SERVER_ERROR =
  "Во время запроса произошла ошибка. Возможно, проблема с соединением или сервер недоступен. Подождите немного и попробуйте ещё раз";

// Для MoviesCardsFilter
const SHORT_FILMS_DURATION = 40;
const CARDS_QUANTITY_WW_1280 = 12;
const CARDS_QUANTITY_WW_768_1279 = 8;
const CARDS_QUANTITY_WW_320_767 = 5;
const CARDS_ADD_QUANTITY_WW_1280 = 3;
const CARDS_ADD_QUANTITY_WW_320_1279 = 2;

// Для MainApi
const MAIN_BASE_URL = "https://api.movies-explorer.ru";
const CARDS_IMAGE_BASE_URL = "https://api.nomoreparties.co";

// Для MoviesApi
const MOVIES_BASE_URL = "https://api.nomoreparties.co/beatfilm-movies";

export {
  REG_SUCCESS_MESSAGE,
  REG_UNSUCCESS_MESSAGE,
  LOGIN_UNSUCCESS_MESSAGE,
  LOGOUT_UNSUCCESS_MESSAGE,
  AUTH_UNSUCCESS_MESSAGE,
  USER_INFO_UPDATE_SUCCESS_MESSAGE,
  USER_INFO_UPDATE_UNSUCCESS_MESSAGE,
  MOVIE_SAVE_UNSUCCESS_MESSAGE,
  MOVIE_DELETE_UNSUCCESS_MESSAGE,
  NOTHING_FOUND,
  KEY_WORD_REQUIRED,
  SERVER_ERROR,
  SHORT_FILMS_DURATION,
  CARDS_QUANTITY_WW_1280,
  CARDS_QUANTITY_WW_768_1279,
  CARDS_QUANTITY_WW_320_767,
  CARDS_ADD_QUANTITY_WW_1280,
  CARDS_ADD_QUANTITY_WW_320_1279,
  MAIN_BASE_URL,
  CARDS_IMAGE_BASE_URL,
  MOVIES_BASE_URL,
};
