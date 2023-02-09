import {
  NOTHING_FOUND,
  KEY_WORD_REQUIRED,
  SERVER_ERROR
} from "../../config/Config";

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
          return NOTHING_FOUND;
        }
      }
    } else {
      return KEY_WORD_REQUIRED;
    } 
    
    if (!isReceivedMoviesCards || !isSavedMoviesCardsReceived) {
      return SERVER_ERROR;
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
