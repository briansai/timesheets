const getDate = (d) => {
  return `${d.getUTCMonth() + 1}/${d.getUTCDate()}/${d
    .getFullYear()
    .toString()
    .slice(-2)}`;
};

export { getDate };
