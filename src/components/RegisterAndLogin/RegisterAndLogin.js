import { useContext, useEffect } from "react";
import { Link } from "react-router-dom";
import { RegistrationInfoContext } from "../../contexts/RegistrationInfoContext";
import { FormValidator } from "../FormValidator/FormValidator";

function RegisterAndLogin(props) {
  const registrationInfo = useContext(RegistrationInfoContext);
  const { title, submitButtonText, signText, signLinkText, onSubmit } = props;

  const { values, handleChange, errors, isFormValid, resetForm } =
    FormValidator();

  function handleSubmit(evt) {
    evt.preventDefault();
      registrationInfo.name = values.name;
      registrationInfo.email = values.email;
      registrationInfo.password = values.password;
      onSubmit();
  }

  useEffect(() => {
    resetForm();
  }, []);

  return (
    <div className="register-and-login">
      <h3 className="register-and-login__title">{title}</h3>
      <form className="form" onSubmit={handleSubmit} noValidate>
        <div
          className={`form__input-area ${
            title === "Рады видеть!"
              ? "form__input-area_hidden"
              : ""
          }`}
        >
          <span className="form__input-hint">Имя</span>
          <input
            className={`form__input ${
              errors.name ? "form__input_error" : ""
            }`}
            type="text"
            name="name"
            value={`${values.name ? values.name : ""}`}
            required
            minLength="2"
            maxLength="30"
            pattern="^[A-Za-zА-Яа-яЁё\s\-]+$"
            onChange={handleChange}
            disabled={title === "Добро пожаловать!" ? false : true}
          />
          <span
            id="name"
            className={`form__input-error ${
              errors.name ? "form__input-error_active" : ""
            }`}
          >
            {`${errors.name ? errors.name : ""}`}
          </span>
        </div>
        <span className="form__input-hint">E-mail</span>
        <input
          className={`form__input ${
            errors.email ? "form__input_error" : ""
          }`}
          type="email"
          name="email"
          required
          value={`${values.email ? values.email : ""}`}
          onChange={handleChange}
        />
        <span
          id="email"
          className={`form__input-error ${
            errors.email ? "form__input-error_active" : ""
          }`}
        >
          {`${errors.email ? errors.email : ""}`}
        </span>
        <span className="form__input-hint">Пароль</span>
        <input
          className={`form__input ${
            errors.password ? "form__input_error" : ""
          }`}
          type="password"
          name="password"
          value={`${values.password ? values.password : ""}`}
          required
          onChange={handleChange}
        />
        <span
          id="password"
          className={`form__input-error ${
            errors.password ? "form__input-error_active" : ""
          }`}
        >
          {`${errors.password ? errors.password : ""}`}
        </span>
        <button
          type="submit"
          disabled={isFormValid ? false : true}
          className={`form__submit-button ${
            title === "Рады видеть!" ? "form__submit-button_logIn" : ""
          }
          ${
            isFormValid ? "" : "form__submit-button_inactive"
          }`}
        >
          {submitButtonText}
        </button>
      </form>
      <div className="register-and-login__sign">
        <p className="register-and-login__text">
          {signText}
        </p>
        <Link
          to={`${title === "Рады видеть!" ? "/signup" : "/signin"}`}
          className="register-and-login__link"
        >
          {signLinkText}
        </Link>
      </div>
    </div>
  );
}

export default RegisterAndLogin;
