import React, { useEffect, useState } from 'react';
import firebase from 'firebase';
import { useCookies } from 'react-cookie';
import passwordHash from 'password-hash';
import './bulma.css';
import './login.css';
import logo from './one-sentence-daily.svg';

const LoginForm = (props)=>{

    const [account, setAccount] = useState(null);
    const [password, setPassword] = useState(null);
    const [loginState, setLoginState] = useState(0);
    //0:init, 1:suc, 2:pwErr, 3:otherErr, 4:Logining
    const [btnDis, setBtnDis] = useState(false);
    const [cookies, setCookie, removeCookie] = useCookies();
    let targData = "";

    //判斷使用者是否登入（或曾經登入）
    //交由 memo  去和 firebase 驗證
    useEffect(
        ()=>{
            
            if(cookies.userToken && cookies.user){
                window.location.href = '#/';
            }

        },[]
    )

    const doLogin= ()=>{

        if(account==null || account=="" || password==null || password==""){
            alert('請輸入帳號密碼')
        }else{
            
            setBtnDis(true);
            setLoginState(4);
            try {
                firebase.database().ref('/user/' + account).once("value", e => {
                    targData = e.val();
                }).then(
                    ()=>{
                        loginIden();
                    }
                );
            } catch (error) {
                setLoginState(3);
            }

        }
    }

    const saveLoginToken = (loginToken)=>{

        //localCookie
        setCookie('user', account, { path: '/', maxAge: 604800 });
        setCookie('userToken', loginToken, { path: '/', maxAge: 604800 });

        //fireBase
        try {
            firebase.database().ref('/user/' + account).update({ token: loginToken })
        } catch (error) {
            
        }
        
        //sessionStorage.setItem('User', account);
    }

    const loginTokenGen = ()=>{

        const hashToken = passwordHash.generate(Date.now().toString())
        return hashToken;

    }

    const loginIden = ()=>{
        if(targData === null){
            setLoginState(2);
        }else if(passwordHash.verify(password, targData.password)){
            setLoginState(1);
            saveLoginToken(loginTokenGen());
            window.location.href = '#/';
        }else{
            setLoginState(2);
        }

        setBtnDis(false);

    }

    return(

        <section className="hero is-fullheight">
            <div className="hero-body has-text-centered">
                <div className="login">
                <img src={logo} width="325px" />
                { loginState===2 ? 
                            (
                                <div className="notification is-danger">
                                    帳號或密碼錯誤。
                                </div>
                            )
                            :
                            ("")
                    }
                <form>
                    <div className="field">
                    <div className="control">
                        <input disabled={btnDis} className="input is-medium is-rounded" type="text" placeholder="帳號" autoComplete="username" onChange={(e)=>{setAccount(e.target.value)}} />
                    </div>
                    </div>
                    <div className="field">
                    <div className="control">
                        <input disabled={btnDis} className="input is-medium is-rounded" type="password" placeholder="密碼" autoComplete="current-password" onChange={(e)=>{setPassword(e.target.value)}} />
                    </div>
                    </div>
                    <br />
                    { loginState===4 ? 
                    (
                        <progress className="progress is-small is-primary" max="100"></progress>
                    ) 
                    : 
                    (
                        <button disabled={btnDis} className="button is-block is-fullwidth is-primary is-medium is-rounded" onClick={doLogin}>登入</button>
                    ) }
                    
                </form>
                <br/>
                <nav className="level">
                    <div className="level-item has-text-centered">
                    <div>
                        <div>
                            <p>還沒有帳號？</p>
                        </div>
                    </div>
                        <div className="level-item has-text-centered">
                            
                            <a href="#/register">建立帳號</a>
                        </div>
                    </div>
                </nav>
                </div>
            </div>
        </section>
    
    )

}

export default LoginForm;