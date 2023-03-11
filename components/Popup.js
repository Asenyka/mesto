export default class Popup {
    constructor(popupSelector){
     this._popup = document.querySelector(popupSelector);
     this._closeButton = this._popup.querySelector('.popup__close-button-img');
     this._event = document.onkeydown;
    }
   
    _setEventListeners(){
        this._popup.addEventListener('mousedown', (evt) => {
            if (
              evt.target.classList.contains('popup_opened') ||
              evt.target === this._closeButton
            ) {
              this.close();
            }
          });
    }
    open () {
        this._popup.classList.add('popup_opened');
        /*document.addEventListener('keydown', this._handleEscClose());*/
        this._setEventListeners();       
      }
      
    close() {
        this._popup.classList.remove('popup_opened');
        /*document.removeEventListener('keydown', this._handleEscClose());*/
      }
    
      
}

class PopupWithImage extends Popup{
  constructor(popupSelector, cardLink, cardName){
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

  class PopupWithForm extends Popup{
    constructor(popupSelector, {submitForm}){
      super(popupSelector);
      this._submitForm = submitForm;
      this._form = this._popup.querySelector('.popup__form');
      this._inputsList = this._form.querySelectorAll('.popup__input');
      this._submitButton = this._form.querySelector('.popup__button');
    }
    _getInputValues(){
      const data = {};
      this._inputsList.forEach((input) =>{
        data[input.name] = input.value;
      });
      return data;
    }

   _setEventListeners(){
    super._setEventListeners();
    this._form.addEventListener('submit', (evt) =>{
      evt.preventDefault();
      this._submitForm([this._getInputValues()]);
    });

   }
   close(){
    super.close();
    this._form.reset();
   }
    
}

  export {PopupWithImage}
  export {PopupWithForm}