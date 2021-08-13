import './index.css';
import { FormValidator } from '../components/FormValidator.js';
import Card from '../components/Card.js';
import Section from '../components/Section.js';
import PopupWithImage from '../components/PopupWithImage.js';
import Userinfo from '../components/UserInfo.js';

import baikalImage from '../images/element-baikal.jpg';
import jakutiaImage from '../images/element-jakutiya.jpg';
import kamchatkaImage from '../images/element-kamchatka.jpg';
import povoljieImage from '../images/element-povoljie.jpg';
import sachalinImage from '../images/element-sachalin.jpg';
import uralImage from '../images/element-ural.jpg';

const initialCards = [
  {
    name: 'Байкал',
    link: baikalImage
  },
  {
    name: 'Якутия',
    link: jakutiaImage
  },
  {
    name: 'Камчатка',
    link: kamchatkaImage
  },
  {
    name: 'Поволжье',
    link: povoljieImage
  },
  {
    name: 'Сахалин',
    link: sachalinImage
  },
  {
    name: 'Урал',
    link: uralImage
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
const buttonAddPlus = document.querySelector('.profile__add-button'); //переменная кнопки добавить место +
///

//Заполняемая секция с изображениями галереи
const galleryContainer = document.querySelector('.gallery');

///

//Попап Профиля
const profilePopup = document.querySelector('#profile-popup'); //переменная попап профиля
const profilePopupForm = profilePopup.querySelector('#profile-popup-form');
const nameProfileInput = document.querySelector('.popup__input_item_name-profile-input'); //переменная строки ввода "Имя"
const aboutProfileInput = document.querySelector('.popup__input_item_about-profile-input'); //переменная строки ввода "О себе"
///

//Попап Галереи
const galleryPopup = document.querySelector('#gallery-popup'); //переменная попап галереи
const galleryPopupForm = galleryPopup.querySelector('#gallery-popup-form');

//Попап overlay просмотр фото крупно
const galleryOverlay = document.querySelector('#overlay'); //переменная попап просмотра фото
///
import PopupWithForm from '../components/PopupWithForm.js';

//
const profileFormValidator = new FormValidator(config, profilePopupForm);
profileFormValidator.enableValidation(); //валидация попап профиля

const cardFormValidator = new FormValidator(config, galleryPopupForm);
cardFormValidator.enableValidation(); //валидация попап галереи
///

//создает экземпляр класса и возвращает карточку
function createNewCard(element) {
  const card = new Card(element, '.gallery-template', handleCardClick);
  return card.createCard();
}
///

//наполняет созданную карточку подставляя параметры
function renderCard(item) {
  const cardBlank = createNewCard({ name: item.name, link: item.link });
  cardsSection.setItem(cardBlank);
}
///

///
const cardsSection = new Section({
  items: initialCards,
  renderer: (item) => {
    renderCard(item)
  }
}, galleryContainer);

cardsSection.renderItems();
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

///
const userInfo = new Userinfo({ profileNameSelector: profileTitle, profileDescriptionSelector: profileSubtitle });
///

//Создаем объекты класса Popup
const profileEditPopup = new PopupWithForm(profilePopup, (inputValues) => {
  userInfo.setUserInfo(inputValues);
});
profileEditPopup.setEventListeners();
///

///
const addElementPopup = new PopupWithForm(galleryPopup, (item) => {
  renderCard(item);
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
buttonAddPlus.addEventListener('click', () => {
  cardFormValidator.clearInputItems();
  addElementPopup.open();
});
///