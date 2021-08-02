export default class userInfo {
  constructor({ profileNameSelector, profileDescriptionSelector }) {
    this._profileName = profileNameSelector;
    this._profileDescription = profileDescriptionSelector;
  }
  getUserInfo() {
    this._userData = {
      name: this._profileName.textContent,
      description: this._profileDescription.textContent
    };

    return this._userData;
  }
  setUserInfo(userInfo) {
    this._profileName.textContent = userInfo.NameProfile;
    this._profileDescription.textContent = userInfo.AboutProfile;
  }
}