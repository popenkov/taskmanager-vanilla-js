export const TASK_COUNT = 5;

export const RenderPosition = {
  BEFOREBEGIN: "beforebegin",
  AFTERBEGIN: "afterbegin",
  BEFOREEND: "beforeend",
  AFTEREND: "afterend",
};

export const render = (
  container,
  template,
  place = RenderPosition.BEFOREEND
) => {
  container.insertAdjacentHTML(place, template);
};
