import { createElement } from "../utils.js";

const createLoadMoreBtn = () => {
  return `
        <button class="load-more" type="button">load more</button>
    `;
};

export default class LoadMoreButton {
  constructor() {
    this._element = null;
  }

  getTemplate() {
    return createLoadMoreBtn();
  }

  getElement() {
    if (!this._element) {
      this._element = createElement(this.getTemplate());
    }

    return this._element;
  }

  removeElement() {
    this._element = null;
  }
}
