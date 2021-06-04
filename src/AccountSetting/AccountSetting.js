import React,{ useState, useEffect, useRef } from 'react';
import NavComponent from '../NavComponenet';
import firebase from 'firebase/app';
import 'firebase/auth';
import FooterComponent from '../FooterComponent';
import AccountSettingComponent from '../AccountSetting/AccountSettingComponent.js';

const Memo = (props)=>{
    const firstLoading = useRef(true);

    useEffect(
        ()=>{
            if(firstLoading.current == true){
                firebase.auth().onAuthStateChanged(function(user) {
                    if(user) {
                      // 使用者已登入，可以取得資料
                      //pass
                    } else {
                        window.location.href = '#/login';
                    }
                  });    
            }
        }, []
    )

    return(
        <NavComponent>
            <AccountSettingComponent></AccountSettingComponent>
            <FooterComponent></FooterComponent>
        </NavComponent>
    )

}

export default Memo;