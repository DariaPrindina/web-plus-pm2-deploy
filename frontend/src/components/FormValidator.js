export class FormValidator {
  constructor(config, form) {
    this._config = config;
    this._form = form;
  }

  enableValidation() {
    this._inputList = Array.from(this._form.querySelectorAll(this._config.inputSelector));
    this._button = this._form.querySelector(this._config.submitButtonSelector);
    
    this._inputList.forEach((input) => {
      input.addEventListener('input', () => {
        this._isValid(input);
        this._toggleButton(this._inputList, this._button);
      });
    })
  }

  _isValid = (input) => {
    if (input.validity.valid) {
      this._hideInputError(input);
    } else {
      this._showInputError(input);
    }
  }

  _showInputError = (input) => {
    const error = this._form.querySelector(`#${input.id}-error`)
    input.classList.add(this._config.inputErrorClass);
    error.textContent = input.validationMessage;
  }

  _hideInputError = (input) => {
    const error = this._form.querySelector(`#${input.id}-error`)
    error.textContent = '';
    input.classList.remove(this._config.inputErrorClass);
  }

  resetValidation() {
    this._toggleButton();
    this._inputList.forEach((input) => {
      this._hideInputError(input)
    });
  }

  _toggleButton = () => {
    if (this._inputList.some(input => !input.validity.valid) === true) {
      this._button.classList.add(this._config.inactiveButtonClass);
      this._button.disabled = true;
    } else {
      this._button.classList.remove(this._config.inactiveButtonClass);
      this._button.disabled = false;
    }
  }
}