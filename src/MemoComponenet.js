import React, { useState, useEffect, useRef } from 'react';
import MemoListComponent from './MemoListComponent';
import firebase from 'firebase';
import { useCookies } from 'react-cookie';
import './memo.css';
import './bulma.css';


const MemoComponenet = (props)=>{

    const [memoItems, setMemoItems] = useState(null);
    const renderCount = useRef(false);
    const [textDisabled, setTextDisabled] = useState(false);
    const [memoText, setMemoText] = useState("");
    const [cookies, setCookie, removeCookie] = useCookies();
    const [addMemoState, setAddMemoState] = useState(0);
    // 0:init 1:suc 2: loading 3:error
    const [delMemoState, setDelMemoState] = useState(-1);
    // 0:willDel 1:suc 2:delLoading 3: error
    const [willDelMemoHash, setWillDelMemoHash] = useState(0);

    const getDate = ()=>{

        let newDate = new Date();
        let date = newDate.getDate();
        let month = ( ((newDate.getMonth() + 1).toString().length===1) ?  '0' + (newDate.getMonth() + 1).toString() : (newDate.getMonth() + 1));
        let year = newDate.getFullYear();
        let hour = ( newDate.getHours().toString().length===1 ? ('0' + newDate.getHours().toString()) : (newDate.getHours()) );
        let min = ( newDate.getMinutes().toString().length===1 ? ('0' + newDate.getMinutes().toString()) : (newDate.getMinutes()) )
        let sec = ( newDate.getSeconds().toString().length===1 ? ('0' + newDate.getSeconds().toString()) : (newDate.getSeconds()) )
        let day = ( newDate.getDay().toString().length===1 ? ('0' + newDate.getDay().toString()) : (newDate.getDay()) )
        return year + '-' + month + '-' + day + ' ' + hour + ':' + min + ':' + sec ;

    }

    const setColorWhite =()=>{ addMemo(""); }
    const setColorYellow =()=>{ addMemo("is-warning"); }
    const setColorBlue =  ()=>{ addMemo("is-link"); }
    const setColorGreen = ()=>{ addMemo("is-success"); }
    const setColorRed = ()=>{  addMemo("is-danger"); }


    const addMemo = (memoColor)=>{

        if(memoText===""){
            alert('你沒有輸入任何東西');
        }else{
            setAddMemoState(2);
            firebase.database().ref('/oneSenDay/' + cookies.user).push({
                content:memoText,
                date: getDate(),
                dateMark:Date.now(),
                color: memoColor
            }).then(() => {
                setAddMemoState(1);
                setMemoText("");
            });
        }
    }


    const getMemo = ()=>{
        let targData = "";
        firebase.database().ref('/oneSenDay/' + cookies.user).orderByChild('dateMark').once("value", e => {
            targData = e.val();
          }).then(
              ()=>{

                if(targData===null){
                    setMemoItems("")
                }else{
                    setMemoItems(targData);
                }
                
              }
          );
    }

    const willDelMemo = (e)=>{

        console.log(e.target.value);
        setWillDelMemoHash(e.target.value);
        setDelMemoState(0);

    }

    const delMemo = ()=>{
        setDelMemoState(2);
        console.log(willDelMemoHash);
        firebase.database().ref('/oneSenDay/' + cookies.user + "/" + willDelMemoHash).set(null).then(
              ()=>{
                  console.log('deleded');
                setDelMemoState(1);
                setWillDelMemoHash(0);
                
              }
          );
    }

    useEffect(
        ()=>{
            if(renderCount.current === false){
                getMemo();
                renderCount.current= true;
            }
        },[]
    )

    useEffect(
        ()=>{
            if(addMemoState === 1 || delMemoState===1){
                getMemo();
            }
        },[addMemoState, delMemoState]
    )


    if(memoItems==null){

        return(
            <div>
                <br/><br/><br/><br/>
                <progress className="progress is-small is-primary" max="100"></progress>
            </div>            
        )
    }else if(memoItems===""){

        return(
            <div className="columns body-columns">
                <div className="column is-half is-offset-one-quarter">
                    <section className="hero is-primary">
                        <div className="hero-body">
                        <p className="title">"用簡單一句話描述心情"</p>
                        <div className="container">
                                    <div className="content">
                                    <div className="control">
                                        <div className="field">
                                            <div className="control">
                                                <textarea rows="1" className="textarea is-medium has-fixed-size" placeholder="我覺得......" onChange={(e)=>(setMemoText(e.target.value))}></textarea>
                                            </div>
                                            </div>
                                    </div>

                            </div>
                            <p>你的心情比較像是什麼顏色？</p>
                            <br></br>
                                <div className="center">
                                
                                    <button className="button is-rounded" onClick={setColorWhite}>白</button>
                                    <button className="button is-warning is-rounded" onClick={setColorYellow}>黃</button>
                                    <button className="button is-link is-rounded" onClick={setColorBlue}>藍</button>
                                    <button className="button is-success is-rounded" onClick={setColorGreen}>綠</button>
                                    <button className="button is-danger is-rounded" onClick={setColorRed}>紅</button>
                                </div>
                        </div>
                        </div>
                    </section>
                    <section class="hero is-success is-halfheight">
                        <div class="hero-body">
                            <div class="">
                            <p class="title">
                                嗨
                            </p>
                            <p class="subtitle">
                                快發表你的第一篇一句話日記吧！
                            </p>
                            </div>
                        </div>
                    </section>
                    {props.children}
                </div>
            </div>

        )

    }else{

        return(

            <div>
                {

                    (delMemoState===0) ? 
                    (
                    <div className="msgBox">
                        <div className="modal-card">
                            <header className="modal-card-head has-background-danger">
                                <p className="modal-card-title has-text-white">警告！</p>
                            </header>
                            <section className="modal-card-body">你確定要刪除這一篇日記嗎？</section>
                            <footer className="modal-card-foot">
                                <button className="button is-danger" onClick={delMemo}>刪除吧！</button>
                                <button className="button" onClick={()=>{setDelMemoState(-1); setWillDelMemoHash(null);}}>我在想想......</button>
                            </footer>
                        </div>
                    </div>
                )
                    :
                    ("")

                }

                


                <div className="columns body-columns">
                    <div className="column is-half is-offset-one-quarter">
                        <section className="hero is-primary">
                            <div className="hero-body">
                            <p className="title">"用簡單一句話描述心情"</p>
                            <div className="container">
                                        <div className="content">
                                        <div className="control">
                                            <div className="field">
                                                <div className="control">
                                                    <textarea rows="1" className="textarea is-medium has-fixed-size" value={memoText} placeholder="我覺得......" onChange={(e)=>(setMemoText(e.target.value))}></textarea>
                                                </div>
                                                </div>
                                        </div>

                                </div>
                                <p>你的心情比較像是什麼顏色？</p>
                                    <div className="center">
                                    
                                        <button className="button is-rounded" onClick={setColorWhite}>白</button>
                                        <button className="button is-warning is-rounded" onClick={setColorYellow}>黃</button>
                                        <button className="button is-link is-rounded" onClick={setColorBlue}>藍</button>
                                        <button className="button is-success is-rounded" onClick={setColorGreen}>綠</button>
                                        <button className="button is-danger is-rounded" onClick={setColorRed}>紅</button>
                                    </div>
                            </div>
                            </div>
                        </section>

                        
                        {
                            (
                                Object.entries(memoItems).reverse().map( (memoItem, key, )=>(
                                    <MemoListComponent 
                                    key={memoItem[0]}
                                    memoHash={memoItem[0]}
                                    memoContent={memoItem[1].content}
                                    memoDate={memoItem[1].date}
                                    memoColor={memoItem[1].color}
                                    doDelMemo={willDelMemo}
                                    >    
                                    </MemoListComponent>

                                    ))
                            )
                        }
                    </div>
                </div>
                {props.children}
            </div>

        )

    }

}

export default MemoComponenet;