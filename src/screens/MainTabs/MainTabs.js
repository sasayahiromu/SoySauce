import React, { Component } from 'react';
import { Text } from 'react-native';
import { connect } from "react-redux";

import ScrollableTabView from 'react-native-scrollable-tab-view';
import BulletinBoardScreen from '../BulletinBoard/BulletinBoard'
import Drawer from 'react-native-drawer'
import SideDrawer from '../SideDrawer/SideDrawer'
import ChatList from '../ChatList/ChatList'
import firebase from 'react-native-firebase';
import type { RemoteMessage } from 'react-native-firebase';
import DefaultTabBar from '../../components/UI/CustomTabBar/CustomTabBar'
import checkUnreadIndex from '../../utility/unreadIndex'
import { getDeals } from '../../store/actions/index';


class MainTabs extends Component {

  state = {
    drawerIsClosed: true,
    loadedDeals: false
  }
  componentWillMount() {
    console.log(!this.props.authUid)
    this.props.onGetDeals();
  }

  componentDidMount() {
    this.authSubscription = firebase.auth().onAuthStateChanged((user) => {
      console.log('MainTabs')
      console.log(user)
      firebase.messaging().hasPermission()
        .then(enabled => {
          if (!enabled) {
            firebase.messaging().requestPermission()
              .then(() => {
                firebase.messaging().getToken().then(token => {
                  firebase.firestore().collection("users").doc(user._user.uid).update({ push_token: token });
                });
              })
              .catch(error => {
                // User has rejected permissions  
              });
          } else {
            firebase.messaging().getToken().then(token => {
              firebase.firestore().collection("users").doc(user._user.uid).update({ push_token: token });
            });
          }
        });
    })
    // this.messageListener = firebase.messaging().onMessage((message: RemoteMessage) => {
    //   // alert('message')
    //   // alert(message)
    // });
    // Firestoreの「messages」コレクションを参照
    this.ref = firebase.firestore()
      .collection('users')
      .doc(this.props.authUid);
    // refの更新時イベントにonCollectionUpdate登録
    this.unsubscribe = this.ref.onSnapshot(this.props.onGetDeals);
  }

  componentWillUnmount() {
    // this.messageListener();
    this.unsubscribe();
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
    console.log(1)
    if(!this.state.loadedDeals){
      console.log(2)
      if(!!this.props.authUid){
        console.log(3)
        this.props.onGetDeals();
        this.setState({loadedDeals: true});
      }
    }

    const scrollBarProps = {
      keyboardShouldPersistTaps: 'always',
      keyboardDismissMode: 'none',
    };
    var unreadIndex = checkUnreadIndex(this.props.deals, this.props.authUid);
    let isThereUnread = false;
    console.log(unreadIndex, unreadIndex.length, 'rere')
    if (unreadIndex.length !== 0) {
      isThereUnread = true;
    }
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
          renderTabBar={() =>
            <DefaultTabBar
              style={{ height: 40 }}
              tabStyle={{ paddingBottom: 0 }}
              chatTabName='チャット'
              isThereUnread={isThereUnread}
              unreadStyle={{ backgroundColor: 'red' }}
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
    deals: state.messages.deals,
    authUid: state.auth.uid
  };
};

const mapDispatchToProps = dispatch => {
  return {
    onGetDeals: () => dispatch(getDeals()),
    // onGetIndividualMessages: (messageId) => dispatch(getIndividualMessages(messageId))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(MainTabs);