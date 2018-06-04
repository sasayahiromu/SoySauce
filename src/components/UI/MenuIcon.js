import React, { Component } from 'react';
import {Icon} from 'native-base';
export default class MenuIcon extends Component {
  render() {
    return (
          <Icon ios='ios-menu' android="md-menu" style={{fontSize: 20, color: 'red'}}/>
    );
  }
}