import React, { Component } from 'react';
import { View, StyleSheet, TouchableOpacity, Clipboard } from 'react-native'
import { Button, Text, Thumbnail } from 'native-base'
import ActionSheet from 'react-native-actionsheet'


//props text type　sender

class MessageBubble extends Component {
  onstartIndividualChat = () => {
    this.props.startIndividualChat(
      this.props.messageId,
      this.props.text,
      this.props.sender_uid,
      this.props.sender_nick_name,
      this.props.type
    );
  }

  showActionSheet = () => {
    this.ActionSheet.show();
  }

  actionSheetAction = (index) => {
    switch (index) {
      case 0:
        Clipboard.setString(this.props.text);
        break;
      case 1:
        break;
      case 2:
        this.props.deleteMessage(this.props.messageId);
        break;
    }
  }

  render() {
    thumbnail = (
      <Thumbnail small source={{ uri: "https://facebook.github.io/react-native/docs/assets/favicon.png" }} style={{ width: 25, height: 25 }} />
    )
    //These spacers make the message bubble stay to the left or the right, depending on who is speaking, even if the message is multiple lines.
    var leftSpacer = this.props.authUid !== this.props.sender_uid ? thumbnail : <View style={{ width: 70 }} />;
    var rightSpacer = null
    let borrowButton;
    let lendButton;
    if (this.props.dealStatus === 0) {
      borrowButton = (
        <Button light style={{
          marginTop: 20,
          marginRight: 4,
          marginLeft: 3,
          height: 30,
        }}
          onPress={this.onstartIndividualChat}
        >
          <Text adjustsFontSizeToFit={true} style={{ fontSize: 10, color: 'black' }}>借りる</Text>
        </Button>
      )
    }
    else if (this.props.dealStatus === 1) {
      borrowButton = (
        <Button disabled bordered light style={{
          marginTop: 20,
          marginRight: 4,
          marginLeft: 3,
          height: 30,
        }}
          onPress={this.onstartIndividualChat}
        >
          <Text adjustsFontSizeToFit={true} style={{ fontSize: 10, color: '#CCFFCC' }}>借りる</Text>
        </Button>
      )
    }

    if (this.props.dealStatus === 0) {
      lendButton = (
        <Button light style={{
          marginTop: 20,
          marginRight: 4,
          marginLeft: 3,
          height: 30,
        }}
          onPress={this.onstartIndividualChat}
        >
          <Text adjustsFontSizeToFit={true} style={{ fontSize: 13, color: 'black' }}>貸す</Text>
        </Button>
      )
    }
    else if (this.props.dealStatus === 1) {
      lendButton = (
        <Button disabled bordered light style={{
          marginTop: 20,
          marginRight: 4,
          marginLeft: 3,
          height: 30,
        }}
          onPress={this.onstartIndividualChat}
        >
          <Text adjustsFontSizeToFit={true} style={{ fontSize: 13, color: '#CCFFCC' }}>貸す</Text>
        </Button>
      )
    }

    if (this.props.authUid !== this.props.sender_uid) {
      if (this.props.type === 0) {
        rightSpacer = (
          <View style={{ flex: 2 }}>
            <View style={{ width: 70 }} />
          </View>
        )
      }
      if (this.props.type === 1) {
        rightSpacer = (
          <View style={{ flex: 2 }}>
            {borrowButton}
          </View>
        )
      }
      if (this.props.type === 2) {
        rightSpacer = (
          <View style={{ flex: 2 }}>
            {lendButton}
          </View>
        )
      }
    }

    var name = this.props.authUid !== this.props.sender_uid ?
      (<Text style={{ fontSize: 10 }}>{this.props.sender_nick_name}</Text>)
      : null

    var rightBubbleStyle;

    if (this.props.type === 0) {
      rightBubbleStyle = styles.messageBubbleRight_0
    }
    else if (this.props.type === 1) {
      rightBubbleStyle = styles.messageBubbleRight_1
    }
    else if (this.props.type === 2) {
      rightBubbleStyle = styles.messageBubbleRight_2
    }

    var bubbleStyles =
      this.props.authUid !== this.props.sender_uid ?
        [styles.messageBubble, styles.messageBubbleLeft] :
        [styles.messageBubble, rightBubbleStyle];

    var bubbleTextStyle = this.props.authUid !== this.props.sender_uid ? styles.messageBubbleTextLeft : styles.messageBubbleTextRight;

    let options;
    if (this.props.authUid === this.props.sender_uid) {
      options = ['Copy', 'cancel', 'Delete']
    } else {
      options = ['Copy', 'cancel']
    }

    return (
      <View style={{ justifyContent: 'space-between', flexDirection: 'row', marginTop: 10 }}>
        <View style={{ flex: 1 }}>
          {leftSpacer}
        </View>

        <TouchableOpacity style={{ flexDirection: 'column', flex: 7 }} onLongPress={() => this.showActionSheet()}>
          {name}
          <View style={bubbleStyles}>
            <Text style={bubbleTextStyle}>
              {this.props.text}
            </Text>
          </View>
        </TouchableOpacity>
        {rightSpacer}
        <ActionSheet
          ref={o => this.ActionSheet = o}
          options={options}
          cancelButtonIndex={1}
          destructiveButtonIndex={2}
          onPress={(index) => { this.actionSheetAction(index) }}
        />
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

  messageBubbleRight_0: {
    backgroundColor: '#46a11c'
  },

  messageBubbleRight_1: {
    backgroundColor: '#2a65c6'
  },

  messageBubbleRight_2: {
    backgroundColor: '#a4196d'
  },

  messageBubbleTextRight: {
    color: 'white'
  },
})


export default MessageBubble;