import React, { Component } from 'react';
import { View, StyleSheet, TextInput, ScrollView, Text } from 'react-native'
import BubbleList from '../../components/BubbleList/BubbleList'
import firebase from 'react-native-firebase';

import { connect } from 'react-redux';

import { getMessages } from '../../store/actions/index';


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

  render() {
    return (
      <View style={styles.outer}>
        <ScrollView ref="scrollView"
          onContentSizeChange={(width, height) =>
            this.refs.scrollView.scrollToEnd({ animated: true })}>
          <BubbleList
            messages={this.props.messages.filter(function (value) {
              return value.type === 1;
            })} />
        </ScrollView>
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
  };
};

const mapStateToProps = state => {
  return {
    messages: state.messages.messages
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(RendBoard);