import React, { useState } from 'react';
import { View, StyleSheet, FlatList, KeyboardAvoidingView, Platform, Text } from 'react-native';
import { Appbar, TextInput, IconButton, Avatar, useTheme, Card } from 'react-native-paper';

const initialMessages = [
  { id: '1', text: '听说你最近在做那个大项目？其实我觉得你能力还差一点，要是交给我早就完成了。', sender: 'ai' }
];

const SimulatorScreen = ({ navigation }) => {
  const theme = useTheme();
  const [messages, setMessages] = useState(initialMessages);
  const [inputText, setInputText] = useState('');
  const [isTyping, setIsTyping] = useState(false);

  const sendMessage = () => {
    if (!inputText.trim()) return;
    const userMsg = { id: Date.now().toString(), text: inputText, sender: 'user' };
    setMessages(prev => [userMsg, ...prev]);
    setInputText('');
    setIsTyping(true);

    // AI evaluates the user's response
    setTimeout(() => {
      let aiResponseText = '';
      let scoreText = '';
      if (userMsg.text.length < 5) {
        aiResponseText = "这就词穷了？看来你的战斗力只有5啊。";
        scoreText = "战斗力评级：【青铜嘴炮】💩";
      } else if (userMsg.text.includes('你') && userMsg.text.includes('才')) {
        aiResponseText = "反弹无效！这种幼儿园水平的词语就别拿出来了。";
        scoreText = "战斗力评级：【白银小喷子】🥉";
      } else {
        aiResponseText = "哟，有点意思。算你狠，这次先放过你，下次别落我手里！";
        scoreText = "战斗力评级：【钻石毒舌王】💎，对方已被你破防！";
      }

      const aiAnalysisMsg = { id: (Date.now() + 1).toString(), text: scoreText, sender: 'system' };
      const aiMsg = { id: (Date.now() + 2).toString(), text: aiResponseText, sender: 'ai' };

      setMessages(prev => [aiMsg, aiAnalysisMsg, ...prev]);
      setIsTyping(false);
    }, 1500);
  };

  const renderMessage = ({ item }) => {
    if (item.sender === 'system') {
      return (
        <View style={styles.systemMessageContainer}>
          <Text style={styles.systemText}>{item.text}</Text>
        </View>
      );
    }
    
    const isUser = item.sender === 'user';
    return (
      <View style={[styles.messageRow, isUser ? styles.messageRowUser : styles.messageRowAi]}>
        {!isUser && <Avatar.Icon size={36} icon="account-tie" style={styles.avatarAi} />}
        <Card style={[styles.messageBubble, isUser ? styles.bubbleUser : styles.bubbleAi]}>
          <Text style={[styles.messageText, isUser ? styles.textUser : styles.textAi]}>{item.text}</Text>
        </Card>
        {isUser && <Avatar.Icon size={36} icon="account" style={styles.avatarUser} />}
      </View>
    );
  };

  return (
    <KeyboardAvoidingView 
      style={styles.container} 
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      keyboardVerticalOffset={Platform.OS === 'ios' ? 0 : 25}
    >
      <Appbar.Header style={{ backgroundColor: '#e74c3c' }}>
        <Appbar.BackAction onPress={() => navigation.goBack()} color="#fff" />
        <Appbar.Content title="实战演练模式" subtitle="正在与【爱甩锅的同事】对线" titleStyle={{ color: '#fff' }} subtitleStyle={{color:'#eee'}} />
      </Appbar.Header>

      <FlatList
        data={messages}
        keyExtractor={item => item.id}
        renderItem={renderMessage}
        inverted
        contentContainerStyle={styles.listContainer}
      />

      <View style={styles.inputContainer}>
        <TextInput
          mode="outlined"
          placeholder="输入您的反击..."
          value={inputText}
          onChangeText={setInputText}
          style={styles.input}
          outlineColor="transparent"
          activeOutlineColor="#e74c3c"
          disabled={isTyping}
        />
        <IconButton
          icon="send"
          color="#e74c3c"
          size={28}
          onPress={sendMessage}
          disabled={!inputText.trim() || isTyping}
        />
      </View>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fdfbfb' },
  listContainer: { padding: 16 },
  messageRow: { flexDirection: 'row', alignItems: 'flex-end', marginBottom: 16 },
  messageRowUser: { justifyContent: 'flex-end' },
  messageRowAi: { justifyContent: 'flex-start' },
  avatarAi: { backgroundColor: '#e74c3c', marginRight: 8 },
  avatarUser: { backgroundColor: '#3498db', marginLeft: 8 },
  messageBubble: { maxWidth: '75%', padding: 12, borderRadius: 16, elevation: 1 },
  bubbleAi: { backgroundColor: '#fff', borderBottomLeftRadius: 4 },
  bubbleUser: { backgroundColor: '#e74c3c', borderBottomRightRadius: 4 },
  messageText: { fontSize: 16, lineHeight: 22 },
  textAi: { color: '#2c3e50' },
  textUser: { color: '#fff' },
  systemMessageContainer: { alignSelf: 'center', backgroundColor: 'rgba(0,0,0,0.1)', paddingHorizontal: 16, paddingVertical: 6, borderRadius: 20, marginVertical: 10 },
  systemText: { color: '#555', fontSize: 13, fontWeight: 'bold' },
  inputContainer: { flexDirection: 'row', alignItems: 'center', padding: 8, backgroundColor: '#fff', borderTopWidth: 1, borderTopColor: '#eee' },
  input: { flex: 1, backgroundColor: '#f5f6fa', borderRadius: 20 },
});

export default SimulatorScreen;
