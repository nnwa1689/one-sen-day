import React, { useEffect, useState } from 'react';
import firebase from 'firebase/app';
import 'firebase/auth';
import '../bulma.css';
import './login.css';
import logo from '../one-sentence-daily.svg';

const LoginForm = (props)=>{

    const [account, setAccount] = useState(null);
    const [password, setPassword] = useState(null);
    const [loginState, setLoginState] = useState(0);
    //0:init, 1:suc, 2:pwErr, 3:emailFormattErr, 4:Logining  5:otherErr 6:NullError  
    const [btnDis, setBtnDis] = useState(false);

    //判斷使用者是否登入（或曾經登入）
    //交由 memo  去和 firebase 驗證
    useEffect(
        ()=>{
            document.body.classList.add('light');
            firebase.auth().onAuthStateChanged((user)=> {
                if(user) {
                  // 使用者已登入，redirect to Homepage
                  window.location.href = '#/';
                }
              });

        },[]
    )

    const doLogin= ()=>{

        if(account==null || account=="" || password==null || password==""){
            setLoginState(6);
        }else{
            setBtnDis(true);
            setLoginState(4);
            firebase.auth()
            .signInWithEmailAndPassword(account, password)
            .then(result => {
                setLoginState(1);
                window.location.href = '#/';
            })
            .catch(error => {
                if(error.code==="auth/invalid-email")
                    setLoginState(3);
                else if(error.code==="auth/wrong-password")
                    setLoginState(2);
                else if(error.code==="auth/user-not-found")
                    setLoginState(2);
                else
                    setLoginState(5);
                setBtnDis(false);
            });
        }
    }

    return(

        <section className="hero is-fullheight">
            <div className="hero-body has-text-centered">
                <div className="login">
                <img src={logo} width="325px" />
                    { (loginState===2 || loginState===5) ? 
                        (
                            <div className="notification is-danger">
                                帳號或密碼錯誤。
                            </div>
                        )
                        :
                        ("")
                    }

                    { loginState===3 ? 
                        (
                            <div className="notification is-danger">
                                這看起來不像是Email欸＞＜
                            </div>
                        )
                        :
                        ("")
                    }

                    { loginState===6 ? 
                        (
                            <div className="notification is-danger">
                                請輸入完整的資訊
                            </div>
                        )
                        :
                        ("")
                    }
                <form>
                    <div className="field">
                    <div className="control">
                        <input disabled={btnDis} className="input is-medium" type="text" placeholder="帳號（E-mail）" autoComplete="username" onChange={(e)=>{setAccount(e.target.value)}} />
                    </div>
                    </div>
                    <div className="field">
                    <div className="control">
                        <input disabled={btnDis} className="input is-medium" type="password" placeholder="密碼" autoComplete="current-password" onChange={(e)=>{setPassword(e.target.value)}} />
                    </div>
                    </div>
                    <br />
                    { loginState===4 ? 
                        (
                            <progress className="progress is-small is-success" max="100"></progress>
                        ) 
                        : 
                        (
                            <button type="button" disabled={btnDis} className="button is-block is-outlined is-fullwidth is-primary is-medium" onClick={doLogin}>登入</button>
                        ) 
                    }        
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