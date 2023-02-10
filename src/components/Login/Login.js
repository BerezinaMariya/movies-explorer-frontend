import RegisterAndLogin from "../RegisterAndLogin/RegisterAndLogin";

function Login(props) {
  const { onLogin, isRegOrAuthLoading } = props;

  function handleSubmit() {
    onLogin();
  }

  return (
    <RegisterAndLogin
      title="Рады видеть!"
      submitButtonText="Войти"
      signText="Ещё не зарегистрированы?"
      signLinkText="Регистрация"
      onSubmit={handleSubmit}
      isRegOrAuthLoading={isRegOrAuthLoading}
    />
  );
}

export default Login;
