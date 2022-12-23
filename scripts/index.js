let editButton = document.querySelector(".profile__edit-button");
let popup = document.querySelector(".popup");
let nameInput = document.querySelector(".popup__input_box_name");
let jobInput = document.querySelector(".popup__input_box_job");
let profileName = document.querySelector(".profile__name");
let profileJob = document.querySelector(".profile__job");
let closeButton = document.querySelector(".popup__close-button");
let formElement = document.querySelector(".popup__form");
function popupShow(event) {
  popup.classList.add('popup_opened');
  nameInput.value = profileName.innerHTML;
  jobInput.value = profileJob.innerHTML;
}
editButton.addEventListener("click", popupShow);


function popupHide(event) {
  popup.classList.remove('popup_opened');
}
closeButton.addEventListener("click", popupHide);



function handleFormSubmit(evt) {
  evt.preventDefault();
  profileName.textContent = nameInput.value;
  profileJob.textContent = jobInput.value;
  popupHide();
}

formElement.addEventListener("submit", handleFormSubmit, popupHide);
