import React from 'react';
import * as htmlToImage from 'html-to-image';
import { toPng, toJpeg, toBlob, toPixelData, toSvg } from 'html-to-image';
import '../bulma.css';
import './memo.css';

const MemoListComponent = (props)=>{

    const shareMemo = (e) =>{
        const memoHash = e.currentTarget.value;
        const memoElement = document.getElementById('shareContainer').appendChild(document.getElementById(memoHash).cloneNode(true));
        memoElement.append("一句話日記 - 從此愛上簡單生活", document.createElement('br'),"https://lab.notes-hz.com/apps/one-sen-day")
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

    return(

        <div>
            <div className="card">
                <div className="header">
                    <div className="media">
                        <div className="media-content">
                            <p className="title is-4"><time dateTime={props.memoDate}>{props.memoDate}</time></p>
                            <p className="subtitle is-6">你覺得此時此刻......</p>
                        </div>
                    </div>
                </div>
            
                <div className="card-content">
                    <section className={"hero " + props.memoColor}  id={ props.memoHash }>
                        <div className="hero-body">
                            <p className="title">
                            {props.memoContent}
                            </p>
                        </div>
                    </section>
                </div>

                <footer className="card-footer">
                    <a className="card-footer-item">
                    <button value={props.memoHash} className="button is-link is-outlined" onClick={shareMemo}>
                            <span className="icon is-small">
                                <i className="material-icons">file_download</i>
                                </span>
                            </button>
                    </a>
                    <a className="card-footer-item"></a>
                    <a className="card-footer-item">                            
                        <button value={props.memoHash} className="button is-danger is-outlined" onClick={props.doDelMemo}>
                            <span className="icon is-small">
                                <i className="material-icons">delete_forever</i>
                                </span>
                        </button>
                    </a>
                </footer>
            </div>
        </div>
    )
}
export default MemoListComponent;