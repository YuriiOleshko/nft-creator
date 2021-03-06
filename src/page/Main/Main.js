import React, {useEffect, useState, useContext} from 'react';
import {Container, Tabs, Tab, Row} from "react-bootstrap";
import ReadElement from "./ReadElement";
import WriteElement from "./WriteElement";
import {appStore} from '../../state/app';

const Main = () => {
    const [key, setKey] = useState('read');
    const {update} = useContext(appStore);

    useEffect(() => {
        update('app', {publicKey: localStorage.getItem('publicAddress')});
        update('app', {privateKey: localStorage.getItem('privateKey')});
        update('app', {net: localStorage.getItem('net')});
    }, [])

    return (
        <Container className='main__wrapper'>
            <h2 className="main__title">
                NFT MANAGER
            </h2>
            <Row className="main__row-tabs">
                <Tabs
                    activeKey={key}
                    onSelect={(k) => setKey(k)}
                    id="uncontrolled-tab-example" className="mb-3 main__tabs">
                    <Tab eventKey="read" title="Read" tabClassName="main__tab">
                        {(key === "read") && <ReadElement/>}
                    </Tab>
                    <Tab eventKey="write" title="Write" tabClassName="main__tab">
                        {(key === "write") && <WriteElement/>}
                    </Tab>
                </Tabs>
            </Row>
        </Container>
    );
};

export default Main;
