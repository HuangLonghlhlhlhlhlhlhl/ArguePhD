import 'react-native-gesture-handler';
import React from 'react';
import { MD3LightTheme, PaperProvider, configureFonts } from 'react-native-paper';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import AppNavigator from './src/navigation/AppNavigator';
import { StatusBar } from 'expo-status-bar';

// --- 全局高级配色方案 (精简冷淡风) ---
const theme = {
  ...MD3LightTheme,
  colors: {
    ...MD3LightTheme.colors,
    primary: '#1A1A1A', // 深碳灰 - 代表成熟冷静
    secondary: '#FF5E57', // 珊瑚红 - 点睛之笔的攻击色
    tertiary: '#7F8C8D', // 辅助色
    background: '#F8F9FA', // 背景色
    surface: '#FFFFFF', // 卡片底色
    accent: '#6C5CE7', // 智慧紫
  },
  roundness: 24, // 增加圆角，更透气
};

export default function App() {
  return (
    <SafeAreaProvider>
      <PaperProvider theme={theme}>
        <StatusBar style="dark" />
        <AppNavigator />
      </PaperProvider>
    </SafeAreaProvider>
  );
}
