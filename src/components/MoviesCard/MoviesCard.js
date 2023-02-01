import { useState } from "react";

function MoviesCard(props) {
  const { card } = props;
  const [isMovieSaved, setMovieSaved] = useState(false);

  const pathName = window.location.pathname;

  const movieCardClassName = `movies-card__button ${
    pathName === "/movies"
      ? isMovieSaved
        ? "movies-card__button_save-button"
        : "movies-card__button_save-button_inactive"
      : "movies-card__button_delete-button"
  }`;

  const movieCardUrl = `${`https://api.nomoreparties.co${card.image.url}`}`;

  const movieCardDuration = `${Math.trunc(`${card.duration / 60}`)}ч ${`${card.duration}` % 60}м`;

  function handleCardSaveClick() {
    setMovieSaved(!isMovieSaved);
  }

  function handleCardDeleteClick() {
    
  }

  return (
    <article className="movies-card">
      <h3 className="movies-card__nameRU">{card.nameRU}</h3>
      <p className="movies-card__duration">{movieCardDuration}</p>
      <button
        type="button"
        className={movieCardClassName}
        aria-label={`${pathName === "/movies" ? "Сохранить" : "Удалить"}`}
        onClick={
          pathName === "/movies" ? handleCardSaveClick : handleCardDeleteClick
        }
      ></button>
      <img
        className="movies-card__image"
        src={movieCardUrl}
        alt={`Постер к фильму ${card.nameRU}`}
      />
    </article>
  );
}

export default MoviesCard;
