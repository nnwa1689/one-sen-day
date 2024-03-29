import React, { useEffect } from 'react';
import * as htmlToImage from 'html-to-image';
import { toPng, toJpeg, toBlob, toPixelData, toSvg } from 'html-to-image';
import '../bulma.css';
import './memo.css';

const MemoListComponent = (props)=>{

    const shareMemo = (e) =>{
        const memoHash = e.currentTarget.value;
        const memoElement = document.getElementById('shareContainer').appendChild(document.getElementById(memoHash).cloneNode(true));
        memoElement.append("一句話日記 - 從此愛上簡單生活", document.createElement('br'),"https://dev.n-d.tw/apps/one-sen-day")
        htmlToImage.toJpeg(memoElement, { quality: 0.95 })
        .then(function (dataUrl) {
            var link = document.createElement('a');
            link.download = memoHash + '.jpg';
            link.href = dataUrl;
            //remove all child
            while(memoElement.firstChild){
                memoElement.removeChild(memoElement.firstChild);
            }
            link.click();
        });
    }

    useEffect(
        ()=>{
            if (props.ads){
                //init googleAds
            }

        }
    )

    return(
        <div>
            <div className="card">
                <div className="header">
                    <div className="columns">
                        <div className="column is-8">
                            <p className="title is-5">
                                <i className="material-icons">schedule</i>
                                <time dateTime={props.memoDate}>{props.memoDate}</time>
                            </p>
                        </div>
                        <div className="column">
                            <p className="subtitle is-6">  
                            { (props.weather !== undefined) ? 
                                <> 
                                    <img src={ "https://openweathermap.org/img/wn/" +  props.weatherIcon + "@2x.png" } width="28" height="28" />
                                    { props.temp } °C，{ props.weather} 
                                </>
                                :""
                            }</p>
                        </div>
                    </div>
                </div>
            
                <div className="card-content">
                    <section className={"hero " + props.memoColor}  id={ props.memoHash }>
                        <div className="hero-body">
                        {props.memoContent.length > 20 ?
                            <p className='is-size-5'>{props.memoContent}</p> 
                            :
                            <p className='is-size-3'>{props.memoContent}</p>  
                        }
                        </div>
                    </section>
                </div>
                <footer className="card-footer">
                    <a className="card-footer-item">
                        <button value={props.memoHash} className="button is-link is-outlined is-fullwidth" onClick={shareMemo}>
                            <span className="icon is-small">
                                <i className="material-icons">file_download</i>
                            </span>
                        </button>
                    </a>
                    <a className="card-footer-item"></a>
                    <a className="card-footer-item">                            
                        <button value={props.memoHash} className="button is-danger is-outlined is-fullwidth" onClick={props.doDelMemo}>
                            <span className="icon is-small">
                                <i className="material-icons">delete_forever</i>
                                </span>
                        </button>
                    </a>
                </footer>
            </div>
            { props.ads ?
            ""
            :""}
        </div>
    )
}
export default MemoListComponent;