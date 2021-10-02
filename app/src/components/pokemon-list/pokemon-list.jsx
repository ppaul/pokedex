// this comment tells babel to convert jsx to calls to a function called jsx instead of React.createElement
/** @jsx jsx */
/** @jsxRuntime classic */
import { css, jsx } from "@emotion/react";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { pageStyle } from "@Shared/style";

const generationStyle = css`
  cursor: pointer;
  margin: 0 20px;
`;

const generationsStyle = css`
  display: flex;
  background: #07204e;
  padding: 50px;
  color: orange;
  font-size: 20px;
`;

const pokemonListStyle = css`
  display: flex;
  flex-wrap: wrap;
  background: #2564ac;
  color: white;
`;

const pokemonStyle = css`
  margin: 20px;
  color: white;
  width: 200px;
  height: 300px;
  border: 1px solid grey;
`;

const getPokemonIdFromUrl = (url) => {
  const urlParts = url.split("/");
  return urlParts.slice(-2)[0];
};

const PokemonDetails = ({ name, url }) => {
  const [details, setDetails] = useState({});
  useEffect(() => {
    (async () => {
      const response = await fetch(
        url, // fetch pokemon details
        {
          headers: {
            Accept: "application/json",
          },
        },
      );

      const data = await response.json();
      setDetails(data);
    })();
  }, [url]);

  const color = details?.color?.name;

  return (
    <div css={pokemonStyle} style={{ background: color }}>
      <h2>{name}</h2>
    </div>
  );
};

const BATCH_SIZE = 6;

const PokemonList = () => {
  const [characters, setCharacters] = useState([]);
  const [generations, setGenerations] = useState([]);
  const [selectedGeneration, setSelectedGeneration] = useState(null);
  const [maxDisplayed, setMaxDisplayed] = useState(BATCH_SIZE);

  useEffect(() => {
    (async () => {
      const response = await fetch(
        `/api/generation`, // fetch all generations
        {
          headers: {
            Accept: "application/json",
          },
        },
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
              Accept: "application/json",
            },
          },
        );
        const data = await response.json();
        setCharacters(data.pokemon_species);
      }
    })();
    setMaxDisplayed(BATCH_SIZE);
  }, [selectedGeneration]);

  return (
    <div css={pageStyle}>
      <h2>Available generations</h2>
      <div css={generationsStyle}>
        {generations.map(({ name }) => (
          <div
            css={generationStyle}
            style={
              name === selectedGeneration
                ? {
                    background: "blue",
                    color: "yellow",
                    padding: "10px",
                    marginTop: "-10px",
                  }
                : null
            }
            onClick={() => setSelectedGeneration(name)}
            key={name}
          >
            {name}
          </div>
        ))}
      </div>

      <div css={pokemonListStyle}>
        {characters.slice(0, maxDisplayed).map((c) => (
          <Link to={`pokemon/${getPokemonIdFromUrl(c.url)}`} key={c.name}>
            <PokemonDetails name={c.name} url={c.url} />
          </Link>
        ))}
      </div>
      {maxDisplayed < characters.length && (
        <div>
          <button
            type="button"
            onClick={() => setMaxDisplayed(maxDisplayed + BATCH_SIZE)}
          >
            Load more
          </button>
        </div>
      )}
    </div>
  );
};

export default PokemonList;
