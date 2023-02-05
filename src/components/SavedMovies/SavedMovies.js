import { useState, useEffect } from "react";
import SearchForm from "../SearchForm/SearchForm";
import MoviesCardList from "../MoviesCardList/MoviesCardList";
import EmptyComponent from "../EmptyComponent/EmptyComponent";

function SavedMovies(props) {
  const {
    getSavedMoviesCards,
    isReceivedSavedMoviesCards,
    onDeleteMovieCard,
    isCardDeleteButtonClick,
    filterCheckboxState,
    setFilterCheckboxState,
    cardListLength,
    setCardListLength,
    filteredMoviesCardList,
    setFilteredMoviesCardList,
    isPreloader
  } = props;

  const [isMovieSearchButtonClick, setMovieSearchButtonClick] = useState(false);

  useEffect(() => {
    if (isReceivedSavedMoviesCards) {
      getSavedMoviesCards();
    }
  }, [isReceivedSavedMoviesCards]);

  return (
    <section>
      <SearchForm
        filterCheckboxState={filterCheckboxState}
        setFilterCheckboxState={setFilterCheckboxState}
        isMovieSearchButtonClick={isMovieSearchButtonClick}
        setMovieSearchButtonClick={setMovieSearchButtonClick}
      />
      <MoviesCardList
        isReceivedSavedMoviesCards={isReceivedSavedMoviesCards}
        onDeleteMovieCard={onDeleteMovieCard}
        isMovieSearchButtonClick={isMovieSearchButtonClick}
        isCardDeleteButtonClick={isCardDeleteButtonClick}
        filterCheckboxState={filterCheckboxState}
        setFilterCheckboxState={setFilterCheckboxState}
        cardListLength={cardListLength}
        setCardListLength={setCardListLength}
        filteredMoviesCardList={filteredMoviesCardList}
        setFilteredMoviesCardList={setFilteredMoviesCardList}
        isPreloader={isPreloader}
      />
      <EmptyComponent />
    </section>
  );
}

export default SavedMovies;
