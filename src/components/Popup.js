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
        const popupOverlayClose = this._popupElement.querySelector('.popup__close');
        popupOverlayClose.addEventListener('click', () => this.close());
        this._popupElement.addEventListener('click', (evt) => { if (evt.target.classList.contains('popup')) { this.close() } });
    } 
};
