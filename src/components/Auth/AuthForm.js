import { useState, useContext } from "react";
import AuthContext from '../../store/auth-context';
import classes from "./AuthForm.module.css";

const AuthForm = () => {
  const [inputEmail, setInputEmail] = useState("");
  const [inputPassword, setInputPassword] = useState("");
  const [isLogin, setIsLogin] = useState(true);

  const authCtx = useContext(AuthContext);

  const emailChangeHandler = (event) => {
    setInputEmail(event.target.value);
  };
  const passChangeHandler = (event) => {
    setInputPassword(event.target.value);
  };

  const switchAuthModeHandler = () => {
    setIsLogin((prevState) => !prevState);
  };

  const submitHandler = (event) => {
    event.preventDefault();

    const enteredEmail = inputEmail;
    const enteredPassword = inputPassword;
    let url;
    if (isLogin) {
      url =
        "https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyBFoNvIDe7rM2vMIHUfW4mBvvcwUHu95kk";
    } else {
      url =
        "https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyBFoNvIDe7rM2vMIHUfW4mBvvcwUHu95kk";
    }
    fetch(url, {
      method: "POST",
      body: JSON.stringify({
        email: enteredEmail,
        password: enteredPassword,
        returnSecureToken: true,
      }),
      headers: {
        "Content-Type": "application/json",
      },
    }).then((response) => {
      if (response.ok) {
        return response.json();
      } else {
        return response.json().then((data) => {
          const errorMessage = data.error.message;
          throw new Error(errorMessage);
        });
      }
    }).then(data=>{
      authCtx.login(data.idToken);
    }).catch((err)=>{
      alert(err.message)
    })
  };

  return (
    <section className={classes.auth}>
      <h1>{isLogin ? "Login" : "Sign Up"}</h1>
      <form onSubmit={submitHandler}>
        <div className={classes.control}>
          <label htmlFor="email">Your Email</label>
          <input
            type="email"
            id="email"
            required
            onChange={emailChangeHandler}
          />
        </div>
        <div className={classes.control}>
          <label htmlFor="password">Your Password</label>
          <input
            type="password"
            id="password"
            required
            onChange={passChangeHandler}
          />
        </div>
        <div className={classes.actions}>
          <button>{isLogin ? "Login" : "Create Account"}</button>
          <button
            type="button"
            className={classes.toggle}
            onClick={switchAuthModeHandler}
          >
            {isLogin ? "Create new account" : "Login with existing account"}
          </button>
        </div>
      </form>
    </section>
  );
};

export default AuthForm;
