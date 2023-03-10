import { useLocation } from "react-router-dom";
import {
  CARDS_IMAGE_BASE_URL
} from "../../config/Config";

function MoviesCard(props) {
  const { card, onSaveMovieCard, onDeleteMovieCard } = props;

  const location = useLocation();
  const pathName = location.pathname;

  const movieCardButtonClassName = `movies-card__button ${
    pathName === "/movies"
      ? card.saved
        ? "movies-card__button_save-button"
        : "movies-card__button_save-button_inactive"
      : "movies-card__button_delete-button"
  }`;

  const movieCardUrl = `${
    pathName === "/movies"
      ? `${CARDS_IMAGE_BASE_URL}${card.image.url}`
      : card.image
  }`;

  const movieCardDuration = `${
    Math.trunc(card.duration / 60) > 0
      ? Math.trunc(card.duration / 60) + `ч`
      : ""
  } 
  ${card.duration % 60 > 0 ? (card.duration % 60) + `м` : ""}`;

  function handleSaveCard(evt) {
    evt.target.classList.contains("movies-card__button_save-button")
      ? onDeleteMovieCard(card, evt)
      : onSaveMovieCard(card, evt);
  }

  function handleDeleteCard(evt) {
    onDeleteMovieCard(card, evt);
  }

  return (
    <article className="movies-card">
      <h3 className="movies-card__nameRU">{card.nameRU}</h3>
      <p className="movies-card__duration">{movieCardDuration}</p>
      <button
        type="button"
        className={movieCardButtonClassName}
        aria-label={`${pathName === "/movies" ? "Сохранить" : "Удалить"}`}
        onClick={pathName === "/movies" ? handleSaveCard : handleDeleteCard}
      ></button>
      <a
        className="movies-card__link"
        target="_blank"
        href={card.trailerLink}
        rel="noreferrer"
      >
        <img
          className="movies-card__image"
          src={movieCardUrl}
          alt={`Постер к фильму ${card.nameRU}`}
        />
      </a>
    </article>
  );
}

export default MoviesCard;
