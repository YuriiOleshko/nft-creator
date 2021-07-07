import React, {useState} from 'react';
import SearchLine from "../../../../components/SearchLine";
import {Spinner, Table} from "react-bootstrap";
import {getAllRoles, } from "../../../../utils/ethers";

const GetRole = () => {
    const [value, setValue] = useState('');
    const [roles, setRoles] = useState([]);
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState(false)
    const searchById = async () => {
        setLoading(true);
        try {
            const roles = await getAllRoles(value);
            if (roles.length > 0) {
                setRoles(roles)
                setLoading(false);
            } else {
                setLoading(false);
                setError(true)
            }
        } catch (e) {
            setLoading(false);
            setError(true);
        }
        ;
    };

    return (
        <div className="main__element-panel read">
            <SearchLine value={value} change={(ev) => {
                setError(false)
                setValue(ev)
            }} handleSubmit={searchById} labelInput='Get Role by address' labelBtn='Get '/>
            <div className="main__body-element">
                {loading && <Spinner animation="border" variant="primary"/>
                }
                {error && <div className="main__element-error read-type">
                    <span>Not Roles</span>
                </div>}
                {!loading && roles.length > 0 &&
                <Table className='main__table' striped bordered hover>
                    <thead>
                    <tr>
                        <th>Role</th>

                    </tr>
                    </thead>
                    <tbody>
                    {roles.map(el => <tr key={el}>
                        <td>{el}</td>
                    </tr>)}

                    </tbody>
                </Table>}

            </div>

        </div>
    );
};

export default GetRole;
