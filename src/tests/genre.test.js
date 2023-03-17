const req = require("supertest");
const app = require("../app");
require("../models");
let genreId;

test("POST /genres should to create an genre", async () => {
  const genre = {
    name: "Science fiction"
  };
  const res = await req(app).post("/genres").send(genre);

  genreId = res.body.data.id;
  expect(res.status).toBe(201);
  expect(res.body.data.name).toBe(genre.name);
});

test("GET /genres should return all genres", async () => {
  const res = await req(app).get("/genres");

  expect(res.status).toBe(200);
  expect(res.body.data).toHaveLength(1);
  expect(res.body.data[0].movies).toBeDefined();
});

test(`PUT /genres/${genreId} should to update an genre`, async () => {
  const props = {
    name: "Science fiction"
  };
  const res = await req(app).put(`/genres/${genreId}`).send(props);

  expect(res.status).toBe(200);
  expect(res.body.data.name).toBe(props.name);
});

test(`DELETE /genres/${genreId} should to delete an genre`, async () => {
  const res = await req(app).delete(`/genres/${genreId}`);

  expect(res.status).toBe(204);
});
