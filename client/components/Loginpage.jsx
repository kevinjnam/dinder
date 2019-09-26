import React, { Component } from 'react';

const Login = ({ verification, signup, yelpAuth }) => {
  return (
    <div className='modal' id='login'>
      <div className='login-header'>
        <div className='image-frame'>
          <img className='logo' src={'../assets/logo.png'} />
        </div>
        <h1>Dinder Login</h1>
      </div>
      <form onSubmit={verification}>
        <div>
          <label for='user'>Username:</label>
          <input type='text' name='username' id='user' required={true} />
        </div>
        <div>
          <label for='password'>Password:</label>
          <input type='password' name='password' id='password' required={true} />
        </div>
        <button className='sign-in' name='button' id='button' type='submit'>
          <i className='fa fa-sign-in-alt'></i>
        </button>
      </form>
      <button className='sign-up' onClick={() => signup()}>Need an account?<br/>Sign up here...</button>

    </div>
  );
};
export default Login;
