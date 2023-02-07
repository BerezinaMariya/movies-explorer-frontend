class MainApi {
  constructor() {
    this.baseUrl = "https://api.movies-explorer.berez.nomoredomains.club";
    // this.baseUrl = "http://localhost:3001";
    this.cardsImagesBaseUrl = "https://api.nomoreparties.co";
  }

  //Проверка ответа от сервера
  _checkResponse(res) {
    if (res.ok) {
      return res.json();
    }
    // если ошибка, отклоняем промис
    return Promise.reject(res);
  }


  // Регистрация
  register(name, email, password) {
    return fetch(`${this.baseUrl}/signup`, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ name, email, password }),
    }).then(this._checkResponse);
  }

  //Авторизация
  logIn(email, password) {
    return fetch(`${this.baseUrl}/signin`, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      credentials: "include",
      body: JSON.stringify({ email, password }),
    }).then(this._checkResponse);
  }

  //Получение данных пользователя
  getUserInfo() {
    return fetch(`${this.baseUrl}/users/me`, {
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      credentials: "include",
    }).then(this._checkResponse);
  }

  //Отправка отредактированных данных пользователя
  setUserInfo(user) {
    return fetch(`${this.baseUrl}/users/me`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: user.name,
        email: user.email,
      }),
      credentials: "include",
    }).then(this._checkResponse);
  }

  //Выход с сайта
  logOut() {
    return fetch(`${this.baseUrl}/signout`, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      credentials: "include",
    }).then(this._checkResponse);
  }

    //Получение массива сохраненных карточек
  getSavedMoviesCards() {
    return fetch(`${this.baseUrl}/movies`, {
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
    }).then(this._checkResponse);
  }

  //Отправка сохраненной карточки на сервер
  saveMovieCard(card) {
    return fetch(`${this.baseUrl}/movies`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        country: card.country,
        director: card.director,
        duration: card.duration,
        year: card.year,
        description: card.description,
        image: `${this.cardsImagesBaseUrl}${card.image.url}`,
        trailerLink: card.trailerLink,
        thumbnail: `${this.cardsImagesBaseUrl}${card.image.formats.thumbnail.url}`,
        movieId:card.id,
        nameRU: card.nameRU,
        nameEN: card.nameEN,
      }),
      credentials: "include",
    }).then(this._checkResponse);
  }

    //Удаление карточки из сохраненных карточек и с сервера 
  deleteCard(card) {
    return fetch(`${this.baseUrl}/movies/${card._id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
    }).then(this._checkResponse);
  }

}

export const mainApi = new MainApi();
