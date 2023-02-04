function ErrorMovieMessage() {
  return (
    <div className="error-movie-message">
      <p className="error-movie-message__text">
        Во время запроса произошла ошибка.
      </p>
      <p className="error-movie-message__text">
        Возможно, проблема с соединением или сервер недоступен.
      </p>
      <p className="error-movie-message__text">
        Подождите немного и попробуйте ещё раз.
      </p>
    </div>
  );
}

export default ErrorMovieMessage;
