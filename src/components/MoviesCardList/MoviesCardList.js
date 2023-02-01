import { useState, useEffect } from "react";

import MoviesCard from "../MoviesCard/MoviesCard";
import MoviesCardsFilter from "../MoviesCardsFilter/MoviesCardsFilter";

function MoviesCardList(props) {
  const { filterCheckboxState, isSearchFilmButtonClick } = props;
  const pathName = window.location.pathname;

  const [initialMoviesCardListStringify, setInitialMoviesCardListStringify] =
    useState(localStorage.getItem("initialMoviesCardList"));

  function setMoviesCardList() {
    const initialMoviesCardList = JSON.parse(initialMoviesCardListStringify);
    const movieNameValue = localStorage.getItem("movieNameValue");
    let finalCardList = [];

    if (pathName === "/movies") {
      finalCardList = MoviesCardsFilter(
        initialMoviesCardList,
        movieNameValue,
        filterCheckboxState
      );
    } else if (pathName === "/saved-movies") {
      // filteredCardList = savedMoviesCardList;
    }
    console.log(initialMoviesCardList);
    console.log(finalCardList);
    return finalCardList;
  }

  useEffect(() => {
    setInitialMoviesCardListStringify(localStorage.getItem("initialMoviesCardList"));
    setMoviesCardList();
  }, [isSearchFilmButtonClick]);

  return (
    <section className="movies-card-list">
      {setMoviesCardList().length > 0 &&
        setMoviesCardList().map((card) => (
          <MoviesCard key={card.id} card={card} />
        ))}
    </section>
  );
}

export default MoviesCardList;
