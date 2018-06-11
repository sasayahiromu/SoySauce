import React, { Component } from 'react';
import { View, StyleSheet, ScrollView, SafeAreaView, Keyboard } from 'react-native'
import InputBar from "../../components/InputBar/InputBar";
import KeyboardSpacer from 'react-native-keyboard-spacer';
import IndividualBubbleList from '../../components/IndividualBubbleList.js/IndividualBubbleList'
import { Platform } from 'react-native';

import { connect } from 'react-redux';

import { getIndividualMessages, addIndividualMessage } from '../../store/actions/index';


class IndividualChat extends Component {

  state = {
    inputBarText: '',
    individualMessages: [],
  }

  componentWillMount() {
    if (this.props.authUid) {
      this.props.onLoadIndividualMessages(this.props.messageId)
    }
  }

  componentDidMount() {
    this.keyboardDidShowListener = Keyboard.addListener('keyboardDidShow', this._keyboardDidShow);
  }

  componentWillunmount() {
    this.keyboardDidShowListener.remove();
  }

  addMessageHandler = () => {
    const message = this.state.inputBarText
    this.props.onAddIndividualMessage(message, this.props.messageId)
    this.setState({
      inputBarText: ''
    });
  }

  _keyboardDidShow = () => {
    if(this.refs.scrollView){
    this.refs.scrollView.scrollToEnd({ animated: true })
    }
  }

  _onChangeInputBarText(text) {
    this.setState({
      inputBarText: text
    });
  }


  render() {
    return (
      <SafeAreaView style={styles.safeArea}>
        <View style={styles.outer}>
          <ScrollView ref="scrollView"
            onContentSizeChange={(width, height) =>
              this.refs.scrollView.scrollToEnd({ animated: true })}>
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
          {Platform.OS === "ios" && <KeyboardSpacer />}
        </View>
      </SafeAreaView>
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
  safeArea: {
    flex: 1,
    backgroundColor: '#ddd'
  }
})


const mapDispatchToProps = dispatch => {
  return {
    onLoadIndividualMessages: (messageId) => dispatch(getIndividualMessages(messageId)),
    onAddIndividualMessage: (message, messageId) => dispatch(addIndividualMessage(message, messageId))
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