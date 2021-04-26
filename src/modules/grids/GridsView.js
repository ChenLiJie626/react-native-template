import React from 'react';
import {
  StyleSheet,
  View,
  Platform,
  Text,
  FlatList,
  TouchableOpacity,
  Image,
  Dimensions,
} from 'react-native';
import { colors, fonts } from '../../styles';

import { RadioGroup, GridRow } from '../../components';
import ImageView from 'react-native-image-viewing';
import StarRating from 'react-native-star-rating';
import Icon from 'react-native-vector-icons/FontAwesome';

const { width } = Dimensions.get('window');

export default class GridsScreen extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      imageIndex: 0,
      isImageViewVisible: false,
      starCount: 3.5

    };

  }

  _getRenderItemFunction = () =>
    [this.renderRowOne, this.renderRowTwo, this.renderRowThree][
      this.props.tabIndex
      ];

  _openArticle = article => {
    this.props.navigation.navigate('Article', {
      article,
    });
  };


  renderRowOne = rowData => {
    const cellViews = rowData.item.map(item => (
      <View key={item.id}>

        <View style={styles.itemOneContainer}>
          <TouchableOpacity key={item.id} onPress={() => {
            this.setState({
              imageIndex: item.id - 1,
              isImageViewVisible: true,
            });
          }}>
            <View style={styles.itemOneImageContainer}>
              <Image style={styles.itemOneImage} source={{ uri: item.image }} />
            </View>
          </TouchableOpacity>

          <View style={styles.itemOneContent}>
            <View style={styles.avatarContainer}>
              <Image
                style={styles.avatar}
                source={require('../../../assets/images/drawer/user.png')}
              />
              <View style={{ paddingLeft: 15 }}>
                <Text style={styles.userName}>John Doe</Text>
              </View>
            </View>
            <Text
              style={styles.itemOneSubTitle}
              styleName="collapsible"
              numberOfLines={3}
            >
              {item.subtitle}
            </Text>
            <Text style={styles.rating}>
              <StarRating
                disabled={false}
                rating={this.state.starCount}
                maxStars={5}
                halfStarEnabled={true}
                emptyStar={require('./assets/icon_unselect.png')}
                halfStar={require('./assets/icon_half_select.png')}
                fullStar={require('./assets/icon_selected.png')}
                starStyle={{width: 10, height: 10}}
                selectedStar={(rating)=>{}}/>
            </Text>
          </View>
        </View>
      </View>
    ));
    return (
      <View key={rowData.item[0].id} style={styles.itemOneRow}>
        {cellViews}
      </View>
    );
  };

  renderRowTwo = ({ item }) => (
    <TouchableOpacity
      key={item.id}
      style={styles.itemTwoContainer}
      onPress={() => this._openArticle(item)}
    >
      <View style={styles.itemTwoContent}>
        <Image style={styles.itemTwoImage} source={{ uri: item.image }} />
        <View style={styles.itemTwoOverlay} />
        <Text style={styles.itemTwoTitle}>{item.title}</Text>
        <Text style={styles.itemTwoSubTitle}>{item.subtitle}</Text>
        <Text style={styles.itemTwoPrice}>{item.price}</Text>
      </View>
    </TouchableOpacity>
  );

  renderRowThree = ({ item }) => (
    <TouchableOpacity
      key={item.id}
      style={styles.itemThreeContainer}
      onPress={() => this._openArticle(item)}
    >
      <View style={styles.itemThreeSubContainer}>
        <Image source={{ uri: item.image }} style={styles.itemThreeImage} />
        <View style={styles.itemThreeContent}>
          <Text style={styles.itemThreeBrand}>{item.brand}</Text>
          <View>
            <Text style={styles.itemThreeTitle}>{item.title}</Text>
            <Text style={styles.itemThreeSubtitle} numberOfLines={1}>
              {item.subtitle}
            </Text>
          </View>
          <View style={styles.itemThreeMetaContainer}>
            {item.badge && (
              <View
                style={[
                  styles.badge,
                  item.badge === 'NEW' && { backgroundColor: colors.green },
                ]}
              >
                <Text
                  style={{ fontSize: 10, color: colors.white }}
                  styleName="bright"
                >
                  {item.badge}
                </Text>
              </View>
            )}
            <Text style={styles.itemThreePrice}>{item.price}</Text>
          </View>
        </View>
      </View>
      <View style={styles.itemThreeHr} />
    </TouchableOpacity>
  );

  render() {
    const groupedData =
      this.props.tabIndex === 0
        ? GridRow.groupByRows(this.props.data, 2)
        : this.props.data;
    const { isImageViewVisible, imageIndex } = this.state;
    const img = this.props.data;
    let images = [];
    img.map(item => {
      images.push({
        uri: item.image,
        title: item.title,
      });
    });
    return (
      <View style={styles.container}>
        <View style={{ height: 50 }}>
          <RadioGroup
            selectedIndex={this.props.tabIndex}
            items={this.props.tabs}
            onChange={this.props.setTabIndex}
            underline
          />
        </View>
        <FlatList
          keyExtractor={item =>
            item.id
              ? `${this.props.tabIndex}-${item.id}`
              : `${item[0] && item[0].id}`
          }
          style={{ backgroundColor: colors.white, paddingHorizontal: 15 }}
          data={groupedData}
          renderItem={this._getRenderItemFunction()}
        />
        <ImageView
          images={images}
          imageIndex={imageIndex}
          animationType="none"
          visible={isImageViewVisible}
          FooterComponent={({ imageIndex }) => (

            <View style={styles.footer}>
              <Text style={styles.footerText}>{images[imageIndex].title}</Text>
            </View>
          )}
          onRequestClose={() => this.setState({ isImageViewVisible: false })}
          onImageChange={index => {
            console.log(index);
          }}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.white,
  },
  tabsContainer: {
    alignSelf: 'stretch',
    marginTop: 30,
  },
  itemOneContainer: {
    flex: 1,
    width: Dimensions.get('window').width / 2 - 40,
  },
  itemOneImageContainer: {
    borderRadius: 3,
    overflow: 'hidden',
  },
  itemOneImage: {
    height: 200,
    width: Dimensions.get('window').width / 2 - 40,
  },
  itemOneTitle: {
    fontFamily: fonts.primaryRegular,
    fontSize: 15,
  },
  itemOneSubTitle: {
    fontFamily: fonts.primaryRegular,
    fontSize: 13,
    color: '#B2B2B2',
    marginVertical: 3,
  },
  itemOnePrice: {
    fontFamily: fonts.primaryRegular,
    fontSize: 15,
  },
  itemOneRow: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginTop: 10,
  },
  itemOneContent: {
    marginTop: 5,
    marginBottom: 10,
  },
  rating: {
    // width: 10,
  },
  itemTwoContainer: {
    paddingBottom: 10,
    backgroundColor: 'white',
    marginVertical: 5,
  },
  itemTwoContent: {
    padding: 20,
    position: 'relative',
    marginHorizontal: Platform.OS === 'ios' ? -15 : 0,
    height: 150,
  },
  itemTwoTitle: {
    color: colors.white,
    fontFamily: fonts.primaryBold,
    fontSize: 20,
  },
  itemTwoSubTitle: {
    color: colors.white,
    fontFamily: fonts.primaryRegular,
    fontSize: 15,
    marginVertical: 5,
  },
  itemTwoPrice: {
    color: colors.white,
    fontFamily: fonts.primaryBold,
    fontSize: 20,
  },
  itemTwoImage: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },
  itemTwoOverlay: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    backgroundColor: '#6271da',
    opacity: 0.5,
  },
  itemThreeContainer: {
    backgroundColor: 'white',
  },
  itemThreeSubContainer: {
    flexDirection: 'row',
    paddingVertical: 10,
  },
  itemThreeImage: {
    height: 100,
    width: 100,
  },
  itemThreeContent: {
    flex: 1,
    paddingLeft: 15,
    justifyContent: 'space-between',
  },
  itemThreeBrand: {
    fontFamily: fonts.primaryRegular,
    fontSize: 14,
    color: '#617ae1',
  },
  itemThreeTitle: {
    fontFamily: fonts.primaryBold,
    fontSize: 16,
    color: '#5F5F5F',
  },
  itemThreeSubtitle: {
    fontFamily: fonts.primaryRegular,
    fontSize: 12,
    color: '#a4a4a4',
  },
  itemThreeMetaContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  itemThreePrice: {
    fontFamily: fonts.primaryRegular,
    fontSize: 15,
    color: '#5f5f5f',
    textAlign: 'right',
  },
  itemThreeHr: {
    flex: 1,
    height: 1,
    backgroundColor: '#e3e3e3',
    marginRight: -15,
  },
  badge: {
    backgroundColor: colors.secondary,
    borderRadius: 10,
    paddingHorizontal: 10,
    paddingVertical: 5,
  },
  avatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
  },
  avatarContainer: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    // margin: 20,
    marginBottom: 10,
  },
  footer: {
    width,
    height: 50,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.4)',
    paddingHorizontal: 10,
    paddingVertical: 5,
  },
  footerButton: {
    flexDirection: 'row',
    marginLeft: 15,
  },
  footerText: {
    fontSize: 16,
    color: '#FFF',
    textAlign: 'center',
  },
});
