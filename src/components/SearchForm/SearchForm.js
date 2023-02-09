import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import FilterCheckbox from "../../vendor/FilterCheckbox/FilterCheckbox";

import searchFormIcon from "../../images/search-form-icon.svg";

function SearchForm(props) {
  const {
    onSearchMovie,
    filterCheckboxState,
    setFilterCheckboxState,
    savedMoviesFilterCheckboxState,
    setSavedMoviesFilterCheckboxState,
    isMoviesSearchButtonClick,
    setMoviesSearchButtonClick,
    setIsMovieName,
    setMovieName,
    setSavedMovieName,
  } = props;

  const location = useLocation();
  const pathName = location.pathname;

  const [movieNameValue, setMovieNameValue] = useState("");

  function handleMovieNameChange(evt) {
    const value = evt.target.value;
    setMovieNameValue(value);
  }

  function handleSubmit(evt) {
    evt.preventDefault();
    onSearchMovie();
    if (movieNameValue) {
      setIsMovieName(true);
      if (pathName === "/movies") {
        setMovieName(movieNameValue);
        localStorage.setItem("movieNameValue", movieNameValue);
        localStorage.setItem("filterCheckboxState", filterCheckboxState);
      } else {
        setSavedMovieName(movieNameValue);
      }
    } else {
      setIsMovieName(false);
    }
    setMoviesSearchButtonClick(!isMoviesSearchButtonClick);
  }

  useEffect(() => {
    if (pathName === "/movies") {
      setMovieNameValue(localStorage.getItem("movieNameValue"));
    } else {
      setMovieNameValue("");
    }
  }, [pathName]);

  useEffect(() => {
    if (pathName === "/movies") {
      localStorage.setItem("filterCheckboxState", filterCheckboxState);
    }
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
              savedMoviesFilterCheckboxState={savedMoviesFilterCheckboxState}
              setFilterCheckboxState={setFilterCheckboxState}
              setSavedMoviesFilterCheckboxState={
                setSavedMoviesFilterCheckboxState
              }
            />
            <p className="search-form__text">Короткометражки</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SearchForm;
