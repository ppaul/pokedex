import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const Pokemon = () => {
  const { id } = useParams();
  const [pokemonDetails, setPokemonDetails] = useState({});

  useEffect(() => {
    (async () => {
      const response = await fetch(
        `/api/pokemon/${id}`, // fetch all generations
        {
          headers: {
            Accept: "application/json",
          },
        },
      );
      const data = await response.json();
      setPokemonDetails(data);
    })();
  }, [id]);

  const { abilities, name, sprites, weight } = pokemonDetails;

  return (
    <div>
      <h1>{name}</h1>
      {abilities?.length && (
        <>
          <div>
            abilities:{" "}
            {abilities?.map(({ ability }) => (
              <span key={ability.name}>{ability.name}</span>
            ))}
          </div>
          {sprites?.front_default && (
            <img src={sprites.front_default} alt="missing pic" />
          )}
        </>
      )}
      <div>weight: {weight}</div>
    </div>
  );
};

export default Pokemon;
