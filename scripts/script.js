//Профиль
const ProfileEditButton = document.querySelector('.profile__edit-button'); //переменная кнопки редактирования профиля
const ProfileTitle = document.querySelector('.profile__title'); //переменная наименования профиля
const ProfileSubtitle = document.querySelector('.profile__subtitle'); //переменная описания профиля
///

//Попап Профиля
const ProfilePopup = document.querySelector('#profile-popup'); //переменная попап профиля
const CloseProfilePopup = document.querySelector('#close-profile-popup'); //переменная кнопки закрыть попап профиля
const NameProfileInput = document.querySelector('.popup__input_item_name-profile-input'); //переменная строки ввода "Имя"
const AboutProfileInput = document.querySelector('.popup__input_item_about-profile-input'); //переменная строки ввода "О себе"
///

//Галерея 
const AddButtonPlus = document.querySelector('.profile__add-button'); //переменная кнопки добавить место +
///

//Попап Галереи
const GalleryPopup = document.querySelector('#gallery-popup'); //переменная попап галереи
const CloseGalleryPopup = document.querySelector('#close-gallery-popup'); //переменная кнопки закрыть попап галереи
const NameGalleryInput = document.querySelector('.popup__input_item_name-gallery-input'); //переменная строки ввода "Название"
const UrlGalleryInput = document.querySelector('.popup__input_item_url-gallery-input'); //переменная строки ввода "Ссылка на картинку"
const GalleryContainer = document.querySelector('.gallery'); //переменная заполняемой секции с изображениями галереи
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
function ClosePopup(evt) {
  evt.target.closest('.popup').classList.remove('popup_opened');
}
///

//Открыть попап профиля
function OpenProfilePopup() {
  ProfilePopup.classList.add('popup_opened'); //присвоение класса с css свойствами открытия попап
  NameProfileInput.value = ProfileTitle.textContent; //присвоение значений по умолчанию из переменной наименования профиля
  AboutProfileInput.value = ProfileSubtitle.textContent; //присвоение значений по умолчанию из переменной описания профиля
}
///

//Сохранить попап профиля
function ProfileSubmitHundler(evt) {
  evt.preventDefault(); //Эта строчка отменяет стандартную отправку формы.
  ProfileTitle.textContent = (NameProfileInput.value); //присвоение перемнной наименования профиля введенных значений
  ProfileSubtitle.textContent = (AboutProfileInput.value); //присвоение перемнной описания профиля введенных значений                                                                                      
  ClosePopup(evt); //вызов функции закрыть попап
}
///

//Открыть попап галереи
function OpenPopupPlace(placename, urlpicture) {
  GalleryPopup.classList.add('popup_opened'); //присвоение класса с css свойствами открытия попап
  UrlGalleryInput.setAttribute('src', `${urlpicture}`); //присвоение атрибута ссылки со значением из шаблонной строки равной "Ссылка на картинку"
  UrlGalleryInput.setAttribute('alt', `${placename}`); //присвоение атрибута альтернативного текста со значением из шаблонной строки равной "Название"
  NameGalleryInput.textContent = placename; //присвоение текстового значения для "Название"
}
///

//Открыть изображение из галереи
/*function ZoomGalleryPicture();*/

///

//Сохранить попап галереи
function GallerySubmitHundler(evt) {
  evt.preventDefault(); //Эта строчка отменяет стандартную отправку формы.
  GalleryContainer.prepend(CreateGalleryCard(NameGalleryInput.value, UrlGalleryInput.value)); //поставить в начало контейнера результат работы функции CreateGalleryCard с аргументами по умолчанию
  NameGalleryInput.value = ''; //агрумент в поле ("Название")
  UrlGalleryInput.value = ''; //агрумент в поле ("Ссылка на Картинку")
  ClosePopup(evt); //вызов функции закрыть попап
}
///

//Добавить объекты в галерею
function CreateGalleryCard(placeTitle, placeImageLink) { //функция добавления элементов в галерею
  const GalleryTemplate = document.querySelector('.gallery-template').content; //заготовки вёрстки
  const GalleryElement = GalleryTemplate.querySelector('.gallery__card').cloneNode(true); //клонирование содержимого заготовки верстки
  
  GalleryElement.querySelector('.gallery__image').setAttribute('src', `${placeImageLink}`); //присвоение атрибута ссылки с переданным аргументом
  GalleryElement.querySelector('.gallery__image').setAttribute('alt', `${placeTitle}`); //присвоение атрибута альтернативного текста с переданным аргументом
  GalleryElement.querySelector('.gallery__text').textContent = placeTitle; //присвоение текстового значения 
  
  GalleryElement.querySelector('.gallery__like').addEventListener('click', function (evt) { //слушатель нажатия лайк карточки
    evt.target.classList.toggle('gallery__like_on'); //переключение класса при нажатии на объект
  });
  
    GalleryElement.querySelector('.gallery__delete-card').addEventListener('click', function (evt) { //служатель нажатия удалить карточку
      evt.target.closest('.gallery__card').remove(); //удаление класса при нажатии на объект
    });
  /*
    GalleryElement.querySelector('.gallery__image').addEventListener('click', function (evt) {
      ZoomGalleryPicture(evt.target.getAttribute('src'), evt.target.getAttribute('alt'));
    });
*/
    return GalleryElement;
}
///

//Добавить карточки массива на страницу при её загрузке
initialCards.forEach(function(item) {// функция добавления методом перебора массива карточек на страницу при её загрузке
  GalleryContainer.append(CreateGalleryCard(item.name, item.link)); //добавить в конец галереи перебранные карточки массива
});
///

//Слушатели
ProfileEditButton.addEventListener('click', OpenProfilePopup); //кнопка попап_профиля_открыть
CloseProfilePopup.addEventListener('click', ClosePopup); //кнопка попап_профиля_закрыть
ProfilePopup.addEventListener('submit', ProfileSubmitHundler); //кнопка попап_профиля_сохранить

AddButtonPlus.addEventListener('click', OpenPopupPlace); //кнопка попап_место_открыть
CloseGalleryPopup.addEventListener('click', ClosePopup); //кнопка попап_место_закрыть
GalleryPopup.addEventListener('submit', GallerySubmitHundler); //кнопка попап_место_сохранить
///

