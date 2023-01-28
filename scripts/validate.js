/*const formEditProfile = document.forms.formEdit;
const formCreateCard = document.forms.formCreate;

const inputSelector = formSelector.querySelectorAll('.popup__input');
const submitButtonSelector=document.querySelectorAll('.popup__button');
const inactiveButtonClass=document.querySelectorAll('popup__button_disabled');
const inputErrorClass = document.querySelectorAll('popup__input_type_error');
const errorClass = document.querySelectorAll ('popup__error_visible');
const formError = formSelector.querySelector(`.${inputSelector}-error`);

formSelector.addEventListener('submit', (evt) =>{
 evt.preventDefault();
})

const showError = (input, errorMessage) => {
  input.classList.add('popup__input_type_error');
  formError.textContent = errorMessage;
  formError.classList.add('popup-error_visible');
};

const hideError = (input) => {
  input.classList.remove('popup__input_type_error');
  formError.classList.remove('popup-error_visible');
  formError.textContent = '';
};

const checkInputValidity = () => {
  if (!inputSelector.validity.valid) {
    showError(inputSelector, inputSelector.validationMessage);
  } else {
    hideError(inputSelector);
  }
};

formSelector.addEventListener('submit', function (evt) {
  evt.preventDefault();
});

inputSelector.addEventListener('input', function () {
  checkInputValidity();
});

function enableValidation(form){
  const inputs = Array.from(form.querySelectorAll('.popup__input'));
  inputs.forEach() =>{
  formSelector.addEventListener('submit', (evt) =>{
    evt.preventDefault();
  });
  setEventListeners(formSelector);
  }
}

const enableValidation = () => {
  const formList = Array.from(document.querySelectorAll('.form'));
  formList.forEach((formElement) => {
  formElement.addEventListener('submit', function (evt) {
  evt.preventDefault();
  });
      
  const fieldsetList = Array.from(formElement.querySelectorAll('.form__set'));
  
  fieldsetList.forEach((fieldset) => {
  setEventListeners(fieldset);
  });
  });
  };
  
  const hasInvalidInput = (inputList) => {
  return inputList.some((inputElement) => {
  return !inputElement.validity.valid;
  });
  };
  */
  