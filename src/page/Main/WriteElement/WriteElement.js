import React from 'react';
import MintNft from "./MintNft";
import SendById from "./SendById/SendById";
import SetRole from "./SetRole";
import DeleteRole from "./DeleteRole";
import ApproveToken from "./ApproveToken";
import BurnToken from "./BurnToken";

const WriteElement = () => {
    return (
        <div className='main__element'>

            <div className="main__write-body">
                <MintNft/>
                <SendById/>
                <ApproveToken/>
                <BurnToken/>
                <SetRole/>
                <DeleteRole/>
            </div>

        </div>
    );
};

export default WriteElement;
