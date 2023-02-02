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

  const [width, setWidth] = useState(window.innerWidth);
  const [initialMoviesCardListStringify, setInitialMoviesCardListStringify] =
    useState(localStorage.getItem("initialMoviesCardList"));
  const initialMoviesCardList = JSON.parse(initialMoviesCardListStringify);
  const [cardListStringify, setCardListStringify] = useState([]);
  const [cardList, setCardList] = useState(
    JSON.parse(initialMoviesCardListStringify)
  );

  const { setMoviesCardListLength } = MoviesCardsFilter();

  console.log(cardListStringify);

  // localStorage.setItem("сardList", JSON.stringify(initialMoviesCardList))

  function setInitialCardListLengths() {
    if (width > 1279) {
      setCardListLength(12);
    } else if (width > 767 & width < 1280) {
      setCardListLength(8);
    } else if (width < 768) {
      setCardListLength(5);
    }
  }

  function handleMoviesCardList() {
    const movieNameValue = localStorage.getItem("movieNameValue");

    const { filterCards } = MoviesCardsFilter();

    setFilteredMoviesCardList(
      filterCards(initialMoviesCardList, movieNameValue, filterCheckboxState)
    );

    if (pathName === "/movies") {
      setCardList(
        filterCards(initialMoviesCardList, movieNameValue, filterCheckboxState)
      );
    } else if (pathName === "/saved-movies") {
      // finalCardList = savedMoviesCardList;
    }
    console.log(cardList);
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
    setInitialCardListLengths();
    console.log(localStorage.getItem("cardList"));
    // setCardListStringify(localStorage.getItem("cardList"));
    // if (JSON.parse(cardListStringify).length > 0) {
    //   setCardList(JSON.parse(cardListStringify));
    // }
  }, []);

  useEffect(() => {
    setInitialCardListLengths();
    console.log(localStorage.getItem("cardList"));
    // setCardListStringify(localStorage.getItem("cardList"));
    // if (JSON.parse(cardListStringify).length > 0) {
    //   setCardList(JSON.parse(cardListStringify));
    // }
  }, [width]);



  useEffect(() => {
    console.log(cardList);

    setInitialMoviesCardListStringify(
      localStorage.getItem("initialMoviesCardList")
    );
    handleMoviesCardList();

    localStorage.setItem("сardList", JSON.stringify(cardList));

    console.log(cardListLength);
  }, [SearchFilmButtonClick, filterCheckboxState]);

  useEffect(() => {
    setMoviesCardListLength(
      width,
      filteredMoviesCardList,
      cardListLength,
      setCardListLength
    );
    console.log(filteredMoviesCardList);
    console.log("click");
  }, [moreFilmsButtonClick]);

  return (
    <section className="movies-card-list">
      {cardList.length > 0 &&
        cardList.map((card, i) => {
          return i < cardListLength &&
            <MoviesCard key={card.id} card={card} />
          })
        }
    </section>
  );
}

export default MoviesCardList;
