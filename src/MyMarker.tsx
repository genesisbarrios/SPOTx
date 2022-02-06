import React from "react";
import {useMemo} from "react";
import { Button } from "react-bootstrap";
import Rewards from './Rewards'
import { ethers, Signer } from "ethers";
import { Web3ReactProvider, useWeb3React } from "@web3-react/core";
import { InjectedConnector } from "@web3-react/injected-connector";
import { Web3Provider } from "@ethersproject/providers";
import MintingContract from "./StarbucksSPOTx.json";

const nftCollectionModuleAddress = "0x4fe097C0b8C8CF05107bBDec0cB5B244159ed7aE"
const abi = MintingContract.abi;


const MyMarker = ({ key, lat, lng, text, tooltip, account, library }) => {

  const node_url = 'https://polygon-rpc.com';
  const provider = new ethers.providers.JsonRpcProvider(node_url);

  console.log("👋 account:", account)
  const signer = library.getSigner(account);
  console.log(signer)

  var isClaiming = false;


  async function toggleMarkers() : Promise<void>{

    if(text == "1"){
      var marker = document.getElementById("1");
      if(marker){
          if(marker.style.display == ""){
            marker.setAttribute("style", "display:block");
          }else{
            marker.setAttribute("style", "display:");
          }
        }
    }else if(text == "2"){
      var marker = document.getElementById("2");
      if(marker){
        if(marker.style.display == ""){
          marker.setAttribute("style", "display:block");
        }else{
          marker.setAttribute("style", "display:");

        }
      }
    }
        
  }

  async function mint() : Promise<void>{
    const contract = new ethers.Contract(nftCollectionModuleAddress, abi, signer as any);
    console.log(contract);
    let nftTxn = await contract.mint(account, 1);
    await nftTxn.wait();
    console.log(nftTxn.hash)
    console.log(nftTxn)
  }

   const onMarkerClick = async() => {
      await toggleMarkers();
  }


  return (
    <div>
        <div className="circle" onClick={async () => {await onMarkerClick()}}>
          <span className="circleText" title={tooltip}>
            {text}
          </span>
        </div>
        <div className="StorePopup" id={text}>
            <p>{tooltip}</p>
            <Button style={{fontSize: '0.7em', marginBottom: '5%'}} onClick={async () => {await mint()}}>Claim Visit</Button>
        </div>
    </div>
  );
  
};


export default MyMarker;
