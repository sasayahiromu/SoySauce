import React from "react";
import { StyleSheet, FlatList, View } from "react-native";
import { Button, Text } from 'native-base';
import MessageBubble from '../MessageBubble/MessageBubble'

const bubbleList = props => {
  return (
    <FlatList
      style={styles.listContainer}
      data={props.messages}
      renderItem={({ item, index }) => {
        let date;
        let dateBox = null;
        if (item.sent_at) {
          if (item.sent_at.toLocaleDateString()[1] === '/' || item.sent_at.toLocaleDateString()[2] === '/') {
            date = item.sent_at.toLocaleDateString().slice(0, -5)
          } else {
            date = item.sent_at.toLocaleDateString().slice(5)
          }
          if (index === 0 || props.messages[index].sent_at.toDateString() !== props.messages[index - 1].sent_at.toDateString()) {
            dateBox = (<View style={{
              flex: 1,
              flexDirection: 'row',
              justifyContent: 'center',
              marginTop: 10
            }}>
              <Button rounded dark disabled style={{ height: 25 }}>
                <Text style={{ fontSize: 10, color: 'white' }}>{date}</Text>
              </Button>
            </View>)
          }
        }


        return (
          <View>
            {dateBox}
            <MessageBubble
              text={item.message}
              sender_uid={item.sender_uid}
              sender_nick_name={item.sender_nick_name}
              type={item.type}
              sentAt={item.sent_at}
              dealStatus={item.deal_status}
              onItemPressed={() => { }}
              authUid={props.authUid}
              messageId={item.key}
              startIndividualChat={props.startIndividualChat}
              deleteMessage={props.deleteMessage}
            />
          </View>
        )
      }}
    />
  );
};

const styles = StyleSheet.create({
  listContainer: {
    width: "100%"
  }
});

export default bubbleList