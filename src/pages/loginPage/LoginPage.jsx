import { useSelector, useDispatch } from 'react-redux';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { fetchRequestToken, fetchSessionWithLogin, fetchSession, fetchAuth } from '../../store/asyncThunks/fetchAuth';

import Loading from '../../components/loading/Loading';

import style from './login-page.module.scss';

const LoginPage = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const {loading, status, token, validate, user} = useSelector(state => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  
  const auth = (event) => {
    event.preventDefault();
    dispatch(fetchRequestToken());
  }

  useEffect(() => {
    if (token) {
      dispatch(fetchSessionWithLogin({ username, password, request_token: token }))
    }
  }, [dispatch, username, password, token]);

  useEffect(() => {
    if (validate) {
      dispatch(fetchSession({request_token: validate}))
    }
  }, [dispatch, validate]);

  useEffect(() => {
    if(user.isAuth) {
      dispatch(fetchAuth())
      navigate('/')
    }
  }, [dispatch, navigate, user]);

  return (
    <section className={style.wrapp}>
      <form className={style.form} onSubmit={auth}>
        <div className={style.row}>
          <p>Username</p>
          <input 
            className={style.input} 
            type="text" 
            name="username" 
            onChange={(e) => setUsername(e.target.value)}
            style={status && {border: '2px solid var(--red-400)'}}
          />
        </div>

        <div className={style.row}>
          <p>Password</p>
          <input 
            className={style.input} 
            type="password" 
            name="password" 
            onChange={(e) => setPassword(e.target.value)}
            style={status && {border: '2px solid var(--red-400)'}}
          />
        </div>

        { status && <p className={style.error}>Wrong login or password</p> }

        <div className={style.row}>
          <button
            className={`${style.button} ${username.length < 4 || password.length < 4 || loading ? style.ban : ''}`}
          >
            {loading ? <Loading spinner size={10}/> : <span>Sing In</span>}
          </button>
        </div>
      </form>

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