import React, {useState} from 'react';
import SearchByAddress from "./SearchByAddres";
import SearchByTokenId from "./SearchByTokeId";

const ReadElement = () => {
    return (
        <div className='main__element-wrapper'>
        <SearchByAddress/>
        <SearchByTokenId/>
        </div>
    )
};

export default ReadElement;
