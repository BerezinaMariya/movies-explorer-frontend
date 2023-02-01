class MainApi {
  constructor() {
  //   this.baseUrl = "api.movies-explorer.berez.nomoredomains.club";
     this.baseUrl = "http://localhost:3001";
  }

  //Проверка ответа от сервера
  _checkResponse(res) {
    if (res.ok) {
      return res.json();
    }
    // если ошибка, отклоняем промис
    return Promise.reject(res);
  }

  //Регистрация
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

    //Проверка токена, получение email
    getUserInfo() {
      return fetch(`${this.baseUrl}/users/me`, {
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        credentials: "include",
      }).then(this._checkResponse);
    }

    //Выход с сайта
    logOut() {
      return fetch(`${this.baseUrl}/users/signout`, {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        credentials: "include",
      }).then(this._checkResponse);
    }

  // //Получение массива исходных карточек
  // getInitialCards() {
  //   return fetch(`${this.baseUrl}/cards`, {
  //     headers: {
  //       "Content-Type": "application/json",
  //     },
  //     credentials: "include",
  //   }).then(this._checkResponse);
  // }

  //Получение данных пользователя
  // getUserInfo() {
  //   return fetch(`${this.baseUrl}/users/me`, {
  //     headers: {
  //       "Content-Type": "application/json",
  //     },
  //     credentials: "include",
  //   }).then(this._checkResponse);
  // }

  // //Отправка отредактированных данных пользователя
  // setUserInfo(user) {
  //   return fetch(`${this.baseUrl}/users/me`, {
  //     method: "PATCH",
  //     headers: {
  //       "Content-Type": "application/json",
  //     },
  //     body: JSON.stringify({
  //       name: user.name,
  //       about: user.about,
  //     }),
  //     credentials: "include",
  //   }).then(this._checkResponse);
  // }

  // //Отправка отредактированного аватара
  // setAvatar(avatar) {
  //   return fetch(`${this.baseUrl}/users/me/avatar`, {
  //     method: "PATCH",
  //     headers: {
  //       "Content-Type": "application/json",
  //     },
  //     body: JSON.stringify({
  //       avatar: avatar,
  //     }),
  //     credentials: "include",
  //   }).then(this._checkResponse);
  // }

  // //Отправка новой созданной карточки на сервер
  // setNewCard(card) {
  //   return fetch(`${this.baseUrl}/cards`, {
  //     method: "POST",
  //     headers: {
  //       "Content-Type": "application/json",
  //     },
  //     body: JSON.stringify({
  //       name: card.name,
  //       link: card.link,
  //     }),
  //     credentials: "include",
  //   }).then(this._checkResponse);
  // }

  // //Удаление карточки с сервера
  // deleteCard(cardId) {
  //   return fetch(`${this.baseUrl}/cards/${cardId}`, {
  //     method: "DELETE",
  //     headers: {
  //       "Content-Type": "application/json",
  //     },
  //     credentials: "include",
  //   }).then(this._checkResponse);
  // }

  // //Установка и снятие лайка
  // changeLikeCardStatus(cardId, notLiked) {
  //   if (notLiked) {
  //     return fetch(`${this.baseUrl}/cards/${cardId}/likes`, {
  //       method: "PUT",
  //       headers: {
  //         "Content-Type": "application/json",
  //       },
  //       credentials: "include",
  //     }).then(this._checkResponse);
  //   } else {
  //     return fetch(`${this.baseUrl}/cards/${cardId}/likes`, {
  //       method: "DELETE",
  //       headers: {
  //         "Content-Type": "application/json",
  //       },
  //       credentials: "include",
  //     }).then(this._checkResponse);
  //   }
  // }
}

export const mainApi = new MainApi();
