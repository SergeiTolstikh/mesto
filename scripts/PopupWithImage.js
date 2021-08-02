import Popup from "./Popup.js";

export default class PopupWithImage extends Popup {
    constructor({ src, alt }, popupSelector) {
        super(popupSelector);
        this._src = src;
        this._alt = alt;
    }

    open() {
        super.open();

        const image = document.querySelector('.popup__overlay-picture');
        image.setAttribute("src", this._src);
        image.setAttribute("alt", this._alt);

        const imageName = this._popupSelector.querySelector('.popup__overlay-picture-name');
        imageName.textContent = this._alt;
    }
}