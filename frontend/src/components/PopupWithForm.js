import { Popup } from "./Popup.js";

export class PopupWithForm extends Popup {
  constructor(popupSelector, {formSubmit}) {
    super(popupSelector);
    this._formSubmit = formSubmit;
    this._form = this._popup.querySelector('.popup__content');
    this._inputs = Array.from(this._form.querySelectorAll('.popup__input'));
    this._button = this._popup.querySelector('.popup__submit-button');
    this._btnTxt = this._button.textContent;
  }

  _getInputValues() {
    this._inputsValues = {};
    this._inputs.forEach((input) => {
      this._inputsValues[input.name] = input.value;
    })
    return this._inputsValues;
  }

  setInputValues(data) {
    this._inputs.forEach((input) => {
      input.value = data[input.name];
    })
  }

  loading(isLoading) {
    if(isLoading) {
      this._button.textContent = 'Сохранение...'
    } else {
      this._button.textContent = this._btnTxt
    }
  }

  setEventListeners() {
    super.setEventListeners();
    this._form.addEventListener('submit', (event) => {
      event.preventDefault();
      this._formSubmit(this._getInputValues())
    })
  }

  close() {
    super.close();
    this._form.reset();
  }
}