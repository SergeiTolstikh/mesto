import Popup from "./Popup.js";
export default class PopupWithConfirmation extends Popup {
    constructor(popupElement, confirmationDelete) {
        super(popupElement);
        this._form = this._popupElement.querySelector('.popup__form');
        this._confirmationDelete = confirmationDelete;
    }

    open() {
        super.open();
    }

    close() {
        this._form.reset();
        return super.close();
    }

    setEventListeners() {
        super.setEventListeners();
        this._form.addEventListener('submit', (evt) => {
            evt.preventDefault();
            this._confirmationDelete();
            this.close();
        });
    }
}


