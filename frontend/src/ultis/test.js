const generateNumberPagination = (total, currentPage) => {
  const a = [];

  if (total <= 7 && currentPage > 1) {
    for (let i = 1; i <= total; i++) {
      a.push(i);
    }
    return a;
  }
};

console.log(generateNumberPagination(7, 7));
