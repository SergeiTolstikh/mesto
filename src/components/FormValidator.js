export class FormValidator {
  constructor(config, form) { //чертёж нового обекта
    this._config = config;
    this._form = form;
    this._inputList = Array.from(this._form.querySelectorAll(this._config.inputSelector));
    this._button = this._form.querySelector(this._config.submitButtonSelector);
  }

  _setEventListeners() {
    this._toggleButtonState(); //запуск проверки кнопки при первом открытии попап
    this._inputList.forEach((input) => { //перебор массива полей ввода
      input.addEventListener('input', () => { //слушает если в поле производится ввод
        this._isValid(input); //проевека на валидность
        this._toggleButtonState(); //проверит кнопку
      });
    });
  }

  _isValid(input) {
    if (!input.validity.valid) { //если не true
      this._showInputError(input); //покажет ошибку
    } else {
      this._hideInputError(input);
    }
  }

  _showInputError(input) {
    const errorElement = this._form.querySelector(`.${input.id}-error`);
    input.classList.add(this._config.inputErrorClass);
    errorElement.classList.add(this._config.errorClass);
    errorElement.textContent = input.validationMessage;

  }

  _hideInputError(input) {
    const errorElement = this._form.querySelector(`.${input.id}-error`);
    input.classList.remove(this._config.inputErrorClass);
    errorElement.classList.remove(this._config.errorClass);
    errorElement.textContent = '';

  }

  _hasInvalidInput() {
    return this._inputList.some(input => !input.validity.valid); //собрать массив полей ввода, если есть невалидное вернуть true
  }

  _toggleButtonState() {
    if (this._hasInvalidInput()) { //невалидное поле
      this._disablesButton() //запретить кнопку
    } else {
      this._enablesButton() //разрешит кнопку
    }
  }

  _disablesButton() {
    this._button.classList.add(this._config.inactiveButtonClass); //сделай кнопку неактивной
    this._button.setAttribute('disabled', true)
  }

  _enablesButton() {
    this._button.classList.remove(this._config.inactiveButtonClass); //сделай кнопку неактивной
    this._button.removeAttribute('disabled')
  }

  clearInputItems() { //при закрытии попап каждому элементу массива полей ввода очистить поле ввода и скрыть текст ошибки
    this._inputList.forEach(input => {
      input.value = '';
      this._hideInputError(input);
    });
    this._toggleButtonState();//проверка кнопки после нажатия сабмита
  }

  enableValidation() {
    this._form.addEventListener("submit", (evt) => { //слушает сабмит и отменяет отправку формы
      evt.preventDefault();
    });
    this._setEventListeners(); //запуск функции набора методов проверки валидации полей ввода
  }
}