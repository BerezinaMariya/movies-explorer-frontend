import { useState } from "react";
import SearchForm from "../SearchForm/SearchForm";
import MoviesCardList from "../MoviesCardList/MoviesCardList";
import MoreFilms from "../MoreFilms/MoreFilms";

function Movies(props) {
  const {
    getMoviesCards,
    onSaveMovieCard,
    onDeleteMovieCard,
    isMovieSearchButtonClick,
    filterCheckboxState,
    setFilterCheckboxState,
    cardListLength,
    setCardListLength,
    filteredMoviesCardList,
    setFilteredMoviesCardList,
    isPreloader,
    isReceivedMoviesCards,
    isReceivedSavedMoviesCards,
    windowWidth
  } = props;

  const [movieNameValue, setMovieNameValue] = useState("");

  return (
    <section>
      <SearchForm
        getMoviesCards={getMoviesCards}
        filterCheckboxState={filterCheckboxState}
        setFilterCheckboxState={setFilterCheckboxState}
        movieNameValue={movieNameValue}
        setMovieNameValue={setMovieNameValue}
      />
      <MoviesCardList
        onSaveMovieCard={onSaveMovieCard}
        onDeleteMovieCard={onDeleteMovieCard}
        isMovieSearchButtonClick={isMovieSearchButtonClick}
        filterCheckboxState={filterCheckboxState}
        setFilterCheckboxState={setFilterCheckboxState}
        cardListLength={cardListLength}
        setCardListLength={setCardListLength}
        setFilteredMoviesCardList={setFilteredMoviesCardList}
        movieNameValue={movieNameValue}
        setMovieNameValue={setMovieNameValue}
        isPreloader={isPreloader}
        isReceivedMoviesCards={isReceivedMoviesCards}
        isReceivedSavedMoviesCards={isReceivedSavedMoviesCards}
        windowWidth={windowWidth}
      />
      <MoreFilms
        cardListLength={cardListLength}
        setCardListLength={setCardListLength}
        filteredMoviesCardList={filteredMoviesCardList}
        isPreloader={isPreloader}
        isReceivedMoviesCards={isReceivedMoviesCards}
        windowWidth={windowWidth}
      />
    </section>
  );
}

export default Movies;
