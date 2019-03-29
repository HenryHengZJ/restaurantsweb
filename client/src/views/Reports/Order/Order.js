import React, { Component } from "react";
import {
  Badge,
  Card,
  CardBody,
  CardHeader,
  Col,
  Pagination,
  PaginationItem,
  PaginationLink,
  Row,
  Table,
  Button,
  Label,
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownToggle,
  UncontrolledDropdown
} from "reactstrap";
import { Bar, Doughnut, Line, Pie, Polar, Radar } from "react-chartjs-2";
import { CustomTooltips } from "@coreui/coreui-plugin-chartjs-custom-tooltips";
import moment from "moment";
import "./Order.css";
import 'react-date-range/dist/styles.css'; // main style file
import 'react-date-range/dist/theme/default.css'; // theme css file
import { DateRangePicker, DateRange } from 'react-date-range';
import { format, addDays, subDays } from 'date-fns';


const options = {
  tooltips: {
    enabled: false,
    custom: CustomTooltips
  },
  scales: {
    yAxes: [{
      ticks: {
        beginAtZero: true,
        min: 0
      }    
    }]
  },
  maintainAspectRatio: false
};

class Order extends Component {
  constructor(props) {
    super(props);

    this.tableClicked = this.tableClicked.bind(this);
    this.linechartClicked = this.linechartClicked.bind(this);
    this.barchartClicked = this.barchartClicked.bind(this);
    this.selectDateRange = this.selectDateRange.bind(this)

    this.state = {
      isTablePressed: true,
      isLineChartPressed: false,
      isBarChartPressed: false,
      maxDate: null,
      currentDate: null,
      previousDate: null,
      dropDownDate: false,
      dropDownStatus: false,
      dropDownType: false,
      dateRangePicker: {
        selection: {
          startDate: new Date(),
          endDate: subDays(new Date(), 7),
          key: 'selection',
        },
      },
      dateRange: '',
      line: {
        labels: [],
        datasets: [
          {
            label: "Total orders",
            fill: false,
            backgroundColor: "rgba(75,192,192,0.4)",
            borderColor: "rgba(75,192,192,1)",
            borderWidth: 2,
            pointHoverBackgroundColor: "rgba(75,192,192,1)",
            data: [0, 15, 0, 0, 5, 10, 7, 2]
          }
        ]
      },
      bar: {
        labels: [],
        datasets: [
          {
            label: "Total orders",
            backgroundColor: "rgba(255,99,132,0.2)",
            borderColor: "rgba(255,99,132,1)",
            borderWidth: 1,
            hoverBackgroundColor: "rgba(255,99,132,0.4)",
            hoverBorderColor: "rgba(255,99,132,1)",
            data: [0, 15, 0, 0, 5, 10, 7, 2]
          }
        ]
      },
      items: [
        {
          ordereditem: "Chicken Masala",
          dishtype: "single",
          ordertype: "delivery",
          minimumquantity: "10",
          totalquantity: "12",
          serveperunit: "1",
          priceperunit: "8.00",
          additionalcharge: "2.50",
          deliveryfee: "3.00",
          totalprice: "101.50"
        },
        {
          ordereditem: "Sandwich Platter",
          dishtype: "bulk",
          ordertype: "pickup",
          minimumquantity: "1",
          totalquantity: "4",
          serveperunit: "10",
          priceperunit: "24.00",
          additionalcharge: "0.50",
          deliveryfee: "3.00",
          totalprice: "99.50"
        }
      ],
      tableitems: [
        {
          orderID: "334567",
          time: "29 Aug, 2018, 4:35PM",
          orderitems: [
            {
              title: "Chicken Masala Platter",
              quantity: "2"
            },
            {
              title: "Fish & Chips Catering",
              quantity: "2"
            }
          ],
          totalprice: "89.00",
          ordertype: "Delivery",
          status: "pending"
        },
        {
          orderID: "111423",
          time: "27 Aug, 2018, 8:20PM",
          orderitems: [
            {
              title: "Tan tan chicken",
              quantity: "1"
            }
          ],
          totalprice: "25.99",
          ordertype: "Delivery",
          status: "accepted"
        },
        {
          orderID: "178123",
          time: "26 Aug, 2018, 11:37AM",
          orderitems: [
            {
              title: "Pasta Chili",
              quantity: "1"
            }
          ],
          totalprice: "15.00",
          ordertype: "Pickup",
          status: "accepted"
        },
        {
          orderID: "178123",
          time: "21 Aug, 2018, 5:35PM",
          orderitems: [
            {
              title: "Sandwich Trio Platter",
              quantity: "1"
            },
            {
              title: "Croissant Combo",
              quantity: "3"
            }
          ],
          totalprice: "65.50",
          ordertype: "Pickup",
          status: "rejected"
        },
        {
          orderID: "775421",
          time: "20 Aug, 2018, 7:21PM",
          orderitems: [
            {
              title: "Irish Sunrise Breakfast",
              quantity: "2"
            },
          ],
          totalprice: "25.00",
          ordertype: "Pickup",
          status: "cancelled"
        }
      ]
    };
  }

  componentDidMount() {
    var currentDate = moment().toDate();
    var previousDate = this.getPreviousDate(currentDate, 7);

    var currentDateString = moment(currentDate).format("DD MMM, YYYY")
    var previousDateString = moment(previousDate).format("DD MMM, YYYY")
    var finalSelectionDate = previousDateString + ' - ' + currentDateString
    var finalDateArray = this.getIntervalDates(currentDate, previousDate).reverse();
    var newline = this.state.line;
    newline.labels = finalDateArray;
    var newbar = this.state.bar;
    newbar.labels = finalDateArray;

    this.setState({
      maxDate: currentDate,
      currentDate: currentDate,
      previousDate: previousDate,
      dateRange: finalSelectionDate,
      line: newline,
      bar: newbar,
    });
  }

  toggleDropDown = () => {
    this.setState({
      dropDownDate: !this.state.dropDownDate
    })
  }

  toggleStatus = () => {
    this.setState({
      dropDownStatus: !this.state.dropDownStatus
    })
  }

  toggleType = () => {
    this.setState({
      dropDownType: !this.state.dropDownType
    })
  }

  getPreviousDate = (currentDate, days) => {
    return moment(currentDate).subtract(days, "days");
  };

  getIntervalDates = (startDate, stopDate) => {
    var dateArray = [];
    var currentDate = startDate;
    var endDate = stopDate;
    while (currentDate >= endDate) {
      dateArray.push(moment(currentDate).format("DD MMM, YYYY"));
      currentDate = moment(currentDate).subtract(1, "days");
    }
    return dateArray;
  };

  handleRangeChange(which, payload) {
    this.setState({
      [which]: {
        ...this.state[which],
        ...payload,
      },
    });
  }

  selectDateRange() {
    var startDate = moment(this.state.dateRangePicker.selection.startDate).format("DD MMM, YYYY")
    var endDate = moment(this.state.dateRangePicker.selection.endDate).format("DD MMM, YYYY")
    var finalDate = startDate + ' - ' + endDate
    var finalDateArray = this.getIntervalDates(this.state.dateRangePicker.selection.endDate, this.state.dateRangePicker.selection.startDate).reverse();
    var newline = this.state.line;
    newline.labels = finalDateArray;
    var newbar = this.state.bar;
    newbar.labels = finalDateArray;

    this.setState({
      dateRange: finalDate,
      dropDownDate: !this.state.dropDownDate,
      currentDate: this.state.dateRangePicker.selection.endDate,
      previousDate: this.state.dateRangePicker.selection.startDate,
      line: newline,
      bar: newbar
    })
  }

  tableClicked() {
    this.setState({
      isTablePressed: true,
      isLineChartPressed: false,
      isBarChartPressed: false
    });
  }

  linechartClicked() {
    this.setState({
      isTablePressed: false,
      isLineChartPressed: true,
      isBarChartPressed: false,
    });
  }

  barchartClicked() {
    this.setState({
      isTablePressed: false,
      isLineChartPressed: false,
      isBarChartPressed: true,
    });
  }

  renderLineChart() {
    return <Line data={this.state.line} options={options} />;
  }

  renderBarChart() {
    return <Bar data={this.state.bar} options={options} />;
  }

  renderDateAction() {
    return (
      <Row style={{marginBottom: 10, marginRight: 10}}>
        <Col>
        
        <Button
          style={{ marginLeft: 10 }}
          outline
          color="primary"
          onClick={this.selectDateRange}
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

  renderPendingAction() {
    return (
      <Row>
        <Button
          style={{ marginLeft: 10 }}
          className="float-right"
          color="success"
          onClick={this.tableClicked}
        >
          Accept
        </Button>
        <Button
          style={{ marginLeft: 10 }}
          className="float-right"
          color="danger"
          onClick={this.linechartClicked}
        >
          Reject
        </Button>
      </Row>
    );
  }

  renderRejectAction() {
    return (
      <Row>
        <Button
          style={{ marginLeft: 10 }}
          className="float-right"
          color="secondary"
          onClick={this.tableClicked}
        >
          Reject
        </Button>
      </Row>
    );
  }

  renderAcceptAction() {
    return (
      <Row>
        <Button
          style={{ marginLeft: 10 }}
          className="float-right"
          color="secondary"
          onClick={this.tableClicked}
        >
          Accept
        </Button>
      </Row>
    );
  }

  renderOrderItems(index) {
    var orderitemarray = [];

    var orderitems = this.state.tableitems[index].orderitems;

    for (let i = 0; i < orderitems.length; i++) {
      orderitemarray.push(
        <Row>
          <Label>
            {orderitems[i].quantity} x {orderitems[i].title}
          </Label>
        </Row>
      );
    }

    return <td>{orderitemarray}</td>;
  }

  renderTableItems() {
    var itemarray = [];

    var tableitems = this.state.tableitems;

    for (let i = 0; i < tableitems.length; i++) {
      itemarray.push(
        <tr>
          <td>{tableitems[i].orderID}</td>
          <td>{tableitems[i].time}</td>
          {this.renderOrderItems(i)}
          <td>{tableitems[i].totalprice}</td>
          <td>{tableitems[i].ordertype}</td>
          <td>
            <Badge
              color=
              {
                  tableitems[i].status === "pending"
                  ? "warning"
                  : tableitems[i].status === "accepted"
                  ? "success"
                  : tableitems[i].status === "rejected"
                  ? "danger"
                  : "secondary"
              }
            >
              {tableitems[i].status}
            </Badge>
          </td>
          <td>
            {tableitems[i].status === "pending"
              ? this.renderPendingAction()
              : tableitems[i].status === "accepted"
              ? this.renderRejectAction()
              : tableitems[i].status === "rejected"
              ? this.renderRejectAction()
              : null}
          </td>
        </tr>
      );
    }

    return <tbody>{itemarray}</tbody>;
  }

  renderTable() {
    return (
      <Table striped responsive>
        <thead>
          <tr>
            <th>Order ID</th>
            <th>Time</th>
            <th>Items</th>
            <th>Price (€)</th>
            <th>
              <Row style={{marginLeft: 0}}> 
                Type
                <Dropdown isOpen={this.state.dropDownType} toggle={() => this.toggleType()} size="sm">
                  <DropdownToggle style={{margin:0, padding:0, paddingRight: 5, backgroundColor: 'white', borderWidth: 0}} caret />
                  <DropdownMenu>
                    <DropdownItem onClick={() => alert('Delivery Clicked')}>Delivery</DropdownItem>
                    <DropdownItem onClick={() => alert('Pickup Clicked')}>Pickup</DropdownItem>
                  </DropdownMenu>
                </Dropdown>
              </Row>
            </th>
            <th>
              <Row style={{marginLeft: 0}}> 
                Status
                <Dropdown isOpen={this.state.dropDownStatus} toggle={() => this.toggleStatus()} size="sm">
                  <DropdownToggle style={{margin:0, padding:0, paddingRight: 5, backgroundColor: 'white', borderWidth: 0}} caret />
                  <DropdownMenu>
                    <DropdownItem onClick={() => alert('Pending Clicked')}>Pending</DropdownItem>
                    <DropdownItem onClick={() => alert('Accepted Clicked')}>Accepted</DropdownItem>
                    <DropdownItem onClick={() => alert('Rejected Clicked')}>Rejected</DropdownItem>
                  </DropdownMenu>
                </Dropdown>
              </Row>
            </th>
            <th>Action</th>
          </tr>
        </thead>

        {this.renderTableItems()}
      </Table>
    );
  }

  render() {
    const {
      isTablePressed,
      isLineChartPressed,
      isBarChartPressed
    } = this.state;

    return (
      <div className="animated fadeIn">
        <Row>
          <Col>
            <Card>
              <CardHeader>
                <Row >
                  <Col>
                    <Label style={{ marginTop: 10 }} className="h6">
                      Orders
                    </Label>
                  </Col>
                  <Button
                    style={{  backgroundColor: isTablePressed ? null : 'white', borderRightWidth: 0 }}
                    active={isTablePressed}
                    outline
                    className="btn-square float-right"
                    color="primary"
                    onClick={this.tableClicked}
                  >
                    <i style={{marginRight: 5}} className="fa fa-table" />
                    Table
                  </Button>
                  <Button
                    style={{ backgroundColor: isLineChartPressed ? null : 'white', borderRightWidth: 0 }}
                    active={isLineChartPressed}
                    outline
                    className="btn-square float-right"
                    color="primary"
                    onClick={this.linechartClicked}
                  >
                    <i style={{marginRight: 5}} className="fa fa-line-chart" />
                    Line
                  </Button>
                  <Button
                    style={{ backgroundColor: isBarChartPressed ? null : 'white',  marginRight: 10 }}
                    active={isBarChartPressed}
                    outline
                    className="btn-square float-right"
                    color="primary"
                    onClick={this.barchartClicked}
                  >
                    <i style={{marginRight: 5}} className="fa fa-bar-chart" />
                    Bar
                  </Button>
                </Row>
              </CardHeader>
              <CardBody>
                <div class="table-wrapper-scroll-y my-custom-scrollbar">
                  {isTablePressed
                    ? this.renderTable()
                    : isLineChartPressed
                    ? this.renderLineChart()
                    : this.renderBarChart()}
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
                         months={2}
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
      </div>
    );
  }
}

export default Order;
