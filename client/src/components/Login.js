import React, { useState, useEffect } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { Loading, showLoading } from './Helper/Loading';
import { showErrorMessage } from './Helper/helper';
import isEmail from 'validator/es/lib/isEmail';
import isEmpty from 'validator/es/lib/isEmpty';
import { signin } from '../API/auth';
import { isAuthenticated, setAuthentication } from './Helper/auth';
const Login = () => {
  const history = useHistory();
  useEffect(() => {
    if (isAuthenticated() && isAuthenticated().role === 1) {
      history.push('/admin/dashboard');
    } else if (isAuthenticated() && isAuthenticated().role === 0) {
      history.push('/user/dashboard');
    }
  }, [history]);
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    errorMsg: '',
    loading: false,
  });
  const { email, password, errorMsg, loading } = formData;

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
      successMsg: '',
      errorMsg: '',
    });
  };
  const handleSubmit = (e) => {
    e.preventDefault();

    if (isEmpty(email) || isEmpty(password)) {
      setTimeout(() => {
        setFormData({
          ...formData,
          errorMsg: 'All Fields are required',
        });
      }, 200);
    } else if (!isEmail(email)) {
      setTimeout(() => {
        setFormData({
          ...formData,
          errorMsg: 'Invalid email',
        });
      }, 200);
    } else {
      //SuccessMsg
      const { email, password } = formData;
      const data = { email, password };
      setFormData({
        ...formData,
        loading: true,
      });
      signin(data)
        .then((response) => {
          console.log('Sign In Success >>', response);
          setAuthentication(response.data.token, response.data.user);
          if (isAuthenticated() && isAuthenticated().role === 1) {
            history.push('/admin/dashboard');
          } else {
            history.push('/user/dashboard');
          }
        })
        .catch((err) => {
          setFormData({
            ...formData,
            errorMsg: 'Credential Not Match',
            loading: false,
          });
          console.log('Sign in Api Function Error >>>>', err);
        });
    }
  };
  const signIN = () => (
    <form onSubmit={handleSubmit} noValidate>
      <div>
        <div className='input-group mb-3'>
          <div className='input-group-prepend'>
            <span className='input-group-text' id='basic-addon1'>
              @
            </span>
          </div>
          <input
            name='email'
            type='email'
            className='form-control'
            placeholder='Email'
            aria-label='Email'
            aria-describedby='basic-addon1'
            value={email}
            onChange={handleChange}
          />
        </div>
      </div>

      <div className='form-group'>
        <label htmlFor='exampleInputPassword1'>Password</label>
        <input
          name='password'
          type='password'
          value={password}
          className='form-control'
          id='exampleInputPassword1'
          onChange={handleChange}
        />
      </div>

      <button type='submit' className='btn btn-primary'>
        Sign In
      </button>
      <p>
        Dont't an Account? <Link to='/signup'> Register Here</Link>
      </p>
    </form>
  );
  return (
    <div className='signin-container'>
      <div className='row px-3'>
        <div className='col-md-5 mx-auto align-self-center'>
          {errorMsg && showErrorMessage(errorMsg)}
          {loading && <div className='text-center'>{showLoading()}</div>}
          {signIN()}
        </div>
      </div>
    </div>
  );
};

export default Login;
