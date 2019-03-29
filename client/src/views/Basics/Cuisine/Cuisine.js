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
import './Cuisine.css'; 

let prev  = 0;
let next  = 0;
let last  = 0;
let first = 0;


class Cuisine extends Component {

  constructor(props) {
    super(props);

    this.handleClick = this.handleClick.bind(this);
    this.handleNext = this.handleNext.bind(this);
    this.onEntering = this.onEntering.bind(this);
    this.onEntered = this.onEntered.bind(this);
    this.onExiting = this.onExiting.bind(this);
    this.onExited = this.onExited.bind(this);
    
    this.state = {
      selectedmenu: [],
      cuisinemenu: [
        {
          src: 'https://www.cityworksrestaurant.com/minneapolis/wp-content/uploads/sites/2/2015/11/Smokehouse-Burger_600x400.jpg',
          checked: false,
          caption: 'American',
        },
        {
          src: 'https://media.apnarm.net.au/media/images/2017/01/24/twb240117asian-7aj2fxtt8c9k5lphmn2_ct677x380.jpg',
          checked: false,
          caption: 'Asian',
        },
        {
          src: 'https://du7ybees82p4m.cloudfront.net/578f9fac892d52.19976571.jpg?width=910&height=512',
          checked: false,
          caption: 'Burger',
        },
        {
          src: 'https://img.grouponcdn.com/deal/2TSVo66dbSJZNdYzcNFeP4/163747171-1000x600/v1/c700x420.jpg',
          checked: false,
          caption: 'Carribean',
        },
        {
          src: 'https://static.independent.co.uk/s3fs-public/thumbnails/image/2017/02/07/15/chinese.jpg?w968h681',
          checked: false,
          caption: 'Chinese',
        },
        {
          src: 'https://images-gmi-pmc.edge-generalmills.com/817d708a-33e6-46f7-b985-0360b6c55cf4.jpg',
          checked: false,
          caption: 'Dessert',
        },
        {
          src: 'https://www.royalcaribbean.com/content/royal/US/en_US/experience/beverage-packages/_jcr_content/parsys/responsivegrid_copy__85624416/tiles2_copy.img.jpg/1516721606073.jpg',
          checked: false,
          caption: 'Drinks',
        },
        {
          src: 'https://cmkt-image-prd.global.ssl.fastly.net/0.1.0/ps/3668084/910/607/m1/fpnw/wm1/gy704j30kvcnm4iaozt0bvok5vx1ksdr1opgicgd0olzgpwgqlneh8ugpdjm6m0z-.jpg?1512113419&s=833260b3e67c5b8ac86da63caf309538',
          checked: false,
          caption: 'English',
        },
        {
          src: 'https://media-cdn.tripadvisor.com/media/photo-s/09/45/2e/76/l-escargot-montorgueil.jpg',
          checked: false,
          caption: 'French',
        },
        {
          src: 'https://images.dailyhive.com/20160628100420/spanakopita.jpg',
          checked: false,
          caption: 'Greek',
        },
        {
          src: 'https://superfood-asia.com/wp-content/uploads/2018/01/halal-food-asia.jpg',
          checked: false,
          caption: 'Halal',
        },
        {
          src: 'https://main-cdn.grabone.co.nz/goimage/fullsize/d1985b69cf2c1783940e8f3fc36b5c24744915a5.jpg',
          checked: false,
          caption: 'Indian',
        },
        {
          src: 'https://www.tasteofhome.com/wp-content/uploads/2017/10/St-Paddy-s-Irish-Beef-Dinner_exps82271_CW1996972D10_18_2bC_RMS.jpg',
          checked: false,
          caption: 'Irish',
        },
        {
          src: 'https://www.bbcgoodfoodme.com/assets/var/app/current/features/624/original/Pan-tasty-alfredo-pasta-forks__800X500.png',
          checked: false,
          caption: 'Italian',
        },
        {
          src: 'https://img.grouponcdn.com/iam/iF513Z3oSKacycWGpEjS/xu-2048x1229/v1/c700x420.jpg',
          checked: false,
          caption: 'Japanese',
        },
        {
          src: 'https://www.seriouseats.com/recipes/images/2017/11/20171031-sweet-potato-quesadilla-4-625x469.jpg',
          checked: false,
          caption: 'Mexican',
        },
        {
          src: 'https://foodtime.asia/blog/wp-content/uploads/2018/01/image3-760x490.jpg',
          checked: false,
          caption: 'Middle Eastern',
        },
        {
          src: 'https://i.dailymail.co.uk/i/pix/2013/10/10/article-0-1A9F1DAA000005DC-669_634x447.jpg',
          checked: false,
          caption: 'Pizza',
        },
        {
          src: 'https://www.ndtv.com/cooks/images/mixed.vegetables.salad.jpg',
          checked: false,
          caption: 'Salad',
        },
        {
          src: 'https://www.bbcgoodfood.com/sites/default/files/recipe-collections/collection-image/2018/08/egg-cress-club-sandwich.jpg',
          checked: false,
          caption: 'Sandwich',
        },
        {
          src: 'https://secure.i.telegraph.co.uk/multimedia/archive/03055/tom-yum_3055855b.jpg',
          checked: false,
          caption: 'Thai',
        },
        {
          src: 'https://img.theculturetrip.com/840x440/smart//wp-content/uploads/2018/05/shutterstock_551299417.jpg',
          checked: false,
          caption: 'Vegetarian Friendly',
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
    const {selectedmenu} = this.state
    alert(selectedmenu)
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

  handleCardClick(cuisinemenu) {

    var newselectedmenu = this.state.selectedmenu
    var newcuisinemenu = this.state.cuisinemenu

    var cuisinemenuindex = newcuisinemenu.findIndex(x => x.caption==cuisinemenu.caption);
    var selectedmenuindex = newselectedmenu.findIndex(x => x.caption==cuisinemenu.caption);

    //Check if item selected
    if (newcuisinemenu[cuisinemenuindex].checked) {
      //Remove selected cuisine
      newselectedmenu.splice(selectedmenuindex, 1)
      //Uncheck cuisine
      newcuisinemenu[cuisinemenuindex].checked = false
    }
    else {
      //Add selected cuisine
      var addItem = {
        src: cuisinemenu.src,
        checked: cuisinemenu.checked,
        caption: cuisinemenu.caption,
      }
      newselectedmenu.push(addItem)
      //Check cuisine
      newcuisinemenu[cuisinemenuindex].checked = true
    }
    
    this.setState({
      selectedmenu: newselectedmenu,
      cuisinemenu: newcuisinemenu,
      isOpen: newselectedmenu.length > 0 ? true : false
    },() => { alert(JSON.stringify(this.state.cuisinemenu))})

  }

  handleSelectedCardClick(index, selectedcuisinemenu) {

    var newselectedmenu = this.state.selectedmenu
    var newcuisinemenu = this.state.cuisinemenu

    //Uncheck cuisine
    var cuisinemenuindex = newcuisinemenu.findIndex(x => x.caption==selectedcuisinemenu.caption);
    newcuisinemenu[cuisinemenuindex].checked = false
    
    //Remove selected cuisine
    newselectedmenu.splice(index, 1)
    
    this.setState({
      selectedmenu: newselectedmenu,
      cuisinemenu: newcuisinemenu,
      isOpen: newselectedmenu.length > 0 ? true : false
    });

  }

  
  render() {

    let { cuisinemenu, currentPage, menuPerPage, isOpen, selectedmenu } = this.state;

    // Logic for displaying current cuisine menu
    let indexOfLastCuisine = currentPage * menuPerPage;
    let indexOfFirstCuisine = indexOfLastCuisine - menuPerPage;
    let currentTodos = cuisinemenu.slice(indexOfFirstCuisine, indexOfLastCuisine);
    let selectedTodos = selectedmenu.slice();
    prev  = currentPage > 0 ? (currentPage -1) :0;
    last = Math.ceil(cuisinemenu.length/menuPerPage);
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
                <strong>Restaurant Cuisine</strong>
              </CardHeader>
              <CardBody>
                <Collapse isOpen={isOpen} onEntering={this.onEntering} onEntered={this.onEntered} onExiting={this.onExiting} onExited={this.onExited}>
                  <Label style={{paddingTop: 10, paddingBottom: 10}} className="h6">Your Cuisine</Label>
                  <Row>
                    {
                      selectedTodos.map((selectedmenu,index) =>{
                        return (
                          <Col xs="12" sm="6" md="6" lg="4">
                              <Card style={{cursor: 'pointer'}} onMouseOver="" onClick={() => this.handleSelectedCardClick(index, selectedmenu)}>
                                <CardHeader style={{paddingLeft:30}}>
                                  <Input className="form-check-input" type="checkbox" checked/>
                                  {selectedmenu.caption}
                                  <div className="card-header-actions">
                                    <a className="card-header-action btn btn-close" ><i className="icon-close"></i></a>
                                  </div>
                                </CardHeader>
                                
                                <CardBody style={{padding: 0, height: 120}}>
                                  <img style={ { objectFit:'cover', width: '100%', height: '100%' }} src={selectedmenu.src}  />
                                </CardBody>
                              </Card>
                              
                          </Col>
                        )
                      })
                    }
                  </Row>
                </Collapse>

                <Label style={{paddingTop: 10, paddingBottom: 10}} className="h6" >Select Cuisine</Label>

                <Row>
                  {
                    currentTodos.map((cuisinemenu,index) =>{
                      return (
                        <Col xs="12" sm="6" md="6" lg="4">
                            <Card style={{cursor: 'pointer'}} onMouseOver="" onClick={() => this.handleCardClick(cuisinemenu)}>
                              <CardHeader style={{paddingLeft:30}}>
                                <Input className="form-check-input" type="checkbox" value={cuisinemenu.checked} checked={cuisinemenu.checked}/>
                                {cuisinemenu.caption}
                                <div className="card-header-actions">
                                  <a className="card-header-action btn btn-close" ><i className="icon-close"></i></a>
                                </div>
                              </CardHeader>
                              
                              <CardBody style={{padding: 0, height: 120}}>
                                <img style={ { objectFit:'cover', width: '100%', height: '100%' }} src={cuisinemenu.src}  />
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

export default Cuisine;
