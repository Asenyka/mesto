import { openPopup } from './utils.js';
//эти переменные используются в коде только один раз и нужны только для передачи данных в попап с изображением
const popupPicture = document.querySelector('.popup__picture');
const popupCaption = document.querySelector('.popup__caption');
const popupImage = document.querySelector('.popup_image');

class Card {
  constructor(template, item) {
    this._template = template;
    this._name = item.name;
    this._link = item.link;
    this._element = this._getTemplate();
    this._image = this._element.querySelector('.places__image');
  }
  _getTemplate() {
    return document
      .querySelector(this._template)
      .content.querySelector('.places__item')
      .cloneNode(true);
  }
  _removeCard() {
    this._element.remove();
  }
  _toggleLike() {
    this._element
      .querySelector('.places__heart')
      .classList.toggle('places__heart_active');
  }
  _openPopupImage() {
    openPopup(popupImage);
    popupPicture.src = this._link;
    popupPicture.alt = `${this._name} - изображение в оригинальном размере`;
    popupCaption.textContent = this._name;
  }
  _addEventListeners() {
    this._element
      .querySelector('.places__bin')
      .addEventListener('click', () => {
        this._removeCard();
      });
    this._element
      .querySelector('.places__heart')
      .addEventListener('click', () => {
        this._toggleLike();
      });
    this._element
      .querySelector('.places__image')
      .addEventListener('click', () => {
        this._openPopupImage();
      });
  }

  createCard() {
    this._element.querySelector('.places__title').textContent = this._name;
    this._image.src = this._link;
    this._image.alt = this._name;
    this._addEventListeners();
    return this._element;
  }
}

export default Card;
