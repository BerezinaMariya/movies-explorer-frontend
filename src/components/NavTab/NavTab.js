import { Link } from "react-router-dom";

function NavTab() {
  return (
    <div className="nav-tab">
      <button type="button" className="nav-tab__button">
        <a href="#about-project" className="text__12-16-med nav-tab__link">О проекте</a>
      </button>
      <button type="button" className="nav-tab__button">
        <a href="#techs" className="text__12-16-med nav-tab__link">Технологии</a>
      </button>
      <button type="button" className="nav-tab__button">
        <a href="#about-me" className="text__12-16-med nav-tab__link">Студент</a>
      </button>
    </div>
  );
}

export default NavTab;
