export const getAllPrograms = async ({ channel, category }) => {
  const params = ["format=json", "pagination=false"];
  if (channel) params.unshift("channelid=" + channel);
  if (category) params.unshift("programcategoryid=" + category);

  const url = "https://api.sr.se/api/v2/programs/index?" + params.join("&");
  const response = await fetch(url);
  const data = await response.json();
  return data.programs;
};

export const getProgram = async (id) => {
  const url = `https://api.sr.se/api/v2/programs/${id}?format=json`;
  const response = await fetch(url);
  const data = await response.json();
  return data.program;
};
