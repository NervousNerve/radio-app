export const getAllProgramEpisodes = async (id) => {
  const url = `https://api.sr.se/api/v2/episodes/index?programid=${id}&format=json&pagination=false`;
  const response = await fetch(url);
  const data = await response.json();
  return data.episodes;
};

export const getEpisode = async (id) => {
  const url = `https://api.sr.se/api/v2/episodes/get?id=${id}&format=json`;
  const response = await fetch(url);
  const data = await response.json();
  return data.episode;
};
