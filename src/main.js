import { createSiteBoardTemplate } from "./components/board";
import { createFilterTemplate } from "./components/filter";
import { createLoadMoreBtn } from "./components/load-more-btn";
import { createSiteMenuTemplate } from "./components/menu";
import { render, RenderPosition, TASK_COUNT } from "./components/render";
import { createTaskTemplate } from "./components/task";
import { createTaskEditTemplate } from "./components/task-edit";
import { generateTask, generateTasks } from "./mock/task";
import { generateFilters } from "./mock/filter";

const siteMainElement = document.querySelector(".main");
const siteHeaderElement = siteMainElement.querySelector(".main__control");

render(siteHeaderElement, createSiteMenuTemplate());
render(siteMainElement, createFilterTemplate());
render(siteMainElement, createSiteBoardTemplate());

const filters = generateFilters();
const tasks = generateTasks(TASK_COUNT);

const taskListElement = siteMainElement.querySelector(".board__tasks");
const boardElement = siteMainElement.querySelector(".board");

render(taskListElement, createTaskEditTemplate(tasks[0]));

for (let i = 0; i <= tasks.length; i++) {
  render(taskListElement, createTaskTemplate(tasks[i]));
}

render(boardElement, createLoadMoreBtn());
