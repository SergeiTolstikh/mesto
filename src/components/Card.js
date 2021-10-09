export default class Card {

    constructor(data, cardSelector, handleCardClick, handleOpenConfirmPopup) {
        this._link = data.link;
        this._name = data.name;
        this._cardSelector = cardSelector;
        this._handleCardClick = handleCardClick;
        this._handleOpenConfirmPopup = handleOpenConfirmPopup;
    }

    //Клонировать содержимое шаблона
    _getTemplate() {
        const cardElement = document.querySelector(this._cardSelector).content.querySelector('.gallery__card').cloneNode(true);
        return cardElement;
    }
    ///

    /*//Функция с событиями
    _setCardEventListeners() {
        this._deleteCardButton.addEventListener('click', this._handleDeleteCard);
        this._likeButton.addEventListener('click', this._handleLikeClick);
        this._imageElement.addEventListener('click', () => {
            this._handleCardClick(this._link, this._name);
        });
    }
    ///
    
    //Удалить карточку
    _handleDeleteCard() {
        this._newCardElement.remove();
        this._newCardElement = null;
        console.log(this._newCardElement)
    }
    ///*/

    deleteCard(evt) {
        evt.target.closest(".gallery__card").remove();
      }

    //Функция с событиями
    _setCardEventListeners() {
        this._deleteCardButton.addEventListener('click', this._handleOpenConfirmPopup);
        this._likeButton.addEventListener('click', this._handleLikeClick);
        this._imageElement.addEventListener('click', () => {
            this._handleCardClick(this._link, this._name);
        });
    }
    ///
    
    //Поставить/удалить лайк карточки
    _handleLikeClick(evt) {
        evt.target.classList.toggle('gallery__like_on');
    }
    ///

    //Создать карточку
    createCard() {
        this._newCardElement = this._getTemplate();
        this._deleteCardButton = this._newCardElement.querySelector('.gallery__delete-card');
        this._likeButton = this._newCardElement.querySelector('.gallery__like');
        this._imageElement = this._newCardElement.querySelector('.gallery__image');
        this._titleElement = this._newCardElement.querySelector('.gallery__text');

        this._titleElement.textContent = this._name;
        this._imageElement.src = this._link;
        this._imageElement.alt = this._name;
        this._setCardEventListeners();
        return this._newCardElement;
    }
}   ///
