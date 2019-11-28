import React, { Component } from 'react';
import * as Font from "expo-font";
import * as Permissions from "expo-permissions";
import * as MediaLibrary from "expo-media-library";
import { BackHandler ,View, Text, Button, StyleSheet, TextInput, KeyboardAvoidingView, Image, Alert, ActivityIndicator, AsyncStorage, FlatList, Switch, ToastAndroid, Dimensions } from 'react-native';
import { Entypo } from '@expo/vector-icons';
import { TouchableOpacity } from 'react-native-gesture-handler';


class BigPhotoScreen extends Component {

    static navigationOptions = {
        title: "Wybrano zdjęcie",
        headerStyle: {
            backgroundColor: 'rgb(233,30,99)',
        },
        headerTintColor: '#fff',
    }

    constructor(props) {
        super(props);
        this.state = {
            isLoaded: false,
        };
    }

    componentDidMount() {
        BackHandler.addEventListener('hardwareBackPress', this.handleBackPress);
    }
    
    componentWillUnmount() {
        BackHandler.removeEventListener('hardwareBackPress', this.handleBackPress);
    }

    handleBackPress = () => {
        this.props.navigation.state.params.refresh()
        this.props.navigation.goBack()
        return true;
    }

    _handleRemoveImage = async () => {
        let { id } = this.props.navigation.state.params.data;
        console.log(id)
        await MediaLibrary.deleteAssetsAsync([id]);
        ToastAndroid.showWithGravity(
            'Usunięto zdjęcie',
            ToastAndroid.SHORT,
            ToastAndroid.CENTER
        );
        console.log(this.props.navigation.state.params)
        this.props.navigation.state.params.refresh()
        this.props.navigation.goBack();
    }

    _renderLoader = () => {
        return (
            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                <ActivityIndicator size="large" color="#0000ff" />
            </View>
        )
    }

    _renderScreen = () => {
        let { isLoaded, markers, globalChecked } = this.state;
        const { uri, width, height, id, itemWidth } = this.props.navigation.state.params.data;
        console.log(uri, width)
        return (
            <View style={styles.container}>
                <Image
                    style={{
                        width: '100%',
                        height: '100%'
                    }}
                    resizeMode="cover"
                    source={{ uri }}
                />
                <View style={{position: 'absolute', bottom: 0, right: 50}}>
                    <Text style={{color: "#ffffff"}}>{id}</Text>
                    <TouchableOpacity onPress={this._handleRemoveImage}>
                        <Entypo name="trash" size={128} color="white"  />
                    </TouchableOpacity>
                </View>
            </View>
        )
    }

    render() {
        return this._renderScreen();
    }
}

export default BigPhotoScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
});
