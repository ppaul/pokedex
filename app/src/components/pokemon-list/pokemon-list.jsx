// this comment tells babel to convert jsx to calls to a function called jsx instead of React.createElement
/** @jsx jsx */
/** @jsxRuntime classic */
import { css, jsx } from "@emotion/react";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const generationStyle = css`
    cursor: pointer;
    margin: 0 20px;
`;

const getPokemonIdFromUrl = (url) => {
    const urlParts = url.split("/");
    return urlParts.slice(-2)[0];
};

const PokemonList = () => {
    const [characters, setCharacters] = useState([]);
    const [generations, setGenerations] = useState([]);
    const [selectedGeneration, setSelectedGeneration] = useState(null);

    useEffect(() => {
        (async () => {
            const response = await fetch(
                `/api/generation`, // fetch all generations
                {
                    headers: {
                        Accept: "application/json"
                    }
                }
            );
            const data = await response.json();
            setGenerations(data);
        })();
    }, []);

    useEffect(() => {
        (async () => {
            if (selectedGeneration) {
                const response = await fetch(
                    `/api/pokemon?generation=${selectedGeneration}`,
                    {
                        headers: {
                            Accept: "application/json"
                        }
                    }
                );
                const data = await response.json();
                setCharacters(data.pokemon_species);
            }
        })();
    }, [selectedGeneration]);

    return (
        <div>
            <div>
                {generations.map(({ name }) => (
                    <span
                        css={generationStyle}
                        style={
                            name === selectedGeneration
                                ? {
                                      background: "cyan",
                                      color: "white"
                                  }
                                : null
                        }
                        onClick={() => setSelectedGeneration(name)}
                        key={name}
                    >
                        {name}
                    </span>
                ))}
            </div>
            {characters.map((c) => (
                <Link to={`pokemon/${getPokemonIdFromUrl(c.url)}`} key={c.name}>
                    <div>{c.name}</div>
                </Link>
            ))}
        </div>
    );
};

export default PokemonList;
