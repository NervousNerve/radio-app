export const getAllCategories = async () => {
  const response = await fetch(
    "https://api.sr.se/api/v2/programcategories?format=json&pagination=false"
  );
  const data = await response.json();
  return data.programcategories;
};
