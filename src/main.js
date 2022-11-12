import { createSiteBoardTemplate } from "./components/board";
import { createFilterTemplate } from "./components/filter";
import { createLoadMoreBtn } from "./components/load-more-btn";
import { createSiteMenuTemplate } from "./components/menu";
import { render, RenderPosition, TASK_COUNT } from "./components/render";
import { createTaskTemplate } from "./components/task";
import { createTaskEditTemplate } from "./components/task-edit";
import { generateTask, generateTasks } from "./mock/task";
import { generateFilters } from "./mock/filter";

const TASKS_COUNT = 22;
const SHOWING_TASKS_COUNT_ON_START = 8;
const SHOWING_TASKS_COUNT_BY_BUTTON = 8;

const tasks = generateTasks(TASKS_COUNT);

const siteMainElement = document.querySelector(".main");

render(siteMainElement, createSiteBoardTemplate());

const renderHeader = () => {
  const siteHeaderElement = siteMainElement.querySelector(".main__control");
  render(siteHeaderElement, createSiteMenuTemplate());
  render(siteMainElement, createFilterTemplate(), "afterbegin");
};

const taskListElement = siteMainElement.querySelector(".board__tasks");

const createTasksList = (tasksCount) => {
  render(taskListElement, createTaskEditTemplate(tasks[0]));

  for (let i = 1; i < tasksCount; i++) {
    render(taskListElement, createTaskTemplate(tasks[i]));
  }
};

const renderLoadMoreBtn = (tasksCount) => {
  const boardElement = siteMainElement.querySelector(".board");
  render(boardElement, createLoadMoreBtn());
  const loadMoreButton = siteMainElement.querySelector(`.load-more`);

  loadMoreButton.addEventListener(`click`, () => {
    const prevTasksCount = tasksCount;

    tasksCount = tasksCount + SHOWING_TASKS_COUNT_BY_BUTTON;

    tasks
      .slice(prevTasksCount, tasksCount)
      .forEach((task) => render(taskListElement, createTaskTemplate(task)));

    if (tasksCount >= TASKS_COUNT) {
      loadMoreButton.remove();
    }
  });
};

renderHeader();
createTasksList(SHOWING_TASKS_COUNT_ON_START);
renderLoadMoreBtn(SHOWING_TASKS_COUNT_ON_START);
