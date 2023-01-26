import { useState } from "react";
import { useHistory } from "react-router-dom";

function MoviesCard(props) {
  const history = useHistory();
  const { card } = props;
  const [isMovieSaved, setMovieSaved] = useState(false);

  const pathName = history.location.pathname;

  const movieCardClassName = `movies-card__button ${
    pathName === "/movies"
      ? isMovieSaved
        ? "movies-card__save-button_active"
        : "movies-card__save-button_inactive"
      : "movies-card__delete-button"
  }`;

  function handleCardSaveClick() {
    setMovieSaved(!isMovieSaved);
  }

  function handleCardDeleteClick() {
    
  }

  return (
    <article className="movies-card">
      <h2 className="movies-card__nameRU">{card.nameRU}</h2>
      <p className="movies-card__duration">{card.duration}</p>
      <button
        type="button"
        className={`button-hover ${movieCardClassName}`}
        aria-label={`${pathName === "/movies" ? "Сохранить" : "Удалить"}`}
        onClick={
          pathName === "/movies" ? handleCardSaveClick : handleCardDeleteClick
        }
      ></button>
      <img
        className="movies-card__image"
        src={card.image}
        alt={`Постер к фильму ${card.nameRU}`}
      />
    </article>
  );
}

export default MoviesCard;
