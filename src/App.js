import React, { useRef, useState, useEffect } from 'react';
import { BrowserRouter, Route, Switch, Redirect } from 'react-router-dom';
import Memo from './Memo/Memo.js';
import LoginForm from './LoginForm/LoginForm.js';
import firebase from 'firebase/app';
import 'firebase/auth';
import FireBaseConfig from './FireBaseConfig/FireBaseConfig.js';
import RegisterFrom from './Register/RegisterForm.js';
import AccountSetting from './AccountSetting/AccountSetting.js';
import './bulma.css';
import './Memo/memo.css';

const App = ()=>{

  var basename = "/";
  const isFirstLoad = useRef(true);
  const [ isAuth, setAuth ] = useState(0);

  if (!firebase.apps.length) {
    firebase.initializeApp(FireBaseConfig);  
  }

  if (process.env.NODE_ENV !== "development") {
    basename = "/apps/one-sen-day/"
  }

  useEffect(
    () => {
      if (isFirstLoad.current) {
        firebase.auth().onAuthStateChanged((user)=>{
          if (user) {
            setAuth(true);
          } else {
            setAuth(false);
          }
        });
        isFirstLoad.current = false;
      }
    }
  )
  
  return(
    <>
      { isAuth !== 0 ? 
        <BrowserRouter basename={ basename }>
          <Switch>
            <Route exact path="/" component={Memo} />
            <Route path="/login" component={LoginForm} />
            <Route path="/register" component={RegisterFrom} />
            <Route exact path="/accountsetting" component={AccountSetting} />
          </Switch>
          { isAuth ? "" : <Redirect to='/login'/> }
        </BrowserRouter> 
      : "" }
    </>
  )
}
export default App;
