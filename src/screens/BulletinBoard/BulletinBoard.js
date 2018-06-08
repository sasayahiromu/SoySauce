import React, { Component } from 'react';
import { View, StyleSheet, TextInput, ScrollView, Text } from 'react-native'
import InputBar from "../../components/InputBar/InputBar";
import KeyboardSpacer from 'react-native-keyboard-spacer';
import MultiSwitch from '../../components/MultiSwitch/MultiSwitch'
import BubbleList from '../../components/BubbleList/BubbleList'

import { connect } from 'react-redux';

import { addMessage, getMessages, addDeals } from '../../store/actions/index';


class BulletinBoardScreen extends Component {

  state = {
    inputBarText: '',
  }

  componentWillMount() {
    this.props.onLoadMessages();
  }

  addMessageHandler = () => {
    const message = this.state.inputBarText
    const type = this.multiSwitch.state.selectedPosition
    this.props.onAddMessage(message, type);
  }


  _onChangeInputBarText(text) {
    this.setState({
      inputBarText: text
    });
  }

  startIndividualChat = 
  (messageId, initialMessage, senderUid, senderNickname, type) => {
    this.props.navigator.push({
      screen: "soySauce.IndividualChatScreen",
      passProps: {
        messageId: messageId,
      },
      title: 'こんにちはゲームウォッチ貸しますよ'
    });

    let lenderNickname;
    let lenderUid;
    let borrowerNickname;
    let borrowerUid;
    if(type===1){
      lenderNickname = senderNickname;
      lenderUid = senderUid;
      borrowerNickname = this.props.authNickname;
      borrowerUid = this.props.authUid;
    }
    if(type===2){
      borrowerNickname = senderNickname;
      borrowerUid = senderUid;
      lenderNickname = this.props.authNickname;
      lenderUid = this.props.authUid;
    }
    this.props.onAddDeals(
      borrowerNickname,
      borrowerUid,
      lenderNickname,
      lenderUid,
      messageId,
      initialMessage,
      )
  }

  render() {
    console.log(this.props.messages, 'there')
    return (
      <View style={styles.outer}>
        <ScrollView>
          <BubbleList
            authUid={this.props.authUid}
            messages={this.props.messages}
            startIndividualChat={this.startIndividualChat}
          />
        </ScrollView>
        <View style={styles.multiSwitchContainer}>
          <MultiSwitch ref={ref => (this.multiSwitch = ref)} />
        </View>
        <InputBar onSendPressed={() => { this.addMessageHandler() }}
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


const mapDispatchToProps = dispatch => {
  return {
    onLoadMessages: () => dispatch(getMessages()),
    onAddMessage: (text, sender, type) => dispatch(addMessage(text, sender, type)),
    onAddDeals: (
      borrowerNickname,
      borrowerUid,
      lenderNickname,
      lenderUid,
      messageId,
      initialMessage
    ) => dispatch(addDeals(
        borrowerNickname,
        borrowerUid,
        lenderNickname,
        lenderUid,
        messageId,
        initialMessage,
      ))
  };
};

const mapStateToProps = state => {
  return {
    messages: state.messages.messages,
    authUid: state.auth.uid,
    authNickname: state.auth.nickname
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(BulletinBoardScreen);