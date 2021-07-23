export const initialCards = [
    {
        name: 'Архыз',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg'
    },
    {
        name: 'Челябинская область',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg'
    },
    {
        name: 'Иваново',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg'
    },
    {
        name: 'Камчатка',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg'
    },
    {
        name: 'Холмогорский район',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg'
    },
    {
        name: 'Байкал',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg'
    }
];

///---
export const config = {
    formSelector: '.popup__form',
    inputSelector: '.popup__input',
    submitButtonSelector: '.popup__button',
    inactiveButtonClass: 'popup__button_disabled',
    inputErrorClass: 'popup__input_type_error',
    errorClass: 'popup__error_visible'
  }
  ///---
  
  //Профиль
  export const profileEditButton = document.querySelector('.profile__edit-button'); //переменная кнопки редактирования профиля
  export const profileTitle = document.querySelector('.profile__title'); //переменная наименования профиля
  export const profileSubtitle = document.querySelector('.profile__subtitle'); //переменная описания профиля
  ///
  
  //Галерея
  export const buttonAddPlusButton = document.querySelector('.profile__add-button'); //переменная кнопки добавить место +
  ///
  
  //Заполняемая секция с изображениями галереи
  export const galleryContainer = document.querySelector('.gallery');
  ///
  
  //Попап Профиля
  export const profilePopup = document.querySelector('#profile-popup'); //переменная попап профиля
  export const profilePopupForm = profilePopup.querySelector('#profile-popup-form');
  export const profilePopupCloseButton = profilePopup.querySelector('.popup__close'); //переменная кнопки закрыть попап профиля
  export const nameProfileInput = document.querySelector('.popup__input_item_name-profile-input'); //переменная строки ввода "Имя"
  export const aboutProfileInput = document.querySelector('.popup__input_item_about-profile-input'); //переменная строки ввода "О себе"
  ///
  
  //Попап Галереи
  export const galleryPopup = document.querySelector('#gallery-popup'); //переменная попап галереи
  export const galleryPopupForm = galleryPopup.querySelector('#gallery-popup-form');
  export const galleryPopupCloseButton = galleryPopup.querySelector('.popup__close'); //переменная кнопки закрыть попап галереи
  export const nameGalleryInput = document.querySelector('.popup__input_item_name-gallery-input'); //переменная строки ввода "Название"
  export const urlGalleryInput = document.querySelector('.popup__input_item_url-gallery-input'); //переменная строки ввода "Ссылка на картинку"
  ///
  
  //Попап overlay просмотр фото крупно
  export const galleryOverlay = document.querySelector('#overlay'); //переменная попап просмотра фото
  export const galleryOverlayImage = document.querySelector('.popup__overlay-picture'); //изображение
  export const galleryOverlayName = document.querySelector('.popup__overlay-picture-name'); //название изображения
  export const overlayPopupCloseButton = galleryOverlay.querySelector('.popup__close'); //переменная кнопки закрыть попап overlay
  ///