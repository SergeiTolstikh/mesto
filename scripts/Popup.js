export default class Popup {
    constructor(popupSelector) {
        this._popupSelector = popupSelector;
    };

    open() {
        this._popupSelector.classList.add('popup_opened');
        document.addEventListener('keydown', this._handleEscClose);
    };

    close() {
        this._popupSelector.classList.remove('popup_opened');
        document.removeEventListener('keydown', this._handleEscClose);
    }

    _handleEscClose = (evt) => {
        if (evt.key === "Escape") {
            const popupActiveArray = document.querySelectorAll('.popup_opened');
            popupActiveArray.forEach((popupActive) => { this.close(popupActive) });

        }
    };

    setEventListeners() {
        const popupCloseButton = this._popupSelector.querySelector('.popup__close');
        popupCloseButton.addEventListener('click', () => { this.close(this._popupSelector) });


        const popupOverlayClose = document.querySelectorAll('.popup');
        popupOverlayClose.forEach((evt) => { evt.addEventListener('click', (evt) => { if (evt.target.classList.contains('popup')) { this.close(this._popupSelector) } }) })
    }
};