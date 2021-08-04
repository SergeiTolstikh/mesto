export default class Section {
  constructor({ items, renderer }, container) {
    this._initialArray = items;
    this._renderer = renderer;
    this._container = container;
  }

  setItem(element) {
    this._container.prepend(element);
  }

  renderItems() {
    this._initialArray.forEach(this._renderer);
  }
}