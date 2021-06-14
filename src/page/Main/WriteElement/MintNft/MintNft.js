import React, {useState} from 'react';
import {Button, Form} from "react-bootstrap";
import {createNFT} from "../../../../utils/ethers";
import {validation} from "../../../../utils/helpers";

const MintNft = () => {
    const [error , setError] = useState(false);
    const [address , setAddress] = useState('');
    const [url , setUrl] = useState('');
    const [success , setSuccess] = useState({type:false, sentences:''});
    const mintNft = async (ev)=>{
        ev.preventDefault()
        if(!validation(address)){
            setError(true) ;
            return
        }
        if(await createNFT(address,url)){
            setSuccess({type:true, sentences:'NFT token has been minted'})
        }else{
            setSuccess({type:true, sentences:'Error not created NFT Token'})

        }
    }
    return (
        <div className="main__mint">
            <h2>Mint and Transfer NFT-token</h2>
            <Form onSubmit={mintNft}>
                <Form.Group controlId="address" className="main__group" >
                    <Form.Label>Address creator</Form.Label>
                    <Form.Control type="text" placeholder="address" className="main__input" onChange={(ev)=> {
                        setAddress(ev.target.value)
                        setError(false);
                    }} required value={address} />
                </Form.Group>
                <Form.Group controlId="mint" className="main__group" >
                    <Form.Label>TokenId</Form.Label>
                    <Form.Control type="text" placeholder="TokenId" className="main__input" onChange={(ev)=>{
                        setUrl(ev.target.value)
                        setError(false);
                    }} required value={url} />
                </Form.Group>
                {error&&<Form.Text className="main__error">
                    This not valid address , please check his.
                </Form.Text>}
                <Button variant="primary" type="submit" className="main__btn">
                   Create
                </Button>
            </Form>
            {success.type&&<div className="main__succses">
                Congratulation you create NFT Token
            </div>}
        </div>
    );
};

export default MintNft;
