import { useState } from 'react';

import classes from './AuthForm.module.css';

const AuthForm = () => {
  const [inputEmail , setInputEmail] = useState('')
  const [inputPassword , setInputPassword] = useState('')
  const [isLogin, setIsLogin] = useState(true);

  const emailChangeHandler = (event) =>{
    setInputEmail(event.target.value);
  }
  const passChangeHandler = (event) =>{
    setInputPassword(event.target.value);
  }


  const switchAuthModeHandler = () => {
    setIsLogin((prevState) => !prevState);
  };

  const submitHandler = (event) =>{
    event.preventDefault();

    const enteredEmail = inputEmail;
    const enteredPassword = inputPassword;

    if(isLogin){
      
    }
    else {
      fetch('https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyBFoNvIDe7rM2vMIHUfW4mBvvcwUHu95kk',{
      method: 'POST',  
      body: JSON.stringify({
          email: enteredEmail,
          password: enteredPassword,
          returnSecureToken: true,
        }),
        headers: {
        'Content-Type': 'application/json',
        }
      }).then((response)=>
      {if(response.ok){

      }
      else{
        return response.json().then((data)=>{
          console.log(data)
        })
      }}
      )
    }
  }

  return (
    <section className={classes.auth}>
      <h1>{isLogin ? 'Login' : 'Sign Up'}</h1>
      <form onSubmit={submitHandler}>
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
