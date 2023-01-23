import FilterCheckbox from "../../vendor/FilterCheckbox/FilterCheckbox";
import searchFormIcon from "../../images/search-form-icon.svg";

function SearchForm() {

  function handleSubmit(evt) {
    evt.preventDefault();
    alert("Ещё работаю над этим");
  }

  return (
    <div className="search-form">
      <div className="search-form__frame">
        <img
          className="search-form__icon"
          src={searchFormIcon}
          alt="Лупа - иконка строки поиска"
        />
        <form
          name="search-form__form"
          className="search-form__form"
          // ref={formRef}
          onSubmit={handleSubmit}
          noValidate
        >
          <input
            type="text"
            name="film-name"
            id="input"
            className="search-form__input"
            placeholder="Фильм"
          />
          <button
            type="submit"
            className="search-form__submit-button"
          >
            {/* {preLoading()}  */}
          </button>
        </form>

        <div className="short-films-filter">
          <FilterCheckbox />
          <p className="text__13-18 short-films-filter__text">
            Короткометражки
          </p>
        </div>
      </div>
    </div>
  );
}

export default SearchForm;
