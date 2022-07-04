import { useState } from 'react';

import classes from './AuthForm.module.css';

const AuthForm = () => {
  const [email , setEmail] = useState('')
  const [pass , setPass] = useState('')
  const [isLogin, setIsLogin] = useState(true);

  const emailChangeHandler = (event) =>{
    setEmail(event.target.value);
  }
  const passChangeHandler = (event) =>{
    setPass(event.target.value);
  }


  const switchAuthModeHandler = () => {
    setIsLogin((prevState) => !prevState);
  };

  const submitHandler = (event) =>{
    event.preventDefault();

    
  }

  return (
    <section className={classes.auth}>
      <h1>{isLogin ? 'Login' : 'Sign Up'}</h1>
      <form>
        <div className={classes.control}>
          <label htmlFor='email'>Your Email</label>
          <input type='email' id='email' required onChange={emailChangeHandler} />
        </div>
        <div className={classes.control}>
          <label htmlFor='password'>Your Password</label>
          <input type='password' id='password' required onChange={passChangeHandler}/>
        </div>
        <div className={classes.actions}>
          <button>{isLogin ? 'Login' : 'Create Account'}</button>
          <button
            type='button'
            className={classes.toggle}
            onClick={switchAuthModeHandler}
          >
            {isLogin ? 'Create new account' : 'Login with existing account'}
          </button>
        </div>
      </form>
    </section>
  );
};

export default AuthForm;
