import React, { Component } from 'react';
import { View, StyleSheet, TextInput, ScrollView, Text } from 'react-native'
import BubbleList from '../../components/BubbleList/BubbleList'

import { connect } from 'react-redux';

import { getMessages } from '../../store/actions/index';


class RendBoard extends Component {

  state = {
    inputBarText: '',
    messages: [],
  }

  componentWillMount() {
    this.props.onLoadMessages();
  }

  addMessageHandler = () => {
    const text = this.state.inputBarText
    const sender = 'sasaya' ///変更する
    const type = this.multiSwitch.state.selectedPosition
    this.props.onAddMessage(text, sender, type);
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
            <BubbleList messages={this.props.messages} />
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