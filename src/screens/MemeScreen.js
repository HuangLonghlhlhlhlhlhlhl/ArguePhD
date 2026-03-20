import React, { useRef } from 'react';
import { View, StyleSheet, Alert, ImageBackground } from 'react-native';
import { Appbar, Button, Title, Paragraph } from 'react-native-paper';
import ViewShot from 'react-native-view-shot';
import * as Sharing from 'expo-sharing';

const MemeScreen = ({ route, navigation }) => {
  const { text } = route.params || { text: '对方不想理你，并向你扔了一串代码。' };
  const viewShotRef = useRef(null);

  const shareMeme = async () => {
    try {
      const uri = await viewShotRef.current.capture();
      if (!(await Sharing.isAvailableAsync())) {
        Alert.alert('无法分享', '您的设备不支持此分享功能');
        return;
      }
      await Sharing.shareAsync(uri);
    } catch (error) {
      console.error(error);
      Alert.alert('错误', '生成表情包失败: ' + error.message);
    }
  };

  return (
    <View style={styles.container}>
      <Appbar.Header style={{ backgroundColor: '#8e44ad' }}>
        <Appbar.BackAction onPress={() => navigation.goBack()} color="#fff" />
        <Appbar.Content title="一键表情包" titleStyle={{ color: '#fff' }} />
      </Appbar.Header>

      <View style={styles.content}>
        <Paragraph style={styles.hint}>预览您的表情包：</Paragraph>
        
        <View style={styles.memeWrapper}>
          <ViewShot ref={viewShotRef} options={{ format: 'jpg', quality: 0.9 }} style={styles.viewShot}>
            <ImageBackground 
              source={{ uri: 'https://images.unsplash.com/photo-1543852786-1cf6624b9987?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80' }} // 搞笑猫咪底图
              style={styles.memeBackground}
            >
              <View style={styles.textOverlay}>
                <Title style={styles.memeText}>{text}</Title>
              </View>
            </ImageBackground>
          </ViewShot>
        </View>

        <Button 
          mode="contained" 
          icon="share-variant" 
          onPress={shareMeme}
          style={styles.shareButton}
          contentStyle={{ paddingVertical: 10 }}
        >
          分享给好友 / 存到相册
        </Button>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#f5f6fa' },
  content: { flex: 1, padding: 20, alignItems: 'center' },
  hint: { fontSize: 16, color: '#7f8c8d', marginBottom: 20, alignSelf: 'flex-start' },
  memeWrapper: { 
    width: 300, 
    height: 300, 
    elevation: 5,
    backgroundColor: '#fff',
    borderRadius: 8,
    overflow: 'hidden',
    marginBottom: 40
  },
  viewShot: { flex: 1 },
  memeBackground: { flex: 1, justifyContent: 'flex-end', alignItems: 'center' },
  textOverlay: { 
    backgroundColor: 'rgba(0,0,0,0.6)', 
    width: '100%', 
    padding: 15,
    minHeight: 80,
    justifyContent: 'center'
  },
  memeText: { 
    color: '#fff', 
    fontSize: 18, 
    fontWeight: 'bold', 
    textAlign: 'center', 
    lineHeight: 26 
  },
  shareButton: { width: '100%', backgroundColor: '#8e44ad', borderRadius: 8 }
});

export default MemeScreen;
