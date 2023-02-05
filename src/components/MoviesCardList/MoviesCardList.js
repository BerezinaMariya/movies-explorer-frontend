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
    filterCheckboxState,
    isSearchFilmButtonClick,
    isMovieSearchButtonClick,
    cardListLength,
    setCardListLength,
    moreFilmsButtonClick,
    filteredMoviesCardList,
    setFilteredMoviesCardList,
    onSaveMovieCard,
    onDeleteMovieCard,
    isCardDeleteButtonClick,
    isPreloader,
    isReceivedMoviesCards,
    isReceivedSavedMoviesCards
  } = props;

  const moviesCardList = useContext(MoviesCardsContext);
  const savedMoviesCardList = useContext(SavedMoviesCardsContext);

  const location = useLocation();
  const pathName = location.pathname;

  const {
    filterCards,
    filteredMoviesCards,
    setCardListInitialLengths,
    addMoreMoviesCards,
  } = MoviesCardsFilter();
  const [initialMoviesCardListStringify, setInitialMoviesCardListStringify] =
    useState(localStorage.getItem("initialMoviesCardList"));
  const initialMoviesCardList = JSON.parse(initialMoviesCardListStringify);
  const [width, setWidth] = useState(window.innerWidth);
  const [cardList, setCardList] = useState(moviesCardList);

  function handleSetCardList() {
    let initialCardList = [];
    let filteredFinalMoviesCardList = [];
    const movieNameValue = localStorage.getItem("movieNameValue");

    console.log(moviesCardList);
    console.log(savedMoviesCardList);

    if (pathName === "/movies") {
      initialMoviesCardList.length > 0
        ? (initialCardList = initialMoviesCardList)
        : (initialCardList = moviesCardList);
    } else {
      initialCardList = savedMoviesCardList;
    }

    const filteredCardList = filterCards(
      initialCardList,
      movieNameValue,
      filterCheckboxState
    );

    if (pathName === "/movies") {
      filteredFinalMoviesCardList = filteredMoviesCards(
        filteredCardList,
        savedMoviesCardList
      );
    }

    if (pathName === "/movies") {
      setFilteredMoviesCardList(filteredFinalMoviesCardList);
      setCardList(filteredFinalMoviesCardList);
    } else {
      setFilteredMoviesCardList(filteredCardList);
      setCardList(filteredCardList);
    }
  }

  useEffect(() => {
    const handleResize = (evt) => {
      setTimeout(() => {
        setWidth(evt.target.innerWidth);
      }, 500);
    };
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  useEffect(() => {
    handleSetCardList();
    console.log("new")
  }, [])

  useEffect(() => {
    handleSetCardList();
    console.log("click")
  }, [isMovieSearchButtonClick, isReceivedSavedMoviesCards, filterCheckboxState]);

  useEffect(() => {
    if (pathName === "/movies") {
      setInitialMoviesCardListStringify(
        localStorage.getItem("initialMoviesCardList")
      );
      setCardListInitialLengths(width, setCardListLength);
    }
    if (isPreloader === false) {
      handleSetCardList();
    }
  }, [isPreloader, isSearchFilmButtonClick, filterCheckboxState, isCardDeleteButtonClick]);

  useEffect(() => {
    if (pathName === "/movies") {
      setCardListInitialLengths(width, setCardListLength);
    }
  }, [width]);

  useEffect(() => {
    if (pathName === "/movies") {
      addMoreMoviesCards(
        width,
        filteredMoviesCardList,
        cardListLength,
        setCardListLength
      );
    }
  }, [moreFilmsButtonClick]);

  return (
    <section
      className={`movies-card-list ${
        isPreloader || isReceivedMoviesCards || isReceivedSavedMoviesCards ? "movies-card-list_flex" : ""
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
            ((pathName === "/movies") & (i < cardListLength) ||
              pathName === "/saved-movies") && (
              <MoviesCard
                key={pathName === "/movies" ? card.id : card._id}
                card={card}
                onSaveMovieCard={onSaveMovieCard}
                onDeleteMovieCard={onDeleteMovieCard}
              />
            )
          );
        })
      )}
    </section>
  );
}

export default MoviesCardList;
