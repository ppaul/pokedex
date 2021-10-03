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

const searchStyle = css`
  text-align: start;
  margin: 10px;
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

const PokemonDetails = ({ details }) => {
  const { color, name } = details;

  return (
    <div css={pokemonStyle} style={{ background: color }}>
      <h2>{name}</h2>
    </div>
  );
};

const PokemonList = () => {
  const [characters, setCharacters] = useState([]);
  const [generations, setGenerations] = useState([]);
  const [selectedGeneration, setSelectedGeneration] = useState(null);
  const [loadingData, setLoadingData] = useState(false);
  const [filterString, setFilterString] = useState("");

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
    if (selectedGeneration) {
      setLoadingData(true);
    }
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
        if (data.some((r) => r.status !== "fulfilled")) {
          console.warn("Some pokemons could not be found!");
        }
        setCharacters(data.filter((p) => p.status === "fulfilled"));
        setLoadingData(false);
      }
    })();
  }, [selectedGeneration]);

  const onFilterChange = (event) => setFilterString(event.target.value);

  const shownCharacters = filterString
    ? characters.filter(({ value }) => value.name.indexOf(filterString) !== -1)
    : characters;

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

      <div css={searchStyle}>
        Search by:{" "}
        <input type="text" value={filterString} onChange={onFilterChange} />
      </div>

      {loadingData && (
        <div>
          <h3>Loading data...</h3>
        </div>
      )}

      <div css={pokemonListStyle}>
        {shownCharacters.map(({ value }) => (
          <Link to={`pokemon/${value.id}`} key={value.name}>
            <PokemonDetails details={value} />
          </Link>
        ))}
      </div>
    </div>
  );
};

export default PokemonList;
