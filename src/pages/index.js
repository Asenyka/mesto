import Card from "../components/Card.js";
import FormValidator from "../components/FormValidator.js";
import PopupToConfirm from "../components/PopupToConfirm.js";
import PopupWithForm from "../components/PopupWithForm.js";
import PopupWithImage from "../components/PopupWithImage.js";
import Section from "../components/Section.js";
import UserInfo from "../components/UserInfo.js";
import { validationSettings } from "../utils/constants.js";
import Api from "../utils/Api.js";
import "./index.css";

const api = new Api({
  token: "932dd1d7-dbf3-4149-befd-e973c13cb750",
  basePath: "https://mesto.nomoreparties.co/v1/cohort-61",
});
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
const userInfo = new UserInfo(profileName, profileJob, avatar);

const popupWithImage = new PopupWithImage(".popup_image");
const popupToEditProfile = new PopupWithForm(".popup_edit-profile", {
  submitForm: (userData) => {
    popupToEditProfile.showSavingInProcess(true);
    api
      .sendUserInfo(userData)
      .then((userData) => {
        userInfo.setUserInfo(userData);
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        popupToEditProfile.showSavingInProcess(false);
      });
    popupToEditProfile.close();
  },
});
const popupToUpdateAvatar = new PopupWithForm(".popup_udate-avatar", {
  submitForm: (avatarLink) => {
    popupToUpdateAvatar.showSavingInProcess(true);
    api
      .sendAvatar(avatarLink.link)
      .then((res) => {
        userInfo.setUserInfo(res);
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        popupToUpdateAvatar.showSavingInProcess(false);
      });
    popupToUpdateAvatar.close();
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
    popupToAddCard.showSavingInProcess(true);
    api
      .sendCard(cardData)
      .then((cardData) => {
        cardList.renderer([cardData]);
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        popupToAddCard.showSavingInProcess(false);
      });

    popupToAddCard.close();
  },
});

popupWithImage.setEventListeners();
popupToEditProfile.setEventListeners();
popupToAddCard.setEventListeners();
popupToUpdateAvatar.setEventListeners();

function createCard(template, item) {
  const card = new Card(
    template,
    item,
    {
      handleCardClick: () => {
        popupWithImage.open(card._link, card._name);
      },
    },
    {
      handleBinClick: () => {
        const popupToConfirmDeletion = new PopupToConfirm(
          ".popup_confirm-deletion",
          {
            handleRequest: () => {
              api.deleteCard(item._id);
              card.deleteCard();
              popupToConfirmDeletion.close();
            },
          }
        );
        popupToConfirmDeletion.setEventListeners();
        popupToConfirmDeletion.open();
      },
    },
    {
      sendLike: (cardID) => {
        api
          .sendLike(cardID)
          .then((res) => {
            card._likeCounter.textContent = res.likes.length;
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
            card._likeCounter.textContent = res.likes.length;
          })
          .catch((err) => {
            console.log(err);
          });
      },
    }
  );

  if (userInfo._id != item.owner._id) {
    card._bin.remove();
  }
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
