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
    movieName,
    setMovieName,
    isPreloader,
    isMoviesCardsReceived,
    isSavedMoviesCardsReceived,
    isErrorMessage,
    onSearchMovie,
    filterCheckboxState,
    setFilterCheckboxState,
    isMoviesSearchButtonClick,
    setMoviesSearchButtonClick,
    filteredMoviesCardList,
    windowWidth,  
    getSavedMoviesCards,
    setMoviesCardList,
    isFirstRequest
  } = props;

  useEffect(() => {
    getSavedMoviesCards();
    setIsMovieName(true);
    setMoviesCardList(movieName, filterCheckboxState);
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
        isPreloader={isPreloader}
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
        isErrorMessage={isErrorMessage}
        windowWidth={windowWidth}
        isFirstRequest={isFirstRequest}
      />
    </section>
  );
}

export default Movies;
