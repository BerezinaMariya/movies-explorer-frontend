function NavTab() {
  return (
    <div className="nav-tab">
      <button type="button" className="button-hover nav-tab__button">
        <a href="#about-project" className="texts__text_12-16-med nav-tab__link">О проекте</a>
      </button>
      <button type="button" className="button-hover nav-tab__button">
        <a href="#techs" className="texts__text_12-16-med nav-tab__link">Технологии</a>
      </button>
      <button type="button" className="button-hover nav-tab__button">
        <a href="#about-me" className="texts__text_12-16-med nav-tab__link">Студент</a>
      </button>
    </div>
  );
}

export default NavTab;
