import Form from "./Form/Form";

import style from './LoginPage.module.scss';

const LoginPage = () => {
  return (
    <section className={style.wrapp}>
      <Form />

      <div className={style.right}>
        <span className={style.label}>Don't have an account ?</span>
        <a 
          className={`${style.button} ${style.button_orange}`} 
          rel="noopener noreferrer" 
          target='__blank' 
          href='https://www.themoviedb.org/signup'
        >
          Create a New Account
        </a>
      </div>
    </section>
  );
}

export default LoginPage;