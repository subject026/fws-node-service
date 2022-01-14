const path = require("path");
const fs = require("fs/promises");

const getDirList = (path) => {
  return fs.readdir(path);
};

const readOriginFile = async (path) => {
  return JSON.parse(await fs.readFile(path));
};

const getOriginData = async (dirpath, origin) => {
  const filenames = await getDirList(dirpath);
  const data = await Promise.all(
    filenames.map((filename) => readOriginFile(path.join(dirpath, filename)))
  );
  const res = data.filter((obj) => {
    const isitnow = obj.origins.includes(origin);
    return isitnow;
  });
  if (res.length > 1) throw new Error(`duplicate origins? : ${origin}`);
  console.log(res[0]);
  return res[0];
};

module.exports = { getDirList, readOriginFile, getOriginData };
