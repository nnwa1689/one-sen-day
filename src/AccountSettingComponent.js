import React,{ useState, useEffect, useRef } from 'react';
import firebase from 'firebase';
import './bulma.css';
import './login.css';
import './register.css';
import logo from './one-sentence-daily.svg';

const AccountSettingComponent = (props)=>{

    const [oldPw, setOldPw] = useState("");
    const [newPw, setNewPw] = useState("");
    const [newTwicePw, setTwiceNewPw] = useState("");
    const [updatePwState, setUpdatePwState] = useState(0);
    const [userMail, setUserMail] =useState("");
    //0:init 1:suc 2:updateing 3:oldPwErr 4:TwicePwErr 5:Nullerr 6:minMustBeLargeSixErr

    const updatePassword = ()=>{
        
        setUpdatePwState(2);
        //驗證二次密碼
        if(newPw ==="" || newTwicePw==="" || oldPw===""){
            setUpdatePwState(5);
            return;
        }else if( newPw!==newTwicePw ){
            setUpdatePwState(4);
            return;
        }

        firebase.auth().onAuthStateChanged((user)=>{
            if(user) {
              // 驗證舊密碼
              var credential = firebase.auth.EmailAuthProvider.credential(user.email, oldPw);
              user.reauthenticateWithCredential(credential).then(()=> {
                user.updatePassword(newPw).then(()=>{
                    // 修改密碼完成
                    setUpdatePwState(1);
                    logout();
                  }).catch((error)=> {
                    if(error.code==="auth/weak-password"){
                        setUpdatePwState(6);
                    }else{
                        setUpdatePwState(3);
                    }
                  });
              }).catch((error)=>{
                  setUpdatePwState(3);

              });
            } else {
                window.location.href = '#/login';
            }
          });
    }

    const logout = ()=>{
        firebase.auth().signOut()
        .then(()=> {
            window.location.href = '#/login';
        }).catch((error)=>{
            //
        });
    }

    useEffect(
        ()=>{
            firebase.auth().onAuthStateChanged(function(user) {
                if(user) {
                    setUserMail(user.email);
                }
              });
        }
    )

    return(

        <div className="columns body-columns">
            <div className="column is-half is-offset-one-quarter">
                <div className="card">
                <div className="header">
                    <div className="media">
                        <div className="media-content">
                            <p>您好，{ userMail }，今天感覺還好嗎？</p>
                            <br></br>
                            <p className="subtitle is-4">帳號密碼設定</p>

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

                            <div class="field is-horizontal">
                            <div class="field-label is-normal">
                                <label class="label">新密碼</label>
                            </div>
                            <div class="field-body">
                                <div class="field">
                                <p class="control">
                                    <input id="new-password" disabled={ (updatePwState === 2|| updatePwState===1)? true:false } class="input" type="password" placeholder="******" value={newPw} onChange={ (e)=>(setNewPw(e.target.value))  }/>
                                </p>
                                </div>
                            </div>
                            </div>

                            <div class="field is-horizontal">
                            <div class="field-label is-normal">
                                <label class="label">再次確認密碼</label>
                            </div>
                            <div class="field-body">
                                <div class="field">
                                <p class="control">
                                    <input id="re-new-password" disabled={ (updatePwState === 2|| updatePwState===1)? true:false } class="input" type="password" value={newTwicePw} placeholder="******" onChange={ (e)=>(setTwiceNewPw(e.target.value)) }/>
                                </p>
                                </div>
                            </div>
                            </div>

                            <div class="field is-horizontal">
                            <div class="field-label is-normal">
                                <label class="label">輸入原密碼</label>
                            </div>
                            <div class="field-body">
                                <div class="field">
                                <p class="control">
                                    <input  id="old-password" disabled={ (updatePwState === 2|| updatePwState===1)? true:false } class="input" type="password" value={ oldPw } placeholder="******" onChange={ (e)=>(setOldPw(e.target.value)) }/>
                                </p>
                                </div>
                            </div>
                            </div>
                            { updatePwState===2 ? 
                            (
                                <button class="button is-primary is-outlined is-medium is-fullwidth is-loading"></button>

                            )
                            :
                            (  <button disabled={ (updatePwState === 2|| updatePwState===1)? true:false } class="button is-primary is-outlined is-medium is-fullwidth" onClick={updatePassword}>確定</button>)
                            }

                            <hr/>
                            <p className="subtitle is-4">關於</p>

                            <div class="content is-normal">
                            <img src={logo} width="325px" />
                                <h4>讓生活變得更簡單</h4>
                                <p>看厭了那些社交媒體了嗎？是時候該看看自己的心境了。</p>
                                <h4>只要用一句話</h4>
                                <p>就簡簡單單紀錄下你的心情.</p>
                                <img src="https://www.notes-hz.com/uploadfile/fb51d1e6b98f4f88f8cf591927f94ecc.png" width="325px"/>
                                <p>本專案是由 筆記長也NotesHazuya https://www.notes-hz.com/ 用 React / bulma 建立。</p>
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