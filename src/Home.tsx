import { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
//import { ThirdwebSDK } from "@3rdweb/sdk";
import { Row, Col, Container, Button } from "react-bootstrap";
import iphone from './iphone.png';
import circle1 from './Circle 1.png';
import circle2 from './Circle 2.png';
import circle3 from './circle 3.png';
import pizza from './Pizza.png';
import chef from './chef image.png';
import Rewards from "./Rewards"

const Home = () => {
  const rowStyle = {
      marginTop: '5%'
    };

    const searchButtonStyle = {
      backgroundColor: 'linear-gradient(90deg, rgba(247,105,4,1) 0%, rgba(209,10,51,1) 35%, rgba(209,10,174,1) 100%);'
    };

  let navigate = useNavigate(); 
  const routeChange = () =>{ 
    let path = '/Rewards'; 
    navigate(path);
  }

  return (
    <Container>
      <Row style={rowStyle}>
        <Col sm={8}>
          <h1>Earn rewards from loyalty programs, all in one place.</h1>
          <p>Start here by searching for nearby restaurants and cafes that offer loyalty programs. Keep track of your progress at each place all in one place.</p>
          <Button style={searchButtonStyle} onClick={routeChange}>Search Now</Button>
        </Col>
        <Col sm={4}>
          <img src={iphone} className="image1"/>
        </Col>
    </Row>
    <Row style={rowStyle}><h1 className="centerText">How It Works</h1></Row>
    <Row>
        <Col sm={4}>
          <img src={circle1} className="image2"/>
          <p className="centerText">Find a restaurant and make a purchase</p>
        </Col>
        <Col sm={4}>
          <img src={circle2} className="image2"/>
          <p className="centerText">After purchase, scan the QR code printed on receipt</p>
        </Col>
        <Col sm={4}>
          <img src={circle3} className="image2"/>
          <p className="centerText">Receive loyalty points towards a reward!</p>
        </Col>
    </Row>
    <Row>
        <Col sm={6}>
          <img src={pizza} className="image3"/>
        </Col>
        <Col sm={6}>
          <img src={chef} className="image3"/>
        </Col>
    </Row>
    <Row>
      <Col sm={4}></Col>
      <Col sm={4}>
        <Button className="centerDiv" onClick={routeChange}>Search Now</Button>
      </Col>
      <Col sm={4}></Col>
    </Row>
    
    </Container>
  );
};



export default Home;