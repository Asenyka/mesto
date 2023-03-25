export default class Api {
  constructor({ token, basePath }) {
    this._token = token;
    this._basePath = basePath;
  }

  _getHeaders() {
    return {
      "Content-Type": "application/json",
      authorization: this._token,
    };
  }
  _getJson(res) {
    if (res.ok) {
      return res.json();
    }
    return Promise.reject(`Ошибка: ${res.status}`);
  }

  getInitialCards() {
    return fetch(`${this._basePath}/cards`, {
      headers: this._getHeaders(),
    }).then(this._getJson);
  }

  getUserInfo() {
    return fetch(`${this._basePath}/users/me`, {
      headers: this._getHeaders(),
    }).then(this._getJson);
  }

  sendUserInfo(userData) {
    return fetch(`${this._basePath}/users/me`, {
      method: "PATCH",
      headers: this._getHeaders(),
      body: JSON.stringify(userData),
    }).then(this._getJson);
  }
  sendCard(cardData) {
    return fetch(`${this._basePath}/cards`, {
      method: "POST",
      headers: this._getHeaders(),
      body: JSON.stringify(cardData),
    }).then(this._getJson);
  }
  deleteCard(id) {
    return fetch(`${this._basePath}/cards/${id}`, {
      method: "DELETE",
      headers: this._getHeaders(),
    }).then(this._getJson);
  }
  sendLike(cardID) {
    return fetch(`${this._basePath}/cards/${cardID}/likes`, {
      method: "PUT",
      headers: this._getHeaders(),
    }).then(this._getJson);
  }
  deleteLike(cardID) {
    return fetch(`${this._basePath}/cards/${cardID}/likes`, {
      method: "DELETE",
      headers: this._getHeaders(),
    }).then(this._getJson);
  }
  sendAvatar(avatar) {
    return fetch(`${this._basePath}/users/me/avatar`, {
      method: "PATCH",
      headers: this._getHeaders(),
      body: JSON.stringify({
        avatar: avatar,
      }),
    }).then(this._getJson);
  }
}
