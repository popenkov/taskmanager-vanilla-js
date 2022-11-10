const generateTask = () => {
  return {
    color: `pink`,
    description: `Example default task with default color`,
    dueDate: new Date(),
    repeatingDays: null,
    // time: `16:15`,
    isArchive: true,
    isFavorite: false,
  };
};

const generateTasks = (count) => {
  return new Array(count).fill(``).map(generateTask);
};

export { generateTask, generateTasks };
