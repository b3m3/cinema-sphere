import style from './login-page.module.scss';

const LoginPage = () => {
  return (
    <section className={style.wrapp}>
      <form className={style.form} action="">
        <div className={style.row}>
          <p>Username</p>
          <input className={style.input} type="text" name="username" />
        </div>
        <div className={style.row}>
          <p>Password</p>
          <input className={style.input} type="password" name="password" />
        </div>
        <div className={style.row}>
          <button className={style.button}>Sing In</button>
        </div>
      </form>
      <div className={style.right}>
        <span className={style.label}>Don't have an account ?</span>
        <button className={`${style.button} ${style.button_orange}`}>Create a New Account</button>
      </div>
    </section>
  );
}

export default LoginPage;