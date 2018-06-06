import React, { Component } from 'react';
import { View, StyleSheet, TextInput, ScrollView, Text } from 'react-native'
import InputBar from "../../components/InputBar/InputBar";
import KeyboardSpacer from 'react-native-keyboard-spacer';
import MultiSwitch from '../../components/MultiSwitch/MultiSwitch'
import BubbleList from '../../components/BubbleList/BubbleList'

import { connect } from 'react-redux';

import { addMessage, getMessages } from '../../store/actions/index';


class BulletinBoardScreen extends Component {

  state = {
    inputBarText: '',
    messages: [],
  }

  componentWillMount() {
    this.props.onLoadMessages();
  }

  addMessageHandler = () => {
    const message = this.state.inputBarText
    // const sender = 'sasaya' ///変更する
    const type = this.multiSwitch.state.selectedPosition
    this.props.onAddMessage(message, type);
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
            <BubbleList authUid={this.props.authUid} messages={this.props.messages} />
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
    onAddMessage: (text, sender, type) => dispatch(addMessage(text, sender, type))
  };
};

const mapStateToProps = state => {
  return {
    messages: state.messages.messages,
    authUid: state.auth.uid
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(BulletinBoardScreen);