import React, {useContext, useState} from 'react';
import {arrRoles, checkAccessRights, checkHasRole, checkRoleAdmin, deleteRole} from "../../../../utils/ethers";
import SearchLine from "../../../../components/SearchLine/SearchLine";
import {Spinner} from "react-bootstrap";
import {appStore} from "../../../../state/app";

const DeleteRole = () => {
    const [value, setValue] = useState('');
    const [selectRoles, setSelectRoles] = useState(arrRoles[0].role);
    const [answer, setAnswer] = useState({type: false, sentences: ''});
    const [loading, setLoading] = useState(false)
    const {state: {app}} = useContext(appStore);
    const { privateKey }= app ;
    const deleteRoleByAddress = async () => {
        setAnswer({...answer, type: false});
        setLoading(true);

        if (!(await checkHasRole(selectRoles, value))) {
            setAnswer({type: true, sentences: `This address not have such a role`});
        } else if (await checkAccessRights(privateKey, arrRoles[1].role)) {
            setAnswer({type: true, sentences: `You don't have access.`});
            setValue('');
        } else if (await deleteRole(selectRoles, value)) {
            setAnswer({type: true, sentences: `Deleted role: ${selectRoles} from ${value}.`});
            setValue('');
        } else {
            setAnswer({type: true, sentences: `You don't have access.`});
        }
        setLoading(false);
    };


    return (
        <div className="main__element-panel set-role">
            <SearchLine value={value} change={(ev) => {
                setAnswer({...answer, type: false});
                setValue(ev);
            }} handleSubmit={deleteRoleByAddress} labelInput='Revoke Role by address' labelBtn='Change '/>
            <select className="main__select" onChange={(ev) => setSelectRoles(ev.target.value)} value={selectRoles}
                    aria-label="Default select example">
                {arrRoles.map(el => <option key={el.name} value={el.role}>{el.name}</option>)}
            </select>
            {loading && <div className="main__wrap-spinner"><Spinner animation="border" variant="primary"/></div>}
            {answer.type && <div className="main__element-error">
                <span>{answer.sentences}</span>
            </div>}
        </div>
    );

};

export default DeleteRole;
