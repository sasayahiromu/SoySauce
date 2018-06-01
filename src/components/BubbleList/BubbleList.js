import React from "react";
import { StyleSheet, FlatList } from "react-native";
import MessageBubble from '../MessageBubble/MessageBubble'

const bubbleList = props => {
  return (
    <FlatList
      style={styles.listContainer}
      data={props.messages}
      renderItem={(info) => {
        console.log(info)
       return (
        <MessageBubble
          text={info.item.text}
          sender={info.item.sender}
          type={info.item.type}
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