import { useLocation } from "react-router-dom";

function FilterCheckbox(props) {
  const {
    filterCheckboxState,
    setFilterCheckboxState,
    savedMoviesFilterCheckboxState,
    setSavedMoviesFilterCheckboxState,
  } = props;

  const location = useLocation();
  const pathName = location.pathname;

  function handleFilterCheckboxState(evt) {
    if (pathName === "/movies") {
      setFilterCheckboxState(evt.target.checked);
    } else {
      setSavedMoviesFilterCheckboxState(evt.target.checked);
    }
  }

  return (
    <div className="filter-checkbox">
      <label className="filter-checkbox__switch">
        <input
          type="checkbox"
          className="filter-checkbox__input"
          checked={
            pathName === "/movies"
              ? filterCheckboxState
              : savedMoviesFilterCheckboxState
          }
          onChange={handleFilterCheckboxState}
        />
        <span className="filter-checkbox__slider filter-checkbox__slider_round"></span>
      </label>
    </div>
  );
}

export default FilterCheckbox;
