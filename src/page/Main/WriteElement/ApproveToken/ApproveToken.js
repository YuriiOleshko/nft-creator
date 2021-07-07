import React, {useContext, useState} from 'react';
import {Button, Form, Spinner} from "react-bootstrap";
import {appStore} from "../../../../state/app";
import {
    approveNFTToken,
    checkAmount,
    checkOwnToken,
    checkTypeId,
    getContractWithSigner
} from "../../../../utils/ethers";
import {validation} from "../../../../utils/helpers";

const ApproveToken = () => {
    const [answer , setAnswer] = useState({type:false, sentences:''});
    const [address , setAddress] = useState('');
    const [tokenId , setTokenId] = useState('');
    const [loading, setLoading] = useState(false);
    const {state} = useContext(appStore);
    const {app} = state;
    const {publicKey,privateKey} = app;


    const approveNft =async (ev)=>{
        ev.preventDefault()
        const contract = getContractWithSigner(publicKey,privateKey);
        const id = await checkTypeId(tokenId.trim(),contract);
        setLoading(true);
        if(!id) {
            setAnswer({type: true, sentences:`NFT with ID ${tokenId} doesn’t exist on this chain.`})
            setLoading(false);
            return;
        };
        if(!validation(address)){
            setAnswer({ type:true,sentences: 'Invalid address'}) ;
            setLoading(false);
            return;
        }
        if (await checkAmount(privateKey)) {
            setAnswer({type: true, sentences: 'If not sufficient ETH/gas'})
            setLoading(false);
            return ;
        }
        if (await checkOwnToken(id, privateKey)) {
            setAnswer({type: true, sentences: 'Caller/signer doesn’t own the token'})
            setLoading(false);
            return ;
        }
        if(await approveNFTToken(address,id)){
            setAddress('');
            setTokenId('');
            setAnswer({type: true, sentences: 'Congratulation'})
        }else{
            setAnswer({type: true, sentences: 'If address calling not valid '})
        }
        setLoading(false);

    }
    return (
        <div className="main__mint">
            <h2>Approve NFT-token</h2>
            <Form onSubmit={approveNft}>
                <Form.Group controlId="address-to" className="main__group" >
                    <Form.Label>To address</Form.Label>
                    <Form.Control type="text" placeholder="address" className="main__input" onChange={(ev)=> {
                        setAddress(ev.target.value)
                        setAnswer({...answer, type:false});
                    }} required value={address} />
                </Form.Group>
                <Form.Group controlId="mintId" className="main__group" >
                    <Form.Label>TokenId</Form.Label>
                    <Form.Control type="text" placeholder="TokenId" className="main__input" onChange={(ev)=>{
                        setTokenId(ev.target.value)
                        setAnswer({...answer, type:false})
                    }} required value={tokenId} />
                </Form.Group>
                <Button variant="primary" type="submit" className="main__btn">
                    Mint this NFT
                </Button>
            </Form>
            {loading && <div className="main__wrap-spinner"><Spinner animation="border" variant="primary"/>
            </div>}
            {answer.type&&<div className="main__element-error">
                {answer.sentences}
            </div>}
        </div>

    );
};

export default ApproveToken;
