import React, {useEffect, useState} from 'react';
import {Button, Form, Container} from "react-bootstrap";
import {useHistory} from "react-router";
import {allNetworks, checkIsContract, checkIsWallet} from '../../utils/ethers'

const Login = () => {
    const [privateKey, setPrivateKey] = useState('');
    const [publicKey, setPublicKey] = useState('');
    const [errorPublic, setErrorPublic] = useState(false);
    const [errorPrivate, setErrorPrivate] = useState(false);
    const history = useHistory();
    const [net, setNet] = useState(allNetworks[0].rpc);
    const checkKey = () => {
        if (checkIsWallet(privateKey,net)) {
            return true;
        } else {
            setErrorPrivate(true);
            return false;
        };
    };
    const checkAddress = async () => {
        console.log(net)
        if (publicKey.length >= 40 && publicKey.length <= 44) {
            console.log(publicKey.length)
            if( await checkIsContract(publicKey,net)){
                return true;
            }
            setErrorPublic(true);
            return false;
        } else {
            setErrorPublic(true);
            return false;
        }
    };
    const handleSubmit = async(e) => {
        e.preventDefault()
        const valid = await checkAddress() && checkKey();
        if (valid) {
            localStorage.setItem('publicAddress', publicKey);
            localStorage.setItem('privateKey', privateKey);
            localStorage.setItem('net', net);
            history.push('/')
        };
    };
    useEffect( ()=>{

    },[])

    return (
        <Container className="container">
            <div className="login__header">
                <div></div>
                <h1 className="login__title">
                    NFT Manager
                </h1>
                <select className="login__select" aria-label="Default select example" onChange={(e)=>setNet(e.target.value)} >
                    {allNetworks.map(el=><option key={el.rpc}value={el.rpc}>{el.calling}</option>)}
                </select>
            </div>
            <div className='login__form'>
                <Form onSubmit={handleSubmit}>
                    <Form.Group controlId="publicKey" className='login__group'>
                        <Form.Label>Contract address</Form.Label>
                        <Form.Control type="text" placeholder="Public key"
                                      onChange={(ev) => setPublicKey(ev.target.value)} required value={publicKey}/>
                        {errorPublic && <Form.Text className="login__error">
                            Not valid address contract
                        </Form.Text>}
                    </Form.Group>
                    <Form.Group controlId="privateKey" className='login__group'>
                        <Form.Label>User key</Form.Label>
                        <Form.Control type="text" placeholder="Private Key"
                                      onChange={(ev) => setPrivateKey(ev.target.value)} value={privateKey} required/>
                        {errorPrivate && <Form.Text className="login__error">
                            Not valid private key
                        </Form.Text>}
                    </Form.Group>
                    <Button variant="primary" type="submit" className="login__btn">
                        Submit
                    </Button>
                </Form>
            </div>
        </Container>
    );
};

export default Login;
