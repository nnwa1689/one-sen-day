import React, { useState } from 'react';
import './bulma.css';
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

                <div className="card-footer">
                    <div className="level is-mobile">
                        <div className="level-rigth">
                            <div className="level-item has-text-centered">
                                <button value={props.memoHash} className="button" onClick={props.doDelMemo}>
                                    <span className="icon is-small">
                                        <i className="material-icons">delete_forever</i>
                                    </span>
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )

}

export default MemoListComponent;