import './index.css'
import { 
  validationConfig,
  popupEditProfileOpenButton, 
  popupAddElementOpenButton,
  profileName,
  profileProfession,
  popupEditAvatarOpenButton,
  avatarImg
} from "../utils/addition.js";

import { Api } from '../components/Api';
import { Card } from "../components/Card.js";
import { FormValidator } from "../components/FormValidator.js";
import { Section } from "../components/Section.js";
import { PopupWithForm } from "../components/PopupWithForm.js";
import { UserInfo } from "../components/UserInfo.js";
import { PopupWithImage } from "../components/PopupWithImage.js";
import { PopupWithConfirmation } from '../components/PopupWithConfirmation';

const api = new Api({
  baseUrl: 'https://mesto.nomoreparties.co/v1/cohort-59',
  headers: {
    authorization: '6318b4d3-b21d-4bf6-b1fb-1139aaeed72e',
    'Content-Type': 'application/json'
  }
});

let userId = '';

Promise.all([api.getUserInfo(), api.getInitialCards()])
.then(([user, data]) => {
  userInfo.setUserInfo(user);
  userId = user._id;
  cardsList.renderItems(data);
})
.catch((err) => {
  console.log(`Ошибка 2=> ${err}`);
});

const userInfo = new UserInfo({ 
  name: profileName,
  profession: profileProfession,
  avatar: avatarImg
})

const formPopupEditProfile = new PopupWithForm(
  '.popup_edit-profile',
  {formSubmit: (data) => {
    formPopupEditProfile.loading(true)
    api.editProfile(data)
    .then((res) => {
      userInfo.setUserInfo(res)
      formPopupEditProfile.close()
    })
    .catch((err) => {
      console.log(`Ошибка formPopupEditProfile => ${err}`)
    })
    .finally(() => {
      formPopupEditProfile.loading(false)
    })
  }}
)
formPopupEditProfile.setEventListeners();

const formPopupEditAvatar = new PopupWithForm(
  '.popup_update-avatar',
  {formSubmit: (data) => {
    formPopupEditAvatar.loading(true)
    api.updAvatar(data)
    .then((res) => {
      userInfo.setUserInfo(res)
      formPopupEditAvatar.close()
    })
    .catch((err) => {
      console.log(`Ошибка formPopupEditAvatar => ${err} => ${err.status}`)
    })
    .finally(() => {
      formPopupEditAvatar.loading(false)
    })
  }}
)
formPopupEditAvatar.setEventListeners();

const formPopupAddElement = new PopupWithForm(
  '.popup_add-element', 
  {formSubmit: (data) => {
    formPopupAddElement.loading(true)
    api.addNewCard(data)
    .then((data) => {
      cardsList.addItem(createCard(data));
      formPopupAddElement.close();
    })
    .catch((err) => {
      console.log(`Ошибка formPopupAddElement => ${err} => ${err.status}`)
    })
    .finally(() => {
      formPopupAddElement.loading(false)
    })
  }})
formPopupAddElement.setEventListeners();

const popupWhithImage = new PopupWithImage(
  '.popup_open-image')
popupWhithImage.setEventListeners();

const popupWithConfirmation = new PopupWithConfirmation(
  '.popup_confirm', {deletion: (card) => {
    api.deleteCard(card.getId())
      .then(() => {
        card.handleDeleteCard()
        popupWithConfirmation.close()
      })
      .catch((err) => {
        console.log(`Ошибка => ${err} => ${err.status}`)
      })
  }})
popupWithConfirmation.setEventListeners();

const createCard = (data) => {
  const cardNew = new Card ({
    userId: userId,
    data: data, 
    templateSelector: '#card-template', 
    
    handleCardClick: (name, link) => {
      popupWhithImage.open(name, link)
    },

    handleConfirmDeletion: (card) => {
      popupWithConfirmation.open()
      popupWithConfirmation.setData(card)
    },

    likeCard: (cardId) => {
      if (cardNew.hasUserLike()) {
        api.deleteLike(cardId)
        .then((data) => {
          cardNew.handleLike(data.likes)
          cardNew.switchColorLike()
        })
        .catch((err) => {
          console.log(`Ошибка => ${err} => ${err.status}`)
        })
      } else {
        api.putLike(cardId)
        .then((data) => {
          cardNew.handleLike(data.likes)
          cardNew.switchColorLike()
        })
        .catch((err) => {
          console.log(`Ошибка => ${err} => ${err.status}`)
        })
      } 
    }  
  });
  return cardNew.generateCard();
}

const cardsList = new Section({
  renderer: (data) => {
    cardsList.addItem(createCard(data))
  }},
  '.elements__list'
);

// Валидация
const formValidators = {};
const enableValidation = (config) => {
  const forms = Array.from(document.querySelectorAll(config.formSelector))
  forms.forEach((form) => {
    const validator = new FormValidator(validationConfig, form)
    const formName = form.getAttribute('name')
    formValidators[formName] = validator;
    validator.enableValidation();
  })
}
enableValidation(validationConfig);

popupEditProfileOpenButton.addEventListener('click', () => {
  formValidators['form_edit-profile'].resetValidation();
  formPopupEditProfile.setInputValues(userInfo.getUserInfo())
  formPopupEditProfile.open();
});

popupAddElementOpenButton.addEventListener('click', () => {
  formValidators['form_add-place'].resetValidation();
  formPopupAddElement.open();
});

popupEditAvatarOpenButton.addEventListener('click', () => {
  formValidators['form_update-avatar'].resetValidation();
  formPopupEditAvatar.open();
})

