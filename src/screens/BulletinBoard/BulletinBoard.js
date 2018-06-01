import React, { Component } from 'react';
import { View, StyleSheet, Text, TextInput,ScrollView } from 'react-native'
import MessageBubble from "../../components/MessageBubble/MessageBubble";
import InputBar from "../../components/InputBar/InputBar";
import KeyboardSpacer from 'react-native-keyboard-spacer';
import MultiSwitch from '../../components/MultiSwitch/MultiSwitch'


class BulletinBoardScreen extends Component {
  render() {
    return (
      <View style={styles.outer}>
      <ScrollView>
        {}
      </ScrollView>
      <View style={styles.multiSwitchContainer}>
      <MultiSwitch ref={ref => (this.multiSwitch = ref)}/>
      </View>
      <InputBar onSendPressed={() => {console.log(this.multiSwitch.state.selectedPosition)}} 
                onSizeChange={() => {}}
                onChangeText={(text) => {}}
                text='hrlo'
                />
      <KeyboardSpacer/>             
  </View>
    );
  }
}

const styles = StyleSheet.create({

  multiSwitchContainer:{
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

  //InputBar

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
    paddingHorizontal: 10
  },

  sendButton: {
    justifyContent: 'center',
    alignItems: 'center',
    paddingLeft: 15,
    marginLeft: 5,
    paddingRight: 15,
    borderRadius: 5,
    backgroundColor: '#66db30'
  },

  //MessageBubble

  messageBubble: {
    borderRadius: 5,
    marginTop: 8,
    marginRight: 10,
    marginLeft: 10,
    paddingHorizontal: 10,
    paddingVertical: 5,
    flexDirection: 'row',
    flex: 1
  },

  messageBubbleLeft: {
    backgroundColor: '#d5d8d4',
  },

  messageBubbleTextLeft: {
    color: 'black'
  },

  messageBubbleRight: {
    backgroundColor: '#66db30'
  },

  messageBubbleTextRight: {
    color: 'white'
  },
})



export default BulletinBoardScreen;