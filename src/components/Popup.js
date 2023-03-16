export default class Popup {
  constructor(popupSelector) {
    this._popup = document.querySelector(popupSelector);
    this._closeButton = this._popup.querySelector('.popup__close-button-img');
    this._event = document.onkeydown;
  }

  _setEventListeners() {
    this._popup.addEventListener('mousedown', (evt) => {
      if (
        evt.target.classList.contains('popup_opened') ||
        evt.target === this._closeButton
      ) {
        this.close();
      }
    });
  }
  close() {
    this._popup.classList.remove('popup_opened');
    document.removeEventListener('keydown', this._handleEscClose.bind(this));
  }
  _handleEscClose(evt) {
    if (evt.key === 'Escape') {
      this.close();
    }
  }
  open() {
    this._popup.classList.add('popup_opened');
    document.addEventListener('keydown', this._handleEscClose.bind(this));
    this._setEventListeners();
  }
}
