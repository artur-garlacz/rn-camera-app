import React, { Component } from 'react';
import { View, Text, Image, StyleSheet, Switch, TouchableOpacity } from 'react-native';
import { withNavigation } from 'react-navigation';
// import CustomButton from './CustomButton'

class Items extends Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }

  _handleMoveToBigPhotoScreen = () => {
    const { uri, width, height, id, itemWidth } = this.props
    const data = { uri, width, height, id, itemWidth };
    this.props.navigation.navigate("s4", { uri, width, height, id, itemWidth })
  }

  render() {
    const { uri, width, height, id, itemWidth } = this.props
    return (
      <TouchableOpacity onPress={this._handleMoveToBigPhotoScreen}>
        <View style={{ ...styles.item, width: itemWidth, height: itemWidth }}>
          <Image
            style={{
              width: itemWidth,
              height: itemWidth,
              // marginTop: 30,
              // marginBottom: 30,
            }}
            resizeMode="stretch"
            source={{ uri }}
          />
          <Text>{id}</Text>
        </View>
      </TouchableOpacity>
    );
  }
}

export default withNavigation(Items);


const styles = StyleSheet.create({
  container: {
    flex: 1,
    // display: 'flex',
    // flexDirection: 'column',
    // justifyContent: 'flex-start',
    // alignItems: 'center',
    // maxHeight: 200,
    backgroundColor: 'red',

  },
  item: {
    backgroundColor: '#f9c2ff',
    // padding: 20,
    // marginVertical: 8,
    // marginHorizontal: 16,
  },
});
