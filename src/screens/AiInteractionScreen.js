import React, { useState } from 'react';
import { View, StyleSheet, ScrollView, Platform, ToastAndroid, Keyboard, KeyboardAvoidingView, Image } from 'react-native';
import { Appbar, TextInput, Button, Card, Title, Paragraph, IconButton, useTheme, Snackbar, SegmentedButtons, Chip, Surface, Text, ActivityIndicator } from 'react-native-paper';
import * as ExpoClipboard from 'expo-clipboard';
import * as ImagePicker from 'expo-image-picker';
import { API_ENDPOINTS } from '../config/api';
import { saveFavorite } from '../data/storage';

const AiInteractionScreen = ({ navigation }) => {
  const theme = useTheme();
  const [inputText, setInputText] = useState('');
  const [loading, setLoading] = useState(false);
  const [ocrLoading, setOcrLoading] = useState(false);
  const [results, setResults] = useState(null);
  const [protectResult, setProtectResult] = useState(null);
  const [snackbarVisible, setSnackbarVisible] = useState(false);
  
  const [mode, setMode] = useState('attack'); 
  const [persona, setPersona] = useState('empress'); 
  const [intensity, setIntensity] = useState(60); 

  const pickImage = async () => {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (status !== 'granted') {
      alert('我们需要相册权限来识别截图');
      return;
    }

    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      quality: 0.5,
    });

    if (!result.canceled) {
      setOcrLoading(true);
      try {
        const response = await fetch(API_ENDPOINTS.ocr, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ imageUri: result.assets[0].uri }),
        });
        const data = await response.json();
        if (data.success) {
          setInputText(data.text);
          if (Platform.OS === 'android') {
            ToastAndroid.show('截图内容已提取', ToastAndroid.SHORT);
          }
        }
      } catch (error) {
        console.error(error);
      } finally {
        setOcrLoading(false);
      }
    }
  };

  const generateReply = async () => {
    if (!inputText.trim()) return;
    setLoading(true);
    Keyboard.dismiss();

    try {
      const response = await fetch(API_ENDPOINTS.generate, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ text: inputText, mode, persona, intensity }),
      });

      if (!response.ok) throw new Error('API Error');

      const data = await response.json();
      if (mode === 'protect') {
        setProtectResult(data);
        setResults(null);
      } else {
        setResults(data);
        setProtectResult(null);
      }
    } catch (error) {
      console.error(error);
      if (Platform.OS === 'android') {
        ToastAndroid.show('生成失败，请检查网络或后端', ToastAndroid.SHORT);
      } else {
        setSnackbarVisible(true);
      }
    } finally {
      setLoading(false);
    }
  };

  const ResultCard = ({ title, data, typeColor, icon }) => (
    <Surface style={[styles.resultCard, { borderLeftColor: typeColor, borderLeftWidth: 6 }]} elevation={1}>
      <View style={styles.cardHeader}>
        <View style={styles.cardTitleRow}>
           <Avatar.Icon size={24} icon={icon} style={{backgroundColor: `${typeColor}20`}} iconColor={typeColor} />
           <Text style={[styles.tierTitle, { color: typeColor }]}>{title}</Text>
        </View>
        <View style={styles.cardActionRow}>
          <IconButton icon="content-copy" size={20} iconColor="#7F8C8D" onPress={() => {}} />
          <IconButton icon="heart-outline" size={20} iconColor="#7F8C8D" onPress={() => {}} />
        </View>
      </View>
      <Text style={styles.quoteText}>{data.content}</Text>
      <View style={styles.reasonBox}>
        <Text style={styles.reasonText}>{data.reason}</Text>
      </View>
    </Surface>
  );

  return (
    <KeyboardAvoidingView 
      style={styles.container} 
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    >
      <Appbar.Header style={styles.appbar} elevation={0}>
        <Appbar.BackAction onPress={() => navigation.goBack()} />
        <Appbar.Content title="对线实验室" titleStyle={styles.appbarTitle} />
      </Appbar.Header>

      <ScrollView contentContainerStyle={styles.scrollContainer} keyboardShouldPersistTaps="handled">
        <Surface style={styles.selectorSurface} elevation={1}>
          <SegmentedButtons
            value={mode}
            onValueChange={setMode}
            density="medium"
            buttons={[
              { value: 'attack', label: '逻辑对线', icon: 'fire' },
              { value: 'protect', label: '心态维护', icon: 'shield-check' },
            ]}
          />
        </Surface>

        {mode === 'attack' && (
          <View style={styles.configArea}>
            <Text style={styles.label}>对线人格</Text>
            <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.personaScroll}>
              {[
                {id: 'empress', name: '甄嬛', icon: 'face-man-shimmer'},
                {id: 'nerd', name: '极客', icon: 'robot'},
                {id: 'worker', name: '打工人', icon: 'briefcase'},
                {id: 'savage', name: '毒舌', icon: 'lightning-bolt'}
              ].map(p => (
                <Chip 
                  key={p.id} 
                  selected={persona === p.id} 
                  onPress={() => setPersona(p.id)} 
                  style={styles.chip}
                  showSelectedOverlay
                  icon={p.icon}
                >
                  {p.name}
                </Chip>
              ))}
            </ScrollView>

            <View style={styles.intensityContainer}>
              <Text style={styles.label}>攻击强度：{intensity}%</Text>
              <View style={styles.intensityRow}>
                {[30, 60, 100].map(val => (
                  <TouchableOpacity 
                    key={val} 
                    onPress={() => setIntensity(val)}
                    style={[styles.intensityItem, intensity === val && styles.intensityItemActive]}
                  >
                    <Text style={[styles.intensityText, intensity === val && styles.intensityTextActive]}>
                      {val === 30 ? '优雅' : (val === 60 ? '犀利' : '爆破')}
                    </Text>
                  </TouchableOpacity>
                ))}
              </View>
            </View>
          </View>
        )}

        <View style={styles.inputCard}>
          <TextInput
            mode="flat"
            placeholder={mode === 'attack' ? "在此录入对方的话..." : "哪句话让你觉得不舒服了？"}
            value={inputText}
            onChangeText={setInputText}
            multiline
            style={styles.textInput}
            underlineColor="transparent"
            activeUnderlineColor="transparent"
          />
          <View style={styles.inputActions}>
             <IconButton icon="image-search" mode="contained-tonal" iconColor="#1A1A1A" onPress={pickImage} loading={ocrLoading} />
             <Button 
               mode="contained" 
               onPress={generateReply} 
               loading={loading}
               disabled={!inputText.trim() || loading}
               style={styles.postBtn}
             >
               分析并生成
             </Button>
          </View>
        </View>

        {results && (
          <View style={styles.resultsWrapper}>
            <Text style={styles.resultsTitle}>🔥 生成方案</Text>
            <ResultCard title="上策：降维打击" data={results.highTier} typeColor="#FF5E57" icon="trending-up" />
            <ResultCard title="中策：以退为进" data={results.midTier} typeColor="#6C5CE7" icon="swap-horizontal" />
            <ResultCard title="下策：原力觉醒" data={results.lowTier} typeColor="#7F8C8D" icon="flash" />
          </View>
        )}

        {protectResult && (
          <Surface style={styles.protectSurface} elevation={1}>
             <View style={styles.protectHeader}>
               <Avatar.Icon size={32} icon="shield-sun" style={{backgroundColor: '#E1F5FE'}} iconColor="#01579B" />
               <Text style={styles.protectTitle}>{protectResult.title}</Text>
             </View>
             <Text style={styles.protectContent}>{protectResult.content}</Text>
             <View style={styles.analysisBox}>
                <Text style={styles.analysisText}>{protectResult.analysis}</Text>
             </View>
          </Surface>
        )}
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#F8F9FA' },
  appbar: { backgroundColor: '#F8F9FA' },
  appbarTitle: { fontWeight: 'bold', fontSize: 18 },
  scrollContainer: { padding: 20, paddingBottom: 60 },
  selectorSurface: { padding: 4, borderRadius: 16, backgroundColor: '#FFF', marginBottom: 24 },
  configArea: { marginBottom: 24 },
  label: { fontSize: 13, fontWeight: 'bold', color: '#7F8C8D', marginBottom: 12, textTransform: 'uppercase', letterSpacing: 1 },
  personaScroll: { flexDirection: 'row', marginBottom: 20 },
  chip: { marginRight: 8, backgroundColor: '#FFF', borderRadius: 12 },
  intensityContainer: { marginBottom: 10 },
  intensityRow: { flexDirection: 'row', gap: 10 },
  intensityItem: { flex: 1, paddingVertical: 10, borderRadius: 12, backgroundColor: '#FFF', alignItems: 'center', borderWidth: 1, borderColor: '#EEE' },
  intensityItemActive: { backgroundColor: '#1A1A1A', borderColor: '#1A1A1A' },
  intensityText: { fontSize: 13, color: '#4F5962', fontWeight: '600' },
  intensityTextActive: { color: '#FFF' },
  inputCard: { backgroundColor: '#FFF', borderRadius: 24, padding: 16, marginBottom: 30, elevation: 2 },
  textInput: { backgroundColor: 'transparent', fontSize: 16, minHeight: 100 },
  inputActions: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginTop: 10 },
  postBtn: { borderRadius: 16, flex: 1, marginLeft: 10 },
  resultsWrapper: { marginTop: 10 },
  resultsTitle: { fontSize: 18, fontWeight: 'bold', color: '#1A1A1A', marginBottom: 16 },
  resultCard: { backgroundColor: '#FFF', borderRadius: 20, padding: 16, marginBottom: 16 },
  cardHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12 },
  cardTitleRow: { flexDirection: 'row', alignItems: 'center', gap: 8 },
  tierTitle: { fontSize: 14, fontWeight: 'bold' },
  cardActionRow: { flexDirection: 'row' },
  quoteText: { fontSize: 16, lineHeight: 24, color: '#1A1A1A', fontWeight: '500', marginBottom: 12 },
  reasonBox: { padding: 12, backgroundColor: '#F8F9FA', borderRadius: 12 },
  reasonText: { fontSize: 13, color: '#7F8C8D', lineHeight: 20 },
  protectSurface: { backgroundColor: '#FFF', borderRadius: 24, padding: 20 },
  protectHeader: { flexDirection: 'row', alignItems: 'center', gap: 12, marginBottom: 16 },
  protectTitle: { fontSize: 18, fontWeight: 'bold', color: '#01579B' },
  protectContent: { fontSize: 15, lineHeight: 24, color: '#1A1A1A', marginBottom: 16 },
  analysisBox: { padding: 16, backgroundColor: '#E1F5FE', borderRadius: 16 },
  analysisText: { fontSize: 13, color: '#01579B', lineHeight: 20 }
});

export default AiInteractionScreen;
