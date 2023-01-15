const editButton = document.querySelector('.profile__edit-button');
const popup = document.querySelector('.popup');
const nameInput = document.querySelector('.popup__input_box_name');
const jobInput = document.querySelector('.popup__input_box_job');
const titleInput = document.querySelector('.popup__input_box_title');
const linkInput = document.querySelector('.popup__input_box_link');
const profileName = document.querySelector('.profile__name');
const profileJob = document.querySelector('.profile__job');
const closeButton = document.querySelectorAll('.popup__close-button');
const formElement = document.querySelector('.popup__form');
const formElementCreate = document.querySelector('.popup__form_create');
const editContainer = document.querySelector('.popup__container');
const addContainer = document.querySelector('.popup__add-container');
const addButton = document.querySelector('.profile__add-button');
const createCardButton = document.querySelector('.popup__button_create')
const cardsContainer = document.querySelector('.places__list');

const cardTemplate = document
	.querySelector('.places__template')
	.content
	.querySelector('.places__item');
const initialCards = [
  {
    name: 'Бермамыт',
    link: './images/bermamyt.jpg'
  },
  {
    name: 'Дивногорск',
    link: './images/divnogorsk.jpg'
  },
  {
    name: 'Эльтон',
    link: './images/elton.jpg'
  },
  {
    name: 'Хибины',
    link: './images/khibiny.jpg'
  },
  {
    name: 'Рускеала',
    link: './images/ruskeala.jpg'
  },
  {
    name: 'Усьвинские столбы',
    link: './images/usyvinskie-stolby.jpg'
  }
]; 




function popupShow(event) {
  popup.classList.add('popup_opened');
}

function editContShow(event) {
  editContainer.classList.add('popup__container_shown');
  nameInput.value = profileName.innerHTML;
  jobInput.value = profileJob.innerHTML;
}

function editContHide (event) {
  editContainer.classList.remove('popup__container_shown');
}
function addContShow (event) {
  addContainer.classList.add('popup__add-container_shown');
}
function addContHide (event) {
  addContainer.classList.remove('popup__add-container_shown');
}


function popupHide(event) {
  popup.classList.remove('popup_opened');
  }

function handleFormSubmit(evt) {
  evt.preventDefault();
  profileName.textContent = nameInput.value;
  profileJob.textContent = jobInput.value;
  popupHide();
  editContHide();
}




editButton.addEventListener('click', ()=>{
  popupShow();
  editContShow();
});

addButton.addEventListener('click', ()=>{
  popupShow();
  addContShow();
});

closeButton.forEach(closeButton => {
  closeButton.addEventListener('click', () =>{
    popupHide();
    editContHide();
    addContHide();
  })
})

formElement.addEventListener('submit', handleFormSubmit, popupHide);
formElementCreate.addEventListener('submit', submitCard);


function createCard(newCard) {
	const card = cardTemplate.cloneNode(true);
	const cardText = card.querySelector('.places__title');
  const cardImg = card.querySelector('.places__image');
	cardText.textContent = newCard.name;
  cardImg.src = newCard.link;  

	return card;
}

function addCard(card) {
	cardsContainer.prepend(card);
  const bin = document.querySelector('.places__bin');
  bin.addEventListener('click', () =>{
  bin.parentElement.remove();
  })
  const heartButton = document.querySelector('.places__heart');
  heartButton.addEventListener ('click', () => {
  heartButton.classList.toggle('places__heart_active');
  }); 
};



function renderCards(cards) {
	cards.forEach(item => {
		const cardHtml = createCard(item);
		addCard(cardHtml);
	});
}

renderCards(initialCards);


function resetForm(){
  titleInput.value='';
  linkInput.value='';
}
function submitCard (evt) {
  evt.preventDefault();
  const newCardObject = {
    name: titleInput.value,
    link: linkInput.value}
 const cardHtml = createCard(newCardObject);
  addCard(cardHtml);
  resetForm();
  addContHide();
  popupHide();

}



