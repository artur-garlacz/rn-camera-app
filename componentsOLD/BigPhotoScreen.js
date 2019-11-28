import React, { Component } from 'react';
import * as Font from "expo-font";
import * as Permissions from "expo-permissions";
import * as MediaLibrary from "expo-media-library";
import { View, Text, Button, StyleSheet, TextInput, KeyboardAvoidingView, Image, Alert, ActivityIndicator, AsyncStorage, FlatList, Switch, ToastAndroid, Dimensions } from 'react-native';
import CustomButton from './CustomButton';
import Items from './Items';

class BigPhoto extends Component {

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
        const { uri, width, height, id, itemWidth } = this.props.navigation.state.params;
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
            </View>
        )
    }

    render() {
        return this._renderScreen();
    }
}

export default BigPhoto;

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
});
