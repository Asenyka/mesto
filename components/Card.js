/*import { openPopup } from '../utils/utils.js';*/
import PopupWithImage from "./Popup.js";

class Card {
  constructor(template, item, {handleCardClick}) {
    this._template = template;
    this._name = item.name;
    this._link = item.link;
    this._element = this._getTemplate();
    this._image = this._element.querySelector('.places__image');
    this._handleCardClick = handleCardClick;
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
      .addEventListener('click', () => {
        this._handleCardClick();
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
