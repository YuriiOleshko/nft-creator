import React, {useContext, useState} from 'react';
import {Button, Form, Spinner} from "react-bootstrap";
import {appStore} from "../../../../state/app";
import {
    burnNFTToken,
    checkAmount, checkApprovedToken,
    checkOwnToken,
    checkTypeId,
    getContractWithSigner
} from "../../../../utils/ethers";

const BurnToken = () => {
    const [answer , setAnswer] = useState({type:false, sentences:''});
    const [tokenId , setTokenId] = useState('');
    const {state} = useContext(appStore);
    const {app} = state;
    const [loading, setLoading] = useState(false)
    const burnNft =async (ev)=>{
        ev.preventDefault()
        const contract = getContractWithSigner(app.publicKey,app.privateKey);
        const id = await checkTypeId(tokenId.trim(),contract);
        setLoading(true);
        if(!id) {
            setAnswer({type: true, sentences:`NFT with ID ${tokenId} doesn’t exist on this chain.`})
            setLoading(false);
            return;
        };
        if (await checkAmount(app.privateKey)) {
            setAnswer({type: true, sentences: 'If not sufficient ETH/gas'})
            setLoading(false);
            return ;
        }
        if (await checkOwnToken(id, app.privateKey)) {
            if (await checkApprovedToken(id, app.privateKey)) {
                setAnswer({type: true, sentences: 'Caller/signer doesn’t own the token'})
                setLoading(false);
                return;
            }
        }
        if(await burnNFTToken(id)){
            setTokenId('');
            setAnswer({type: true, sentences: 'Congratulation'});
        }else{
            setAnswer({type: true, sentences: 'Caller/signer doesn’t own the token'});
        }
        setLoading(false);

    }

    return (
        <div className="main__mint">
            <h2>Burn NFT-token</h2>
            <Form onSubmit={burnNft}>
                <Form.Group controlId="mintId" className="main__group" >
                    <Form.Label>TokenId</Form.Label>
                    <Form.Control type="text" placeholder="TokenId" className="main__input" onChange={(ev)=>{
                        setTokenId(ev.target.value)
                        setAnswer({...answer, type:false})
                    }} required value={tokenId} />
                </Form.Group>
                <Button variant="primary" type="submit" className="main__btn">
                    Burn this NFT
                </Button>
            </Form>
            {loading && <div className="main__wrap-spinner"><Spinner animation="border" variant="primary"/></div>}
            {answer.type&&<div className="main__element-error">
                {answer.sentences}
            </div>}
        </div>

    );
};

export default BurnToken;
