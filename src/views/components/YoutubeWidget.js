import React, { useState } from "react";
import { Text, View, StyleSheet, TouchableOpacity } from "react-native";
import theme from "../../conts/colors";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import { Modal, Portal } from "react-native-paper";
import { WebView } from "react-native-webview";

const { COLORS, LIGHT, DARK } = theme;

const YoutubeWidget = ({ navigation }) => {
  const [modalVisible, setModalVisible] = useState(false);

  const openWebView = () => {
    setModalVisible(true);
  };

  const closeWebView = () => {
    setModalVisible(false);
  };

  return (
    <View>
      <TouchableOpacity onPress={openWebView}>
        <View style={styles.container}>
          <Text
            style={{
              fontSize: 20,
              fontWeight: "bold",
              fontFamily: "Arial",
              color: LIGHT.onSurfaceVariant,
            }}
          >
            Youtube
          </Text>
          <Icon name="youtube" size={70} color={COLORS.red} />
        </View>
      </TouchableOpacity>

      <Portal>
        <Modal
          visible={modalVisible}
          onDismiss={closeWebView}
          contentContainerStyle={styles.modalContent}
        >
          <WebView
            source={{ uri: "https://www.youtube.com" }}
            style={styles.webview}
          />
        </Modal>
      </Portal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: LIGHT.surfaceVariant,
    height: 150,
    width: "95%",
    marginHorizontal: 10,
    marginBottom: 80,
    padding: 10,
    borderRadius: 20,
    alignItems: "center",
    justifyContent: "center",
  },
  modalContent: {
    backgroundColor: COLORS.white,
    padding: 20,
    margin: 20,
    borderRadius: 20,
    height: '80%',
    width: '90%',
  },
  webview: {
    flex: 1,
  },
});

export default YoutubeWidget;
