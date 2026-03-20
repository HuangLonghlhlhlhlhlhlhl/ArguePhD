import React, { useState } from 'react';
import { View, StyleSheet, ScrollView, Platform, Keyboard, KeyboardAvoidingView } from 'react-native';
import { Appbar, TextInput, Button, Card, Title, Paragraph, useTheme } from 'react-native-paper';
import * as ExpoClipboard from 'expo-clipboard';

const TranslatorScreen = ({ navigation }) => {
  const theme = useTheme();
  const [inputText, setInputText] = useState('');
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState('');

  const generateTranslation = () => {
    if (!inputText.trim()) return;
    setLoading(true);
    Keyboard.dismiss();

    setTimeout(() => {
      let output = "";
      if (inputText.includes("滚") || inputText.includes("傻") || inputText.includes("没脑子")) {
        output = "您平时一定很忙吧？连基本的思考时间都省了。希望您未来能有足够的时间来修补一下理解能力的短板。";
      } else if (inputText.includes("钱") || inputText.includes("穷")) {
        output = "您的品味确实很独特，不过我觉得真正的富有是精神上的充裕，而不是只能用数字来掩饰内心的空虚。";
      } else {
        output = `关于您说的“${inputText}”，我完全尊重您的发声权利。毕竟，每个人都有表达自己局限的自由。`;
      }
      setResult(output);
      setLoading(false);
    }, 1200);
  };

  const copyToMeme = () => {
    navigation.navigate('Meme', { text: result });
  };

  return (
    <KeyboardAvoidingView 
      style={styles.container} 
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      keyboardVerticalOffset={Platform.OS === 'ios' ? 0 : 25}
    >
      <Appbar.Header style={{ backgroundColor: '#27ae60' }}>
        <Appbar.BackAction onPress={() => navigation.goBack()} color="#fff" />
        <Appbar.Content title="高情商翻译器" titleStyle={{ color: '#fff' }} />
      </Appbar.Header>

      <ScrollView contentContainerStyle={styles.scrollContainer} keyboardShouldPersistTaps="handled">
        <Title style={styles.headerTitle}>脏话消音器</Title>
        <Paragraph style={styles.headerSubtitle}>把你想骂的糙话输入进来，一键变身优雅的“阴阳怪气”！</Paragraph>

        <TextInput
          mode="outlined"
          label="输入你想直接骂的话..."
          value={inputText}
          onChangeText={setInputText}
          multiline
          numberOfLines={4}
          style={styles.input}
          theme={{ colors: { primary: '#27ae60' } }}
        />

        <Button
          mode="contained"
          onPress={generateTranslation}
          loading={loading}
          disabled={!inputText.trim() || loading}
          style={styles.button}
        >
          {loading ? '正在优雅化中...' : '开始优雅翻译 ✨'}
        </Button>

        {result ? (
          <View style={styles.resultsContainer}>
            <Title style={styles.resultsHeader}>翻译结果（可以直接发朋友圈）</Title>
            <Card style={styles.resultCard}>
              <Card.Content>
                <Paragraph style={styles.quoteText}>{result}</Paragraph>
              </Card.Content>
              <Card.Actions style={styles.actions}>
                <Button 
                  icon="image" 
                  mode="text" 
                  color="#27ae60" 
                  onPress={copyToMeme}
                >转成表情包</Button>
                <Button 
                  icon="content-copy" 
                  mode="contained" 
                  color="#27ae60" 
                  onPress={() => ExpoClipboard.setStringAsync(result)}
                >复制</Button>
              </Card.Actions>
            </Card>
          </View>
        ) : null}
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#f1f8e9' },
  scrollContainer: { padding: 16, paddingBottom: 40 },
  headerTitle: { fontSize: 22, fontWeight: 'bold', color: '#2c3e50', marginTop: 10 },
  headerSubtitle: { fontSize: 14, color: '#7f8c8d', marginBottom: 20 },
  input: { backgroundColor: '#fff', marginBottom: 20 },
  button: { borderRadius: 8, elevation: 2, backgroundColor: '#27ae60', paddingVertical: 8 },
  resultsContainer: { marginTop: 30 },
  resultsHeader: { fontSize: 18, fontWeight: 'bold', color: '#34495e', marginBottom: 15 },
  resultCard: { borderRadius: 12, elevation: 3, backgroundColor: '#fff' },
  quoteText: { fontSize: 18, lineHeight: 28, color: '#2c3e50', fontStyle: 'italic' },
  actions: { justifyContent: 'flex-end', paddingTop: 10 }
});

export default TranslatorScreen;
