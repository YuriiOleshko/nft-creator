import React, {useContext, useEffect, useState} from 'react';
import {Button, Form, Spinner} from "react-bootstrap";
import {
    arrRoles,
    checkAccessRights,
    checkAmount,
    createNFT,
    getSignerAddr,
    isTokenId
} from "../../../../utils/ethers";
import {validation} from "../../../../utils/helpers";
import {appStore} from "../../../../state/app";

const MintNft = () => {
    const [answer, setAnswer] = useState({type: false, sentences: ''});
    const [address, setAddress] = useState('');
    const [url, setUrl] = useState('');
    const {state} = useContext(appStore);
    const [loading, setLoading] = useState(false);
    const {app} = state;
    const {privateKey} = app;


    useEffect(() => {
        setAddress(getSignerAddr(privateKey))
    }, [])

    // this function fot creating and transfer to address
    const mintNft = async (ev) => {
        ev.preventDefault()
        setLoading(true);

        if (url.includes('0x')) {
            if (!validation(address)) {
                setAnswer({type: true, sentences: 'Invalid address'});
                setLoading(false);
                return;
            }
            if (await checkAmount(privateKey)) {
                setAnswer({type: true, sentences: 'If not sufficient ETH/gas'})
                setLoading(false);
                return;
            }
            if (await isTokenId(url)) {
                setAnswer({type: true, sentences: 'If token ID already exists, throw an error.'})
                setLoading(false);
                return;
            };
            if (await checkAccessRights(privateKey, arrRoles[0].role)) {
                setAnswer({type: true, sentences: 'You dont have access, only Minter can mint NFT '})
                setLoading(false);
                return;
            }
            if (await createNFT(address, url)) {
                setAnswer({type: true, sentences: 'Congratulation'})
                setAddress('');
                setUrl('');

            } else {
                setAnswer({type: true, sentences: 'If address calling not valid '})

            }
        } else setAnswer({type: true, sentences: 'Your id need to start by 0x'})
        setLoading(false);


    }
    return (
        <div className="main__mint">
            <h2>Mint NFT-token</h2>
            <Form onSubmit={mintNft}>
                <Form.Group controlId="address" className="main__group">
                    <Form.Label>Creator address</Form.Label>
                    <Form.Control type="text" placeholder="address" className="main__input" onChange={(ev) => {
                        setAddress(ev.target.value)
                        setAnswer({...answer, type: false});
                    }} required value={address}/>
                </Form.Group>
                <Form.Group controlId="mint" className="main__group">
                    <Form.Label>TokenId</Form.Label>
                    <Form.Control type="text" placeholder="TokenId" className="main__input" onChange={(ev) => {
                        setUrl(ev.target.value)
                        setAnswer({...answer, type: false})
                    }} required value={url}/>
                </Form.Group>
                <Button variant="primary" type="submit" className="main__btn">
                    Mint this NFT
                </Button>
            </Form>
            {loading && <div className="main__wrap-spinner"><Spinner animation="border" variant="primary"/>
            </div>}
            {answer.type && <div className="main__element-error">
                {answer.sentences}
            </div>}
        </div>
    );
};

export default MintNft;
