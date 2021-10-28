import './index.css';
import { FormValidator } from '../components/FormValidator.js';
import Api from '../components/Api';
import Card from '../components/Card.js';
import Section from '../components/Section.js';
import Userinfo from '../components/UserInfo.js';
import PopupWithForm from '../components/PopupWithForm.js';
import PopupWithImage from '../components/PopupWithImage.js';
import PopupWithConfirmation from '../components/PopupWithConfirmation.js';

//
const config = {
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__button',
  inactiveButtonClass: 'popup__button_disabled',
  inputErrorClass: 'popup__input_type_error',
  errorClass: 'popup__error_visible'
}
///

//Профиль
const popupAvatar = document.querySelector('#popup-avatar');//попап аватара
const avatarPicture = document.querySelector('.profile__image');//картинка аватара
const profileTitle = document.querySelector('.profile__title');//наименование профиля
const profileSubtitle = document.querySelector('.profile__subtitle');//о профиле
const profileEditAvatar = document.querySelector('.profile__edit-avatar');//переменная кнопки редактирования картинки аватара
const profileEditButton = document.querySelector('.profile__edit-button');//переменная кнопки редактирования профиля

///

//Галерея
const buttonAddPlus = document.querySelector('.profile__add-button');//переменная кнопки добавить место +
///

//Заполняемая секция с изображениями галереи
const galleryContainer = document.querySelector('.gallery');
///

//Попап Профиля
const profilePopup = document.querySelector('#profile-popup');//переменная попап профиля
const profilePopupForm = profilePopup.querySelector('#profile-popup-form');
const nameProfileInput = document.querySelector('.popup__input_item_name-profile-input');//переменная строки ввода "Имя"
const aboutProfileInput = document.querySelector('.popup__input_item_about-profile-input');//переменная строки ввода "О себе"
///

//Попап Галереи
const galleryPopup = document.querySelector('#gallery-popup');//переменная попап галереи
const galleryPopupForm = galleryPopup.querySelector('#gallery-popup-form');
///

//Попап overlay просмотр фото крупно
const galleryOverlay = document.querySelector('#overlay');//переменная попап просмотра фото
///

//Попап подтвердить удаление карточки
const confirmPopup = document.querySelector('#popup-delete-confirm');
///

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
  const card = new Card(element, owner, isLiked, cardSelector, handleCardClick, handleOpenConfirmPopup, handleLikeClick);
  function handleOpenConfirmPopup(evt) {
    const applyConfirm = new PopupWithConfirmation(confirmPopup)
    applyConfirm.open();
    applyConfirm.setEventListeners(() => {
      api.deleteCard(card.getId())
      .then(() => {
        applyConfirm.close()
        card.delCard(evt)
      })
      .catch(err => console.log(`Ошибка при удалении карточки ${err}`));
    });
  }
  return card.createCard();
}

//
function handleLikeClick() {
  if (this.getLikeState()) {

    api.deleteCardLike(this.getId())
      .then(result => {
        this.unlikeCard(result.likes.length);
      })
      .catch(err => console.log(`Ошибка при снятии лайка ${err}`));
  } else {
    api.putCardLike(this.getId())
      .then(result => {
        this.likeCard(result.likes.length);
      })
      .catch(err => console.log(`Ошибка при отправке лайка ${err}`));
  }
}
///

//
api.getUserInfo()
  .then(result => {
    userId = result._id;
    userInfo.setUserInfo({ nameProfile: result.name, aboutProfile: result.about });
    userInfo.setUserAvatar(result.avatar);
  })
  .catch(err => console.log(`Ошибка при получении профиля ${err}`));

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

//
api.getInitialCards()
  .then(result => { cardsSection.renderItems(result) })
  .catch(err => console.log(`Ошибка при получении карточек ${err}`))
///

//Открыть попап просмотра фото в отдельном окне
const popupWithImage = new PopupWithImage(galleryOverlay)
function handleCardClick(img, name) {
  popupWithImage.src = img;
  popupWithImage.alt = name;
  popupWithImage.open();
}
popupWithImage.setEventListeners();
///

//
const userInfo = new Userinfo({ profileNameSelector: profileTitle, profileDescriptionSelector: profileSubtitle, profileAvatarSelector: avatarPicture });
///

//Создаем объекты класса Popup
const profileEditPopup = new PopupWithForm(profilePopup, (inputValues) => {
  api.patchUserInfo(inputValues)
    .then(result => {
      profileEditPopup.close();
      userInfo.setUserInfo({ nameProfile: result.name, aboutProfile: result.about })
    })
    .catch(err => console.log(`Ошибка при обновлении профиля ${err}`));
}, 'Сохранить');
profileEditPopup.setEventListeners();
///

//
const avatarEditPicture = new PopupWithForm(popupAvatar, (inputValues) => {
  api.patchUserAvatar(inputValues)
    .then(result => {
      avatarEditPicture.close();
      avatarPicture.src = result.avatar
    })
    .catch(err => console.log(`Ошибка при обновлении аватара ${err}`));
}, 'Сохранить');
avatarEditPicture.setEventListeners();
///

//
const addElementPopup = new PopupWithForm(galleryPopup, (item) => {
  api.postNewCard(item)
    .then(result => {
      addElementPopup.close();
      cardsSection.setItem(createNewCard({ name: result.name, link: result.link, id: result._id, likes: result.likes.length }, true), "prepend")
    })
    .catch(err => console.log(`Ошибка при добавлении карточки ${err}`));
}, 'Создать')
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