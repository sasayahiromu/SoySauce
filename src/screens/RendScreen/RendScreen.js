import React, { Component } from 'react';
import { View, StyleSheet, ScrollView, SafeAreaView } from 'react-native'
import BubbleList from '../../components/BubbleList/BubbleList'
import firebase from 'react-native-firebase';

import { connect } from 'react-redux';

import { addMessage, getMessages, addDeals } from '../../store/actions/index';



class RendBoard extends Component {

  componentWillMount() {
    this.props.onLoadMessages();
  }

  componentDidMount() {
    // Firestoreの「messages」コレクションを参照
    this.ref = firebase.firestore()
    .collection('chat_messages')
    .doc('chat-01')
    .collection('messages');

    // refの更新時イベントにonCollectionUpdate登録
    this.unsubscribe = this.ref.onSnapshot(this.props.onLoadMessages);
  }

  componentWillunmount() {
    // onCollectionUpdateの登録解除
    this.unsubscribe();
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

  render() {
    console.log(this.props.messages, 'there')
    return (
      <SafeAreaView style={styles.safeArea}>
        <View style={styles.outer}>
          <ScrollView ref="scrollView"
            onContentSizeChange={(width, height) =>
              this.refs.scrollView.scrollToEnd({ animated: true })}>
            <BubbleList
              authUid={this.props.authUid}
              messages={this.props.messages.filter(function (value) {
                return value.type === 1;
              })}
              startIndividualChat={this.startIndividualChat}
            />
          </ScrollView>
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


export default connect(mapStateToProps, mapDispatchToProps)(RendBoard);