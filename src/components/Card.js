export default class Card {

    constructor(data, owner, isLiked, cardSelector, handleCardClick, handleOpenConfirmPopup, handleLikeClick) {
        this._name = data.name;
        this._link = data.link;
        this._id = data._id;
        this._likes = data.likes;
        this._owner = owner;
        this._isLiked = isLiked;

        this._cardSelector = cardSelector;
        this._handleCardClick = handleCardClick;
        this._handleOpenConfirmPopup = handleOpenConfirmPopup;
        this._handleLikeClick = handleLikeClick;
    }

    //Клонировать содержимое шаблона
    _getTemplate() {
        const cardElement = this._cardSelector.content.querySelector('.gallery__card').cloneNode(true);
        return cardElement;
    }
    ///

    //
    getLikeState() {
        return this._isLiked;
    }
    ///

    //
    delCard(evt) {
        evt.target.closest(".gallery__card").remove();
    }
    ///
    remove() {
        this._newCardElement.remove();
        this._newCardElement = null;
    }

    //
    likeCard(likesNumber) {
        this._likeButton.classList.add('gallery__like_on');
        this._isLiked = true;
        this._updateLikes(likesNumber);
    }
    ///

    //
    unlikeCard(likesNumber) {
        this._likeButton.classList.remove('gallery__like_on');
        this._isLiked = false;
        this._updateLikes(likesNumber);
    }
    ///

    //
    _updateLikes(likesNumber) {
        this._likes = likesNumber;
        this._likeCounterElement.textContent = (likesNumber !== 0)
            ? likesNumber
            : '0';
    }
    ///

    //Функция с событиями
    _setCardEventListeners() {
        this._deleteCardButton.addEventListener('click', () => { this._handleOpenConfirmPopup(this._imageElement.id, this._newCardElement) });
        this._likeButton.addEventListener('click', () => { this._handleLikeClick() });
        this._imageElement.addEventListener('click', () => {
            this._handleCardClick(this._link, this._name);
        });
    }
    ///

    //
    _setlikeCounter() {
        this._updateLikes(this._likes);
        if (this._isLiked) {
            this._likeButton.classList.add('gallery__like_on');
        }
    }
    ///

    //
    _checkOwner() {
        if (!this._owner) {
            this._newCardElement.querySelector('.gallery__delete-card').remove();
        }
    }
    ///

    //Создать карточку
    createCard() {
        this._newCardElement = this._getTemplate();
        this._deleteCardButton = this._newCardElement.querySelector('.gallery__delete-card');
        this._likeButton = this._newCardElement.querySelector('.gallery__like');
        this._imageElement = this._newCardElement.querySelector('.gallery__image');
        this._titleElement = this._newCardElement.querySelector('.gallery__text');
        this._likeCounterElement = this._newCardElement.querySelector('.gallery__like-counter');
        this._imageElement.id = this._id;
        this._titleElement.textContent = this._name;
        this._imageElement.src = this._link;
        this._imageElement.alt = this._name;
        this._setCardEventListeners();

        console.log(this._newCardElement)
        this._setlikeCounter();
        this._checkOwner()
        return this._newCardElement;

    }

}   ///

