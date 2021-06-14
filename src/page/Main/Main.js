import React, {useEffect, useState,useContext} from 'react';
import {Container, Tabs, Tab, TabContainer, Row} from "react-bootstrap";
import ReadElement from "./ReadElement";
import WriteElement from "./WriteElement";
import { appStore } from '../../state/app';

const Main = () => {
    const [notResult,setNot] = useState(false)
    const [key, setKey] = useState('read');
    const { update } = useContext(appStore);

    useEffect(()=>{
        update('publicKey', localStorage.getItem('publicAddress'));
        update('privateKey', localStorage.getItem('privatAddress'));
    },[])
    return (

        <Container className='main__wrapper'>
            <h2 className="main__title">
                NFT SEARCHER
            </h2>
             <Row className="main__row-tabs">
            <Tabs
                activeKey={key}
                onSelect={(k) => setKey(k)}
                id="uncontrolled-tab-example" className="mb-3 main__tabs">
                <Tab eventKey="read" title="Read" tabClassName="main__tab">
                    {(key==="read")&&<ReadElement/>}
                </Tab>
                <Tab eventKey="write" title="Write" tabClassName="main__tab">
                    {(key==="write")&&<WriteElement/>}
                </Tab>
            </Tabs>
                 {notResult&&<div className="main__no-load">
                     <span>no NFT with this ID </span>
                 </div>}
             </Row>
        </Container>
    );
};

export default Main;
