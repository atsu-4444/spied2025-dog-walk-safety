import React from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';
import { useTranslation } from '../translations/translations';
import { Language } from '../appState';

interface SplashScreenProps {
  language: Language;
}

const SplashScreen: React.FC<SplashScreenProps> = ({ language }) => {
  const t = useTranslation(language);

  return (
    <View style={styles.container}>
      <Image
        source={require('../../public/SDGs.png')} // publicフォルダにあるロゴ画像
        style={styles.logo}
      />
      <Text style={styles.title}>{t("title")}</Text>
      <Text style={styles.loadingText}>{t("loading")}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 16,
  },
  logo: {
    width: 128,
    height: 128,
  },
  title: {
    fontSize: 18,
    fontWeight: '600',
    color: '#4b5563',
  },
  loadingText: {
    fontSize: 14,
    color: '#6b7280',
    marginTop: 8,
  },
});

export default SplashScreen;