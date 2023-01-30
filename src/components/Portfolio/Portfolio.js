import portfoliolink from "../../images/portfolio-link.svg";

function Portfolio() {
  return (
    <div className="portfolio">
      <h3 className="portfolio__title">Портфолио</h3>
      <ul className="portfolio__list">
        <li className="portfolio__list-item portfolio__list-item_underlined">
          <a
            className="portfolio__link"
            target="_blank"
            href="https://berezinamariya.github.io/how-to-learn/"
            rel="noreferrer"
          >
            <p className="portfolio__text">Статичный сайт</p>
            <img
              className="portfolio__image-link"
              src={portfoliolink}
              alt="Ссылка на статичный сайт из портфолио - проект Научиться учиться"
            />
          </a>
        </li>
        <li className="portfolio__list-item portfolio__list-item_underlined">
          <a
            className="portfolio__link"
            target="_blank"
            href="https://berezinamariya.github.io/russian-travel/index.html"
            rel="noreferrer"
          >
            <p className="portfolio__text">Адаптивный сайт</p>
            <img
              className="portfolio__image-link"
              src={portfoliolink}
              alt="Ссылка на адаптивный сайт из портфолио - проект Путешествие по России"
            />
          </a>
        </li>
        <li className="portfolio__list-item">
          <a
            className="portfolio__link"
            target="_blank"
            href="https://mesto.berezina.nomoredomains.club"
            rel="noreferrer"
          >
            <p className="portfolio__text">Одностраничное приложение</p>
            <img
              className="portfolio__image-link"
              src={portfoliolink}
              alt="Ссылка на одностраничное приложение из портфолио - проект Mesto"
            />
          </a>
        </li>
      </ul>
    </div>
  );
}

export default Portfolio;
