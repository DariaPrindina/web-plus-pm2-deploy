export class UserInfo {
  constructor({name, profession, avatar}) {
    this._name = name;
    this._profession = profession;
    this._avatar = avatar;
  }

  // метод возвращает объект с данными пользователя
  getUserInfo() {
    const userInfo = {
      name: this._name.textContent,
      profession: this._profession.textContent,
      avatar: this._avatar.src
    }
    return userInfo;
  }

  // принимает новые данные пользователя,
  // добавляет их на страницу
  setUserInfo({ name, about, avatar, _id }) {
    this._name.textContent = name;
    this._profession.textContent = about;
    this._avatar.src = avatar;
    this._id = _id;
  }
}