import React, { Component } from 'react';
import { View, StyleSheet, ScrollView, SafeAreaView, Keyboard, Text, ActivityIndicator } from 'react-native'
import InputBar from "../../components/InputBar/InputBar";
import KeyboardSpacer from 'react-native-keyboard-spacer';
import MultiSwitch from '../../components/MultiSwitch/MultiSwitch'
import BubbleList from '../../components/BubbleList/BubbleList'
import firebase from 'react-native-firebase';

import { connect } from 'react-redux';

import { addMessage, getMessages, addDeals, deleteMessage, getDeals } from '../../store/actions/index';
import { Platform } from 'react-native';


class BulletinBoardScreen extends Component {

  state = {
    inputBarText: '',
  }

  componentWillMount() {
    this.props.onLoadMessages();
  }

  componentDidMount() {
    this.keyboardDidShowListener = Keyboard.addListener('keyboardDidShow', this._keyboardDidShow);
    console.log('BulletionBoard')
    // Firestoreの「messages」コレクションを参照
    this.ref = firebase.firestore()
      .collection('chat_messages')
      .doc('chat-01')
      .collection('messages');

    // refの更新時イベントにonCollectionUpdate登録
    this.unsubscribe = this.ref.onSnapshot(this.props.onLoadMessages);
  }

  componentWillUnmount() {
    this.keyboardDidShowListener.remove();
    // onCollectionUpdateの登録解除
    this.unsubscribe();
  }

  addMessageHandler = () => {
    const message = this.state.inputBarText
    const type = this.multiSwitch.state.selectedPosition
    this.props.onAddMessage(message, type, 1);
    this.setState({
      inputBarText: ''
    })
  }

  deleteMessageHandler = (messageId) => {
    this.props.onDeleteMessage(messageId);
  }


  _onChangeInputBarText(text) {
    this.setState({
      inputBarText: text
    });
  }

  _keyboardDidShow = () => {
    if (this.refs.scrollView) {
      this.refs.scrollView.scrollToEnd({ animated: true })
    }
  }

  startIndividualChat =
    (messageId, initialMessage, senderUid, senderNickname, type) => {
      this.props.navigator.push({
        screen: "soySauce.IndividualChatScreen",
        passProps: {
          messageId: messageId,
        },
        title: initialMessage
      });

      let lenderNickname;
      let lenderUid;
      let borrowerNickname;
      let borrowerUid;
      if (type === 1) {
        lenderNickname = senderNickname;
        lenderUid = senderUid;
        borrowerNickname = this.props.authNickname;
        borrowerUid = this.props.authUid;
      }
      if (type === 2) {
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
  searchBarTextFilter = (value) => {
    function converToKana(str) {
      return str.replace(/[ぁ-ん]/g, function (s) {
        return String.fromCharCode(s.charCodeAt(0) + 0x60);
      });
    }
    reg = new RegExp(converToKana(this.props.searchBarText));
    return value.board_number === 1 && (converToKana(value.message).match(reg) || converToKana(value.sender_nick_name).match(reg));
  }

  render() {
    if (this.props.messages.length === 0) {
      return (
        <View style={{ flex: 1, justifyContent: 'center' }}><ActivityIndicator /></View>
      )
    }
    console.log(1, 'poi')
    return (
      <SafeAreaView style={styles.safeArea}>
        <View style={styles.outer}>
          <ScrollView ref="scrollView"
            onContentSizeChange={(width, height) =>
              this.refs.scrollView.scrollToEnd({ animated: true })}>
            <BubbleList
              authUid={this.props.authUid}
              messages={this.props.messages.filter(this.searchBarTextFilter)}
              startIndividualChat={this.startIndividualChat}
              deleteMessage={this.deleteMessageHandler}
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
    onGetDeals: () => dispatch(getDeals()),
    onLoadMessages: () => dispatch(getMessages()),
    onAddMessage: (text, type, boaedNum) => dispatch(addMessage(text, type, boaedNum)),
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
    )),
    onDeleteMessage: (messageId) => dispatch(deleteMessage(messageId))
  };
};

const mapStateToProps = state => {
  return {
    messages: state.messages.messages,
    authUid: state.auth.uid,
    authNickname: state.auth.nickname,
    searchBarText: state.messages.searchBarText
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(BulletinBoardScreen);