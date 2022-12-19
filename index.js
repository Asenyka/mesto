let editButton = document.querySelector(".profile__edit-button");
let popup = document.querySelector(".popup");
let nameInput = document.querySelector("#name");
let jobInput = document.querySelector("#job");
let profileName = document.querySelector(".profile__name");
let profileJob = document.querySelector(".profile__job");

function popupShow(event) {
  popup.setAttribute("style", "display: flex;");
  nameInput.value = profileName.innerHTML;
  jobInput.value = profileJob.innerHTML;
}
editButton.addEventListener("click", popupShow);

let closeButton = document.querySelector(".popup__close-button");
function popupHide(event) {
  popup.setAttribute("style", "display: none;");
}
closeButton.addEventListener("click", popupHide);

let formElement = document.querySelector(".popup__form");

function handleFormSubmit(evt) {
  evt.preventDefault();
  profileName.textContent = nameInput.value;
  profileJob.textContent = jobInput.value;
}

formElement.addEventListener("submit", handleFormSubmit);
