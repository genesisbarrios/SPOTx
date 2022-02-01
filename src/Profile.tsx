import { useEffect, useMemo, useState } from "react";
import { Row, Col, Container, Button } from "react-bootstrap";
import image1 from './Profile_pic.png';
import image2 from './History.png';

const Profile = () => {
  const rowStyle = {
      marginTop: '5%'
    };


  return (
    <Container>
    <Row>
        <Col sm={4}></Col>
        <Col sm={4}>
          <img src={image1} className="profile"/>
        </Col>
        <Col sm={4}></Col>
    </Row>
     <Row style={rowStyle}>
          <Col sm={12}>
            <h1 className="rewardsTitle">History</h1>
            <hr/>
            <img src={image2} style={{width: '100%', height: '80%'}}/>
          </Col>
        </Row>
    </Container>
  );
};



export default Profile;