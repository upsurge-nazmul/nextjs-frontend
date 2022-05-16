export const getShortForm = (name) => {
  let nameArr = name.split(" ");
  let res = "";
  for (let item of nameArr) {
    res += item.slice(0, 1);
  }
  return res.length > 2 ? res.slice(0, 2) : res;
};
