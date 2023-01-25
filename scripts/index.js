const buttonEdit = document.querySelector('.profile__edit-button');
const popupEditProfile = document.querySelector('.popup_edit-profile');
const popupAddCard = document.querySelector('.popup_add-card');
const popupImage = document.querySelector('.popup_image');
const nameInput = document.querySelector('.popup__input_box_name');
const jobInput = document.querySelector('.popup__input_box_job');
const titleInput = document.querySelector('.popup__input_box_title');
const linkInput = document.querySelector('.popup__input_box_link');
const profileName = document.querySelector('.profile__name');
const profileJob = document.querySelector('.profile__job');
const formElement = document.querySelector('.popup__form');
const formElementCreate = document.querySelector('.popup__form_create');
const containerEditProfile = document.querySelector('.popup__container_edit-profile');
const containerAddCard = document.querySelector('.popup__container_add-card');
const containerImage = document.querySelector('.popup__picture-container');
const buttonAdd = document.querySelector('.profile__add-button');
const buttonCreateCard = document.querySelector('.popup__button_create');
const cardsContainer = document.querySelector('.places__list');
const popupPicture = document.querySelector('.popup__picture');
const popupCaption = document.querySelector('.popup__caption');


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
  const buttonClose = popup.querySelector('.popup__close-button');
  buttonClose.addEventListener('click', () => {
    closePopup(popup);});
 }


function showPopupCont (container) {
  container.classList.add('popup__container_shown');
}

function hidePopupCont (container) {
  container.classList.remove('popup__container_shown');
}

function showPofileInfo(){
  nameInput.value = profileName.innerHTML;
  jobInput.value = profileJob.innerHTML;
}


function handleFormSubmit(evt) {
  evt.preventDefault();
  profileName.textContent = nameInput.value;
  profileJob.textContent = jobInput.value;
  hidePopupCont(containerEditProfile);
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
    showPopupCont(containerImage);
    popupPicture.src = cardImg.src;
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
  const newCardObject = {
    name: titleInput.value,
    link: linkInput.value,
  };
  const cardHtml = createCard(newCardObject);
  addCard(cardHtml);
   hidePopupCont(containerAddCard);
  formElementCreate.reset();
  closePopup(popupAddCard);
}

renderCards(initialCards);

buttonEdit.addEventListener('click', () => {
  openPopup(popupEditProfile);
  showPofileInfo();
  showPopupCont(containerEditProfile);
});

buttonAdd.addEventListener('click', () => {
  openPopup(popupAddCard);
  showPopupCont(containerAddCard);
});


formElement.addEventListener('submit', handleFormSubmit, closePopup(popupEditProfile));
formElementCreate.addEventListener('submit', submitCard);
