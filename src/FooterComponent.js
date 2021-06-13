import React from 'react';

const footerComponent = (props)=>{
    return(
    <footer className="footer">
        <div className="container is-fluid">
            <div className="content has-text-centered">
                <p>
                    Bulma + React <br></br>
                    ©2021 - 
                    <a href="https://www.notes-hz.com/">筆記長也NotesHazuya</a>｜
                    <a href="https://lab.notes-hz.com/">長也實驗室HazuyaLab</a>
                </p>
            </div>
        </div>
    </footer>
    )
}

export default footerComponent;