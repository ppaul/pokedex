import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";

const Pokemon = ({ username, token }) => {
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

  return token ? (
    <div>
      <Link to="/pokemon">
        <div>Home</div>
      </Link>
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
      <footer>
        <h6>logged user: {username}</h6>
      </footer>
    </div>
  ) : (
    <div>
      Please{" "}
      <Link
        to={{ pathname: "/login", state: { returnToPath: `/pokemon/${id}` } }}
      >
        Login
      </Link>{" "}
      to view Pokemon details
    </div>
  );
};

export default Pokemon;
