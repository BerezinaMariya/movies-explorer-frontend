import SearchForm from "../SearchForm/SearchForm";
import MoviesCardList from "../MoviesCardList/MoviesCardList";
import MoreFilms from "../MoreFilms/MoreFilms";

function Movies() {
  return (
    <section>
      <SearchForm />
      <MoviesCardList />
      <MoreFilms />
    </section>
  );
}

export default Movies;
