import React, { Component } from 'react';
import { Container, Content, List, ListItem, Left, Body, Right, Text, Thumbnail } from 'native-base';
import { TouchableOpacity, View } from 'react-native'
import { getDeals } from '../../store/actions/index';
import { connect } from 'react-redux';


class ChatList extends Component {

  componentWillMount() {
    this.props.onGetDeals();
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

  // onPress={this.startIndividualChat(item.messageId, item.initial_message)}

  pressHandler = (name) =>{
    console.log(name)
    alert(name)
  }

  render() {
    return (
      <Container>
        <Content>
          <List dataArray={this.props.deals}
            renderRow={(item) => {
              console.log(item)
              let name = item.borrower_nick_name;
              if(this.props.authUid===item.borrower_uid) name = item.lender_nick_name;
              return (
                <ListItem>
                  <TouchableOpacity 
                  // onPress={(messageId, initialMessage) => this.startIndividualChat(messageId, initialMessage)}
                  onPress = {() => this.startIndividualChat(item.messageId ,item.initial_message)}
                  >
                    <Body>
                      <View style={{ flexDirection: 'row' }}>
                        <Thumbnail small source={{ uri: "https://facebook.github.io/react-native/docs/assets/favicon.png" }} style={{ width: 20, height: 20 }} />
                        <Text>{name}</Text>
                      </View>
                      <Text>{item.initial_message}</Text>
                      <Text note>{item.last_deal_message}</Text>
                    </Body>
                  </TouchableOpacity>
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
  };
};


const mapStateToProps = state => {
  return {
    deals: state.messages.deals,
    authUid: state.auth.uid,
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ChatList);