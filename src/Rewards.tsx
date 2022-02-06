import { useEffect, useState, useLayoutEffect } from "react";
import { Row, Col, Container, Button } from "react-bootstrap";
import image1 from "./Recently Visited.png";

import { ethers } from "ethers";

import { Web3ReactProvider, useWeb3React } from "@web3-react/core";
import { InjectedConnector } from "@web3-react/injected-connector";
import { Web3Provider } from "@ethersproject/providers";

import GoogleMapReact from 'google-map-react';
import MyMarker from "./MyMarker";
import geolocation from 'geolocation'

const injected = new InjectedConnector({
  supportedChainIds: [80001]
});

const Rewards = () => {
  const web3 = useWeb3React();

  // Use the connectWallet hook thirdweb gives us.
  const { account, library } = useWeb3React();
  console.log("👋 account:", account)

  var isClaiming = false;

  const node_url = 'https://polygon-rpc.com';
  const provider = new ethers.providers.JsonRpcProvider(node_url);
  var signer;

  var currposition = [25.765079, -80.263860]
  const points = [
  { id: 1, title: "Starbucks Coffee", lat: 25.773270, lng: -80.263860 },
  { id: 2, title: "Versailles Restaurant", lat: 25.765079, lng: -80.252327 }
];

  const rowStyle = {
    marginTop: '5%'
  };

  //set position of user
  const setPos = () => {
    geolocation.getCurrentPosition(function (err, position) {
      if (err) throw err
      currposition = [position.coords.latitude, position.coords.longitude]
      console.log(currposition)
    })
  }

const handleConnect = () => {
  try {
    web3.activate(injected, undefined, true);
  } catch (error) {
    console.error(error);
  }
};

  useEffect(() => {
    if(!account){
      handleConnect();
    }else{
      if(!signer){
        signer = library.getSigner(account);
        console.log(signer)
      }
    }
    setPos();
  });

    // This is the case where the user hasn't connected their wallet
    // to your web app. Let them call connectWallet.
    if (!account) {
      return (
        <Container>
          <Row style={rowStyle}>
            <Col sm={2}></Col>
            <Col sm={8}>
              <h1 className="centerText rewardsTitle">Find your next meal now and start working towards a free one.</h1>
              <Button onClick={handleConnect} className="centerDiv walletButton">Connect Your Wallet</Button>
            </Col>
            <Col sm={2}></Col>
          </Row>
        </Container>
      );
    }

    if(account){
      return (
        <Container>
          
          <Row style={rowStyle}>
            <Col sm={2}></Col>
            <Col sm={8}>
              <h1 className="centerText rewardsTitle">Find your next meal now and start working towards a free one.</h1>
            </Col>
            <Col sm={2}></Col>
          </Row>
          <div style={{ height: '60%', width: '100%' }}>
            <GoogleMapReact
            bootstrapURLKeys={{ key: process.env.REACT_APP_GOOGLE_MAPS_API_KEY! }}
            defaultCenter={currposition}
            defaultZoom={13}
            >
              {points.map(({ lat, lng, id, title }) => {
              return (
                <MyMarker key={id} lat={lat} lng={lng} text={id} tooltip={title} account={account} library={library}/>
              );
            })}
            </GoogleMapReact>
          </div>
          <Row style={rowStyle}>
            <Col sm={12}>
              <h1 className="rewardsTitle">Recently Visited</h1>
              <hr/>
              <img src={image1} style={{width: '100%', height: '80%'}}/>
            </Col>
          </Row>
        </Container>
        
      );
    }
};



export default Rewards;