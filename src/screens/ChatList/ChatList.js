import React, { Component } from 'react';
import { Container, Content, List, ListItem, Left, Body, Right, Text, Thumbnail} from 'native-base';
import { TouchableOpacity, View ,ActivityIndicator} from 'react-native'
import { getDeals, getIndividualMessages } from '../../store/actions/index';
import { connect } from 'react-redux';
import firebase from 'react-native-firebase';


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

  pressHandler = (name) => {
    console.log(name)
    alert(name)
  }

  render() {
    if (this.props.deals.length === 0) {
      return (
        <View style={{ flex: 1, justifyContent: 'center' }}><ActivityIndicator /></View>
      )
    }
    return (
      <Container>
        <Content>
          <List dataArray={this.props.deals}
            renderRow={(item) => {
              console.log(item)
              let name = item.borrower_nick_name;
              if (this.props.authUid === item.borrower_uid) name = item.lender_nick_name;
              return (
                <ListItem button onPress={() => { this.startIndividualChat(item.messageId, item.initial_message) }}>
                  <Body>
                    <View style={{ flexDirection: 'row' }}>
                      <Thumbnail small source={{ uri: "https://facebook.github.io/react-native/docs/assets/favicon.png" }} style={{ width: 20, height: 20 }} />
                      <Text>{name}</Text>
                    </View>
                    <Text>{item.initial_message}</Text>
                    <Text note>{item.last_deal_message}</Text>
                  </Body>
                  {/* <Right>
        <Text note>3:43 pm</Text>
      </Right> */}
                </ListItem>
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