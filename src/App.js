import React, { useEffect, useState } from 'react';
import { HashRouter, Route, Switch, Redirect } from 'react-router-dom';
import Memo from './Memo.js';
import LoginForm from './LoginForm.js';
import firebase from 'firebase';
import FireBaseConfig from './FireBaseConfig.js';
import RegisterFrom from './RegisterForm.js';
import AccountSetting from './AccountSetting.js';
import './bulma.css';
import './memo.css';

const App = ()=>{

  if(!firebase.apps.length){
      firebase.initializeApp(FireBaseConfig);  
  }
  
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
