import React, { Component } from 'react';
import { Navigation } from 'react-native-navigation'
import { View, Text, Dimensions, StyleSheet, TouchableOpacity, Platform } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons'
import App from '../../../App'
import firebase from 'react-native-firebase';
import { registerUid, registerNickname } from "../../store/actions/index";
import { connect } from "react-redux";




class SideDrawer extends Component {

  constructor(props) {
    super(props);
  }

  required = () => {
    this.props.changeDrawerIsClosed()
    this.props.drawer.close();
    this.props.navigator.push({
      screen: "soySauce.RendBoardScreen",
      title: '求められているもの一覧',
    });
  }

  borrow = () => {
    this.props.changeDrawerIsClosed()
    this.props.drawer.close();
    this.props.navigator.push({
      screen: "soySauce.BorrowBoardScreen",
      title: '借りれるもの一覧',
    });
  }

  logOut = () => {
    firebase.auth()
      .signOut()
      .then(() => {
        this.props.onregisterUid("");
        this.props.onregisterNickname("");
        Navigation.startSingleScreenApp({
          screen: {
            screen: "soySauce.AuthSwipeScreen",
            title: "ログイン"
          },
        });
      })
      .catch(err => {
        console.log(err);
        alert('fail logout');
      })
  };




  render() {
    return (
      <View style={[styles.container, { width: Dimensions.get("window").width * 0.8 }]}>
        {/* <TouchableOpacity>
          <View style={styles.drawerItem}>
            <Icon name={Platform.OS === "android" ? "md-log-out" : "ios-log-out"} size={30} color="#aaa" style={styles.drawerItemIcon} />
            <Text>プロフィール</Text>
          </View>
        </TouchableOpacity> */}

        <TouchableOpacity onPress={this.required}>
          <View style={styles.drawerItem}>
            <Icon name={Platform.OS === "android" ? "md-log-out" : "ios-log-out"} size={30} color="#aaa" style={styles.drawerItemIcon} />
            <Text>求められているもの一覧</Text>
          </View>
        </TouchableOpacity>

        <TouchableOpacity onPress={this.borrow}>
          <View style={styles.drawerItem}>
            <Icon name={Platform.OS === "android" ? "md-log-out" : "ios-log-out"} size={30} color="#aaa" style={styles.drawerItemIcon} />
            <Text>借りれるもの一覧</Text>
          </View>
        </TouchableOpacity>

        <TouchableOpacity onPress={this.logOut}>
          <View style={styles.drawerItem}>
            <Icon name={Platform.OS === "android" ? "md-log-out" : "ios-log-out"} size={30} color="#aaa" style={styles.drawerItemIcon} />
            <Text>サインアウト</Text>
          </View>
        </TouchableOpacity>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "white",
    flex: 1
  },
  drawerItem: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#eee"
  },
  drawerItemIcon: {
    marginRight: 10,
    padding: 10
  }
})

const mapDispatchToProps = dispatch => {
  return {
    onregisterUid: (uid) => dispatch(registerUid(uid)),
    onregisterNickname: (nickname) => dispatch(registerNickname(nickname)),
  };
};

export default connect(null, mapDispatchToProps)(SideDrawer);