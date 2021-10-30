import Popup from "./Popup.js";
export default class PopupWithForm extends Popup {
    constructor(popupElement, submitCallback) {
        super(popupElement);
        this._submitCallback = submitCallback;
        this._form = this._popupElement.querySelector('.popup__form');
        this._formInputsList = this._popupElement.querySelectorAll('.popup__input');
        this._popupButtonSubmit = this._form.querySelector('.popup__button');
    }

    close() {
        this._form.reset();
        return super.close();
    }

    _getInputValues() {
        this._inputValues = {};
        this._formInputsList.forEach(inputEl => {
            this._inputValues[inputEl.name] = inputEl.value;
        });
        return this._inputValues;
    }

    setEventListeners() {
        super.setEventListeners();
        this._form.addEventListener('submit', (evt) => {
            evt.preventDefault();
            this._popupButtonSubmit.textContent = 'Сохранение…';
            this._submitCallback(this._getInputValues());
        });
    }
}


