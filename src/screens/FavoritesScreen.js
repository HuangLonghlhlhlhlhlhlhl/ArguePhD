import React, { useState, useEffect } from 'react';
import { View, StyleSheet, FlatList, Platform, ToastAndroid } from 'react-native';
import { Appbar, Card, Paragraph, IconButton, useTheme, Snackbar } from 'react-native-paper';
import * as ExpoClipboard from 'expo-clipboard';
import { getFavorites, removeFavorite } from '../data/storage';

const FavoritesScreen = ({ navigation }) => {
  const theme = useTheme();
  const [favorites, setFavorites] = useState([]);
  const [snackbarVisible, setSnackbarVisible] = useState(false);

  useEffect(() => {
    loadFavorites();
    // Refresh listener for when returning to this screen
    const unsubscribe = navigation.addListener('focus', () => {
      loadFavorites();
    });
    return unsubscribe;
  }, [navigation]);

  const loadFavorites = async () => {
    const data = await getFavorites();
    setFavorites(data);
  };

  const copyToClipboard = async (text) => {
    await ExpoClipboard.setStringAsync(text);
    if (Platform.OS === 'android') {
      ToastAndroid.show('已复制到剪贴板！', ToastAndroid.SHORT);
    } else {
      setSnackbarVisible(true);
    }
  };

  const handleRemove = async (text) => {
    await removeFavorite(text);
    loadFavorites();
  };

  const renderQuote = ({ item }) => (
    <Card style={styles.quoteCard}>
      <Card.Content style={styles.cardContent}>
        <Paragraph style={styles.quoteText}>{item}</Paragraph>
      </Card.Content>
      <Card.Actions style={styles.actions}>
        <IconButton icon="content-copy" color={theme.colors.primary} size={24} onPress={() => copyToClipboard(item)} />
        <IconButton icon="delete" color={theme.colors.error} size={24} onPress={() => handleRemove(item)} />
      </Card.Actions>
    </Card>
  );

  return (
    <View style={styles.container}>
      <Appbar.Header style={{ backgroundColor: theme.colors.primary }}>
        <Appbar.BackAction onPress={() => navigation.goBack()} color="#fff" />
        <Appbar.Content title="我的收藏" titleStyle={{ color: '#fff' }} />
      </Appbar.Header>

      {favorites.length === 0 ? (
        <View style={styles.emptyContainer}>
          <Paragraph style={styles.emptyText}>您还没有收藏任何怼人语录~</Paragraph>
        </View>
      ) : (
        <FlatList
          data={favorites}
          keyExtractor={(item, index) => index.toString()}
          renderItem={renderQuote}
          contentContainerStyle={styles.listContainer}
        />
      )}

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
  container: { flex: 1, backgroundColor: '#f5f6fa' },
  emptyContainer: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  emptyText: { fontSize: 16, color: '#7f8c8d' },
  listContainer: { padding: 16 },
  quoteCard: { marginBottom: 16, borderRadius: 12, elevation: 2, backgroundColor: '#fff' },
  cardContent: { paddingTop: 16, paddingBottom: 8 },
  quoteText: { fontSize: 16, lineHeight: 24, color: '#34495e', fontWeight: '500' },
  actions: { justifyContent: 'flex-end', paddingTop: 0 }
});

export default FavoritesScreen;
