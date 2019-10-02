/* global google */

import React from "react";
import { Input} from "reactstrap"
import PropTypes from 'prop-types';
import Script from 'react-load-script';

class AutoCompleteAddress extends React.Component {
  constructor(props) {
    super(props);
    this.autocompleteInput = React.createRef();
    this.autocomplete = null;
    this.handlePlaceChanged = this.handlePlaceChanged.bind(this);
  }

  componentDidMount() {
    this.autocomplete = new google.maps.places.Autocomplete(
      this.autocompleteInput.current,
      { types: ["geocode"] }
    );
    this.autocomplete.addListener("place_changed", this.handlePlaceChanged);

    setTimeout(() => {
      this.autocomplete = new google.maps.places.Autocomplete(
        this.autocompleteInput.current,
        { types: ["geocode"] }
      );
      this.autocomplete.addListener("place_changed", this.handlePlaceChanged);
    }, 100);

  }

  handlePlaceChanged() {
    const place = this.autocomplete.getPlace();
    this.props.onPlaceChanged(place);
  }

  render() {
    const {
      borderRadius,
      borderTopLeftRadius,
      borderBottomLeftRadius,
      borderTopRightRadius,
      borderBottomRightRadius,
      borderColor,
      paddingLeft,
      paddingRight,
      paddingTop,
      paddingBottom,
      fontSize,
      color,
      height,
    } = this.props;

    const borderRadiusVal = borderRadius || 0;
    const borderTopLeftRadiusVal = borderTopLeftRadius || borderRadiusVal;
    const borderBottomLeftRadiusVal = borderBottomLeftRadius || borderRadiusVal;
    const borderTopRightRadiusVal = borderTopRightRadius || borderRadiusVal;
    const borderBottomRightRadiusVal = borderBottomRightRadius || borderRadiusVal;
    const borderColorVal = borderColor || 'gray';
    const paddingLeftVal = paddingLeft || 0;
    const paddingRightVal = paddingRight || 0;
    const paddingTopVal = paddingTop || 0;
    const paddingBottomVal = paddingBottom || 0;
  	const colorVal = color || 'black';
    const fontSizeVal = fontSize || 15;
    const heightVal = height || null;
  
    return (
      <input
        ref={this.autocompleteInput}
        placeholder="Search address"
        type="text"
        style={{ borderTopRightRadius: borderTopRightRadiusVal, borderBottomRightRadius: borderBottomRightRadiusVal, borderTopLeftRadius: borderTopLeftRadiusVal, borderBottomLeftRadius: borderBottomLeftRadiusVal, height: heightVal, borderWidth: 1, borderColor: borderColorVal, paddingLeft: paddingLeftVal, paddingRight: paddingRightVal, paddingTop: paddingTopVal, paddingBottom: paddingBottomVal, width: '100%', flex:1, display:'flex', fontSize: fontSizeVal, color: colorVal}} 
      />
    );
  }
}

AutoCompleteAddress.propTypes = {
  height: PropTypes.number,
  borderRadius: PropTypes.number,
  borderTopLeftRadius: PropTypes.number,
  borderBottomLeftRadius: PropTypes.number,
  borderTopRightRadius: PropTypes.number,
  borderBottomRightRadius: PropTypes.number,
  borderColor: PropTypes.string,
  paddingLeft: PropTypes.number,
  paddingRight: PropTypes.number,
  paddingTop: PropTypes.number,
  paddingBottom: PropTypes.number,
  fontSize: PropTypes.number,
  color: PropTypes.string,
};


export default AutoCompleteAddress;

