import React from 'react';
import { View, StyleSheet, FlatList, TouchableOpacity } from 'react-native';
import { Appbar, Card, Title, Paragraph, Avatar, IconButton } from 'react-native-paper';

// Mock community data
const mockPosts = [
  { id: '1', author: '秃头小宝贝', avatar: 'face-man', content: '今天相亲，对方问我“你能接受我婚后不工作吗？” 我回：“你能接受我婚前就破产吗？”', upvotes: 12580, time: '2小时前' },
  { id: '2', author: '打工魂', avatar: 'face-woman', content: '老板在群里说：大家要把公司当家。我回：好的爸爸，那零花钱什么时候发？', upvotes: 9852, time: '3小时前' },
  { id: '3', author: '峡谷清道夫', avatar: 'robot', content: '队友说我打得菜，我直接回：“是啊，我这是下乡扶贫来了，没想到贫困户这么嚣张。”', upvotes: 7521, time: '5小时前' }
];

const CommunityScreen = ({ navigation }) => {

  const renderPost = ({ item }) => (
    <Card style={styles.card}>
      <Card.Title
        title={item.author}
        subtitle={item.time}
        left={(props) => <Avatar.Icon {...props} icon={item.avatar} style={{backgroundColor: '#e1b12c'}} />}
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
        data={mockPosts}
        keyExtractor={item => item.id}
        renderItem={renderPost}
        contentContainerStyle={styles.listContainer}
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
