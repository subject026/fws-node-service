require("dotenv").config();
const supertest = require("supertest");
const assert = require("assert");

const app = require("./app");

const request = supertest(app);

describe("Misc Tests\n", () => {
  // !!! This should be moved at some point as it has nothing to do with the user resource
  it("routes that don't exist should return 404", async () => {
    const res1 = await request.get("/not-a-real-route");
    assert.equal(res1.status, 404);
  });
});
