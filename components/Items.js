import React, { Component } from 'react';
import { View, Text, Image, StyleSheet, Switch, TouchableOpacity } from 'react-native';
import { withNavigation } from 'react-navigation';
// import CustomButton from './CustomButton'

class Items extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selected: false
    };
  }

  _handleMoveToBigPhotoScreen = () => {
    const { uri, width, height, id, itemWidth, getMediaData } = this.props

    const data = { uri, width, height, id, itemWidth };
    this.props.navigation.navigate("s4", { data, refresh: getMediaData })
  }

  render() {
    const { uri, width, height, id, itemWidth, handleSelectImageToRemove } = this.props
    let { selected } = this.state;
    return (
      <TouchableOpacity onLongPress={this._handleMoveToBigPhotoScreen} onPress={() => {
        this.setState({
          selected: !selected
        }, () => console.log(selected))
        handleSelectImageToRemove(id)
      }}>
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

          <View style={{ position: 'absolute', bottom: 0, right: 50, color: "#ffffff" }}>
            <Text>{id.charAt(id.length - 1)}</Text>
            <Text>{selected ? "zaznaczono" : "nope"}</Text>
          </View>
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
    backgroundColor: '#ffffff',
    // padding: 20,
    marginVertical: 8,
    marginHorizontal: 8,
  },
});
