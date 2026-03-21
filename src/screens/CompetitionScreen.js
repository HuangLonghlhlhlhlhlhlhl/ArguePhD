import React, { useState } from 'react';
import { View, StyleSheet, FlatList, TouchableOpacity, Alert, ScrollView } from 'react-native';
import { Appbar, Card, Title, Paragraph, Avatar, IconButton, Button, Colors, TextInput, Chip, Text } from 'react-native-paper';

const initialCompetitions = [
  { 
    id: '1', 
    author: '打工魂爆发', 
    avatar: 'account-cowboy-hat', 
    ipLocation: '广东',
    region: '华南',
    city: '广州',
    companyType: '私企',
    title: '老板半夜PUA，我是这样破防的',
    dialogue: '老板：年轻人多吃点苦是福报，懂不懂感恩？\n我：感恩！祝您这辈子福如东海，吃苦吃到长命百岁！',
    votes: 4520,
    rank: 1,
    comments: [
      { id: 'c1', user: '嘴强王者', ipLocation: '北京', content: '这波反向祝福确实骚，建议直接写进遗嘱（划掉）辞职信。', likes: 450, dislikes: 12 },
      { id: 'c2', user: '反PUA先锋', ipLocation: '上海', content: '这种福报给老板多来点，我这就去给他烧过去。', likes: 320, dislikes: 8 }
    ]
  },
  { 
    id: '2', 
    author: '峡谷钢琴家', 
    avatar: 'alien', 
    ipLocation: '湖北',
    region: '华中',
    city: '武汉',
    companyType: '互联网',
    title: '遇到摆烂挂机队友该怎么喷',
    dialogue: '队友：我就挂机怎么了？点投降啊。\n我：行，你就在泉水挂着，权当我们在给你守灵。',
    votes: 3824, 
    rank: 2,
    comments: [
      { id: 'c3', user: '野王带带我', ipLocation: '广东', content: '守灵可还行？哈哈哈哈，你是懂送钟的。', likes: 231, dislikes: 4 },
      { id: 'c4', user: '只会辅助', ipLocation: '浙江', content: '虽然但是，这种屏蔽掉比较好，别影响自己心情。', likes: 45, dislikes: 156 }
    ]
  },
  { 
    id: '3', 
    author: '亲戚克星', 
    avatar: 'account-tie-voice', 
    ipLocation: '上海',
    region: '华东',
    city: '上海',
    companyType: '国企',
    title: '过年催婚应对指南',
    dialogue: '七大姑：你看隔壁小王孩子都打酱油了，你什么时候结啊？\n我：你看隔壁他大伯前天刚火化，你什么时候走啊？',
    votes: 3105,
    rank: 3,
    comments: [
      { id: 'c5', user: '大孝子', ipLocation: '山西', content: '这是真·大逆不道（但我喜欢）。', likes: 890, dislikes: 20 },
      { id: 'c6', user: '单身贵族', ipLocation: '四川', content: '这就背下来，下次面对那些催婚的直接暴击！', likes: 542, dislikes: 12 }
    ]
  },
  { 
    id: '4', 
    author: '中关村卷王', 
    avatar: 'account-hard-hat', 
    ipLocation: '北京',
    region: '华北',
    city: '北京',
    companyType: '互联网',
    title: '凌晨三点的办公室',
    dialogue: '领导：都三点了还没走啊，公司有你这样的员工真是荣幸。\n我：那是，公司能撑到三点还不倒闭，我也挺荣幸的。',
    votes: 2890,
    rank: 4,
    comments: []
  },
  { 
    id: '5', 
    author: '深圳速度', 
    avatar: 'flash', 
    ipLocation: '广东',
    region: '华南',
    city: '深圳',
    companyType: '私企',
    title: '租房被坑神回复',
    dialogue: '中介：这边虽然没窗户，但冬暖夏凉，很有生活气息。\n我：确实，这格局跟我老家地窖一模一样，特别有归西的气息。',
    votes: 2650,
    rank: 5,
    comments: []
  }
];

const categoryTypes = [
  { id: 'all', name: '全部' },
  { id: 'region', name: '按区域' },
  { id: 'city', name: '按城市' },
  { id: 'companyType', name: '按公司' }
];

const categoryOptions = {
  region: ['华南', '华中', '华北', '华东'],
  city: ['广州', '深圳', '上海', '北京', '武汉'],
  companyType: ['国企', '私企', '互联网', '外企']
};

const CompetitionScreen = ({ navigation }) => {
  const [allData, setAllData] = useState(initialCompetitions);
  const [newComment, setNewComment] = useState({});
  const [activeType, setActiveType] = useState('all');
  const [activeFilter, setActiveFilter] = useState(null);

  const filteredData = allData.filter(item => {
    if (activeType === 'all') return true;
    if (!activeFilter) return true;
    return item[activeType] === activeFilter;
  });

  const handleVote = (id) => {
    Alert.alert('投票成功', '您成功为这名霸道神评送上了一票！战斗力+1');
    setAllData(prev => prev.map(item => item.id === id ? { ...item, votes: item.votes + 1 } : item));
  };

  const handleCommentVote = (competitionId, commentId, isLike) => {
    setAllData(prev => prev.map(item => {
      if (item.id === competitionId) {
        return {
          ...item,
          comments: item.comments.map(c => {
            if (c.id === commentId) {
              return isLike ? { ...c, likes: c.likes + 1 } : { ...c, dislikes: c.dislikes + 1 };
            }
            return c;
          })
        };
      }
      return item;
    }));
  };

  const addComment = (competitionId) => {
    const content = newComment[competitionId];
    if (!content || content.trim() === '') {
      Alert.alert('提示', '评论内容不能为空哦');
      return;
    }

    const comment = {
      id: Date.now().toString(),
      user: '匿名用户',
      ipLocation: '广东',
      content: content,
      likes: 0,
      dislikes: 0
    };

    setAllData(prev => prev.map(item => {
      if (item.id === competitionId) {
        return { ...item, comments: [...item.comments, comment] };
      }
      return item;
    }));
    setNewComment({ ...newComment, [competitionId]: '' });
  };

  const uploadDialogue = () => {
    Alert.alert('上传您的名场面', '这里由于是纯前端演示，点击后将调用手机的相册，并由管理员审核真实打分。(假装正在上传...)');
  };

  const renderItem = ({ item }) => (
    <Card style={styles.card}>
      <Card.Title
        title={<View style={{flexDirection: 'row', alignItems: 'center'}}><Text style={{fontWeight: 'bold', fontSize: 16}}>{item.author}</Text><Text style={styles.ipTag}>IP：{item.ipLocation}</Text></View>}
        subtitle={`当前排名：Top ${item.rank} · ${item.city || item.region || item.companyType}`}
        left={(props) => <Avatar.Icon {...props} icon={item.avatar} style={{backgroundColor: item.rank === 1 ? '#ffb8b8' : item.rank === 2 ? '#c7ecee' : '#fbc531'}} color="#2f3640" />}
        right={(props) => (
          <View style={styles.voteBox}>
            <IconButton {...props} icon="fire" color="#e74c3c" onPress={() => handleVote(item.id)} />
            <Paragraph style={styles.voteCount}>{item.votes}</Paragraph>
          </View>
        )}
      />
      <Card.Content>
        <Title style={styles.recordTitle}>话题：{item.title}</Title>
        <View style={styles.dialogueBox}>
          <Paragraph style={styles.dialogueText}>{item.dialogue}</Paragraph>
        </View>

        <View style={styles.commentsSection}>
          <Title style={styles.commentTitle}>💬 精彩评论 ({item.comments.length})</Title>
          {item.comments.map(comment => (
            <View key={comment.id} style={styles.commentItem}>
              <View style={styles.commentHeader}>
                <View style={{flexDirection: 'row', alignItems: 'center'}}>
                  <Paragraph style={styles.commentUser}>{comment.user}</Paragraph>
                  <Text style={styles.commentIp}>IP:{comment.ipLocation}</Text>
                </View>
                <View style={styles.commentActions}>
                  <TouchableOpacity onPress={() => handleCommentVote(item.id, comment.id, true)} style={styles.actionBtn}>
                    <IconButton icon="thumb-up-outline" size={14} color="#57606f" />
                    <Paragraph style={styles.actionCount}>{comment.likes}</Paragraph>
                  </TouchableOpacity>
                  <TouchableOpacity onPress={() => handleCommentVote(item.id, comment.id, false)} style={styles.actionBtn}>
                    <IconButton icon="thumb-down-outline" size={14} color="#57606f" />
                    <Paragraph style={styles.actionCount}>{comment.dislikes}</Paragraph>
                  </TouchableOpacity>
                </View>
              </View>
              <Paragraph style={styles.commentContent}>{comment.content}</Paragraph>
            </View>
          ))}

          <View style={styles.inputRow}>
            <TextInput
              placeholder="说点骚话..."
              value={newComment[item.id] || ''}
              onChangeText={(text) => setNewComment({ ...newComment, [item.id]: text })}
              style={styles.commentInput}
              mode="outlined"
              dense
            />
            <Button 
              mode="contained" 
              onPress={() => addComment(item.id)}
              style={styles.sendBtn}
            >
              送他上天
            </Button>
          </View>
        </View>
      </Card.Content>
    </Card>
  );

  return (
    <View style={styles.container}>
      <Appbar.Header style={{ backgroundColor: '#2f3542' }}>
        <Appbar.BackAction onPress={() => navigation.goBack()} color="#fff" />
        <Appbar.Content title="🏆 最强嘴贱大赛" titleStyle={{ color: '#fff', fontWeight: 'bold' }} subtitle="全网神级对线排行榜" subtitleStyle={{color: '#ced6e0'}} />
      </Appbar.Header>

      <FlatList
        data={filteredData}
        keyExtractor={item => item.id}
        renderItem={renderItem}
        contentContainerStyle={styles.listContainer}
        ListHeaderComponent={
          <View style={styles.headerArea}>
            <Title style={styles.headerTitle}>本周赛况：全靠一张嘴破防</Title>
            <Paragraph style={styles.headerSubtitle}>
              如果您在现实生活中遇到了绝佳的战斗素材，并且漂亮地反杀了对面，请务必上传您的战绩让全网膜拜！
            </Paragraph>
            
            <View style={styles.categoryTitleRow}>
              <Text style={styles.categoryLabel}>按分类围观：</Text>
              <ScrollView horizontal showsHorizontalScrollIndicator={false}>
                {categoryTypes.map(cat => (
                  <Chip 
                    key={cat.id} 
                    selected={activeType === cat.id}
                    onPress={() => {
                      setActiveType(cat.id);
                      setActiveFilter(null);
                    }}
                    style={styles.categoryChip}
                  >
                    {cat.name}
                  </Chip>
                ))}
              </ScrollView>
            </View>

            {activeType !== 'all' && (
              <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.subCategoryRow}>
                {categoryOptions[activeType].map(opt => (
                  <Chip 
                    key={opt} 
                    selected={activeFilter === opt}
                    onPress={() => setActiveFilter(opt === activeFilter ? null : opt)}
                    style={styles.subChip}
                    selectedColor="#ff4757"
                  >
                    {opt}
                  </Chip>
                ))}
              </ScrollView>
            )}

            <Button 
              icon="upload" 
              mode="contained" 
              onPress={uploadDialogue}
              style={styles.uploadBtn}
              color="#ff4757"
            >
              我要报名参赛并上传爆杀截图
            </Button>
          </View>
        }
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#f1f2f6' },
  listContainer: { padding: 16 },
  headerArea: { marginBottom: 20 },
  headerTitle: { fontSize: 20, fontWeight: 'bold', color: '#2f3542' },
  headerSubtitle: { color: '#747d8c', marginTop: 5, marginBottom: 15, lineHeight: 20 },
  uploadBtn: { paddingVertical: 5, borderRadius: 8, elevation: 4 },
  card: { marginBottom: 16, borderRadius: 12, elevation: 3, backgroundColor: '#fff', borderLeftWidth: 5, borderLeftColor: '#ff4757' },
  voteBox: { alignItems: 'center', marginRight: 10 },
  voteCount: { color: '#e74c3c', fontWeight: 'bold', bottom: 10 },
  recordTitle: { fontSize: 16, marginTop: 5, marginBottom: 10, color: '#2f3542' },
  dialogueBox: { backgroundColor: '#f8f9fa', padding: 12, borderRadius: 8, borderLeftWidth: 3, borderLeftColor: '#747d8c' },
  dialogueText: { lineHeight: 22, color: '#34495e', fontStyle: 'italic' },
  commentsSection: { marginTop: 20, borderTopWidth: 1, borderTopColor: '#f1f2f6', paddingTop: 10 },
  commentTitle: { fontSize: 14, fontWeight: 'bold', color: '#747d8c', marginBottom: 10 },
  commentItem: { marginBottom: 12, backgroundColor: '#f9f9f9', padding: 8, borderRadius: 6 },
  commentHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  commentUser: { fontWeight: 'bold', color: '#2f3542', fontSize: 12 },
  commentActions: { flexDirection: 'row', alignItems: 'center' },
  actionBtn: { flexDirection: 'row', alignItems: 'center', marginLeft: 10 },
  actionCount: { fontSize: 11, color: '#747d8c', marginLeft: -8 },
  commentContent: { color: '#2f3542', fontSize: 13, marginTop: 4 },
  inputRow: { flexDirection: 'row', alignItems: 'center', marginTop: 15 },
  commentInput: { flex: 1, height: 40, backgroundColor: '#fff', fontSize: 12 },
  sendBtn: { marginLeft: 8, height: 40, justifyContent: 'center' },
  ipTag: { fontSize: 10, color: '#a4b0be', marginLeft: 8, fontWeight: 'normal', top: 1 },
  commentIp: { fontSize: 9, color: '#a4b0be', marginLeft: 6 },
  categoryTitleRow: { flexDirection: 'row', alignItems: 'center', marginBottom: 10, marginTop: 10 },
  categoryLabel: { fontSize: 14, color: '#2f3542', fontWeight: 'bold' },
  categoryChip: { marginRight: 8, height: 32 },
  subCategoryRow: { marginBottom: 15 },
  subChip: { marginRight: 8, height: 32, backgroundColor: '#fff' }
});

export default CompetitionScreen;
