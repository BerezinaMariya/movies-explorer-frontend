import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import MoviesCard from "../MoviesCard/MoviesCard";
import Preloader from "../Preloader/Preloader";
import ErrorMovieMessage from "../ErrorMovieMessage/ErrorMovieMessage";

function MoviesCardList(props) {
  const {
    movieCardList,
    savedMovieCardList,
    cardList,
    setCardList,
    onSaveMovieCard,
    onDeleteMovieCard,
    isCardDeleteButtonClick,
    isMoviesSearchButtonClick,
    filterCheckboxState,
    setFilteredMoviesCardList,
    cardListLength,
    setCardListLength,
    movieName,
    isMovieName,
    isPreloader,
    isMoviesCardsReceived,
    isSavedMoviesCardsReceived,
    isErrorMessage,
  } = props;

  const location = useLocation();
  const pathName = location.pathname;





  console.log("рисуем");
  console.log(cardList);
  console.log(cardList.length);
  console.log(cardListLength);
  console.log(isMovieName);
  console.log(isMoviesCardsReceived);
  console.log(isSavedMoviesCardsReceived);
  console.log(isErrorMessage);

  return (
    <section
      className={`movies-card-list ${
        isPreloader || !isMoviesCardsReceived || !isSavedMoviesCardsReceived || isErrorMessage
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
        cardList={cardList}
      />
      ) : ( cardList.map((card, i) => {
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
