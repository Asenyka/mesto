let editButton = document.querySelector('.profile__edit-button')
let popup = document.querySelector ('.popup')
function popupShow(event) {
  popup.setAttribute('style', 'display: flex;')
}
editButton.addEventListener('click', popupShow)


let closeButton = document.querySelector('.popup__close-button')
function popupHide(event) {
    popup.setAttribute('style', 'display: none;')
}
closeButton.addEventListener('click', popupHide)