import RegisterAndLogin from "../RegisterAndLogin/RegisterAndLogin";

function Register(props) {
  const { onRegister, isRegOrAuthLoading } = props;

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
      isRegOrAuthLoading={isRegOrAuthLoading}
    />
  );
}

export default Register;
