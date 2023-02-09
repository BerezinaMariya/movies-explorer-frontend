import { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { CurrentUserContext } from "../../contexts/CurrentUserContext";
import { FormValidator } from "../FormValidator/FormValidator";

function Profile(props) {
  const { onLogout, isLoading, getUserInfo, updateUserInfo, isUserInfoUpdating } = props;

  const currentUser = useContext(CurrentUserContext);
  const { values, handleChange, errors, isFormValid, resetForm } =
    FormValidator();

  const [name, setName] = useState(currentUser.name);
  const [email, setEmail] = useState(currentUser.email);
  const [isEqualValues, setEqualValues] = useState(true);

  function handleSubmit(evt) {
    evt.preventDefault();

    let newUserName = "";
    let newUserEmail = "";

    values.userName
      ? newUserName = values.userName
      : newUserName = currentUser.name;

    values.userEmail
      ? newUserEmail = values.userEmail
      : newUserEmail = currentUser.email;

    if (!isEqualValues) {
      updateUserInfo({
        nam: newUserName,
        email: newUserEmail,
      });
      resetForm();
    }
  }

  useEffect(() => {
    getUserInfo();
  }, []);

  useEffect(() => {
    let name = true;
    let email = true;
    if (values.userName) {
      name = values.userName === currentUser.name;
    }
    if (values.userEmail) {
      email = values.userEmail === currentUser.email;
    }
    setEqualValues(name && email);
    console.log(isFormValid);
  }, [values.userName, values.userEmail]);

  useEffect(() => {
    if (!isLoading) {
      setName(currentUser.name);
      setEmail(currentUser.email);
    }
  }, [currentUser, isLoading]);

  useEffect(() => {
    if (values.userName) {
      setName(values.userName);
    }
    if (values.userEmail) {
      setEmail(values.userEmail);
    }
  }, [values.userName, values.userEmail]);

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
          value={`${values.userName ? values.userName : name}`}
          required
          minLength="2"
          maxLength="30"
          onChange={handleChange}
          disabled={isUserInfoUpdating ? true : false}
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
          pattern="^\w+@\w+\.(com|net|ru)$"
          value={`${values.userEmail ? values.userEmail : email}`}
          onChange={handleChange}
          disabled={isUserInfoUpdating ? true : false}
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
          disabled={!isFormValid || isEqualValues || isUserInfoUpdating ? true : false}
          className={`profile__text profile-form__submit-button ${
            isFormValid ? "" : "profile-form__submit-button_inactive"
          }
          ${isEqualValues || isUserInfoUpdating ? "profile-form__submit-button_inactive" : ""}`}
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
