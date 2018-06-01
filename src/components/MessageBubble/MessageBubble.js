import React, { Component } from 'react';
import { View, StyleSheet } from 'react-native'
import { Button, Text, Thumbnail } from 'native-base'

class MessageBubble extends Component {
  render() {

    //These spacers make the message bubble stay to the left or the right, depending on who is speaking, even if the message is multiple lines.
    var leftSpacer = this.props.direction === 'left' ? <Thumbnail small source={{uri: "https://facebook.github.io/react-native/docs/assets/favicon.png"}} /> : <View style={{ width: 70 }} />;
    var rightSpacer = this.props.direction === 'left' ? 
    (
      <Button light style={{
        marginTop: 8,
        marginRight: 2,
        marginLeft: 3,
        height: 30
      }}>
        <Text>借りる</Text>
      </Button>
    ) 
    // <View style={{ width: 70 }} />
    : null;

    var bubbleStyles = this.props.direction === 'left' ? [styles.messageBubble, styles.messageBubbleLeft] : [styles.messageBubble, styles.messageBubbleRight];

    var bubbleTextStyle = this.props.direction === 'left' ? styles.messageBubbleTextLeft : styles.messageBubbleTextRight;

    return (
      <View style={{ justifyContent: 'space-between', flexDirection: 'row' }}>
        {leftSpacer}
        <View style={bubbleStyles}>
          <Text style={bubbleTextStyle}>
            {this.props.text}
          </Text>
        </View>
        {rightSpacer}
      </View>
    );
  }
}

const styles = StyleSheet.create({
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


export default MessageBubble;