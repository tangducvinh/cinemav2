export const generateNumberPagination = (
  total: number,
  currentPage: number
) => {
  let totalPage = Math.ceil(total / 10);

  let a = [];

  if (totalPage <= 5) {
    for (let i = 1; i <= totalPage; i++) {
      a.push(i);
    }
    return a;
  } else {
    if (currentPage <= 3) {
      a = [1, 2, 3, "...", totalPage];
    } else if (currentPage < totalPage - 2) {
      a = [
        1,
        "...",
        currentPage - 1,
        currentPage,
        currentPage + 1,
        "...",
        totalPage,
      ];
    } else {
      a = [1, "...", totalPage - 2, totalPage - 1, totalPage];
    }
  }

  return a;
};
