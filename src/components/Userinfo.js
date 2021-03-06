export default class UserInfo {
  constructor(data) {
      this._name = data.name;
      this._info = data.work;
      this._avatar = data.avatar;
      this._profileName = document.querySelector(this._name);
      this._profileAbout = document.querySelector(this._info);
      this._profileAvatar = document.querySelector(this._avatar);
  };

  setUserInfo(item) {
      this._itemId = item._id
      this._profileName.textContent = item.name;
      this._profileAbout.textContent = item.about;
      this._profileAvatar.src = item.avatar;
  };

  getUserInfo() {
      return {
          name: this._profileName.textContent,
          work: this._profileAbout.textContent,
          avatar: this._profileAvatar.src,
          userId: this._itemId
      };
  };
};