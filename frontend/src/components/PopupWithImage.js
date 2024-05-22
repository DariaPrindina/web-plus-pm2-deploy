import { Popup } from "./Popup.js";

export class PopupWithImage extends Popup {
  constructor(popupSelector) {
    super(popupSelector);
    this._popupImagePicture = this._popup.querySelector('.popup__picture');
    this._popupImageCaption = this._popup.querySelector('.popup__caption');
  }

  open(name, link) {
    this._popupImagePicture.src = link;
    this._popupImageCaption.textContent = name;
    this._popupImagePicture.alt = name;
    super.open();
  }
}