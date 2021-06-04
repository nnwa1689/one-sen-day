import React,{ useEffect } from 'react';
import MemoComponenet from './MemoComponenet';
import NavComponent from '../NavComponenet';
import firebase from 'firebase/app';
import 'firebase/auth';
import FooterComponent from '../FooterComponent';

const Memo = (props)=>{

    useEffect(
        ()=>{

            firebase.auth().onAuthStateChanged((user)=>{
                if(user) {
                  // 使用者已登入，可以取得資料
                } else {
                    window.location.href = '#/login';
                }
              });
        }, []
    )

    return(
        <NavComponent>
            <MemoComponenet></MemoComponenet>
            <FooterComponent></FooterComponent>
        </NavComponent>
    )

}

export default Memo;