import React, { useEffect, useState } from 'react';
import { useCookies } from 'react-cookie';
import firebase from 'firebase';
import passwordHash from 'password-hash';
import './bulma.css';
import './register.css';
import logo from './one-sentence-daily.svg';

const RegisterFrom = (props)=>{

    const [account, setAccount] = useState(null);
    const [password, setPassword] = useState(null);
    const [regState, setRegState] = useState(0);
    //0:init, 1:suc, 2:exsitErr, 3:otherErr, 4:Logining
    const [cookies, setCookie, removeCookie] = useCookies();

    let targData = null;
    const doRegister = ()=>{

        if(account===null || account==="" || password===null || password===""){

            alert("請輸入完整的資料");

        }else{
            setRegState(4);
            try {
                firebase.database().ref('/user/' + account).once("value", e => {
                    targData = e.val();
                }).then(
                    ()=>{
                        //尚未被註冊
                        if(targData===null){
                            let userRef = firebase.database().ref('/user/' + account);
                            userRef.set(
                                {
                                    id: account,
                                    password:hashPassword(password),
                                    token: ""
                                }
                            ).then(
                                ()=>{
                                    setRegState(1);
                                }
                            )
                        }else{
                            setRegState(2);
                        }
    
                    }
                );
            } catch (error) {
                setRegState(3);
            }


        }

    }

    const hashPassword = (willHashPassword)=>{

        return passwordHash.generate(willHashPassword);

    }

    useEffect(
        ()=>{
            
            if(cookies.user_token){
                window.location.href = '#/';
            }

        },[]
    )

    useEffect(
        ()=>{
            
            if(regState===1){
                setTimeout(() => {

                    window.location.href = '#/login';
            
                }, 2000)
            }

        },[regState]
    )

    return(
        <section className="container">
            <div className="columns is-multiline">
                <div className="column is-8 is-offset-2 register">
                <div className="columns">
                    <div className="column left">
                    <h1 className="title is-1"><img src={logo} width="325px" /></h1>
                    <h2 className="subtitle colored is-4">讓生活變得更簡單.</h2>
                    <p>厭倦了繁雜的社交媒體嗎？想想你多久沒寫過日記了？是時候該讓自己的生活簡單一點，過上減法生活，每日都用一句話來描述今天的生活。</p>
                    </div>
                    <div className="column right has-text-centered">
                    <h1 className="title is-4">今天就開始簡單生活</h1>
                    <p className="description">沒錯，只要簡單資訊就能馬上開始</p>
                    {
                        (regState===2) ?
                        (
                        <div class="notification is-danger">
                            很抱歉，該帳號名稱已經存在！
                        </div>
                        )
                        :
                        ("")
                    }

                    {
                        (regState===3) ?
                        (
                        <div class="notification is-danger">
                            奧奧，發生了一些錯誤，我們正在嘗試修復當中...
                        </div>
                        )
                        :
                        ("")
                    }

                    {
                        (regState===1) ?
                        (
                        <div class="notification is-success">
                            哇，你的帳號已經建立好，馬上帶你去登入！
                        </div>
                        )
                        :
                        ("")
                    }

                    <form>
                        <div className="field">
                        <div className="control">
                            <input className="input is-medium" type="text" placeholder="帳號" disabled={((regState===4 || regState===1)? true:false)} onChange={(e)=>{setAccount(e.target.value)}}/>
                        </div>
                        </div>

                        <div className="field">
                        <div className="control">
                            <input className="input is-medium" type="password" placeholder="密碼" disabled={((regState===4 || regState===1)? true:false)} onChange={(e)=>{setPassword(e.target.value)}}/>
                        </div>
                        </div>

                        {
                            (regState===4 || regState===1) ?
                            (<progress className="progress is-small is-primary" max="100"></progress>)
                            :
                            (<button className="button is-block is-primary is-fullwidth is-medium" onClick={doRegister}>立即開始！</button>)
                        }
                        <br />
                        <small><em>我們絕對不會發送擾人的通知與電子郵件</em></small>
                    </form>
                    </div>
                </div>
                </div>

                <div className="column is-8 is-offset-2">
                <br/>
                <nav className="level">
                    <div className="level-left">
                    <div className="level-item">
                        <span className="icon">
                        <i className="fab fa-twitter"></i>
                        </span> &emsp;
                        <span className="icon">
                        <i className="fab fa-facebook"></i>
                        </span> &emsp;
                        <span className="icon">
                        <i className="fab fa-instagram"></i>
                        </span> &emsp;
                        <span className="icon">
                        <i className="fab fa-github"></i>
                        </span> &emsp;
                        <span className="icon">
                        <i className="fas fa-envelope"></i>
                        </span>
                    </div>
                    </div>
                    <div className="level-right">
                    <small className="level-item">
                        &copy; 筆記長也 notesHazuya.
                    </small>
                    </div>
                </nav>
                </div>
            </div>
        </section>

    )

}

export default RegisterFrom;