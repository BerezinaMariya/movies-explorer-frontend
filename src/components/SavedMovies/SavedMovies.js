import { useEffect } from "react";
import SearchForm from "../SearchForm/SearchForm";
import MoviesCardList from "../MoviesCardList/MoviesCardList";
import EmptyComponent from "../EmptyComponent/EmptyComponent";

function SavedMovies(props) {
  const {
    savedMovieCardList,
    onDeleteMovieCard,
    onError,
    cardList,
    cardListLength,
    isMovieName,
    setIsMovieName,
    setMovieName,
    isPreloader,
    isSavedMoviesCardsReceived,
    isErrorMessage,
    onSearchMovie,
    filterCheckboxState,
    setFilterCheckboxState,
    isMoviesSearchButtonClick,
    setMoviesSearchButtonClick,
    getSavedMoviesCards,
    setSavedMoviesCardList
  } = props;
 
  useEffect(() => {
    getSavedMoviesCards();
    const movieNameInput = "";
    const filterCheckbox = false;
    setSavedMoviesCardList(movieNameInput, filterCheckbox);
  }, []);

  return (
    <section>
      <SearchForm
        onSearchMovie={onSearchMovie}
        filterCheckboxState={filterCheckboxState}
        setFilterCheckboxState={setFilterCheckboxState}
        isMoviesSearchButtonClick={isMoviesSearchButtonClick}
        setMoviesSearchButtonClick={setMoviesSearchButtonClick}
        setIsMovieName={setIsMovieName}
        setMovieName={setMovieName}
      />
      <MoviesCardList
        savedMovieCardList={savedMovieCardList}
        onDeleteMovieCard={onDeleteMovieCard}
        onError={onError}
        cardList={cardList}
        cardListLength={cardListLength}
        isMovieName={isMovieName}
        isPreloader={isPreloader}
        isSavedMoviesCardsReceived={isSavedMoviesCardsReceived}
        isErrorMessage={isErrorMessage}
      />
      <EmptyComponent />
    </section>
  );
}

export default SavedMovies;
