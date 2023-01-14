const editButton = document.querySelector('.profile__edit-button');
const popup = document.querySelector('.popup');
const nameInput = document.querySelector('.popup__input_box_name');
const jobInput = document.querySelector('.popup__input_box_job');
const profileName = document.querySelector('.profile__name');
const profileJob = document.querySelector('.profile__job');
const closeButton = document.querySelector('.popup__close-button');
const formElement = document.querySelector('.popup__form');

function popupShow(event) {
  popup.classList.add('popup_opened');
  nameInput.value = profileName.innerHTML;
  jobInput.value = profileJob.innerHTML;
}
function popupHide(event) {
  popup.classList.remove('popup_opened');
}
function handleFormSubmit(evt) {
  evt.preventDefault();
  profileName.textContent = nameInput.value;
  profileJob.textContent = jobInput.value;
  popupHide();
}

editButton.addEventListener('click', popupShow);

closeButton.addEventListener('click', popupHide);

formElement.addEventListener('submit', handleFormSubmit, popupHide);


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

const cardsContainer = document.querySelector('.places__list');
const cardTemplate = document
	.querySelector('.places__template')
	.content
	.querySelector('.places__item');



function cloneCard(event) {
	const clonedCard = event.target.closest('.places__item').cloneNode(true);
	addCard(clonedCard);
}


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
}

function renderCards(texts) {
	texts.reverse().forEach(item => {
		const cardHtml = createCard(item);
		addCard(cardHtml);
	});
}

renderCards(initialCards);

document.querySelectorAll('.places__heart').onclick = toggleHeart;
function toggleHeart(){

}

const heartButton = document.querySelectorAll('.places__heart');
heartButton.forEach(heartButton => {
  heartButton.addEventListener ('click', toggle => {
    heartButton.classList.toggle('places__heart_active');
  })
});
