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
        <div className="search-form__small-screens">
          <form
            name="search-form-form"
            className="search-form-form"
            // ref={formRef}
            onSubmit={handleSubmit}
            noValidate
          >
            <input
              type="text"
              name="movieName"
              className="search-form-form__input"
              placeholder="Фильм"
            />
            <button
              type="submit"
              className="search-form-form__submit-button"
            >
              {/* {preLoading()}  */}
            </button>
          </form>

          <div className="search-form__short-films-filter">
            <FilterCheckbox />
            <p className="search-form__text">Короткометражки</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SearchForm;
