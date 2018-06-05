import React, { Component } from 'react';
import { View, Text, Dimensions, StyleSheet, TouchableOpacity, Platform } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons'
import App from '../../../App'

class SideDrawer extends Component {

  logOut = () => {
    // firebase.auth()
    //   .signOut()
    //   .then(() =>
    App()
    // )
    // .catch(err => {
    //   console.log(err);
    //   alert('fail logout');
    // })
  };

  required = () => {
    this.props.changeDrawerIsClosed()
    this.props.drawer.close();
    this.props.navigator.push({
      screen: "soySauce.AuthSwipeScreen",
      title: '求められているもの一覧',
    });
  };


  render() {
    return (
      <View style={[styles.container, { width: Dimensions.get("window").width * 0.8 }]}>
        <TouchableOpacity>
          <View style={styles.drawerItem}>
            <Icon name={Platform.OS === "android" ? "md-log-out" : "ios-log-out"} size={30} color="#aaa" style={styles.drawerItemIcon} />
            <Text>プロフィール</Text>
          </View>
        </TouchableOpacity>

        <TouchableOpacity onPress={this.required}>
          <View style={styles.drawerItem}>
            <Icon name={Platform.OS === "android" ? "md-log-out" : "ios-log-out"} size={30} color="#aaa" style={styles.drawerItemIcon} />
            <Text>求められているもの一覧</Text>
          </View>
        </TouchableOpacity>

        <TouchableOpacity>
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

export default SideDrawer;