
function activateError(element) {
  element.classList.add('popup__input_type_error');
  const errorMessage = element.nextElementSibling;
  errorMessage.textContent = element.validationMessage;
}
function resetError(element) {
  element.classList.remove('popup__input_type_error');
  const errorMessage = element.nextElementSibling;
  errorMessage.textContent = '';
  

}
function enableValidation(form) {
  const popupButton = form.querySelector('.popup__button');
  form.addEventListener('input', () =>{
      const inputs = Array.from(form.querySelectorAll('.popup__input'));
      inputs.forEach((input) => {
        if (input.checkValidity()) {
         resetError(input)
        } else{
          activateError(input)
        }
      })
      if (inputs.every(input =>{
      return input.validity.valid})){
          popupButton.removeAttribute('disabled');
          popupButton.classList.remove('button_inactive');
      }else{
        popupButton.setAttribute('disabled', '');
          popupButton.classList.add('button_inactive');
      }
      
  })
}
enableValidation(formEditProfile)
enableValidation(formElementCreate)