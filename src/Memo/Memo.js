import React,{ useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import MemoComponenet from './MemoComponenet';
import NavComponent from '../NavBar/NavComponenet';
import firebase from 'firebase/app';
import 'firebase/auth';
import FooterComponent from '../NavBar/FooterComponent';

const Memo = (props)=>{
    const history = useHistory();
    useEffect(
        ()=>{
            firebase.auth().onAuthStateChanged((user)=>{
                if(!user) {
                    history.push('/login');
                }
              });
        }
    )
    return(
        <>
            <NavComponent></NavComponent>
            <MemoComponenet></MemoComponenet>
            <FooterComponent></FooterComponent>
        </>
    )
}
export default Memo;