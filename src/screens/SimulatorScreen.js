import React, { useState } from 'react';
import { View, StyleSheet, FlatList, KeyboardAvoidingView, Platform, Text } from 'react-native';
import { Appbar, TextInput, IconButton, Avatar, useTheme, Card, ActivityIndicator } from 'react-native-paper';

const initialMessages = [
  { id: '1', text: '听说你最近在做那个大项目？其实我觉得你能力还差一点，要是交给我早就完成了。', sender: 'ai' }
];

const SimulatorScreen = ({ navigation }) => {
  const theme = useTheme();
  const [messages, setMessages] = useState(initialMessages);
  const [inputText, setInputText] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [thinkingSteps, setThinkingSteps] = useState([]);

  const sendMessage = () => {
    if (!inputText.trim()) return;
    const userMsg = { id: Date.now().toString(), text: inputText, sender: 'user' };
    setMessages(prev => [userMsg, ...prev]);
    setInputText('');
    setIsTyping(true);
    setThinkingSteps([]);
    
    // Detailed thinking stages
    const totalSteps = [
      { id: 1, text: "🔍 正在扫描对方话语中的逻辑漏洞...", status: 'processing' },
      { id: 2, text: "🧠 检索【职场甩锅】应对模型库...", status: 'pending' },
      { id: 3, text: "⚡ 匹配高杀伤力词汇中...", status: 'pending' },
      { id: 4, text: "🔥 预设回怼方案中：方案A（阳谋）方案B（阴暗）...", status: 'pending' }
    ];

    // Simulate step-by-step thinking
    let currentStepIndex = 0;
    setThinkingSteps([totalSteps[0]]);

    const interval = setInterval(() => {
      currentStepIndex++;
      if (currentStepIndex < totalSteps.length) {
        setThinkingSteps(prev => {
          const updatedPrev = prev.map(s => ({ ...s, status: 'completed' }));
          return [...updatedPrev, totalSteps[currentStepIndex]];
        });
      } else {
        clearInterval(interval);
        
        // Final evaluation and message
        setTimeout(() => {
          let aiResponseText = '';
          let scoreText = '';
          if (userMsg.text.length < 5) {
            aiResponseText = "这就词穷了？看来你的战斗力只有5啊。";
            scoreText = "【深度评判】逻辑性：★ | 杀伤力：★ | 词竭状态：严重";
          } else if (userMsg.text.includes('你') && userMsg.text.includes('才')) {
            aiResponseText = "反弹无效！这种幼儿园水平的词语就别拿出来了。";
            scoreText = "【深度评判】技巧性：★★ | 情绪导向：防御式 | 建议：多看《脱口秀大会》";
          } else {
            aiResponseText = "哟，有点意思。算你狠，这次先放过你，下次别落我手里！";
            scoreText = "【深度评判】破防指数：98% | 词汇量：卓越 | 您已进入【毒舌大师】境界";
          }

          const aiAnalysisMsg = { id: (Date.now() + 1).toString(), text: scoreText, sender: 'system' };
          const aiMsg = { id: (Date.now() + 2).toString(), text: aiResponseText, sender: 'ai' };

          setIsTyping(false);
          setMessages(prev => [aiMsg, aiAnalysisMsg, ...prev]);
        }, 800);
      }
    }, 1200);
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
        ListHeaderComponent={
          isTyping ? (
            <View style={[styles.messageRow, styles.messageRowAi, {marginTop: 10}]}>
              <Avatar.Icon size={36} icon="account-tie" style={styles.avatarAi} />
              <Card style={styles.thinkingCard}>
                <View style={styles.thinkingHeader}>
                  <ActivityIndicator size={12} color="#fff" style={{marginRight: 8}} />
                  <Text style={styles.thinkingHeaderText}>AI 思考过程中...</Text>
                </View>
                <View style={styles.thinkingContent}>
                  {thinkingSteps.map((step, index) => (
                    <View key={step.id} style={styles.stepItem}>
                      <Text style={[
                        styles.stepText, 
                        step.status === 'completed' ? styles.stepCompleted : styles.stepProcessing
                      ]}>
                        {step.status === 'completed' ? '✅ ' : '⏳ '}{step.text}
                      </Text>
                    </View>
                  ))}
                </View>
              </Card>
            </View>
          ) : null
        }
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
  thinkingCard: { maxWidth: '85%', backgroundColor: '#2c3e50', borderRadius: 12, overflow: 'hidden', paddingBottom: 8 },
  thinkingHeader: { backgroundColor: '#34495e', paddingHorizontal: 12, paddingVertical: 6, flexDirection: 'row', alignItems: 'center' },
  thinkingHeaderText: { color: '#ecf0f1', fontSize: 11, fontWeight: 'bold' },
  thinkingContent: { padding: 12 },
  stepItem: { marginBottom: 4 },
  stepText: { fontSize: 13, lineHeight: 18 },
  stepProcessing: { color: '#ecf0f1', fontWeight: 'bold' },
  stepCompleted: { color: '#95a5a6' }
});

export default SimulatorScreen;
