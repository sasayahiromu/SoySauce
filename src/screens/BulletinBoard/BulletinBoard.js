import React, { Component } from 'react';
import { View, StyleSheet, TextInput, ScrollView, Text } from 'react-native'
import MessageBubble from "../../components/MessageBubble/MessageBubble";
import InputBar from "../../components/InputBar/InputBar";
import KeyboardSpacer from 'react-native-keyboard-spacer';
import MultiSwitch from '../../components/MultiSwitch/MultiSwitch'
import BubbleList from '../../components/BubbleList/BubbleList'

import { connect } from 'react-redux';

import { addMessage, getMessages } from '../../store/actions/index';

import Drawer from 'react-native-drawer'
import SideDrawer from '../SideDrawer/SideDrawer'


class BulletinBoardScreen extends Component {


  // static navigatorStyle = {
  // drawUnderNavBar: true,
  // navBarTranslucent: true,
  // navBarHidden: true
  // };


  state = {
    inputBarText: '',
    messages: [],
    drawerIsClosed: true
  }


  constructor(props) {
    super(props);
    this.props.navigator.setOnNavigatorEvent(this.onNavigatorEvent);
  }

  // showAnotherPage = page => {
  //   if(!page) return null
  //   let screen = ''
  //   let title = ''
  //   switch (page) {
  //     case "required":
  //       screen = 'soySauce.AuthSwipeScreen';
  //       title = '求められているもの一覧';
  //       break;
  //     default:
  //       screen = '';
  //   }
  //   this.props.navigator.push({
  //     screen: screen,
  //     title: title,
  //   });
  // }


  onNavigatorEvent = event => {
    if (event.type === "NavBarButtonPress") {
      if (event.id === "sideDrawerToggle") {
        console.log(this.props.navigator)
        this.state.drawerIsClosed ? this._drawer.open() : this._drawer.close()
        this.setState({
          drawerIsClosed: !this.state.drawerIsClosed
        })
      }
    }
  };

  componentWillMount() {
    this.props.onLoadMessages();
  }

  addMessageHandler = () => {
    const text = this.state.inputBarText
    const sender = 'sasaya' ///変更する
    const type = this.multiSwitch.state.selectedPosition
    this.props.onAddMessage(text, sender, type);
  }


  _onChangeInputBarText(text) {
    this.setState({
      inputBarText: text
    });
  }


  render() {
    return (
      <Drawer
        type="overlay"
        ref={(ref) => this._drawer = ref}
        content={<SideDrawer navigator={this.props.navigator} drawer={this._drawer}/>}
        tapToClose={true}
        // openDrawerOffset={0.2} // 20% gap on the right side of drawer
        panCloseMask={0.2}
      >
        <View style={styles.outer}>
          <ScrollView>
            <BubbleList messages={this.props.messages} />
          </ScrollView>
          <View style={styles.multiSwitchContainer}>
            <MultiSwitch ref={ref => (this.multiSwitch = ref)} />
          </View>
          <InputBar onSendPressed={() => { this.addMessageHandler() }}
            onSizeChange={() => { }}
            onChangeText={(text) => { this._onChangeInputBarText(text) }}
            text={this.state.inputBarText}
          />
          <KeyboardSpacer />
        </View>
      </Drawer>
    );
  }
}

const styles = StyleSheet.create({

  multiSwitchContainer: {
    alignItems: 'center',
    justifyContent: 'center',
  },

  //ChatView

  outer: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'space-between',
    backgroundColor: 'white'
  },

  messages: {
    flex: 1
  },
})


const mapDispatchToProps = dispatch => {
  return {
    onLoadMessages: () => dispatch(getMessages()),
    onAddMessage: (text, sender, type) => dispatch(addMessage(text, sender, type))
  };
};

const mapStateToProps = state => {
  return {
    messages: state.messages.messages
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(BulletinBoardScreen);