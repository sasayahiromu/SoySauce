import React, { Component } from "react";
import { StyleSheet, FlatList, View } from "react-native";
import { Button, Text } from 'native-base';
import IndivudualChatBubble from '../IndivudualChatBubble/IndividualChatBubble'


class IndividualBubbleList extends Component {

  render() {
    console.log('IndividualBubbleList', this.props.allMessages[this.props.messageId])
    this.props.onUpdateOpenIndividualMessageAt(this.props.messageId);
    console.log(this.props.allMessages[this.props.messageId])
    return (
      <FlatList
        style={styles.listContainer}
        data={this.props.allMessages[this.props.messageId]}
        extradata={this.props.messagetriger}
        renderItem={({ item, index }) => {
          console.log(index)
          let messageMaxAlert = null;
          if (index === 19) {
            messageMaxAlert = (<View style={{
              flex: 1,
              flexDirection: 'row',
              justifyContent: 'center',
              marginTop: 10
            }}>
              <Button rounded dark disabled style={{ height: 25 }}>
                <Text style={{ fontSize: 10, color: 'white' }}>メッセージ数上限まで残り30です</Text>
              </Button>
            </View>)
          }
          if (index === 39) {
            messageMaxAlert = (<View style={{
              flex: 1,
              flexDirection: 'row',
              justifyContent: 'center',
              marginTop: 10
            }}>
              <Button rounded dark disabled style={{ height: 25 }}>
                <Text style={{ fontSize: 10, color: 'white' }}>メッセージ数上限まで残り10です</Text>
              </Button>
            </View>)
          }
          if (index === 49) {
            messageMaxAlert = (<View style={{
              flex: 1,
              flexDirection: 'row',
              justifyContent: 'center',
              marginTop: 10
            }}>
              <Button rounded dark disabled style={{ height: 25 }}>
                <Text style={{ fontSize: 10, color: 'white' }}>メッセージ数上限に達しました</Text>
              </Button>
            </View>)
          }
          let date;
          let dateBox = null;
          if (item.sent_at) {
            if (item.sent_at.toLocaleDateString()[1] === '/' || item.sent_at.toLocaleDateString()[2] === '/') {
              date = item.sent_at.toLocaleDateString().slice(0, -5)
            } else {
              date = item.sent_at.toLocaleDateString().slice(5)
            }
            if (index === 0 || this.props.allMessages[this.props.messageId][index].sent_at.toDateString()
              !== this.props.allMessages[this.props.messageId][index - 1].sent_at.toDateString()) {
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
              <IndivudualChatBubble
                text={item.message}
                sender_uid={item.sender_uid}
                sender_nick_name={item.sender_nick_name}
                sentAt={item.sent_at}
                onItemPressed={() => { }}
                authUid={this.props.authUid}
                individualMessageId={item.key} //個別チャットのID
                messageId={this.props.messageId} //全体チャット内のID
                deleteIndividualMessage={this.props.deleteIndividualMessage}
              />
              {messageMaxAlert}
            </View>
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