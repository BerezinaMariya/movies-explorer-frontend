import { useContext, useEffect } from "react";
import { Link } from "react-router-dom";
import { RegistrationInfoContext } from "../../contexts/RegistrationInfoContext";
import { FormValidator } from "../FormValidator/FormValidator";
import Header from "../Header/Header";

function RegisterAndLogin(props) {
  const registrationInfo = useContext(RegistrationInfoContext);
  const { title, submitButtonText, signText, signLinkText, onSubmit } = props;

  const { values, handleChange, errors, isFormValid, resetForm } =
    FormValidator();

  function handleSubmit(evt) {
    evt.preventDefault();
    if (isFormValid) {
      registrationInfo.name = values.name;
      registrationInfo.email = values.email;
      registrationInfo.password = values.password;
      onSubmit();
    } else {
      alert("Что-то пошло не так...");
    }
  }

  useEffect(() => {
    resetForm();
  }, []);

  return (
    <section className="register-and-login">
      <Header />
      <h3 className="title__24-29-med register-and-login__title">{title}</h3>
      <form className="form" onSubmit={handleSubmit} noValidate>
        <div
          className={`${
            title === "Рады видеть!"
              ? "register-and-login__name-area_hidden"
              : "register-and-login__name-area"
          }`}
        >
          <span className="text__10-12-reg form__input-hint">Имя</span>
          <input
            className={`text__14-17-reg form__input ${
              errors.name ? "form__input_error" : ""
            }`}
            type="text"
            name="name"
            id="input-reg-name"
            value={`${values.name ? values.name : ""}`}
            required
            minLength="2"
            maxLength="30"
            onChange={handleChange}
            disabled={title === "Добро пожаловать!" ? false : true}
          />
          <span
            name="name"
            className={`text__10-12-reg form__input-error ${
              errors.name ? "form__input-error_active" : ""
            }`}
          >
            {`${errors.name ? errors.name : ""}`}
          </span>
        </div>
        <span className="text__10-12-reg form__input-hint">E-mail</span>
        <input
          className={`text__14-17-reg form__input ${
            errors.email ? "form__input_error" : ""
          }`}
          type="email"
          name="email"
          id="input-reg-email"
          value={`${values.email ? values.email : ""}`}
          onChange={handleChange}
        />
        <span
          name="email"
          className={`text__10-12-reg form__input-error ${
            errors.email ? "form__input-error_active" : ""
          }`}
        >
          {`${errors.email ? errors.email : ""}`}
        </span>
        <span className="text__10-12-reg form__input-hint">Пароль</span>
        <input
          className={`text__14-17-reg form__input ${
            errors.password ? "form__input_error" : ""
          }`}
          type="password"
          name="password"
          id="input-reg-password"
          value={`${values.password ? values.password : ""}`}
          required
          onChange={handleChange}
        />
        <span
          name="password"
          className={`text__10-12-reg form__input-error ${
            errors.password ? "form__input-error_active" : ""
          }`}
        >
          {`${errors.password ? errors.password : ""}`}
        </span>
        <button
          type="submit"
          className={`button-hover form__submit-button ${
            title === "Рады видеть!" ? "form__submit-button_login" : ""
          }`}
        >
          {submitButtonText}
        </button>
      </form>
      <div className="register-and-login__sign">
        <p className="text__14-17-reg register-and-login__sign-text">
          {signText}
        </p>
        <Link
          to={`${title === "Рады видеть!" ? "/signup" : "/signin"}`}
          className="button-hover text__14-17-reg register-and-login__sign-link"
        >
          {signLinkText}
        </Link>
      </div>
    </section>
  );
}

export default RegisterAndLogin;
