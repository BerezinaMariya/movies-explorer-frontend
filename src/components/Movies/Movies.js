import { useState, useEffect } from "react";
import SearchForm from "../SearchForm/SearchForm";
import MoviesCardList from "../MoviesCardList/MoviesCardList";
import MoreFilms from "../MoreFilms/MoreFilms";
import MoviesCardsFilter from "../MoviesCardsFilter/MoviesCardsFilter";

function Movies(props) {
  const {
    onSearchMovie,
    setMoviesCardList,
    movieCardList,
    savedMovieCardList,
    getMoviesCards,
    getSavedMoviesCards,
    onSaveMovieCard,
    onDeleteMovieCard,
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
    isMoviesCardsReceived,
    isSavedMoviesCardsReceived,
    movieName,
    setMovieName,
    isMovieName,
    setIsMovieName,
    cardList,
    setCardList,
    pathName,
    windowWidth
  } = props;

  function handleError() {
    if (!isMovieName || 
      !isMoviesCardsReceived || 
      !isSavedMoviesCardsReceived ||
      cardList.length === 0
    ) {
      return true;
    } else {
      return false;
    }
  }

  const isErrorMessage = handleError();
  
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
        cardList={cardList}
        setCardList={setCardList}
        movieCardList={movieCardList}
        savedMovieCardList={savedMovieCardList}
        onSaveMovieCard={onSaveMovieCard}
        onDeleteMovieCard={onDeleteMovieCard}
        isMoviesSearchButtonClick={isMoviesSearchButtonClick}
        filterCheckboxState={filterCheckboxState}
        setFilterCheckboxState={setFilterCheckboxState}
        cardListLength={cardListLength}
        setCardListLength={setCardListLength}
        setFilteredMoviesCardList={setFilteredMoviesCardList}
        movieName={movieName}
        setMovieName={setMovieName}
        isMovieName={isMovieName}
        isPreloader={isPreloader}
        isMoviesCardsReceived={isMoviesCardsReceived}
        isSavedMoviesCardsReceived={isSavedMoviesCardsReceived}
        isErrorMessage={isErrorMessage}
        windowWidth={windowWidth}
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
