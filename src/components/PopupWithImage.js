import Popup from './Popup.js';
export default class PopupWithImage extends Popup {
  constructor(popupSelector) {
    super(popupSelector);
    this._popupPicture = document.querySelector('.popup__picture');
    this._popupCaption = document.querySelector('.popup__caption');
  }
  
  open(cardLink, cardName) {
    super.open();
    this._popupPicture.src = cardLink;
    this._popupPicture.alt = `${cardName} - изображение в оригинальном размере`;
    this._popupCaption.textContent = cardName;
  }
}
