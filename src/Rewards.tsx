import { useEffect, useState, useLayoutEffect } from "react";
import { Row, Col, Container, Button } from "react-bootstrap";
import Torus from "@toruslabs/solana-embed";
import Web3 from "web3";
import image1 from "./Recently Visited.png";
import * as solanaWeb3 from "@solana/web3.js";
//import QrReader from 'react-qr-scanner';

import GoogleMapReact from 'google-map-react';
import MyMarker from "./MyMarker";
import geolocation from 'geolocation'

const Rewards = () => {
  const starbucksUserCount = 0, versaillesUserCount = 0;
  const [account, setAccount] = useState({});
  var isClaiming = false;

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
var torus;
var userAddr;

const initTorus = async() => {
      console.log('init torus')
      torus = new Torus({});
      await torus.init({ buildEnv: "testing", showTorusButton: true });
      const publicKeys = await torus.login();
      // return array of public key in base 58
      userAddr = publicKeys[0];
      setAccount(userAddr);
      getUserInfo();
}

  const onClickLogin = async() => {
      await initTorus();
  };

  const getUserInfo = async() => {
     const userInfo = await torus.getUserInfo();
     
     console.log(userInfo);
     console.log(account);
  }

  // useLayoutEffect(() => {
  //     //initTorus();
  // });

  useEffect(() => {
    if(!torus){
      //initTorus();
    }
    setPos();
  });

    // This is the case where the user hasn't connected their wallet
    // to your web app. Let them call connectWallet.
    if (Object.keys(account).length === 0) {
      return (
        <Container>
          <Row style={rowStyle}>
            <Col sm={2}></Col>
            <Col sm={8}>
              <h1 className="centerText rewardsTitle">Find your next meal now and start working towards a free one.</h1>
              <Button onClick={onClickLogin} className="centerDiv walletButton">Connect Your Wallet</Button>
            </Col>
            <Col sm={2}></Col>
          </Row>
        </Container>
      );
    }

  // const handleError = (err) => {
  //   console.error(err)
  // }

  //  const handleScan = (data) => {
  //   this.setState({
  //     result: data,
  //   })
  // }

    // This is the case where we have the user's address
    // which means they've connected their wallet to our site!
    // <Row id="qrContainer">
    //     <QrReader
    //       delay={2}
    //       style={{ height: '60%', width: '100%' }}
    //       onError={handleError}
    //       onScan={handleScan}
    //       />
    //     </Row>
    if(Object.keys(account).length !== 0){
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
            bootstrapURLKeys={{ key: process.env.GOOGLE_MAPS_API_KEY }}
            defaultCenter={currposition}
            defaultZoom={13}
            >
              {points.map(({ lat, lng, id, title }) => {
              return (
                <MyMarker key={id} lat={lat} lng={lng} text={id} tooltip={title} addr={account}/>
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