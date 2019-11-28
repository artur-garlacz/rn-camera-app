import React, { useEffect } from 'react';
import { Text, View, StyleSheet, TouchableOpacity } from 'react-native';

const RadioButton = ({
    value,
    selected,
    type,
    handleSelectCameraOption
}) => {
    const [state, setState] = React.useState({
        selected: [],
        fontloaded: false
    })

    // useEffect(async () => {
    //     await Font.loadAsync({
    //         'myfont': require('../assets/fonts/Roboto-Thin.ttf'),
    //     });
    //     setState({ ...state, fontloaded: true })
    // }, [])

    _renderRadioGroups = () => {
        // if( fontloaded ){
        return (
            <View style={styles.containerButton}>
                <TouchableOpacity onPress={() => handleSelectCameraOption(value, type)}>
                    <View style={selected ? { ...styles.radioButton, backgroundColor: 'rgb(233,30,99)' } : { ...styles.radioButton }}>

                    </View>
                </TouchableOpacity>
                <View>
                    <Text style={{ color: '#ffffff', paddingLeft: 10 }}>{value}</Text>
                </View>
            </View>
        )
    }

    return _renderRadioGroups();
};

var styles = StyleSheet.create({
    containerButton: {
        display: 'flex',
        justifyContent: 'flex-start',
        flexDirection: 'row',
        alignItems: 'center',
        padding: 5

    },
    radioButton: {
        borderRadius: 50,
        width: 15,
        height: 15,
        backgroundColor: 'transparent',
        padding: 10,
        borderStyle: 'solid',
        borderWidth: 2,
        borderColor: 'rgb(233,30,99)'
    }
});

export default RadioButton;
