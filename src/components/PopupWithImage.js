
import Popup from "./Popup.js";

export default class PopupWithImage extends Popup {
    constructor(popupElement) {
        super(popupElement);
    }

    open(link, name) {
        const image = this._popupElement.querySelector('.popup__overlay-picture');
        const imageName = this._popupElement.querySelector('.popup__overlay-picture-name');
        image.setAttribute("src", link);
        image.setAttribute("alt", name);
        imageName.textContent = name;
        super.open();
    }
}