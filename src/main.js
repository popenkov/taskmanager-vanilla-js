import BoardComponent from "./components/board.js";
import FilterComponent from "./components/filter.js";
import LoadMoreButtonComponent from "./components/load-more-btn.js";
import TaskEditComponent from "./components/task-edit.js";
import TaskComponent from "./components/task.js";
import TasksComponent from "./components/tasks.js";
import SiteMenuComponent from "./components/menu.js";
import SortComponent from "./components/sort.js";
import NoTaskComponent from "./components/no-task.js";
import { generateTasks } from "./mock/task.js";
import { generateFilters } from "./mock/filter.js";
import { InsertionPosition, render } from "./utils.js";

const TASKS_COUNT = 22;
const SHOWING_TASKS_COUNT_ON_START = 8;
const SHOWING_TASKS_COUNT_BY_BUTTON = 8;

const siteMainElement = document.querySelector(`.main`);
const siteHeaderElement = siteMainElement.querySelector(`.main__control`);
const randomTasks = generateTasks(TASKS_COUNT);
const randomFilters = generateFilters();

const renderTask = (taskListElement, task) => {
  const replaceEditToETask = () => {
    taskListElement.replaceChild(
      taskComponent.getElement(),
      taskEditComponent.getElement()
    );
  };
  const onEditButtonClick = () => {
    taskListElement.replaceChild(
      taskEditComponent.getElement(),
      taskComponent.getElement()
    );
  };

  const onEditFormSubmit = (evt) => {
    evt.preventDefault();
    replaceEditToETask();
  };

  const onEscKeyDown = (evt) => {
    const isEscKey = evt.key === `Escape` || evt.key === `Esc`;

    if (isEscKey) {
      replaceEditToETask();
      document.removeEventListener(`keydown`, onEscKeyDown);
    }
  };

  const taskComponent = new TaskComponent(task);
  const editButton = taskComponent
    .getElement()
    .querySelector(`.card__btn--edit`);
  editButton.addEventListener(`click`, () => {
    onEditButtonClick();
    document.addEventListener(`keydown`, onEscKeyDown);
  });

  const taskEditComponent = new TaskEditComponent(task);
  const editForm = taskEditComponent.getElement().querySelector(`form`);
  editForm.addEventListener(`submit`, (evt) => {
    onEditFormSubmit();
    document.removeEventListener(`keydown`, onEscKeyDown);
  });

  render(
    taskListElement,
    taskComponent.getElement(),
    InsertionPosition.BEFOREEND
  );
};

const renderBoard = (boardComponent, tasks) => {
  const isAllTasksArchived = tasks.every((task) => task.isArchived);

  if (isAllTasksArchived) {
    render(
      boardComponent.getElement(),
      new NoTaskComponent().getElement(),
      InsertionPosition.BEFOREEND
    );
    return;
  }

  render(
    boardComponent.getElement(),
    new SortComponent().getElement(),
    InsertionPosition.BEFOREEND
  );
  render(
    boardComponent.getElement(),
    new TasksComponent().getElement(),
    InsertionPosition.BEFOREEND
  );

  const taskListElement = boardComponent
    .getElement()
    .querySelector(`.board__tasks`);

  let showingTasksCount = SHOWING_TASKS_COUNT_ON_START;
  tasks.slice(0, showingTasksCount).forEach((task) => {
    renderTask(taskListElement, task);
  });

  const loadMoreButtonComponent = new LoadMoreButtonComponent();
  render(
    boardComponent.getElement(),
    loadMoreButtonComponent.getElement(),
    InsertionPosition.BEFOREEND
  );

  loadMoreButtonComponent.getElement().addEventListener(`click`, () => {
    const prevTasksCount = showingTasksCount;
    showingTasksCount = showingTasksCount + SHOWING_TASKS_COUNT_BY_BUTTON;

    tasks
      .slice(prevTasksCount, showingTasksCount)
      .forEach((task) => renderTask(taskListElement, task));

    if (showingTasksCount >= tasks.length) {
      loadMoreButtonComponent.getElement().remove();
      loadMoreButtonComponent.removeElement();
    }
  });
};

render(
  siteHeaderElement,
  new SiteMenuComponent().getElement(),
  InsertionPosition.BEFOREEND
);
render(
  siteMainElement,
  new FilterComponent(randomFilters).getElement(),
  InsertionPosition.BEFOREEND
);

const boardComponent = new BoardComponent();

render(
  siteMainElement,
  boardComponent.getElement(),
  InsertionPosition.BEFOREEND
);
renderBoard(boardComponent, randomTasks);
