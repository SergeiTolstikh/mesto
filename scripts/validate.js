//Показать ошибку поля ввода
const showInputError = (formSelector, inputElement, errorMessage, obj) => {
  const errorElement = formSelector.querySelector(`.${inputElement.id}-error`);
  inputElement.classList.add(obj.inputErrorClass);
  errorElement.textContent = errorMessage; //Заменим содержимое span с ошибкой на переданный параметр
  errorElement.classList.add(obj.errorClass);
};
//Скрыть ошибку поля ввода
const hideInputError = (formSelector, inputElement, obj) => {
  const errorElement = formSelector.querySelector(`.${inputElement.id}-error`);
  inputElement.classList.remove(obj.inputErrorClass);
  errorElement.classList.remove(obj.errorClass);
  errorElement.textContent = ''; //Очистим ошибку
};

//Запустить показ ошибки если поле не валидно или скрытьб если валидно
const isValid = (formSelector, inputElement, obj) => {
  if (!inputElement.validity.valid) {
    showInputError(formSelector, inputElement, inputElement.validationMessage, obj);
  } else {
    hideInputError(formSelector, inputElement, obj);
  }
};

const setEventListeners = (formSelector, obj) => {
  const inputList = Array.from(formSelector.querySelectorAll(obj.inputSelector)); //Создать массив из найденных полей воода
  const buttonElement = formSelector.querySelector(obj.submitButtonSelector); //Кнопка submit
  toggleButtonState(inputList, buttonElement, obj); //Вызов функции состояния кнопки submit сразу после загрузки страницы
  inputList.forEach((inputElement) => { //Переберём каждый элемент массива полей ввода
    inputElement.addEventListener('input', () => { //Каждому полю добавим обработчик события input
      isValid(formSelector, inputElement, obj); //Внутри колбэка вызовем isValid, передав ей форму и проверяемый элемент
      toggleButtonState(inputList, buttonElement, obj); //Проверим состояние кнопки сразу после загрузки страницы
    });
  });
};

const enableValidation = (obj) => {
  const formList = Array.from(document.querySelectorAll(obj.formSelector)); //Создать массив из найденных форм попап  
  formList.forEach((formSelector) => {  //Переберём этот массив
    formSelector.addEventListener('submit', (evt) => { //У каждой формы отменим стандартное поведение
      evt.preventDefault();
   });
    setEventListeners(formSelector, obj); //Для каждой формы вызовем функцию setEventListeners, передав ей элемент формы и объект настроек
  });
};
  
// Проверка на валидность полей ввода формы
const hasInvalidInput = (inputList) => { //Функция принимает массив полей
  return inputList.some((inputElement) => { // Проходим по этому массиву методом some
      return !inputElement.validity.valid; // Если поле не валидно, колбэк вернёт true, обход массива прекратится и вся фунцкция hasInvalidInput вернёт true
    });
};

// Функция принимает массив полей ввода и элемент кнопки, состояние которой нужно менять
const toggleButtonState = (inputList, buttonElement, obj) => {
  if (hasInvalidInput(inputList)) { //Если есть хотя бы один невалидный инпут
    buttonElement.classList.add(obj.inactiveButtonClass); //сделай кнопку неактивной
    buttonElement.setAttribute('disabled', true)
    } else { //иначе сделай кнопку активной  
      buttonElement.classList.remove(obj.inactiveButtonClass);
      buttonElement.removeAttribute('disabled')
    }
};

enableValidation({
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__button',
  inactiveButtonClass: 'popup__button_disabled',
  inputErrorClass: 'popup__input_type_error',
  errorClass: 'popup__error_visible'
});

  