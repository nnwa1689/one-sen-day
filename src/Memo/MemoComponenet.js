import React, { useState, useEffect, useRef, memo} from 'react';
import MemoListComponent from './MemoListComponent';
import InfiniteScroll from 'react-infinite-scroller';
import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/database';
import './memo.css';
import '../bulma.css';

const MemoComponenet = (props)=>{
    const hasData = useRef(true);
    const renderCount = useRef(false);
    const loacinfo = useRef();
    const willDelMemoHash = useRef(0);
    const userUid = useRef("");
    const [pageEnd, setPageEnd] = useState(0);
    const [memoItems, setMemoItems] = useState(null);
    const [textDisabled, setTextDisabled] = useState(false);
    const [memoText, setMemoText] = useState("");
    const [addMemoState, setAddMemoState] = useState(0);
    // 0:init 1:suc 2: loading 3:error 4:isNone
    const [delMemoState, setDelMemoState] = useState(-1);
    // -1:init, 0:willDel 1:suc 2:delLoading 3: error
    const [weather, setWeather] = useState(0);
    // -1: can't get weather info.  0:init
    const weatherRef = useRef();

    useEffect(
        ()=>{
            //firstloading
            if (renderCount.current === false) {
                //getUser,getPost
                getUserUid().then(
                    ()=>{
                        getMemo();
                    }
                );
                //getGPSLoaction
                navigator.geolocation.getCurrentPosition(
                    (pos)=>{ 
                        loacinfo.current = pos.coords;
                        //getWeather
                        getWeather();
                    },
                    (err)=>{ 
                        console.log('ERROR(' + err.code + '): ' + err.message);
                        setWeather(-1);
                    }, 
                    {
                      enableHighAccuracy: true,
                      timeout: 5000,
                      maximumAge: 0
                    }
                )
                //setFirstRender=true
                renderCount.current= true;
            }

            if (addMemoState === 1 || delMemoState === 1) {
                getMemo();
                setAddMemoState(0);
                setDelMemoState(-1);
            }
        }
    )

    const getUserUid= ()=>{
        return new Promise((resolve, reject)=>{
            firebase.auth().onAuthStateChanged((user)=>{
            if (user) {
                // 使用者已登入，可以取得資料
                //setUserUid(user.uid);
                userUid.current = user.uid;
                resolve(user.uid);
            } else {
                reject("SomeError");
            }
          });
        });
    }

    const getDate = (timestamp)=>{
        let newDate = new Date(timestamp);
        let month = ( ((newDate.getMonth() + 1).toString().length===1) ?  '0' + (newDate.getMonth() + 1).toString() : (newDate.getMonth() + 1));
        let year = newDate.getFullYear();
        let hour = ( newDate.getHours().toString().length===1 ? ('0' + newDate.getHours().toString()) : (newDate.getHours()) );
        let min = ( newDate.getMinutes().toString().length===1 ? ('0' + newDate.getMinutes().toString()) : (newDate.getMinutes()) )
        let sec = ( newDate.getSeconds().toString().length===1 ? ('0' + newDate.getSeconds().toString()) : (newDate.getSeconds()) )
        let day = ( newDate.getDate().toString().length===1 ? ('0' + newDate.getDate().toString()) : (newDate.getDate()) )
        return year + '-' + month + '-' + day + ' ' + hour + ':' + min + ':' + sec ;
    }

    const setColorWhite =()=>{ addMemo(""); }
    const setColorYellow =()=>{ addMemo("is-warning"); }
    const setColorBlue =  ()=>{ addMemo("is-link"); }
    const setColorGreen = ()=>{ addMemo("is-success"); }
    const setColorRed = ()=>{  addMemo("is-danger"); }

    const addMemo = (memoColor)=>{
        if (memoText==="") {
            setAddMemoState(4);
        } else {
            setTextDisabled(true);
            setAddMemoState(2);
            let pushData = {};
            if (( weatherRef.current !== undefined )){
                pushData = {
                    content:memoText,
                    dateMark:firebase.database.ServerValue.TIMESTAMP,
                    color: memoColor,
                    weatherIcon: weatherRef.current.weather[0].icon,
                    temp: parseInt(weatherRef.current.main.temp),
                    weather:weatherRef.current.weather[0].description
                }
            } else {
                pushData = {
                    content:memoText,
                    dateMark:firebase.database.ServerValue.TIMESTAMP,
                    color: memoColor
                }  
            }
            firebase.database().ref('/oneSenDay/' + userUid.current).push(pushData).then(() => {
                setAddMemoState(1);
                setMemoText("");
                setTextDisabled(false);
            });
        }
    }

    //from firebase loading memoData, then save to memoItems(include compoment)
    const getMemo = ()=>{
        let targData, changeArray = "";
        firebase.database().ref('/oneSenDay/' + userUid.current).orderByChild('dateMark').once("value", e => {
            targData = e.val();
          }).then(
              ()=>{
                if (targData===null) {
                    setMemoItems("");
                } else {
                    //push to Array
                    changeArray = Array();
                    Object.entries(targData).reverse().map( (memoItem, key )=>{
                        changeArray.push(
                            <MemoListComponent 
                            key={memoItem[0]}
                            memoHash={memoItem[0]}
                            memoContent={memoItem[1].content}
                            memoDate={getDate(memoItem[1].dateMark)}
                            memoColor={memoItem[1].color}
                            doDelMemo={willDelMemo}
                            weatherIcon={memoItem[1].weatherIcon}
                            temp={memoItem[1].temp}
                            weather={memoItem[1].weather}
                            ads={ ((key+1) % 50 === 0)? true : false }
                            >    
                            </MemoListComponent>
                        );
                        //per 50posts add a GoogleAds
                    });
                    setMemoItems(changeArray);
                }  
              }
          );
    }

    const willDelMemo = (e)=>{
        willDelMemoHash.current = e.currentTarget.value;
        setDelMemoState(0);
    }

    const delMemo = ()=>{
        setDelMemoState(2);
        firebase.database().ref('/oneSenDay/' + userUid.current + "/" + willDelMemoHash.current).set(null).then(
              ()=>{
                setDelMemoState(1);
                willDelMemoHash.current = null; 
              }
          );
    }

    const getWeather = ()=>{
        const reqUrl = "https://api.openweathermap.org/data/2.5/weather?lat=" + loacinfo.current.latitude +"&lon=" + loacinfo.current.longitude +"&APPID=bca993382423bbac227d1ef64fe18407&lang=zh_tw&units=metric"
        fetch(reqUrl)
        .then(res => res.json()) /*把request json化*/
        .then(data => {
            setWeather(data);
            weatherRef.current = data;
        })
        .catch(e => {
            setWeather(-1);
        })
    }

    if (memoItems==null || weather === 0) {
        return(
            <div>
                <br/><br/><br/>
                <progress className="progress is-small is-primary" max="100"></progress>
            </div>            
        )
    } else {
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
                            <section className="modal-card-body">你確定要刪除這一篇日記嗎(´･_･`)？</section>
                            <footer className="modal-card-foot">
                                <button className="button is-danger is-outlined" onClick={delMemo}>刪除吧！</button>
                                <button className="button" onClick={()=>{setDelMemoState(-1); willDelMemoHash.current = null;}}>我在想想......</button>
                            </footer>
                        </div>
                    </div>
                )
                    :("")
                }
                {
                    (addMemoState===4) ? 
                    (
                    <div className="msgBox">
                        <div className="modal-card">
                            <header className="modal-card-head has-background-warning">
                                <p className="modal-card-title has-text-white">歐歐！</p>
                            </header>
                            <section className="modal-card-body">你沒有輸入任何日記內容哦(￣O￣;)</section>
                            <footer className="modal-card-foot">
                                <button className="button is-warning is-light" onClick={ ()=>setAddMemoState(0) }>好！</button>
                            </footer>
                        </div>
                    </div>
                )
                    :("")
                }
                <div className="columns body-columns">
                    <div className="column is-half is-offset-one-quarter">
                        <section className="hero is-primary">
                            <div className="hero-body">
                                <p className="title is-4">"用簡單一句話描述心情"</p>
                                { (weather !== -1) ? 
                                    <p className="subtitle is-6"><img src={ "https://openweathermap.org/img/wn/" +  weather.weather[0].icon + "@2x.png" } width="32" height="32" />
                                        { parseInt(weather.main.temp, 10) }°C，{ weather.weather[0].description }
                                    </p>
                                :
                                <article className="message is-danger">
                                    <div className="message-body">無法取得天氣資訊(~_~;)</div>
                                </article>
                                }
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
                                            <button disabled={ textDisabled } className="button is-rounded" onClick={setColorWhite}>無</button>
                                            <button disabled={ textDisabled } className="button is-warning is-rounded" onClick={setColorYellow}>黃</button>
                                            <button disabled={ textDisabled } className="button is-link is-rounded" onClick={setColorBlue}>藍</button>
                                            <button disabled={ textDisabled } className="button is-success is-rounded" onClick={setColorGreen}>綠</button>
                                            <button disabled={ textDisabled } className="button is-danger is-rounded" onClick={setColorRed}>紅</button>
                                        </div>
                                </div>
                            </div>
                        </section>
                        { (memoItems === "") ? 
                        (
                        <section className="hero is-success is-halfheight">
                            <div className="hero-body">
                                <div className="">
                                <p className="title">
                                    嗨
                                </p>
                                <p className="subtitle">
                                    快發表你的第一篇一句話日記吧！
                                </p>
                                </div>
                            </div>
                        </section>
                        ) 
                        : 
                        (
                            <InfiniteScroll
                                pageStart={0}
                                loadMore={
                                    ()=>{
                                        setPageEnd(pageEnd + 5);
                                        if(pageEnd >= memoItems.length){
                                            hasData.current = false;
                                        }
                                    }
                                }
                                hasMore={hasData.current}
                                loader={
                                <div key="-1">
                                    <progress className="progress is-small is-primary" max="100"></progress>
                                </div> }
                            >
                                {memoItems.slice(0, pageEnd)}
                            </InfiniteScroll>
                        )
                        }
                        <div id="shareContainer"></div>
                    </div>
                </div>
            </div>
        )
    }
}
export default MemoComponenet;