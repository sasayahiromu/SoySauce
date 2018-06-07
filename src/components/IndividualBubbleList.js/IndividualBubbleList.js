import React from "react";
import { StyleSheet, FlatList } from "react-native";
import IndivudualChatBubble from '../IndivudualChatBubble/IndividualChatBubble'

const IndividualBubbleList = props => {
  return (
    <FlatList
      style={styles.listContainer}
      data={props.messages}
      renderItem={(info) => {
       return (
        <IndivudualChatBubble
          text={info.item.message}
          sender_uid={info.item.sender_uid}
          sender_nick_name={info.item.sender_nick_name}
          sentAt={info.item.sent_at}
          onItemPressed={() => {}}
          authUid = {props.authUid}
          messageId={info.item.key}
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

export default IndividualBubbleList