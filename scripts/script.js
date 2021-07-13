//import { initialCards } from './initial-сards.js';
import { Card, initialCards } from './Card.js';
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
const profilePopupCloseButton = profilePopup.querySelector('.popup__close'); //переменная кнопки закрыть попап профиля
const nameProfileInput = document.querySelector('.popup__input_item_name-profile-input'); //переменная строки ввода "Имя"
const aboutProfileInput = document.querySelector('.popup__input_item_about-profile-input'); //переменная строки ввода "О себе"
///

//Попап Галереи
const galleryPopup = document.querySelector('#gallery-popup'); //переменная попап галереи
const galleryPopupCloseButton = galleryPopup.querySelector('.popup__close'); //переменная кнопки закрыть попап галереи
const nameGalleryInput = document.querySelector('.popup__input_item_name-gallery-input'); //переменная строки ввода "Название"
const urlGalleryInput = document.querySelector('.popup__input_item_url-gallery-input'); //переменная строки ввода "Ссылка на картинку"
///

//Попап overlay просмотр фото крупно
const galleryOverlay = document.querySelector('#overlay'); //переменная попап просмотра фото
const galleryOverlayImage = document.querySelector('.popup__overlay-picture'); //изображение
const galleryOverlayName = document.querySelector('.popup__overlay-picture-name'); //название изображения
const overlayPopupCloseButton = galleryOverlay.querySelector('.popup__close'); //переменная кнопки закрыть попап overlay
///

//вставка из массива экзепляров карточек
initialCards.forEach(function (element) {
  const insertCard = createCard(element);
  galleryContainer.append(insertCard);
});

//создает экземпляр класса и возвращает карточку
function createCard(element) {
  const card = new Card(element, '.gallery-template', handleOpenPlacePopup);
  return card.createCard();
}

//Закрыть попап(ы)
function handleClosePopup(namePopup) {
  namePopup.classList.remove('popup_opened');
  document.removeEventListener('keydown', handlePressEsc);
}
///

//--Закрыть попап кликнув на оверлей
function handleClosePopupOverlay() {
  const popupArray = Array.from(document.querySelectorAll('.popup'));
  popupArray.forEach(function (popup) {
    popup.addEventListener('click', (evt) => {
      if (evt.target.classList.contains('popup')) {
        handleClosePopup(popup);
      }
    });
  });
}

handleClosePopupOverlay();
//--

//--Закрыть попап нажатием клавиши Esc
function handlePressEsc(evt) {
  if (evt.key === "Escape") {
    const popupActive = document.querySelector('.popup_opened');
    handleClosePopup(popupActive);
  }
}
//--

//Открыть попап(ы)
function handleOpenPopup(namePopup) {
  namePopup.classList.add('popup_opened');
  document.addEventListener('keydown', handlePressEsc);
}
///

//Открыть попап профиля
function handleOpenProfilePopup() {
  handleOpenPopup(profilePopup); //класс открытия + идентификатор попапа профиля
  nameProfileInput.value = profileTitle.textContent;
  aboutProfileInput.value = profileSubtitle.textContent;
}
///

//Открыть попап просмотра фото в отдельном окне
function handleOpenPlacePopup(name, img) {
  handleOpenPopup(galleryOverlay); //класс открытия + идентификатор попапа overlay
  galleryOverlayImage.src = img;
  galleryOverlayImage.alt = name;
  galleryOverlayName.textContent = name;
}
///

//Сохранить попап профиля
function handleSubmitProfile(evt) {
  evt.preventDefault(); //отмену стандартной отправки формы
  profileTitle.textContent = nameProfileInput.value; //введённые значение
  profileSubtitle.textContent = aboutProfileInput.value; //введённые значение                                                                                      
  handleClosePopup(profilePopup);
}
///

//Сохранить попап галереи добавив карточки на страницу
function handleSubmitGallery(evt) { //передать при вызове
  evt.preventDefault(); //Эта строчка отменяет стандартную отправку формы.
  const popupSubmitButton = document.querySelector('#popup-button-gallery');
  const inactiveButtonClass = { inactiveButtonClass: 'popup__button_disabled' };
  const element = {
    name: nameGalleryInput.value,
    link: urlGalleryInput.value
  };
  galleryContainer.prepend(createCard(element)); //в начало контейнера результат работы функции createGalleryCard с параметрами.
  galleryPopup.querySelector('.popup__form').reset();
  handleClosePopup(galleryPopup);
  disablesButton(popupSubmitButton, inactiveButtonClass);
}
///

//Слушатели
profileEditButton.addEventListener('click', handleOpenProfilePopup); //кнопка попап_профиля_открыть
profilePopupCloseButton.addEventListener('click', () => handleClosePopup(profilePopup)); //кнопка попап_профиля_закрыть
profilePopup.addEventListener('submit', handleSubmitProfile); //кнопка попап_профиля_сохранить

buttonAddPlusButton.addEventListener('click', () => handleOpenPopup(galleryPopup)); //кнопка попап_место_открыть
galleryPopupCloseButton.addEventListener('click', () => handleClosePopup(galleryPopup)); //кнопка попап_место_закрыть
galleryPopup.addEventListener('submit', handleSubmitGallery); //кнопка попап_место_сохранить

overlayPopupCloseButton.addEventListener('click', () => handleClosePopup(galleryOverlay)); //кнопка попап_overlay_закрыть
///