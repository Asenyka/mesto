export default class Card {
  constructor(template, item, {handleCardClick}, {handleBinClick}, {sendLike}, {deleteLike}) {
    this._template = template;
    this._name = item.name;
    this._link = item.link;
    this._cardID = item._id;
    this._likeNumber = item.likes.length;
    this._element = this._getTemplate();
    this._image = this._element.querySelector('.places__image');
    this._handleCardClick = handleCardClick;
    this._handleBinClick = handleBinClick;
    this._sendLike = sendLike;
    this._deleteLike = deleteLike;
    this._likeButton = this._element.querySelector('.places__heart');
    this._likeCounter = this._element.querySelector('.places__like-counter');
    this._cardName = this._element.querySelector('.places__title');
    this._bin = this._element.querySelector('.places__bin');
  }

  _getTemplate() {
    return document
      .querySelector(this._template)
      .content.querySelector('.places__item')
      .cloneNode(true);
  }
 

  _handleLike() {
    if (!this._likeButton.classList.contains('places__heart_active')) {
      this._sendLike(this._cardID);
      this._likeButton.classList.add('places__heart_active');
    }
    else 
    {
      this._deleteLike(this._cardID);
      this._likeButton.classList.remove('places__heart_active') ;
    }}
  
 
  _addEventListeners() {
    
    this._bin.addEventListener('click', () => {
        this._handleBinClick();
      });
    this._likeButton
      .addEventListener('click', () => {
        this._handleLike();
      });
        
    this._image
      .addEventListener('click', () => {
        this._handleCardClick();
      });
    }
    deleteCard(){
      this._element.remove();
    }
  createCard() {
    this._cardName.textContent = this._name;
    this._image.src = this._link;
    this._image.alt = this._name;
    this._likeCounter.textContent = this._likeNumber;
    this._addEventListeners();
    return this._element;
  }

}
