export const convertArrayToString = (data: string[]) => {
  let result = "";

  for (let i = 0; i < data.length; i++) {
    if (i !== data.length - 1) {
      result = result + `${data[i]}, `;
    } else {
      result = result + data[i];
    }
  }

  return result;
};
