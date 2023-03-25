import Popup from "./Popup.js";
export default class PopupToConfirm extends Popup {
  constructor(popupSelector, { handleRequest }) {
    super(popupSelector);
    this._button = this._popup.querySelector(".popup__button");
    this._handleRequest = handleRequest;
  }
  setEventListeners() {
    super.setEventListeners();
    this._button.addEventListener("click", () => {
      this._handleRequest(this._cardID, this._card);
    });
  }
  open(card) {
    super.open();
    this._cardID = card._cardId;
    this._card = card;
  }
}
