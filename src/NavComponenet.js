import React, { useState, useEffect, memo } from 'react';
import firebase from 'firebase';
import { useCookies } from 'react-cookie';
import './memo.css';
import './bulma.css';
import logo from './one-sentence-daily.svg';

const NavComponent = (props)=>{

    const [cookies, setCookie, removeCookie] = useCookies();


    const logout = ()=>{

        removeCookie('user', { path: '/'});
        removeCookie('userToken', { path: '/'});
        //sessionStorage.removeItem('User');
        window.location.href = '#/login';

    }
    return(
        
        <div>

            <link href="https://fonts.googleapis.com/icon?family=Material+Icons" rel="stylesheet"></link>
            <nav className="navbar is-fixed-top is-white">
                <div className="navbar-brand">
                    <a href="#/" className="navbar-item">
                        <p><img src={logo}/></p>
                    </a>
                    <a href="#/accountsetting" className="navbar-item">
                        <i className="material-icons">person_outline</i>
                    </a>
                    
                    <a onClick={logout} className="navbar-item">
                        <i className="material-icons">logout</i>
                    </a>
                </div>

                
            </nav>
                {props.children}
        </div>
        
    )

}

export default NavComponent;