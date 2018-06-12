/* Switch Button Component class
 */
import React from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
import styles from './styles';
import PropTypes from 'prop-types';

const getIcon = (type) => {
    let str;
    let activeColor;
    let inactiveColor;
    switch (type) {
        case 'Open':
            str = '送信'
            activeColor = '#bcefa5'
            inactiveColor = '#46a11c'
            break;
        case 'In Progress':
            str = '貸したい'
            activeColor = '#d2dff5'
            inactiveColor = '#2a65c6'
            break;
        case 'Complete':
            str = '借りたい'
            activeColor = '#f6c6e3'
            inactiveColor = '#a4196d'
            break;
    }
    return {str: str, activeColor: activeColor, inactiveColor: inactiveColor};
};

const Button = props => {
    if (props.active) {
        return (
            <View>
                <TouchableOpacity
                    style={[styles.buttonStyle ,{backgroundColor: getIcon(props.type).activeColor}]}
                >
                    <Text>{getIcon(props.type).str}</Text>
                </TouchableOpacity>
            </View>
        );
    } else {
        return (
            <View>
                <TouchableOpacity
                    onPress={props.onPress}
                    style={[styles.buttonStyle ,{backgroundColor: getIcon(props.type).inactiveColor}]}
                >
                    {/* <Image source={getIcon(props.type, props.active)} /> */}
                    <Text>{getIcon(props.type).str}</Text>
                </TouchableOpacity>
            </View>
        );
    }
};

Button.propTypes = {
    type: PropTypes.string,
    active: PropTypes.bool,
    onPress: PropTypes.func
};

Button.defaultProps = {
    active: false
};

export default Button;
