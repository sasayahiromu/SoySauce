import React, { Component } from 'react';
import { Text } from 'react-native';
import { connect } from "react-redux";

import ScrollableTabView, { DefaultTabBar, } from 'react-native-scrollable-tab-view';
import BulletinBoardScreen from '../BulletinBoard/BulletinBoard'
import Drawer from 'react-native-drawer'
import SideDrawer from '../SideDrawer/SideDrawer'
import ChatList from '../ChatList/ChatList'
import firebase from 'react-native-firebase';
import type { RemoteMessage } from 'react-native-firebase';

class MainTabs extends Component {

  state = {
    drawerIsClosed: true
  }
  componentDidMount() {
    this.authSubscription = firebase.auth().onAuthStateChanged((user) => {
      console.log(user)
    firebase.messaging().hasPermission()
      .then(enabled => {
        if (!enabled) {
          firebase.messaging().requestPermission()
            .then(() => {
              firebase.messaging().getToken().then(token => {
                firebase.firestore().collection("users").doc(user._user.uid).update({ pushToken: token });
              });
            })
            .catch(error => {
              // User has rejected permissions  
            });
        } else {
          firebase.messaging().getToken().then(token => {
              firebase.firestore().collection("users").doc(user._user.uid).update({ pushToken: token });
        });
        }
      });
    })
    this.messageListener = firebase.messaging().onMessage((message: RemoteMessage) => {
      alert('message')
      alert(message)
    });
  }

  componentWillUnmount() {
    this.messageListener();
  }

  constructor(props) {
    super(props);
    this.props.navigator.setOnNavigatorEvent(this.onNavigatorEvent);
    console.log(this.props.navigator.setOnNavigatorEvent)
  }

  changeDrawerIsClosed = () => {
    this.setState({
      drawerIsClosed: !this.state.drawerIsClosed
    })
  }

  onNavigatorEvent = event => {
    if (event.type === "NavBarButtonPress") {
      if (event.id === "sideDrawerToggle") {
        this.state.drawerIsClosed ? this._drawer.open() : this._drawer.close()
        this.setState({
          drawerIsClosed: !this.state.drawerIsClosed
        })
      }
    }
  };

  render() {
    const scrollBarProps = {
      keyboardShouldPersistTaps: 'always',
      keyboardDismissMode: 'none',
    };
    return (
      <Drawer
        type="overlay"
        ref={(ref) => this._drawer = ref}
        content={<SideDrawer changeDrawerIsClosed={this.changeDrawerIsClosed} navigator={this.props.navigator} drawer={this._drawer} />}
        tapToClose={true}
        // openDrawerOffset={0.2} // 20% gap on the right side of drawer
        panCloseMask={0.2}
      >
        <ScrollableTabView
          initialPage={0}
          renderTabBar={() => <DefaultTabBar style={{ height: 40 }} tabStyle={{ paddingBottom: 0 }}
          />}
          contentProps={scrollBarProps}
        >
          <BulletinBoardScreen tabLabel='掲示板' navigator={this.props.navigator} />
          <ChatList tabLabel='チャット' navigator={this.props.navigator} />
        </ScrollableTabView>
      </Drawer>
    )
  }
}

const mapStateToProps = state => {
  return {
    authUid: state.auth.uid,
  };
};

export default connect(mapStateToProps, null)(MainTabs);