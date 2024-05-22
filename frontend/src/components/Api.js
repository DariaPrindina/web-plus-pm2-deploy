export class Api {
  constructor(options) {
    this._options = options;
    this._baseUrl = this._options.baseUrl;
    this._headers = this._options.headers;
  }

  // Статус ответа
  _responseStatus(res) {
    if (res.ok) {
      return res.json();
    }
    return Promise.reject(`Ошибка 1: ${res} ${res.status}`)
  }

  _request(url, options) {
    return fetch(url, options).then(this._responseStatus)
  }

  // Загрузка информации о пользователе с сервера
  getUserInfo() {
    return this._request(
      `${this._baseUrl}/users/me`,
      {headers: this._headers}
    )
  }

  // Загрузка карточек с сервера
  getInitialCards() {
    return this._request(
      `${this._baseUrl}/cards `,
      {headers: this._headers}
    )
  }
  
  // Редактирование профиля
  editProfile(data) {
    return this._request(`${this._baseUrl}/users/me`,
      {
        method: 'PATCH',
        headers: this._headers,
        body: JSON.stringify ({
          name: data.name,
          about: data.profession
        })
      })
  }

  // Добавление новой карточки
  addNewCard(data) {
    return this._request(`${this._baseUrl}/cards`,
      {
        method: 'POST',
        headers: this._headers,
        body: JSON.stringify ({
          name: data.title,
          link: data.link
        })
      })
  }

  // Удаление карточки
  deleteCard(cardId) {
    return this._request(`${this._baseUrl}/cards/${cardId}`,
      {
        method: 'DELETE',
        headers: this._headers
      })
  }

  // Постановка лайка
  putLike(cardId) {
    return this._request(`${this._baseUrl}/cards/${cardId}/likes`,
    {
      method: 'PUT',
      headers: this._headers
    })
  }

  // Снятие лайка
  deleteLike(cardId) {
    return this._request(`${this._baseUrl}/cards/${cardId}/likes`,
    {
      method: 'DELETE',
      headers: this._headers
    })
  }

  // Обновление аватара
  updAvatar(data) {
    return this._request(`${this._baseUrl}/users/me/avatar`,
    {
      method: 'PATCH',
      headers: this._headers,
      body: JSON.stringify ({
        avatar: data.avatar,
      })
    })
  }
}