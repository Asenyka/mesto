import Card from "../components/Card.js";
import FormValidator from "../components/FormValidator.js";
import PopupToConfirm from "../components/PopupToConfirm.js";
import PopupWithForm from "../components/PopupWithForm.js";
import PopupWithImage from "../components/PopupWithImage.js";
import Section from "../components/Section.js";
import UserInfo from "../components/UserInfo.js";
import { validationSettings } from "../utils/constants.js";
import {
  buttonOpenEditProfilePopup,
  formElementCreate,
  formAvatarUpdate,
  buttonOpenAddCardPopup,
  avatarOverlay,
  avatar,
  profileName,
  profileJob,
  formEditProfile,
} from "../utils/constants.js";
import Api from "../utils/Api.js";
import "./index.css";

const api = new Api({
  token: "932dd1d7-dbf3-4149-befd-e973c13cb750",
  basePath: "https://mesto.nomoreparties.co/v1/cohort-61",
});

const userInfo = new UserInfo(profileName, profileJob, avatar);

const popupWithImage = new PopupWithImage(".popup_image");

const popupToEditProfile = new PopupWithForm(".popup_edit-profile", {
  submitForm: (userData) => {
    popupToEditProfile.showSavingInProcess("Сохранение...");
    api
      .sendUserInfo(userData)
      .then((userData) => {
        userInfo.setUserInfo(userData);
        popupToEditProfile.close();
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        popupToEditProfile.showSavingCompleted("Сохранить");
      });
  },
});

const popupToUpdateAvatar = new PopupWithForm(".popup_udate-avatar", {
  submitForm: (avatarLink) => {
    popupToUpdateAvatar.showSavingInProcess("Сохранение...");
    api
      .sendAvatar(avatarLink.link)
      .then((res) => {
        userInfo.setUserInfo(res);
        popupToUpdateAvatar.close();
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        popupToUpdateAvatar.showSavingCompleted("Сохранить");
      });
  },
});
const cardList = new Section(
  {
    renderer: (item) => {
      const card = createCard(".places__template", item);
      cardList.addItem(card);
    },
  },
  ".places__list"
);
const popupToAddCard = new PopupWithForm(".popup_add-card", {
  submitForm: (cardData) => {
    popupToAddCard.showSavingInProcess("Сохранение...");
    api
      .sendCard(cardData)
      .then((cardData) => {
        cardList.renderer([cardData]);
        popupToAddCard.close();
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        popupToAddCard.showSavingCompleted("Сохранить");
      });
  },
});

const popupToConfirmDeletion = new PopupToConfirm(".popup_confirm-deletion", {
  handleRequest: (cardID, card) => {
    api
      .deleteCard(cardID)
      .then(() => {
        card.deleteCard();
        popupToConfirmDeletion.close();
      })
      .catch((err) => {
        console.log(err);
      });
  },
});
popupToConfirmDeletion.setEventListeners();
popupWithImage.setEventListeners();
popupToEditProfile.setEventListeners();
popupToAddCard.setEventListeners();
popupToUpdateAvatar.setEventListeners();

function createCard(template, item) {
  const userID = userInfo.returnUserId();
  const card = new Card(
    userID,
    template,
    item,
    {
      handleCardClick: () => {
        popupWithImage.open(card._link, card._name);
      },
    },
    {
      handleBinClick: () => {
        popupToConfirmDeletion.open(card);
      },
    },
    {
      sendLike: (cardID) => {
        api
          .sendLike(cardID)
          .then((res) => {
            card.showLikes(res.likes);
          })
          .catch((err) => {
            console.log(err);
          });
      },
    },
    {
      deleteLike: (cardID) => {
        api
          .deleteLike(cardID)
          .then((res) => {
            card.showLikes(res.likes);
          })
          .catch((err) => {
            console.log(err);
          });
      },
    }
  );
  const newCard = card.createCard();
  return newCard;
}

Promise.all([api.getUserInfo(), api.getInitialCards()])
  .then(([user, cards]) => {
    userInfo.setUserInfo(user);
    cardList.renderer(cards);
  })
  .catch((err) => {
    console.log(err);
  });

buttonOpenEditProfilePopup.addEventListener("click", () => {
  const currentUserInfo = userInfo.getUserInfo();
  popupToEditProfile.setInputValues(currentUserInfo);
  popupToEditProfile.open();
});
avatarOverlay.addEventListener("click", () => {
  popupToUpdateAvatar.open();
});
buttonOpenAddCardPopup.addEventListener("click", () => {
  popupToAddCard.open();
});

const editProfileFormValidator = new FormValidator(
  validationSettings,
  formEditProfile
);
editProfileFormValidator.enableValidation();

const createFormValidator = new FormValidator(
  validationSettings,
  formElementCreate
);
createFormValidator.enableValidation();

const updateFormValidator = new FormValidator(
  validationSettings,
  formAvatarUpdate
);
updateFormValidator.enableValidation();
