import MoviesCardsFilter from "../MoviesCardsFilter/MoviesCardsFilter";

function MoreFilms(props) {
  const {
    cardListLength,
    setCardListLength,
    filteredMoviesCardList,
    isPreloader,
    isErrorMessage,
    windowWidth,
    isFirstRequest,
  } = props;

  const { addMoreMoviesCards } = MoviesCardsFilter();

  function handleClick() {
    addMoreMoviesCards(
      windowWidth,
      filteredMoviesCardList,
      cardListLength,
      setCardListLength
    );
  }

  return (
    <div className="more-films">
      <button
        type="button"
        onClick={handleClick}
        className={`more-films__button ${
          cardListLength < 3 || isPreloader || isErrorMessage
            ? "more-films__button_hidden"
            : ""
        }
        ${isFirstRequest ? "" : "more-films__button_hidden"}
        ${
          filteredMoviesCardList &&
          cardListLength >= filteredMoviesCardList.length
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
