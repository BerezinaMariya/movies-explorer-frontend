import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import SearchForm from "../SearchForm/SearchForm";
import MoviesCardList from "../MoviesCardList/MoviesCardList";
import EmptyComponent from "../EmptyComponent/EmptyComponent";

function SavedMovies(props) {
  const {
    isLoading,
    savedMovieCardList,
    onDeleteMovieCard,
    onError,
    cardList,
    cardListLength,
    isMovieName,
    setIsMovieName,
    savedMovieName,
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
    setSavedMoviesCardList,
    isCardDeleteButtonClick,
  } = props;

  const location = useLocation();
  const pathName = location.pathname;

  useEffect(() => {
    getSavedMoviesCards();
    setIsMovieName(true);
  }, []);

  useEffect(() => {
    if (!isLoading) {
      setSavedMoviesCardList("", false);
    }
  }, [isLoading, isCardDeleteButtonClick]);

  useEffect(() => {
    if (pathName === "/saved-movies") {
      setSavedMoviesCardList(savedMovieName, savedMoviesFilterCheckboxState);
    }
  }, [isMoviesSearchButtonClick, savedMoviesFilterCheckboxState]);

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
