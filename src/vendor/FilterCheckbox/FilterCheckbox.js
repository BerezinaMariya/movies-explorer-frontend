function FilterCheckbox(props) {
  const { filterCheckboxState, setFilterCheckboxState } = props;

  function handleFilterCheckboxState(evt) {
    setFilterCheckboxState(evt.target.checked);
  }

  return (
    <div className="filter-checkbox">
      <label className="filter-checkbox__switch">
        <input type="checkbox" className="filter-checkbox__input" checked={filterCheckboxState} onChange={handleFilterCheckboxState}/>
        <span className="filter-checkbox__slider filter-checkbox__slider_round"></span>
      </label>
    </div>
  );
}

export default FilterCheckbox;
 