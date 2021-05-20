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
const galleryOverlayImage = document.querySelector('.overlay__picture'); //изображение
const galleryOverlayName = document.querySelector('.overlay__picture-name'); //название изображения
const overlayPopupCloseButton = galleryOverlay.querySelector('.popup__close'); //переменная кнопки закрыть попап overlay
///

//Массив изображений для галереи
const initialCards = [
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
///

//функция добавления элементов в галерею вариант №1
function createGalleryCard(placeTitle, placeImageLink) { 
  const galleryTemplate = document.querySelector('.gallery-template').content;//заготовка вёрстки контент внутри template
  const galleryCard = galleryTemplate.querySelector('.gallery__card').cloneNode(true);//клонирование содержимого заготовки верстки
  
  galleryCard.querySelector('.gallery__image').setAttribute('src', `${placeImageLink}`);
  galleryCard.querySelector('.gallery__image').setAttribute('alt', `${placeTitle}`);
  galleryCard.querySelector('.gallery__text').textContent = placeTitle;
  
  galleryCard.querySelector('.gallery__like').addEventListener('click', pushLike);//слушатель нажатия лайка
  galleryCard.querySelector('.gallery__delete-card').addEventListener('click', deleteCard);//слушатель нажатия корзины
  galleryCard.querySelector('.gallery__image').addEventListener('click', function(evt) {//слушатель открытия просмотра фотографии крупным планом
    openPlacePopup(evt.target.getAttribute('src'), evt.target.getAttribute('alt'));//запускаю функцию открытия попап, передаю ей в качестве параметров атрибуты со значаниями из кликнутого изображения
  }) 
  
  return galleryCard;
}
///

/*
//функция добавления элементов в галерею вариант №2
const galleryTemplate = document.querySelector('.gallery-template').content; //заготовка вёрстки контент внутри template
const galleryCard = galleryTemplate.querySelector('.gallery__card');

function createGalleryCard(placeTitle, placeImageLink) { //функция добавления элементов в галерею
  const galleryCloneCard = galleryCard.cloneNode(true); //клонирование содержимого заготовки верстки
  const galleryImage = galleryCloneCard.querySelector('.gallery__image');
  const galleryText = galleryCloneCard.querySelector('.gallery__text');
  const galleryLike = galleryCloneCard.querySelector('.gallery__like');
  const galleryImgDel = galleryCloneCard.querySelector('.gallery__delete-card');
  galleryImage.src = placeImageLink;
  galleryImage.alt = placeTitle;
  galleryText.textContent = placeTitle;
  
  galleryLike.addEventListener('click', pushLike); //слушатель нажатия лайка
  galleryImgDel.addEventListener('click', deleteCard); //слушатель нажатия корзины
  
  galleryImage.addEventListener('click', function(evt) { //слушатель открытия просмотра фотографии крупным планом
    openPlacePopup(evt.target.getAttribute('src'), evt.target.getAttribute('alt'));
  }) 
  
  return galleryCloneCard;
}
///
*/

//Добавляет карточки на страницу при загрузке страницы
initialCards.forEach(function(item) {//перебрать массив
  galleryContainer.append(createGalleryCard(item.name, item.link)); //добавить в конец массива карточки 
});
///

//Поставить/удалить лайк карточки
function pushLike(evt) {
  evt.target.classList.toggle('gallery__like_on') //подключение/отключение класса при нажатии на выбранный объект
};
///

//Удалить карточку
function deleteCard(evt) { //передать слушателю нажатия корзины удаленный блок
  evt.target.closest('.gallery__card').remove();
};
///

//Закрыть попап(ы)
function closePopup(evt) { //пердать попап удалив класс открытия попап
  evt.target.closest('.popup').classList.remove('popup_opened');
}
///

//Открыть попап(ы)
function openPopup(namePopup) {
namePopup.classList.add('popup_opened');
}
///

//Открыть попап профиля
function openProfilePopup() {
  openPopup(profilePopup); //класс открытия + идентификатор попапа профиля
  nameProfileInput.value = profileTitle.textContent;
  aboutProfileInput.value = profileSubtitle.textContent;
}
///

//Открыть попап галереи
function openPopupGallery(img, name) {
  openPopup(galleryPopup); //класс открытия + идентификатор попапа галереи
  urlGalleryInput.src = img;
  urlGalleryInput.alt = name;
  nameGalleryInput.textContent = name;
}
///

//Открыть попап просмотра фото в отдельном окне
function openPlacePopup (img, name) {
  openPopup(galleryOverlay); //класс открытия + идентификатор попапа overlay
  galleryOverlayImage.src = img;
  galleryOverlayImage.alt= name;
  galleryOverlayName.textContent = name;
}
///

//Сохранить попап профиля
function submitProfileHundler(evt) {
  evt.preventDefault(); //отмену стандартной отправки формы
  profileTitle.textContent = (nameProfileInput.value);//введённые значение
  profileSubtitle.textContent = (aboutProfileInput.value);//введённые значение                                                                                      
  closePopup(evt);
}
///

//Сохранить попап галереи добавив карточки на страницу
function submitGalleryHandler(evt) { //передать при вызове
  evt.preventDefault(); //Эта строчка отменяет стандартную отправку формы.
  galleryContainer.prepend(createGalleryCard(nameGalleryInput.value, urlGalleryInput.value)); //в начало контейнера результат работы функции createGalleryCard с параметрами.
  nameGalleryInput.value = '';
  urlGalleryInput.value = '';
  closePopup(evt);
}
///

//Слушатели
profileEditButton.addEventListener('click', openProfilePopup); //кнопка попап_профиля_открыть
profilePopupCloseButton.addEventListener('click', closePopup); //кнопка попап_профиля_закрыть
profilePopup.addEventListener('submit', submitProfileHundler); //кнопка попап_профиля_сохранить

buttonAddPlusButton.addEventListener('click', openPopupGallery); //кнопка попап_место_открыть
galleryPopupCloseButton.addEventListener('click', closePopup); //кнопка попап_место_закрыть
galleryPopup.addEventListener('submit', submitGalleryHandler); //кнопка попап_место_сохранить

overlayPopupCloseButton.addEventListener('click', closePopup); //кнопка попап_overlay_закрыть
///

