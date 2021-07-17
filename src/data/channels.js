export const getAllChannels = async () => {
  const response = await fetch(
    "https://api.sr.se/api/v2/channels?format=json&pagination=false"
  );
  const data = await response.json();
  return data.channels;
};

export const getChannel = async (id) => {
  const response = await fetch(
    `https://api.sr.se/api/v2/channels/${id}?format=json`
  );
  const data = await response.json();
  return data.channel;
};
