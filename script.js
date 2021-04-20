let editButton = document.querySelector('.custo__edit-button');
function openpopup() {
    let container = document.querySelector('.popup');
    container.classList.add('popup_opened');
}

editButton.addEventListener('click', openpopup);

let closeButton = document.querySelector('.popup__toggle-image');
function closepopup() {
    let container = document.querySelector('.popup');
    container.classList.remove('popup_opened');
}

closeButton.addEventListener('click', closepopup);



