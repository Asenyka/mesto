class FormValidator {
  constructor(settings, formElement) {
    this._formSelector = settings.formSelector;
    this._inputSelector = settings.inputSelector;
    this._submitButtonSelector = settings.submitButtonSelector;
    this._inactiveButtonClass = settings.inactiveButtonClass;
    this._inputErrorClass = settings.inputErrorClass;
    this._errorClass = settings.errorClass;
    this._formElement = formElement;
    this._inputsList = Array.from(
      this._formElement.querySelectorAll(this._inputSelector)
    );
    this._buttonElement = this._formElement.querySelector(
      this._submitButtonSelector
    );
  }

  // Функция, которая добавляет класс с ошибкой
  _showInputError(inputElement, errorMessage) {
    const errorElement = this._formElement.querySelector(
      `${this._errorClass}_${inputElement.id}`
    );
    inputElement.classList.add(this._inputErrorClass);
    errorElement.textContent = errorMessage;
  }

  // Функция, которая удаляет класс с ошибкой
  _hideInputError(inputElement) {
    const errorElement = this._formElement.querySelector(
      `${this._errorClass}_${inputElement.id}`
    );
    errorElement.textContent = '';
    inputElement.classList.remove(this._inputErrorClass);
  }

  // Функция, которая проверяет валидность поля
  _checkInputValidity(inputElement) {
    if (!inputElement.validity.valid) {
      // Если поле не проходит валидацию, покажем ошибку
      this._showInputError(inputElement, inputElement.validationMessage);
    } else {
      // Если проходит, скроем
      this._hideInputError(inputElement);
    }
  }
  //Функция, которая проверяет наличие невалидного поля в списке полей
  _hasInvalidInput() {
    return this._inputsList.some((inputElement) => {
      return !inputElement.validity.valid;
    });
  }
  //Функция переключения состояния кнопки
  _toggleButtonState() {
    if (this._hasInvalidInput()) {
      this._buttonElement.classList.add(this._inactiveButtonClass);
      this._buttonElement.setAttribute('disabled', '');
    } else {
      this._buttonElement.classList.remove(this._inactiveButtonClass);
      this._buttonElement.removeAttribute('disabled');
    }
  }
  // Функция слушателя при каждом вводе в поле и сабмите формы
  _setEventListeners() {
    this._inputsList.forEach((inputElement) => {
      inputElement.addEventListener('input', () => {
        this._checkInputValidity(inputElement);
        this._toggleButtonState();
      });
    });
    this._formElement.addEventListener('submit', (evt) => {
      evt.preventDefault();
    });
    this._formElement.addEventListener('reset', () => {
      setTimeout(() => {
        this._toggleButtonState();
      }, 0);
    });
  }

  //Функция валидации
  enableValidation() {
    this._setEventListeners();
  }
}

export default FormValidator;
