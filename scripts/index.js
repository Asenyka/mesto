const buttonOpenEditProfilePopup = document.querySelector(
  '.profile__edit-button'
);
const popupEditProfile = document.querySelector('.popup_edit-profile');
const popupAddCard = document.querySelector('.popup_add-card');
const popupImage = document.querySelector('.popup_image');
const nameInput = document.querySelector('.popup__input_box_name');
const jobInput = document.querySelector('.popup__input_box_job');
const titleInput = document.querySelector('.popup__input_box_title');
const linkInput = document.querySelector('.popup__input_box_link');
const profileName = document.querySelector('.profile__name');
const profileJob = document.querySelector('.profile__job');
const formEditProfile = document.querySelector('.popup__form_edit');
const formElementCreate = document.querySelector('.popup__form_create');
const containerEditProfile = document.querySelector(
  '.popup__container_edit-profile'
);
const containerAddCard = document.querySelector('.popup__container_add-card');
const containerImage = document.querySelector('.popup__picture-container');
const buttonOpenAddCardPopup = document.querySelector('.profile__add-button');
const cardsContainer = document.querySelector('.places__list');
const popupPicture = document.querySelector('.popup__picture');
const popupCaption = document.querySelector('.popup__caption');
const popups = document.querySelectorAll('.popup');

const cardTemplate = document
  .querySelector('.places__template')
  .content.querySelector('.places__item');
const initialCards = [
  {
    name: 'Бермамыт',
    link: './images/bermamyt.jpg',
  },
  {
    name: 'Дивногорск',
    link: './images/divnogorsk.jpg',
  },
  {
    name: 'Эльтон',
    link: './images/elton.jpg',
  },
  {
    name: 'Хибины',
    link: './images/khibiny.jpg',
  },
  {
    name: 'Рускеала',
    link: './images/ruskeala.jpg',
  },
  {
    name: 'Усьвинские столбы',
    link: './images/usyvinskie-stolby.jpg',
  },
];

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

function createCard(newCard) {
  const card = cardTemplate.cloneNode(true);
  const cardText = card.querySelector('.places__title');
  const cardImg = card.querySelector('.places__image');
  cardText.textContent = newCard.name;
  cardImg.src = newCard.link;
  cardImg.alt = cardText.textContent;
  const bin = card.querySelector('.places__bin');
  bin.addEventListener('click', () => {
    bin.closest('.places__item').remove();
  });
  const heartButton = card.querySelector('.places__heart');
  heartButton.addEventListener('click', () => {
    heartButton.classList.toggle('places__heart_active');
  });
  cardImg.addEventListener('click', () => {
    openPopup(popupImage);
    popupPicture.src = cardImg.src;
    popupPicture.alt = `${cardText.textContent} - изображение в оригинальном размере`;
    popupCaption.textContent = cardText.textContent;
  });

  return card;
}

function addCard(card) {
  cardsContainer.prepend(card);
}

function renderCards(cards) {
  cards.forEach((item) => {
    const cardHtml = createCard(item);
    addCard(cardHtml);
  });
}

function submitCard(evt) {
  evt.preventDefault();
  const cardData = {
    name: titleInput.value,
    link: linkInput.value,
  };
  const cardHtml = createCard(cardData);
  addCard(cardHtml);
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
