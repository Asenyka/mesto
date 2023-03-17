import Card from '../components/Card.js';
import {initialCards} from '../utils/constants.js';
import FormValidator from '../components/FormValidator.js';
import PopupWithForm from '../components/PopupWithForm.js';
import PopupWithImage from '../components/PopupWithImage.js';
import Section from '../components/Section.js';
import UserInfo from '../components/UserInfo.js';
import {validationSettings} from '../utils/constants.js'
import './index.css';
const buttonOpenEditProfilePopup = document.querySelector(
  '.profile__edit-button'
);
const userNameField = document.querySelector('.popup__input_box_name');
const userJobField = document.querySelector('.popup__input_box_job');
const profileName = document.querySelector('.profile__name');
const profileJob = document.querySelector('.profile__job');
const formEditProfile = document.querySelector('.popup__form_edit');
const formElementCreate = document.querySelector('.popup__form_create');
const buttonOpenAddCardPopup = document.querySelector('.profile__add-button');

const userInfo = new UserInfo(profileName, profileJob);
const popupWithImage = new PopupWithImage('.popup_image');
const popupToEditProfile = new PopupWithForm('.popup_edit-profile', {
  submitForm: (data) => {
    userInfo.setUserInfo(data);
    popupToEditProfile.close();
  },
});
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
  submitForm: (data) => {
    cardList.renderer([data]);
    popupToAddCard.close();
  },
});
popupWithImage.setEventListeners();
popupToEditProfile.setEventListeners();
popupToAddCard.setEventListeners();

function createCard(template, item) {
  const card = new Card(template, item, {
    handleCardClick: () => {
      popupWithImage.open(
        card._link,
        card._name
      );
  },
  });
  const newCard = card.createCard();
  return newCard;
}
cardList.renderer(initialCards);
buttonOpenEditProfilePopup.addEventListener('click', () => {
  const currentUserInfo = userInfo.getUserInfo();
  popupToEditProfile.setInputValues(currentUserInfo);
  popupToEditProfile.open();
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
