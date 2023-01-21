const editButton = document.querySelector(".profile__edit-button");
const popup = document.querySelector(".popup");
const nameInput = document.querySelector(".popup__input_box_name");
const jobInput = document.querySelector(".popup__input_box_job");
const titleInput = document.querySelector(".popup__input_box_title");
const linkInput = document.querySelector(".popup__input_box_link");
const profileName = document.querySelector(".profile__name");
const profileJob = document.querySelector(".profile__job");
const closeButton = document.querySelectorAll(".popup__close-button");
const formElement = document.querySelector(".popup__form");
const formElementCreate = document.querySelector(".popup__form_create");
const editContainer = document.querySelector(".popup__container");
const addContainer = document.querySelector(".popup__add-container");
const pictureContainer = document.querySelector(".popup__picture-container");
const addButton = document.querySelector(".profile__add-button");
const createCardButton = document.querySelector(".popup__button_create");
const cardsContainer = document.querySelector(".places__list");
const popupPicture = document.querySelector(".popup__picture");

const cardTemplate = document
  .querySelector(".places__template")
  .content.querySelector(".places__item");
const initialCards = [
  {
    name: "Бермамыт",
    link: "./images/bermamyt.jpg",
  },
  {
    name: "Дивногорск",
    link: "./images/divnogorsk.jpg",
  },
  {
    name: "Эльтон",
    link: "./images/elton.jpg",
  },
  {
    name: "Хибины",
    link: "./images/khibiny.jpg",
  },
  {
    name: "Рускеала",
    link: "./images/ruskeala.jpg",
  },
  {
    name: "Усьвинские столбы",
    link: "./images/usyvinskie-stolby.jpg",
  },
];

function showPopup() {
  popup.classList.add("popup_opened");
}

function showEditCont() {
  editContainer.classList.add("popup__container_shown");
  nameInput.value = profileName.innerHTML;
  jobInput.value = profileJob.innerHTML;
}

function hideEditCont() {
  editContainer.classList.remove("popup__container_shown");
}
function showAddCont() {
  addContainer.classList.add("popup__container_shown");
}
function hideAddCont() {
  addContainer.classList.remove("popup__container_shown");
}

function showPictureCont() {
  pictureContainer.classList.add("popup__container_shown");
}
function hidePictureCont() {
  pictureContainer.classList.remove("popup__container_shown");
}

function hidePopup() {
  popup.classList.remove("popup_opened");
}

function handleFormSubmit() {
  profileName.textContent = nameInput.value;
  profileJob.textContent = jobInput.value;
  hidePopup();
  hideEditCont();
}

function createCard(newCard) {
  const card = cardTemplate.cloneNode(true);
  const cardText = card.querySelector(".places__title");
  const cardImg = card.querySelector(".places__image");
  cardText.textContent = newCard.name;
  cardImg.src = newCard.link;
  cardImg.alt = cardText.textContent;

  return card;
}

function addCard(card) {
  cardsContainer.prepend(card);
  const bin = document.querySelector(".places__bin");
  bin.addEventListener("click", () => {
    bin.parentElement.remove();
  });
  const heartButton = document.querySelector(".places__heart");
  heartButton.addEventListener("click", () => {
    heartButton.classList.toggle("places__heart_active");
  });
  const cardImg = card.querySelector(".places__image");
  const cardText = card.querySelector(".places__title");
  const popupCaption = document.querySelector(".popup__caption");
  cardImg.addEventListener("click", () => {
    showPopup();
    showPictureCont();
    popupPicture.src = cardImg.src;
    popupCaption.textContent = cardText.textContent;
  });
}

function renderCards(cards) {
  cards.forEach((item) => {
    const cardHtml = createCard(item);
    addCard(cardHtml);
  });
}

function resetForm() {
  titleInput.value = "";
  linkInput.value = "";
}
function submitCard(evt) {
  evt.preventDefault();
  const newCardObject = {
    name: titleInput.value,
    link: linkInput.value,
  };
  const cardHtml = createCard(newCardObject);
  addCard(cardHtml);
  resetForm();
  hideAddCont();
  hidePopup();
}

renderCards(initialCards);

editButton.addEventListener("click", () => {
  showPopup();
  showEditCont();
});

addButton.addEventListener("click", () => {
  showPopup();
  showAddCont();
});

closeButton.forEach((closeButton) => {
  closeButton.addEventListener("click", () => {
    hidePopup();
    hideEditCont();
    hideAddCont();
    hidePictureCont();
  });
});

formElement.addEventListener("submit", handleFormSubmit, hidePopup);
formElementCreate.addEventListener("submit", submitCard);
