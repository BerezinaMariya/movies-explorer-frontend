function FilterCheckbox() {
  return (
    <div className="filter-checkbox">
      <label className="switch">
        <input type="checkbox" className="switch__input" />
        <span class="switch__slider switch__slider_round"></span>
      </label>
    </div>
  );
}

export default FilterCheckbox;
