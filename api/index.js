import express from "express";
import Pokedex from "pokedex-promise-v2";
import fetch from "node-fetch";
import authenticate from "./auth.js";

const P = new Pokedex();

const app = express();
app.use(express.json());

app.post("/api/login", async (req, res) => {
  const { email, password } = req.body;
  try {
    const { status, token, username } = await authenticate(email, password);
    res.status(200).json({ success: true, message: status, username, token });
  } catch (error) {
    res.status(401).json({ success: false, error });
  }
});

app.get("/api/pokemon/:id", async function (req, res) {
  P.getPokemonByName(req.params.id, function (response, error) {
    // with callback
    if (!error) {
      res.json(response);
    } else {
      console.log(error);
      res.json(error);
    }
  });
});

app.get("/api/generation", async function (req, res) {
  const response = await fetch("https://pokeapi.co/api/v2/generation");
  const data = await response.json();
  res.json(data.results);
});

const getPokemonIdFromUrl = (url) => {
  const urlParts = url.split("/");
  return urlParts.slice(-2)[0];
};

app.get("/api/pokemon", async function (req, res) {
  const { query } = req;
  const { generation, name } = query;
  if (name) {
    console.log("poke with name: ", name);
    P.getPokemonByName(req.params.id, function (response, error) {
      // with callback
      if (!error) {
        console.log("Got res on api/pokemon ");
        res.json(response);
      } else {
        console.log(error);
      }
    });
  } else {
    const response = await fetch(
      `https://pokeapi.co/api/v2/generation/${generation}`,
    );

    const data = await response.json();
    if (generation === "all") {
      res.json(data);
    } else {
      const { pokemon_species } = data;
      const result = await Promise.allSettled(
        pokemon_species.map(
          ({ name }) =>
            new Promise((resolve, reject) => {
              P.getPokemonByName(name, function (response, error) {
                if (!error) {
                  resolve(response);
                } else {
                  reject(error);
                }
              });
            }),
        ),
      );

      res.json(result);
    }
  }
});

app.listen(5000, function () {
  console.log("Server is listening on port 5000");
});
