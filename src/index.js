import './style/index.css';
import { FormValidator } from './scripts/FormValidator.js';
import Card from './scripts/Card.js';
import Section from './scripts/Section.js';
import PopupWithImage from './scripts/PopupWithImage.js';
import Userinfo from './scripts/UserInfo.js';

import baikalimage from './image/element-baikal.jpg';
import jakutiaimage from './image/element-jakutiya.jpg';
import kamchatka from './image/element-kamchatka.jpg';
import povoljie from './image/element-povoljie.jpg';
import sachalin from './image/element-sachalin.jpg';
import ural from './image/element-ural.jpg';

const initialCards = [
  {
    name: 'Байкал',
    link: baikalimage
  },
  {
    name: 'Якутия',
    link: jakutiaimage
  },
  {
    name: 'Камчатка',
    link: kamchatka
  },
  {
    name: 'Поволжье',
    link: povoljie
  },
  {
    name: 'Сахалин',
    link: sachalin
  },
  {
    name: 'Урал',
    link: ural
  }
];

///---
const config = {
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__button',
  inactiveButtonClass: 'popup__button_disabled',
  inputErrorClass: 'popup__input_type_error',
  errorClass: 'popup__error_visible'
}
///---

//Профиль
const profileEditButton = document.querySelector('.profile__edit-button'); //переменная кнопки редактирования профиля
const profileTitle = document.querySelector('.profile__title'); //переменная наименования профиля
const profileSubtitle = document.querySelector('.profile__subtitle'); //переменная описания профиля
///

//Галерея
const buttonAddPlusButton = document.querySelector('.profile__add-button'); //переменная кнопки добавить место +
///

//Заполняемая секция с изображениями галереи
const galleryContainer = document.querySelector('.gallery');

///

//Попап Профиля
const profilePopup = document.querySelector('#profile-popup'); //переменная попап профиля
const profilePopupForm = profilePopup.querySelector('#profile-popup-form');
//const profilePopupCloseButton = profilePopup.querySelector('.popup__close'); //переменная кнопки закрыть попап профиля
const nameProfileInput = document.querySelector('.popup__input_item_name-profile-input'); //переменная строки ввода "Имя"
const aboutProfileInput = document.querySelector('.popup__input_item_about-profile-input'); //переменная строки ввода "О себе"
///

//Попап Галереи
const galleryPopup = document.querySelector('#gallery-popup'); //переменная попап галереи
const galleryPopupForm = galleryPopup.querySelector('#gallery-popup-form');
//const galleryPopupCloseButton = galleryPopup.querySelector('.popup__close'); //переменная кнопки закрыть попап галереи
//const nameGalleryInput = document.querySelector('.popup__input_item_name-gallery-input'); //переменная строки ввода "Название"
//const urlGalleryInput = document.querySelector('.popup__input_item_url-gallery-input'); //переменная строки ввода "Ссылка на картинку"
///

//Попап overlay просмотр фото крупно
const galleryOverlay = document.querySelector('#overlay'); //переменная попап просмотра фото
//const galleryOverlayImage = document.querySelector('.popup__overlay-picture'); //изображение
//const galleryOverlayName = document.querySelector('.popup__overlay-picture-name'); //название изображения
//const overlayPopupCloseButton = galleryOverlay.querySelector('.popup__close'); //переменная кнопки закрыть попап overlay
///
import PopupWithForm from './scripts/PopupWithForm.js';

//
const profileFormValidator = new FormValidator(config, profilePopupForm);
profileFormValidator.enableValidation(); //валидация попап профиля

const cardFormValidator = new FormValidator(config, galleryPopupForm);
cardFormValidator.enableValidation(); //валидация попап галереи
///

//создает экземпляр класса и возвращает карточку
function createCard(element) {
  const card = new Card({ name: element.name, link: element.link }, '.gallery-template', handleCardClick);
  return card.createCard();

}
///

///
const section = new Section({
  items: initialCards,
  renderer: (element) => {
    const cardBlank = createCard(element)
    section.setItem(cardBlank);
  }
}, galleryContainer);

section.renderItems();
///

//Открыть попап просмотра фото в отдельном окне
function handleCardClick(img, name) {
  const popupWithImage = new PopupWithImage({ src: img, alt: name }, galleryOverlay)
  popupWithImage.setEventListeners();
  popupWithImage.open();
}
///

///
const userInfo = new Userinfo({ profileNameSelector: profileTitle, profileDescriptionSelector: profileSubtitle });
///

//Создаем объекты класса Popup
const profileEditPopup = new PopupWithForm(profilePopup, (inputValues) => {
  userInfo.setUserInfo(inputValues);
  console.log(profileEditPopup);
  profileEditPopup.close();
});
profileEditPopup.setEventListeners();
///

///
const addElementPopup = new PopupWithForm(galleryPopup, (values) => {
  const addCard = createCard({ name: values.NamePlace, link: values.PictureURL });

  const galleryText = addCard.querySelector('.gallery__text');
  galleryText.textContent = values.NamePlace;

  section.setItem(addCard);

  addElementPopup.close();
})

addElementPopup.setEventListeners();
///

///
profileEditButton.addEventListener('click', () => {
  profileFormValidator.clearInputItems();
  const profileData = userInfo.getUserInfo();
  nameProfileInput.value = profileData.name;
  aboutProfileInput.value = profileData.description;

  profileEditPopup.open();
});
///

///
buttonAddPlusButton.addEventListener('click', () => {
  cardFormValidator.clearInputItems();
  addElementPopup.open();
});
///