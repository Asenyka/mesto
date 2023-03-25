import bermamyt from "../images/bermamyt.jpg";
import divnogorsk from "../images/divnogorsk.jpg";
import elton from "../images/elton.jpg";
import khibiny from "../images/khibiny.jpg";
import ruskeala from "../images/ruskeala.jpg";
import usyvinskieStolby from "../images/usyvinskie-stolby.jpg";
const initialCards = [
  {
    name: "Бермамыт",
    link: bermamyt,
  },
  {
    name: "Дивногорск",
    link: divnogorsk,
  },
  {
    name: "Эльтон",
    link: elton,
  },
  {
    name: "Хибины",
    link: khibiny,
  },
  {
    name: "Рускеала",
    link: ruskeala,
  },
  {
    name: "Усьвинские столбы",
    link: usyvinskieStolby,
  },
];

const validationSettings = {
  formSelector: ".popup__form",
  inputSelector: ".popup__input",
  submitButtonSelector: ".popup__button",
  inactiveButtonClass: "button_inactive",
  inputErrorClass: "popup__input_type_error",
  errorClass: ".popup__error",
};
export { initialCards };
export { validationSettings };
