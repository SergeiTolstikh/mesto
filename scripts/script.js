//набор переменных необходимых для работы попапа\/
let formElement = document.querySelector('.popup') //попап
let nameInput = document.querySelector('.popup__input_item_name') //попап Имя
let jobInput = document.querySelector('.popup__input_item_aboutmyself') //попап О себе
let editButton = document.querySelector('.custo__edit-button'); //кнопка включения редактирования профиля
let profile = document.querySelector('.custo__title'); //поле редактирования профиля "Имя"
let subprofile = document.querySelector('.custo__subtitle'); //поле редактирования "О себе"
let closeButton = document.querySelector('.popup__close'); //кнопка закрытия попапа

//функция открытие попапа\/
function openpopup() {
    formElement.classList.add('popup_opened'); //поДключить класс со свойством display: none
    nameInput.value = profile.textContent;
    jobInput.value = subprofile.textContent;
}

//функция попап сохранить
function formSubmitHandler (evt) {
    evt.preventDefault();                 // Эта строчка отменяет стандартную отправку формы.
    profile.textContent = (nameInput.value);
    subprofile.textContent = (jobInput.value);                                                                                           
    closepopup();   
}

//функция попап закрыть без сохранения\/
function closepopup() {
    formElement.classList.remove('popup_opened'); //оТключить класс со свойством display: none
}

//слушатели\/
closeButton.addEventListener('click', closepopup); //кнопка попап__закрыть
editButton.addEventListener('click', openpopup); //кнопка попап__открыть
formElement.addEventListener('submit', formSubmitHandler); //кнопка попап__сохранить
