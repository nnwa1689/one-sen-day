import React,{ useEffect, useRef } from 'react';
import { useHistory } from 'react-router-dom';
import NavComponent from '../NavBar/NavComponenet';
import firebase from 'firebase/app';
import 'firebase/auth';
import FooterComponent from '../NavBar/FooterComponent';
import AccountSettingComponent from '../AccountSetting/AccountSettingComponent.js';

const AccountSetting = (props)=>{
    const history = useHistory();
    const firstLoading = useRef(true);
    useEffect(
        ()=>{
            if(firstLoading.current == true){
                firebase.auth().onAuthStateChanged(function(user) {
                    if(user) {
                      // 使用者已登入，可以取得資料
                      //pass
                    } else {
                        history.push('/login')
                    }
                  });    
            }
        }, []
    )
    return(
        <>
            <NavComponent></NavComponent>
            <AccountSettingComponent></AccountSettingComponent>
            <FooterComponent></FooterComponent>
        </>
    )
}
export default AccountSetting;