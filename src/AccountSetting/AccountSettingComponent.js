import React,{ useState, useEffect, useRef } from 'react';
import { useHistory } from 'react-router-dom';
import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/database';
import '../bulma.css';
import '../LoginForm/login.css';
import '../Register/register.css';
import logo from '../one-sentence-daily.svg';

const AccountSettingComponent = (props)=>{
    const history = useHistory();
    const userUid = useRef("");
    const firstRender = useRef(true);
    const [oldPw, setOldPw] = useState("");
    const [newPw, setNewPw] = useState("");
    const [newTwicePw, setTwiceNewPw] = useState("");
    const [updatePwState, setUpdatePwState] = useState(0);
    const [postCount, setPostCount] = useState(0);
    const [userMail, setUserMail] =useState("");
    //0:init 1:suc 2:updateing 3:oldPwErr 4:TwicePwErr 5:Nullerr 6:minMustBeLargeSixErr

    const updatePassword = ()=>{
        setUpdatePwState(2);
        //驗證二次密碼
        if (newPw ==="" || newTwicePw==="" || oldPw==="") {
            setUpdatePwState(5);
            return;
        } else if ( newPw!==newTwicePw ){
            setUpdatePwState(4);
            return;
        }
        firebase.auth().onAuthStateChanged((user)=>{
            if (user) {
              // 驗證舊密碼
              var credential = firebase.auth.EmailAuthProvider.credential(user.email, oldPw);
              user.reauthenticateWithCredential(credential).then(()=> {
                user.updatePassword(newPw).then(()=>{
                    // 修改密碼完成
                    setUpdatePwState(1);
                  }).catch((error)=> {
                    if (error.code==="auth/weak-password") {
                        setUpdatePwState(6);
                    } else {
                        setUpdatePwState(3);
                    }
                  });
              }).catch((error)=>{
                  setUpdatePwState(3);
              });
            } else {
                history.push('/login');
            }
          });
    }

    const countUserPost = () => {
        firebase.database().ref('/oneSenDay/' + userUid.current).once("value", e => {
          }).then(
            (e)=>{
                setPostCount(e.val() === null || e.val() === undefined ? 0 : Object.keys(e.val()).length);
            }
          )
    }

    useEffect(
        ()=>{
            if (firstRender.current === true) {
                firebase.auth().onAuthStateChanged((user) => {
                    if (user) {
                        setUserMail(user.email);
                        userUid.current = user.uid
                        countUserPost();
                    }
                  });
                firstRender.current = false;
                window.scrollTo(0, 0);
            }
        }
    )
    return(
        <div className="columns body-columns">
            <div className="column is-half is-offset-one-quarter">
                <div className="card">
                    <div className="header">
                        <div className="media">
                            <div className="media-content">
                                <div className="columns">
                                    <div className="column is-half">
                                        <article className="tile is-child notification is-success">
                                            <p className="title">嗨)^o^(</p>
                                            <p className="subtitle">{ userMail }，感覺還好嗎？有遇到什麼問題或是趣事嗎？</p>
                                        </article>
                                    </div>
                                    <div className="column">
                                        <article className="tile is-child notification is-warning">
                                            <p className="title">你已經......</p>
                                            <p className="subtitle">發表了 { postCount } 篇日記了！
                                                <br/>如果有需要，我們隨時為你敞開大門。
                                            </p>
                                        </article>
                                    </div>
                                </div>
                                <br></br>
                                <p className="subtitle is-3">密碼設定</p>

                                { updatePwState===1 ? 
                                (
                                    <div className="notification is-success">
                                        密碼已經更新成功，請重新登入！
                                    </div>
                                )
                                :
                                ("")
                                }

                                { updatePwState===5 ? 
                                (
                                    <div className="notification is-danger">
                                        請檢查有沒有東西沒填到。
                                    </div>
                                )
                                :
                                ("")
                                }

                                { updatePwState===6 ? 
                                (
                                    <div className="notification is-danger">
                                        密碼要大於 6 個位數唷！
                                    </div>
                                )
                                :
                                ("")
                                }

                                { updatePwState===3 ? 
                                (
                                    <div className="notification is-danger">
                                        原密碼輸入錯誤。
                                    </div>
                                )
                                :
                                ("")
                                }

                                { updatePwState===4 ? 
                                (
                                    <div className="notification is-danger">
                                        兩次輸入的新密碼不同，請重新輸入。
                                    </div>
                                )
                                :
                                ("")
                                }

                                <div className="field is-horizontal">
                                <div className="field-label is-normal">
                                    <label className="label">新密碼</label>
                                </div>
                                <div className="field-body">
                                    <div className="field">
                                    <p className="control">
                                        <input id="new-password" disabled={ (updatePwState === 2|| updatePwState===1)? true:false } className="input is-large" type="password" placeholder="******" value={newPw} onChange={ (e)=>(setNewPw(e.target.value))  }/>
                                    </p>
                                    </div>
                                </div>
                                </div>

                                <div className="field is-horizontal">
                                <div className="field-label is-normal">
                                    <label className="label">再次確認密碼</label>
                                </div>
                                <div className="field-body">
                                    <div className="field">
                                    <p className="control">
                                        <input id="re-new-password" disabled={ (updatePwState === 2|| updatePwState===1)? true:false } className="input is-large" type="password" value={newTwicePw} placeholder="******" onChange={ (e)=>(setTwiceNewPw(e.target.value)) }/>
                                    </p>
                                    </div>
                                </div>
                                </div>

                                <div className="field is-horizontal">
                                <div className="field-label is-normal">
                                    <label className="label">輸入原密碼</label>
                                </div>
                                <div className="field-body">
                                    <div className="field">
                                    <p className="control">
                                        <input  id="old-password" disabled={ (updatePwState === 2|| updatePwState===1)? true:false } className="input is-large" type="password" value={ oldPw } placeholder="******" onChange={ (e)=>(setOldPw(e.target.value)) }/>
                                    </p>
                                    </div>
                                </div>
                                </div>
                                { updatePwState===2 ? 
                                (
                                    <button className="button is-primary is-outlined is-medium is-fullwidth is-loading"></button>

                                )
                                :
                                (  <button disabled={ (updatePwState === 2|| updatePwState===1)? true:false } className="button is-success is-outlined is-medium is-fullwidth" onClick={updatePassword}>確定</button>)
                                }

                                <p className="subtitle is-3 mt-6">關於</p>

                                <div className="content is-normal">
                                    <img src={logo} width="325px" />
                                    <p className="title is-4">讓生活變得更簡單</p>
                                    <p>看厭了那些社交媒體了嗎？是時候該看看自己的心境了。只用一句話，簡簡單單紀錄下你的心情。</p>
                                    <p className="title is-4">焦慮失眠了嗎？找到情緒與生命的出口</p>
                                    <p>我知道你不愛這個世界，甚至不愛自己，但我們都知道生活仍舊會繼續下去，即便自己如此的分裂與殘破，仍舊必須要替自己找到一個情緒的出口，於是生活很忙碌，用一句話了結自己的今天，不再糾結。</p>
                                    <p className="title is-4">你終究不愛這世界，也無仿</p>
                                    <p>對生活與世界充滿失望，甚至覺得自己已經失控？但在這個作品當中，我只想告訴你「即便你終究不愛這個世界，但這個世界仍會有某個地方容下你」。</p>
                                </div>

                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
export default AccountSettingComponent;