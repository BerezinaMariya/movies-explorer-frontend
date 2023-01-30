import SearchForm from "../SearchForm/SearchForm";
import MoviesCardList from "../MoviesCardList/MoviesCardList";
import EmptyComponent from "../EmptyComponent/EmptyComponent";

function SavedMovies() {
  return (
    <section>
      <SearchForm />
      <MoviesCardList />
      <EmptyComponent />
    </section>
  );
}

export default SavedMovies;
