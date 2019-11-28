import React from 'react';
import { Text, View } from 'react-native';
import RadioButton from './RadioButton';

const RadioGroup = ({
    list,
    handleSelectCameraOption
}) => {
    const [state, setState] = React.useState({
        selected: []
    })

    _renderListOfRadioButtons = () => {
        const listOfButtons = list.map((opt, key) => {
            const { name, selected, type } = opt;
            return (
                <RadioButton key={key} index={key} value={name} selected={selected} type={type} handleSelectCameraOption={handleSelectCameraOption} />
            )
        })
        return listOfButtons;
    }


    return (
        <View>
            {_renderListOfRadioButtons()}
        </View>
    )
};

export default RadioGroup;
