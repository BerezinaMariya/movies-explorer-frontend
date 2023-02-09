import {
  SHORT_FILMS_DURATION,
  CARDS_QUANTITY_WW_1280,
  CARDS_QUANTITY_WW_768_1279,
  CARDS_QUANTITY_WW_320_767,
  CARDS_ADD_QUANTITY_WW_1280,
  CARDS_ADD_QUANTITY_WW_320_1279
} from "../../config/Config";

function MoviesCardsFilter() {
  function filterCards(
    initialMoviesCardList,
    movieNameValue,
    filterCheckboxState
  ) {
    let filteredCards;
    if (initialMoviesCardList) {
      filteredCards = initialMoviesCardList.filter((card) => {
        if (filterCheckboxState) {
          return (
            (card.duration <= SHORT_FILMS_DURATION) &
            (card.nameRU.toLowerCase().includes(movieNameValue.toLowerCase()) ||
              card.nameEN.toLowerCase().includes(movieNameValue.toLowerCase()))
          );
        } else {
          return (
            card.nameRU.toLowerCase().includes(movieNameValue.toLowerCase()) ||
            card.nameEN.toLowerCase().includes(movieNameValue.toLowerCase())
          );
        }
      });
    }
    return filteredCards;
  }

  function filterMoviesCards(filteredCardList, savedMoviesCardList) {
    if (filteredCardList) {
      const cardListWithSavedCards = filteredCardList.filter((movieCard) => {
        savedMoviesCardList.some((savedMovieCard) => {
          return movieCard.id === savedMovieCard.movieId
            ? (movieCard.saved = true)
            : (movieCard.saved = false);
        });
        return movieCard;
      });

      return cardListWithSavedCards;
    }
  }

  function setInitialCardListLength(windowWidth, setCardListLength) {
    if (windowWidth > 1279) {
      setCardListLength(12);
    } else if ((windowWidth < 1280) & (windowWidth > 767)) {
      setCardListLength(8);
    } else if (windowWidth < 768) {
      setCardListLength(5);
    }
    return;
  }

  function addMoreMoviesCards(
    windowWidth,
    filteredMoviesCardList,
    cardListLength,
    setCardListLength
  ) {
    let i;
    if (windowWidth > 1279) {
      i = CARDS_QUANTITY_WW_1280;
      if (filteredMoviesCardList.length > i) {
        setCardListLength(cardListLength + CARDS_ADD_QUANTITY_WW_1280);
      }
    } else if ((windowWidth > 767) & (windowWidth < 1280)) {
      i = CARDS_QUANTITY_WW_768_1279;
      if (filteredMoviesCardList.length > i) {
        setCardListLength(cardListLength + CARDS_ADD_QUANTITY_WW_320_1279);
      }
    } else if (windowWidth < 768) {
      i = CARDS_QUANTITY_WW_320_767;
      if (filteredMoviesCardList.length > i) {
        setCardListLength(cardListLength + CARDS_ADD_QUANTITY_WW_320_1279);
      }
    }
    return;
  }

  return {
    filterCards,
    filterMoviesCards,
    setInitialCardListLength,
    addMoreMoviesCards,
  };
}

export default MoviesCardsFilter;
