import { Popup } from "./Popup.js";

export class PopupWithConfirmation extends Popup {
  constructor(popupSelector, {deletion}) {
    super(popupSelector);
    this._form = this._popup.querySelector('.popup__content')
    this._buttonConfirm = this._popup.querySelector('.popup__submit-button')
    this._deletion = deletion
  }

  setData = (card) => {
    this._card = card
    this._buttonConfirm.disabled = '';
  }

  setEventListeners() {
    super.setEventListeners();
    this._form.addEventListener('submit', (event) => {
      event.preventDefault();
      this._deletion(this._card)
    })
  }
}