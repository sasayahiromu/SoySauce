import React, { Component } from 'react';
import { Container, Content, List, ListItem, Left, Body, Right, Text, Thumbnail } from 'native-base';
import { TouchableOpacity, View } from 'react-native'

export default class ListAvatarExample extends Component {
  render() {
    return (
      <Container>
        {/* <Header /> */}
        <Content>
          <List>
            <ListItem>
              <TouchableOpacity>
                <Body>
                  <View style={{ flexDirection: 'row' }}>
                    <Thumbnail small source={{ uri: "https://facebook.github.io/react-native/docs/assets/favicon.png" }} style={{ width: 20, height: 20 }} />
                    <Text>sasaya</Text>
                  </View>
                  <Text>こんにちはゲームウォッチ貸しますよ</Text>
                  <Text note>明日の12時くらいに届けに行きます</Text>
                </Body>
              </TouchableOpacity>
              {/* <Right>
                <Text note>3:43 pm</Text>
              </Right> */}
            </ListItem>
          </List>
        </Content>
      </Container>
    );
  }
}