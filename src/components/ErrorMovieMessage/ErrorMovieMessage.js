function ErrorMovieMessage(props) {
  const { isReceivedMoviesCards, isSavedMoviesCardsReceived, isMovieName, cardList } = props;

  console.log(cardList.length === 0);

  function setMessage() {
    if (cardList.length === 0) {
      if (isMovieName) {
        return "Ничего не найдено";
      } else {
        return "Нужно ввести ключевое слово";
      }
    } else if (!isReceivedMoviesCards || !isSavedMoviesCardsReceived) {
      return "Во время запроса произошла ошибка. Возможно, проблема с соединением или сервер недоступен. Подождите немного и попробуйте ещё раз";
    }
  }
    
  const errorMessage = setMessage();

  return (
    <div className="error-movie-message">
      <p className="error-movie-message__text">
        {errorMessage}
      </p>
    </div>
  );
}

export default ErrorMovieMessage;
