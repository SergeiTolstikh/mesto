//открытие попапа

let editButton = document.querySelector('.custo__edit-button');
function openpopup() {
    let container = document.querySelector('.popup');
    container.classList.add('popup_opened');
}

editButton.addEventListener('click', openpopup);

//закрытие попапа

let closeButton = document.querySelector('.popup__toggle-image');
function closepopup() {
    let container = document.querySelector('.popup');
    container.classList.remove('popup_opened');
}

closeButton.addEventListener('click', closepopup);

//

//лайк

let likeButton = document.querySelector('.gallery__like');
function Like() {
    likeButton.classList.add('gallery__like_on');
}

likeButton.addEventListener('click', Like);


