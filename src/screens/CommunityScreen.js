import React, { useState, useEffect } from 'react';
import { View, StyleSheet, FlatList, TouchableOpacity, RefreshControl, Platform } from 'react-native';
import { Appbar, Card, Title, Paragraph, Avatar, IconButton, Text, Surface, useTheme, FAB } from 'react-native-paper';
import { API_ENDPOINTS } from '../config/api';

const CommunityScreen = ({ navigation }) => {
  const theme = useTheme();
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [refreshing, setRefreshing] = useState(false);

  const fetchPosts = async () => {
    setLoading(true);
    try {
      const response = await fetch(API_ENDPOINTS.posts);
      if (!response.ok) throw new Error('Fetch failed');
      const data = await response.json();
      setPosts(data);
    } catch (error) {
      console.error(error);
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
    <Surface style={styles.postCard} elevation={1}>
      <View style={styles.postHeader}>
        <Avatar.Text 
          size={40} 
          label={item.author.substring(0, 1)} 
          style={{backgroundColor: '#F1F2F6'}} 
          labelStyle={{color: '#1A1A1A'}}
        />
        <View style={styles.headerInfo}>
          <Text style={styles.authorName}>{item.author}</Text>
          <Text style={styles.postTime}>{item.time}</Text>
        </View>
        <IconButton icon="dots-horizontal" size={20} iconColor="#7F8C8D" />
      </View>
      
      <Text style={styles.postContent}>{item.content}</Text>
      
      <View style={styles.postFooter}>
        <View style={styles.footerAction}>
           <IconButton icon="heart-outline" size={20} iconColor="#FF5E57" />
           <Text style={styles.footerCount}>{item.upvotes}</Text>
        </View>
        <View style={styles.footerAction}>
           <IconButton icon="comment-outline" size={20} iconColor="#7F8C8D" />
           <Text style={styles.footerCount}>评论</Text>
        </View>
        <IconButton icon="share-variant-outline" size={20} iconColor="#7F8C8D" />
      </View>
    </Surface>
  );

  return (
    <View style={styles.container}>
      <Appbar.Header style={styles.appbar} elevation={0}>
        <Appbar.BackAction onPress={() => navigation.goBack()} />
        <Appbar.Content title="实战段子大厅" titleStyle={styles.appbarTitle} />
        <Appbar.Action icon="magnify" onPress={() => {}} />
      </Appbar.Header>

      <FlatList
        data={posts}
        keyExtractor={item => item.id.toString()}
        renderItem={renderPost}
        contentContainerStyle={styles.listContainer}
        showsVerticalScrollIndicator={false}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} tintColor="#1A1A1A" />
        }
      />

      <FAB
        icon="plus"
        style={styles.fab}
        onPress={() => {}}
        color="#FFF"
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#F8F9FA' },
  appbar: { backgroundColor: '#F8F9FA' },
  appbarTitle: { fontWeight: 'bold' },
  listContainer: { padding: 16, paddingBottom: 100 },
  postCard: { backgroundColor: '#FFF', borderRadius: 24, padding: 16, marginBottom: 16 },
  postHeader: { flexDirection: 'row', alignItems: 'center', marginBottom: 12 },
  headerInfo: { flex: 1, marginLeft: 12 },
  authorName: { fontSize: 15, fontWeight: 'bold', color: '#1A1A1A' },
  postTime: { fontSize: 12, color: '#7F8C8D', marginTop: 2 },
  postContent: { fontSize: 16, lineHeight: 24, color: '#1A1A1A', marginBottom: 16 },
  postFooter: { flexDirection: 'row', borderWeight: 1, borderColor: '#F1F2F6', paddingTop: 8, justifyContent: 'space-between' },
  footerAction: { flexDirection: 'row', alignItems: 'center' },
  footerCount: { fontSize: 13, color: '#4F5962', marginLeft: -4 },
  fab: { position: 'absolute', margin: 16, right: 0, bottom: 20, backgroundColor: '#1A1A1A', borderRadius: 20 }
});

export default CommunityScreen;
