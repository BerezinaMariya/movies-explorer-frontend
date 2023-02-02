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

  function setMoviesCardListLength(
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
        console.log(cardListLength);
      }
    } else if ((width > 480) & (width < 1280)) {
      i = 8;
      if (filteredMoviesCardList.length > i) {
        setCardListLength(cardListLength + 2);
        console.log(cardListLength);
      }
    } else if (width < 481) {
      i = 5;
      if (filteredMoviesCardList.length > i) {
        setCardListLength(cardListLength + 2);
        console.log(cardListLength);
      }
    }
    return;
  }

  return { filterCards, setMoviesCardListLength };
}

export default MoviesCardsFilter;
