import React, { Component } from 'react';
import * as Font from "expo-font";
import * as Permissions from "expo-permissions";
import { View, Text, Button, StyleSheet, TextInput, KeyboardAvoidingView, Image, Alert, ActivityIndicator } from 'react-native';
import CustomButton from './CustomButton';
class HomeScreen extends Component {

  static navigationOptions = {
    header: null,
  }

    constructor(props) {
        super(props);
        this.state = {
            fontloaded: false
        };
    }

    componentWillMount = async () => {
        await Font.loadAsync({
            'myfont': require('../assets/fonts/Roboto-Thin.ttf'),
        });
        this.setState({ ...this.state, fontloaded: true })
    }

    _moveToNextView = () => {
        this.props.navigation.navigate("s2")
    }

    _renderHomeScreen = () => {
        const { fontloaded} = this.state;
        if(!fontloaded){
            return(
                <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
                    <ActivityIndicator size="large" color="#ff0000"  />
                </View>
            )
        }else{
            return(
                <View style={styles.container}>
                    <View style={styles.title}>
                        <Text style={{ color: '#ffffff', fontSize: 46, fontFamily: 'myfont' }}> Have fun!</Text>
                    </View>
                    <View style={styles.title}>
                        <CustomButton text="START" handleClick={this._moveToNextView} value="start"/>
                    </View>
                </View>
            )
        }
   
    }

    render() {
        return this._renderHomeScreen();
    }
}

export default HomeScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        display: 'flex',
        flexDirection: 'column',
        backgroundColor: '#fff',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgb(233,30,99)',
    },
    inputContainer: {
        borderBottomColor: '#F5FCFF',
        borderRadius: 30,
        borderBottomWidth: 1,
        width: 250,
        height: 45,
        marginBottom: 20,
        flexDirection: 'row',
        alignItems: 'center'
    },
    inputs: {
        height: 45,
        marginLeft: 16,
        borderBottomColor: '#FFFFFF',
        flex: 1,
    },
    inputIcon: {
        width: 30,
        height: 30,
        marginLeft: 15,
        justifyContent: 'center'
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
