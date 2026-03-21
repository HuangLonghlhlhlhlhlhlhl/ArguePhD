import React from 'react';
import { View, StyleSheet, FlatList, TouchableOpacity, Dimensions } from 'react-native';
import { Appbar, Card, Title, Paragraph, useTheme, Avatar, IconButton } from 'react-native-paper';
import { categories } from '../data/quotes';

const { width } = Dimensions.get('window');

const HomeScreen = ({ navigation }) => {
  const theme = useTheme();

  const renderItem = ({ item }) => (
    <TouchableOpacity
      activeOpacity={0.8}
      onPress={() => navigation.navigate('CategoryDetail', { category: item })}
    >
      <Card style={[styles.card, { borderLeftColor: item.color, borderLeftWidth: 4 }]}>
        <Card.Title
          title={item.title}
          titleStyle={styles.cardTitle}
          subtitle={`包含 ${item.quotes.length} 条精选语录`}
          left={(props) => <Avatar.Icon {...props} icon={item.icon} style={{ backgroundColor: item.color }} />}
        />
      </Card>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <Appbar.Header style={{ backgroundColor: theme.colors.primary }}>
        <Appbar.Content title="怼人助手" titleStyle={{ color: '#fff', fontWeight: 'bold' }} subtitle="机智回应每一句话" subtitleStyle={{ color: '#eee' }} />
        <Appbar.Action icon="heart" color="#fff" onPress={() => navigation.navigate('Favorites')} />
      </Appbar.Header>

      <FlatList
        data={categories}
        keyExtractor={(item) => item.id}
        renderItem={renderItem}
        contentContainerStyle={styles.listContainer}
        ListHeaderComponent={
          <View style={styles.header}>
            <Title style={styles.headerTitle}>选择一个场景</Title>
            <Paragraph style={styles.headerSubtitle}>全副武备，从此不再张口结舌</Paragraph>
            
            <Title style={[styles.headerTitle, {marginTop: 20, fontSize: 18}]}>🔥 爆款进阶玩法</Title>
            
            <View style={{flexDirection: 'row', justifyContent: 'space-between', marginTop: 10}}>
              <TouchableOpacity activeOpacity={0.8} onPress={() => navigation.navigate('AiInteraction')} style={{width: '48%'}}>
                <Card style={[styles.card, { backgroundColor: '#0fb9b1', borderWidth: 0 }]}>
                  <Card.Content style={{alignItems: 'center', paddingVertical: 20}}>
                    <Avatar.Icon icon="robot" size={50} style={{ backgroundColor: 'rgba(255,255,255,0.2)', marginBottom: 10 }} color="#fff" />
                    <Title style={{ color: '#fff', fontSize: 16 }}>AI 生成</Title>
                  </Card.Content>
                </Card>
              </TouchableOpacity>

              <TouchableOpacity activeOpacity={0.8} onPress={() => navigation.navigate('Translator')} style={{width: '48%'}}>
                <Card style={[styles.card, { backgroundColor: '#27ae60', borderWidth: 0 }]}>
                  <Card.Content style={{alignItems: 'center', paddingVertical: 20}}>
                    <Avatar.Icon icon="translate" size={50} style={{ backgroundColor: 'rgba(255,255,255,0.2)', marginBottom: 10 }} color="#fff" />
                    <Title style={{ color: '#fff', fontSize: 16 }}>阴阳怪气翻译</Title>
                  </Card.Content>
                </Card>
              </TouchableOpacity>
            </View>

            <TouchableOpacity activeOpacity={0.8} onPress={() => navigation.navigate('Meme', {text: '点击右侧按钮生成随机表情包'})} style={{marginTop: 10}}>
              <Card style={[styles.card, { backgroundColor: '#8e44ad', borderWidth: 0 }]}>
                 <Card.Title
                    title="📸 一键表情包"
                    titleStyle={{ color: '#fff', fontWeight: 'bold' }}
                    subtitle="图片杀伤力大于文字"
                    subtitleStyle={{ color: '#eee' }}
                    left={(props) => <Avatar.Icon {...props} icon="image-multiple" style={{ backgroundColor: 'rgba(255,255,255,0.2)' }} color="#fff" />}
                    right={(props) => <IconButton {...props} icon="chevron-right" color="#fff" />}
                  />
              </Card>
            </TouchableOpacity>

            <View style={{flexDirection: 'row', justifyContent: 'space-between', marginTop: 10}}>
              <TouchableOpacity activeOpacity={0.8} onPress={() => navigation.navigate('Simulator')} style={{width: '48%'}}>
                <Card style={[styles.card, { backgroundColor: '#e74c3c', borderWidth: 0 }]}>
                  <Card.Content style={{alignItems: 'center', paddingVertical: 20}}>
                    <Avatar.Icon icon="boxing-glove" size={50} style={{ backgroundColor: 'rgba(255,255,255,0.2)', marginBottom: 10 }} color="#fff" />
                    <Title style={{ color: '#fff', fontSize: 16 }}>实战演练</Title>
                  </Card.Content>
                </Card>
              </TouchableOpacity>

              <TouchableOpacity activeOpacity={0.8} onPress={() => navigation.navigate('Community')} style={{width: '48%'}}>
                <Card style={[styles.card, { backgroundColor: '#e1b12c', borderWidth: 0 }]}>
                  <Card.Content style={{alignItems: 'center', paddingVertical: 20}}>
                    <Avatar.Icon icon="forum" size={50} style={{ backgroundColor: 'rgba(255,255,255,0.2)', marginBottom: 10 }} color="#fff" />
                    <Title style={{ color: '#fff', fontSize: 16 }}>段子大厅</Title>
                  </Card.Content>
                </Card>
              </TouchableOpacity>
            </View>

            <TouchableOpacity activeOpacity={0.8} onPress={() => navigation.navigate('Competition')} style={{marginTop: 10}}>
              <Card style={[styles.card, { backgroundColor: '#2f3542', borderWidth: 0 }]}>
                 <Card.Title
                    title="🏆 最强嘴贱大赛"
                    titleStyle={{ color: '#ff4757', fontWeight: 'bold' }}
                    subtitle="看看网友们是怎么让人破防的"
                    subtitleStyle={{ color: '#ced6e0' }}
                    left={(props) => <Avatar.Icon {...props} icon="fire" style={{ backgroundColor: '#ff4757' }} color="#fff" />}
                    right={(props) => <IconButton {...props} icon="chevron-right" color="#fff" />}
                  />
              </Card>
            </TouchableOpacity>

            <Title style={[styles.headerTitle, {marginTop: 20, fontSize: 18}]}>预设经典语录库</Title>
          </View>
        }
      />
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
  header: {
    marginBottom: 20,
    marginTop: 10,
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#2c3e50',
  },
  headerSubtitle: {
    fontSize: 14,
    color: '#7f8c8d',
    marginTop: 4,
  },
  card: {
    marginBottom: 16,
    borderRadius: 12,
    elevation: 4,
    backgroundColor: '#fff',
  },
  cardTitle: {
    fontWeight: 'bold',
    fontSize: 18,
  }
});

export default HomeScreen;
