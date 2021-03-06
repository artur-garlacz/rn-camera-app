import React, { Component } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import PropTypes from 'prop-types';


class CustomButton extends Component {
  constructor(props) {
    super(props);
    this.state = {

    };
  }

  render() {
    const { text,handleClick, value } = this.props
    return (
      <View>
        <TouchableOpacity onPress={()=> handleClick()}>
          <Text style={{ fontSize: 20, textTransform: 'uppercase' }}> {text} </Text>
        </TouchableOpacity>
      </View>
    );
  }
}

export default CustomButton;

CustomButton.propTypes = {
  text: PropTypes.string.isRequired,
  handleClick: PropTypes.func.isRequired,
};