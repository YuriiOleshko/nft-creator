import React, {useState} from 'react';
import SearchLine from "../../../components/SearchLine/SearchLine";
import {Button, Form} from "react-bootstrap";
import MintNft from "./MintNft";
import CreateNftByAddress from "./CreateNftByAddress/CreateNftByAddress";

const WriteElement = () => {
    const [value,setValue]= useState('')

    console.log('write');
    return (
        <div className='main__element'>
            <div className="main__element-panel">

            </div>
            <div className="main__write-body">
                <MintNft/>
                <CreateNftByAddress/>
            </div>

        </div>
    );
};

export default WriteElement;
