import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import Memo from './Memo/Memo.js';
import LoginForm from './LoginForm/LoginForm.js';
import firebase from 'firebase/app';
import 'firebase/app-check';
import FireBaseConfig from './FireBaseConfig/FireBaseConfig.js';
import RegisterFrom from './Register/RegisterForm.js';
import AccountSetting from './AccountSetting/AccountSetting.js';
import './bulma.css';
import './Memo/memo.css';

const App = ()=>{

  var basename = "/";

  if(!firebase.apps.length){
    firebase.initializeApp(FireBaseConfig);  
  }

  if(process.env.NODE_ENV !== "development"){
    const appCheck = firebase.appCheck();
    appCheck.activate('6Lfs9TQbAAAAANxrKWGaZgx71yy6PHZ26t5CGE4h');
    basename = "/apps/one-sen-day/"
  }

  document.title = "一句話日記 - 從此愛上簡單生活";
  
  return(
    <BrowserRouter basename={ basename }>
      <Switch>
        <Route exact path="/" component={Memo} />
        <Route path="/login" component={LoginForm} />
        <Route path="/register" component={RegisterFrom} />
        <Route exact path="/accountsetting" component={AccountSetting} />
      </Switch>
    </BrowserRouter>
  )
}
export default App;
