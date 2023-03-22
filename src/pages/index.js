import Card from '../components/Card.js';
//import {initialCards} from '../utils/constants.js';
import FormValidator from '../components/FormValidator.js';
import PopupToConfirm from '../components/PopupToConfirm.js';
import PopupWithForm from '../components/PopupWithForm.js';
import PopupWithImage from '../components/PopupWithImage.js';
import Section from '../components/Section.js';
import UserInfo from '../components/UserInfo.js';
import {validationSettings} from '../utils/constants.js';
import Api from '../utils/Api.js';
import './index.css';

const api = new Api({
  token: '932dd1d7-dbf3-4149-befd-e973c13cb750',
  basePath:'https://mesto.nomoreparties.co/v1/cohort-61'});
const buttonOpenEditProfilePopup = document.querySelector(
  '.profile__edit-button'
);
const avatar = document.querySelector('.profile__pic');
const profileName = document.querySelector('.profile__name');
const profileJob = document.querySelector('.profile__job');
const formEditProfile = document.querySelector('.popup__form_edit');
const formElementCreate = document.querySelector('.popup__form_create');
const formAvatarUpdate = document.querySelector('.popup__form_update');
const buttonOpenAddCardPopup = document.querySelector('.profile__add-button');
const userInfo = new UserInfo(profileName, profileJob, avatar);
const popupToConfirmDeletion = new PopupToConfirm('.popup_confirm-deletion', {handleRequest: () => {
  console.log('Send yes to the Server');
}});
const popupWithImage = new PopupWithImage('.popup_image');
const popupToEditProfile = new PopupWithForm('.popup_edit-profile', {
  submitForm: (userData) => {
  api
  .sendUserInfo(userData)
 .then((userData) => {
  userInfo.setUserInfo(userData);;
})
.catch((err)=>{
  console.log(err);
});
    popupToEditProfile.close();
  },
});
const popupToUpdateAvatar = new PopupWithForm('.popup_udate-avatar',{
  submitForm: () => {
    console.log('Send new avatar to the server')
  }
})
const cardList = new Section(
  {
    renderer: (item) => {
      const card = createCard('.places__template', item);
      cardList.addItem(card);
    },
  },
  '.places__list'
);
const popupToAddCard = new PopupWithForm('.popup_add-card', {
  submitForm: (cardData) => {
    api
  .sendCard(cardData)
 .then((cardData) => {
  cardList.renderer([cardData]);;
})
.catch((err)=>{
  console.log(err);
});
    popupToAddCard.close();
  },
});

popupWithImage.setEventListeners();
popupToEditProfile.setEventListeners();
popupToAddCard.setEventListeners();
popupToConfirmDeletion.setEventListeners();
popupToUpdateAvatar.setEventListeners();



function createCard(template, item) {
  const card = new Card(template, item, {
    handleCardClick: () => {
      popupWithImage.open(
        card._link,
        card._name
      );
  },
  },
  {handleBinClick: () =>{
    popupToConfirmDeletion.open()
}
});
  const newCard = card.createCard();
  return newCard;
}

/*
  document.querySelectorAll('.places__bin').forEach((bin)=>{
    bin.remove();
})*/

function renderInitialCards(){
  api
 .getInitialCards()
 .then((res) => {
  cardList.renderer(res);
})
.catch((err)=>{
  console.log(err);
});
}
renderInitialCards();

function loadUserInfo(){
  api
  .getUserInfo()
  .then((res) =>{
    userInfo.setUserInfo(res);
    })
    .catch((err)=>{
      console.log(err);
    });
}
loadUserInfo()

buttonOpenEditProfilePopup.addEventListener('click', () => {
  const currentUserInfo = userInfo.getUserInfo();
  popupToEditProfile.setInputValues(currentUserInfo);
  popupToEditProfile.open();
});
avatar.addEventListener('click', () =>{
popupToUpdateAvatar.open();
});
buttonOpenAddCardPopup.addEventListener('click', () => {
  popupToAddCard.open();
});

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

const updateFormValidator = new FormValidator(
  validationSettings,
  formAvatarUpdate  
);
updateFormValidator.enableValidation();