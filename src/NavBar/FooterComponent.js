import React, { useEffect, useRef } from 'react';

const FooterComponent = (props)=>{
    const firstRender = useRef(true);
    useEffect(
        ()=>{
            if (firstRender.current === true){
                firstRender.current = false;
            }
        }
    )
    return(
    <footer className="footer">
        <div className="container is-fluid">
            <div className="content has-text-centered">
                Made with <span className='has-text-danger'>❤</span> by <a href="https://n-d.tw">筆記設計</a>
            </div>
        </div>
    </footer>
    )
}
export default FooterComponent;