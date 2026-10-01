import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { FontAwesome5 } from '@expo/vector-icons';
import { useTranslation } from '../translations/translations';
import { toFahrenheit } from '../lib/utils';
import { AppState } from '../appState';

interface InfoPageProps {
  appState: AppState;
}

const InfoPage: React.FC<InfoPageProps> = ({ appState }) => {
  const t = useTranslation(appState.language);

  const getTempRange = (minC: number | null, maxC: number | null) => {
    if (appState.unit === "F") {
      const minF = minC !== null ? toFahrenheit(minC).toFixed(0) : null;
      const maxF = maxC !== null ? toFahrenheit(maxC).toFixed(0) : null;
      if (minF && maxF) return `> ${minF}-${maxF}°F`;
      if (minF) return `> ${minF}°F`;
      if (maxF) return `≤ ${maxF}°F`;
    }
    if (minC && maxC) return `> ${minC}-${maxC}°C`;
    if (minC) return `> ${minC}°C`;
    if (maxC) return `≤ ${maxC}°C`;
    return "";
  };

  const formatTemp = (tempC: number) => {
    if (appState.unit === 'F') {
      return `${toFahrenheit(tempC).toFixed(0)}°F`;
    }
    return `${tempC}°C`;
  };

  const safetyTips = {
    ko: [
      `노면 온도가 ${formatTemp(25)} 이하인 곳에서 산책하세요`,
      "뜨거운 노면은 개의 발바닥을 화상 입힐 수 있습니다",
      "그늘진 길이나 잔디 구역을 이용하세요",
      "물을 충분히 준비하고 자주 휴식을 취하세요",
      "개가 심하게 헐떡이거나 침을 흘리면 즉시 그늘로 이동시키세요",
    ],
    en: [
      `Please walk in areas where the road surface temperature is at or below ${formatTemp(25)}`,
      "Hot pavement can burn a dog's paw pads",
      "Use shaded paths and grassy areas",
      "Bring plenty of water and take frequent breaks",
      "If your dog is panting heavily or drooling, move your dog into the shade immediately",
    ],
    ja: [
      `路面温度が${formatTemp(25)}以下の場所を散歩してください`,
      "熱い路面は犬の肉球を火傷させる恐れがあります",
      "日陰の道や芝生エリアを利用してください",
      "十分な水を用意し、こまめに休憩を取りましょう",
      "犬が激しく息をしたりよだれを垂らしたら、すぐに日陰に移動してください",
    ],
    zh: [
      `建议在路面温度不高于${formatTemp(25)}的区域散步`,
      "高温路面可能会烫伤狗狗的肉垫",
      "请使用阴凉的小路或草地区域",
      "请准备足够的饮用水，并适时休息",
      "如果狗狗呼吸急促或流口水，请立即将其转移到阴凉处",
    ],
  };

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.contentContainer}>
      <Text style={styles.headerTitle}>{t("info")}</Text>

      {/* About App */}
      <View style={styles.card}>
        <View style={styles.cardHeader}>
          <FontAwesome5 name="heart" size={20} color="#ef4444" />
          <Text style={styles.cardTitle}>{t("appIntro")}</Text>
        </View>
        <View style={styles.cardContent}>
          <Text style={styles.appDescription}>{t("appDescription")}</Text>
        </View>
      </View>

      {/* Safety Guidelines */}
      <View style={styles.card}>
        <View style={styles.cardHeader}>
          <FontAwesome5 name="shield-alt" size={20} color="#3b82f6" />
          <Text style={styles.cardTitle}>{t("safetyRules")}</Text>
        </View>
        <View style={styles.cardContent}>
          {safetyTips[appState.language].map((tip, index) => (
            <View key={index} style={styles.tipItem}>
              <View style={styles.tipNumberContainer}>
                <Text style={styles.tipNumber}>{index + 1}</Text>
              </View>
              <Text style={styles.tipText}>{tip}</Text>
            </View>
          ))}
        </View>
      </View>

      {/* Temperature Guide */}
      <View style={styles.card}>
        <View style={styles.cardHeader}>
          <FontAwesome5 name="thermometer-half" size={20} color="#ef4444" />
          <Text style={styles.cardTitle}>{t("tempGuide")}</Text>
        </View>
        <View style={styles.cardContent}>
          <View style={[styles.tempGuideCard, { backgroundColor: '#dcfce7', borderColor: '#86efac' }]}>
            <View style={styles.tempGuideHeader}>
              <Text style={[styles.badge, { backgroundColor: '#22c55e', color: 'white' }]}>{t("safe")}</Text>
              <Text style={styles.tempRangeText}>{getTempRange(null, 25)}</Text>
            </View>
            <Text style={styles.tempGuideDescText}>{t("safeDesc")}</Text>
          </View>
          <View style={[styles.tempGuideCard, { backgroundColor: '#fffbeb', borderColor: '#fde047' }]}>
            <View style={styles.tempGuideHeader}>
              <Text style={[styles.badge, { backgroundColor: '#f59e0b', color: 'white' }]}>{t("caution")}</Text>
              <Text style={styles.tempRangeText}>{getTempRange(25, 35)}</Text>
            </View>
            <Text style={styles.tempGuideDescText}>{t("cautionDesc")}</Text>
          </View>
          <View style={[styles.tempGuideCard, { backgroundColor: '#fef2f2', borderColor: '#fca5a5' }]}>
            <View style={styles.tempGuideHeader}>
              <Text style={[styles.badge, { backgroundColor: '#ef4444', color: 'white' }]}>{t("danger")}</Text>
              <Text style={styles.tempRangeText}>{getTempRange(35, null)}</Text>
            </View>
            <Text style={styles.tempGuideDescText}>{t("dangerDesc")}</Text>
          </View>
        </View>
      </View>

      {/* Emergency Info */}
      <View style={styles.card}>
        <View style={styles.cardHeader}>
          <FontAwesome5 name="exclamation-triangle" size={20} color="#f97316" />
          <Text style={styles.cardTitle}>{t("emergencyResponse")}</Text>
        </View>
        <View style={styles.cardContent}>
          <View style={[styles.emergencyInfoCard, { backgroundColor: '#fff7ed' }]}>
            <Text style={styles.emergencyInfoTitle}>{t("heatStrokeSymptoms")}</Text>
            <Text style={styles.emergencyInfoText}>{t("heatStrokeDesc")}</Text>
          </View>
          <View style={[styles.emergencyInfoCard, { backgroundColor: '#fef2f2' }]}>
            <Text style={styles.emergencyInfoTitle}>{t("firstAid")}</Text>
            <Text style={styles.emergencyInfoText}>{t("firstAidDesc")}</Text>
          </View>
          <Text style={styles.disclaimerText}>{t("medicalDisclaimer")}</Text>
        </View>
      </View>

      {/* Contact */}
      <View style={styles.card}>
        <View style={styles.cardHeader}>
          <FontAwesome5 name="envelope" size={20} color="#6b7280" />
          <Text style={styles.cardTitle}>{t("contact")}</Text>
        </View>
        <View style={styles.cardContent}>
          <View style={styles.contactContainer}>
            <Text style={styles.contactText}>⭐ SP!ED2025 Team15 E.A.S.T.</Text>
            <Text style={styles.contactText}>⭐ E.A.S.T.-East Asian Super Team</Text>
            <Text style={styles.contactText}>⭐ Atsushi, Youbin, Jongbeom, Yeebin, Yuhee</Text>
          </View>
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#f9fafb',
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
    gap: 16,
  },
  appDescription: {
    fontSize: 14,
    color: '#4b5563',
    lineHeight: 20,
  },
  tipItem: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    backgroundColor: '#eff6ff',
    borderRadius: 8,
    padding: 12,
    gap: 12,
  },
  tipNumberContainer: {
    width: 24,
    height: 24,
    backgroundColor: '#3b82f6',
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 2,
  },
  tipNumber: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 12,
  },
  tipText: {
    flex: 1,
    fontSize: 14,
    color: '#1e40af',
    lineHeight: 20,
  },
  tempGuideCard: {
    borderRadius: 8,
    borderWidth: 1,
    padding: 16,
    gap: 8,
  },
  tempGuideHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  badge: {
    fontSize: 12,
    fontWeight: '500',
    borderRadius: 999,
    paddingHorizontal: 8,
    paddingVertical: 4,
    overflow: 'hidden',
  },
  tempRangeText: {
    fontSize: 14,
    fontWeight: '500',
    color: '#1f2937',
  },
  tempGuideDescText: {
    fontSize: 14,
    color: '#4b5563',
    lineHeight: 20,
  },
  emergencyInfoCard: {
    borderRadius: 8,
    padding: 12,
    gap: 4,
  },
  emergencyInfoTitle: {
    fontSize: 14,
    fontWeight: '600',
    color: '#1f2937',
    marginBottom: 4,
  },
  emergencyInfoText: {
    fontSize: 12,
    color: '#4b5563',
    lineHeight: 18,
  },
  disclaimerText: {
    fontSize: 11,
    color: '#6b7280',
    lineHeight: 16,
  },
  contactContainer: {
    gap: 8,
  },
  contactText: {
    fontSize: 14,
    color: '#4b5563',
  },
});

export default InfoPage;