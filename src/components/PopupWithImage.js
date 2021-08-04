
import Popup from "./Popup.js";

export default class PopupWithImage extends Popup {
    constructor(popupElement) {
        super(popupElement);        
    }

    open() {
        const image = document.querySelector('.popup__overlay-picture');
        image.setAttribute("src", this.src);
        image.setAttribute("alt", this.alt);
        const imageName = this._popupElement.querySelector('.popup__overlay-picture-name');
        imageName.textContent = this._alt;
        super.open();
    }
}