import React, { Component } from 'react';
import { View, StyleSheet, TouchableOpacity, Clipboard } from 'react-native'
import { Text, Thumbnail } from 'native-base'
import ActionSheet from 'react-native-actionsheet'


//props text type　sender

class IndivudualChatBubble extends Component {

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
        this.props.deleteIndividualMessage(this.props.messageId, this.props.individualMessageId);
        break;
    }
  }

  render() {
    thumbnail = (
      <Thumbnail small source={{ uri: "https://facebook.github.io/react-native/docs/assets/favicon.png" }} style={{ width: 25, height: 25 }} />
    )

    var leftSpacer = this.props.authUid !== this.props.sender_uid ? thumbnail : <View style={{ width: 70 }} />;
    var rightSpacer = null
    if (this.props.authUid !== this.props.sender_uid) {
      <View style={{ flex: 2 }}>
        <View style={{ width: 70 }} />
      </View>
    }

    var name = this.props.authUid !== this.props.sender_uid ?
      (<Text style={{ fontSize: 10 }}>{this.props.sender_nick_name}</Text>)
      : null

    var bubbleStyles = this.props.authUid !== this.props.sender_uid ? [styles.messageBubble, styles.messageBubbleLeft] : [styles.messageBubble, styles.messageBubbleRight];

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

  messageBubbleTextRight: {
    color: 'white'
  },
})


export default IndivudualChatBubble;