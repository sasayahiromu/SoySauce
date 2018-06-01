import React, { Component } from 'react';
import { View, StyleSheet } from 'react-native'
import { Button, Text, Thumbnail } from 'native-base'


//props text type　sender

class MessageBubble extends Component {
  render() {
    thumbnail = (
      <Thumbnail small source={{ uri: "https://facebook.github.io/react-native/docs/assets/favicon.png" }} style={{ width: 25, height: 25 }} />
    )
    //These spacers make the message bubble stay to the left or the right, depending on who is speaking, even if the message is multiple lines.
    var leftSpacer = this.props.direction === 'left' ? thumbnail : <View style={{ width: 70 }} />;
    var rightSpacer = this.props.direction === 'left' ?
      (
        <Button light style={{
          marginTop: 20,
          marginRight: 4,
          marginLeft: 3,
          height: 30,
        }}>
          <Text style={{ fontSize: 8 }}>借りる</Text>
        </Button>
      )
      // <View style={{ width: 70 }} />
      : null;

    var bubbleStyles = this.props.direction === 'left' ? [styles.messageBubble, styles.messageBubbleLeft] : [styles.messageBubble, styles.messageBubbleRight];

    var bubbleTextStyle = this.props.direction === 'left' ? styles.messageBubbleTextLeft : styles.messageBubbleTextRight;
    console.log(this.props.sender);
    return (
      <View style={{ justifyContent: 'space-between', flexDirection: 'row' , marginTop: 10}}>
        <View style={{flex: 1}}>
          {leftSpacer}
        </View>

        <View style={{ flexDirection: 'column', flex: 7 }}>
          <Text style={{ fontSize: 10 }}>{this.props.sender}</Text>
          <View style={bubbleStyles}>
            <Text style={bubbleTextStyle}>
              {this.props.text}
            </Text>
          </View>
        </View>

        <View style={{flex: 2}}>
          {rightSpacer}
        </View>

      </View>
    );
  }
}

const styles = StyleSheet.create({
  //MessageBubble

  messageBubble: {
    borderRadius: 5,
    marginTop: 8,
    marginRight: 5,
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