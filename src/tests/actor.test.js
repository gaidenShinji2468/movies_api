const req = require("supertest");
const app = require("../app");
require("../models");
let actorId;

test("POST /actors should to create an actor", async () => {
  const actor = {
    firstName: "Hayden",
    lastName: "Christensen",
    nationality: "Canadian",
    image: "https://upload.wikimedia.org/wikipedia/commons/8/8a/Hayden-cfda2010-0004%281%29_%28cropped%29.jpg",
    birthday: "1981-04-19"
  };
  const res = await req(app).post("/actors").send(actor);
 
  actorId = res.body.data.id;
  expect(res.status).toBe(201);
  expect(res.body.data.firstName).toBe(actor.firstName);
});

test("GET /actors should return all actors", async () => {
  const res = await req(app).get("/actors");

  expect(res.status).toBe(200);
  expect(res.body.data).toHaveLength(1);
  expect(res.body.data[0].movies).toBeDefined();
});

test(`PUT /actors/${actorId} should to update an actor"`, async () => {
  const props = {
    firstName: "Hayden",
    lastName: "Christensen",
    nationality: "Canadian",
    image: "https://upload.wikimedia.org/wikipedia/commons/8/8a/Hayden-cfda2010-0004%281%29_%28cropped%29.jpg",
    birthday: "1981-04-19"
  };
  const res = await req(app).put(`/actors/${actorId}`).send(props);

  expect(res.status).toBe(200);
  expect(res.body.data.nationality).toBe(props.nationality);
});

test(`DELETE /actors/${actorId} should to delete an actor`, async () => {
  const res = await req(app).delete(`/actors/${actorId}`);

  expect(res.status).toBe(204);
});
