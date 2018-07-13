import React, { Component } from 'react';
import { Container, Header, Item, Input, Icon, Button, Text } from 'native-base';
import { View } from 'react-native';
import { searchBarText } from '../../store/actions/index';
import { connect } from "react-redux";

class NavView extends Component {

  onChangeInputBarText = (text) => {
    this.props.onsearchBarText(text);
  }
  render() {
    return (
      <Container style={{ width: 300 }}>
        <Header searchBar rounded style={{ backgroundColor: 'white', paddingTop: 0, height: 50 }}>
          <Item style={{ backgroundColor: '#efefef', height: 25 }}>
            <Icon name="ios-search" />
            <Input placeholder="検索"
              onChangeText={(text) => { this.onChangeInputBarText(text) }} />
          </Item>
        </Header>
      </Container>
    )
  }
}

const mapDispatchToProps = dispatch => {
  return {
    onsearchBarText: (text) => dispatch(searchBarText(text)),
  };
};

export default connect(null, mapDispatchToProps)(NavView);