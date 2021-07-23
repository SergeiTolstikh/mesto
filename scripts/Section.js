export default class Section {
    constructor({ items, renderer }, container) {
      this._initialArray = items;
      this.renderer = renderer;
      this._container = container;
    }
  
    setItem(element) {
      this._container.append(element);
    }
  
    renderItems() {
      this._initialArray.forEach(this.renderer);
    }
  }