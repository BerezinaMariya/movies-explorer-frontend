import { useHistory } from "react-router-dom";

function Page404NotFound() {
  const history = useHistory();

  return (
    <div className="page-404-not-found">
      <h3 className="page-404-not-found__title">404</h3>
      <p className="page-404-not-found__text">Страница не найдена</p>
      <button
          type="button"
          className="button-hover page-404-not-found__button"
          onClick={history.goBack}
        >
         Назад
        </button>
    </div>
  );
}

export default Page404NotFound;
