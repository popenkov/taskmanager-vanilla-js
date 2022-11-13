import { generateFilters } from "../mock/filter";
import { createElement } from "../utils.js";

const filterData = generateFilters();

const createFilterMarkup = (filter, isChecked) => {
  const { title, value } = filter;
  return `
      <input type="radio" id="filter__all" class="filter__input visually-hidden"
        name="filter" ${isChecked && "checked"} />
      <label for="filter__${title}" class="filter__label">
        ${title} 
        <span class="filter__${title}-count">${value}</span>
      </label>
    `;
};

const createFilterTemplate = () => {
  const filterMarkup = filterData
    .map((item, i) => {
      return createFilterMarkup(item, i === 0);
    })
    .join("\n");

  return `
        <section class="main__filter filter container">
            ${filterMarkup}
        </section>
        `;
};

export default class Filter {
  constructor(filters) {
    this._filters = filters;
    this._element = null;
  }

  getTemplate() {
    return createFilterTemplate(this._filters);
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
