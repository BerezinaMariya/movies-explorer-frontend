import { useEffect } from "react";
import SearchForm from "../SearchForm/SearchForm";
import MoviesCardList from "../MoviesCardList/MoviesCardList";
import MoreFilms from "../MoreFilms/MoreFilms";

function Movies(props) {
  const {
    onSaveMovieCard,
    onDeleteMovieCard,
    onError,
    cardList,
    cardListLength,
    setCardListLength,
    isMovieName,
    setIsMovieName,
    isPreloader,
    isMoviesCardsReceived,
    isSavedMoviesCardsReceived,
    isErrorMessage,
    onSearchMovie,
    filterCheckboxState,
    filterCheckboxStateStringify,
    setFilterCheckboxState,
    isMoviesSearchButtonClick,
    setMoviesSearchButtonClick,
    setMovieName,
    filteredMoviesCardList,
    windowWidth,  
    getSavedMoviesCards,
    setMoviesCardList
  } = props;

  useEffect(() => {
    getSavedMoviesCards();
    const movieNameInput = localStorage.getItem("movieNameValue");
    const filterCheckbox = JSON.parse(filterCheckboxStateStringify);
    setMoviesCardList(movieNameInput, filterCheckbox);
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
        onSaveMovieCard={onSaveMovieCard}
        onDeleteMovieCard={onDeleteMovieCard}
        onError={onError}
        cardList={cardList}
        cardListLength={cardListLength}
        isMovieName={isMovieName}
        isPreloader={isPreloader}
        isMoviesCardsReceived={isMoviesCardsReceived}
        isSavedMoviesCardsReceived={isSavedMoviesCardsReceived}
        isErrorMessage={isErrorMessage}
      />
      <MoreFilms
        cardListLength={cardListLength}
        setCardListLength={setCardListLength}
        filteredMoviesCardList={filteredMoviesCardList}
        isPreloader={isPreloader}
        isMoviesCardsReceived={isMoviesCardsReceived}
        isErrorMessage={isErrorMessage}
        windowWidth={windowWidth}
      />
    </section>
  );
}

export default Movies;
