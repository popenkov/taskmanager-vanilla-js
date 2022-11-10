import { generateFilters } from "../mock/filter";

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

export const createFilterTemplate = () => {
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
