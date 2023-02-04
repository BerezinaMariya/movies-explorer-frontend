import { useState } from "react";

import SearchForm from "../SearchForm/SearchForm";
import MoviesCardList from "../MoviesCardList/MoviesCardList";
import MoreFilms from "../MoreFilms/MoreFilms";

function Movies(props) {
  const {
    getMoviesCards,
    SearchFilmButtonClick,
    onSaveMovieCard,
    onDeleteMovieCard,
    isMovieCardSaved,
    filterCheckboxState,
    setFilterCheckboxState,
    cardListLength,
    setCardListLength,
    filteredMoviesCardList,
    setFilteredMoviesCardList,
    isPreloader
  } = props;

  const [moreFilmsButtonClick, setMoreFilmsButtonClick] = useState(false);

  return (
    <section>
      <SearchForm
        getMoviesCards={getMoviesCards}
        filterCheckboxState={filterCheckboxState}
        setFilterCheckboxState={setFilterCheckboxState}
      />
      <MoviesCardList
        SearchFilmButtonClick={SearchFilmButtonClick}
        filterCheckboxState={filterCheckboxState}
        setFilterCheckboxState={setFilterCheckboxState}
        cardListLength={cardListLength}
        setCardListLength={setCardListLength}
        moreFilmsButtonClick={moreFilmsButtonClick}
        filteredMoviesCardList={filteredMoviesCardList}
        setFilteredMoviesCardList={setFilteredMoviesCardList}
        onSaveMovieCard={onSaveMovieCard}
        onDeleteMovieCard={onDeleteMovieCard}
        isMovieCardSaved={isMovieCardSaved}
        isPreloader={isPreloader}
      />
      <MoreFilms
        cardListLength={cardListLength}
        moreFilmsButtonClick={moreFilmsButtonClick}
        setMoreFilmsButtonClick={setMoreFilmsButtonClick}
        filteredMoviesCardList={filteredMoviesCardList}
        isPreloader={isPreloader}
      />
    </section>
  );
}

export default Movies;
