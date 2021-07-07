import {ethers} from 'ethers'
// this variable need for connect to contract .This variable is creating when contract is building
const abi = [
    {
        "inputs": [],
        "stateMutability": "nonpayable",
        "type": "constructor"
    },
    {
        "anonymous": false,
        "inputs": [
            {
                "indexed": true,
                "internalType": "address",
                "name": "owner",
                "type": "address"
            },
            {
                "indexed": true,
                "internalType": "address",
                "name": "approved",
                "type": "address"
            },
            {
                "indexed": true,
                "internalType": "uint256",
                "name": "tokenId",
                "type": "uint256"
            }
        ],
        "name": "Approval",
        "type": "event"
    },
    {
        "anonymous": false,
        "inputs": [
            {
                "indexed": true,
                "internalType": "address",
                "name": "owner",
                "type": "address"
            },
            {
                "indexed": true,
                "internalType": "address",
                "name": "operator",
                "type": "address"
            },
            {
                "indexed": false,
                "internalType": "bool",
                "name": "approved",
                "type": "bool"
            }
        ],
        "name": "ApprovalForAll",
        "type": "event"
    },
    {
        "anonymous": false,
        "inputs": [
            {
                "indexed": true,
                "internalType": "bytes32",
                "name": "role",
                "type": "bytes32"
            },
            {
                "indexed": true,
                "internalType": "bytes32",
                "name": "previousAdminRole",
                "type": "bytes32"
            },
            {
                "indexed": true,
                "internalType": "bytes32",
                "name": "newAdminRole",
                "type": "bytes32"
            }
        ],
        "name": "RoleAdminChanged",
        "type": "event"
    },
    {
        "anonymous": false,
        "inputs": [
            {
                "indexed": true,
                "internalType": "bytes32",
                "name": "role",
                "type": "bytes32"
            },
            {
                "indexed": true,
                "internalType": "address",
                "name": "account",
                "type": "address"
            },
            {
                "indexed": true,
                "internalType": "address",
                "name": "sender",
                "type": "address"
            }
        ],
        "name": "RoleGranted",
        "type": "event"
    },
    {
        "anonymous": false,
        "inputs": [
            {
                "indexed": true,
                "internalType": "bytes32",
                "name": "role",
                "type": "bytes32"
            },
            {
                "indexed": true,
                "internalType": "address",
                "name": "account",
                "type": "address"
            },
            {
                "indexed": true,
                "internalType": "address",
                "name": "sender",
                "type": "address"
            }
        ],
        "name": "RoleRevoked",
        "type": "event"
    },
    {
        "anonymous": false,
        "inputs": [
            {
                "indexed": true,
                "internalType": "address",
                "name": "from",
                "type": "address"
            },
            {
                "indexed": true,
                "internalType": "address",
                "name": "to",
                "type": "address"
            },
            {
                "indexed": true,
                "internalType": "uint256",
                "name": "tokenId",
                "type": "uint256"
            }
        ],
        "name": "Transfer",
        "type": "event"
    },
    {
        "inputs": [],
        "name": "DEFAULT_ADMIN_ROLE",
        "outputs": [
            {
                "internalType": "bytes32",
                "name": "",
                "type": "bytes32"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [],
        "name": "MINTER_ROLE",
        "outputs": [
            {
                "internalType": "bytes32",
                "name": "",
                "type": "bytes32"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "address",
                "name": "to",
                "type": "address"
            },
            {
                "internalType": "uint256",
                "name": "tokenId",
                "type": "uint256"
            }
        ],
        "name": "approve",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "address",
                "name": "owner",
                "type": "address"
            }
        ],
        "name": "balanceOf",
        "outputs": [
            {
                "internalType": "uint256",
                "name": "",
                "type": "uint256"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [],
        "name": "baseURI",
        "outputs": [
            {
                "internalType": "string",
                "name": "",
                "type": "string"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "uint256",
                "name": "tokenId",
                "type": "uint256"
            }
        ],
        "name": "burnToken",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "uint256",
                "name": "tokenId",
                "type": "uint256"
            }
        ],
        "name": "getApproved",
        "outputs": [
            {
                "internalType": "address",
                "name": "",
                "type": "address"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "bytes32",
                "name": "role",
                "type": "bytes32"
            }
        ],
        "name": "getRoleAdmin",
        "outputs": [
            {
                "internalType": "bytes32",
                "name": "",
                "type": "bytes32"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "bytes32",
                "name": "role",
                "type": "bytes32"
            },
            {
                "internalType": "uint256",
                "name": "index",
                "type": "uint256"
            }
        ],
        "name": "getRoleMember",
        "outputs": [
            {
                "internalType": "address",
                "name": "",
                "type": "address"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "bytes32",
                "name": "role",
                "type": "bytes32"
            }
        ],
        "name": "getRoleMemberCount",
        "outputs": [
            {
                "internalType": "uint256",
                "name": "",
                "type": "uint256"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "string",
                "name": "tokenId",
                "type": "string"
            }
        ],
        "name": "getTokenId",
        "outputs": [
            {
                "internalType": "uint256",
                "name": "",
                "type": "uint256"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "bytes32",
                "name": "role",
                "type": "bytes32"
            },
            {
                "internalType": "address",
                "name": "account",
                "type": "address"
            }
        ],
        "name": "grantRole",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "bytes32",
                "name": "role",
                "type": "bytes32"
            },
            {
                "internalType": "address",
                "name": "account",
                "type": "address"
            }
        ],
        "name": "hasRole",
        "outputs": [
            {
                "internalType": "bool",
                "name": "",
                "type": "bool"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "address",
                "name": "owner",
                "type": "address"
            },
            {
                "internalType": "address",
                "name": "operator",
                "type": "address"
            }
        ],
        "name": "isApprovedForAll",
        "outputs": [
            {
                "internalType": "bool",
                "name": "",
                "type": "bool"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "address",
                "name": "_to",
                "type": "address"
            },
            {
                "internalType": "string",
                "name": "tokenURI_",
                "type": "string"
            }
        ],
        "name": "mint",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "inputs": [],
        "name": "name",
        "outputs": [
            {
                "internalType": "string",
                "name": "",
                "type": "string"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "uint256",
                "name": "tokenId",
                "type": "uint256"
            }
        ],
        "name": "ownerOf",
        "outputs": [
            {
                "internalType": "address",
                "name": "",
                "type": "address"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "bytes32",
                "name": "role",
                "type": "bytes32"
            },
            {
                "internalType": "address",
                "name": "account",
                "type": "address"
            }
        ],
        "name": "renounceRole",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "bytes32",
                "name": "role",
                "type": "bytes32"
            },
            {
                "internalType": "address",
                "name": "account",
                "type": "address"
            }
        ],
        "name": "revokeRole",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "address",
                "name": "to",
                "type": "address"
            }
        ],
        "name": "safeMint",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "address",
                "name": "from",
                "type": "address"
            },
            {
                "internalType": "address",
                "name": "to",
                "type": "address"
            },
            {
                "internalType": "uint256",
                "name": "tokenId",
                "type": "uint256"
            }
        ],
        "name": "safeTransferFrom",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "address",
                "name": "from",
                "type": "address"
            },
            {
                "internalType": "address",
                "name": "to",
                "type": "address"
            },
            {
                "internalType": "uint256",
                "name": "tokenId",
                "type": "uint256"
            },
            {
                "internalType": "bytes",
                "name": "_data",
                "type": "bytes"
            }
        ],
        "name": "safeTransferFrom",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "address",
                "name": "operator",
                "type": "address"
            },
            {
                "internalType": "bool",
                "name": "approved",
                "type": "bool"
            }
        ],
        "name": "setApprovalForAll",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "string",
                "name": "baseURI",
                "type": "string"
            }
        ],
        "name": "setBaseURI",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "bytes4",
                "name": "interfaceId",
                "type": "bytes4"
            }
        ],
        "name": "supportsInterface",
        "outputs": [
            {
                "internalType": "bool",
                "name": "",
                "type": "bool"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [],
        "name": "symbol",
        "outputs": [
            {
                "internalType": "string",
                "name": "",
                "type": "string"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "uint256",
                "name": "index",
                "type": "uint256"
            }
        ],
        "name": "tokenByIndex",
        "outputs": [
            {
                "internalType": "uint256",
                "name": "",
                "type": "uint256"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "address",
                "name": "owner",
                "type": "address"
            },
            {
                "internalType": "uint256",
                "name": "index",
                "type": "uint256"
            }
        ],
        "name": "tokenOfOwnerByIndex",
        "outputs": [
            {
                "internalType": "uint256",
                "name": "",
                "type": "uint256"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "uint256",
                "name": "tokenId",
                "type": "uint256"
            }
        ],
        "name": "tokenURI",
        "outputs": [
            {
                "internalType": "string",
                "name": "",
                "type": "string"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [],
        "name": "totalSupply",
        "outputs": [
            {
                "internalType": "uint256",
                "name": "",
                "type": "uint256"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "address",
                "name": "from",
                "type": "address"
            },
            {
                "internalType": "address",
                "name": "to",
                "type": "address"
            },
            {
                "internalType": "uint256",
                "name": "tokenId",
                "type": "uint256"
            }
        ],
        "name": "transferFrom",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
    }
];
export const allNetworks = [{calling:'rinkeby',rpc:'https://rinkeby.infura.io/v3/'+ process.env.REACT_APP_WEB3_INFURA_PROJECT_ID}
,{calling:'mainnet',rpc:'https://mainnet.infura.io/v3/'+ process.env.REACT_APP_WEB3_INFURA_PROJECT_ID},
    {calling:'ropsten',rpc:'https://ropsten.infura.io/v3/'+ process.env.REACT_APP_WEB3_INFURA_PROJECT_ID},
    {calling:'bsn',rpc:'https://bsc-dataseed.binance.org'},
    {calling:'polygon',rpc:'https://polygon-mainnet.infura.io/v3/'+ process.env.REACT_APP_WEB3_INFURA_PROJECT_ID},
    {calling:'amb-net',rpc:'https://network.ambrosus.io'+ process.env.REACT_APP_WEB3_INFURA_PROJECT_ID}
];

export const arrRoles = [{
    name: "MINTER_ROLE",
    role: ethers.utils.keccak256(ethers.utils.toUtf8Bytes("MINTER_ROLE"))
}, {name: "DEFAULT_ADMIN_ROLE", role: ethers.constants.HashZero}]
const gas = {gasPrice: ethers.utils.parseUnits('20', 'gwei'), gasLimit: 1000000};
const walletGenAddress = '0x5b6A6ad28071bEd1B210F1de996987CadE6E7191';
export const initProvider = () => {
    const net = localStorage.getItem('net') || 'rinkeby';
    const itx = new ethers.providers.JsonRpcProvider(net)
    return itx;
}

export const checkIsContract = async (address,net) => {
    const itx = new ethers.providers.JsonRpcProvider(net)
    console.log(itx,'itx');
    try {
        // const itx = new ethers.providers.UrlJsonRpcProvider(net)
        const contract = new ethers.Contract(address, abi, itx);
        const contractName = await contract.name();
        console.log(contract,'contract');
        console.log(ethers.providers,'contract');
        console.log(itx,'itx');
        console.log(await contract.name(),'contract');
        if (contractName === "ZIMT Certificate") {
            return true;
        }
        ;
        return false;
    } catch (e) {
        return false;
    }
};

export const checkIsWallet = (privateKey) => {
    try {
        const wallet = new ethers.Wallet(privateKey, initProvider());
        return true;
    } catch (e) {
        return false;
    }

}

export const checkAccessRights = async (privatKey, role) => {
    const signer = new ethers.Wallet(privatKey, initProvider());
    const publicAddress = localStorage.getItem('publicAddress');
    const contract = _getContract(publicAddress);
    try {
        if (signer.address === walletGenAddress) {
            return false;
        } else if (await contract.hasRole(role, signer.address)) {
            return false;
        }
        return true;
    } catch (e) {
        return true;
    }
}

export const _getContract = (address) => {
    return new ethers.Contract(address, abi, initProvider());
}
export const getContractWithSigner = (address, key) => {
    const contract = _getContract(address);
    const signer = new ethers.Wallet(key, initProvider());
    console.log(signer, 'signer.Contract(address, abi, initProvider())')
    return contract.connect(signer);
}

export const checkByTokenID = async (id) => {
    const publicAddress = localStorage.getItem('publicAddress');
    const contract = _getContract(publicAddress);
    try {
        await contract.tokenURI(id);
        return false;
    } catch (e) {
        return true;
    }

}
export const checkTypeId = async (value, contract) => {
    if (value.includes('0x')) {
        try {
            const arrIds = await contract.getTokenId(value);
            return arrIds
        } catch (e) {
            return false
        }
    } else {
        return value;
    }
}

export const isTokenId = async (id) => {
    const publicAddress = localStorage.getItem('publicAddress');
    const privateKey = localStorage.getItem('privateKey');
    const contract = await getContractWithSigner(publicAddress, privateKey);
    try {
        const tokenId = await contract.getTokenId(id);
        console.log(tokenId.toNumber(), 'arrTokens')
        if (tokenId.toNumber() > 0) {
            return true;
        }
        return false
    } catch (e) {
        console.error(e, 'error')
        return true
    }
    return false;

}

export const checkOwnToken = async (id, key) => {
    const publicAddress = localStorage.getItem('publicAddress');
    const contract = _getContract(publicAddress);
    const signer = new ethers.Wallet(key, initProvider());
    try {
        const owner = await contract.ownerOf(id);
        if (owner === signer.address) return false;
        return true;
    } catch (e) {
        return true;
    }
}

export const checkApprovedToken = async (id, key) => {
    const publicAddress = localStorage.getItem('publicAddress');
    const contract = _getContract(publicAddress);
    const signer = new ethers.Wallet(key, initProvider());
    try {
        const approved = await contract.getApproved(id);
        console.log(await  contract.getApproved(id),'contract.getApproved(id)')
        if (approved === signer.address) return false;
        return true;
    } catch (e) {
        return true;
    }
}
export const checkOwnTokenByAddress = async (id, addr) => {
    const publicAddress = localStorage.getItem('publicAddress');
    const contract = _getContract(publicAddress);
    try {
        const owner = await contract.ownerOf(id);
        if (owner === addr) return false;
        return true;
    } catch (e) {
        return true;
    }
}

export const getSignerAddr = (key) => {
    const signer = new ethers.Wallet(key, initProvider());
    return signer.address;
}

export const checkAmount = async (privateKey) => {
    try {
        const signer = new ethers.Wallet(privateKey, initProvider());
        const balance = await signer.getBalance();
        const balanceNumber = +balance.toString();
        console.log(balanceNumber, 'balanceNumber')
        console.log(+gas.gasPrice.toString(), '+gas.gasPrice.toString()')
        const gasPrice = +gas.gasPrice.toString();
        if (balanceNumber >= gasPrice) return false;
        return true;
    } catch (e) {
        return true;
    }
}

export const sendByTokenId = async (from, fromKey, to, tokenId) => {
    const publicAddress = localStorage.getItem('publicAddress');
    const contract = await _getContract(publicAddress);
    console.log(from, fromKey, to, tokenId)
    console.log(contract, 'contract')
    try {
        const signer = new ethers.Wallet(fromKey, initProvider())
        const transfer = contract.connect(signer);
        await transfer['safeTransferFrom(address,address,uint256)'](from, to, tokenId, gas);
        return true;
    } catch (e) {
        console.error(e, 'error');
        return false
    }
}

export const getAllRoles = async (address) => {
    const publicAddress = localStorage.getItem('publicAddress');
    const contract = _getContract(publicAddress);
    const roles = [];
    for (const role of arrRoles) {
        const minterCount = await contract.getRoleMemberCount(role.role);
        console.log(minterCount, 'acc')
        for (let i = 0; i < minterCount.toNumber(); ++i) {
            const acc = await contract.getRoleMember(role.role, i);
            if (address === acc) {
                roles.push(role.name);
            }
        }
    }
    return roles;
}
// this func check connect to
export const checkSignerConnect = (privateKey, address) => {
    try {
        const signer = new ethers.Wallet(privateKey, initProvider())
        if (signer.address === address) {
            return true;
        } else return false;
        return true;
    } catch (e) {
        return false;
    }

}

export const checkHasRole = async (role, address) => {
    const publicAddress = localStorage.getItem('publicAddress');
    const privateKey = localStorage.getItem('privateKey');
    const contract = getContractWithSigner(publicAddress, privateKey);
    const roleContract = await contract.hasRole(role, address);
    console.log(roleContract, 'roleContract')
    return roleContract;
}

export const checkRoleAdmin = async ()=>{
    const publicAddress = localStorage.getItem('publicAddress');
    const privateKey = localStorage.getItem('privateKey');
    const contract = getContractWithSigner(publicAddress, privateKey);
    const signer = new ethers.Wallet(privateKey, initProvider())

    const role = await contract.hasRole(arrRoles[1].role, signer.address);
    return role;
}
//this func can use only address with role Default_Admin
// by default role Default_Admin have only address Token address contract
export const setRole = async (role, address) => {
    const publicAddress = localStorage.getItem('publicAddress');
    const privateKey = localStorage.getItem('privateKey');
    const contract = await getContractWithSigner(publicAddress, privateKey);
    try {
        await contract.grantRole(role, address,gas);
        return true;
    } catch (e) {
        console.log(e, 'error')
        return false
    }
}
// export const setRolByAdmin = async (role, address, privateKey) => {
//     const publicAddress = localStorage.getItem('publicAddress');
//     const contract = await getContractWithSigner(publicAddress, privateKey, gas)
//
//     console.log(contract, 'errorcontract###')
//     if (await contract.hasRole(role, address)) return true
//     try {
//         await contract.grantRole(role, address,gas);
//         return true;
//     } catch (e) {
//         console.log(e, 'error')
//         return false
//     }
// }

export const deleteRole = async (role, address) => {
    const publicAddress = localStorage.getItem('publicAddress');
    const privateKey = localStorage.getItem('privateKey');
    const contract = await getContractWithSigner(publicAddress, privateKey);
    // if (!(await contract.hasRole(role, address))) return false
    try {
        await contract.revokeRole(role, address, gas);
        return true;
    } catch (e) {
        console.log(e, 'error')
        return false
    }
}


export const createNFT = async (addr, value) => {
    const publicAddress = localStorage.getItem('publicAddress');
    const privateKey = localStorage.getItem('privateKey');
    const contract = getContractWithSigner(publicAddress, privateKey);
    console.log(addr, 'addr')
    console.log(publicAddress, 'publicAddress')
    try {
        await contract.mint(addr, value, gas);
        return true
    } catch (e) {
        console.error(e, 'error')
        return false
    }
}
export const approveNFTToken = async (addr, value) => {
    const publicAddress = localStorage.getItem('publicAddress');
    const privateKey = localStorage.getItem('privateKey');
    const contract = getContractWithSigner(publicAddress, privateKey);
    try {
        await contract.approve(addr, value, gas);
        return true
    } catch (e) {
        console.error(e, 'error')
        return false
    }
}

export const burnNFTToken = async (token) => {
    const publicAddress = localStorage.getItem('publicAddress');
    const privateKey = localStorage.getItem('privateKey');
    const contract = getContractWithSigner(publicAddress, privateKey);
    try {
        await contract.burnToken(token,gas);
        return true
    } catch (e) {
        console.error(e, 'error')
        return false
    }
}


//this function create NFt with help private key miner
export const createNFTByMinter = async (addr, value, privateKey) => {
    const publicAddress = localStorage.getItem('publicAddress');
    const contract = getContractWithSigner(publicAddress, privateKey);
    try {
        // mint nft can only address with role Miner_Role
        // you can added roll with help func setRole
        await contract.hasRole(arrRoles[0], addr);
        await contract.mint(addr, value, gas);
        return true
    } catch (e) {
        console.error(e, 'error')
        return false
    }

}


