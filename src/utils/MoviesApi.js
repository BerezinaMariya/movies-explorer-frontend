import {
  MOVIES_BASE_URL
} from "../config/Config";

class MoviesApi {
  constructor() {
    this.baseUrl = MOVIES_BASE_URL;
  }

  //Проверка ответа от сервера
  _checkResponse(res) {
    if (res.ok) {
      return res.json();
    }
    // если ошибка, отклоняем промис
    return Promise.reject(res);
  }

  //Получение массива исходных карточек
  getMoviesCards() {
    return fetch(`${this.baseUrl}/`, {
      headers: {
        "Content-Type": "application/json",
      },
    }).then(this._checkResponse);
  }

}
export const moviesApi = new MoviesApi();
