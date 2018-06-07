import React, { Component } from 'react';
import { View, StyleSheet, TextInput, ScrollView, Text } from 'react-native'
import InputBar from "../../components/InputBar/InputBar";
import KeyboardSpacer from 'react-native-keyboard-spacer';
import MultiSwitch from '../../components/MultiSwitch/MultiSwitch'
import IndividualBubbleList from '../../components/IndividualBubbleList.js/IndividualBubbleList'

import { connect } from 'react-redux';

import { addMessage, getMessages, getIndividualMessages } from '../../store/actions/index';


class IndividualChat extends Component {

  state = {
    inputBarText: '',
    individualMessages: [],
  }

  componentWillMount() {
      this.props.onLoadIndividualMessagesMessages(this.props.messageId)
  }

  addMessageHandler = () => {
    // const message = this.state.inputBarText
    // const type = this.multiSwitch.state.selectedPosition
    // this.props.onAddMessage(message, type);
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
          <IndividualBubbleList
           authUid={this.props.authUid} 
           allMessages={this.props.individualMessages} 
           messageId={this.props.messageId} 
           messagetriger={this.props.messagetriger}
           />
        </ScrollView>
        {/* <View style={styles.multiSwitchContainer}>
            <MultiSwitch ref={ref => (this.multiSwitch = ref)} />
          </View> */}
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
    onLoadIndividualMessagesMessages: (messageId) => dispatch(getIndividualMessages(messageId)),
    // onAddMessage: (text, sender, type) => dispatch(addMessage(text, sender, type))
  };
};

const mapStateToProps = state => {
  return {
    messages: state.messages.messages,
    authUid: state.auth.uid,
    individualMessages: state.messages.individualMessages, //ここで全ての個別チャットを取得してしまうのはどうにかできないか
    messagetriger: state.messages.messagetriger
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(IndividualChat);