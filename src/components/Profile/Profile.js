import { useContext } from "react";
import { Link } from "react-router-dom";
import { CurrentUserContext } from "../../contexts/CurrentUserContext";
import { FormValidator } from "../FormValidator/FormValidator";

function Profile() {
  const currentUser = useContext(CurrentUserContext);
  const { values, handleChange, errors, isFormValid, resetForm } =
    FormValidator();

  function handleSubmit(evt) {
    evt.preventDefault();
    if (isFormValid) {
      currentUser.name = values.name;
      currentUser.email = values.email;
      resetForm();
    } else {
      alert("Что-то пошло не так");
    }
  }

  return (
    <section className="profile">
      <h3 className="title__24-29-med profile__title">{`Привет, ${currentUser.name}!`}</h3>
      <form className="profile-form" onSubmit={handleSubmit} noValidate>
        <p className="text__11-13-reg profile-form__user-name">
          {currentUser.name}
        </p>
        <input
          className={`text__11-13-med profile-form__input profile-form__input_name ${
            errors.name ? "profile-form__input_error" : ""
          }`}
          type="text"
          name="name"
          id="input-name"
          placeholder="Имя"
          value={`${values.name ? values.name : ""}`}
          required
          minLength="2"
          maxLength="30"
          onChange={handleChange}
        />
        <span
          name="name"
          className={`text__11-13-reg profile-form__input_name-error ${
            errors.name ? "profile-form__input-error_active" : ""
          }`}
        >
          {`${errors.name ? errors.name : ""}`}
        </span>
        <p className="text__11-13-reg profile-form__user-email">
          {currentUser.email}
        </p>
        <input
          className={`text__11-13-med profile-form__input profile-form__input_email ${
            errors.email ? "profile-form__input_error" : ""
          }`}
          type="email"
          name="email"
          id="input-email"
          placeholder="E-mail"
          value={`${values.email ? values.email : ""}`}
          onChange={handleChange}
        />
        <span
          name="email"
          className={`text__11-13-reg profile-form__input_email-error ${
            errors.email ? "profile-form__input-error_active" : ""
          }`}
        >
          {`${errors.email ? errors.email : ""}`}
        </span>
        <button
          type="submit"
          className="button-hover profile__text profile-form__submit-button"
        >
          Редактировать
        </button>
      </form>
      <Link
        to="./signin"
        className="button-hover profile__text profile__signuot-link"
      >
        Выйти из аккаунта
      </Link>
    </section>
  );
}

export default Profile;
