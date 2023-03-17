const req = require("supertest");
const app = require("../app");
require("../models");
let directorId;

test("POST /directors should to create an director", async () => {
  const director = {
    firstName: "George",
    lastName: "Lucas",
    nationality: "American",
    image: "https://upload.wikimedia.org/wikipedia/commons/a/a0/George_Lucas_cropped_2009.jpg",
    birthday: "1944-05-14"
  };
  const res = await req(app).post("/directors").send(director);

  directorId = res.body.data.id;
  expect(res.status).toBe(201);
  expect(res.body.data.firstName).toBe(director.firstName);
});

test("GET /directors should return all directors", async () => {
  const res = await req(app).get("/directors");

  expect(res.status).toBe(200);
  expect(res.body.data).toHaveLength(1);
  expect(res.body.data[0].movies).toBeDefined();
});

test(`PUT /directors/${directorId} should to update an director`, async () => {
  const props = {
    firstName: "George",
    lastName: "Lucas",
    nationality: "American",
    image: "https://upload.wikimedia.org/wikipedia/commons/a/a0/George_Lucas_cropped_2009.jpg",
    birthday: "1944-05-14"
  };
  const res = await req(app).put(`/directors/${directorId}`).send(props);

  expect(res.status).toBe(200);
  expect(res.body.data.firstName).toBe(props.firstName);
});

test(`DELETE /directors/${directorId} should to delete an director`, async () => {
  const res = await req(app).delete(`/directors/${directorId}`);

  expect(res.status).toBe(204);
});
