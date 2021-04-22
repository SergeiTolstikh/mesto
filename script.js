//набор переменных необходимых для работы попапа
let editButton = document.querySelector('.custo__edit-button'); //кнопка включения редактирования профиля
let profile = document.querySelector('.custo__title'); //поле редактирования профиля "Имя"
let subprofile = document.querySelector('.custo__subtitle'); //поле редактирования "О себе"
let closeButton = document.querySelector('.popup__close'); //кнопка закрытия попапа
let savebutton = document.querySelector('.popup__button-sbmt');

//функция открытие попапа\/
function openpopup() {
    formElement.classList.add('popup_opened'); //поДключить класс со свойством display: none
    nameInput.value = (profile.textContent);
    jobInput.value = (subprofile.textContent);
}
editButton.addEventListener('click', openpopup);

//переменные и функция внесение данных в попап\/

// Находим форму в DOM
let formElement = document.querySelector('.popup') // Воспользуйтесь методом querySelector()
// Находим поля формы в DOM
let nameInput = document.querySelector('.popup__item_name') // Воспользуйтесь инструментом .querySelector()
let jobInput = document.querySelector('.popup__item_aboutmyself')  // Воспользуйтесь инструментом .querySelector()

// Обработчик «отправки» формы, хотя пока
// она никуда отправляться не будет
function formSubmitHandler (evt) {
    evt.preventDefault(); // Эта строчка отменяет стандартную отправку формы.
                                                // Так мы можем определить свою логику отправки.
                                                // О том, как это делать, расскажем позже.

    profile.textContent = (nameInput.value);
    subprofile.textContent = (jobInput.value);  // Получите значение полей jobInput и nameInput из свойства value

                                                // Выберите элементы, куда должны быть вставлены значения полей

                                                // Вставьте новые значения с помощью textContent
    formElement.classList.remove('popup_opened');
    
}

// Прикрепляем обработчик к форме:
// он будет следить за событием “submit” - «отправка»
formElement.addEventListener('submit', formSubmitHandler);


//функция закрытия попапа без сохранения\/
function closepopup() {
    formElement.classList.remove('popup_opened'); //оТключить класс со свойством display: none
}
closeButton.addEventListener('click', closepopup);


//лайк\/
let likeButton = document.querySelector('.gallery__like');
function Like() {
    likeButton.classList.add('gallery__like_on');
}

likeButton.addEventListener('click', Like);


//console.log(profile.textContent);