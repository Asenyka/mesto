class Card {
    constructor(template, item) {
    this.template = template;
    this.name=item.name;
    this.link=item.link;
    }
 getTemplate(){
    return document.querySelector(this.template).content.querySelector('.places__item').cloneNode(true);
 }
createCard(){
    this.element = this.getTemplate();
    this.element.querySelector('.places__title').textContent = this.name;
    this.element.querySelector('.places__image').src = this.link;
    this.element.querySelector('.places__image').alt = this.name;
   return this.element;
}
}

export default Card