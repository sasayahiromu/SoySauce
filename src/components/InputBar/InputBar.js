import React, { Component } from 'react';
import { Text, View, StyleSheet, TouchableHighlight } from 'react-native';
import AutogrowInput from 'react-native-autogrow-input';

class InputBar extends Component {

  componentWillReceiveProps(nextProps) {
    if (nextProps.text === '') {
      this.autogrowInput.resetInputText();
    }
  }

  render() {
    const sendButton =
      this.props.text ?
        (<TouchableHighlight style={styles.sendButton} onPress={() => this.props.onSendPressed()}>
          <Text style={{ color: 'white' }}>決定</Text>
        </TouchableHighlight>)
        : null

    return (
      <View style={styles.inputBar}>
        <AutogrowInput
        placeholder="メッセージを入力"
          style={styles.textBox}
          ref={(ref) => { this.autogrowInput = ref }}
          multiline={true}
          defaultHeight={40}
          onChangeText={(text) => this.props.onChangeText(text)}
          onContentSizeChange={this.props.onSizeChange}
          // value={this.props.text}
          underlineColorAndroid="transparent"
          />
        {sendButton}
      </View>
    );
  }
}

const styles = StyleSheet.create({

  inputBar: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 5,
    paddingVertical: 3,
  },

  textBox: {
    borderRadius: 5,
    borderWidth: 1,
    borderColor: 'gray',
    flex: 1,
    fontSize: 16,
    paddingHorizontal: 10,
  },

  sendButton: {
    justifyContent: 'center',
    alignItems: 'center',
    paddingLeft: 15,
    marginLeft: 5,
    paddingRight: 15,
    borderRadius: 5,
    backgroundColor: '#66db30'
  }
})

export default InputBar;