import React,{ useState, useEffect, useRef } from 'react';
import MemoComponenet from './MemoComponenet';
import NavComponent from './NavComponenet';
import { useCookies } from 'react-cookie';
import firebase from 'firebase';
import FooterComponent from './FooterComponent';
import AccountSettingComponent from './AccountSettingComponent.js';

const Memo = (props)=>{
    const [memoUpdate, setMemoUpdate] = useState(false);
    const firstLoading = useRef(true);
    const [cookies, setCookie, removeCookie] = useCookies();
    let targData = null;

    useEffect(
        ()=>{
            if(firstLoading.current == true){

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