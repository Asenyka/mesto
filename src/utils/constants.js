const validationSettings = {
  formSelector: ".popup__form",
  inputSelector: ".popup__input",
  submitButtonSelector: ".popup__button",
  inactiveButtonClass: "button_inactive",
  inputErrorClass: "popup__input_type_error",
  errorClass: ".popup__error",
};

const buttonOpenEditProfilePopup = document.querySelector(
  ".profile__edit-button"
);
const avatarOverlay = document.querySelector(".profile__overlay");
const avatar = document.querySelector(".profile__pic");
const profileName = document.querySelector(".profile__name");
const profileJob = document.querySelector(".profile__job");
const formEditProfile = document.querySelector(".popup__form_edit");
const formElementCreate = document.querySelector(".popup__form_create");
const formAvatarUpdate = document.querySelector(".popup__form_update");
const buttonOpenAddCardPopup = document.querySelector(".profile__add-button");

export { validationSettings };
export {
  buttonOpenEditProfilePopup,
  formElementCreate,
  formAvatarUpdate,
  buttonOpenAddCardPopup,
  avatarOverlay,
  avatar,
  profileName,
  profileJob,
  formEditProfile,
};
