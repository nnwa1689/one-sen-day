import React,{ useState, useEffect, useRef } from 'react';
import MemoComponenet from './MemoComponenet';
import NavComponent from './NavComponenet';
import firebase from 'firebase';
import FooterComponent from './FooterComponent';

const Memo = (props)=>{

    useEffect(
        ()=>{

            firebase.auth().onAuthStateChanged((user)=>{
                if(user) {
                  // 使用者已登入，可以取得資料
                  //pass
                } else {
                    window.location.href = '#/login';
                }
              });

            /*if(firstLoading.current == true){

                if(cookies.user && cookies.userToken){
                    //firebase token 驗證
                    try {
                        firebase.database().ref('/user/' + cookies.user).once("value", e => {
                            targData = e.val();
                        }).then(
                            ()=>{
                                if(targData.token === cookies.userToken){
                                    firstLoading.current = false;
                                }else{
                                    removeCookie('user', { path: '/' });
                                    removeCookie('userToken', { path: '/' });
                                    window.location.href = '#/login'
                                }
                            }
                        );
                    } catch (error) {
                        return false;
                    } 

                }else{

                    window.location.href = '#/login';

                }
                
            }*/
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