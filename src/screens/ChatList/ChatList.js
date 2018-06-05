import React, { Component } from 'react';
import { Container, Content, List, ListItem, Left, Body, Right, Text } from 'native-base';
import { TouchableOpacity } from 'react-native'

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
                  <Text>Kumar Pratik</Text>
                  <Text note>Doing what you like will always keep you happy . .</Text>
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