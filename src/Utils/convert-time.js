export default (unprocessedTime) => {
  const numDays = Math.floor(unprocessedTime / 1440);
  unprocessedTime -= (1440 * numDays);
  const numHours = Math.floor(unprocessedTime / 60);
  unprocessedTime -= (60 * numHours);
  const numMins = unprocessedTime;

  return {
    days: numDays,
    hours: numHours,
    mins: numMins
  };
}