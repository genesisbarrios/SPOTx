import React from "react";
import { Button } from "react-bootstrap";
import Rewards from './Rewards'
import {Buffer} from 'buffer';
import bs58 from 'bs58';
import * as borsh from 'borsh';
import * as solanaWeb3 from "@solana/web3.js"

var solanaProgramId = "3GsQhTCxPTUqgre2YEzoYX8HKGMibUc8hUSrtC8NyhZj"

const MyMarker = ({ key, lat, lng, text, tooltip, addr }) => {

  var connection;

  async function connect() : Promise<void> 
  {  
    connection = new solanaWeb3.Connection(
      "https://weathered-withered-rain.solana-devnet.quiknode.pro/18527f2cbeb06c4095312dce3e2849b01f663fc6/",
      'confirmed',
    );
    console.log(connection)
    payerPubKey = new solanaWeb3.PublicKey(addr);
  }

  var payerPubKey;

  /// maximum permitted size of data: 10 MB
  const GREETING_SIZE = 10 * 1024 * 1024;  
  const LAMPORTS_PER_SOL = 1_000_000_000;
    /**
   * Establish an account to pay for everything
   */
  async function establishPayer() : Promise<void>{
    console.log('establish payer')
    let fees = 0;

    if (!payerPubKey) {
      const {feeCalculator} = await connection.getRecentBlockhash();

      // Calculate the cost to fund the greeter account
      fees += await connection.getMinimumBalanceForRentExemption(GREETING_SIZE);

      // Calculate the cost of sending transactions
      fees += feeCalculator.lamportsPerSignature * 100; // wag
      payerPubKey = new solanaWeb3.PublicKey(addr);
    }
    console.log('payerPubKey: ' + payerPubKey);
    let lamports = await connection.getBalance(payerPubKey);
    console.log('user balance: ' +lamports);

    if (lamports < fees) {
      //If current balance is not enough to pay for fees, request an airdrop
      const sig = await connection.requestAirdrop(
        payerPubKey,
        fees - lamports,
      );
      //await connection.confirmTransaction(sig);
      lamports = await connection.getBalance(payerPubKey);
    }

    console.log(
      'Using account',
      payerPubKey.toString(),
      'containing',
      lamports / LAMPORTS_PER_SOL,
      'SOL to pay for fees',
    );
  }

//  greetedPubkey = await PublicKey.createWithSeed(
//         payer.publicKey,
//         "starbucks",//qr code text
//         solanaProgramId,
//       );


  var sPOTMinterPubKey;

  class sPOTAccount {
    counter = 0;
    constructor(fields: {starbuckscounter: number, versaillescounter: number} | undefined = undefined) {
      if (fields) {
        this.counter = fields.starbuckscounter;
      }
    }
  }

  const sPOTSchema = new Map([
    [sPOTAccount, {kind: 'struct', fields: [['starbuckscounter', 'u32'], ['versaillescounter', 'u32']]}],
  ]);
  //console.log('spotSchema:' + sPOTSchema);

  var solanaProgramIdPubKey;

  async function toggleMarkers() : Promise<void>{
    payerPubKey = new solanaWeb3.PublicKey(addr);
    solanaProgramIdPubKey =  new solanaWeb3.PublicKey(solanaProgramId);

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

  async function reportMints() : Promise<void>{
    const accountInfo = await connection.getAccountInfo(sPOTMinterPubKey);
  
    if (accountInfo == null) {
      throw 'Error: cannot find the greeted account';
    }

    console.log(accountInfo)
    const mints = borsh.deserialize(
      sPOTSchema,
      sPOTAccount,
      accountInfo.data
    );
    console.log(
      addr,
      'has collected ',
      mints.starbuckscounter,
      'rewards from starbucks',
    );
  }

  const addVisit = async() => {
    solanaProgramIdPubKey = new solanaWeb3.PublicKey(solanaProgramId);
    payerPubKey = new solanaWeb3.PublicKey(addr);

  
    var payerKeyPair = solanaWeb3.Keypair.fromSecretKey(new Uint8Array([147,45,227,7,160,232,202,95,251,246,100,98,57,159,45,240,193,26,17,104,111,16,115,161,2,0,103,35,76,194,83,197,95,170,120,201,65,43,95,156,145,129,201,88,165,160,117,132,196,95,120,51,125,50,228,4,142,25,72,27,151,90,48,28]));

  var str = "starbucks";
  var ver = "versailles"
  var storeStr;
    if(text == "1"){
      storeStr = str;
    }else if(text == "2"){
      storeStr = ver;
    }

    sPOTMinterPubKey = await solanaWeb3.PublicKey.createWithSeed(
      payerKeyPair.publicKey,
      storeStr,//qr code text
      solanaProgramIdPubKey,
    );
    console.log('solanaProgramIdPubKey '+ solanaProgramIdPubKey)
    console.log('sPOTMinterPubKey '+sPOTMinterPubKey)

    const instruction = new solanaWeb3.TransactionInstruction({
      data: Buffer.alloc(0), // store name
      keys: [{ isSigner: false, isWritable: true, pubkey: sPOTMinterPubKey}],
      programId: solanaProgramIdPubKey//type
    });
    
    if(!connection){
        await connect();
    }
    console.log(instruction)
    console.log(payerKeyPair)

    const resp = await solanaWeb3.sendAndConfirmTransaction(
        connection,
        new solanaWeb3.Transaction().add(instruction),
        [payerKeyPair]
      );
    alert('adding visit to store number: ' + text + '. Resp: ' + resp);
    console.log(resp);
  }

   const onMarkerClick = async() => {
      await connect();
      await establishPayer();
      await toggleMarkers();
      //await reportMints();
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
            <Button style={{fontSize: '0.7em', marginBottom: '5%'}} onClick={async () => {await addVisit()}}>Claim Visit</Button>
        </div>
    </div>
  );
  
};


export default MyMarker;
