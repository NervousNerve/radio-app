async function getAllCategories(req, res) {
  const response = await fetch(
    "http://api.sr.se/api/v2/programcategories?format=json&pagination=false"
  );
  const data = await response.json();
  res.send(data.programcategories);
}

module.exports = { getAllCategories };
