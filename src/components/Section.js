export default class Section {
  constructor({ renderer }, container) {
    this._renderer = renderer;
    this._container = container;
  }

  setItem(element, key = "append") {
    if (key === "append") {
      this._container.append(element);
    }
    if (key === "prepend") {
      this._container.prepend(element);
    }
  }

  renderItems(items) {
    this._renderedItems = items;
    this._renderedItems.forEach(item => {
      this._renderer(item);
    });
  }
}