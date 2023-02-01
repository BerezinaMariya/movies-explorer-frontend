function MoviesCardsFilter(
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

export default MoviesCardsFilter;
