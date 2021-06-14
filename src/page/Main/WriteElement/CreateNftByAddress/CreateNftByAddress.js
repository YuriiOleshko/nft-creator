import React, {useContext, useState} from 'react';
import {validation} from "../../../../utils/helpers";
import {createNFT} from "../../../../utils/ethers";
import {Button, Form} from "react-bootstrap";
import {appStore} from "../../../../state/app";

const CreateNftByAddress = () => {
    const [error , setError] = useState(false);
    const [url , setUrl] = useState('');
    const [success , setSuccess] = useState({type:false, sentences:''});
    const { app } = useContext(appStore);

    const mintNft = async (ev)=>{
        ev.preventDefault()
        console.log(app.publicKey)
        if(await createNFT(app.publicKey,url)){
            setSuccess({type:true, sentences:'NFT token has been minted'})
        }else{
            setSuccess({type:true, sentences:'Error not created NFT Token'})

        }
    }
    return (
        <div className="main__mint">
            <h2> Mint NFT-token</h2>
            <Form onSubmit={mintNft}>
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

export default CreateNftByAddress;
