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
                Made with <span className='has-text-danger'>❤</span> by <a href="https://studio-44s.tw">studio-44s</a>
            </div>
        </div>
    </footer>
    )
}
export default FooterComponent;