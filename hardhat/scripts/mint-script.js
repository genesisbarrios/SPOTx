


const hre = require("hardhat");

const WALLET_ADDRESS = "0x15c622239FF4f25928fcB5a0ab47727bd3999Aa0"
const CONTRACT_ADDRESS = "0x72eF9A1c9B3b6f862b24AD2C1317bdD790e44d71"
//0x75ef276a26f1999530f2f7240c334a49ccd8ce5b199d32eb3caaf12b80206b39
async function main() {
    const NFT = await hre.ethers.getContractFactory("StarbucksSPOTx");

    const contract = NFT.attach(CONTRACT_ADDRESS);
    await contract.mint(WALLET_ADDRESS, 1).then((txn) => {
        // Log Txn
        console.log(txn.hash)
        return(txn)
    });

}

main();