function MoviesCardsFilter() {
  function filterCards(
    initialMoviesCardList,
    movieNameValue,
    filterCheckboxState
  ) {
    const filteredCards = initialMoviesCardList.filter((card) => {
      if (filterCheckboxState) {
        return (
          (card.duration <= 40) &
          (card.nameRU.includes(movieNameValue) ||
            card.nameEN.includes(movieNameValue))
        );
      } else {
        return (
          card.nameRU.includes(movieNameValue) ||
          card.nameEN.includes(movieNameValue)
        );
      }
    });

    return filteredCards;
  }

    function filteredMoviesCards(filteredCardList, savedMoviesCardList) {
   
    const cardListWithSavedCards = filteredCardList.filter((movieCard) => {
      savedMoviesCardList.some((savedMovieCard) => {
        return movieCard.id === savedMovieCard.movieId
          ? movieCard.saved = true
          : movieCard.saved = false;
      });
      return movieCard;
    });

    return cardListWithSavedCards;
  }

  function setCardListInitialLengths(width, setCardListLength) {
    if (width > 1279) {
      setCardListLength(12);
    } else if ((width > 767) & (width < 1280)) {
      setCardListLength(8);
    } else if (width < 768) {
      setCardListLength(5);
    }
  }

  function addMoreMoviesCards(
    width,
    filteredMoviesCardList,
    cardListLength,
    setCardListLength
  ) {
    let i;
    if (width > 1279) {
      i = 12;
      if (filteredMoviesCardList.length > i) {
        setCardListLength(cardListLength + 3);
      }
    } else if ((width > 767) & (width < 1280)) {
      i = 8;
      if (filteredMoviesCardList.length > i) {
        setCardListLength(cardListLength + 2);
      }
    } else if (width < 768) {
      i = 5;
      if (filteredMoviesCardList.length > i) {
        setCardListLength(cardListLength + 2);
      }
    }
    return;
  }

  return { filterCards, filteredMoviesCards, setCardListInitialLengths, addMoreMoviesCards };
}

export default MoviesCardsFilter;
