import { useState, useEffect } from "react";

import MoviesCard from "../MoviesCard/MoviesCard";
import MoviesCardsFilter from "../MoviesCardsFilter/MoviesCardsFilter";

function MoviesCardList(props) {
  const {
    filterCheckboxState,
    SearchFilmButtonClick,
    cardListLength,
    setCardListLength,
    moreFilmsButtonClick,
    filteredMoviesCardList,
    setFilteredMoviesCardList,
  } = props;

  const pathName = window.location.pathname;

  const { filterCards, setInitialCardListLengths, addMoreMoviesCards } =
    MoviesCardsFilter();

  const [width, setWidth] = useState(window.innerWidth);
  const [initialMoviesCardListStringify, setInitialMoviesCardListStringify] =
    useState(localStorage.getItem("initialMoviesCardList"));
  const initialMoviesCardList = JSON.parse(initialMoviesCardListStringify);
  const [cardList, setCardList] = useState(initialMoviesCardList);

  function handleMoviesCardList() {
    if (pathName === "/movies") {
      const movieNameValue = localStorage.getItem("movieNameValue");
      setFilteredMoviesCardList(
        filterCards(initialMoviesCardList, movieNameValue, filterCheckboxState)
      );
      setCardList(
        filterCards(initialMoviesCardList, movieNameValue, filterCheckboxState)
      );
    } else if (pathName === "/saved-movies") {
      // setCardList(savedMoviesCardList);
    }
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
    setInitialCardListLengths(width, setCardListLength);
  }, []);

  useEffect(() => {
    setInitialCardListLengths(width, setCardListLength);
  }, [width]);

  useEffect(() => {
    setInitialMoviesCardListStringify(
      localStorage.getItem("initialMoviesCardList")
    );
    handleMoviesCardList();
    localStorage.setItem("сardList", JSON.stringify(cardList));
  }, [SearchFilmButtonClick, filterCheckboxState]);

  useEffect(() => {
    addMoreMoviesCards(
      width,
      filteredMoviesCardList,
      cardListLength,
      setCardListLength
    );
  }, [moreFilmsButtonClick]);

  return (
    <section className="movies-card-list">
      {cardList.length > 0 &&
        cardList.map((card, i) => {
          return i < cardListLength && <MoviesCard key={card.id} card={card} />;
        })}
    </section>
  );
}

export default MoviesCardList;
