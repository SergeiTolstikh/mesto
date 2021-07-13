export class Card {

    constructor(data, cardSelector, handleOpenPlacePopup) {
        this._link = data.link;
        this._name = data.name;
        this._cardSelector = cardSelector;
        this._handleOpenPlacePopup = handleOpenPlacePopup;
    }

    _createGalleryCard = () => {
        const initialElement = document.querySelector(this._cardSelector).content.cloneNode(true); //выбранный контент клонировать
        initialElement.querySelector('.gallery__text').textContent = this._name;
        const elementImg = initialElement.querySelector('.gallery__image');
        elementImg.src = this._link;
        elementImg.alt = this._name;
        this._setCardEventListeners(initialElement); //Функция с событиями
        return initialElement;
    }

    //Функция с событиями
    _setCardEventListeners = (element) => {

        element.querySelector('.gallery__delete-card').addEventListener('click', this._handleDeleteCard); //нажатие корзины (удалить карточку)

        element.querySelector('.gallery__like').addEventListener('click', this._handleLikeClick); //нажатие "нравится" (поставить лайк)

        element.querySelector('.gallery__image').addEventListener('click', () => { //нажатие на изображение (просмотр изображение в отдельном окне)
            this._handleOpenPlacePopup(this._name, this._link);
        });
    }

    //Удалить карточку
    _handleDeleteCard = (event) => {
        event.target.closest('.gallery__card').remove();
    }

    //Поставить/удалить лайк карточки
    _handleLikeClick = (event) => {
        event.target.classList.toggle('gallery__like_on');
    }

    createCard = () => {
        return this._createGalleryCard(this._link, this._name);
    }
}

export const initialCards = [
    {
        name: 'Архыз',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg'
    },
    {
        name: 'Челябинская область',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg'
    },
    {
        name: 'Иваново',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg'
    },
    {
        name: 'Камчатка',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg'
    },
    {
        name: 'Холмогорский район',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg'
    },
    {
        name: 'Байкал',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg'
    }
];