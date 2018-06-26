import React, { Component } from 'react';
import { Container, Content, List, ListItem, Left, Body, Right, Text, Thumbnail } from 'native-base';
import { TouchableOpacity, View, ActivityIndicator } from 'react-native'
import { getDeals, getIndividualMessages } from '../../store/actions/index';
import { connect } from 'react-redux';
import firebase from 'react-native-firebase';
import checkUnreadIndex from '../../utility/unreadIndex'


class ChatList extends Component {

  componentWillMount() {
    this.props.onGetDeals();
  }

  componentDidMount() {
    // Firestoreの「messages」コレクションを参照
    this.ref = firebase.firestore()
      .collection('users')
      .doc(this.props.authUid);
    // refの更新時イベントにonCollectionUpdate登録
    this.unsubscribe = this.ref.onSnapshot(this.props.onGetDeals);
  }

  componentWillunmount() {
    // onCollectionUpdateの登録解除
    this.unsubscribe();
  }

  startIndividualChat = (messageId, initialMessage) => {
    console.log('here')
    console.log(messageId, initialMessage)
    this.props.navigator.push({
      screen: "soySauce.IndividualChatScreen",
      passProps: {
        messageId: messageId,
      },
      title: initialMessage
    });
  }

  render() {
    if (this.props.deals.length === 0) {
      return (
        <View style={{ flex: 1, justifyContent: 'center' }}><ActivityIndicator /></View>
      )
    }

    //既読確認
    var unreadIndex = checkUnreadIndex(this.props.deals, this.props.authUid)
    console.log(unreadIndex)
    return (
      <Container>
        <Content>
          <List dataArray={this.props.deals}
            renderRow={(item, _, index) => {
              console.log(unreadIndex, parseInt(index, 10), unreadIndex.indexOf(parseInt(index, 10)))
              const isUnreaded = (unreadIndex.indexOf(parseInt(index, 10)) !== -1)
              let date;
              if (item.deal_last_at.toLocaleDateString()[1] === '/' || item.deal_last_at.toLocaleDateString()[2] === '/') {
                date = item.deal_last_at.toLocaleDateString().slice(0, -5)
              } else {
                date = item.deal_last_at.toLocaleDateString().slice(5)
              }
              let name = item.borrower_nick_name;
              if (this.props.authUid === item.borrower_uid) name = item.lender_nick_name;
              return (
                <View style={{ backgroundColor: isUnreaded === true ? '#B1F9D0' : null }}>
                  <ListItem button onPress={() => { this.startIndividualChat(item.messageId, item.initial_message) }} >
                    <Body>
                      <View style={{ flexDirection: 'row' }}>
                        <Thumbnail small source={{ uri: "https://facebook.github.io/react-native/docs/assets/favicon.png" }} style={{ width: 20, height: 20 }} />
                        <Text>{name}</Text>
                      </View>
                      <Text>{item.initial_message}</Text>
                      <Text note>{item.last_deal_message}</Text>
                    </Body>
                    <Right>
                      <Text note>{item.deal_last_at.toTimeString().slice(0, 5)}</Text>
                      <Text note>{date}</Text>
                    </Right>
                  </ListItem>
                </View>
              )
            }
            }>
          </List>
        </Content>
      </Container>
    );
  }
}

const mapDispatchToProps = dispatch => {
  return {
    onGetDeals: () => dispatch(getDeals()),
    // onGetIndividualMessages: (messageId) => dispatch(getIndividualMessages(messageId))
  };
};


const mapStateToProps = state => {
  return {
    deals: state.messages.deals,
    authUid: state.auth.uid,
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ChatList);