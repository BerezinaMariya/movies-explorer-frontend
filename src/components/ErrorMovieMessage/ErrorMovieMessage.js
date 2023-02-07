function ErrorMovieMessage(props) {
  const {
    isReceivedMoviesCards,
    isSavedMoviesCardsReceived,
    isMovieName,
    isCardList,
    cardList,
  } = props;

  function setMessage() {
    if (isMovieName) {
      if (isCardList) {
        if (cardList.length === 0) {
          return "Ничего не найдено";
        }
      }
    } else {
      return "Нужно ввести ключевое слово";
    } 
    
    if (!isReceivedMoviesCards || !isSavedMoviesCardsReceived) {
      return "Во время запроса произошла ошибка. Возможно, проблема с соединением или сервер недоступен. Подождите немного и попробуйте ещё раз";
    }
  }

  const errorMessage = setMessage();

  return (
    <div className="error-movie-message">
      <p className="error-movie-message__text">{errorMessage}</p>
    </div>
  );
}

export default ErrorMovieMessage;
