export const getRandomTimeInRange = (
  absoluteStart: Date,
  absoluteEnd: Date
) => {
  const startTime = absoluteStart.getTime();
  const endTime = absoluteEnd.getTime();

  const randomStart = new Date(
    startTime + Math.random() * (endTime - startTime)
  );
  const remainingTime = endTime - randomStart.getTime();
  const randomDuration = Math.random() * remainingTime;
  const randomEnd = new Date(randomStart.getTime() + randomDuration);

  return {
    start: randomStart,
    end: randomEnd,
  };
};
