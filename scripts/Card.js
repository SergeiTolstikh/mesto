export default class Card {

    constructor(data, cardSelector, handleCardClick) {
        this._link = data.link;
        this._name = data.name;
        this._cardSelector = cardSelector;
        this._handleCardClick = handleCardClick;
    }

    //Клонировать содержимое шаблона
    _getTemplate() {
        const cardElement = document.querySelector(this._cardSelector).content.querySelector('.gallery__card').cloneNode(true);
        return cardElement;
    }
    ///

    //Функция с событиями
    _setCardEventListeners() {
        this._deleteCard.addEventListener('click', this._handleDeleteCard);
        this._likeButton.addEventListener('click', this._handleLikeClick);
        this._imageElement.addEventListener('click', () => {
            this._handleCardClick(this._link, this._name);
        });
    }
    ///

    //Удалить карточку
    _handleDeleteCard(evt) {
        evt.target.closest('.gallery__card').remove();
    }
    ///

    //Поставить/удалить лайк карточки
    _handleLikeClick(evt) {
        evt.target.classList.toggle('gallery__like_on');
    }
    ///

    //Создать карточку
    createCard() {
        this._getTemplateNew = this._getTemplate();
        this._deleteCard = this._getTemplateNew.querySelector('.gallery__delete-card');
        this._likeButton = this._getTemplateNew.querySelector('.gallery__like');
        this._imageElement = this._getTemplateNew.querySelector('.gallery__image');
        this._titleElement = this._getTemplateNew.querySelector('.gallery__text');

        this._titleElement.textContent = this._name;
        this._imageElement.src = this._link;
        this._imageElement.alt = this._name;
        this._setCardEventListeners();
        return this._getTemplateNew;
    }
}   ///

