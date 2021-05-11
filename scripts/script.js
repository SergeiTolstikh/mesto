//набор переменных необходимых для работы попапа\/
const formElementProfile = document.querySelector('#popup-profile') //попап профиля
const nameInput = document.querySelector('.popup__input_item_name') //попап Имя
const jobInput = document.querySelector('.popup__input_item_aboutmyself') //попап О себе
const editButton = document.querySelector('.custo__edit-button'); //кнопка включения редактирования профиля
const profile = document.querySelector('.custo__title'); //поле редактирования профиля "Имя"
const subprofile = document.querySelector('.custo__subtitle'); //поле редактирования "О себе"
const closeButton = document.querySelector('#closePopProf'); //кнопка закрытия попапа

const formElementPlace = document.querySelector('#popup-card'); //попап добавить место
const addButton = document.querySelector('.custo__add-button'); //кнопка добавить место
const closePlaceButton = document.querySelector('#closePopPlace'); //кнопка закрыть попап место без сохранения

//функция открытие попапа профиля\/
function OpenpopupProfile() {
    formElementProfile.classList.add('popup_opened'); //поДключить класс со свойством display: none
    nameInput.value = profile.textContent;
    jobInput.value = subprofile.textContent;
}

//функция открытие попапа место\/
function OpenpopupPlace() {
    formElementPlace.classList.add('popup_opened');
}

//функция попап профиля сохранить
function formSubmitHandler (evt) {
    evt.preventDefault(); // Эта строчка отменяет стандартную отправку формы.
    profile.textContent = (nameInput.value);
    subprofile.textContent = (jobInput.value);                                                                                           
    ClosepopupProfile();
}

//функция попап профиля закрыть без сохранения\/
function ClosepopupProfile() {
    formElementProfile.classList.remove('popup_opened'); //оТключить класс со свойством display: none
}

//функция попап место закрыть без сохранения\/
function ClosepopupPlace() {
    formElementPlace.classList.remove('popup_opened'); //оТключить класс со свойством display: none
}

//слушатели\/
closeButton.addEventListener('click', ClosepopupProfile); //кнопка попап_профиля_закрыть
editButton.addEventListener('click', OpenpopupProfile); //кнопка попап_профиля_открыть
formElementProfile.addEventListener('submit', formSubmitHandler); //кнопка попап_профиля_сохранить


addButton.addEventListener('click', OpenpopupPlace); //кнопка попап_место_открыть
closePlaceButton.addEventListener('click', ClosepopupPlace); //кнопка попап_место_закрыть
