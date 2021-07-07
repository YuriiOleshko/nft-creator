import React, {useContext, useState} from 'react';
import SearchLine from "../../../../components/SearchLine/SearchLine";
import {getContractWithSigner} from "../../../../utils/ethers";
import {Table, Spinner} from "react-bootstrap";
import {appStore} from "../../../../state/app";


const SearchByAddress = () => {
    const [value, setValue] = useState('');
    const [addr, setAddr] = useState('');
    const [listTokens, setListTokens] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(false);
    const {state} = useContext(appStore);
    const {app} = state;
    const {publicKey,privateKey} = app;
    const searchByAddr = async () => {
        const contract = getContractWithSigner(publicKey, privateKey);
        setLoading(true);
        setError(false);
        try {
            const balance = await contract.balanceOf(value);
            setAddr(value);
            const list = [];
            if (balance.toNumber() > 0) {
                for (let count = 0; count <= ((+balance.toNumber()) - 1); count++) {
                    let nft = await contract.tokenOfOwnerByIndex(value, count);
                    list.push((+nft.toNumber()));
                }
                setListTokens(list)
            } else setError(true);
        } catch (e) {
            setListTokens([]);
            setError(true);
            console.log('error', e);
        }
        setLoading(false);
    }
    return (
        <div className="main__element-panel read">
            <SearchLine value={value} change={setValue} handleSubmit={searchByAddr} labelInput='Search by address'
                        labelBtn='Get'/>
            <div className="main__body-element">
                {loading && <Spinner animation="border" variant="primary"/>
                }
                {!loading && listTokens.length > 0 &&
                <Table className='main__table' striped bordered hover responsive>
                    <thead>
                    <tr>
                        <th>#</th>
                        <th>Owner</th>
                        <th>TokenId</th>
                    </tr>
                    </thead>
                    <tbody>
                    {listTokens.map((el, index) =>
                        <tr key={index + 'e' + index}>
                            <td>{index + 1}</td>
                            <td>{addr}</td>
                            <td>{el}</td>

                        </tr>
                    )}
                    </tbody>
                </Table>}
                {error && <div className="main__element-error read-type">
                    <span>Not Found</span>
                </div>}
            </div>
        </div>
    );
};

export default SearchByAddress;
