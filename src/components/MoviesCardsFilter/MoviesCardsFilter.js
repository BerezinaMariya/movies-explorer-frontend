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

  function setInitialCardListLengths(
    width,
    setCardListLength) {
    if (width > 1279) {
      setCardListLength(12);
    } else if (width > 767 & width < 1280) {
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
    } else if ((width > 480) & (width < 1280)) {
      i = 8;
      if (filteredMoviesCardList.length > i) {
        setCardListLength(cardListLength + 2);
      }
    } else if (width < 481) {
      i = 5;
      if (filteredMoviesCardList.length > i) {
        setCardListLength(cardListLength + 2);
      }
    }
    return;
  }

  return { filterCards, setInitialCardListLengths, addMoreMoviesCards };
}

export default MoviesCardsFilter;
