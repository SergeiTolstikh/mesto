export default class userInfo {
  constructor({ profileNameSelector, profileDescriptionSelector, profileAvatarSelector }) {
    this._profileName = profileNameSelector;
    this._profileDescription = profileDescriptionSelector;
    this._profileAvatar = profileAvatarSelector;
  }
  getUserInfo() {
    this._userData = {
      name: this._profileName.textContent,
      description: this._profileDescription.textContent
    };
    return this._userData;
  }
  setUserInfo(userInfo) {
    this._profileName.textContent = userInfo.nameProfile;
    this._profileDescription.textContent = userInfo.aboutProfile;
  }

  setUserAvatar(link) {
    this._profileAvatar.src = link;
  }
}