const convertArrayToString = (array) => {
  let string = "";

  for (let i = 0; i < array.length; i++) {
    if (i === array.length - 1) {
      string = string + array[i];
    } else {
      string = string + array[i] + ", ";
    }
  }

  return string;
};

module.exports = convertArrayToString;
