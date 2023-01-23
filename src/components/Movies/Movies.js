import Header from "../Header/Header";
import SearchForm from "../SearchForm/SearchForm";
import MoviesCardList from "../MoviesCardList/MoviesCardList";
import MoreFilms from "../MoreFilms/MoreFilms";
import Footer from "../Footer/Footer";

function Movies() {
  return (
    <section>
      <Header />
      <SearchForm />
      <MoviesCardList />
      <MoreFilms />
      <Footer />
    </section>
  );
}

export default Movies;
