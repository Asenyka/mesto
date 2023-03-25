export default class Card {
  constructor(
    userID,
    template,
    item,
    { handleCardClick },
    { handleBinClick },
    { sendLike },
    { deleteLike }
  ) {
    this._userId = userID;
    this._likes = item.likes;
    this._template = template;
    this._name = item.name;
    this._link = item.link;
    this._cardId = item._id;
    this._cardOwner = item.owner._id;
    this._likeNumber = item.likes.length;
    this._element = this._getTemplate();
    this._image = this._element.querySelector(".places__image");
    this._handleCardClick = handleCardClick;
    this._handleBinClick = handleBinClick;
    this._sendLike = sendLike;
    this._deleteLike = deleteLike;
    this._likeButton = this._element.querySelector(".places__heart");
    this._likeCounter = this._element.querySelector(".places__like-counter");
    this._cardName = this._element.querySelector(".places__title");
    this._bin = this._element.querySelector(".places__bin");
  }

  _getTemplate() {
    return document
      .querySelector(this._template)
      .content.querySelector(".places__item")
      .cloneNode(true);
  }
  _removeBin() {
    if (this._cardOwner !== this._userId) {
      this._bin.remove();
    }
  }
  handleLike(likes) {
    if (!this._likeButton.classList.contains("places__heart_active")) {
      this._sendLike(this._cardId);
    } else {
      this._deleteLike(this._cardId);
    }
  }
  showLikes(likes) {
    this._likeCounter.textContent = likes.length;
    this._likeButton.classList.toggle("places__heart_active");
  }
  _markIfLiked() {
    this._likes.forEach((like) => {
      if (like._id === this._userId) {
        this._likeButton.classList.add("places__heart_active");
      }
    });
  }
  _addEventListeners() {
    this._bin.addEventListener("click", () => {
      this._handleBinClick();
    });
    this._likeButton.addEventListener("click", () => {
      this.handleLike();
    });

    this._image.addEventListener("click", () => {
      this._handleCardClick();
    });
  }
  deleteCard() {
    this._element.remove();
  }
  createCard() {
    this._cardName.textContent = this._name;
    this._image.src = this._link;
    this._image.alt = this._name;
    this._likeCounter.textContent = this._likeNumber;
    this._addEventListeners();
    this._removeBin();
    this._markIfLiked();
    return this._element;
  }
}
