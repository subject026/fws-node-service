const assert = require("assert");

const validateFormData = require("../validateFormData");

describe("validate form data", () => {
  // !!! This should be moved at some point as it has nothing to do with the user resource
  it("zoopl", async () => {
    const origin = "https://cbtrees.co.uk";
    const res = await validateFormData(
      {
        name: "steve",
        email: "steve@stevemail.com",
        tel: 999,
        message: "woople doo",
      },
      origin
    );
    console.log(res);

    assert.equal(404, 404);
  });
});
