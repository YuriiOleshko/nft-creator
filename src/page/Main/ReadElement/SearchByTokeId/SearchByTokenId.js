import React, {useContext, useState} from 'react';
import SearchLine from "../../../../components/SearchLine/SearchLine";
import {Spinner, Table} from "react-bootstrap";
import {checkIsContract, checkTypeId, getContractWithSigner} from "../../../../utils/ethers";
import {appStore} from "../../../../state/app";

const SearchByTokenId = () => {
    const [value, setValue] = useState('')
    const [loading, setLoading] = useState(false)
    const [answer, setAnswer] = useState({type: false, sentences: ''});
    const [info, setInfo] = useState('');
    const {state: {app}} = useContext(appStore);
    const {publicKey,privateKey}= app;
    //this func need to use for find token by id
    const searchById = async () => {
        setAnswer({...answer, type: false});
        setLoading(true);
        // if (!checkIsContract(publicKey)) {
        //     setAnswer({type: true, sentences: "contract isn’t a valid NFT contract"});
        //     return;
        // };
        const contract = getContractWithSigner(publicKey, privateKey);
        // console.log(await  contract.getApproved(value.trim()),'appprr')
        console.log( contract,'appprr');
        // console.log( await contract.burnToken(value.trim()),'appprr')
        const id = await checkTypeId(value.trim(), contract);
        if (!id) {
            setAnswer({type: true, sentences: `NFT with ID ${value} doesn’t exist on this chain.`});
            setLoading(false);
            return;
        };
        try {
            const meta = await contract.tokenURI(id);
            const name = await contract.name();
            const owner = await contract.ownerOf(id);
            setInfo({meta: meta, name: name, owner: owner});
        } catch (e) {
            setAnswer({type: true, sentences: `NFT with ID ${value} doesn’t exist on this chain.`});
        }
        setLoading(false);
    }

    return (
        <div className="main__element-panel">
            <SearchLine value={value} change={setValue} handleSubmit={searchById} labelInput='Search by TokenId'
                        labelBtn='Get' novalid={true}/>
            <div className="main__body-element">
                {loading && <Spinner animation="border" variant="primary"/>
                }
                {!loading && !!info && !answer.type &&
                <Table className='main__table' striped bordered hover>
                    <thead>
                    <tr>
                        <th>Name</th>
                        <th>Metadata</th>
                        <th>Owner</th>
                    </tr>
                    </thead>
                    <tbody>
                    <tr>
                        <td>{info.name}</td>
                        <td>{info.meta}</td>
                        <td>{info.owner}</td>
                    </tr>
                    </tbody>
                </Table>}
                {answer.type && <div className="main__element-error read-type">
                    <span>{answer.sentences}</span>
                </div>}
            </div>

        </div>
    );
};

export default SearchByTokenId;
