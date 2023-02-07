import { useLocation } from "react-router-dom";
import MoviesCard from "../MoviesCard/MoviesCard";
import Preloader from "../Preloader/Preloader";
import ErrorMovieMessage from "../ErrorMovieMessage/ErrorMovieMessage";

function MoviesCardList(props) {
  const {
    onSaveMovieCard,
    onDeleteMovieCard,
    onError,
    cardList,
    cardListLength,
    isMovieName,
    isPreloader,
    isMoviesCardsReceived,
    isSavedMoviesCardsReceived,
    isErrorMessage,
  } = props;

  const location = useLocation();
  const pathName = location.pathname;

  console.log(cardList);

  onError();

  let isCardList;
  if (!cardList) {
    isCardList = false;
  } else {
    isCardList = true;
  }

  return (
    <section
      className={`movies-card-list ${
        isPreloader || isErrorMessage
          ? "movies-card-list_flex"
          : ""
      }`}
    >
      {isPreloader ? (
        <Preloader />
      ) : isErrorMessage ? (
      <ErrorMovieMessage
        isMoviesCardsReceived={isMoviesCardsReceived}
        isSavedMoviesCardsReceived={isSavedMoviesCardsReceived}
        isMovieName={isMovieName}
        isCardList={isCardList}
        cardList={cardList}
      />
      ) : ( isCardList &&
         cardList.map((card, i) => {
          return (
            (((pathName === "/movies") & (i < cardListLength)) ||
              (pathName === "/saved-movies")) && 
              <MoviesCard
                key={pathName === "/movies" ? card.id : card._id}
                card={card}
                onSaveMovieCard={onSaveMovieCard}
                onDeleteMovieCard={onDeleteMovieCard}
              />
          );
        })

      )}
    </section>
  );
}

export default MoviesCardList;
