function MoreFilms(props) {
  const {
    cardListLength,
    moreFilmsButtonClick,
    setMoreFilmsButtonClick,
    filteredMoviesCardList,
    isPreloader,
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
          cardListLength < 3 ||
          cardListLength >= filteredMoviesCardList.length ||
          isPreloader
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
