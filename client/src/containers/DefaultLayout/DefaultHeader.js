import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Badge, DropdownItem, DropdownMenu, DropdownToggle, Nav, NavItem, NavLink, Label } from 'reactstrap';
import PropTypes from 'prop-types';

import { AppAsideToggler, AppHeaderDropdown, AppNavbarBrand, AppSidebarToggler } from '@coreui/react';

const propTypes = {
  children: PropTypes.node,
};

const defaultProps = {};

class DefaultHeader extends Component {
  render() {

    // eslint-disable-next-line
    const { children, ...attributes } = this.props;

    return (
      <React.Fragment>
        <AppSidebarToggler className="d-lg-none" display="md" mobile />
        <AppNavbarBrand>
          <img style={{objectFit: 'cover', height: 50, width: 160, marginLeft: 20, marginTop: 10}} src={require('../../assets/img/brandlogo_light.png')}/>

        </AppNavbarBrand>
        <AppSidebarToggler className="d-md-down-none" display="lg" />

        
        <Nav className="ml-auto" navbar>
          <NavItem className="d-md-down-none">
            <NavLink href="#"><i className="icon-bell"></i><Badge pill color="danger">5</Badge></NavLink>
          </NavItem>

          <NavItem className="d-md-down-none">
            <Label style={{marginTop: 5, marginLeft: 10, marginRight: 10}} className="h5">Flannery Restaurant</Label>
          </NavItem>
          
          <AppHeaderDropdown style={{marginRight: 20}} direction="down">
            <DropdownToggle nav>
              <img src={'https://www.brandcrowd.com/gallery/brands/pictures/picture14867764381797.png'} className="img-avatar" alt="admin@bootstrapmaster.com" />
              <i className="fa fa-chevron-down fa-1x" />
            </DropdownToggle>
            <DropdownMenu right style={{ right: 'auto' }}>
              <DropdownItem onClick={e => this.props.onProfileClicked(e)}><i className="fa fa-user"></i> Profile</DropdownItem>
              <DropdownItem><i className="fa fa-usd"></i> Billings</DropdownItem>
              <DropdownItem><i className="fa fa-shield"></i> Terms & Conditions</DropdownItem>
              <DropdownItem onClick={e => this.props.onLogout(e)}><i className="fa fa-lock"></i> Logout</DropdownItem>
            </DropdownMenu>
          </AppHeaderDropdown>
        </Nav>
        
      </React.Fragment>
    );
  }
}

DefaultHeader.propTypes = propTypes;
DefaultHeader.defaultProps = defaultProps;

export default DefaultHeader;
