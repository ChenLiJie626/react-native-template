import React, { Fragment, Component } from 'react';

import {
  StyleSheet,
  Text,
  TouchableHighlight,
  View,
} from 'react-native';


/**
 * Button with round corners
 */
export class FilledButton extends React.Component {


  render() {
    return (

      <TouchableHighlight
        onPress={this.props.onPress}
        underlayColor={this.props.highlightedColor}
        style={[styles.buttonBack, this.props.style]}
      >
        <Text
          style={[styles.buttonText, this.props.titleStyle]}
        >
          {this.props.title}
        </Text>
      </TouchableHighlight>
    );
  }
}




var styles = StyleSheet.create({
  buttonText: {
    backgroundColor: 'transparent',
    fontSize: 16,
    textAlign: 'center',
  },
  buttonBack: {
    padding: 12,
    borderRadius: 4,
  },
});

