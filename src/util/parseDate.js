function parseDate(dateStr) {
  // Remove non numeric characters
  let numbers = dateStr.replace(/[^0-9]+/g, "");
  numbers = parseInt(numbers);
  return new Date(numbers);
}

export default parseDate;
