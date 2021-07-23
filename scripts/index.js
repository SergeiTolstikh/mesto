import { FormValidator } from './FormValidator.js';
import { Card } from './Card.js';
import Section from './Section.js';
import {
  initialCards,
  profileEditButton,
  profileTitle,
  profileSubtitle,
  buttonAddPlusButton,
  galleryContainer,
  profilePopup,
  profilePopupForm,
  profilePopupCloseButton,
  nameProfileInput,
  aboutProfileInput,
  galleryPopup,
  galleryPopupForm,
  galleryPopupCloseButton,
  nameGalleryInput,
  urlGalleryInput,
  galleryOverlay,
  galleryOverlayImage,
  galleryOverlayName,
  overlayPopupCloseButton,
  config
} from './constants.js'
//console.log(config)
//
const profileFormValidator = new FormValidator(config, profilePopupForm);
profileFormValidator.enableValidation(); //валидация попап профиля

const cardFormValidator = new FormValidator(config, galleryPopupForm);
cardFormValidator.enableValidation(); //валидация попап галереи
///
/*
///
initialCards.forEach(function (element) {
  const insertCard = createCard(element);
  galleryContainer.append(insertCard);
});
///
*/
//создает экземпляр класса и возвращает карточку
function createCard(element) {
  const card = new Card(element, '.gallery-template', handleOpenPlacePopup);
  //console.log(card.createCard())
  return card.createCard();
  
}
///



/*//создает экземпляр класса и возвращает карточку
function genCard(element) {
  const card = new Card(element, '.gallery-template', handleOpenPlacePopup);
  return card;
}
///*/

const section = new Section ({
  items: initialCards,
  renderer: (element) => {
    //const card = new Card(element, '.gallery-template', handleOpenPlacePopup);
    const cardBlank = createCard(element)
    //console.log(bracard)
    section.setItem(cardBlank);
  }
}, galleryContainer);

section.renderItems();



  //console.log(section)

//Закрыть попап(ы)
function handleClosePopup(namePopup) {
  namePopup.classList.remove('popup_opened');
  document.removeEventListener('keydown', handlePressEsc);
  profileFormValidator.clearInputItems();
  cardFormValidator.clearInputItems();
}
///

//--Закрыть попап кликнув на оверлей
function setClosePopupOverlay() {
  const popupArray = Array.from(document.querySelectorAll('.popup'));
  popupArray.forEach(function (popup) {
    popup.addEventListener('click', (evt) => {
      if (evt.target.classList.contains('popup')) {
        handleClosePopup(popup);
      }
    });
  });
}

setClosePopupOverlay();
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
  const element = {
    name: nameGalleryInput.value,
    link: urlGalleryInput.value
  };
  galleryContainer.prepend(createCard(element)); //в начало контейнера результат работы функции createGalleryCard с параметрами.
  galleryPopup.querySelector('.popup__form').reset();
  handleClosePopup(galleryPopup);
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