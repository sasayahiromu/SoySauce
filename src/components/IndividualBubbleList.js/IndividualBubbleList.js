import React, { Component } from "react";
import { StyleSheet, FlatList } from "react-native";
import IndivudualChatBubble from '../IndivudualChatBubble/IndividualChatBubble'


class IndividualBubbleList extends Component {

  render() {
    return (
      <FlatList
        style={styles.listContainer}
        data={this.props.allMessages[this.props.messageId]}
        extradata={this.props.messagetriger}
        renderItem={(info) => {
          return (
            <IndivudualChatBubble
              text={info.item.message}
              sender_uid={info.item.sender_uid}
              sender_nick_name={info.item.sender_nick_name}
              sentAt={info.item.sent_at}
              onItemPressed={() => { }}
              authUid={this.props.authUid}
              individualMessageId={info.item.key} //個別チャットのID
              messageId={this.props.messageId} //全体チャット内のID
              deleteIndividualMessage={this.props.deleteIndividualMessage}
            />
          )
        }}
      />
    );
  }
}

const styles = StyleSheet.create({
  listContainer: {
    width: "100%"
  }
});

export default IndividualBubbleList