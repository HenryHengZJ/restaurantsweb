import React, { Component } from 'react';
import { Row, Col, Card, CardBody, Table, Label, Container} from 'reactstrap';
import './styles.css'
import img from "../../assets/img"

class Testimonial extends Component {

  constructor(props) {
    super(props);

    this.state = {
      testimonial:
      [
        {
          name: 'Victoria',
          position: 'Corporate Admin',
          comment: 'An order in a few clicks, a great customer service, delighted guests.',
          src: img.testimonial_1
        },
        {
          name: 'Stefan',
          position: 'Tax Assistant',
          comment: 'Thank you for existing! You have made lunch at work an absolute pleasure.',
          src: img.testimonial_2
        },
        {
          name: 'Shureen',
          position: 'Sales Manager',
          comment: 'With FoodieBee, I get to plan ahead of what to eat for the rest of the week.',
          src: img.testimonial_3
        },
        {
          name: 'Cian',
          position: 'Software Engineer',
          comment: 'Wide choice of cuisines and great service for working professionals.',
          src: img.testimonial_4
        },
        {
          name: 'Kieran',
          position: 'Tax Manager',
          comment: 'I really appreciated the quality of the food and on-time delivery.',
          src: img.testimonial_5
        },
      ]
    }

  }

  renderItems() {

    var itemsarray = [];

    var testimonial = this.state.testimonial

    for(let i = 0; i < testimonial.length; i++){
      itemsarray.push(
        <Col key={i} xs="12" sm="6" md="4" lg="4">
          <Card style={{ backgroudColor: 'rgba(220,220,220, 0.5)', borderWidth: 0, borderColor: 'white', boxShadow: 'none'}}>
          <CardBody style={{padding: 0}}>

            <Card style={{boxShadow: '1px 1px 3px #9E9E9E'}}>
              <CardBody>
                <p>{testimonial[i].comment}</p>
              </CardBody>
            </Card>

            <Table borderless>
              <tbody>
                <tr>
                  <td style={{width: '15%'}}>
                    <div style={{width: 70, height: 70, position: 'relative', overflow: 'hidden', borderRadius: '50%'}}>
                      <img style={{ objectFit:'cover', width: 'auto', height: '100%', display: 'inline' }} src={testimonial[i].src} alt={testimonial[i].position}/>
                    </div>
                  </td>
                  <td style={{textAlign:'start', width: '85%'}}>
                    <p>
                    <b>{testimonial[i].name}</b><br />
                    {testimonial[i].position}<br />
                    </p>                  
                  </td>
                </tr>
              </tbody>
            </Table>
            
          </CardBody>
          </Card>
        </Col>
      )
    }

    return(
      <Row style={{ marginLeft:10, marginRight:10, marginTop: 50, flex: 1, textAlign: 'center', alignItems: 'center', justifyContent: 'center'}}>
        {itemsarray}
      </Row>
    )
  }

  render() {
    return (
      <section style={{ backgroundColor: 'white', padding: 0, paddingTop:70, paddingBottom: 50}} id="Testimonial" className="white">

        <Container>
          <Row style={{paddingTop: 20, flex: 1, display: 'flex'}} className="justify-content-center">

          <Col xs="12" style={{textAlign: 'center'}}>
            <h2 style={{fontSize: 34}}>They love FoodieBee</h2>
          </Col>

          {this.renderItems()}

          </Row>
         
        </Container>
      </section>
    );
  }
}

export default Testimonial;
