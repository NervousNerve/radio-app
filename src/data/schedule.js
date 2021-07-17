export const getSchedule = async ({ date, channel }) => {
  if (!date)
    date = new Date(Date.now()).toLocaleString("sv-SE", {
      dateStyle: "short",
    });

  const url = `https://api.sr.se/api/v2/scheduledepisodes?channelid=${channel}&date=${date}&format=json&pagination=false`;
  const response = await fetch(url);
  const data = await response.json();
  return data.schedule;
};
