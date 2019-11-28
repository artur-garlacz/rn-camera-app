import React, { Component } from 'react';
import { View, Text, TouchableOpacity, BackHandler, ToastAndroid } from 'react-native';
import * as Permissions from "expo-permissions";
import { Camera } from 'expo-camera';
import * as MediaLibrary from "expo-media-library";
import { Ionicons, Feather, EvilIcons, MaterialIcons } from '@expo/vector-icons';
import AnimatedOptions from './AnimatedOptions';
import { isUserWhitespacable } from '@babel/types';

class CameraScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      hasCameraPermission: null,         // przydzielone uprawnienia do kamery
      type: Camera.Constants.Type.back,  // typ kamery
      camera: false,
      isOpenOptionPanel: true,
      whiteBalance: "auto",
      whiteBalanceList: [],
      flashModeList: [],
      ratiosList: [{ name: "4:3", selected: false, type: 'r' }, { name: "16:9", selected: true, type: 'r' }]
    };
  }

  componentDidMount = async () => {
    let { status } = await Permissions.askAsync(Permissions.CAMERA);
    BackHandler.addEventListener('hardwareBackPress', this.handleBackPress);
    this.setState({
      hasCameraPermission: status == 'granted',
      camera: true
    });
  }

  componentWillUnmount() {
    BackHandler.removeEventListener('hardwareBackPress', this.handleBackPress);
  }

  handleBackPress = () => {
    this.props.navigation.state.params.refresh()
    this.props.navigation.goBack()
    return true;
  }

  _handleSelectCameraOption = (value, type) => {
    console.log(value, type)
    let { whiteBalanceList, flashModeList, ratiosList } = this.state;
    switch (type) {
      case "wb":
        let list = whiteBalanceList.map((item, key) => {
          if (value === item.name) {
            item.selected = true
            return item
          }
          item.selected = false
          return item
        })
        console.log(list)
        this.setState({
          ...this.state,
          whiteBalance: value,
          whiteBalanceList: list
        })
        return list
    }

  }

  _changeCamera = () => {
    this.setState({
      ...this.state,
      type: this.state.type === Camera.Constants.Type.back
        ? Camera.Constants.Type.front
        : Camera.Constants.Type.back,
    });
  }

  _handlaChangeHidden = () => {
    let { isOpenOptionPanel } = this.state;
    this.setState({
      isOpenOptionPanel: !isOpenOptionPanel
    }, () => console.log(isOpenOptionPanel))
  }

  _handleTakePhoto = async () => {
    if (this.camera) {
      let foto = await this.camera.takePictureAsync();
      let asset = await MediaLibrary.createAssetAsync(foto.uri); // domyslnie zapisuje w DCIM
      // alert(JSON.stringify(asset, null, 4))
      ToastAndroid.showWithGravity(
        'Zrobiono zdjęcie',
        ToastAndroid.SHORT,
        ToastAndroid.CENTER
      );

      this.props.navigation.state.params.refresh()
      // this.props.navigation.goBack();
    }
  }

  _getSizes = async () => {
    if (this.camera) {
      const sizes = await this.camera.getAvailablePictureSizesAsync(ratio)
      alert(JSON.stringify(sizes, null, 4))
    }
  };

  _renderCameraScreen = () => {
    let { hasCameraPermission, isOpenOptionPanel, whiteBalanceList, flashModeList, ratiosList, whiteBalance } = this.state; // podstawienie zmiennej ze state
    if (hasCameraPermission == null) {
      return <View />;
    } else if (hasCameraPermission == false) {
      return <Text>brak dostępu do kamery</Text>;
    } else {
      return (
        <View style={{ flex: 1 }}>
          <Camera
            ref={ref => {
              this.camera = ref; // Uwaga: referencja do kamery używana później
            }}
            onCameraReady={() => {
              // console.log(Camera.Constants.WhiteBalance)
              const wb = Camera.Constants.WhiteBalance
              const fm = Camera.Constants.FlashMode;
              whiteBalanceList = Object.keys(wb).map(e => {
                return { name: e, selected: false, type: 'wb' };
              })

              flashModeList = Object.keys(fm).map(e => {
                return { name: e, selected: false, type: 'fm' };
              });
              // this._getSizes()
              this.setState({
                ...this.state,
                whiteBalanceList,
                flashModeList
              })
              // console.log(splitObject)
            }}
            whiteBalance={whiteBalance}
            style={{ flex: 1 }}
            type={this.state.type}>
            <View style={{ flex: 1 }}>
              {/* tutaj wstaw buttony do obsługi kamery */}
              <View style={{ position: 'absolute', height: '20%', bottom: 0, right: 0, left: 0, display: 'flex', flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>
                <View>
                  <TouchableOpacity onPress={this._changeCamera}>
                    <MaterialIcons name="refresh" size={64} color="white" />
                  </TouchableOpacity>
                </View>
                <View>
                  <TouchableOpacity onPress={this._handleTakePhoto}>
                    <EvilIcons name="plus" size={128} color="white" />
                  </TouchableOpacity>
                </View>
                <View>
                  <TouchableOpacity onPress={this._handlaChangeHidden}>
                    <Ionicons name="ios-settings" size={64} color="white" />
                  </TouchableOpacity>
                </View>
              </View>
            </View>
          </Camera>
          <AnimatedOptions
            isHidden={isOpenOptionPanel}
            handleSelectCameraOption={this._handleSelectCameraOption}
            whiteBalanceList={whiteBalanceList}
            flashModeList={flashModeList}
            ratiosList={ratiosList}
          />

        </View>
      );
    }
  }

  render() {
    return this._renderCameraScreen();
  }
}

export default CameraScreen;
