import React, { useEffect } from 'react';

const FooterComponent = (props)=>{
    useEffect(
        ()=>{
            (window.adsbygoogle = window.adsbygoogle || []).push({});
        }
    )
    return(
    <footer className="footer">
        <div className="container is-fluid">
            <div className="content has-text-centered">
                <p>©2021<br/>
                    <a href="https://lab.notes-hz.com/">
                        <span style={ {fontSize: "24px", color: "#028ff3", fontWeight: "bold"} }>Lab</span>
                        <span style={ {fontSize: "24px", color: "#FD3E49", fontWeight: "bold"} }>H</span>
                        <span style={ {fontSize: "24px", color: "#FF8738", fontWeight: "bold"} }>a</span>
                        <span style={ {fontSize: "24px", color: "#FFA900", fontWeight: "bold"} }>z</span>
                        <span style={ {fontSize: "24px", color: "#00A752", fontWeight: "bold"} }>u</span>
                        <span style={ {fontSize: "24px", color: "#007BEE", fontWeight: "bold"} }>y</span>
                        <span style={ {fontSize: "24px", color: "#9B49DF", fontWeight: "bold"} }>a</span>
                    </a><br/>
                    <a href="https://www.notes-hz.com/">筆記長也NotesHazuya</a>
                </p>
                {/*Google Ads*/}
                <ins className="adsbygoogle"
                style={ {display: "block"}}
                data-ad-format="fluid"
                data-ad-layout-key="-gw-3+1f-3d+2z"
                data-ad-client="ca-pub-3826338280068687"
                data-ad-slot="2053696274"/>
                </div>
        </div>
    </footer>
    )
}
export default FooterComponent;