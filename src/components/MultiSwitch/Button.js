/* Switch Button Component class
 */
import React from 'react';
import { Image, Text, TouchableOpacity, View } from 'react-native';
import styles from './styles';
import PropTypes from 'prop-types';

const getIcon = (type) => {
    let str;
    switch (type) {
        case 'Open':
            str = '送信'
            break;
        case 'In Progress':
            str = '貸したい'
            break;
        case 'Complete':
            str = '借りたい'
            break;
    }
    return str;
};

const Button = props => {
    if (props.active) {
        return (
            <View>
                <TouchableOpacity
                    style={styles.buttonStyle}
                >
                    <Text>{getIcon(props.type)}</Text>
                </TouchableOpacity>
            </View>
        );
    } else {
        return (
            <View>
                <TouchableOpacity
                    onPress={props.onPress}
                    style={styles.buttonStyle}
                >
                    {/* <Image source={getIcon(props.type, props.active)} /> */}
                    <Text>{getIcon(props.type)}</Text>
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
