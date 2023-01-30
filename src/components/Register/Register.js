import RegisterAndLogin from "../RegisterAndLogin/RegisterAndLogin";

function Register(props) {
  const { onRegister } = props;

  function handleSubmit() {
    onRegister();
  }

  return (
    <RegisterAndLogin
      title="Добро пожаловать!"
      submitButtonText="Зарегистрироваться"
      signText="Уже зарегистрированы?"
      signLinkText="Войти"
      onSubmit={handleSubmit}
    />
  );
}

export default Register;
