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
  const res = data.filter((obj) => obj.origin === origin);
  return res[0];
};

module.exports = { getDirList, readOriginFile, getOriginData };
