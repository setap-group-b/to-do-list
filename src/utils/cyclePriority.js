// finds which index 'priority' is currently at and cycles it to the next value.
export const cyclePriority = (currentPriority, priorities, setPriority) => {
  const currentIndex = priorities.findIndex(
    (item) => item.value === currentPriority.value
  );
  const nextIndex = (currentIndex + 1) % priorities.length;

  setPriority(priorities[nextIndex]);
};
