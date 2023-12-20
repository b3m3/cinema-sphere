import { useSelector, useDispatch } from 'react-redux';
import { useEffect, useState } from 'react';

import { createRequestToken, createSessionWithLogin, createSession, checkAuth } from '../../store/slices/authSlice';

import style from './login-page.module.scss';

const LoginPage = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const {loading, status, token, validate, session, isAuth} = useSelector(state => state.auth);
  const dispatch = useDispatch();

  const auth = (event) => {
    event.preventDefault();
    dispatch(createRequestToken());
  }

  useEffect(() => {
    if (token) {
      dispatch(createSessionWithLogin({username, password, request_token: token}))
    }
  }, [dispatch, username, password, token]);

  useEffect(() => {
    if (validate) {
      dispatch(createSession({request_token: validate}))
    }
  }, [dispatch, validate]);

  useEffect(() => {
    dispatch(checkAuth());
  }, [dispatch])


  console.log('loading', loading);
  console.log('status', status);
  console.log('session', session);
  console.log('isAuth', isAuth);

  return (
    <section className={style.wrapp}>
      <form className={style.form} onSubmit={auth}>
        <div className={style.row}>
          <p>Username</p>
          <input className={style.input} type="text" name="username" onChange={(e) => setUsername(e.target.value)} />
        </div>

        <div className={style.row}>
          <p>Password</p>
          <input className={style.input} type="password" name="password" onChange={(e) => setPassword(e.target.value)} />
        </div>

        <div className={style.row}>
          <button className={style.button}>Sing In</button>
        </div>
      </form>

      <div className={style.right}>
        <span className={style.label}>Don't have an account ?</span>
        <a className={`${style.button} ${style.button_orange}`} rel="noopener noreferrer" target='__blank' href='https://www.themoviedb.org/signup'>Create a New Account</a>
      </div>
    </section>
  );
}

export default LoginPage;