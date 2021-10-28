import Popup from "./Popup.js";
export default class PopupWithConfirmation extends Popup {
    constructor(popupElement) {
        super(popupElement);
        this._form = this._popupElement.querySelector('.popup__form');
    }

    open() {
        super.open();
    }

    close() {
        this._form.reset();
        return super.close();
    }

    setEventListeners(confirmationDelete) {
        super.setEventListeners();
        this._form.addEventListener('submit', (evt) => {
            evt.preventDefault();
            confirmationDelete(evt)
            
        });
    }
}