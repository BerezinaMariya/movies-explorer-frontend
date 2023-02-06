import { useEffect } from "react";
import SearchForm from "../SearchForm/SearchForm";
import MoviesCardList from "../MoviesCardList/MoviesCardList";
import EmptyComponent from "../EmptyComponent/EmptyComponent";

function SavedMovies(props) {
  const {
    onSearchMovie,
    setMoviesCardList,
    savedMovieCardList,
    getSavedMoviesCards,
    onDeleteMovieCard,
    isCardDeleteButtonClick,
    isMoviesSearchButtonClick,
    setMoviesSearchButtonClick,
    filterCheckboxState,
    filterCheckboxStateStringify,
    setFilterCheckboxState,
    cardListLength,
    setCardListLength,
    filteredMoviesCardList,
    setFilteredMoviesCardList,
    isPreloader,
    isSavedMoviesCardsReceived,
    movieName,
    setMovieName,
    isMovieName,
    setIsMovieName,
    cardList,
    setCardList,
    pathName,
    isErrorMessage,
    setErrorMessage,
    windowWidth
  } = props;
 
  useEffect(() => {
    getSavedMoviesCards();
    const movieNameInput = "";
    const filterCheckbox = false;
    setMoviesCardList(movieNameInput, filterCheckbox);
    console.log("getSavedMoviesCards");
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
        cardList={cardList}
        setCardList={setCardList}
        savedMovieCardList={savedMovieCardList}
        onDeleteMovieCard={onDeleteMovieCard}
        isCardDeleteButtonClick={isCardDeleteButtonClick}
        isSavedMoviesSearchButtonClick={isMoviesSearchButtonClick}
        isMoviesSearchButtonClick={isMoviesSearchButtonClick}
        filterCheckboxState={filterCheckboxState}
        setFilterCheckboxState={setFilterCheckboxState}
        cardListLength={cardListLength}
        setCardListLength={setCardListLength}
        filteredMoviesCardList={filteredMoviesCardList}
        setFilteredMoviesCardList={setFilteredMoviesCardList}
        movieName={movieName}
        setMovieName={setMovieName}
        isMovieName={isMovieName}
        isPreloader={isPreloader}
        isSavedMoviesCardsReceived={isSavedMoviesCardsReceived}
        isErrorMessage={isErrorMessage}
        setErrorMessage={setErrorMessage}
        windowWidth={windowWidth}
      />
      <EmptyComponent />
    </section>
  );
}

export default SavedMovies;
