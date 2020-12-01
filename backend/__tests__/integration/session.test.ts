import Request from "supertest";
//const supertest = require("supertest");
import { app } from "../../src/server";
//const { app } = require("../../src/server");

import User from "../../src/models/User";
//const User = require("../../src/models/User");

describe("authenticate", () => {
  it("should receive 200 http", async () => {
    const data = new Array();

    data.push({
      user: "anderso32n",
      email: "anderso332n@gmail.com",
      name_complete: "anderson kelvi",
      password: "123456",
    });

    const user = await User.create(data);

    const q = await app.post("/user");

    expect(q).toBe(200);
  });
});

// test("sum two numbers", () => {
//   expect(1 + 1).toBe(2);
// });
