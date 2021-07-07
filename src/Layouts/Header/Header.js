import React, {useContext} from 'react';
import {appStore} from "../../state/app";
import {useHistory} from "react-router";

const Header = () => {
    const { update } = useContext(appStore);
    const history = useHistory();
    const clearKey = () =>{
        localStorage.clear()
        update('publicKey', '');
        update('privateKey', '');
        update('net', '');
        history.push('/login')
    }
    return (
        <div className="header ">
            <div className="header__nav container">
            <div className="header__logo">
                <span>ZIMT NM</span>
            </div>
            <div className="header__log-out" onClick={clearKey}>
                Clear Key
            </div>
            </div>
        </div>
    );
};

export default Header;
