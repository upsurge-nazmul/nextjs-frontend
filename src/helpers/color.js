export const getRandomColor = () => {
  let r = Math.floor(Math.random() * 255);
  let g = Math.floor(Math.random() * 255);
  let b = Math.floor(Math.random() * 255);
  let a = Math.random();
  return `rgba(${r}, ${g}, ${b}, ${a})`;
};
