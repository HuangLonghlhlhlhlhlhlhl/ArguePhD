import React, { useState } from 'react';
import { View, StyleSheet, ScrollView, Platform, ToastAndroid, Keyboard, KeyboardAvoidingView } from 'react-native';
import { Appbar, TextInput, Button, Card, Title, Paragraph, IconButton, useTheme, Snackbar } from 'react-native-paper';
import * as ExpoClipboard from 'expo-clipboard';
import { API_ENDPOINTS } from '../config/api';
import { saveFavorite } from '../data/storage';

const AiInteractionScreen = ({ navigation }) => {
  const theme = useTheme();
  const [inputText, setInputText] = useState('');
  const [loading, setLoading] = useState(false);
  const [results, setResults] = useState(null);
  const [snackbarVisible, setSnackbarVisible] = useState(false);

  const generateReply = async () => {
    if (!inputText.trim()) return;
    setLoading(true);
    Keyboard.dismiss();

    try {
      const response = await fetch(API_ENDPOINTS.generate, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ text: inputText }),
      });

      if (!response.ok) throw new Error('网络响应不佳');

      const data = await response.json();
      setResults(data);
    } catch (error) {
      console.error(error);
      if (Platform.OS === 'android') {
        ToastAndroid.show('生成失败，请检查后端运行状态', ToastAndroid.SHORT);
      } else {
        setSnackbarVisible(true);
      }
    } finally {
      setLoading(false);
    }
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

  const ResultCard = ({ title, data, typeColor }) => (
    <Card style={[styles.resultCard, { borderTopWidth: 4, borderTopColor: typeColor }]}>
      <Card.Content>
        <Title style={[styles.tierTitle, { color: typeColor }]}>{title}</Title>
        <Paragraph style={styles.quoteText}>{data.content}</Paragraph>
        <View style={styles.reasonBox}>
          <Paragraph style={styles.reasonText}>{data.reason}</Paragraph>
        </View>
      </Card.Content>
      <Card.Actions style={styles.actions}>
        <IconButton icon="content-copy" color={theme.colors.primary} size={22} onPress={() => copyToClipboard(data.content)} />
        <IconButton icon="heart-outline" color={theme.colors.accent} size={22} onPress={() => handleSave(data.content)} />
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
        <Paragraph style={styles.headerSubtitle}>输入对方的话，AI为您生成上、中、下三种维度的反击策略并深度分析</Paragraph>

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
          {loading ? 'AI 正在深度思考中...' : '一键生成反击方案'}
        </Button>

        {results && (
          <View style={styles.resultsContainer}>
            <Title style={styles.resultsHeader}>🔥 您的专属回怼弹药库</Title>
            <ResultCard title="上等回怼 (优雅暴击/降维打击)" data={results.highTier} typeColor="#e74c3c" />
            <ResultCard title="中等回怼 (简单直接/霸气侧漏)" data={results.midTier} typeColor="#e67e22" />
            <ResultCard title="下等回怼 (情绪发泄/低级争吵)" data={results.lowTier} typeColor="#95a5a6" />
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
  container: { flex: 1, backgroundColor: '#f1f2f6' },
  scrollContainer: { padding: 16, paddingBottom: 40 },
  headerTitle: { fontSize: 22, fontWeight: 'bold', color: '#2c3e50', marginTop: 10 },
  headerSubtitle: { fontSize: 13, color: '#7f8c8d', marginBottom: 20 },
  input: { backgroundColor: '#fff', marginBottom: 15 },
  button: { borderRadius: 8, elevation: 2, backgroundColor: '#0fb9b1', marginBottom: 10 },
  buttonContent: { paddingVertical: 8 },
  resultsContainer: { marginTop: 20 },
  resultsHeader: { fontSize: 18, fontWeight: 'bold', color: '#34495e', marginBottom: 15 },
  resultCard: { marginBottom: 16, borderRadius: 12, elevation: 4, backgroundColor: '#fff' },
  tierTitle: { fontSize: 16, fontWeight: 'bold', marginBottom: 8 },
  quoteText: { fontSize: 16, lineHeight: 24, color: '#2c3e50', fontWeight: '500' },
  reasonBox: { marginTop: 10, padding: 10, backgroundColor: '#f8f9fa', borderRadius: 6, borderLeftWidth: 3, borderLeftColor: '#3498db' },
  reasonText: { fontSize: 13, color: '#555', lineHeight: 20 },
  actions: { justifyContent: 'flex-end', paddingTop: 0, paddingBottom: 5 }
});

export default AiInteractionScreen;
