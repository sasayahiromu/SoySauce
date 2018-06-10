import React, { Component } from 'react';
import { View, StyleSheet, TextInput, ScrollView, Text } from 'react-native'
import BubbleList from '../../components/BubbleList/BubbleList'

import { connect } from 'react-redux';

import { getMessages } from '../../store/actions/index';


class BorrowBoard extends Component {

  state = {
    inputBarText: '',
    messages: [],
  }

  componentWillMount() {
    this.props.onLoadMessages();
  }

  render() {
    return (
      <View style={styles.outer}>
        <ScrollView ref="scrollView"
          onContentSizeChange={(width, height) =>
            this.refs.scrollView.scrollToEnd({ animated: true })}>
          <BubbleList
            messages={this.props.messages.filter(function (value) {
              return value.type === 2;
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

export default connect(mapStateToProps, mapDispatchToProps)(BorrowBoard);