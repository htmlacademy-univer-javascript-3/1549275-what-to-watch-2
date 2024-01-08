export const getTimeLeft = (time: number): string => {
  const hours = Math.floor(time / 3600);
  const minuts = Math.floor((time % 3600) / 60);
  const seconds = Math.floor(time - hours * 3600 - minuts * 60);

  if(hours > 0){
    return `-${hours.toString().padStart(2, '0')}:${minuts.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
  }
  return `-${minuts.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
};
