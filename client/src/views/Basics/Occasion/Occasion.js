import React, { Component } from 'react';
import {
  Badge,
  Button,
  ButtonDropdown,
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  Col,
  Collapse,
  DropdownItem,
  DropdownMenu,
  DropdownToggle,
  Fade,
  Form,
  FormGroup,
  FormText,
  FormFeedback,
  Input,
  InputGroup,
  InputGroupAddon,
  InputGroupText,
  Label,
  Row,
  Pagination, 
  PaginationItem, 
  PaginationLink,
} from 'reactstrap';
import { AppSwitch } from '@coreui/react'

let prev  = 0;
let next  = 0;
let last  = 0;
let first = 0;


class Occasion extends Component {

  constructor(props) {
    super(props);

    this.handleClick = this.handleClick.bind(this);
    this.onEntering = this.onEntering.bind(this);
    this.onEntered = this.onEntered.bind(this);
    this.onExiting = this.onExiting.bind(this);
    this.onExited = this.onExited.bind(this);
    this.handleNext = this.handleNext.bind(this);
    
    this.state = {
      selectedoccasion: [],
      occasionmenu: [
        {
          src: 'https://www.dublinskylonhotel.com/cmsGallery/imagerow/11256/resized/1200x798/breakfast_hot_buffet_1.jpg',
          checked: false,
          caption: 'Breakfast',
        },
        {
          src: 'https://bordeaux.intercontinental.com/wp-content/uploads/2016/07/InterContinentalBordeauxLeGrandHotel_3b-488x430.jpg',
          checked: false,
          caption: 'Brunch',
        },
        {
          src: 'https://i2.wp.com/twinoakscaterers.com/wp-content/uploads/2016/04/catering-buffet.jpg?w=1220&ssl=1',
          checked: false,
          caption: 'Buffet',
        },
        {
          src: 'https://www.sunsetranchbc.com/image/w700-h400-c7:4/files/5a8f2f70-ac6c-488c-929f-3f64d8b0b5a5.jpg',
          checked: false,
          caption: 'Christmas Party',
        },
        {
          src: 'https://static.businessinsider.com/image/53f5f48b6bb3f79f491577d0-750.jpg',
          checked: false,
          caption: 'Dinner',
        },
        {
          src: 'https://www.hartsfoodandevents.co.uk/site/wp-content/uploads/2017/01/london_060-3.jpg',
          checked: false,
          caption: 'Event',
        },
        ///////////////////////////////
        {
          src: 'https://devouritcatering.com.au/wp-content/uploads/2017/07/party-event-catering-image.jpg',
          checked: false,
          caption: 'Finger Food',
        },
        {
          src: 'https://dynl.mktgcdn.com/p/Yf9K-dzedOu5VP4TKzmJOpF9XXJjDXj7JL2R2qEAQEQ/423x250.jpg',
          checked: false,
          caption: 'Lunch',
        },

        {
          src: 'https://images.click.in/classifieds/images/151/23_04_2018_11_44_55_c9346130f848964f21705e336d297ee6_45mukjqz2d.jpg',
          checked: false,
          caption: 'Meeting',
        },
        {
          src: 'https://restaurantclicks.com/wp-content/uploads/2015/04/restaurant-catering-event.jpg',
          checked: false,
          caption: 'Office Daily',
        },
        {
          src: 'https://www.lazygourmet.ca/wp-content/uploads/Image-9.jpg',
          checked: false,
          caption: 'Wedding',
        },
        {
          src: 'https://images.medicaldaily.com/sites/medicaldaily.com/files/styles/headline/public/2015/05/21/processed-foods-and-snacks.jpg',
          checked: false,
          caption: 'Snacks',
        },
      ],
      currentPage: 1,
      menuPerPage: 6,
      isOpen: false,
    };

  }

  handleClick(event) {
    event.preventDefault();
    this.setState({
      currentPage: Number(event.target.id),
    });
  }

  handleNext() {
    const {selectedoccasion} = this.state
    alert(selectedoccasion)
  }

  onEntering() {
    this.setState({ status: 'Opening...' });
  }

  onEntered() {
    this.setState({ status: 'Opened' });
  }

  onExiting() {
    this.setState({ status: 'Closing...' });
  }

  onExited() {
    this.setState({ status: 'Closed' });
  }

  handleCardClick(occasionmenu) {

    var newselectedmenu = this.state.selectedoccasion
    var newoccasionmenu = this.state.occasionmenu
    
    var occasionmenuindex = newoccasionmenu.findIndex(x => x.caption==occasionmenu.caption);
    var selectedmenuindex = newselectedmenu.findIndex(x => x.caption==occasionmenu.caption);
   
    //Check if item selected
    if (newoccasionmenu[occasionmenuindex].checked) {
      //Remove selected Occasion
      newselectedmenu.splice(selectedmenuindex, 1)
      //Uncheck Occasion
      newoccasionmenu[occasionmenuindex].checked = false
    }
    else {
      //Add selected Occasion
      var addItem = {
        src: occasionmenu.src,
        checked: occasionmenu.checked,
        caption: occasionmenu.caption,
      }
      newselectedmenu.push(addItem)
      //Check Occasion
      newoccasionmenu[occasionmenuindex].checked = true
    }
    
    this.setState({
      selectedoccasion: newselectedmenu,
      occasionmenu: newoccasionmenu,
      isOpen: newselectedmenu.length > 0 ? true : false
    });

  }

  handleSelectedCardClick(index, selectedcuisinemenu) {

    var newselectedmenu = this.state.selectedoccasion
    var newoccasionmenu = this.state.occasionmenu

    //Uncheck Occasion
    var occasionmenuindex = newoccasionmenu.findIndex(x => x.caption==selectedcuisinemenu.caption);
    newoccasionmenu[occasionmenuindex].checked = false
    
    //Remove selected Occasion
    newselectedmenu.splice(index, 1)
    
    this.setState({
      selectedoccasion: newselectedmenu,
      occasionmenu: newoccasionmenu,
      isOpen: newselectedmenu.length > 0 ? true : false
    });

  }

  render() {

    let { occasionmenu, currentPage, menuPerPage, isOpen, selectedoccasion } = this.state;

    // Logic for displaying current Occasion menu
    let indexOfLastOccasion = currentPage * menuPerPage;
    let indexOfFirstOccasion = indexOfLastOccasion - menuPerPage;
    let currentTodos = occasionmenu.slice(indexOfFirstOccasion, indexOfLastOccasion);
    let selectedTodos = selectedoccasion.slice();
    prev  = currentPage > 0 ? (currentPage -1) :0;
    last = Math.ceil(occasionmenu.length/menuPerPage);
    next  = (last === currentPage) ?currentPage: currentPage +1;

    // Logic for displaying page numbers
    let pageNumbers = [];
    for (let i = 1; i <=last; i++) {
      pageNumbers.push(i);
    }

    return (
      <div className="animated fadeIn">
        <Row className="justify-content-center">
          <Col xs="12" md="6">
            <Card >
              <CardHeader>
                <strong>Restaurant Occasion</strong>
              </CardHeader>
              <CardBody>
                <Collapse isOpen={isOpen} onEntering={this.onEntering} onEntered={this.onEntered} onExiting={this.onExiting} onExited={this.onExited}>
                  <Label style={{paddingTop: 10, paddingBottom: 10}} className="h6">Your Occasion</Label>
                  <Row>
                    {
                      selectedTodos.map((selectedoccasion,index) =>{
                        return (
                          <Col xs="12" sm="6" md="6" lg="4">
                              <Card style={{cursor: 'pointer'}} onMouseOver="" onClick={() => this.handleSelectedCardClick(index, selectedoccasion)} data-arg1='1234'>
                                <CardHeader style={{paddingLeft:30}}>
                                  <Input className="form-check-input" type="checkbox" checked />
                                  {selectedoccasion.caption}
                                  <div className="card-header-actions">
                                    <a className="card-header-action btn btn-close" ><i className="icon-close"></i></a>
                                  </div>
                                </CardHeader>
                                
                                <CardBody style={{padding: 0, height: 120}}>
                                  <img style={ { objectFit:'cover', width: '100%', height: '100%' }} src={selectedoccasion.src}  />
                                </CardBody>
                              </Card>
                              
                          </Col>
                        )
                      })
                    }
                  </Row>
                </Collapse>

                <Label style={{paddingTop: 10, paddingBottom: 10}} className="h6" >Select Occasion</Label>

                <Row>
                  {
                    currentTodos.map((occasionmenu,index) =>{
                      return (
                        <Col xs="12" sm="6" md="6" lg="4">
                            <Card style={{cursor: 'pointer'}} onMouseOver="" onClick={() => this.handleCardClick(occasionmenu)} data-arg1='1234'>
                              <CardHeader style={{paddingLeft:30}}>
                                <Input className="form-check-input" type="checkbox" value={occasionmenu.checked} checked={occasionmenu.checked}/>
                                {occasionmenu.caption}
                                <div className="card-header-actions">
                                  <a className="card-header-action btn btn-close" ><i className="icon-close"></i></a>
                                </div>
                              </CardHeader>
                              
                              <CardBody style={{padding: 0, height: 120}}>
                                <img style={ { objectFit:'cover', width: '100%', height: '100%' }} src={occasionmenu.src}  />
                              </CardBody>
                            </Card>
                            
                        </Col>
                      )
                    })
                  }
                </Row>

                <Pagination style={{justifyContent: 'center', alignSelf:'center'}}>
                  
                  <PaginationItem>
                  { prev === 0 ? null :
                      <PaginationLink onClick={this.handleClick} id={prev} href={prev}>Prev</PaginationLink>
                  }
                  </PaginationItem>
                    {
                      pageNumbers.map((number,i) =>
                      <Pagination key= {i}>
                      <PaginationItem active = {pageNumbers[currentPage-1] === (number) ? true : false} >
                      <PaginationLink onClick={this.handleClick} href={number} key={number} id={number}>
                      {number}
                      </PaginationLink>
                      </PaginationItem>
                      </Pagination>
                    )}

                  <PaginationItem>
                  {
                    currentPage === last ? null :
                    <PaginationLink onClick={this.handleClick} id={pageNumbers[currentPage]} href={pageNumbers[currentPage]}>Next</PaginationLink>
                  }
                  </PaginationItem>

                </Pagination>
                      

                <div className="form-actions">
                  <Button style={{marginTop: 20}} onClick={this.handleNext} className="float-right" type="submit" color="primary">Next</Button>
                </div>
               
              </CardBody>
            </Card>
          </Col>
        </Row>
      </div>
    );
  }
}

export default Occasion;
