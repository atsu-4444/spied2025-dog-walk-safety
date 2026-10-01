import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Switch, ScrollView } from 'react-native';
import { FontAwesome5 } from '@expo/vector-icons';
import { useTranslation } from '../translations/translations';
import { formatTemperature } from '../lib/utils';
import { AppState, AppStateUpdate, Language, Unit } from '../appState';

interface SettingsPageProps {
  appState: AppState;
  updateAppState: (updates: AppStateUpdate) => void;
}

const SettingsPage: React.FC<SettingsPageProps> = ({ appState, updateAppState }) => {
  const t = useTranslation(appState.language);

  const dangerTempDesc = t("dangerTempDesc").replace(
    '{temp}', 
    formatTemperature(35, appState.unit)
  );
  const walkTimeDesc = t("walkTimeDesc").replace(
    '{temp}', 
    formatTemperature(30, appState.unit)
  );

  const languages = [
    { code: "en" as Language, name: "English", flag: "🇺🇸" },
    { code: "ko" as Language, name: "한국어", flag: "🇰🇷" },
    { code: "ja" as Language, name: "日本語", flag: "🇯🇵" },
    { code: "zh" as Language, name: "中文", flag: "🇨🇳" },
  ];

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.contentContainer}>
      <Text style={styles.headerTitle}>{t("settings")}</Text>
      
      {/* 通知設定 */}
      <View style={styles.card}>
        <View style={styles.cardHeader}>
          <FontAwesome5 name="bell" size={20} color="#3b82f6" />
          <Text style={styles.cardTitle}>{t("notifications")}</Text>
        </View>
        <View style={styles.cardContent}>
          <View style={styles.settingRow}>
            <View style={styles.textContainer}>
              <Text style={styles.settingTitle}>{t("dangerTempAlert")}</Text>
              <Text style={styles.settingDescription}>{dangerTempDesc}</Text>
            </View>
            <Switch
              value={appState.dangerTempAlertEnabled}
              onValueChange={(checked) => updateAppState({ dangerTempAlertEnabled: checked })}
            />
          </View>

          <View style={styles.settingRow}>
            <View style={styles.textContainer}>
              <Text style={styles.settingTitle}>{t("walkTimeAlert")}</Text>
              <Text style={styles.settingDescription}>{walkTimeDesc}</Text>
            </View>
            <Switch
              value={appState.walkTimeAlertEnabled}
              onValueChange={(checked) => updateAppState({ walkTimeAlertEnabled: checked })}
            />
          </View>
        </View>
      </View>

      {/* 温度単位 */}
      <View style={styles.card}>
        <View style={styles.cardHeader}>
          <FontAwesome5 name="thermometer-half" size={20} color="#ef4444" />
          <Text style={styles.cardTitle}>{t("units")}</Text>
        </View>
        <View style={styles.cardContent}>
          <TouchableOpacity
            onPress={() => updateAppState({ unit: "C" })}
            style={[
              styles.unitButton,
              appState.unit === "C" ? styles.unitButtonActive : null,
            ]}
          >
            <Text style={styles.unitButtonText}>{t("celsius")}</Text>
            {appState.unit === "C" && <View style={styles.unitActiveDot} />}
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => updateAppState({ unit: "F" })}
            style={[
              styles.unitButton,
              appState.unit === "F" ? styles.unitButtonActive : null,
            ]}
          >
            <Text style={styles.unitButtonText}>{t("fahrenheit")}</Text>
            {appState.unit === "F" && <View style={styles.unitActiveDot} />}
          </TouchableOpacity>
        </View>
      </View>

      {/* 言語設定 */}
      <View style={styles.card}>
        <View style={styles.cardHeader}>
          <FontAwesome5 name="globe" size={20} color="#6b7280" />
          <Text style={styles.cardTitle}>{t("language")}</Text>
        </View>
        <View style={styles.cardContent}>
          {languages.map((lang) => (
            <TouchableOpacity
              key={lang.code}
              onPress={() => updateAppState({ language: lang.code })}
              style={[
                styles.languageButton,
                appState.language === lang.code ? styles.languageButtonActive : null,
              ]}
            >
              <View style={styles.languageTextContainer}>
                <Text style={styles.flag}>{lang.flag}</Text>
                <Text style={styles.languageName}>{lang.name}</Text>
              </View>
              {appState.language === lang.code && <View style={styles.languageActiveDot} />}
            </TouchableOpacity>
          ))}
        </View>
      </View>
    </ScrollView>
  );
};
const styles = StyleSheet.create({
  scrollView: {
    flex: 1,
    backgroundColor: '#f9fafb',
  },
  container: {
    padding: 16,
  },
  contentContainer: {
    paddingBottom: 80,
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#1f2937',
    marginBottom: 16,
  },
  card: {
    backgroundColor: 'white',
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#e5e7eb',
    marginBottom: 16,
  },
  cardHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    gap: 8,
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  cardContent: {
    paddingHorizontal: 16,
    paddingBottom: 16,
    gap: 12,
  },
  settingRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: 16,
  },
  textContainer: {
    flex: 1,
  },
  settingTitle: {
    fontSize: 16,
    fontWeight: '500',
    color: '#1f2937',
  },
  settingDescription: {
    fontSize: 12,
    color: '#6b7280',
    marginTop: 4,
  },
  unitButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 12,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#e5e7eb',
  },
  unitButtonActive: {
    borderColor: '#3b82f6',
    backgroundColor: '#eff6ff',
  },
  unitButtonText: {
    fontSize: 16,
    fontWeight: '500',
  },
  unitActiveDot: {
    width: 8,
    height: 8,
    backgroundColor: '#3b82f6',
    borderRadius: 4,
  },
  languageButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 12,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#e5e7eb',
  },
  languageButtonActive: {
    borderColor: '#3b82f6',
    backgroundColor: '#eff6ff',
  },
  languageTextContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  flag: {
    fontSize: 24,
  },
  languageName: {
    fontSize: 16,
    fontWeight: '500',
  },
  languageActiveDot: {
    width: 8,
    height: 8,
    backgroundColor: '#3b82f6',
    borderRadius: 4,
  },
});

export default SettingsPage;
