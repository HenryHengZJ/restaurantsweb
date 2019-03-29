/* global google */

import React from "react";
import { Input} from "reactstrap"
import PropTypes from 'prop-types';


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
  }

  handlePlaceChanged() {
    const place = this.autocomplete.getPlace();
    this.props.onPlaceChanged(place);
  }

  render() {
    const {
      borderRadius,
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
        id="autocomplete"
        placeholder="Enter delivery address"
        type="text"
        style={{ height: heightVal, borderWidth: 1, borderRadius: borderRadiusVal, borderColor: borderColorVal, paddingLeft: paddingLeftVal, paddingRight: paddingRightVal, paddingTop: paddingTopVal, paddingBottom: paddingBottomVal, width: '100%', flex:1, display:'flex', fontSize: fontSizeVal, color: colorVal}} 
      />
    );
  }
}

AutoCompleteAddress.propTypes = {
  height: PropTypes.number,
  borderRadius: PropTypes.number,
  borderColor: PropTypes.string,
  paddingLeft: PropTypes.number,
  paddingRight: PropTypes.number,
  paddingTop: PropTypes.number,
  paddingBottom: PropTypes.number,
  fontSize: PropTypes.number,
  color: PropTypes.string,
};


export default AutoCompleteAddress;

