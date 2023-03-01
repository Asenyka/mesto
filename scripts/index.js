import Card from './Card.js';
import initialCards from './initial-cards.js';
import FormValidator from './FormValidator.js';
import { openPopup, closePopup } from './utils.js';

const buttonOpenEditProfilePopup = document.querySelector(
  '.profile__edit-button'
);
const popupEditProfile = document.querySelector('.popup_edit-profile');
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
const cardsContainer = document.querySelector('.places__list');
const popups = document.querySelectorAll('.popup');
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

function submitEditProfileForm(evt) {
  evt.preventDefault();
  profileName.textContent = nameInput.value;
  profileJob.textContent = jobInput.value;
  closePopup(popupEditProfile);
  formEditProfile.reset();
}

function addCard(card) {
  cardsContainer.prepend(card);
}
function createCard(template, item) {
  const card = new Card(template, item);
  const newCard = card.createCard();
  return newCard;
}
function renderCards(cards) {
  cards.forEach((item) => {
    const newCard = createCard('.places__template', item);
    addCard(newCard);
  });
}

function submitCard(evt) {
  evt.preventDefault();
  const item = {
    name: titleInput.value,
    link: linkInput.value,
  };
  const newCard = createCard('.places__template', item);
  addCard(newCard);
  formElementCreate.reset();
  closePopup(popupAddCard);
}

popups.forEach((popup) => {
  //Видимо, возникло недопонимание: здесь не идет речь отдельно о попапе с изображением, popupCloseButtonImg - это изображение крестика, размещенное на кнопке закрытия любого из попапов.
  // Если удалить evt.target === popupCloseButtonImg попап (любой) перестанет закрываться при нажатии на крестик.

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

renderCards(initialCards);

buttonOpenEditProfilePopup.addEventListener('click', () => {
  openPopup(popupEditProfile);
  showPofileInfo();
});

buttonOpenAddCardPopup.addEventListener('click', () => {
  formElementCreate.reset();
  openPopup(popupAddCard);
});

formEditProfile.addEventListener('submit', submitEditProfileForm);

formElementCreate.addEventListener('submit', submitCard);

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
