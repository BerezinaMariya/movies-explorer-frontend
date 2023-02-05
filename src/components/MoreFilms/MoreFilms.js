import MoviesCardsFilter from "../MoviesCardsFilter/MoviesCardsFilter";

function MoreFilms(props) {
  const {
    cardListLength,
    setCardListLength,
    filteredMoviesCardList,
    isPreloader,
    isReceivedMoviesCards,
    windowWidth
  } = props;

  const { addMoreMoviesCards } = MoviesCardsFilter();

  function handleClick() {
    addMoreMoviesCards(
      windowWidth,
      filteredMoviesCardList,
      cardListLength,
      setCardListLength
    )
  }

  return (
    <div className="more-films">
      <button
        type="button"
        onClick={handleClick}
        className={`more-films__button ${
          cardListLength < 3 ||
          cardListLength >= filteredMoviesCardList.length ||
          isPreloader || isReceivedMoviesCards
            ? "more-films__button_hidden"
            : ""
        }
        `}
      >
        Ещё
      </button>
    </div>
  );
}

export default MoreFilms;
