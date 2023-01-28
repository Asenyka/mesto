const buttonOpenEditProfilePopup = document.querySelector('.profile__edit-button');
const popupEditProfile = document.querySelector('.popup_edit-profile');
const popupAddCard = document.querySelector('.popup_add-card');
const popupImage = document.querySelector('.popup_image');
const nameInput = document.querySelector('.popup__input_box_name');
const jobInput = document.querySelector('.popup__input_box_job');
const titleInput = document.querySelector('.popup__input_box_title');
const linkInput = document.querySelector('.popup__input_box_link');
const profileName = document.querySelector('.profile__name');
const profileJob = document.querySelector('.profile__job');
const formEditProfile = document.querySelector('.popup__form');
const formElementCreate = document.querySelector('.popup__form_create');
const containerEditProfile = document.querySelector('.popup__container_edit-profile');
const containerAddCard = document.querySelector('.popup__container_add-card');
const containerImage = document.querySelector('.popup__picture-container');
const buttonOpenAddCardPopup = document.querySelector('.profile__add-button');
const buttonCreateCard = document.querySelector('.popup__button_create');
const cardsContainer = document.querySelector('.places__list');
const popupPicture = document.querySelector('.popup__picture');
const popupCaption = document.querySelector('.popup__caption');
const buttonClose = document.querySelectorAll('.popup__close-button');



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

function closePopup(popup) {
  popup.classList.remove('popup_opened');
}

function openPopup(popup) {
  popup.classList.add('popup_opened');
  document.addEventListener('keydown',(evt)=> {
  if (evt.key === 'Escape') {
    closePopup(popup);
    }
  });
  popup.addEventListener('click', (evt)=>{
 if (evt.target.classList.contains('popup')){
  closePopup(popup);
 }
  })
 }

function showPofileInfo(){
  nameInput.value = profileName.innerHTML;
  jobInput.value = profileJob.innerHTML;
}


function submitEditProfileForm(evt) {
  evt.preventDefault();
  profileName.textContent = nameInput.value;
  profileJob.textContent = jobInput.value;
  closePopup(popupEditProfile);
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
    bin.parentElement.remove();
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



renderCards(initialCards);

buttonClose.forEach((buttonClose) =>
buttonClose.addEventListener('click', () => {
  closePopup(buttonClose.closest('.popup'));})
);

buttonOpenEditProfilePopup.addEventListener('click', () => {
  openPopup(popupEditProfile);
  showPofileInfo();
});

buttonOpenAddCardPopup.addEventListener('click', () => {
  openPopup(popupAddCard);
});


formEditProfile.addEventListener('submit', submitEditProfileForm, closePopup(popupEditProfile));
formElementCreate.addEventListener('submit', submitCard);

