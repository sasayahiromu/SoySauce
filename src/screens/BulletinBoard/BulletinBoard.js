import React, { Component } from 'react';
import { View, StyleSheet,  TextInput, ScrollView, Text } from 'react-native'
import MessageBubble from "../../components/MessageBubble/MessageBubble";
import InputBar from "../../components/InputBar/InputBar";
import KeyboardSpacer from 'react-native-keyboard-spacer';
import MultiSwitch from '../../components/MultiSwitch/MultiSwitch'

class BulletinBoardScreen extends Component {

  state = {
    inputBarText: ''
  }


  _onChangeInputBarText(text) {
    this.setState({
      inputBarText: text
    });
  }

  render() {
    return (
      <View style={styles.outer}>
        <ScrollView>
        <MessageBubble direction='left' text='hello'/>
        <MessageBubble direction='left' text='hello'/>
        <MessageBubble direction='right' text='hello'/>
        <MessageBubble direction='left' text='helloooooooooooooooooooooooooooooooooooooo'/>
        </ScrollView>
        <View style={styles.multiSwitchContainer}>
          <MultiSwitch ref={ref => (this.multiSwitch = ref)} />
        </View>
        <InputBar onSendPressed={() => { console.log(this.multiSwitch.state.selectedPosition) }}
          onSizeChange={() => { }}
          onChangeText={(text) => { this._onChangeInputBarText(text) }}
          text={this.state.inputBarText}
        />
        <KeyboardSpacer />
      </View>
    );
  }
}

const styles = StyleSheet.create({

  multiSwitchContainer: {
    alignItems: 'center',
    justifyContent: 'center',
  },

  //ChatView

  outer: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'space-between',
    backgroundColor: 'white'
  },

  messages: {
    flex: 1
  },
})



export default BulletinBoardScreen;