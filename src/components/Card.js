class Card {
  constructor(template, item, {handleCardClick}) {
    this._template = template;
    this._name = item.name;
    this._link = item.link;
    this._element = this._getTemplate();
    this._image = this._element.querySelector('.places__image');
    this._handleCardClick = handleCardClick;
    this._likeButton = this._element.querySelector('.places__heart');
    this._cardName = this._element.querySelector('.places__title');
    this._bin = this._element.querySelector('.places__bin');
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
    this._likeButton
      .classList.toggle('places__heart_active');
  }
 
  _addEventListeners() {
    
      this._bin.addEventListener('click', () => {
        this._removeCard();
      });
    this._likeButton
      .addEventListener('click', () => {
        this._toggleLike();
      });
    this._image
      .addEventListener('click', () => {
        this._handleCardClick();
      });
  }

  createCard() {
    this._cardName.textContent = this._name;
    this._image.src = this._link;
    this._image.alt = this._name;
    this._addEventListeners();
    return this._element;
  }
}

export default Card;
