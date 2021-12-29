const path = require("path");
const assert = require("assert");
const { getDirList, readOriginFile, getOriginData } = require("../readOrigins");

const testOriginFolderPath = path.join(process.cwd(), "testorigins");
const testOriginPaths = [
  path.join(testOriginFolderPath, "example1.json"),
  path.join(testOriginFolderPath, "example2.json"),
];

describe("get origin data", () => {
  //
  // Unit
  //
  it("shoud get array of origin filepaths", async () => {
    const paths = await getDirList(testOriginFolderPath);
    assert.equal(paths.length, 2);
    assert.equal(paths[0], "example1.json");
    assert.equal(paths[1], "example2.json");
  });

  it("should read json file and return an object", async () => {
    // example1.json
    const data1 = await readOriginFile(testOriginPaths[0]);
    assert.equal(typeof data1, "object");
    assert.equal(data1.origin, "https://example1.com");

    const data = await readOriginFile(testOriginPaths[1]);
    assert.equal(data.origin, "https://example2.com");
  });
  //
  // Integration?
  //
  it("should return correct origin data for given origin", async () => {
    const testOrigin1 = "https://example2.com";
    const data1 = await getOriginData(testOriginFolderPath, testOrigin1);
    assert.equal(data1.origin, testOrigin1);

    const testOrigin2 = "https://example2.com";
    const data2 = await getOriginData(testOriginFolderPath, testOrigin2);
    assert.equal(data2.origin, testOrigin2);
  });
});
