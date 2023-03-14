import Card from '../components/Card.js';
import initialCards from '../components/initial-cards.js';
import FormValidator from '../components/FormValidator.js';
import PopupWithForm from '../components/PopupWithForm.js';
import PopupWithImage from '../components/PopupWithImage.js';
import Section from '../components/Section.js';
import UserInfo from '../components/UserInfo.js';

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
const validationSettings = {
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__button',
  inactiveButtonClass: 'button_inactive',
  inputErrorClass: 'popup__input_type_error',
  errorClass: '.popup__error',
};
const userInfo = new UserInfo(profileName, profileJob);

function createCard(template, item) {
  const card = new Card(template, item, {
    handleCardClick: () => {
      const popupWithImage = new PopupWithImage(
        '.popup_image',
        card._link,
        card._name
      );
      popupWithImage.open();
    },
  });
  const newCard = card.createCard();
  return newCard;
}
const cardList = new Section(
  {
    items: initialCards,
    renderer: (item) => {
      const card = createCard('.places__template', item);
      cardList.addItem(card);
    },
  },
  '.places__list'
);

cardList.renderer();

buttonOpenEditProfilePopup.addEventListener('click', () => {
  const popupToEditProfile = new PopupWithForm('.popup_edit-profile', {
    submitForm: (data) => {
      userInfo.setUserInfo(data);
      popupToEditProfile.close();
    },
  });
  const currentUserInfo = userInfo.getUserInfo();
  userNameField.value = currentUserInfo.name;
  userJobField.value = currentUserInfo.job;
  popupToEditProfile.open();
});

buttonOpenAddCardPopup.addEventListener('click', () => {
  const popupToAddCard = new PopupWithForm('.popup_add-card', {
    submitForm: (data) => {
      const newCard = new Section(
        {
          items: [data],
          renderer: (item) => {
            const card = createCard('.places__template', item);
            newCard.addItem(card);
          },
        },
        '.places__list'
      );
      newCard.renderer();
      popupToAddCard.close();
    },
  });
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
