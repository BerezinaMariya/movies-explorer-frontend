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

  function filterMoviesCards(filteredCardList, savedMoviesCardList) {
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
      i = 12;
      if (filteredMoviesCardList.length > i) {
        setCardListLength(cardListLength + 3);
      }
    } else if ((windowWidth > 767) & (windowWidth < 1280)) {
      i = 8;
      if (filteredMoviesCardList.length > i) {
        setCardListLength(cardListLength + 2);
      }
    } else if (windowWidth < 768) {
      i = 5;
      if (filteredMoviesCardList.length > i) {
        setCardListLength(cardListLength + 2);
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
