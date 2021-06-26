import React,{ useEffect, useRef } from 'react';
import { useHistory } from 'react-router-dom';
import MemoComponenet from './MemoComponenet';
import NavComponent from '../NavBar/NavComponenet';
import firebase from 'firebase/app';
import 'firebase/auth';
import FooterComponent from '../NavBar/FooterComponent';

const Memo = (props)=>{
    return(
        <>
            <NavComponent></NavComponent>
            <MemoComponenet></MemoComponenet>
            <FooterComponent></FooterComponent>
        </>
    )
}
export default Memo;