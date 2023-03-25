export default class UserInfo {
  constructor(profileName, profileJob, profileAvatar) {
    this._profileName = profileName;
    this._profileJob = profileJob;
    this._profileAvatar = profileAvatar;
    this._id = 0;
  }
  getUserInfo() {
    return {
      name: this._profileName.textContent,
      about: this._profileJob.textContent,
    };
  }
  setUserInfo({ name, about, avatar, _id }) {
    this._profileName.textContent = name;
    this._profileJob.textContent = about;
    this._profileAvatar.src = avatar;
    this._id = _id;
  }
}
