import React from 'react';
import { Link, useHistory } from 'react-router-dom';
import firebase from 'firebase/app';
import 'firebase/auth';
import '../Memo/memo.css';
import '../bulma.css';
import logo from '../osdIcon.svg';
import DarkMode from './DarkMode';

const NavComponent = (props)=>{
    const history = useHistory();
    const logout = ()=>{
        firebase.auth().signOut()
        .then(()=> {
            history.push('/login');
        }).catch((error)=>{
        });
    }
    return(
            <nav className="navbar is-fixed-bottom">
                <link href="https://fonts.googleapis.com/icon?family=Material+Icons" rel="stylesheet"></link>
                <div className="container is-max-desktop pl-3 pr-3">
                    <div className="card is-navbar">
                        <div className="navbar-menu is-mobile is-justify-content-center">
                            <Link to="/" className="navbar-item"><p><img src={logo}/></p></Link>
                            <Link to="accountsetting" className="ml-3 mr-3 navbar-item"><i className="material-icons">person_outline</i></Link>
                            <a onClick={logout} className="navbar-item"><i className="material-icons">logout</i></a>
                            {/*<a className="navbar-item"><DarkMode/></a>*/}
                        </div> 
                    </div>
                </div>
            </nav>
    )
}
export default NavComponent;