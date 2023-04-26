export const filterLocation = (location: string) => {
  return location
    .replace('서울특별시', '')
    .replace('서울', '')
    .split(' ')
    .filter((location) => location.length > 0);
};
