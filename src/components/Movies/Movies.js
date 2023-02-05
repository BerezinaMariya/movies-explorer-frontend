import { useState } from "react";

import SearchForm from "../SearchForm/SearchForm";
import MoviesCardList from "../MoviesCardList/MoviesCardList";
import MoreFilms from "../MoreFilms/MoreFilms";

function Movies(props) {
  const {
    getMoviesCards,
    isSearchFilmButtonClick,
    onSaveMovieCard,
    onDeleteMovieCard,
    filterCheckboxState,
    setFilterCheckboxState,
    cardListLength,
    setCardListLength,
    filteredMoviesCardList,
    setFilteredMoviesCardList,
    isPreloader,
    isReceivedMoviesCards,
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
        isSearchFilmButtonClick={isSearchFilmButtonClick}
        filterCheckboxState={filterCheckboxState}
        setFilterCheckboxState={setFilterCheckboxState}
        cardListLength={cardListLength}
        setCardListLength={setCardListLength}
        moreFilmsButtonClick={moreFilmsButtonClick}
        filteredMoviesCardList={filteredMoviesCardList}
        setFilteredMoviesCardList={setFilteredMoviesCardList}
        onSaveMovieCard={onSaveMovieCard}
        onDeleteMovieCard={onDeleteMovieCard}
        isPreloader={isPreloader}
        isReceivedMoviesCards={isReceivedMoviesCards}
      />
      <MoreFilms
        cardListLength={cardListLength}
        moreFilmsButtonClick={moreFilmsButtonClick}
        setMoreFilmsButtonClick={setMoreFilmsButtonClick}
        filteredMoviesCardList={filteredMoviesCardList}
        isPreloader={isPreloader}
        isReceivedMoviesCards={isReceivedMoviesCards}
      />
    </section>
  );
}

export default Movies;
