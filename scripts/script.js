//Профиль
const profileEditButton = document.querySelector('.profile__edit-button'); //переменная кнопки редактирования профиля
const profileTitle = document.querySelector('.profile__title'); //переменная наименования профиля
const profileSubtitle = document.querySelector('.profile__subtitle'); //переменная описания профиля
///

//Попап Профиля
const profilePopup = document.querySelector('#profile-popup'); //переменная попап профиля
const profilePopupCloseButton = document.querySelector('#close-profile-popup'); //переменная кнопки закрыть попап профиля
const nameProfileInput = document.querySelector('.popup__input_item_name-profile-input'); //переменная строки ввода "Имя"
const aboutProfileInput = document.querySelector('.popup__input_item_about-profile-input'); //переменная строки ввода "О себе"
///

//Галерея 
const buttonAddPlusButton = document.querySelector('.profile__add-button'); //переменная кнопки добавить место +
///

//Попап Галереи
const galleryPopup = document.querySelector('#gallery-popup'); //переменная попап галереи
const galleryPopupCloseButton = document.querySelector('#close-gallery-popup'); //переменная кнопки закрыть попап галереи
const nameGalleryInput = document.querySelector('.popup__input_item_name-gallery-input'); //переменная строки ввода "Название"
const urlGalleryInput = document.querySelector('.popup__input_item_url-gallery-input'); //переменная строки ввода "Ссылка на картинку"
const galleryContainer = document.querySelector('.gallery'); //переменная заполняемой секции с изображениями галереи
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

//Закрыть попап(ы)
function closePopup(evt) {
  evt.target.closest('.popup').classList.remove('popup_opened');
}
///

//Открыть попап профиля
function openProfilePopup() {
  profilePopup.classList.add('popup_opened'); //присвоение класса с css свойствами открытия попап
  nameProfileInput.value = profileTitle.textContent; //присвоение значений по умолчанию из переменной наименования профиля
  aboutProfileInput.value = profileSubtitle.textContent; //присвоение значений по умолчанию из переменной описания профиля
}
///

//Сохранить попап профиля
function submitProfileHundler(evt) {
  evt.preventDefault(); //Эта строчка отменяет стандартную отправку формы.
  profileTitle.textContent = (nameProfileInput.value); //присвоение перемнной наименования профиля введенных значений
  profileSubtitle.textContent = (aboutProfileInput.value); //присвоение перемнной описания профиля введенных значений                                                                                      
  closePopup(evt); //вызов функции закрыть попап
}
///

//Открыть попап галереи
function openPopupGallery(placename, urlpicture) {
  galleryPopup.classList.add('popup_opened'); //присвоение класса с css свойствами открытия попап
  urlGalleryInput.setAttribute('src', `${urlpicture}`); //присвоение атрибута ссылки со значением из шаблонной строки равной "Ссылка на картинку"
  urlGalleryInput.setAttribute('alt', `${placename}`); //присвоение атрибута альтернативного текста со значением из шаблонной строки равной "Название"
  nameGalleryInput.textContent = placename; //присвоение текстового значения для "Название"
}
///

//Открыть изображение из галереи
/*function ZoomGalleryPicture();*/

///

//Сохранить попап галереи
function submitGalleryHandler(evt) {
  evt.preventDefault(); //Эта строчка отменяет стандартную отправку формы.
  galleryContainer.prepend(createGalleryCard(nameGalleryInput.value, urlGalleryInput.value)); //поставить в начало контейнера результат работы функции createGalleryCard с аргументами по умолчанию
  nameGalleryInput.value = ''; //агрумент в поле ("Название")
  urlGalleryInput.value = ''; //агрумент в поле ("Ссылка на Картинку")
  closePopup(evt); //вызов функции закрыть попап
}
///

//функция нажатия лайк карточки
function pushLike(evt) { //переключение класса при нажатии на выбранный объект
  evt.target.classList.toggle('gallery__like_on')
};
///

//функция удалить удалить карточку
function deleteCard(evt) { 
  evt.target.closest('.gallery__card').remove(); //удаление класса при нажатии на выбранный объект
};
///

const galleryTemplate = document.querySelector('.gallery-template').content; //заготовка вёрстки
const galleryCard = galleryTemplate.querySelector('.gallery__card') //содержимое заготовки верстки
 

function createGalleryCard(placeTitle, placeImageLink) { //функция добавления элементов в галерею
  const newGalleryCard = galleryCard.cloneNode(true); //клонирование содержимого заготовки верстки
  newGalleryCard.querySelector('.gallery__image').setAttribute('src', `${placeImageLink}`); //присвоение атрибута ссылки с переданным аргументом;
  newGalleryCard.querySelector('.gallery__image').setAttribute('alt', `${placeTitle}`); //присвоение атрибута альтернативного текста с переданным аргументом
  newGalleryCard.querySelector('.gallery__text').textContent = placeTitle; //присвоение текстового значения ;
  
  newGalleryCard.querySelector('.gallery__like').addEventListener('click', pushLike); //слушатель нажатия лайка
  newGalleryCard.querySelector('.gallery__delete-card').addEventListener('click', deleteCard); //слушатель нажатия корзины
  
  return newGalleryCard;
}


//Добавить карточки массива на страницу при её загрузке
initialCards.forEach(function(item) {// функция добавления методом перебора массива карточек на страницу при её загрузке
  galleryContainer.append(createGalleryCard(item.name, item.link)); //добавить в конец галереи перебранные карточки массива
});
///

//Слушатели
profileEditButton.addEventListener('click', openProfilePopup); //кнопка попап_профиля_открыть
profilePopupCloseButton.addEventListener('click', closePopup); //кнопка попап_профиля_закрыть
profilePopup.addEventListener('submit', submitProfileHundler); //кнопка попап_профиля_сохранить

buttonAddPlusButton.addEventListener('click', openPopupGallery); //кнопка попап_место_открыть
galleryPopupCloseButton.addEventListener('click', closePopup); //кнопка попап_место_закрыть
galleryPopup.addEventListener('submit', submitGalleryHandler); //кнопка попап_место_сохранить
///

