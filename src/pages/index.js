import './index.css';
import { FormValidator } from '../components/FormValidator.js';
import Api from '../components/Api';
import Card from '../components/Card.js';
import Section from '../components/Section.js';
import Userinfo from '../components/UserInfo.js';
import PopupWithForm from '../components/PopupWithForm.js';
import PopupWithImage from '../components/PopupWithImage.js';
import PopupWithConfirmation from '../components/PopupWithConfirmation.js';
import {
  config,
  popupAvatar,
  avatarPicture,
  profileTitle,
  profileSubtitle,
  profileEditAvatar,
  profileEditButton,
  buttonAddPlus,
  galleryContainer,
  profilePopup,
  profilePopupForm,
  nameProfileInput,
  aboutProfileInput,
  galleryPopup,
  galleryPopupForm,
  galleryOverlay,
  confirmPopup,
  submitGallery,
  submitAvatar,
  submitProfile,
  userData,
  avatarProfileInput
} from '../utils/constants.js';

//
const profileFormValidator = new FormValidator(config, profilePopupForm);
profileFormValidator.enableValidation();//валидация попап профиля

const cardFormValidator = new FormValidator(config, galleryPopupForm);
cardFormValidator.enableValidation();//валидация попап галереи

const avatarFormValidator = new FormValidator(config, popupAvatar);
avatarFormValidator.enableValidation();//валидация попап аватара
///
const cardSelector = document.querySelector('.gallery-template');



let userId = '';//

const api = new Api({
  baseUrl: 'https://mesto.nomoreparties.co/v1',
  groupId: 'cohort-28',
  token: '7ab77057-a030-4fc1-abd5-bdd9c6f29070',
});

//создает экземпляр класса и возвращает карточку
function createNewCard(element, owner, isLiked) {
  const card = new Card(element, owner, isLiked, cardSelector, (img, name) => { popupWithImage.open(img, name) }, handleOpenConfirmPopup, handleLikeClick);

  function handleOpenConfirmPopup(evt) {
    applyConfirm.open(() => {
      api.deleteCard(card.getId())
        .then(() => {
          applyConfirm.close()
          card.delCard(evt)
        })
        .catch(err => console.log(`Ошибка при удалении карточки ${err}`));
    });

  }

  function handleLikeClick() {
    if (card.getLikeState()) {

      api.deleteCardLike(card.getId())
        .then(result => {
          card.unlikeCard(result.likes.length);
        })
        .catch(err => console.log(`Ошибка при снятии лайка ${err}`));
    } else {
      api.putCardLike(card.getId())
        .then(result => {
          card.likeCard(result.likes.length);
        })
        .catch(err => console.log(`Ошибка при отправке лайка ${err}`));
    }
  }

  return card.createCard();
}
///
const applyConfirm = new PopupWithConfirmation(confirmPopup)
applyConfirm.setEventListeners();

const userInfo = new Userinfo(userData);
//
Promise.all([api.getUserInfo(), api.getInitialCards()])
  .then(([resuserinfo, resinitialcards]) => {
    //console.log(resuserinfo.avatar)
    userId = resuserinfo._id;
    userInfo.setUserInfo(resuserinfo);
    //userInfo.setUserAvatar(resuserinfo.avatar);
    cardsSection.renderItems(resinitialcards)
  })
  .catch(err => console.log(`Ошибка при получении карточек и профиля ${err}`))
///
console.log(api.getUserInfo())
//
const cardsSection = new Section({
  renderer: item => {
    const isOwner = item.owner._id === userId;
    const isLiked = item.likes.some(liker => {
      return liker._id === userId;
    });
    cardsSection.setItem(createNewCard({ name: item.name, link: item.link, id: item._id, likes: item.likes.length }, isOwner, isLiked), "append");
  }
}, galleryContainer);
///

//Открыть попап просмотра фото в отдельном окне
const popupWithImage = new PopupWithImage(galleryOverlay)
popupWithImage.setEventListeners();
///

//

///

//Создаем объекты класса Popup
const profileEditPopup = new PopupWithForm(profilePopup, (inputValues) => {
  api.patchUserInfo(inputValues)
    .then(result => {
      profileEditPopup.close();
      userInfo.setUserInfo(result)
    })
    .catch(err => console.log(`Ошибка при обновлении профиля ${err}`))
    .finally(() => { submitProfile.textContent = "Сохранить" })
});
profileEditPopup.setEventListeners();
///

//
const avatarEditPicture = new PopupWithForm(popupAvatar, (inputValues) => {
  api.patchUserAvatar(inputValues)
    /*.then(result => {
      avatarEditPicture.close();
      avatarPicture.src = result.avatar
    })*/

    .then(result => {
      //console.log(api.patchUserAvatar)
      avatarEditPicture.close();
      userInfo.setUserInfo(result)
    })



    .catch(err => console.log(`Ошибка при обновлении аватара ${err}`))
    .finally(() => { submitAvatar.textContent = "Сохранить" })
});
avatarEditPicture.setEventListeners();
///

//
const addElementPopup = new PopupWithForm(galleryPopup, (item) => {
  api.postNewCard(item)
    .then(result => {
      addElementPopup.close();
      cardsSection.setItem(createNewCard({ name: result.name, link: result.link, id: result._id, likes: result.likes.length }, true), "prepend")
    })
    .catch(err => console.log(`Ошибка при добавлении карточки ${err}`))
    .finally(() => { submitGallery.textContent = "Создать" })
})
addElementPopup.setEventListeners();
///

//
profileEditButton.addEventListener('click', () => {
  profileFormValidator.clearInputItems();
  const profileData = userInfo.getUserInfo();
  nameProfileInput.value = profileData.name;
  aboutProfileInput.value = profileData.job;
  //avatarProfileInput.value = profileData.avatar
  profileEditPopup.open();
});
///

///
buttonAddPlus.addEventListener('click', () => {
  cardFormValidator.clearInputItems();
  addElementPopup.open();
});
///
profileEditAvatar.addEventListener('click', () => { avatarFormValidator.clearInputItems(); avatarEditPicture.open() });