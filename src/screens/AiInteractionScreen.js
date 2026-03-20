import React, { useState } from 'react';
import { View, StyleSheet, ScrollView, Platform, ToastAndroid, Keyboard, KeyboardAvoidingView } from 'react-native';
import { Appbar, TextInput, Button, Card, Title, Paragraph, IconButton, useTheme, Snackbar } from 'react-native-paper';
import * as ExpoClipboard from 'expo-clipboard';
import { saveFavorite } from '../data/storage';

const AiInteractionScreen = ({ navigation }) => {
  const theme = useTheme();
  const [inputText, setInputText] = useState('');
  const [loading, setLoading] = useState(false);
  const [results, setResults] = useState(null);
  const [snackbarVisible, setSnackbarVisible] = useState(false);

  // 这里的逻辑为模拟AI生成效果
  // 若需真正智能回复，可在此处接入如 DeepSeek / Wenxin 等大模型API
  const generateReply = () => {
    if (!inputText.trim()) return;
    setLoading(true);
    Keyboard.dismiss();

    setTimeout(() => {
      let highTier = "";
      let midTier = "";

      if (inputText.includes("加班") || inputText.includes("工作")) {
        highTier = "老板，您看我这发际线，再加班可能就算工伤了，要不您先给我批个植发预算？";
        midTier = "又加班？行啊，这是另外的价钱，没钱免谈。";
      } else if (inputText.includes("胖") || inputText.includes("丑")) {
        highTier = "好看的皮囊千篇一律，有趣的灵魂万里挑一，可惜您两样都没占。";
        midTier = "我胖我吃你家大米了？管好你自己吧！";
      } else {
        highTier = `对于您说的“${inputText}”，我觉得与其把时间花在争论这个上，不如多看几本书提升一下认知局限。`;
        midTier = "对对对，你说的都对，那既然你这么懂，笔给你，你来写？";
      }

      setResults({ highTier, midTier });
      setLoading(false);
    }, 1500);
  };

  const copyToClipboard = async (text) => {
    await ExpoClipboard.setStringAsync(text);
    if (Platform.OS === 'android') {
      ToastAndroid.show('已复制到剪贴板！', ToastAndroid.SHORT);
    } else {
      setSnackbarVisible(true);
    }
  };

  const handleSave = async (text) => {
    await saveFavorite(text);
    if (Platform.OS === 'android') {
      ToastAndroid.show('已加入收藏！', ToastAndroid.SHORT);
    }
  };

  const ResultCard = ({ title, content, typeColor }) => (
    <Card style={styles.resultCard}>
      <Card.Content>
        <Title style={[styles.tierTitle, { color: typeColor }]}>{title}</Title>
        <Paragraph style={styles.quoteText}>{content}</Paragraph>
      </Card.Content>
      <Card.Actions style={styles.actions}>
        <IconButton icon="content-copy" color={theme.colors.primary} size={22} onPress={() => copyToClipboard(content)} />
        <IconButton icon="heart-outline" color={theme.colors.accent} size={22} onPress={() => handleSave(content)} />
      </Card.Actions>
    </Card>
  );

  return (
    <KeyboardAvoidingView 
      style={styles.container} 
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      keyboardVerticalOffset={Platform.OS === 'ios' ? 0 : 25}
    >
      <Appbar.Header style={{ backgroundColor: theme.colors.primary }}>
        <Appbar.BackAction onPress={() => navigation.goBack()} color="#fff" />
        <Appbar.Content title="AI 智能回怼" titleStyle={{ color: '#fff' }} />
      </Appbar.Header>

      <ScrollView contentContainerStyle={styles.scrollContainer} keyboardShouldPersistTaps="handled">
        <Title style={styles.headerTitle}>对方说了什么？</Title>
        <Paragraph style={styles.headerSubtitle}>输入对方的话，AI为你生成上等、中等两种反击策略</Paragraph>

        <TextInput
          mode="outlined"
          label="例如：你最近怎么又胖了？"
          value={inputText}
          onChangeText={setInputText}
          multiline
          numberOfLines={4}
          style={styles.input}
          theme={{ colors: { primary: theme.colors.accent } }}
        />

        <Button
          mode="contained"
          onPress={generateReply}
          loading={loading}
          disabled={!inputText.trim() || loading}
          style={styles.button}
          contentStyle={styles.buttonContent}
        >
          {loading ? '正在冥思苦想中...' : '一键生成回怼方案'}
        </Button>

        {results && (
          <View style={styles.resultsContainer}>
            <Title style={styles.resultsHeader}>🔥 你的回怼武器库</Title>
            <ResultCard title="上等回怼 (阴阳怪气/优雅暴击)" content={results.highTier} typeColor="#e74c3c" />
            <ResultCard title="中等回怼 (简单直接/霸气侧漏)" content={results.midTier} typeColor="#e67e22" />
          </View>
        )}
      </ScrollView>

      <Snackbar visible={snackbarVisible} onDismiss={() => setSnackbarVisible(false)} duration={2000}>
        已成功复制到剪贴板！
      </Snackbar>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#f5f6fa' },
  scrollContainer: { padding: 16, paddingBottom: 40 },
  headerTitle: { fontSize: 22, fontWeight: 'bold', color: '#2c3e50', marginTop: 10 },
  headerSubtitle: { fontSize: 14, color: '#7f8c8d', marginBottom: 20 },
  input: { backgroundColor: '#fff', marginBottom: 20 },
  button: { borderRadius: 8, elevation: 2, backgroundColor: '#0fb9b1' },
  buttonContent: { paddingVertical: 8 },
  resultsContainer: { marginTop: 30 },
  resultsHeader: { fontSize: 18, fontWeight: 'bold', color: '#34495e', marginBottom: 15 },
  resultCard: { marginBottom: 16, borderRadius: 12, elevation: 3, backgroundColor: '#fff', borderWidth: 1, borderColor: '#eee' },
  tierTitle: { fontSize: 16, fontWeight: 'bold', marginBottom: 8 },
  quoteText: { fontSize: 16, lineHeight: 24, color: '#2c3e50' },
  actions: { justifyContent: 'flex-end', paddingTop: 0 }
});

export default AiInteractionScreen;
