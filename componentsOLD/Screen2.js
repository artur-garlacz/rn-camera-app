import React, { Component } from 'react';
import * as Font from "expo-font";
import * as Permissions from "expo-permissions";
import * as MediaLibrary from "expo-media-library";
import { View, Text, Button, StyleSheet, TextInput, KeyboardAvoidingView, Image, Alert, ActivityIndicator, AsyncStorage, FlatList, Switch, ToastAndroid, Dimensions } from 'react-native';
import CustomButton from './CustomButton';
import Items from './Items';

class ListScreen extends Component {

    static navigationOptions = {
        title: "Zdjęcia zapisane w telefonie",
        headerStyle: {
            backgroundColor: 'rgb(233,30,99)',
        },
        headerTintColor: '#fff',
    }

    constructor(props) {
        super(props);
        this.state = {
            isLoaded: false,
            list: [{ name: "w" }, { name: "E" }],
            photoList: [],
            numColumns: 4
        };
    }

    componentWillMount = async () => {
        let { status } = await Permissions.askAsync(Permissions.CAMERA_ROLL);
        if (status !== 'granted') {
            alert('brak uprawnień do czytania image-ów z galerii')
        }
        this._getMediaData()
    }

    _getMediaData = async () => {
        let obj = await MediaLibrary.getAssetsAsync({
            first: 100,           // ilość pobranych assetów
            mediaType: 'photo'    // typ pobieranych danych, photo jest domyślne
        })
        this.setState({
            ...this.state,
            photoList: obj.assets

        }, () => console.log(this.state.photoList[0]))
        // alert(JSON.stringify(obj.assets, null, 4))
    }

    _moveToCameraScreen = () => {
        this.props.navigation.navigate("s3")
    }

    _renderFlatList = () => {
        let { list, isLoaded, numColumns, photoList } = this.state;
        const { width } = Dimensions.get("window");
        const itemWidth = (width) / 4
        return (
            <FlatList
                numColumns={numColumns}
                data={photoList}
                style={{ width: '100%' }}
                renderItem={({ item }) => {
                    return <Items uri={item.uri} width={item.width} height={item.height} id={item.id} itemWidth={itemWidth} />
                }}
                keyExtractor={(item, index) => index.toString()}
                extraData={this.state}
            />
        )
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
        return (
            <View style={styles.container}>
                <View style={{ ...styles.topMenu, flex: .15 }}>
                    <View style={styles.title}>
                        <CustomButton text="GRID / LIST" handleClick={() => { console.log("W") }} value="fetch" />
                    </View>
                    <View style={styles.title}>
                        <CustomButton text="OPEN CAMERA" handleClick={() => { this._moveToCameraScreen() }} value="remove" />
                    </View>
                    <View style={styles.title}>
                        <CustomButton text="REMOVE SELECTED" handleClick={() => { this._handleMoveToMap() }} value="move" />
                    </View>

                </View>
                <View style={{ flex: .85, width: '100%' }}>
                    {this._renderFlatList()}
                </View>
            </View>
        )
    }

    render() {
        return (
            <View style={styles.container}>{this._renderScreen()}</View>);
    }
}

export default ListScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        display: 'flex',
        flexDirection: 'column',
        backgroundColor: '#fff',
        justifyContent: 'center',
        alignItems: 'center',
    },
    topMenu: {
        width: '100%',
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'flex-start',
    },
    buttonContainer: {
        height: 45,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 20,
        width: 250,
        borderRadius: 30,
    },
    title: {
        flex: .3,
        width: '100%',
        // backgroundColor: '#00b5ec',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
    },
    form: {
        flex: .7,
        width: '100%',
        flexDirection: 'column',
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center'
    }
});
