import React, { useState, useEffect } from 'react';
import { View, StyleSheet, FlatList, TouchableOpacity, RefreshControl } from 'react-native';
import { Appbar, Card, Title, Paragraph, Avatar, IconButton } from 'react-native-paper';
import { API_ENDPOINTS } from '../config/api';

const CommunityScreen = ({ navigation }) => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [refreshing, setRefreshing] = useState(false);

  const fetchPosts = async () => {
    setLoading(true);
    try {
      const response = await fetch(API_ENDPOINTS.posts);
      if (!response.ok) throw new Error('网络请求失败');
      const data = await response.json();
      setPosts(data);
    } catch (error) {
      console.error('Fetch posts error:', error);
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  const onRefresh = () => {
    setRefreshing(true);
    fetchPosts();
  };

  const renderPost = ({ item }) => (
    <Card style={styles.card}>
      <Card.Title
        title={item.author}
        subtitle={item.time}
        left={(props) => <Avatar.Icon {...props} icon={item.avatar || 'account'} style={{backgroundColor: '#e1b12c'}} />}
        right={(props) => <IconButton {...props} icon="dots-horizontal" onPress={() => {}} />}
      />
      <Card.Content>
        <Paragraph style={styles.quoteText}>"{item.content}"</Paragraph>
      </Card.Content>
      <Card.Actions style={styles.actions}>
        <View style={styles.actionLeft}>
          <IconButton icon="thumb-up-outline" size={20} color="#7f8c8d" />
          <Paragraph style={{color: '#7f8c8d'}}>{item.upvotes}</Paragraph>
        </View>
        <IconButton icon="share-variant" size={20} color="#7f8c8d" />
      </Card.Actions>
    </Card>
  );

  return (
    <View style={styles.container}>
      <Appbar.Header style={{ backgroundColor: '#e1b12c' }}>
        <Appbar.BackAction onPress={() => navigation.goBack()} color="#fff" />
        <Appbar.Content title="网友段子大厅" titleStyle={{ color: '#fff' }} />
        <Appbar.Action icon="pencil-plus" color="#fff" onPress={() => {}} />
      </Appbar.Header>

      <FlatList
        data={posts}
        keyExtractor={item => item.id.toString()}
        renderItem={renderPost}
        contentContainerStyle={styles.listContainer}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} colors={['#e1b12c']} />
        }
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#f5f6fa' },
  listContainer: { padding: 16 },
  card: { marginBottom: 16, borderRadius: 12, elevation: 2, backgroundColor: '#fff' },
  quoteText: { fontSize: 16, lineHeight: 26, color: '#2c3e50', marginTop: 8, fontStyle: 'italic', backgroundColor: '#f1f2f6', padding: 12, borderRadius: 8 },
  actions: { justifyContent: 'space-between', paddingHorizontal: 16, borderTopWidth: 1, borderTopColor: '#f1f2f6', marginTop: 10 },
  actionLeft: { flexDirection: 'row', alignItems: 'center' }
});

export default CommunityScreen;
