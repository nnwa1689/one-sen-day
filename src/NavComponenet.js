import React from 'react';
import firebase from 'firebase/app';
import 'firebase/auth';
import './Memo/memo.css';
import './bulma.css';
import logo from './osdIcon.svg';
import DarkMode from './DarkMode/DarkMode';

const NavComponent = (props)=>{

    const logout = ()=>{
        firebase.auth().signOut()
        .then(()=> {
            window.location.href = '#/login';
        }).catch((error)=>{
        });
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

                    <a className="navbar-item">
                        <DarkMode/>
                    </a>
                </div>  
            </nav>
        </div>
    )
}
export default NavComponent;