import React, { Component } from 'react';
import {
  Text,
} from 'react-native';

import ScrollableTabView, { DefaultTabBar, } from 'react-native-scrollable-tab-view';
import BulletinBoardScreen from '../BulletinBoard/BulletinBoard'
import Drawer from 'react-native-drawer'
import SideDrawer from '../SideDrawer/SideDrawer'
import ChatList from '../ChatList/ChatList'

class MainTabs extends Component {

  state = {
    drawerIsClosed: true
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
          renderTabBar={() => <DefaultTabBar style={{ height: 40 }} tabStyle={{ paddingBottom: 0 }} />}
        >
          <BulletinBoardScreen tabLabel='掲示板' navigator={this.props.navigator}/>
          <ChatList tabLabel='チャット' navigator={this.props.navigator}/>
        </ScrollableTabView>
      </Drawer>
    )
  }
}

export default MainTabs;
