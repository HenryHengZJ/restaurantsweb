import React, { Component } from 'react';
import  Link  from 'next/link';
import Head from 'next/head';
import {
    Button,
    Card,
    CardHeader,
    CardBody,
    CardGroup,
    Col,
    Container,
    Form,
    Input,
    InputGroup,
    InputGroupAddon,
    InputGroupText,
    Row,
    Label,
    FormGroup,
    FormFeedback,
    UncontrolledDropdown,
    Dropdown,
    DropdownItem,
    DropdownMenu,
    DropdownToggle,
    Nav,
    NavItem,
    NavLink,
    Table,
    ButtonGroup,
    Modal,
    ModalHeader,
    ModalBody,
    ModalFooter,
    Collapse,
    Badge,
  } from "reactstrap";
import NavBar from '../../components/NavBar';
import Footer from '../../components/Footer';
import Layout from '../../components/Layout';
import Router from 'next/router'
import axios from "axios";
import apis from "../../apis";
import {server} from "../../config"
import moment from "moment";
import { DateRangePicker, DateRange } from 'react-date-range';
import StarRatings from 'react-star-ratings';
import { format, addDays, subDays } from 'date-fns';

class Review extends Component {

  constructor(props) {
    super(props);

    this.state = {
      empty: false,
      maxDate: null,
      currentDate: null,
      previousDate: null,
      dropDownDate: false,
      dropDownPayment: false,
      dropDownType: false,
      dateRangePicker: {
        selection: {
          startDate: new Date(),
          endDate: new Date(),
          key: 'selection',
        },
      },
      dateRange: '',
      dateArray: [],
      tableitems: [],
    };
  }


  getSessionStorage = () => {
    
    var currentDateString;
    var previousDateString;

    var currentDateString = sessionStorage.getItem("currentReviewDateString")
    var previousDateString = sessionStorage.getItem("previousReviewDateString")

    this.getReview(currentDateString, previousDateString)
    
  }

  componentDidMount() {

    if (sessionStorage.getItem("currentReviewDateString") !== null && sessionStorage.getItem("previousReviewDateString") !== null) {
      this.getSessionStorage()
    }
    else {

      var currentDateString;
      var previousDateString;
   
      var dateNow = moment().toDate();
      currentDateString = moment(dateNow).format("DD MMM, YYYY")
      previousDateString =  moment(subDays(new Date(), 7)).format("DD MMM, YYYY");
      
      this.getReview(currentDateString, previousDateString)
    }

  }

  getReview = (currentDateString, previousDateString) => {

    var finalOrderSelectionDateString = previousDateString + ' - ' + currentDateString
  
    var headers = {
      'Content-Type': 'application/json',
    }

    var url = apis.GETreview + "?lteDate=" + currentDateString + "&gteDate=" + previousDateString;

    axios.get(url, {withCredentials: true}, {headers: headers})
      .then((response) => {
        if (response.status === 200) {
          console.log(response.data)
          this.setState({
            tableitems: response.data,
            empty: response.data.length === 0 ? true : false,
            maxDate: new Date(),
            dateRange: finalOrderSelectionDateString,
          })
        } 
      })
      .catch((error) => {
        this.setState({
          empty: true 
        })
      });
  }

  toggleDropDown = () => {
    this.setState({
      dropDownDate: !this.state.dropDownDate
    })
  }

  handleRangeChange(which, payload) {
    this.setState({
      [which]: {
        ...this.state[which],
        ...payload,
      },
    })
  }

  selectDateRange = () => {
    var startDate = moment(this.state.dateRangePicker.selection.startDate).format("DD MMM, YYYY")
    var endDate = moment(this.state.dateRangePicker.selection.endDate).format("DD MMM, YYYY")
    var finalDate = startDate + ' - ' + endDate

    this.setState({
      dateRange: finalDate,
      dropDownDate: !this.state.dropDownDate,
    }, () => {
      sessionStorage.setItem('currentReviewDateString', endDate)
      sessionStorage.setItem('previousReviewDateString', startDate)
      this.getReview(endDate, startDate)
    })
  }

  renderDateAction() {
    return (
      <Row style={{marginBottom: 10, marginRight: 10}}>
        <Col>
        
        <Button
          style={{ marginLeft: 10 }}
          outline
          color="primary"
          onClick={() => this.selectDateRange()}
        >
          Select
        </Button>
        <Button
          style={{ marginLeft: 10, opacity: 0.6 }}
          outline
          color="dark"
          onClick={() => this.toggleDropDown()}
        >
          Cancel
        </Button>
        </Col>
      </Row>
    );
  }

  renderTableItems() {
    var itemarray = [];

    var tableitems = this.state.tableitems;

    for (let i = 0; i < tableitems.length; i++) {
      itemarray.push(
        <tr>
          <td style={{width: '10%'}}>{tableitems[i].catererName}</td>
          <td style={{width: '15%'}}>{tableitems[i].customerCity}</td>
          <td style={{width: '15%'}}>
            <StarRatings
              starRatedColor='orange'
              starSpacing='0px'
              starDimension='15px'
              rating={tableitems[i].customerRating}
              numberOfStars={5}
              name='rating'
            />
          </td>
          <td style={{width: '45%'}}>{tableitems[i].customerComment}</td>
          <td style={{width: '15%'}}>{moment(tableitems[i].createdAt).format("DD MMM, YYYY")}</td>
        </tr>
      );
    }

    return <tbody>{itemarray}</tbody>;
  }

  renderEmptyItems() {
    return (
      <Row style={{ marginTop: 90 }}>
        <Col style={{ textAlign: "center" }} xs="12">
          <img
            style={{
              objectFit: "cover",
              width: 70,
              height: 70,
              opacity: 0.6
            }}
            alt={""}
            src={
              "https://s3-eu-west-1.amazonaws.com/foodiebeegeneralphoto/empty.png"
            }
          />
        </Col>
        <Col style={{ textAlign: "center" }} xs="12">
          <p
            style={{ fontSize: 18, letterSpacing: 2, marginTop: 30 }}
            className="big"
          >
            You have 0 reviews for now.
          </p>
        </Col>
      </Row>
    );
  }
 

  renderReviewTable() {
    return (
      <div>
        <Table striped responsive>
          <thead>
            <tr>
              <th>Caterer</th>
              <th>Location</th>
              <th>Rating</th>
              <th>Comment</th>
              <th>Time</th>
            </tr>
          </thead>
          {this.state.empty ? null : this.renderTableItems()}
          </Table>
          {this.state.empty ? this.renderEmptyItems() : null }
        </div>
    );
  }

  render() {
    return (
      <Row>
        <Col>
          <Card>
            <CardHeader>
              <Row >
                <Col>
                  <Label style={{ marginTop: 10 }} className="h6">
                    Review
                  </Label>
                </Col>
              </Row>
            </CardHeader>
            <CardBody>
              <div class="table-wrapper-scroll-y my-custom-scrollbar">
                {this.renderReviewTable()}
              </div>
              <UncontrolledDropdown style={{marginTop: 10}} isOpen={this.state.dropDownDate}  toggle={() => this.toggleDropDown()}>
                <DropdownToggle
                  style={{
                    color: "#fff",
                    borderColor: "#fff",
                    backgroundColor: "#20a8d8"
                  }}
                  caret
                >
                  {this.state.dateRange}
                </DropdownToggle>
                <DropdownMenu>
                  <div >
                    <DateRange
                        onChange={this.handleRangeChange.bind(this, 'dateRangePicker')}
                        showSelectionPreview={true}
                        moveRangeOnFirstSelection={false}
                        className={'PreviewArea'}
                        months={1}
                        ranges={[this.state.dateRangePicker.selection]}
                        direction="horizontal"
                        maxDate={this.state.maxDate}
                    />
                  </div>
                    <div className="float-right">
                    {this.renderDateAction()}     
                    </div>
                </DropdownMenu>
              </UncontrolledDropdown>
            </CardBody>
          </Card>
        </Col>
      </Row>
    );
  }
}

export default Review;
