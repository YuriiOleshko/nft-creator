import React, {useContext, useState} from 'react';
import SearchLine from "../../../../components/SearchLine/SearchLine";
import {arrRoles, checkAccessRights, checkHasRole, checkRoleAdmin, setRole,} from "../../../../utils/ethers";
import {Spinner} from "react-bootstrap";
import {appStore} from "../../../../state/app";

const SetRole = () => {
    const [value, setValue] = useState('');
    const [selectRoles, setSelectRoles] = useState(arrRoles[0].role);
    const [answer, setAnswer] = useState({type: false, sentences: ''});
    const [loading, setLoading] = useState(false);
    const {state: {app}} = useContext(appStore);
    const setRoleByAddress = async () => {
        setAnswer({...answer, type: false});
        setLoading(true)
        console.log('set',await checkAccessRights(app.privateKey,arrRoles[1].role))
        if(await checkHasRole(selectRoles,value)){
            setAnswer({type: true, sentences: `This address already has this role`});
        } else if(await checkAccessRights(app.privateKey,arrRoles[1].role)){
            setAnswer({type: true, sentences: `You don't have access. Only Default admin can give `});
            setValue('');
        }else if(await setRole(selectRoles, value)){
            setAnswer({type: true, sentences: `Set role: ${selectRoles} to ${value}.`});
            setValue('');
    }
    else{
            setAnswer({type: true, sentences: `You don't have access.`});
        }
        ;
        setLoading(false)

    }


    return (
        <div className="main__element-panel set-role">
            <SearchLine value={value} change={(ev) => {
                setAnswer({...answer, type: false});
                setValue(ev);
            }} handleSubmit={setRoleByAddress} labelInput='Set Role by address' labelBtn='Change'/>
                <select className="main__select" onChange={(ev) => setSelectRoles(ev.target.value)} value={selectRoles}
                aria-label="Default select example">
                {arrRoles.map(el => <option key={el.name} value={el.role}>{el.name}</option>)}
                </select>
            {loading && <div className="main__wrap-spinner"><Spinner animation="border" variant="primary"/>
            </div>}
            {answer.type && <div className="main__element-error">
                <span>{answer.sentences}</span>
            </div>}
        </div>
    );
};

export default SetRole;
