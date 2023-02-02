function MoreFilms(props) {
  const {
    cardListLength,
    moreFilmsButtonClick,
    setMoreFilmsButtonClick,
    filteredMoviesCardList,
  } = props;

  function handleClick() {
    setMoreFilmsButtonClick(!moreFilmsButtonClick);
  }

  return (
    <div className="more-films">
      <button
        type="button"
        onClick={handleClick}
        className={`more-films__button ${
          cardListLength < 3 ? "more-films__button_hidden" : ""
        }
        ${
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
