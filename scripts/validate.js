/*const formSelector = document.querySelector('.popup__form');
const inputElement = formSelector.querySelector('.popup__input');

const formElement = document.querySelector('.form');
const formInput = formElement.querySelector('.form__input');*/


// Передадим текст ошибки 3м параметром
const showInputError = (formSelector, inputElement, errorMessage) => {
  const errorElement = formSelector.querySelector(`.${inputElement.id}-error`);
  inputElement.classList.add('popup__input_type_error');
  // Заменим содержимое span с ошибкой на переданный параметр
  errorElement.textContent = errorMessage;
  errorElement.classList.add('popup__error_visible');
};

const hideInputError = (formSelector, inputElement) => {
  const errorElement = formSelector.querySelector(`.${inputElement.id}-error`);
  inputElement.classList.remove('popup__input_type_error');
  errorElement.classList.remove('popup__error_visible');
  // Очистим ошибку
  errorElement.textContent = '';
};

const isValid = (formSelector, inputElement) => {
  if (!inputElement.validity.valid) {
    showInputError(formSelector, inputElement, inputElement.validationMessage); // Передадим сообщение об ошибке 3м аргументом
  } else {
    hideInputError(formSelector, inputElement);
  }
};

const setEventListeners = (formSelector) => {
    // Находим все поля внутри формы,
    // сделаем из них массив методом Array.from
    const inputList = Array.from(formSelector.querySelectorAll('.popup__input'));
  
    // Обойдём все элементы полученной коллекции
    inputList.forEach((inputElement) => {
      // каждому полю добавим обработчик события input
      inputElement.addEventListener('input', () => {
        // Внутри колбэка вызовем isValid,
        // передав ей форму и проверяемый элемент
        isValid(formSelector, inputElement)
      });
    });
  };
 
  const enableValidation = () => {
    // Найдём все формы с указанным классом в DOM,
    // сделаем из них массив методом Array.from
    const formList = Array.from(document.querySelectorAll('.popup__form'));
  
    // Переберём полученную коллекцию
    formList.forEach((formSelector) => {
      formSelector.addEventListener('submit', (evt) => {
        // У каждой формы отменим стандартное поведение
        evt.preventDefault();
      });
  
      // Для каждой формы вызовем функцию setEventListeners,
      // передав ей элемент формы
      setEventListeners(formSelector);
    });
  };
  
  // Вызовем функцию
  enableValidation();