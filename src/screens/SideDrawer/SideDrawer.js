import React, { Component } from 'react';
import { View, Text, Dimensions, StyleSheet, TouchableOpacity, Platform } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons'
import App from '../../../App'

class SideDrawer extends Component {
  render() {
    return (
      <View style={[styles.container, { width: Dimensions.get("window").width * 0.8 }]}>
        <TouchableOpacity onPress={this.logOut}>
          <View style={styles.drawerItem}>
            <Icon name={Platform.OS === "android" ? "md-log-out" : "ios-log-out"} size={30} color="#aaa" style={styles.drawerItemIcon} />
            <Text>Sign Out</Text>
          </View>
        </TouchableOpacity>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    paddingTop: 30,
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