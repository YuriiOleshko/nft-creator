import React from 'react';
import SearchByAddress from "./SearchByAddres";
import SearchByTokenId from "./SearchByTokeId";
import GetRole from "./GetRole";

const ReadElement = () => {
    return (
        <div className='main__element-wrapper'>
        <SearchByAddress/>
        <SearchByTokenId/>
        <GetRole/>
        </div>
    )
};

export default ReadElement;
