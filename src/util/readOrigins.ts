import * as path from "path";
import * as fs from "fs/promises";

export const getDirList = (path) => {
  return fs.readdir(path);
};

export const readOriginFile = async (path) => {
  const data = await fs.readFile(path).then((res) => res.toString());
  return JSON.parse(data);
};

export const getOriginData = async (dirpath, origin) => {
  const filenames = await getDirList(dirpath);
  const data = await Promise.all(
    filenames.map((filename) => readOriginFile(path.join(dirpath, filename)))
  );
  const res = data.filter((obj) => {
    const isitnow = obj.origins.includes(origin);
    return isitnow;
  });
  if (res.length > 1) throw new Error(`duplicate origins? : ${origin}`);
  return res[0];
};
