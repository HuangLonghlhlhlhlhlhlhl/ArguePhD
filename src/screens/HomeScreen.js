import React from 'react';
import { View, StyleSheet, FlatList, TouchableOpacity, ScrollView, Dimensions } from 'react-native';
import { Appbar, Card, Title, Paragraph, useTheme, Avatar, IconButton, Text, Surface } from 'react-native-paper';
import { categories } from '../data/quotes';

const { width } = Dimensions.get('window');

const HomeScreen = ({ navigation }) => {
  const theme = useTheme();

  const MainFeature = () => (
    <TouchableOpacity 
      activeOpacity={0.9} 
      onPress={() => navigation.navigate('AiInteraction')}
      style={styles.mainFeatureContainer}
    >
      <Surface style={styles.mainFeatureCard} elevation={2}>
        <View style={styles.mainFeatureContent}>
          <View>
            <Title style={styles.mainFeatureTitle}>AI 智能回怼</Title>
            <Paragraph style={styles.mainFeatureSubtitle}>输入对方的话，精准降维打击</Paragraph>
          </View>
          <Avatar.Icon size={56} icon="auto-fix" style={{ backgroundColor: '#FF5E57' }} color="#fff" />
        </View>
        <View style={styles.mainFeatureFooter}>
          <Text style={styles.footerText}>已通过 AI 协助完成 12.5k 次反击</Text>
          <IconButton icon="arrow-right" iconColor="#fff" style={styles.footerIcon} />
        </View>
      </Surface>
    </TouchableOpacity>
  );

  const ToolGrid = () => (
    <View style={styles.gridContainer}>
      <View style={styles.gridRow}>
        <ToolItem icon="translate" title="阴阳怪气" subtitle="翻译官" color="#6C5CE7" onPress={() => navigation.navigate('Translator')} />
        <ToolItem icon="image-multiple" title="一键生成" subtitle="表情包" color="#0FB9B1" onPress={() => navigation.navigate('Meme', {text: '点击右侧按钮生成随机表情包'})} />
      </View>
      <View style={styles.gridRow}>
        <ToolItem icon="boxing-glove" title="实战演练" subtitle="模拟器" color="#E74C3C" onPress={() => navigation.navigate('Simulator')} />
        <ToolItem icon="forum" title="段子大厅" subtitle="社区" color="#F1C40F" onPress={() => navigation.navigate('Community')} />
      </View>
    </View>
  );

  const ToolItem = ({ icon, title, subtitle, color, onPress }) => (
    <TouchableOpacity style={styles.toolCol} onPress={onPress} activeOpacity={0.7}>
      <Surface style={styles.toolCard} elevation={1}>
        <Avatar.Icon size={40} icon={icon} style={{ backgroundColor: `${color}15` }} color={color} />
        <Text style={styles.toolTitle}>{title}</Text>
        <Text style={styles.toolSubtitle}>{subtitle}</Text>
      </Surface>
    </TouchableOpacity>
  );

  const renderCategory = ({ item }) => (
    <TouchableOpacity
      activeOpacity={0.8}
      onPress={() => navigation.navigate('CategoryDetail', { category: item })}
      style={styles.categoryBadge}
    >
      <Surface style={styles.badgeSurface} elevation={0}>
        <Avatar.Icon size={24} icon={item.icon} style={{ backgroundColor: 'transparent' }} color={item.color} />
        <Text style={styles.badgeText}>{item.title}</Text>
      </Surface>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <Appbar.Header style={styles.appbar} elevation={0}>
        <View style={styles.headerTitleRow}>
          <Title style={styles.appTitle}>怼人助手 <Text style={styles.appVersion}>PRO</Text></Title>
        </View>
        <Appbar.Action icon="bookmark-outline" onPress={() => navigation.navigate('Favorites')} />
      </Appbar.Header>

      <ScrollView contentContainerStyle={styles.scrollContent}>
        <View style={styles.welcomeSection}>
          <Text style={styles.welcomeTitle}>你好，嘴强王者</Text>
          <Text style={styles.welcomeSubtitle}>今天又是谁让你觉得沟通困难了？</Text>
        </View>

        <MainFeature />

        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>高效对线工具</Text>
        </View>
        <ToolGrid />

        <TouchableOpacity 
          style={styles.competitionBanner} 
          onPress={() => navigation.navigate('Competition')}
          activeOpacity={0.9}
        >
          <Surface style={styles.bannerSurface} elevation={1}>
            <View style={{flexDirection: 'row', alignItems: 'center'}}>
              <Avatar.Icon size={36} icon="fire" style={{backgroundColor: '#FF4757'}} color="#fff" />
              <View style={{marginLeft: 12}}>
                <Text style={styles.bannerTitle}>最强嘴贱大赛 · 正在进行</Text>
                <Text style={styles.bannerSubtitle}>围观网友们的顶级脑洞</Text>
              </View>
            </View>
          </Surface>
        </TouchableOpacity>

        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>经典语录库</Text>
          <TouchableOpacity onPress={() => {}}>
            <Text style={styles.seeAll}>查看全部</Text>
          </TouchableOpacity>
        </View>

        <FlatList
          data={categories}
          keyExtractor={(item) => item.id}
          renderItem={renderCategory}
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.categoryList}
        />
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#F8F9FA' },
  appbar: { backgroundColor: '#F8F9FA', paddingHorizontal: 8 },
  headerTitleRow: { flex: 1, marginLeft: 8 },
  appTitle: { fontSize: 22, fontWeight: '900', color: '#1A1A1A', letterSpacing: -0.5 },
  appVersion: { fontSize: 10, color: '#FF5E57', fontWeight: 'bold' },
  scrollContent: { paddingBottom: 40 },
  welcomeSection: { paddingHorizontal: 20, marginTop: 10, marginBottom: 20 },
  welcomeTitle: { fontSize: 26, fontWeight: 'bold', color: '#1A1A1A' },
  welcomeSubtitle: { fontSize: 14, color: '#7F8C8D', marginTop: 4 },
  mainFeatureContainer: { paddingHorizontal: 20, marginBottom: 24 },
  mainFeatureCard: { borderRadius: 24, backgroundColor: '#1A1A1A', padding: 20, overflow: 'hidden' },
  mainFeatureContent: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  mainFeatureTitle: { color: '#FFF', fontSize: 20, fontWeight: 'bold' },
  mainFeatureSubtitle: { color: 'rgba(255,255,255,0.6)', fontSize: 13, marginTop: 4 },
  mainFeatureFooter: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginTop: 24, backgroundColor: 'rgba(255,255,255,0.05)', padding: 12, borderRadius: 16, marginHorizontal: -4 },
  footerText: { color: '#FF5E57', fontSize: 11, fontWeight: 'bold' },
  footerIcon: { backgroundColor: '#FF5E57', margin: 0 },
  sectionHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingHorizontal: 20, marginBottom: 16 },
  sectionTitle: { fontSize: 18, fontWeight: 'bold', color: '#1A1A1A' },
  seeAll: { fontSize: 13, color: '#6C5CE7', fontWeight: 'bold' },
  gridContainer: { paddingHorizontal: 12, marginBottom: 24 },
  gridRow: { flexDirection: 'row', marginBottom: 12 },
  toolCol: { flex: 1, paddingHorizontal: 8 },
  toolCard: { backgroundColor: '#FFF', borderRadius: 20, padding: 16, alignItems: 'center' },
  toolTitle: { fontSize: 15, fontWeight: 'bold', color: '#1A1A1A', marginTop: 10 },
  toolSubtitle: { fontSize: 12, color: '#7F8C8D', marginTop: 2 },
  competitionBanner: { paddingHorizontal: 20, marginBottom: 24 },
  bannerSurface: { padding: 16, borderRadius: 20, backgroundColor: '#FFF' },
  bannerTitle: { fontSize: 15, fontWeight: 'bold', color: '#1A1A1A' },
  bannerSubtitle: { fontSize: 12, color: '#7F8C8D', marginTop: 2 },
  categoryList: { paddingHorizontal: 16, paddingBottom: 10 },
  categoryBadge: { marginRight: 12 },
  badgeSurface: { paddingHorizontal: 16, paddingVertical: 10, borderRadius: 16, backgroundColor: '#FFF', flexDirection: 'row', alignItems: 'center', borderWeight: 1, borderColor: '#EEE' },
  badgeText: { fontSize: 14, fontWeight: '600', color: '#1A1A1A', marginLeft: 6 }
});

export default HomeScreen;
