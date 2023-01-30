import { useContext } from "react";
import { useHistory } from "react-router-dom";

import { MoviesCardsContext } from "../../contexts/MoviesCardsContext";
import { SavedMoviesCardsContext } from "../../contexts/SavedMoviesCardsContext";
import MoviesCard from "../MoviesCard/MoviesCard";

function MoviesCardList() {
  const history = useHistory();
  const pathName = history.location.pathname;

  const moviesCardList = useContext(MoviesCardsContext);
  const savedMoviesCardList = useContext(SavedMoviesCardsContext);


  function handleSetCardList() {
    let cardList = "";
    if (pathName === "/movies") {
      cardList = moviesCardList;
    } else if (pathName === "/saved-movies") {
      cardList = savedMoviesCardList;
    }
    return cardList;
  }

  return (
    <section className="movies-card-list">
      {handleSetCardList().map((card) => (
        <MoviesCard
          key={card._id}
          card={card}
        />
      ))}
    </section>
  );
}

export default MoviesCardList;
