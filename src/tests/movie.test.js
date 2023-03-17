const req = require("supertest");
const app = require("../app");
require("../models");
const Actor = require("../models/Actor");
const Genre = require("../models/Genre");
const Director = require("../models/Director");

let movieId;

test("POST /movies should to create a movie", async () => {
  const movie = {
    name: "Star Wars: Episode III - Revenge of the Sith",
    image: "https://upload.wikimedia.org/wikipedia/en/9/93/Star_Wars_Episode_III_Revenge_of_the_Sith_poster.jpg",
    synopsis: "Revenge of the Sith is set three years after the onset of the Clone Wars as established in Attack of the Clones. The Jedi are spread across the galaxy in a full-scale war against the Separatists. The Jedi Council dispatches Obi-Wan Kenobi on a mission to defeat General Grievous, the head of the Separatist army, to put an end to the war. Meanwhile, after having visions of his wife Padmé Amidala dying in childbirth, Anakin Skywalker is tasked by the Council to spy on Palpatine, the Supreme Chancellor of the Galactic Republic and, secretly, a Sith Lord. Palpatine manipulates Anakin into turning to the dark side of the Force and becoming his apprentice, Darth Vader, with wide-ranging consequences for the galaxy.",
    releaseYear: 2005
  };
  const res = await req(app).post("/movies").send(movie);

  movieId = res.body.data.id;
  expect(res.status).toBe(201);
  expect(res.body.data.name).toBe(movie.name);
});

test("GET /movies should return all movies", async () => {
  const res = await req(app).get("/movies");

  expect(res.status).toBe(200);
  expect(res.body.data).toHaveLength(1);
  expect(res.body.data[0].actors).toBeDefined();
  expect(res.body.data[0].genres).toBeDefined();
  expect(res.body.data[0].directors).toBeDefined();
});

test(`PUT /movies/${movieId} should to update a movie`, async () => {
  const props = {
    name: "Star Wars: Episode III - Revenge of the Sith",
    image: "https://upload.wikimedia.org/wikipedia/en/9/93/Star_Wars_Episode_III_Revenge_of_the_Sith_poster.jpg",
    synopsis: "Revenge of the Sith is set three years after the onset of the Clone Wars as established in Attack of the Clones. The Jedi are spread across the galaxy in a full-scale war against the Separatists. The Jedi Council dispatches Obi-Wan Kenobi on a mission to defeat General Grievous, the head of the Separatist army, to put an end to the war. Meanwhile, after having visions of his wife Padmé Amidala dying in childbirth, Anakin Skywalker is tasked by the Council to spy on Palpatine, the Supreme Chancellor of the Galactic Republic and, secretly, a Sith Lord. Palpatine manipulates Anakin into turning to the dark side of the Force and becoming his apprentice, Darth Vader, with wide-ranging consequences for the galaxy.",
    releaseYear: 2005
  };
  const res = await req(app).put(`/movies/${movieId}`).send(props);

  expect(res.status).toBe(200);
  expect(res.body.data.name).toBe(props.name);
});

test(`POST /movies/${movieId}/actors should to create some actors for a movie`, async () => {
  const createdActor = await Actor.create({
    firstName: "Hayden",
    lastName: "Christensen",
    nationality: "Canadian",
    image: "https://upload.wikimedia.org/wikipedia/commons/8/8a/Hayden-cfda2010-0004%281%29_%28cropped%29.jpg",
    birthday: "1981-04-19"
  });
  const res = await req(app)
    .post(`/movies/${movieId}/actors`)
    .send({actors: createdActor.id});

  await createdActor.destroy();
  expect(res.status).toBe(201);
  expect(res.body.data).toHaveLength(1);
});

test(`POST /movies/${movieId}/genres should to create some genres for a movie`, async () => {
  const createdGenre = await Genre.create({
    name: "Science fiction"
  });
  const res = await req(app)
    .post(`/movies/${movieId}/genres`)
    .send({genres: [createdGenre.id]});
  
  await createdGenre.destroy();
  expect(res.status).toBe(201);
  expect(res.body.data).toHaveLength(1);
});

test(`POST /movies/${movieId}/directors should to create some directors for a movie`, async () => {
  const createdDirector = await Director.create({
    firstName: "George",
    lastName: "Lucas",
    nationality: "American",
    image: "https://upload.wikimedia.org/wikipedia/commons/a/a0/George_Lucas_cropped_2009.jpg",
    birthday: "1944-05-14"
  });
  const res = await req(app)
    .post(`/movies/${movieId}/directors`)
    .send({directors: [createdDirector.id]});

  await createdDirector.destroy();
  expect(res.status).toBe(201);
  expect(res.body.data).toHaveLength(1);
});

test(`DELETE /movies/${movieId} should to delete a movie`, async () => {
  const res = await req(app).delete(`/movies/${movieId}`);

  expect(res.status).toBe(204);
});
