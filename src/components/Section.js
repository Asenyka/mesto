export default class Section {
  constructor({items,renderer}, containerSelector){
  this._itemsToRender = items;
  this._renderer = renderer;
  this._container = document.querySelector(containerSelector);
    }
    addItem(element){
      this._container.prepend(element);
    }
    renderer(){
    this._itemsToRender.forEach((item) => {
        this._renderer(item); 
      });
    }
}
