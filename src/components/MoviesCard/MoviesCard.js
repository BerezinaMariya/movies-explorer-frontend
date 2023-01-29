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
        ? "movies-card__button_save-button"
        : "movies-card__button_save-button_inactive"
      : "movies-card__button_delete-button"
  }`;

  function handleCardSaveClick() {
    setMovieSaved(!isMovieSaved);
  }

  function handleCardDeleteClick() {
    
  }

  return (
    <article className="movies-card">
      <h3 className="movies-card__nameRU">{card.nameRU}</h3>
      <p className="movies-card__duration">{card.duration}</p>
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
        src={card.image}
        alt={`Постер к фильму ${card.nameRU}`}
      />
    </article>
  );
}

export default MoviesCard;
