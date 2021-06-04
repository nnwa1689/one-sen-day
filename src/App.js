import React from 'react';
import { HashRouter, Route, Switch, Redirect } from 'react-router-dom';
import Memo from './Memo/Memo.js';
import LoginForm from './LoginForm/LoginForm.js';
import firebase from 'firebase/app';
import FireBaseConfig from './FireBaseConfig.js';
import RegisterFrom from './Register/RegisterForm.js';
import AccountSetting from './AccountSetting/AccountSetting.js';
import './bulma.css';
import './Memo/memo.css';

const App = ()=>{

  if(!firebase.apps.length){
      firebase.initializeApp(FireBaseConfig);  
  }

  document.title = "一句話日記 - 從此愛上簡單生活";
  
  return(
    <HashRouter>
      <Switch>
        <Route exact path="/" component={Memo} />
        <Route path="/login" component={LoginForm} />
        <Route path="/register" component={RegisterFrom} />
        <Route exact path="/accountsetting" component={AccountSetting} />
      </Switch>
    </HashRouter>
  )
}
export default App;
