import React, { Component } from 'react';
import { Container, Content, List, ListItem, Left, Body, Right, Text, Thumbnail } from 'native-base';
import { TouchableOpacity, View, ActivityIndicator, RefreshControl } from 'react-native'
import { getDeals, getIndividualMessages } from '../../store/actions/index';
import { connect } from 'react-redux';
import firebase from 'react-native-firebase';
import checkUnreadIndex from '../../utility/unreadIndex'
import timeToMonthDate from '../../utility/timeToMonthDate'


class ChatList extends Component {

  constructor(props) {
    super(props);
    this.state = {
      refreshing: false,
    };
  }

  _onRefresh = () => {
    this.setState({ refreshing: true });
    this.props.onGetDeals()
    this.setState({ refreshing: false });
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

  searchBarTextFilter = (value) => {
    console.log(value, 'rrr')
    function converToKana(str) {
      return str.replace(/[ぁ-ん]/g, function (s) {
        return String.fromCharCode(s.charCodeAt(0) + 0x60);
      });
    }
    let name = value.borrower_nick_name;
    if (this.props.authUid === value.borrower_uid) name = value.lender_nick_name;
    reg = new RegExp(converToKana(this.props.searchBarText));
    return converToKana(value.initial_message).match(reg) || converToKana(name).match(reg);
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
        <Content
          refreshControl={
            <RefreshControl
              refreshing={this.state.refreshing}
              onRefresh={this._onRefresh}
            />
          }>
          <List dataArray={this.props.deals.filter(this.searchBarTextFilter)}
            renderRow={(item, _, index) => {
              console.log(unreadIndex, parseInt(index, 10), unreadIndex.indexOf(parseInt(index, 10)))
              const isUnreaded = (unreadIndex.indexOf(parseInt(index, 10)) !== -1)
              const date = timeToMonthDate(item.deal_last_at)
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
                      <Text note>{item.deal_last_at && item.deal_last_at.toTimeString().slice(0, 5)}</Text>
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
    searchBarText: state.messages.searchBarText
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ChatList);