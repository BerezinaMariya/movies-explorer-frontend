import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import FilterCheckbox from "../../vendor/FilterCheckbox/FilterCheckbox";
import searchFormIcon from "../../images/search-form-icon.svg";

function SearchForm(props) {
  const {
    getMoviesCards,
    filterCheckboxState,
    setFilterCheckboxState,
    isSavedMoviesSearchButtonClick,
    setSavedMoviesSearchButtonClick,
    movieNameValue,
    setMovieNameValue
  } = props;

  const location = useLocation();
  const pathName = location.pathname;

  function handleMovieNameChange(evt) {
    const value = evt.target.value;
    setMovieNameValue(value);
  }

  function handleSubmit(evt) {
    evt.preventDefault();
    if (pathName === "/movies") {
      if (movieNameValue) {
        console.log(pathName);
        localStorage.setItem("movieNameValue", movieNameValue);
        localStorage.setItem("filterCheckboxState", filterCheckboxState);
        getMoviesCards();
      }
    } else {
      setSavedMoviesSearchButtonClick(!isSavedMoviesSearchButtonClick);
    }
  }

  useEffect(() => {
    if (pathName === "/movies") {
      const filterCheckboxStateStringify = localStorage.getItem(
        "filterCheckboxState"
      );
      if (localStorage.getItem("movieNameValue")) {
        setMovieNameValue(localStorage.getItem("movieNameValue"));
      }
      if (filterCheckboxStateStringify === "true") {
        setFilterCheckboxState(JSON.parse(filterCheckboxStateStringify));
      }
    } else {
      setMovieNameValue("");
      setFilterCheckboxState(false);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("filterCheckboxState", filterCheckboxState);
  }, [filterCheckboxState]);

  return (
    <div className="search-form">
      <div className="search-form__frame">
        <img
          className="search-form__icon"
          src={searchFormIcon}
          alt="Лупа - иконка строки поиска"
        />
        <div className="search-form__small-screens">
          <form
            name="search-form-form"
            className="search-form-form"
            onSubmit={handleSubmit}
            noValidate
          >
            <input
              type="text"
              name="movieName"
              value={movieNameValue}
              onChange={handleMovieNameChange}
              className="search-form-form__input"
              placeholder="Фильм"
            />
            <button
              type="submit"
              className="search-form-form__submit-button"
            ></button>
          </form>

          <div className="search-form__short-films-filter">
            <FilterCheckbox
              filterCheckboxState={filterCheckboxState}
              setFilterCheckboxState={setFilterCheckboxState}
            />
            <p className="search-form__text">Короткометражки</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SearchForm;
