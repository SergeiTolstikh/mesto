//
export const config = {
    formSelector: '.popup__form',
    inputSelector: '.popup__input',
    submitButtonSelector: '.popup__button',
    inactiveButtonClass: 'popup__button_disabled',
    inputErrorClass: 'popup__input_type_error',
    errorClass: 'popup__error_visible'
  }
  ///
  
  //Профиль
  export const popupAvatar = document.querySelector('#popup-avatar');//попап аватара
  export const avatarPicture = document.querySelector('.profile__image');//картинка аватара
  export const profileTitle = document.querySelector('.profile__title');//наименование профиля
  export const profileSubtitle = document.querySelector('.profile__subtitle');//о профиле
  export const profileEditAvatar = document.querySelector('.profile__edit-avatar');//переменная кнопки редактирования картинки аватара
  export const profileEditButton = document.querySelector('.profile__edit-button');//переменная кнопки редактирования профиля
  
  ///
  
  //Галерея
  export const buttonAddPlus = document.querySelector('.profile__add-button');//переменная кнопки добавить место +
  ///
  
  //Заполняемая секция с изображениями галереи
  export const galleryContainer = document.querySelector('.gallery');
  ///
  
  //Попап Профиля
  export const profilePopup = document.querySelector('#profile-popup');//переменная попап профиля
  export const profilePopupForm = profilePopup.querySelector('#profile-popup-form');
  export const nameProfileInput = document.querySelector('.popup__input_item_name-profile-input');//переменная строки ввода "Имя"
  export const aboutProfileInput = document.querySelector('.popup__input_item_about-profile-input');//переменная строки ввода "О себе"
  export const avatarProfileInput = document.querySelector('#popup__avatar-input')
  export const submitAvatar = document.querySelector('#popup-button-avatar')
  export const submitGallery = document.querySelector('#popup-button-gallery')
  export const submitProfile = document.querySelector('#popup-button-profile')
  ///
  
  //Попап Галереи
  export const galleryPopup = document.querySelector('#gallery-popup');//переменная попап галереи
  export const galleryPopupForm = galleryPopup.querySelector('#gallery-popup-form');
  ///
  
  //Попап overlay просмотр фото крупно
  export const galleryOverlay = document.querySelector('#overlay');//переменная попап просмотра фото
  ///
  
  //Попап подтвердить удаление карточки
  export const confirmPopup = document.querySelector('#popup-delete-confirm');
  ///
  
  //
  export const userData = {
    name: '.profile__title',
    job: '.profile__subtitle',
    avatar:'.profile__image'
};