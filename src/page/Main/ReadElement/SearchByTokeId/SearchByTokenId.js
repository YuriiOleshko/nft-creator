import React, {useState} from 'react';
import SearchLine from "../../../../components/SearchLine/SearchLine";
import {Spinner, Table} from "react-bootstrap";
import {getContractWithSigner} from "../../../../utils/ethers";

const SearchByTokenId = () => {
    const [value,setValue]= useState('')
    const [loading,setLoading] = useState(false)
    const [error,setError] = useState(false)
    const [info, setInfo] = useState('')
    const searchById = async ()=>{
        setError(false)
        setLoading(true)
        const contract = getContractWithSigner()
        try{
            const meta = await contract.tokenURI(value.trim())
            const name = await contract.name()
            const owner = await  contract.ownerOf(value.trim());
            console.log(owner,'owner')
            setInfo({meta:meta,name:name,owner:owner})

        }catch (e) {
            setInfo('')

            setError(true)
        }
        setLoading(false)

    }
    console.log(info,'info')
    return (
        <div className="main__element-panel">
            <SearchLine value={value} change={setValue} handleSubmit={searchById} labelInput='Search by TokenId' labelBtn='Get' novalid={true}/>
            <div className="main__body-element">
                {loading&&<Spinner animation="border" variant="primary"/>
                }
                {!loading && !!info&&
                <Table className='main__table' striped bordered hover  >
                    <thead>
                    <tr>
                        <th>Name</th>
                        <th>Metadata</th>
                        <th>Owner</th>
                    </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>{info.name}</td>
                            <td>{info.meta}</td>
                            <td>{info.owner}</td>

                        </tr>
                    </tbody>
                </Table>}
                {error&&<div className="main__element-error">
                    <span>Not Found</span>
                </div>}
            </div>

        </div>
    );
};

export default SearchByTokenId;
