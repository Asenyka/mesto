// Функция, которая добавляет класс с ошибкой
const showInputError = (formElement, inputElement, errorMessage) => {
  const errorElement = formElement.querySelector(
    `${settings.errorClass}_${inputElement.id}`
  );
  inputElement.classList.add(settings.inputErrorClass);
  errorElement.textContent = errorMessage;
};

// Функция, которая удаляет класс с ошибкой
const hideInputError = (formElement, inputElement) => {
  const errorElement = formElement.querySelector(
    `${settings.errorClass}_${inputElement.id}`
  );
  errorElement.textContent = '';
  inputElement.classList.remove(settings.inputErrorClass);
};

// Функция, которая проверяет валидность поля
const checkInputValidity = (formElement, inputElement) => {
  if (!inputElement.validity.valid) {
    // Если поле не проходит валидацию, покажем ошибку
    showInputError(formElement, inputElement, inputElement.validationMessage);
  } else {
    // Если проходит, скроем
    hideInputError(formElement, inputElement);
  }
};

const hasInvalidInput = (inputsList) => {
  return inputsList.some((inputElement) => {
    return !inputElement.validity.valid;
  });
};

const toggleButtonState = (inputsList, buttonElement) => {
  if (hasInvalidInput(inputsList)) {
    buttonElement.classList.add(settings.inactiveButtonClass);
    buttonElement.setAttribute('disabled', '');
  } else {
    buttonElement.classList.remove(settings.inactiveButtonClass);
    buttonElement.removeAttribute('disabled');
  }
};
// Вызовем функцию checkInputValidity на каждый ввод символа
const setEventListeners = (formElement) => {
  const inputsList = Array.from(
    formElement.querySelectorAll(settings.inputSelector)
  );
  const buttonElement = formElement.querySelector(
    settings.submitButtonSelector
  );
  inputsList.forEach((inputElement) => {
    inputElement.addEventListener('input', function () {
      checkInputValidity(formElement, inputElement);
      toggleButtonState(inputsList, buttonElement);
    });
  });
};

function disableButton(buttonToDisable) {
  buttonToDisable.classList.add(settings.inactiveButtonClass);
  buttonToDisable.setAttribute('disabled', '');
}

const enableValidation = () => {
  const formsList = Array.from(
    document.querySelectorAll(settings.formSelector)
  );
  formsList.forEach((formElement) => {
    formElement.addEventListener('submit', (evt) => {
      evt.preventDefault();
      const buttonToDisable = formElement.querySelector(
        settings.submitButtonSelector
      );
      disableButton(buttonToDisable);
    });
    setEventListeners(formElement);
  });
};

enableValidation(
  (settings = {
    formSelector: '.popup__form',
    inputSelector: '.popup__input',
    submitButtonSelector: '.popup__button',
    inactiveButtonClass: 'button_inactive',
    inputErrorClass: 'popup__input_type_error',
    errorClass: '.popup__error',
  })
);
