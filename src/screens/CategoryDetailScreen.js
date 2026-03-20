import React, { useState } from 'react';
import { View, StyleSheet, FlatList, Clipboard, ToastAndroid, Platform } from 'react-native';
import { Appbar, Card, Paragraph, IconButton, useTheme, Snackbar } from 'react-native-paper';
import * as ExpoClipboard from 'expo-clipboard';
import { saveFavorite } from '../data/storage';

const CategoryDetailScreen = ({ route, navigation }) => {
  const { category } = route.params;
  const theme = useTheme();
  const [snackbarVisible, setSnackbarVisible] = useState(false);

  const copyToClipboard = async (text) => {
    await ExpoClipboard.setStringAsync(text);
    if (Platform.OS === 'android') {
      ToastAndroid.show('已复制到剪贴板！', ToastAndroid.SHORT);
    } else {
      setSnackbarVisible(true);
    }
  };

  const renderQuote = ({ item }) => (
    <Card style={styles.quoteCard}>
      <Card.Content style={styles.cardContent}>
        <Paragraph style={styles.quoteText}>{item}</Paragraph>
      </Card.Content>
      <Card.Actions style={styles.actions}>
        <IconButton
          icon="content-copy"
          color={theme.colors.primary}
          size={24}
          onPress={() => copyToClipboard(item)}
        />
        <IconButton
          icon="heart-outline"
          color={theme.colors.accent}
          size={24}
          onPress={async () => {
            await saveFavorite(item);
            if (Platform.OS === 'android') {
              ToastAndroid.show('已加入收藏！', ToastAndroid.SHORT);
            }
          }}
        />
      </Card.Actions>
    </Card>
  );

  return (
    <View style={styles.container}>
      <Appbar.Header style={{ backgroundColor: category.color }}>
        <Appbar.BackAction onPress={() => navigation.goBack()} color="#fff" />
        <Appbar.Content title={category.title} titleStyle={{ color: '#fff' }} />
      </Appbar.Header>

      <FlatList
        data={category.quotes}
        keyExtractor={(item, index) => index.toString()}
        renderItem={renderQuote}
        contentContainerStyle={styles.listContainer}
      />

      <Snackbar
        visible={snackbarVisible}
        onDismiss={() => setSnackbarVisible(false)}
        duration={2000}
      >
        已成功复制到剪贴板！
      </Snackbar>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f6fa',
  },
  listContainer: {
    padding: 16,
  },
  quoteCard: {
    marginBottom: 16,
    borderRadius: 12,
    elevation: 2,
    backgroundColor: '#fff',
  },
  cardContent: {
    paddingTop: 16,
    paddingBottom: 8,
  },
  quoteText: {
    fontSize: 16,
    lineHeight: 24,
    color: '#34495e',
    fontWeight: '500',
  },
  actions: {
    justifyContent: 'flex-end',
    paddingTop: 0,
  }
});

export default CategoryDetailScreen;
