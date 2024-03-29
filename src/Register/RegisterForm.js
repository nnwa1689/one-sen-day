import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import firebase from 'firebase/app';
import 'firebase/auth';
import '../bulma.css';
import './register.css';
import logo from '../one-sentence-daily.svg';

const RegisterFrom = (props)=>{
    const history = useHistory();
    const [account, setAccount] = useState(null);
    const [password, setPassword] = useState(null);
    const [regState, setRegState] = useState(0);
    //0:init, 1:suc, 2:exsitErr, 3:PwSixErr, 4:Logining, 5:mailFomartErr, 6:otherErr, 7:NullError
    
    const doRegister = ()=>{
        if(account===null || account==="" || password===null || password===""){
            setRegState(7);
        } else {
            setRegState(4);
            firebase
            .auth()
            .createUserWithEmailAndPassword(account, password)
            .then(result => {
                setRegState(1);
            }).catch(function(error) {
                if(error.code==="auth/invalid-email"){
                    setRegState(5);
                } else if (error.code==="auth/weak-password"){
                    setRegState(3);
                } else if (error.code==="auth/email-already-in-use"){
                    setRegState(2);
                } else {
                    setRegState(6);
                }
            });
        }

    }

    useEffect(
        ()=>{
            document.body.classList.add('light');
            firebase.auth().onAuthStateChanged((user)=> {
                if(user) {
                  // 使用者已登入，redirect to Homepage
                  history.push('/')
                }
              });
        }
    )
    return(
        <section className="hero is-fullheight">
            <div className="columns is-multiline">
                <div className="column is-8 is-offset-2 register">
                    <div className="columns">
                        <div className="column left">
                        <h1 className="title is-1"><img src={logo} width="200px" /></h1>
                        <h2 className="subtitle colored is-4">利用「一」日記，與自己好好獨處</h2>
                        <p>壓抑，不是最好的選擇。與自己對話，才能更認識自己。</p>
                        </div>
                        <div className="column right has-text-centered">
                        <h1 className="title is-4"><span style={ {color: "#00A752"} }>今天</span>就開始，真的很簡單</h1>
                        <p className="description">只要簡單資訊就能馬上開始</p>
                        {
                            (regState===2) ?
                            (
                            <div className="notification is-danger">
                                恩...這email已經被註冊
                            </div>
                            )
                            :
                            ("")
                        }

                        {
                            (regState===3) ?
                            (
                            <div className="notification is-danger">
                                密碼要大於 6 位數OwO
                            </div>
                            )
                            :
                            ("")
                        }

                        {
                            (regState===5) ?
                            (
                            <div className="notification is-danger">
                                恩...這看起來不像Email
                            </div>
                            )
                            :
                            ("")
                        }

                        {
                            (regState===6) ?
                            (
                            <div className="notification is-danger">
                                發生了一些技術性問題，我們已經派出最有效率的長也去修正了，請稍後再來！
                            </div>
                            )
                            :
                            ("")
                        }

                        {
                            (regState===7) ?
                            (
                            <div className="notification is-danger">
                                底下框框都要填喔！
                            </div>
                            )
                            :
                            ("")
                        }

                        <form>
                            <div className="field">
                            <div className="control">
                                <input className="input is-medium" type="text" placeholder="帳號（E-mail）" disabled={((regState===4 || regState===1)? true:false)} onChange={(e)=>{setAccount(e.target.value)}}/>
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
                                (<button type="button" className="button is-block is-outlined is-success is-fullwidth is-medium" onClick={doRegister}>立即開始！</button>)
                            }
                            <br />
                            <small>我們絕對不會發送擾人的通知與電子郵件</small>
                            <br/>
                            <small>請同意我們的〈<a href="https://studio-44s.tw/page/privacypolicy" target="blank">隱私政策</a>〉</small>
                        </form>
                        </div>
                    </div>
                </div>

                <div className="column is-8 is-offset-2">
                    <br/>
                    <nav className="level">
                        <div className="level-left">
                            Made with <span className='has-text-danger'>❤</span> by <a href="https://studio-44s.tw">studio-44s</a>
                        </div>
                        <div className="level-right">
                        <small className="level-item">&copy; 「一」日記</small>
                        </div>
                    </nav>
                </div>
            </div>
        </section>
    )
}
export default RegisterFrom;