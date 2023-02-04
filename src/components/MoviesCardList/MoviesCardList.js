import { useState, useEffect, useContext } from "react";
import { useLocation } from "react-router-dom";
import { SavedMoviesCardsContext } from "../../contexts/SavedMoviesCardsContext";
import { MoviesCardsContext } from "../../contexts/MoviesCardsContext";
import MoviesCard from "../MoviesCard/MoviesCard";
import MoviesCardsFilter from "../MoviesCardsFilter/MoviesCardsFilter";
import Preloader from "../Preloader/Preloader";

function MoviesCardList(props) {
  const {
    filterCheckboxState,
    SearchFilmButtonClick,
    cardListLength,
    setCardListLength,
    moreFilmsButtonClick,
    filteredMoviesCardList,
    setFilteredMoviesCardList,
    onSaveMovieCard,
    onDeleteMovieCard,
    isMovieCardSaved,
    isPreloader
  } = props;

  const MoviesCardList = useContext(MoviesCardsContext);
  const savedMoviesCardList = useContext(SavedMoviesCardsContext);

  const location = useLocation();
  const pathName = location.pathname;

  const { filterCards, setCardListInitialLengths, addMoreMoviesCards } =
    MoviesCardsFilter();
  const [initialMoviesCardListStringify, setInitialMoviesCardListStringify] =
    useState(localStorage.getItem("initialMoviesCardList"));
  const initialMoviesCardList = JSON.parse(initialMoviesCardListStringify);
  const [width, setWidth] = useState(window.innerWidth);
  const [cardList, setCardList] = useState(MoviesCardList);

  function handleSetCardList() {
    let initialCardList = [];
    const movieNameValue = localStorage.getItem("movieNameValue");

    if (pathName === "/movies") {
      initialMoviesCardList.length > 0
      ? initialCardList = initialMoviesCardList
      : initialCardList = MoviesCardList;
    } else if (pathName === "/saved-movies") {
      initialCardList = savedMoviesCardList;
    }

    const filteredCardList = filterCards(
      initialCardList,
      movieNameValue,
      filterCheckboxState
    );

    setFilteredMoviesCardList(filteredCardList);
    setCardList(filteredCardList);
  }

  useEffect(() => {
    const handleResize = (evt) => {
      setWidth(evt.target.innerWidth);
    };
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

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
  }, [
    isPreloader,
    SearchFilmButtonClick,
    filterCheckboxState,
  ]);

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
    <section className={`movies-card-list ${
      isPreloader
        ? "movies-card-list_flex"
        : ""
    }`}>
      {isPreloader 
      ? <Preloader/>
      : cardList.length > 0 &&
      cardList.map((card, i) => {
        return (
          ((pathName === "/movies") & (i < cardListLength) ||
            pathName === "/saved-movies") &&(
            <MoviesCard
              key={pathName === "/movies" ? card.id : card._id}
              card={card}
              onSaveMovieCard={onSaveMovieCard}
              onDeleteMovieCard={onDeleteMovieCard}
              isMovieCardSaved={isMovieCardSaved}
            />
          ) 
        );
      })
      }
    </section>
  );
}

export default MoviesCardList;



