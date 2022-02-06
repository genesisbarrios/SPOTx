


const hre = require("hardhat");

const WALLET_ADDRESS = "0x15c622239FF4f25928fcB5a0ab47727bd3999Aa0"
const CONTRACT_ADDRESS = "0xFb6a3e8a859E79654f8f6FaFb5843001D7e820fF"

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