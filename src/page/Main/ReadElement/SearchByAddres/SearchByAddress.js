import React, {useState} from 'react';
import SearchLine from "../../../../components/SearchLine/SearchLine";
import {getContractWithSigner} from "../../../../utils/ethers";
import {Table,Spinner} from "react-bootstrap";


const SearchByAddress = () => {
    const [value,setValue]= useState('')
    const [listTokens,setListTokens]= useState([])
    const [loading,setLoading] = useState(false)
    const [error,setError] = useState(false)

    const searchByAddr = async ()=>{
        const contract = getContractWithSigner()
        setLoading(true)
        setError(false)
        console.log(contract.filters.Transfer(value,null),'contract')
        console.log(contract.filters,'contract')
        console.log(contract,'contract')
        try{
            const balance  = await contract.balanceOf(value)
            const list = []
            for(let count=0; count<=(balance.toNumber()-1); count++){
                let nft=await contract.tokenOfOwnerByIndex(value,count)
                list.push(nft.toNumber())
            }
            setListTokens(list)
        }catch(e){
            setListTokens([])
            setError(true)
        }

        setLoading(false)
    }
    return (
            <div className="main__element-panel">
                <SearchLine value={value} change={setValue} handleSubmit={searchByAddr} labelInput='Search by address' labelBtn='Get'/>
                <div className="main__body-element">
                {loading&&<Spinner animation="border" variant="primary"/>
                }
                {!loading && listTokens.length>0&&
                    <Table className='main__table' striped bordered hover responsive  >
                        <thead>
                        <tr>
                            <th>#</th>
                            <th>Owner</th>
                            <th>TokenId</th>
                        </tr>
                        </thead>
                        <tbody>
                        {listTokens.map((el,index)=>
                        <tr key={index+'e'+index}>
                            <td>{index+1}</td>
                            <td>{value}</td>
                            <td>{el}</td>

                        </tr>
                        )}
                        </tbody>
                    </Table>}
                    {error&&<div className="main__element-error">
                        <span>Not Found</span>
                    </div>}
                </div>
        </div>
    );
};

export default SearchByAddress;
