import React from "react";
import { StyleSheet, FlatList } from "react-native";
import MessageBubble from '../MessageBubble/MessageBubble'

const bubbleList = props => {
  return (
    <FlatList
      style={styles.listContainer}
      data={props.messages}
      renderItem={(info) => {
       return (
        <MessageBubble
          text={info.item.message}
          sender_uid={info.item.sender_uid}
          sender_nick_name={info.item.sender_nick_name}
          type={info.item.type}
          sentAt={info.item.sent_at}
          dealStatus={info.item.deal_status}
          onItemPressed={() => {}}
          authUid = {props.authUid}
          messageId={info.item.key}
          startIndividualChat={props.startIndividualChat}
          deleteMessage = {props.deleteMessage}
        />
      )}}
    />
  );
};

const styles = StyleSheet.create({
  listContainer: {
    width: "100%"
  }
});

export default bubbleList