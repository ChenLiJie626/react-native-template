/* eslint-disable class-methods-use-this */
import React from 'react';
import { StyleSheet, View, Text, Switch, Platform,PermissionsAndroid  } from 'react-native';
import { init,Geolocation,addLocationListener,start } from "react-native-amap-geolocation";

import { colors, fonts } from '../../styles';
import { MapView } from "react-native-amap3d";
import commonStyles from "./styles";

class CalendarScreen extends React.Component {
  constructor() {
    super();
    this.state={
      latitude: 39.91095,
      longitude: 116.37296
    }
  }
  async componentDidMount() {

    // 对于 Android 需要自行根据需要申请权限
    await PermissionsAndroid.requestMultiple([
      PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
      PermissionsAndroid.PERMISSIONS.ACCESS_COARSE_LOCATION,
    ]);

// 使用自己申请的高德 App Key 进行初始化
    await init({
      android: "de4a1ad5a507ffb1327b7db2df4a2c5e"
    });

    Geolocation.getCurrentPosition(({ coords }) => {
      console.log(coords);
      this.setState({
        latitude: coords.latitude,
        longitude: coords.longitude,
      })
    })


  }

  rowHasChanged(r1, r2) {
    return r1.name !== r2.name;
  }

  renderEmptyDate() {
    return (
      <View style={styles.emptyDate}>
        <Text>This is empty date!</Text>
      </View>
    );
  }

  renderItem(item) {
    const labels =
      item.labels &&
      item.labels.map(label => (
        <View
          key={`label-${label}`}
          style={{
            padding: 5,
            backgroundColor:
              label === 'Urgent' ? colors.primary : colors.secondary,
            borderRadius: 3,
          }}
        >
          <Text style={{ color: 'white' }}>{label}</Text>
        </View>
      ));

    return (
      <View style={styles.item}>
        <View>
          <Text
            style={{
              color: '#48506B',
              fontFamily: fonts.primaryRegular,
              marginBottom: 10,
            }}
          >
            {item.name}
          </Text>
          <Text style={{ color: '#9B9B9B', fontFamily: fonts.primaryRegular }}>
            {item.time}
          </Text>
        </View>

        <View styleName="horizontal h-start">{labels}</View>
      </View>
    );
  }
  static navigationOptions = { title: "图层的显示" };

  state = {
    showsLabels: true,
    showsTraffic: false,
    showsBuildings: false
  };
  render() {
    const { items, loadItems } = this.props;
    return (
      <View style={StyleSheet.absoluteFill}>
        <MapView
          zoomLevel={17}
          center={{
            latitude: this.state.latitude,
            longitude: this.state.longitude
          }}
          tilt={60}
          showsLabels={this.state.showsLabels}
          showsTraffic={this.state.showsTraffic}
          showsBuildings={this.state.showsBuildings}
          style={styles.map}
        />
        <View style={styles.controls}>
          <View style={styles.control}>
            <Text style={styles.label}>建筑</Text>
            <Switch
              onValueChange={showsBuildings => this.setState({ showsBuildings })}
              value={this.state.showsBuildings}
            />
          </View>
          <View style={styles.control}>
            <Text style={styles.label}>路况</Text>
            <Switch
              onValueChange={showsTraffic => this.setState({ showsTraffic })}
              value={this.state.showsTraffic}
            />
          </View>
          <View style={styles.control}>
            <Text style={styles.label}>标签</Text>
            <Switch
              onValueChange={showsLabels => this.setState({ showsLabels })}
              value={this.state.showsLabels}
            />
          </View>
        </View>
      </View>
    );
  }
}

const styles = {
  ...commonStyles,
  map: [
    commonStyles.map,
    {
      ...Platform.select({
        ios: {
          marginBottom: 54
        }
      })
    }
  ],
  controls: [
    commonStyles.controls,
    {
      height: 54
    }
  ],
  control: [
    commonStyles.control,
    {
      flexDirection: "row"
    }
  ],
  label: {
    marginRight: 5
  }
};


export default CalendarScreen;
