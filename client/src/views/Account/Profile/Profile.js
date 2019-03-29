import React, { Component } from "react";
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
  Row
} from "reactstrap";

class Profile extends Component {
  constructor(props) {
    super(props);

    this.handleEmailChange = this.handleEmailChange.bind(this);

    this.state = {
      emailaddress: "hzj94@hotmail.com",
      password: "1132444",
      isChangePasswordClicked: false
    };
  }

  handleEmailChange(e) {
    this.setState({
      emailaddress: e.target.value
    });
  }

  saveChangesClicked = () => {
    alert(this.state.emailaddress);
  };

  passwordChangesClicked = () => {
    this.setState({
      isChangePasswordClicked: true
    });
  };

  okClicked = () => {
    this.props.history.push("/caterer/dashboard");
  };

  renderEmailSent() {
    return (
      <Card>
        <CardHeader>
          <strong>Email Sent</strong>
        </CardHeader>
        <CardBody>
          <Label>
            We have sent an email of the steps to change your password.
          </Label>
        </CardBody>
        <CardFooter>
          <Button
            onClick={() => this.okClicked()}
            className="float-right"
            type="submit"
            color="primary"
          >
            OK
          </Button>
        </CardFooter>
      </Card>
    );
  }

  render() {
    return (
      <div className="animated fadeIn">
        <Row className="justify-content-center">
          <Col xs="12" md="6">
            {this.state.isChangePasswordClicked ? (
              this.renderEmailSent()
            ) : (
              <Card>
                <CardHeader>
                  <strong>Profile</strong>
                </CardHeader>
                <CardBody>
                  <Form action="" method="post" className="form-horizontal">
                    <FormGroup row>
                      <Col md="3">
                        <Label htmlFor="hf-email">Email</Label>
                      </Col>
                      <Col xs="12" md="9">
                        <Input style={{color: 'black'}}
                          type="email"
                          id="hf-email"
                          name="hf-email"
                          placeholder="Enter Email..."
                          autoComplete="email"
                          value={this.state.emailaddress}
                          onChange={e => {
                            this.handleEmailChange(e);
                          }}
                        />
                      </Col>
                    </FormGroup>
                    <FormGroup row>
                      <Col md="3">
                        <Label htmlFor="hf-password">Password</Label>
                      </Col>
                      <Col xs="12" md="9">
                        <Input
                          type="password"
                          id="hf-password"
                          name="hf-password"
                          placeholder="Enter Password..."
                          autoComplete="current-password"
                          value={this.state.password}
                          disabled
                        />
                        <Button
                          onClick={() => this.passwordChangesClicked()}
                          className="text-left"
                          color="ghost-primary"
                          color="link"
                        >
                          Change Password
                        </Button>
                      </Col>
                    </FormGroup>
                  </Form>
                </CardBody>
                <CardFooter>
                  <Button
                    style={{ marginLeft: 10 }}
                    className="float-right"
                    type="reset"
                    color="secondary"
                  >
                    Cancel
                  </Button>
                  <Button
                    onClick={() => this.saveChangesClicked()}
                    className="float-right"
                    type="submit"
                    color="primary"
                  >
                    Save
                  </Button>
                </CardFooter>
              </Card>
            )}
          </Col>
        </Row>
      </div>
    );
  }
}

export default Profile;
