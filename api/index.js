import express from "express";
import Pokedex from "pokedex-promise-v2";
import fetch from "node-fetch";
const P = new Pokedex();

let app = express();

app.get("/api/pokemon/:id", async function (req, res) {
    P.getPokemonByName(req.params.id, function (response, error) {
        // with callback
        if (!error) {
            console.log("Got res: ");
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

app.get("/api/pokemon", async function (req, res) {
    const { query } = req;
    const { generation, name, type } = query;
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
            `https://pokeapi.co/api/v2/generation/${generation}`
        );
        const data = await response.json();
        const selectedData = generation === "all" ? data.pokemon_species : data;
        res.json(selectedData);
    }
});

app.listen(5000, function () {
    console.log("Server is listening on port 5000");
});
