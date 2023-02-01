import { useState } from "react";

import SearchForm from "../SearchForm/SearchForm";
import MoviesCardList from "../MoviesCardList/MoviesCardList";
import MoreFilms from "../MoreFilms/MoreFilms";

function Movies(props) {
  const { getMoviesCards, isSearchFilmButtonClick } = props;

  const [filterCheckboxState, setFilterCheckboxState] = useState(false);
  
  return (
    <section>
      <SearchForm
        getMoviesCards={getMoviesCards}
        filterCheckboxState={filterCheckboxState}
        setFilterCheckboxState={setFilterCheckboxState}
      />
      <MoviesCardList
        filterCheckboxState={filterCheckboxState}
        isSearchFilmButtonClick={isSearchFilmButtonClick}
      />
      <MoreFilms />
    </section>
  );
}

export default Movies;
