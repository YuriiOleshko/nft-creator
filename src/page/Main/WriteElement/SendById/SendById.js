import React, {useContext, useState} from 'react';
import {appStore} from "../../../../state/app";
import {Button, Form, Spinner} from "react-bootstrap";
import {
    checkAmount, checkApprovedToken,
    checkByTokenID,
    checkOwnToken, checkOwnTokenByAddress, checkSignerConnect, checkTypeId,
    getContractWithSigner,
    sendByTokenId
} from "../../../../utils/ethers";

const SendById = () => {
    const [error, setAnswer] = useState({type: false, sentences: ''});
    const [initState, setInitState] = useState({
        fromAddress: '',
        tokenId: '',
        fromKey: '',
        toAddress: '',
        tokenType: 'ERC-721'
    });
    const [loading, setLoading] = useState(false);
    const {state:{app}} = useContext(appStore);
    const {publicKey,privateKey} = app;

    const sendNft = async (ev) => {
        ev.preventDefault()
        const {
            fromAddress,
            tokenId,
            fromKey,
            toAddress
        } = initState;
        const contract = getContractWithSigner(publicKey,privateKey);
        const id = await checkTypeId(tokenId.trim(),contract);
        setLoading(true);
        if(!id) {
            setAnswer({type: true, sentences:`NFT with ID ${tokenId} doesn’t exist on this chain.`})
            setLoading(false);
            return;
        };

        if (await checkOwnTokenByAddress(id,fromAddress)) {
            setAnswer({type: true, sentences: 'Address not owner token'})
            setLoading(false);
            return ;
        }
        if (await checkByTokenID(id)) {
            setAnswer({type: true, sentences: 'Token with ID doesn’t exist on this chain'})
            setLoading(false);
            return ;
        }
        if (await checkOwnToken(id, fromKey)) {
            if (await checkApprovedToken(id, fromKey)) {
                setAnswer({type: true, sentences: 'Caller/signer doesn’t own the token'})
                setLoading(false);
                return;
            }
        }
        // if (!(await checkSignerConnect(fromKey,fromAddress))) {
        //     setAnswer({type: true, sentences: 'Address and key do not belong to each other'})
        //     return ;
        // }
        if (await checkAmount(fromKey)) {
            setAnswer({type: true, sentences: 'Not enough base tokens to send TRX (eth/BNB)'})
            setLoading(false);
            return ;
        }
        if (await sendByTokenId(fromAddress, fromKey, toAddress, id)) {
            setAnswer({type: true, sentences: 'Transfer is success'});
            setInitState({
                fromAddress: '',
                tokenId: '',
                fromKey: '',
                toAddress: '',
                tokenType: 'ERC-721'
            })
        } else {
            setAnswer({type: true, sentences: 'Transfer is invalid'})
        }
        setLoading(false);
    }



    const handleChange = (ev) => {
        if (error.type) {
            setAnswer({...error, type: false})
        }
        const key = ev.target.id;
        const value = ev.target.value;
        setInitState({...initState, [key]: value})
    }
    return (
        <div className="main__mint">
            <h2> Send  NFT-token by id</h2>
            <Form onSubmit={sendNft}>
                <Form.Group controlId="tokenId" className="main__group">
                    <Form.Label>TokenId</Form.Label>
                    <Form.Control type="text" placeholder="TokenId" className="main__input" onChange={(ev) => {
                        handleChange(ev);
                    }} required value={initState.tokenId}/>
                </Form.Group>
                <Form.Group controlId="fromAddress" className="main__group">
                    <Form.Label>From (address)</Form.Label>
                    <Form.Control type="text" placeholder="From (address)" className="main__input" onChange={(ev) => {
                        handleChange(ev);
                    }}
                                  required value={initState.fromAddress}/>
                </Form.Group>
                <Form.Group controlId="fromKey" className="main__group">
                    <Form.Label>From (private key owner or approved)</Form.Label>
                    <Form.Control type="text" placeholder="From (private key)" className="main__input" onChange={(ev) => {
                        handleChange(ev);
                    }} required value={initState.fromKey}/>
                </Form.Group>
                <Form.Group controlId="toAddress" className="main__group">
                    <Form.Label>To (address)</Form.Label>
                    <Form.Control type="text" placeholder="To (address)" className="main__input" onChange={(ev) => {
                        handleChange(ev);
                    }} required value={initState.toAddress}/>
                </Form.Group>
                <Form.Group controlId="mint" className="main__group select">
                    <Form.Label>Type contract</Form.Label>
                    <select className="main__select" aria-label="Default select example">
                        <option value="1">ERC-721</option>
                    </select>
                </Form.Group>
                <Button variant="primary" type="submit" className="main__btn">
                    Send this NFT
                </Button>
                {error.type && <div className="main__element-error">
                    {error.sentences}
                </div>}
            </Form>
            {loading && <div className="main__wrap-spinner"><Spinner animation="border" variant="primary"/>
            </div>}
        </div>
    );
};

export default SendById;
