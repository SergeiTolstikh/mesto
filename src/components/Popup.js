export default class Popup {
    constructor(popupElement) {
        this._popupElement = popupElement;
    };

    open() {
        this._popupElement.classList.add('popup_opened');
        document.addEventListener('keydown', this._handleEscClose);
    };

    close() {
        this._popupElement.classList.remove('popup_opened');
        document.removeEventListener('keydown', this._handleEscClose);
    }

    _handleEscClose = (evt) => {
        if (evt.key === "Escape") {
            this.close();
        }
    };

    setEventListeners() {
        const popupCloseButton = this._popupElement.querySelector('.popup__close');
        popupCloseButton.addEventListener('click', () => this.close());


        const popupOverlayClose = document.querySelectorAll('.popup');
        popupOverlayClose.forEach((evt) => { evt.addEventListener('click', (evt) => { if (evt.target.classList.contains('popup')) { this.close() } }) })
    }
};