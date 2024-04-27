import {memo, useCallback, useEffect, useMemo, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {useNavigate} from "react-router-dom";
import Loading from "../../../components/Loading/Loading";
import {fetchAuth, fetchRequestToken, fetchSession, fetchSessionWithLogin} from "../../../store/asyncThunks/fetchAuth";

import style from './Form.module.scss';
import {scrollToTop} from "../../../utils/functions";

const Form = memo(() => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const {loading, status, token, validate, user} = useSelector(state => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const auth = useCallback((event) => {
    event.preventDefault();
    dispatch(fetchRequestToken());
  }, [dispatch])

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

  useEffect(() => {
    scrollToTop()
  }, []);

  const errorStyle = useMemo(() => {
    if (status) {
     return {border: '2px solid var(--red-400)'}
    }
  }, [status]);

  const buttonBanStyle = useMemo(() => {
    return username.length < 4 || password.length < 4 || loading ? style.ban : ''
  }, [username, password, loading])

  const changeHandler = useCallback((setState, event) => {
    return setState(event.target.value);
  }, []);

  return (
    <form className={style.form} onSubmit={auth}>
      <div className={style.row}>
        <p>Username</p>
        <input
          className={style.input}
          type="text"
          name="username"
          onChange={(e) => changeHandler(setUsername, e)}
          style={errorStyle}
        />
      </div>

      <div className={style.row}>
        <p>Password</p>
        <input
          className={style.input}
          type="password"
          name="password"
          onChange={(e) => changeHandler(setPassword, e)}
          style={errorStyle}
        />
      </div>

      {status && <p className={style.error}>Wrong login or password</p>}

      <div className={style.row}>
        <button
          className={`${style.button} ${buttonBanStyle}`}
        >
          { loading ? <Loading spinner size={10}/> : <span>Sign In</span> }
        </button>
      </div>
    </form>
  );
});

export default Form;