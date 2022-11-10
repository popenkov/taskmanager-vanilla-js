export const generateFilters = () => {
  return [
    {
      title: "all",
      value: Math.floor(Math.random() * 10),
    },
    {
      title: "overdue",
      value: Math.floor(Math.random() * 10),
    },
    {
      title: "today",
      value: Math.floor(Math.random() * 10),
    },
    {
      title: "favorites",
      value: Math.floor(Math.random() * 10),
    },
    {
      title: "repeating",
      value: Math.floor(Math.random() * 10),
    },
    {
      title: "archive",
      value: Math.floor(Math.random() * 10),
    },
  ];
};
