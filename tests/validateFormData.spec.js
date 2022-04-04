const assert = require("assert");
const {
  default: validateFormData,
} = require("../dist/controller/contactForm/validateFormData");

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

    assert.equal(404, 404);
  });
});
