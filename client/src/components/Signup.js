import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import isEmail from 'validator/es/lib/isEmail';
import equals from 'validator/es/lib/equals';
import isEmpty from 'validator/es/lib/isEmpty';
import { showErrorMessage, showSuccessMessage } from './Helper/helper';
import { Loading, showLoading } from './Helper/Loading';
import { signUp } from '../API/auth';
const Signup = () => {
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    password2: '',
    successMsg: false,

    errorMsg: '',
    loading: false,
  });

  const {
    username,
    email,
    password,
    password2,
    successMsg,
    errorMsg,

    loading,
  } = formData;

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

    if (
      isEmpty(username) ||
      isEmpty(email) ||
      isEmpty(password) ||
      isEmpty(password2)
    ) {
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
    } else if (!equals(password, password2)) {
      setTimeout(() => {
        setFormData({
          ...formData,
          errorMsg: 'Password doesnot match',
        });
      }, 200);
    } else {
      //SuccessMsg
      const { username, email, password } = formData;
      const data = { username, email, password };
      setFormData({
        ...formData,
        loading: true,
      });
      signUp(data)
        .then((response) => {
          setFormData({
            username: '',
            email: '',
            password: '',
            password2: '',
            successMsg: response.data.successMessage,
            loading: false,
          });
        })
        .catch((err) => {
          console.log('Error in Axios Signup', err);
          setFormData({
            ...formData,
            errorMsg: err.response.data.errorMessage,
            loading: false,
          });
        });
    }
  };
  const signup = () => (
    <form onSubmit={handleSubmit} noValidate>
      <div className='form-group'>
        <label htmlFor='username'>Username</label>
        <input
          name='username'
          type='text'
          className='form-control'
          value={username}
          aria-describedby='username'
          onChange={handleChange}
        />
      </div>
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
      <div className='form-group'>
        <label htmlFor='exampleInputPassword1'>Confirm Password</label>
        <input
          name='password2'
          type='password'
          value={password2}
          className='form-control'
          id='exampleInputPassword1'
          onChange={handleChange}
        />
      </div>

      <button type='submit' className='btn btn-primary'>
        Sign Up
      </button>
      <p>
        Have an Account? <Link to='/login'> Login In</Link>
      </p>
    </form>
  );
  return (
    <div className='signup-container'>
      <div className='row px-3'>
        <div className='col-md-5 mx-auto align-self-center'>
          {errorMsg && showErrorMessage(errorMsg)}
          {successMsg && showSuccessMessage(successMsg)}
          {loading && <div className='text-center'>{showLoading()}</div>}
          {signup()}
          {/* <div style={{ whiteSpace: 'pre' }}>
            {JSON.stringify(formData, null, 2)}
          </div> */}
        </div>
      </div>
    </div>
  );
};

export default Signup;
