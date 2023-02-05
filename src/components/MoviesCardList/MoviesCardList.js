import { useState, useEffect, useContext } from "react";
import { useLocation } from "react-router-dom";
import { SavedMoviesCardsContext } from "../../contexts/SavedMoviesCardsContext";
import { MoviesCardsContext } from "../../contexts/MoviesCardsContext";
import MoviesCard from "../MoviesCard/MoviesCard";
import MoviesCardsFilter from "../MoviesCardsFilter/MoviesCardsFilter";
import Preloader from "../Preloader/Preloader";
import ErrorMovieMessage from "../ErrorMovieMessage/ErrorMovieMessage";

function MoviesCardList(props) {
  const {
    onSaveMovieCard,
    onDeleteMovieCard,
    isCardDeleteButtonClick,
    isMovieSearchButtonClick,
    isSavedMoviesSearchButtonClick,
    filterCheckboxState,
    cardListLength,
    setCardListLength,
    setFilteredMoviesCardList,
    movieNameValue,
    setMovieNameValue,
    isPreloader,
    isReceivedMoviesCards,
    isReceivedSavedMoviesCards,
    windowWidth
  } = props;

  const moviesCardList = useContext(MoviesCardsContext);
  const savedMoviesCardList = useContext(SavedMoviesCardsContext);

  const location = useLocation();
  const pathName = location.pathname;

  const {
    filterCards,
    filteredMoviesCards,
    setInitialCardListLength
   } = MoviesCardsFilter();

  const [initialMoviesCardList, setInitialMoviesCardList] = useState(moviesCardList);
  const [cardList, setCardList] = useState(moviesCardList);



  function handleSetMoviesCardList() {
    setInitialCardListLength(windowWidth, setCardListLength);

    const filteredCardList = filterCards(
      initialMoviesCardList,
      movieNameValue,
      filterCheckboxState
    );

    const finalFilteredCardList = filteredMoviesCards(
      filteredCardList,
      savedMoviesCardList
    );

    return finalFilteredCardList;
  }

  function handleSetSavedMoviesCardList() {
    return filterCards(
      savedMoviesCardList,
      movieNameValue,
      filterCheckboxState
    );
  }

  function handleSetCardList() {
    if (pathName === "/movies") {
      setFilteredMoviesCardList(handleSetMoviesCardList());
      setCardList(handleSetMoviesCardList());
      console.log(handleSetMoviesCardList())
    } else {
      setFilteredMoviesCardList(handleSetSavedMoviesCardList());
      setCardList(handleSetSavedMoviesCardList());
      console.log(handleSetSavedMoviesCardList());
    }
  }

  useEffect(() => {
    if (pathName === "/movies") {
      const localStorageMoviesCardListStringify = localStorage.getItem("initialMoviesCardList");
      const localStorageMoviesCardList = JSON.parse(localStorageMoviesCardListStringify);

      setInitialMoviesCardList(localStorageMoviesCardList);
      setMovieNameValue(localStorage.getItem("movieNameValue"));

      if(!isPreloader) {
        handleSetCardList();
      }
    } else {
      handleSetCardList();
    }
  }, [
    isPreloader,
    isMovieSearchButtonClick,
    isSavedMoviesSearchButtonClick,
    filterCheckboxState,
    isCardDeleteButtonClick,
    isReceivedSavedMoviesCards,
    windowWidth
  ]);

  return (
    <section
      className={`movies-card-list ${
        isPreloader || isReceivedMoviesCards || isReceivedSavedMoviesCards
          ? "movies-card-list_flex"
          : ""
      }`}
    >
      {isPreloader ? (
        <Preloader />
      ) : isReceivedMoviesCards || isReceivedSavedMoviesCards ? (
        <ErrorMovieMessage />
      ) : (
        cardList.length > 0 &&
        cardList.map((card, i) => {
          return (
            (((pathName === "/movies") & (i < cardListLength)) ||
              (pathName === "/saved-movies")) && 
              <MoviesCard
                key={pathName === "/movies" ? card.id : card._id}
                card={card}
                onSaveMovieCard={onSaveMovieCard}
                onDeleteMovieCard={onDeleteMovieCard}
              />
          );
        })
      )}
    </section>
  );
}

export default MoviesCardList;
