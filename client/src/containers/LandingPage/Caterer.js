import React from 'react';
import caterer from '../../assets/img/caterer.JPG';
import checked from '../../assets/img/checked.png';
import { Button, Row, Col, Card, CardBody, Table} from 'reactstrap';
import './styles.css'

const Caterer = () => {
  return (
    <section style={{backgroundColor: 'white'}} id="Caterer" className="white">
      <div className="container">
        <Row>
          <Col xs="12" md="6" > 
            <h2 style={{fontSize: 34}}>Full functionalities dashboard for caterer </h2>
            <p style={{marginTop: 30, fontSize: 16}}>You can put all your effort perfecting your dishes. We handle the rest for you. Using FoodieBee caterer platform, you can enjoy:</p>

            <Table borderless style={{ marginTop: 30}}>
              <tbody>
                <tr>
                  <td><img style={ { objectFit:'cover', marginTop:5, width: 25, height: 25 }} src={checked} /></td>
                  <td style={{fontSize: 16}}><b>More orders.</b> We connect nationwide businesspeople with our caterer partners.</td>
                </tr>
                <tr>
                  <td><img style={ { objectFit:'cover', marginTop:5, width: 25, height: 25 }} src={checked} /></td>
                  <td style={{fontSize: 16}}><b>Operational support.</b> When customers need help, they talk to us. We make sure they’re happy, and you get some relief from distracting phone calls.</td>
                </tr>
                <tr>
                  <td><img style={ { objectFit:'cover', marginTop:5, width: 25, height: 25 }} src={checked} /></td>
                  <td style={{fontSize: 16}}><b>Wider insight.</b> Which marketing channels drive the most orders? What do customers say when reviewing you? We give you fast access to the info that matters most.</td>
                </tr>
              </tbody>
            </Table>

            <div className="text-center"> 
              <Button style={{fontSize: 18, height: 50, marginTop: 10, marginBottom: 30,}} className="bg-primary" size="lg" color="primary">Register As Caterer</Button>
            </div>
  
          </Col>
          <Col xs="12" md="6" >
            <img style={ { objectFit:'cover', width: '100%', height: '100%' }} src={caterer}  />
          </Col>

          <div style={{height: 1, marginTop:100, opacity: 0.2, backgroundColor: 'gray', borderWidth: 1}} className="col l1"></div>

        </Row>


      </div>
    </section>
  );
};

export default Caterer;
