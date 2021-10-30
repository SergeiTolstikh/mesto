import Popup from "./Popup.js";
export default class PopupWithConfirmation extends Popup {
    constructor(popupElement) {
        super(popupElement);
        this._form = this._popupElement.querySelector('.popup__form');
    }

    open(confirmationDelete) {
        super.open();
        this._form.addEventListener('submit', (evt) => {
            confirmationDelete(evt)
            evt.preventDefault();
            console.log("повесил слушатель")
        });
    }

    close() {
        super.close();
        function rrr() {
            return console.log('выполнено удаление')
        }
        rrr()
    }

    setEventListeners() {
        super.setEventListeners();
    }
}