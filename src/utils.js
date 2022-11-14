const castTimeFormat = (value) => {
  return value < 10 ? `0${value}` : String(value);
};

const formatTime = (date) => {
  const hours = castTimeFormat(date.getHours() % 12);
  const minutes = castTimeFormat(date.getMinutes());

  return `${hours}:${minutes}`;
};

// convert string to DOM element
const createElement = (template) => {
  const newElement = document.createElement(`div`);
  newElement.innerHTML = template;
  // skip TextNodes
  let firstChild = newElement.firstChild;
  while (firstChild != null && firstChild.nodeType == 3) {
    firstChild = firstChild.nextSibling;
  }
  return firstChild;
};

const InsertionPosition = {
  AFTERBEGIN: `afterbegin`,
  BEFOREEND: `beforeend`,
};

const render = (container, element, position) => {
  switch (position) {
    case InsertionPosition.AFTERBEGIN:
      container.prepend(element);
      break;
    case InsertionPosition.BEFOREEND:
      container.append(element);
      break;
  }
};

export { formatTime, createElement, InsertionPosition, render };
