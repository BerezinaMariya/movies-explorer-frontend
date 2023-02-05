import { useState, useEffect } from "react";

import SearchForm from "../SearchForm/SearchForm";
import MoviesCardList from "../MoviesCardList/MoviesCardList";
import EmptyComponent from "../EmptyComponent/EmptyComponent";

function SavedMovies(props) {
  const {
    getSavedMoviesCards,
    onDeleteMovieCard,
    isCardDeleteButtonClick,
    filterCheckboxState,
    setFilterCheckboxState,
    cardListLength,
    setCardListLength,
    filteredMoviesCardList,
    setFilteredMoviesCardList,
    isPreloader,
    isReceivedSavedMoviesCards,
    windowWidth
  } = props;

  const [isSavedMoviesSearchButtonClick, setSavedMoviesSearchButtonClick] = useState(false);
  const [movieNameValue, setMovieNameValue] = useState("");
 
  useEffect(() => {
    getSavedMoviesCards();
  }, []);

  return (
    <section>
      <SearchForm
        filterCheckboxState={filterCheckboxState}
        setFilterCheckboxState={setFilterCheckboxState}
        isSavedMoviesSearchButtonClick={isSavedMoviesSearchButtonClick}
        setSavedMoviesSearchButtonClick={setSavedMoviesSearchButtonClick}
        movieNameValue={movieNameValue}
        setMovieNameValue={setMovieNameValue}
      />
      <MoviesCardList
        onDeleteMovieCard={onDeleteMovieCard}
        isCardDeleteButtonClick={isCardDeleteButtonClick}
        isSavedMoviesSearchButtonClick={isSavedMoviesSearchButtonClick}
        filterCheckboxState={filterCheckboxState}
        setFilterCheckboxState={setFilterCheckboxState}
        cardListLength={cardListLength}
        setCardListLength={setCardListLength}
        filteredMoviesCardList={filteredMoviesCardList}
        setFilteredMoviesCardList={setFilteredMoviesCardList}
        movieNameValue={movieNameValue}
        setMovieNameValue={setMovieNameValue}
        isPreloader={isPreloader}
        isReceivedSavedMoviesCards={isReceivedSavedMoviesCards}
        windowWidth={windowWidth}
      />
      <EmptyComponent />
    </section>
  );
}

export default SavedMovies;
