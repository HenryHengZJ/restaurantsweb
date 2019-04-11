import React, { Component } from "react";
import {
  Button,
  Card,
  CardBody,
  CardFooter,
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
  FormFeedback
} from "reactstrap";
import NavBar from '../../../components/NavBar/NavBar';
import Footer from '../../../components/Footer/Footer';

class DeliveryConfirmation extends Component {
  constructor(props) {
    super(props);

    this.handlePhoneNumber = this.handlePhoneNumber.bind(this);
    this.handleName = this.handleName.bind(this);
    this.handleAddress1 = this.handleAddress1.bind(this);
    this.handleAddress2 = this.handleAddress2.bind(this);
    this.handleAddress3 = this.handleAddress3.bind(this);
    this.handleCounty = this.handleCounty.bind(this);
    this.handleNote = this.handleNote.bind(this);

    this.state = {
      phoneNumber: "",
      isPhoneNumberEmpty: false,
      name: "",
      isNameEmpty: false,
      address1: "",
      isAddressEmpty: false,
      address2: "",
      address3: "",
      county: "",
      note: "",
      isNextButtonActive: false
    };

    this.CountyData = ["Dublin", "Limerick", "Cork"];

    this.CountryData = [
      {
        code: "+7 840",
        value: "Abkhazia"
      },
      {
        code: "+93",
        value: "Afghanistan"
      },
      {
        code: "+355",
        value: "Albania"
      },
      {
        code: "+213",
        value: "Algeria"
      },
      {
        code: "+1 684",
        value: "American Samoa"
      },
      {
        code: "+376",
        value: "Andorra"
      },
      {
        code: "+244",
        value: "Angola"
      },
      {
        code: "+1 264",
        value: "Anguilla"
      },
      {
        code: "+1 268",
        value: "Antigua and Barbuda"
      },
      {
        code: "+54",
        value: "Argentina"
      },
      {
        code: "+374",
        value: "Armenia"
      },
      {
        code: "+297",
        value: "Aruba"
      },
      {
        code: "+247",
        value: "Ascension"
      },
      {
        code: "+61",
        value: "Australia"
      },
      {
        code: "+672",
        value: "Australian External Territories"
      },
      {
        code: "+43",
        value: "Austria"
      },
      {
        code: "+994",
        value: "Azerbaijan"
      },
      {
        code: "+1 242",
        value: "Bahamas"
      },
      {
        code: "+973",
        value: "Bahrain"
      },
      {
        code: "+880",
        value: "Bangladesh"
      },
      {
        code: "+1 246",
        value: "Barbados"
      },
      {
        code: "+1 268",
        value: "Barbuda"
      },
      {
        code: "+375",
        value: "Belarus"
      },
      {
        code: "+32",
        value: "Belgium"
      },
      {
        code: "+501",
        value: "Belize"
      },
      {
        code: "+229",
        value: "Benin"
      },
      {
        code: "+1 441",
        value: "Bermuda"
      },
      {
        code: "+975",
        value: "Bhutan"
      },
      {
        code: "+591",
        value: "Bolivia"
      },
      {
        code: "+387",
        value: "Bosnia and Herzegovina"
      },
      {
        code: "+267",
        value: "Botswana"
      },
      {
        code: "+55",
        value: "Brazil"
      },
      {
        code: "+246",
        value: "British Indian Ocean Territory"
      },
      {
        code: "+1 284",
        value: "British Virgin Islands"
      },
      {
        code: "+673",
        value: "Brunei"
      },
      {
        code: "+359",
        value: "Bulgaria"
      },
      {
        code: "+226",
        value: "Burkina Faso"
      },
      {
        code: "+257",
        value: "Burundi"
      },
      {
        code: "+855",
        value: "Cambodia"
      },
      {
        code: "+237",
        value: "Cameroon"
      },
      {
        code: "+1",
        value: "Canada"
      },
      {
        code: "+238",
        value: "Cape Verde"
      },
      {
        code: "+ 345",
        value: "Cayman Islands"
      },
      {
        code: "+236",
        value: "Central African Republic"
      },
      {
        code: "+235",
        value: "Chad"
      },
      {
        code: "+56",
        value: "Chile"
      },
      {
        code: "+86",
        value: "China"
      },
      {
        code: "+61",
        value: "Christmas Island"
      },
      {
        code: "+61",
        value: "Cocos-Keeling Islands"
      },
      {
        code: "+57",
        value: "Colombia"
      },
      {
        code: "+269",
        value: "Comoros"
      },
      {
        code: "+242",
        value: "Congo"
      },
      {
        code: "+243",
        value: "Congo, Dem. Rep. of (Zaire)"
      },
      {
        code: "+682",
        value: "Cook Islands"
      },
      {
        code: "+506",
        value: "Costa Rica"
      },
      {
        code: "+385",
        value: "Croatia"
      },
      {
        code: "+53",
        value: "Cuba"
      },
      {
        code: "+599",
        value: "Curacao"
      },
      {
        code: "+537",
        value: "Cyprus"
      },
      {
        code: "+420",
        value: "Czech Republic"
      },
      {
        code: "+45",
        value: "Denmark"
      },
      {
        code: "+246",
        value: "Diego Garcia"
      },
      {
        code: "+253",
        value: "Djibouti"
      },
      {
        code: "+1 767",
        value: "Dominica"
      },
      {
        code: "+1 809",
        value: "Dominican Republic"
      },
      {
        code: "+670",
        value: "East Timor"
      },
      {
        code: "+56",
        value: "Easter Island"
      },
      {
        code: "+593",
        value: "Ecuador"
      },
      {
        code: "+20",
        value: "Egypt"
      },
      {
        code: "+503",
        value: "El Salvador"
      },
      {
        code: "+240",
        value: "Equatorial Guinea"
      },
      {
        code: "+291",
        value: "Eritrea"
      },
      {
        code: "+372",
        value: "Estonia"
      },
      {
        code: "+251",
        value: "Ethiopia"
      },
      {
        code: "+500",
        value: "Falkland Islands"
      },
      {
        code: "+298",
        value: "Faroe Islands"
      },
      {
        code: "+679",
        value: "Fiji"
      },
      {
        code: "+358",
        value: "Finland"
      },
      {
        code: "+33",
        value: "France"
      },
      {
        code: "+596",
        value: "French Antilles"
      },
      {
        code: "+594",
        value: "French Guiana"
      },
      {
        code: "+689",
        value: "French Polynesia"
      },
      {
        code: "+241",
        value: "Gabon"
      },
      {
        code: "+220",
        value: "Gambia"
      },
      {
        code: "+995",
        value: "Georgia"
      },
      {
        code: "+49",
        value: "Germany"
      },
      {
        code: "+233",
        value: "Ghana"
      },
      {
        code: "+350",
        value: "Gibraltar"
      },
      {
        code: "+30",
        value: "Greece"
      },
      {
        code: "+299",
        value: "Greenland"
      },
      {
        code: "+1 473",
        value: "Grenada"
      },
      {
        code: "+590",
        value: "Guadeloupe"
      },
      {
        code: "+1 671",
        value: "Guam"
      },
      {
        code: "+502",
        value: "Guatemala"
      },
      {
        code: "+224",
        value: "Guinea"
      },
      {
        code: "+245",
        value: "Guinea-Bissau"
      },
      {
        code: "+595",
        value: "Guyana"
      },
      {
        code: "+509",
        value: "Haiti"
      },
      {
        code: "+504",
        value: "Honduras"
      },
      {
        code: "+852",
        value: "Hong Kong SAR China"
      },
      {
        code: "+36",
        value: "Hungary"
      },
      {
        code: "+354",
        value: "Iceland"
      },
      {
        code: "+91",
        value: "India"
      },
      {
        code: "+62",
        value: "Indonesia"
      },
      {
        code: "+98",
        value: "Iran"
      },
      {
        code: "+964",
        value: "Iraq"
      },
      {
        code: "+353",
        value: "Ireland"
      },
      {
        code: "+972",
        value: "Israel"
      },
      {
        code: "+39",
        value: "Italy"
      },
      {
        code: "+225",
        value: "Ivory Coast"
      },
      {
        code: "+1 876",
        value: "Jamaica"
      },
      {
        code: "+81",
        value: "Japan"
      },
      {
        code: "+962",
        value: "Jordan"
      },
      {
        code: "+7 7",
        value: "Kazakhstan"
      },
      {
        code: "+254",
        value: "Kenya"
      },
      {
        code: "+686",
        value: "Kiribati"
      },
      {
        code: "+965",
        value: "Kuwait"
      },
      {
        code: "+996",
        value: "Kyrgyzstan"
      },
      {
        code: "+856",
        value: "Laos"
      },
      {
        code: "+371",
        value: "Latvia"
      },
      {
        code: "+961",
        value: "Lebanon"
      },
      {
        code: "+266",
        value: "Lesotho"
      },
      {
        code: "+231",
        value: "Liberia"
      },
      {
        code: "+218",
        value: "Libya"
      },
      {
        code: "+423",
        value: "Liechtenstein"
      },
      {
        code: "+370",
        value: "Lithuania"
      },
      {
        code: "+352",
        value: "Luxembourg"
      },
      {
        code: "+853",
        value: "Macau SAR China"
      },
      {
        code: "+389",
        value: "Macedonia"
      },
      {
        code: "+261",
        value: "Madagascar"
      },
      {
        code: "+265",
        value: "Malawi"
      },
      {
        code: "+60",
        value: "Malaysia"
      },
      {
        code: "+960",
        value: "Maldives"
      },
      {
        code: "+223",
        value: "Mali"
      },
      {
        code: "+356",
        value: "Malta"
      },
      {
        code: "+692",
        value: "Marshall Islands"
      },
      {
        code: "+596",
        value: "Martinique"
      },
      {
        code: "+222",
        value: "Mauritania"
      },
      {
        code: "+230",
        value: "Mauritius"
      },
      {
        code: "+262",
        value: "Mayotte"
      },
      {
        code: "+52",
        value: "Mexico"
      },
      {
        code: "+691",
        value: "Micronesia"
      },
      {
        code: "+1 808",
        value: "Midway Island"
      },
      {
        code: "+373",
        value: "Moldova"
      },
      {
        code: "+377",
        value: "Monaco"
      },
      {
        code: "+976",
        value: "Mongolia"
      },
      {
        code: "+382",
        value: "Montenegro"
      },
      {
        code: "+1664",
        value: "Montserrat"
      },
      {
        code: "+212",
        value: "Morocco"
      },
      {
        code: "+95",
        value: "Myanmar"
      },
      {
        code: "+264",
        value: "Namibia"
      },
      {
        code: "+674",
        value: "Nauru"
      },
      {
        code: "+977",
        value: "Nepal"
      },
      {
        code: "+31",
        value: "Netherlands"
      },
      {
        code: "+599",
        value: "Netherlands Antilles"
      },
      {
        code: "+1 869",
        value: "Nevis"
      },
      {
        code: "+687",
        value: "New Caledonia"
      },
      {
        code: "+64",
        value: "New Zealand"
      },
      {
        code: "+505",
        value: "Nicaragua"
      },
      {
        code: "+227",
        value: "Niger"
      },
      {
        code: "+234",
        value: "Nigeria"
      },
      {
        code: "+683",
        value: "Niue"
      },
      {
        code: "+672",
        value: "Norfolk Island"
      },
      {
        code: "+850",
        value: "North Korea"
      },
      {
        code: "+1 670",
        value: "Northern Mariana Islands"
      },
      {
        code: "+47",
        value: "Norway"
      },
      {
        code: "+968",
        value: "Oman"
      },
      {
        code: "+92",
        value: "Pakistan"
      },
      {
        code: "+680",
        value: "Palau"
      },
      {
        code: "+970",
        value: "Palestinian Territory"
      },
      {
        code: "+507",
        value: "Panama"
      },
      {
        code: "+675",
        value: "Papua New Guinea"
      },
      {
        code: "+595",
        value: "Paraguay"
      },
      {
        code: "+51",
        value: "Peru"
      },
      {
        code: "+63",
        value: "Philippines"
      },
      {
        code: "+48",
        value: "Poland"
      },
      {
        code: "+351",
        value: "Portugal"
      },
      {
        code: "+1 787",
        value: "Puerto Rico"
      },
      {
        code: "+974",
        value: "Qatar"
      },
      {
        code: "+262",
        value: "Reunion"
      },
      {
        code: "+40",
        value: "Romania"
      },
      {
        code: "+7",
        value: "Russia"
      },
      {
        code: "+250",
        value: "Rwanda"
      },
      {
        code: "+685",
        value: "Samoa"
      },
      {
        code: "+378",
        value: "San Marino"
      },
      {
        code: "+966",
        value: "Saudi Arabia"
      },
      {
        code: "+221",
        value: "Senegal"
      },
      {
        code: "+381",
        value: "Serbia"
      },
      {
        code: "+248",
        value: "Seychelles"
      },
      {
        code: "+232",
        value: "Sierra Leone"
      },
      {
        code: "+65",
        value: "Singapore"
      },
      {
        code: "+421",
        value: "Slovakia"
      },
      {
        code: "+386",
        value: "Slovenia"
      },
      {
        code: "+677",
        value: "Solomon Islands"
      },
      {
        code: "+27",
        value: "South Africa"
      },
      {
        code: "+500",
        value: "South Georgia and the South Sandwich Islands"
      },
      {
        code: "+82",
        value: "South Korea"
      },
      {
        code: "+34",
        value: "Spain"
      },
      {
        code: "+94",
        value: "Sri Lanka"
      },
      {
        code: "+249",
        value: "Sudan"
      },
      {
        code: "+597",
        value: "Suriname"
      },
      {
        code: "+268",
        value: "Swaziland"
      },
      {
        code: "+46",
        value: "Sweden"
      },
      {
        code: "+41",
        value: "Switzerland"
      },
      {
        code: "+963",
        value: "Syria"
      },
      {
        code: "+886",
        value: "Taiwan"
      },
      {
        code: "+992",
        value: "Tajikistan"
      },
      {
        code: "+255",
        value: "Tanzania"
      },
      {
        code: "+66",
        value: "Thailand"
      },
      {
        code: "+670",
        value: "Timor Leste"
      },
      {
        code: "+228",
        value: "Togo"
      },
      {
        code: "+690",
        value: "Tokelau"
      },
      {
        code: "+676",
        value: "Tonga"
      },
      {
        code: "+1 868",
        value: "Trinidad and Tobago"
      },
      {
        code: "+216",
        value: "Tunisia"
      },
      {
        code: "+90",
        value: "Turkey"
      },
      {
        code: "+993",
        value: "Turkmenistan"
      },
      {
        code: "+1 649",
        value: "Turks and Caicos Islands"
      },
      {
        code: "+688",
        value: "Tuvalu"
      },
      {
        code: "+1 340",
        value: "U.S. Virgin Islands"
      },
      {
        code: "+256",
        value: "Uganda"
      },
      {
        code: "+380",
        value: "Ukraine"
      },
      {
        code: "+971",
        value: "United Arab Emirates"
      },
      {
        code: "+44",
        value: "United Kingdom"
      },
      {
        code: "+1",
        value: "United States"
      },
      {
        code: "+598",
        value: "Uruguay"
      },
      {
        code: "+998",
        value: "Uzbekistan"
      },
      {
        code: "+678",
        value: "Vanuatu"
      },
      {
        code: "+58",
        value: "Venezuela"
      },
      {
        code: "+84",
        value: "Vietnam"
      },
      {
        code: "+1 808",
        value: "Wake Island"
      },
      {
        code: "+681",
        value: "Wallis and Futuna"
      },
      {
        code: "+967",
        value: "Yemen"
      },
      {
        code: "+260",
        value: "Zambia"
      },
      {
        code: "+255",
        value: "Zanzibar"
      },
      {
        code: "+263",
        value: "Zimbabwe"
      }
    ];
  }

  handlePhoneNumber(e) {
    if (isNaN(e.target.value)) {
      //Letters
    } else {
      //Valid Number
      this.setState(
        {
          phoneNumber: e.target.value,
          isPhoneNumberEmpty: e.target.value === "" ? true : false
        },
        () => {
          this.checkAllInput();
        }
      );
    }
  }

  handleName(e) {
    this.setState(
      {
        name: e.target.value,
        isNameEmpty: e.target.value === "" ? true : false
      },
      () => {
        this.checkAllInput();
      }
    );
  }

  handleAddress1(e) {
    this.setState(
      {
        address1: e.target.value,
        isAddressEmpty: e.target.value === "" ? true : false
      },
      () => {
        this.checkAllInput();
      }
    );
  }

  handleAddress2(e) {
    this.setState({ address2: e.target.value });
  }

  handleAddress3(e) {
    this.setState({ address3: e.target.value });
  }

  handleCounty(e) {
    this.setState(
      {
        county: e.target.value
      },
      () => {
        this.checkAllInput();
      }
    );
  }

  handleNote(e) {
    this.setState({ note: e.target.value });
  }

  signIn(e) {
    e.preventDefault();
    this.props.history.push("/login");
  }

  checkAllInput = () => {
    const {
      phoneNumber,
      name,
      address1,
      address2,
      address3,
      county,
      note
    } = this.state;
    if (
      phoneNumber !== "" &&
      name !== "" &&
      address1 !== "" &&
      county !== "" 
    ) {
      //Activate Next Button
      this.setState({
        isNextButtonActive: true
      });
    } else {
      this.setState({
        isNextButtonActive: false
      });
    }
  };

  render() {
    return (
      <div style={{ backgroundColor: "white" }}>
         <NavBar signIn={e=>this.signIn(e)}/>
        <div className="app justify-content-center align-items-center">
          <Container>
            <Row
              style={{ marginTop:30, flex: 1, display: "flex" }}
              className="justify-content-center"
            >
              <Col md="9" lg="7" xl="6">
                <Card
                  style={{ boxShadow: "1px 1px 3px #9E9E9E" }}
                  className="p-4"
                >
                  <CardBody className="p-4">
                    <Form>
                      <h2>Delivery Confirmation</h2>
                      <div style={{ marginTop: 30 }} />
                      <FormGroup style={{ marginTop: 10 }}>
                        <h6>Name*</h6>
                        <Input
                          value={this.state.name}
                          onChange={e => this.handleName(e)}
                          type="text"
                          placeholder="Name"
                          autoComplete="name"
                          invalid={this.state.isNameEmpty ? true : false}
                        />
                        <FormFeedback className="help-block">
                          Please enter your name
                        </FormFeedback>
                      </FormGroup>
                      <FormGroup style={{ marginTop: 10 }}>
                        <h6>Phone*</h6>
                        <Input
                          value={this.state.phoneNumber}
                          onChange={e => this.handlePhoneNumber(e)}
                          type="phone"
                          placeholder="Phone Number"
                          autoComplete="phone"
                          invalid={this.state.isPhoneEmpty ? true : false}
                        />
                        <FormFeedback className="help-block">
                          Please enter your phone number
                        </FormFeedback>
                      </FormGroup>
                      <FormGroup style={{ marginTop: 10 }}>
                        <h6>Address*</h6>
                        <Input
                          value={this.state.address1}
                          onChange={e => this.handleAddress1(e)}
                          type="text"
                          placeholder="Address line 1"
                          autoComplete="address1"
                          invalid={this.state.isAddressEmpty ? true : false}
                        />
                        <FormFeedback className="help-block">
                          Please enter your address
                        </FormFeedback>
                        <Input
                          value={this.state.address2}
                          onChange={e => this.handleAddress2(e)}
                          style={{ marginTop: 10 }}
                          type="text"
                          placeholder="Address line 2 (optional)"
                          autoComplete="address2"
                        />
                        <Input
                          value={this.state.address3}
                          onChange={e => this.handleAddress3(e)}
                          style={{ marginTop: 10 }}
                          type="text"
                          placeholder="Address line 3 (optional)"
                          autoComplete="address3"
                        />
                      </FormGroup>
                      <FormGroup style={{ marginTop: 10 }}>
                        <h6>Town / County*</h6>
                        <Input
                          value={this.state.county}
                          onChange={e => this.handleCounty(e)}
                          type="select"
                          placeholder="County"
                          autoComplete="county"
                        >
                          <option value="" disabled>
                            Select County
                          </option>
                          {this.CountyData.map(county => (
                            <option
                              style={{ color: "black" }}
                              key={county}
                              value={county}
                            >
                              {county}
                            </option>
                          ))}
                        </Input>
                      </FormGroup>
                      <FormGroup style={{ marginTop: 10 }}>
                        <h6>Special note</h6>
                        <Input
                          value={this.state.note}
                          onChange={e => this.handleNote(e)}
                          rows="3"
                          type="textarea"
                          placeholder="Include special note to caterer when delivery arrives. Eg: ask for Kenny at reception."
                          autoComplete="note"
                        />
                      </FormGroup>
                      <Button
                        style={{
                          paddingTop: 10,
                          paddingBottom: 10,
                          marginTop: 20
                        }}
                        color="success"
                        block
                        disabled={this.state.isNextButtonActive ? false : true}
                      >
                        Continue
                      </Button>
                    </Form>
                  </CardBody>
                </Card>
              </Col>
            </Row>
          </Container>
        </div>
        <Footer />
      </div>
    );
  }
}

export default DeliveryConfirmation;
