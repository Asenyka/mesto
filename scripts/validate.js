class FormValidator{
  constructor(settings, )
}

//Переменная с параметрами для функций
const settings = {
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__button',
  inactiveButtonClass: 'button_inactive',
  inputErrorClass: 'popup__input_type_error',
  errorClass: '.popup__error',
};
// Функция, которая добавляет класс с ошибкой
const showInputError = (formElement, inputElement, errorMessage, settings) => {
  const errorElement = formElement.querySelector(
    `${settings.errorClass}_${inputElement.id}`
  );
  inputElement.classList.add(settings.inputErrorClass);
  errorElement.textContent = errorMessage;
};

// Функция, которая удаляет класс с ошибкой
const hideInputError = (formElement, inputElement, settings) => {
  const errorElement = formElement.querySelector(
    `${settings.errorClass}_${inputElement.id}`
  );
  errorElement.textContent = '';
  inputElement.classList.remove(settings.inputErrorClass);
};

// Функция, которая проверяет валидность поля
const checkInputValidity = (formElement, inputElement, settings) => {
  if (!inputElement.validity.valid) {
    // Если поле не проходит валидацию, покажем ошибку
    showInputError(
      formElement,
      inputElement,
      inputElement.validationMessage,
      settings
    );
  } else {
    // Если проходит, скроем
    hideInputError(formElement, inputElement, settings);
  }
};
//Функция, которая проверяет наличие невалидного поля в списке полей
const hasInvalidInput = (inputsList, settings) => {
  return inputsList.some((inputElement) => {
    return !inputElement.validity.valid;
  });
};
//Функция переключения состояния кнопки
const toggleButtonState = (inputsList, buttonElement, settings) => {
  if (hasInvalidInput(inputsList, settings)) {
    buttonElement.classList.add(settings.inactiveButtonClass);
    buttonElement.setAttribute('disabled', '');
  } else {
    buttonElement.classList.remove(settings.inactiveButtonClass);
    buttonElement.removeAttribute('disabled');
  }
};
// Функция слушателя при каждом вводе в поле и сабмите формы
const setEventListeners = (formElement, settings) => {
  const inputsList = Array.from(
    formElement.querySelectorAll(settings.inputSelector)
  );
  const buttonElement = formElement.querySelector(
    settings.submitButtonSelector
  );
  inputsList.forEach((inputElement) => {
    inputElement.addEventListener('input', function () {
      checkInputValidity(formElement, inputElement, settings);
      toggleButtonState(inputsList, buttonElement, settings);
    });
  });
  formElement.addEventListener('submit', (evt) => {
    evt.preventDefault();
  });
  formElement.addEventListener('reset', () => {
    setTimeout(() => {
      toggleButtonState(inputsList, buttonElement, settings);
    }, 0);
  });
};

//Функция валидации
const enableValidation = (settings) => {
  const formsList = Array.from(
    document.querySelectorAll(settings.formSelector)
  );
  formsList.forEach((formElement) => {
    setEventListeners(formElement, settings);
  });
};

enableValidation(settings);
