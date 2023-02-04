import SearchForm from "../SearchForm/SearchForm";
import MoviesCardList from "../MoviesCardList/MoviesCardList";
import EmptyComponent from "../EmptyComponent/EmptyComponent";

function SavedMovies(props) {
  const {
    filterCheckboxState,
    setFilterCheckboxState,
    cardListLength,
    setCardListLength,
    filteredMoviesCardList,
    setFilteredMoviesCardList,
    isPreloader
  } = props;

  return (
    <section>
      <SearchForm
        filterCheckboxState={filterCheckboxState}
        setFilterCheckboxState={setFilterCheckboxState}
      />
      <MoviesCardList
        filterCheckboxState={filterCheckboxState}
        setFilterCheckboxState={setFilterCheckboxState}
        cardListLength={cardListLength}
        setCardListLength={setCardListLength}
        filteredMoviesCardList={filteredMoviesCardList}
        setFilteredMoviesCardList={setFilteredMoviesCardList}
        isPreloader={isPreloader}
      />
      <EmptyComponent />
    </section>
  );
}

export default SavedMovies;
