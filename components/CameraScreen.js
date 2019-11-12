import React, { Component } from 'react';
import { View, Text, TouchableOpacity, BackHandler, ToastAndroid } from 'react-native';
import * as Permissions from "expo-permissions";
import { Camera } from 'expo-camera';
import * as MediaLibrary from "expo-media-library";
import { Ionicons, Feather, EvilIcons, MaterialIcons } from '@expo/vector-icons';

class CameraScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      hasCameraPermission: null,         // przydzielone uprawnienia do kamery
      type: Camera.Constants.Type.back,  // typ kamery
      camera: false,
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

  }

  _changeCamera = () => {
    this.setState({
      ...this.state,
      type: this.state.type === Camera.Constants.Type.back
        ? Camera.Constants.Type.front
        : Camera.Constants.Type.back,
    });
  }

  _handleTakePhoto = async () => {
    if (this.camera) {
      let foto = await this.camera.takePictureAsync();
      let asset = await MediaLibrary.createAssetAsync(foto.uri); // domyslnie zapisuje w DCIM
      alert(JSON.stringify(asset, null, 4))
      // ToastAndroid.showWithGravity(
      //   'Zrobiono zdjęcie',
      //   ToastAndroid.SHORT,
      //   ToastAndroid.CENTER
      // );
    }
  }

  _renderCameraScreen = () => {
    const { hasCameraPermission } = this.state; // podstawienie zmiennej ze state
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
            style={{ flex: 1 }}
            type={this.state.type}>
            <View style={{ flex: 1 }}>
              {/* tutaj wstaw buttony do obsługi kamery */}
            </View>
          </Camera>
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
              <Ionicons name="ios-settings" size={64} color="white" />
            </View>
          </View>
        </View>
      );
    }
  }

  render() {
    return this._renderCameraScreen();
  }
}

export default CameraScreen;
