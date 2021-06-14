

import React, {useState} from 'react';
import {Button, Form, Container, Row, Col} from "react-bootstrap";
import {useHistory} from "react-router";
import {checkSignerConnect} from '../../utils/ethers'
const Login = () => {
    const [privatKey, setPrivatKey] =useState('');
    const [publicKey, setPublicKey] =useState('');
    const [errorPublic, setErrorPublic] =useState(false);
    const [errorPrivate, setErrorPrivate] =useState(false);
    const history = useHistory();

    const checkKey =()=>{
        if(checkSignerConnect){
            return true
        }else{
            setErrorPrivate(true)
            return false
        }
    }
    const checkAddress =()=>{
        if(publicKey.length>=40 && publicKey.length<=44){
            return true
        }else{
            setErrorPublic(true)
            return false
        }
    }
    const handleSubmit = (e)=>{
        e.preventDefault()
        if(checkKey()&&checkAddress()){
            localStorage.setItem('publicAddress',publicKey)
            localStorage.setItem('privatAddress',privatKey)
            history.push('/')

        }

    }

    return (
            <Container className="container">
                <div className="login__header">
                    <div></div>
                    <h1 className="login__title">
                        NFT Manager
                    </h1>
                    <select className="login__select" aria-label="Default select example">
                        <option value="1">mainnet</option>
                        <option value="2">testnet</option>
                        <option value="3">rinkiby</option>
                    </select>

                </div>
                <div className='login__form'>
                    <Form  onSubmit={handleSubmit}>
                        <Form.Group controlId="publicKey" className='login__group'>
                            <Form.Label>Сontract owner/manager key</Form.Label>
                            <Form.Control type="text" placeholder="Public key" onChange={(ev)=>setPublicKey(ev.target.value)} required value={publicKey} />
                            {errorPublic&&<Form.Text className="login__error">
                                Not valid address
                            </Form.Text>}
                        </Form.Group>

                        <Form.Group controlId="privateKey" className='login__group'>
                            <Form.Label>User key</Form.Label>
                            <Form.Control type="text" placeholder="Privat Key"  onChange={(ev)=>setPrivatKey(ev.target.value)} value={privatKey} required />
                            {errorPublic&&<Form.Text className="login__error">
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
