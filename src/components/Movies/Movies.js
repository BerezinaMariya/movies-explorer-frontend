import { useState } from "react";

import SearchForm from "../SearchForm/SearchForm";
import MoviesCardList from "../MoviesCardList/MoviesCardList";
import MoreFilms from "../MoreFilms/MoreFilms";

function Movies(props) {
  const { getMoviesCards, SearchFilmButtonClick } = props;

  const filterCheckboxStateStringify = localStorage.getItem('filterCheckboxState'); 
  const [filterCheckboxState, setFilterCheckboxState] = useState(JSON.parse(filterCheckboxStateStringify));
  const [cardListLength, setCardListLength] = useState();
  const [filteredMoviesCardList, setFilteredMoviesCardList] = useState([]);
  const [moreFilmsButtonClick, setMoreFilmsButtonClick] = useState(false);
  
  return (
    <section>
      <SearchForm
        getMoviesCards={getMoviesCards}
        filterCheckboxState={filterCheckboxState}
        setFilterCheckboxState={setFilterCheckboxState}
      />
      <MoviesCardList
        filterCheckboxState={filterCheckboxState}
        SearchFilmButtonClick={SearchFilmButtonClick}
        cardListLength={cardListLength}
        setCardListLength={setCardListLength}
        moreFilmsButtonClick={moreFilmsButtonClick}
        filteredMoviesCardList={filteredMoviesCardList}
        setFilteredMoviesCardList={setFilteredMoviesCardList}
      />
      <MoreFilms 
      cardListLength={cardListLength}
      moreFilmsButtonClick={moreFilmsButtonClick}
      setMoreFilmsButtonClick={setMoreFilmsButtonClick}
      filteredMoviesCardList={filteredMoviesCardList}
      />
    </section>
  );
}

export default Movies;
