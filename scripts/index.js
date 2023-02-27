import Card from "./card.js";
import initialCards from "./initial-cards.js";

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

function closeByEscape(evt) {
  if (evt.key === 'Escape') {
    const openedPopup = document.querySelector('.popup_opened');
    closePopup(openedPopup);
  }
}

function closePopup(popup) {
  popup.classList.remove('popup_opened');
  document.removeEventListener('keydown', closeByEscape);
}

function openPopup(popup) {
  popup.classList.add('popup_opened');
  document.addEventListener('keydown', closeByEscape);
}

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

function renderCards(cards) {
  cards.forEach((item) => {
    const card = new Card('.places__template', item);
    const newCard = card.createCard();
    addCard(newCard);
  });
}

function submitCard(evt) {
  evt.preventDefault();
  const item = {
    name: titleInput.value,
    link: linkInput.value,
  };
  const card = new Card ('.places__template', item);
  const newCard = card.createCard();
  addCard(newCard);
  formElementCreate.reset();
  closePopup(popupAddCard);
}

popups.forEach((popup) => {
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
  openPopup(popupAddCard);
});

formEditProfile.addEventListener('submit', submitEditProfileForm);

formElementCreate.addEventListener('submit', submitCard);

export default openPopup
