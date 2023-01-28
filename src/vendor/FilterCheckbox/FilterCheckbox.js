function FilterCheckbox() {
  return (
    <div className="filter-checkbox">
      <label className="filter-checkbox__switch">
        <input type="checkbox" className="filter-checkbox__switch-input" />
        <span className="filter-checkbox__switch-slider filter-checkbox__switch-slider-round"></span>
      </label>
    </div>
  );
}

export default FilterCheckbox;
