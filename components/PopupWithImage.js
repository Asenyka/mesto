import Popup from './Popup.js';
export default class PopupWithImage extends Popup {
  constructor(popupSelector, cardLink, cardName) {
    super(popupSelector);
    this._link = cardLink;
    this._name = cardName;
  }
  open() {
    super.open();
    const popupPicture = document.querySelector('.popup__picture');
    const popupCaption = document.querySelector('.popup__caption');
    popupPicture.src = this._link;
    popupPicture.alt = `${this._name} - изображение в оригинальном размере`;
    popupCaption.textContent = this._name;
  }
}
