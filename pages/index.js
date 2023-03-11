import Card from '../components/Card.js';
import initialCards from '../components/initial-cards.js';
import FormValidator from '../utils/FormValidator.js';
import {PopupWithForm} from '../components/Popup.js';
import {PopupWithImage} from '../components/Popup.js';
import Section from '../components/Section.js';

const buttonOpenEditProfilePopup = document.querySelector(
  '.profile__edit-button'
);
/*const popupEditProfile = document.querySelector('.popup_edit-profile');*/
const popupAddCard = document.querySelector('.popup_add-card');
const nameInput = document.querySelector('.popup__input_box_name');
const jobInput = document.querySelector('.popup__input_box_job');
const titleInput = document.querySelector('.popup__input_box_title');
const linkInput = document.querySelector('.popup__input_box_link');
const profileName = document.querySelector('.profile__name');
const profileJob = document.querySelector('.profile__job');
const formEditProfile = document.querySelector('.popup__form_edit');
const formElementCreate = document.querySelector('.popup__form_create');
const buttonOpenAddCardPopup = document.querySelector('.profile__add-button');
/*const cardsContainer = document.querySelector('.places__list');
const popups = document.querySelectorAll('.popup');*/
const validationSettings = {
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__button',
  inactiveButtonClass: 'button_inactive',
  inputErrorClass: 'popup__input_type_error',
  errorClass: '.popup__error',
};

function showPofileInfo() {
  nameInput.value = profileName.innerHTML;
  jobInput.value = profileJob.innerHTML;
}

/*function submitEditProfileForm(evt) {
  evt.preventDefault();
  profileName.textContent = nameInput.value;
  profileJob.textContent = jobInput.value;
  const popupToClose = new Popup('.popup_edit-profile');
  popupToClose.close();
  formEditProfile.reset();
}*/

/*function addCard(card) {
  cardsContainer.prepend(card);
}*/

function createCard(template, item) {
  const card = new Card(template, item, 
    {handleCardClick:()=>{
        const popupWithImage = new PopupWithImage('.popup_image', card._link, card._name);
        popupWithImage.open();
    }
    }
    );
  const newCard = card.createCard();
  return newCard;
}
 

/*function renderCards(cards) {
  cards.forEach((item) => {
    const newCard = createCard('.places__template', item);
    addCard(newCard);
  });
}*/

const cardList = new Section ({
  items: initialCards,
  renderer: (item) => {
const card = createCard('.places__template', item);
cardList.addItem(card);
  }
},
'.places__list');

cardList.renderer();

/*function submitCard(evt) {
  evt.preventDefault();
  const data = [{
    name: titleInput.value,
    link: linkInput.value,
  }];
  const newCard = new Section ({
   items: data, 
   renderer: (item) => {
    const card = createCard('.places__template', item);
  newCard.addItem(card);}}, '.places__list');
  newCard.renderer();
  formElementCreate.reset();
  const popupToClose = new Popup('.popup_add-card');
  popupToClose.close();
}
*/

/*popups.forEach((popup) => {
  const popupCloseButtonImg = popup.querySelector('.popup__close-button-img');
  popup.addEventListener('mousedown', (evt) => {
    if (
      evt.target.classList.contains('popup_opened') ||
      evt.target === popupCloseButtonImg
    ) {
      closePopup(popup);
    }
  });
});

renderCards(initialCards);*/

buttonOpenEditProfilePopup.addEventListener('click', () => {
  const popupToEditProfile = new PopupWithForm('.popup_edit-profile', {
    submitForm: () =>{
      profileName.textContent = nameInput.value;
      profileJob.textContent = jobInput.value;
      popupToEditProfile.close();
    }
  });
  popupToEditProfile.open();
  showPofileInfo();
});

buttonOpenAddCardPopup.addEventListener('click', () => {
  /*formElementCreate.reset();*/
  const popupToAddCard = new PopupWithForm('.popup_add-card', {
    submitForm: (data) =>{
       const newCard = new Section ({
       items: data, 
       renderer: (item) => {
        const card = createCard('.places__template', item);
      newCard.addItem(card);}}, '.places__list');
      newCard.renderer();
      popupToAddCard.close();
    }
    });
  popupToAddCard.open();
});

/*formEditProfile.addEventListener('submit', submitEditProfileForm);*/

/*formElementCreate.addEventListener('submit', submitCard);*/

const editProfileFormValidator = new FormValidator(
  validationSettings,
  formEditProfile
);
editProfileFormValidator.enableValidation();

const createFormValidator = new FormValidator(
  validationSettings,
  formElementCreate
);
createFormValidator.enableValidation();
