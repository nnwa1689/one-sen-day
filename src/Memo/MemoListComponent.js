import React from 'react';
import '../bulma.css';
import './memo.css';

const MemoListComponent = (props)=>{


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
                    <section className={"hero " + props.memoColor} >
                        <div className="hero-body">
                            <p className="title">
                            {props.memoContent}
                            </p>
                        </div>
                    </section>
                </div>

                <footer class="card-footer">
                    <a class="card-footer-item"></a>
                    <a class="card-footer-item"></a>
                    <a class="card-footer-item">                            
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