function Techs() {
  return (
    <section id="techs" className="techs">
      <h2 className="techs__title techs__title_page-up">Технологии</h2>
      <h4 className="techs__title techs__title_main">7 технологий</h4>
      <p className="techs__text">
        На курсе веб-разработки мы освоили технологии, которые применили в
        дипломном проекте.
      </p>
      <ul className="techs__list">
        <li className="techs__list-item">
          <a
            className="techs__link"
            target="_blank"
            href="https://html.com/"
            rel="noreferrer"
          >
            HTML
          </a>
        </li>
        <li className="techs__list-item">
          <a
            className="techs__link"
            target="_blank"
            href="https://www.w3.org/Style/CSS/"
            rel="noreferrer"
          >
            CSS
          </a>
        </li>
        <li className="techs__list-item">
          <a
            className="techs__link"
            target="_blank"
            href="https://www.javascript.com/"
            rel="noreferrer"
          >
            JS
          </a>
        </li>
        <li className="techs__list-item">
          <a
            className="techs__link"
            target="_blank"
            href="https://reactjs.org/"
            rel="noreferrer"
          >
            React
          </a>
        </li>
        <li className="techs__list-item">
          <a
            className="techs__link"
            target="_blank"
            href="https://git-scm.com/"
            rel="noreferrer"
          >
            Git
          </a>
        </li>
        <li className="techs__list-item">
          <a
            className="techs__link"
            target="_blank"
            href="https://expressjs.com/"
            rel="noreferrer"
          >
            Express.js
          </a>
        </li>
        <li className="techs__list-item">
          <a
            className="techs__link"
            target="_blank"
            href="https://www.mongodb.com/"
            rel="noreferrer"
          >
            mongoDB
          </a>
        </li>
      </ul>
    </section>
  );
}

export default Techs;
