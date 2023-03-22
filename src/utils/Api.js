export default class Api {
    constructor({token, basePath}) {
     this._token=token;
    this._basePath= basePath;
    }
  
_getHeaders() {
      return {
        "Content-Type": "application/json",
        authorization: this._token,
      };
    }
_getJson(res) {
      if (res.ok) {
         return res.json();
      }
      return Promise.reject(`Ошибка: ${res.status}`);
    }

getInitialCards() {
      return fetch(`${this._basePath}/cards`, {
  headers: this._getHeaders(),
    })
   .then(this._getJson);     
    }
  
getUserInfo(){
       return fetch(`${this._basePath}/users/me`, {
          headers: this._getHeaders(),
     })
  .then(this._getJson)
    }
  

sendUserInfo(userData){
  return fetch(`${this._basePath}/users/me`, {
    method: "PATCH",
    headers: this._getHeaders(),
    body: JSON.stringify(userData),
  }).then(this._getJson);
}
sendCard(cardData){
  return fetch(`${this._basePath}/cards`, {
    method: "POST",
    headers: this._getHeaders(),
    body: JSON.stringify(cardData),
  }).then(this._getJson);
} 
}
 