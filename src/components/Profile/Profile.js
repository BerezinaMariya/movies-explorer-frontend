import { useContext } from "react";
import { Link } from "react-router-dom";
import { CurrentUserContext } from "../../contexts/CurrentUserContext";
import { FormValidator } from "../FormValidator/FormValidator";

function Profile(props) {
  const { onLogout, updateUserInfo } = props;

  const currentUser = useContext(CurrentUserContext);
  const { values, handleChange, errors, isFormValid, resetForm } =
    FormValidator();

  function handleSubmit(evt) {
    evt.preventDefault();
    updateUserInfo({ name: values.userName, email: values.userEmail });
    resetForm();
  }
  
  return (
    <section className="profile">
      <h3 className="profile__title">{`Привет, ${currentUser.name}!`}</h3>
      <form className="profile-form" onSubmit={handleSubmit} noValidate>
        <p className="profile-form__hint profile-form__hint_user-name">
          {currentUser.name}
        </p>
        <input
          className={`profile-form__input profile-form__input_name ${
            errors.userName ? "profile-form__input_error" : ""
          }`}
          type="text"
          name="userName"
          placeholder="Имя"
          value={`${values.userName ? values.userName : ""}`}
          required
          minLength="2"
          maxLength="30"
          onChange={handleChange}
        />
        <span
          id="userName"
          className={`profile-form__input-error profile-form__input-error_name ${
            errors.userName ? "profile-form__input-error_active" : ""
          }`}
        >
          {`${errors.userName ? errors.userName : ""}`}
        </span>
        <p className="profile-form__hint profile-form__hint_user-email">
          {currentUser.email}
        </p>
        <input
          className={`profile-form__input profile-form__input_email ${
            errors.userEmail ? "profile-form__input_error" : ""
          }`}
          type="email"
          name="userEmail"
          required
          placeholder="E-mail"
          value={`${values.userEmail ? values.userEmail : ""}`}
          onChange={handleChange}
        />
        <span
          id="userEmail"
          className={`profile-form__input-error profile-form__input-error_email ${
            errors.userEmail ? "profile-form__input-error_active" : ""
          }`}
        >
          {`${errors.userEmail ? errors.userEmail : ""}`}
        </span>
        <button
          type="submit"
          disabled={isFormValid ? false : true}
          className={`profile__text profile-form__submit-button ${
            isFormValid ? "" : "profile-form__submit-button_inactive"
          }`}
        >
          Редактировать
        </button>
      </form>
      <Link
        onClick={onLogout}
        to="/"
        className="profile__text profile__signOut-link"
      >
        Выйти из аккаунта
      </Link>
    </section>
  );
}

export default Profile;
