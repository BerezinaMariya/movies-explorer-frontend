class MoviesApi {
  constructor() {
    this.baseUrl = "https://api.nomoreparties.co/beatfilm-movies";
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
