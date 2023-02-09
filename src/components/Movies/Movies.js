import { useEffect } from "react";
import { useLocation } from "react-router-dom";
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
    setInitialCardListLength,
    isMovieName,
    setIsMovieName,
    movieName,
    setMovieName,
    isPreloader,
    isLoading,
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
    setWindowWidth,
    getSavedMoviesCards,
    setMoviesCardList,
    isFirstRequest,
  } = props;

  const location = useLocation();
  const pathName = location.pathname;

  useEffect(() => {
    getSavedMoviesCards();
    setIsMovieName(true);
  }, []);

  useEffect(() => {
    const handleResize = (evt) => {
      setTimeout(() => {
        setWindowWidth(evt.target.innerWidth);
      }, 500);
    };
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  useEffect(() => {
    if (pathName === "/movies") {
      setInitialCardListLength(windowWidth, setCardListLength);
    }
  }, [windowWidth]);

  useEffect(() => {
    if (pathName === "/movies") {
      if (!isPreloader && !isLoading) {
        setMoviesCardList(movieName, filterCheckboxState);
      }
    }
  }, [isPreloader, isLoading]);

  useEffect(() => {
    if (pathName === "/movies") {
      setMoviesCardList(movieName, filterCheckboxState);
    }
  }, [isMoviesSearchButtonClick, filterCheckboxState]);

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
