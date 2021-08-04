import Popup from "./Popup.js";
export default class PopupWithForm extends Popup {
    constructor(popupSelector, submitCallback) {
        super(popupSelector);
        this._submitCallback = submitCallback;
        this._form = this._popupSelector.querySelector('.popup__form');
        this._formInputsList = this._popupSelector.querySelectorAll('.popup__input');
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

        console.log(this._inputValues);
        return this._inputValues;
    }

    setEventListeners() {
        super.setEventListeners();
        this._form.addEventListener('submit', (evt) => {
            evt.preventDefault();
            this._submitCallback(this._getInputValues());

        });
        super.setEventListeners();
    }
}


