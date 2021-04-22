// function parseDate(dateStr) {
//   date = dateStr.slice(6, -2);
//   date = parseInt(date);
//   return new Date(date);
// }

function parseDate(dateStr) {
  let numbers = dateStr.replace(/[^0-9]+/g, "");
  console.log(numbers);
  numbers = parseInt(numbers);
  console.log(numbers);
  return new Date(numbers);
}

export default parseDate;
