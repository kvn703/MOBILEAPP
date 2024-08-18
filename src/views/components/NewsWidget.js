import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, TouchableOpacity, Linking, ScrollView } from "react-native";
import { FlatList, GestureHandlerRootView } from 'react-native-gesture-handler';
import theme from "../../conts/colors";
import axios from "axios";
import FontAwesome5Icon from 'react-native-vector-icons/FontAwesome5';

const { COLORS, LIGHT, DARK } = theme;

const NewsWidget = () => {
  const [newsData, setNewsData] = useState([]);

  useEffect(() => {
    const apiKey = "8342cd303b4c4fb19cec56f2c168d41c";
    const apiUrl = `https://newsapi.org/v2/top-headlines?country=fr&apiKey=${apiKey}`;
    axios.get(apiUrl)
      .then((response) => {
        setNewsData(response.data.articles);
      })
      .catch((error) => {
        console.error("Error fetching news data: ", error);
        setNewsData([]);
      });
  }, []);

  const renderNewsItem = ({ item }) => {
    return (
      <TouchableOpacity onPress={() => openNewsArticle(item.url)}>
        <View style={styles.newsItem}>
          <FontAwesome5Icon name="newspaper" size={24} color={LIGHT.secondary} style={styles.newsIcon} />
          <View>
            <Text style={styles.newsTitle}>{item.title}</Text>
            <Text style={styles.newsDescription}>{item.description}</Text>
          </View>
        </View>
      </TouchableOpacity>
    );
  };

  const openNewsArticle = (url) => {
    Linking.openURL(url);
  };

  return (
    <GestureHandlerRootView style={{flex: 1}}>
    <View style={styles.container}>
      <Text style={styles.widgetTitle}>À la Une :</Text>
      <ScrollView nestedScrollEnabled={true}>
        <FlatList
          data={newsData}
          renderItem={renderNewsItem}
          keyExtractor={(item, index) => index.toString()}
          nestedScrollEnabled={true}
        />
      </ScrollView>
    </View>
    </GestureHandlerRootView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: LIGHT.surfaceVariant,
    height: 200,
    width: '95%',
    marginHorizontal: 10,
    marginBottom: 20,
    padding: 20,
    borderRadius: 20,
  },
  widgetTitle: {
    fontSize: 18,
    fontWeight: "bold",
    fontFamily: "Arial",
    color: LIGHT.onSurfaceVariant,
    marginBottom: 10,
    textDecorationLine: "underline",
  },
  newsItem: {
    marginBottom: 15,
  },
  newsTitle: {
    fontSize: 16,
    fontWeight: "bold",
    fontFamily: "Arial",
    color: LIGHT.onSurfaceVariant,
  },
  newsDescription: {
    fontSize: 14,
    fontFamily: "Arial",
    color: COLORS.black,
  },
});

export default NewsWidget;
