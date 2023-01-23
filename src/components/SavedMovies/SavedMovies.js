import Header from "../Header/Header";
import SearchForm from "../SearchForm/SearchForm";
import MoviesCardList from "../MoviesCardList/MoviesCardList";
import EmptyComponent from "../EmptyComponent/EmptyComponent";
import Footer from "../Footer/Footer";

function SavedMovies() {
  return (
    <section>
      <Header />
      <SearchForm />
      <MoviesCardList />
      <EmptyComponent />
      <Footer />
    </section>
  );
}

export default SavedMovies;
