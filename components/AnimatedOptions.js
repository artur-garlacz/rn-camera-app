import React, { Component } from 'react';
import { View, Text, Animated, StyleSheet, Dimensions, ActivityIndicator, ScrollView } from 'react-native';
import * as Font from "expo-font";
import RadioButton from './RadioButton';
import RadioGroup from './RadioGroup';

class AnimatedOptions extends Component {
    constructor(props) {
        super(props);
        this.state = {
            pos: new Animated.Value(500),  //startowa pozycja y wysuwanego View
            fontloaded: false,
        };
        // this.isHidden = true
        console.log(this.state.pos)
    }

    componentWillMount = async () => {
        await Font.loadAsync({
            'myfontLight': require('../assets/fonts/Roboto-Thin.ttf'),
            'myfontBold': require('../assets/fonts/Roboto-Bold.ttf'),
        });
        this.setState({ ...this.state, fontloaded: true })
    }


    componentDidMount() {
        this.toggle()
    }

    componentDidUpdate() {
        this.toggle()
    }

    toggle() {
        let { pos } = this.state;
        let { isHidden } = this.props;
        console.log(isHidden, pos)
        const { height } = Dimensions.get("window");
        if (isHidden) toPos = 0; else toPos = height

        //animacja

        Animated.spring(
            pos,
            {
                toValue: toPos,
                velocity: 1,
                tension: 0,
                friction: 10,
            }
        ).start();
    }
    // _handleToggle() {


    //     this.isHidden = !this.isHidden;
    // }

    _renderSettings = () => {
        const { fontloaded } = this.state;
        const { handleSelectCameraOption, whiteBalanceList, flashModeList, ratiosList } = this.props;

        if (fontloaded) {
            return (
                <React.Fragment>
                    <Text style={styles.title}>SETTINGS</Text>
                    <Text style={styles.subtitle}>WHITE BALANCE</Text>
                    <RadioGroup list={whiteBalanceList} handleSelectCameraOption={handleSelectCameraOption} />
                    <Text style={styles.subtitle}>FLASH MODE</Text>
                    <RadioGroup list={flashModeList} handleSelectCameraOption={handleSelectCameraOption} />
                    <Text style={styles.subtitle}>CAMERA RATIO</Text>
                    <RadioGroup list={ratiosList} handleSelectCameraOption={handleSelectCameraOption} />
                </React.Fragment>
            )
        } else {
            return <ActivityIndicator size="large" color="rgb(233,30,99)" />
        }
    }

    render() {
        const { pos } = this.state;
        return (
            <Animated.View
                style={[
                    styles.animatedView,
                    {
                        transform: [
                            { translateY: pos }
                        ]
                    }]} >
                <ScrollView>
                    {this._renderSettings()}

                </ScrollView>
            </Animated.View>
        );
    }
}


var styles = StyleSheet.create({

    animatedView: {
        position: "absolute",
        bottom: 0,
        left: 0,
        right: '50%',
        backgroundColor: "rgba(0,0,0,.4)",
        height: '100%',
    },
    title: {
        color: '#ffffff',
        fontSize: 25,
        fontFamily: 'myfontLight',
        textAlign: 'center',
        marginBottom: 10,
    },
    subtitle: {
        color: '#ffffff',
        fontSize: 15,
        paddingRight: 5,
        fontFamily: 'myfontBold',
        textAlign: 'right',
        fontWeight: 'bold'
    }
});
export default AnimatedOptions;
