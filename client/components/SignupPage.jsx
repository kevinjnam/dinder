import React, { Component } from 'react';

const Signup = ({ creation }) => {
  return (
    <div className='modal' id='login'>
      <div className='login-header'>
        <div className='image-frame'>
          <img className='logo' src={'../assets/logo.png'} />
        </div>
        <h1>Dinder Sign Up</h1>
      </div>
      <form onSubmit={creation}>
        <div>
          <label for='user'>Username:</label>
          <input type='text' name='username' id='user' required={true} />
        </div>
        <div>
          <label for='password'>Password:</label>
          <input type='password' name='password' id='password' required={true} />
        </div>
        <button className='sign-in' name=' button' id='button' type='submit'>
          <i className='fa fa-sign-in-alt'></i>
        </button>
      </form>
    </div>
  );
};
export default Signup;
