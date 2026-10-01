import React from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';
import { FontAwesome5 } from '@expo/vector-icons';
import { useTranslation } from '../translations/translations';
import { AppState, AppStateUpdate } from '../appState';

interface TopBarProps {
  appState: AppState;
  updateAppState: (updates: AppStateUpdate) => void;
}

const TopBar: React.FC<TopBarProps> = ({ appState }) => {
  const t = useTranslation(appState.language);

  return (
    <View style={styles.container}>
      {/* 左側のロゴ */}
      <View style={styles.leftContainer}>
        <Image
          source={require('../../public/SDGs.png')} // publicフォルダにある画像ファイルを指定
          style={styles.logo}
          alt="Dog Walk Safety Logo"
        />
      </View>

      {/* 中央のタイトル */}
      <Text style={styles.title}>{t("title")}</Text>

      {/* Decorative notification icon from the original prototype UI */}
      <View style={styles.rightContainer}>
        <FontAwesome5 name="bell" size={20} color="#6b7280" />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: 'white',
    borderBottomWidth: 1,
    borderBottomColor: '#e5e7eb',
    paddingHorizontal: 16,
    paddingVertical: 27,
  },
  leftContainer: {
    width: 32, // 右側のアイコンの幅に合わせる
  },
  logo: {
    width: 32,
    height: 32,
    borderRadius: 6,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#1f2937',
  },
  rightContainer: {
    width: 32, // 左側のロゴの幅に合わせる
    alignItems: 'flex-end',
  },
});

export default TopBar;

