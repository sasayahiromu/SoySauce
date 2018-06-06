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
          sender={info.item.sender}
          type={info.item.type}
          sentAt={info.item.sent_at}
          dealStatus={info.item.deal_status}
          direction='left' //消す
          onItemPressed={() => {}}
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