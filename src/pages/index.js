import './index.css';
import { FormValidator } from '../components/FormValidator.js';
import Api from '../components/Api';
import Card from '../components/Card.js';
import Section from '../components/Section.js';
import Userinfo from '../components/UserInfo.js';
import PopupWithForm from '../components/PopupWithForm.js';
import PopupWithImage from '../components/PopupWithImage.js';
import PopupWithConfirmation from '../components/PopupWithConfirmation.js';
import {
  config,
  popupAvatar,
  avatarPicture,
  profileTitle,
  profileSubtitle,
  profileEditAvatar,
  profileEditButton,
  buttonAddPlus,
  galleryContainer,
  profilePopup,
  profilePopupForm,
  nameProfileInput,
  aboutProfileInput,
  galleryPopup,
  galleryPopupForm,
  galleryOverlay,
  confirmPopup
} from '../utils/constants.js';

//
const profileFormValidator = new FormValidator(config, profilePopupForm);
profileFormValidator.enableValidation();//валидация попап профиля

const cardFormValidator = new FormValidator(config, galleryPopupForm);
cardFormValidator.enableValidation();//валидация попап галереи

const avatarFormValidator = new FormValidator(config, popupAvatar);
avatarFormValidator.enableValidation();//валидация попап аватара
///
const cardSelector = document.querySelector('.gallery-template');



let userId = '';//

const api = new Api({
  baseUrl: 'https://mesto.nomoreparties.co/v1',
  groupId: 'cohort-28',
  token: '7ab77057-a030-4fc1-abd5-bdd9c6f29070',
});

//создает экземпляр класса и возвращает карточку
function createNewCard(element, owner, isLiked) {
  const card = new Card(element, owner, isLiked, cardSelector, (img, name) => { popupWithImage.open(img, name) }, handleOpenConfirmPopup, handleLikeClick);

  function handleOpenConfirmPopup(evt) {
    applyConfirm.open(() => {
      api.deleteCard(card.getId())
        .then(() => {
          applyConfirm.close()
          card.delCard(evt)
        })
        .catch(err => console.log(`Ошибка при удалении карточки ${err}`));
    });
    
  }

  function handleLikeClick() {
    if (card.getLikeState()) {

      api.deleteCardLike(card.getId())
        .then(result => {
          card.unlikeCard(result.likes.length);
        })
        .catch(err => console.log(`Ошибка при снятии лайка ${err}`));
    } else {
      api.putCardLike(card.getId())
        .then(result => {
          card.likeCard(result.likes.length);
        })
        .catch(err => console.log(`Ошибка при отправке лайка ${err}`));
    }
  }

  return card.createCard();
}
///
const applyConfirm = new PopupWithConfirmation(confirmPopup)
applyConfirm.setEventListeners();


//



//
api.getInitialCards()
  .then(result => { cardsSection.renderItems(result) })
  .catch(err => console.log(`Ошибка при получении карточек ${err}`))
///


const cardsSection = new Section({
  renderer: item => {
    const isOwner = item.owner._id === userId;
    const isLiked = item.likes.some(liker => {
      return liker._id === userId;
    });
    cardsSection.setItem(createNewCard({ name: item.name, link: item.link, id: item._id, likes: item.likes.length }, isOwner, isLiked), "append");
  }
}, galleryContainer);
///



//Открыть попап просмотра фото в отдельном окне
const popupWithImage = new PopupWithImage(galleryOverlay)
popupWithImage.setEventListeners();
///

//
const userInfo = new Userinfo({ profileNameSelector: profileTitle, profileDescriptionSelector: profileSubtitle, profileAvatarSelector: avatarPicture });
///
api.getUserInfo()
  .then(result => {
    userId = result._id;
    userInfo.setUserInfo({ nameProfile: result.name, aboutProfile: result.about });
    userInfo.setUserAvatar(result.avatar);
  })
  .catch(err => console.log(`Ошибка при получении профиля ${err}`));
//Создаем объекты класса Popup
const profileEditPopup = new PopupWithForm(profilePopup, (inputValues) => {
  api.patchUserInfo(inputValues)
    .then(result => {
      profileEditPopup.close();
      userInfo.setUserInfo({ nameProfile: result.name, aboutProfile: result.about })
    })
    .catch(err => console.log(`Ошибка при обновлении профиля ${err}`))
    .finally(() => { profileEditPopup.getSubmitText() })
});
profileEditPopup.setEventListeners();
///

//
const avatarEditPicture = new PopupWithForm(popupAvatar, (inputValues) => {
  api.patchUserAvatar(inputValues)
    .then(result => {
      avatarEditPicture.close();
      avatarPicture.src = result.avatar
    })
    .catch(err => console.log(`Ошибка при обновлении аватара ${err}`))
    .finally(() => { avatarEditPicture.getSubmitText() })
});
avatarEditPicture.setEventListeners();
///

//
const addElementPopup = new PopupWithForm(galleryPopup, (item) => {
  api.postNewCard(item)
    .then(result => {
      addElementPopup.close();
      cardsSection.setItem(createNewCard({ name: result.name, link: result.link, id: result._id, likes: result.likes.length }, true), "prepend")
    })
    .catch(err => console.log(`Ошибка при добавлении карточки ${err}`))
    .finally(() => { addElementPopup.getSubmitTextPopupGallery() })
})
addElementPopup.setEventListeners();
///

//
profileEditButton.addEventListener('click', () => {
  profileFormValidator.clearInputItems();
  const profileData = userInfo.getUserInfo();
  nameProfileInput.value = profileData.name;
  aboutProfileInput.value = profileData.description;
  profileEditPopup.open();
});
///

///
buttonAddPlus.addEventListener('click', () => {
  cardFormValidator.clearInputItems();
  addElementPopup.open();
});
///
profileEditAvatar.addEventListener('click', () => { avatarFormValidator.clearInputItems(); avatarEditPicture.open() });