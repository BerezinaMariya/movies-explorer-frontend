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
    setSavedMovieName,
    isPreloader,
    isSavedMoviesCardsReceived,
    isErrorMessage,
    onSearchMovie,
    savedMoviesFilterCheckboxState,
    setSavedMoviesFilterCheckboxState,
    isMoviesSearchButtonClick,
    setMoviesSearchButtonClick,
    getSavedMoviesCards,
    setSavedMoviesCardList
  } = props;
 
  useEffect(() => {
    getSavedMoviesCards();
    setSavedMoviesCardList("", false);
  }, []);

  return (
    <section>
      <SearchForm
        onSearchMovie={onSearchMovie}
        savedMoviesFilterCheckboxState={savedMoviesFilterCheckboxState}
        setSavedMoviesFilterCheckboxState={setSavedMoviesFilterCheckboxState}
        isMoviesSearchButtonClick={isMoviesSearchButtonClick}
        setMoviesSearchButtonClick={setMoviesSearchButtonClick}
        setIsMovieName={setIsMovieName}
        setSavedMovieName={setSavedMovieName}
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
