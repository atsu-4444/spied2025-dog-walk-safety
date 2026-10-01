import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, Alert, Platform } from 'react-native';
import { FontAwesome5 } from '@expo/vector-icons';
import { NavigationProp } from '@react-navigation/native';
import { RootStackParamList } from '../appState';

import { useTranslation } from '../translations/translations';
import { formatTemperature } from '../lib/utils';
import { AppState, AppStateUpdate } from '../appState';

// MainDashboardScreenのpropsの型定義
interface MainDashboardProps {
  appState: AppState;
  updateAppState: (updates: AppStateUpdate) => void;
  toggleWalkState: () => void;
  navigation: NavigationProp<RootStackParamList>;
}

// Progressコンポーネントのpropsに型を定義
interface ProgressProps {
  value: number;
  maxValue: number;
}

const Progress: React.FC<ProgressProps> = ({ value, maxValue }) => {
  const progressWidth = Math.min((value / maxValue) * 100, 100);

  const getProgressColor = (temp: number) => {
    if (temp <= 25) return "#22c55e"; // safe
    if (temp <= 35) return "#f59e0b"; // caution
    return "#ef4444"; // danger
  };

  const progressColor = getProgressColor(value);

  return (
    <View style={styles.progressBarBackground}>
      {/* プログレスバーの塗りつぶし部分 */}
      <View style={[styles.progressBarFill, { width: `${progressWidth}%`, backgroundColor: progressColor }]} />
      {/* 注意と危険のしきい値を示す三角形 */}
      <View style={[styles.progressIndicator, { left: '50%', borderTopColor: '#f59e0b' }]} />
      <View style={[styles.progressIndicator, { left: '70%', borderTopColor: '#ef4444' }]} />
    </View>
  );
};


const MainDashboardScreen: React.FC<MainDashboardProps> = ({ appState, updateAppState, toggleWalkState, navigation }) => {
  const t = useTranslation(appState.language);
  const [isConfirmingStop, setIsConfirmingStop] = useState(false);

  useEffect(() => {
    if (isConfirmingStop) {
      Alert.alert(
        t('confirmEndWalk'),
        "",
        [
          {
            text: t('no'),
            onPress: () => setIsConfirmingStop(false),
            style: 'cancel',
          },
          {
            text: t('yes'),
            onPress: () => {
              setIsConfirmingStop(false);
              toggleWalkState();
            },
          },
        ]
      );
    }
  }, [isConfirmingStop]);

  const handleEndWalkPress = () => {
    if (Platform.OS === 'web') {
      if (window.confirm(t('confirmEndWalk'))) {
        toggleWalkState();
      }
      return;
    }

    setIsConfirmingStop(true);
  };

  const getWalkStatus = (temp: number) => {
    if (temp <= 25) return "safe";
    if (temp <= 35) return "caution";
    return "danger";
  };
  const status = getWalkStatus(appState.asphaltTemp);

  const statusConfig = {
    safe: { color: "#22c55e", bgColor: "#dcfce7", textColor: "#16a34a", message: t("safeMessage"), icon: "check-circle" },
    caution: { color: "#f59e0b", bgColor: "#fffbeb", textColor: "#a16207", message: t("cautionMessage"), icon: "exclamation-triangle" },
    danger: { color: "#ef4444", bgColor: "#fef2f2", textColor: "#dc2626", message: t("dangerMessage"), icon: "times-circle" },
  };

  const formatDuration = (seconds: number) => {
    const h = Math.floor(seconds / 3600);
    const m = Math.floor((seconds % 3600) / 60);
    const s = seconds % 60;
    
    const parts = [];
    if (h > 0) parts.push(String(h).padStart(2, '0'));
    parts.push(String(m).padStart(2, '0'));
    parts.push(String(s).padStart(2, '0'));

    return parts.join(':');
  };

  const recommendations = {
    safe: [
      t("walkAdvice1"),
      t("walkAdvice2"),
      t("walkAdvice3"),
    ],
    caution: [
      t("cautionAdvice1"),
      t("cautionAdvice2"),
      t("cautionAdvice3"),
    ],
    danger: [
      t("dangerAdvice1"),
      t("dangerAdvice2"),
      t("dangerAdvice3"),
    ],
  };

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.contentContainer}>
      {/* 1. 危険度ステータスカード */}
      <View style={[styles.statusCard, { backgroundColor: statusConfig[status].bgColor, borderColor: statusConfig[status].color }]}>
        <View style={styles.statusContent}>
          <View style={[styles.statusIconContainer, { backgroundColor: statusConfig[status].color }]}>
            <FontAwesome5 name={statusConfig[status].icon} size={32} color="white" />
          </View>
          <Text style={[styles.statusText, { color: statusConfig[status].textColor }]}>
            {t(status)}
          </Text>
          <Text style={[styles.messageText, { color: statusConfig[status].textColor }]}>
            {statusConfig[status].message}
          </Text>
        </View>
      </View>

      {/* 2. 温度カード & 散歩開始ボタン / 散歩中タイマー */}
      {appState.isWalking ? (
        <View style={[styles.cardSection, { marginBottom: 16 }]}>
          <View style={styles.walkTimerCard}>
            <View>
              <Text style={styles.walkTimeLabel}>{t('walkTime')}</Text>
              <Text style={styles.walkTimeValue}>{formatDuration(appState.walkDuration)}</Text>
            </View>
            <TouchableOpacity style={styles.endWalkButton} onPress={handleEndWalkPress}>
              <FontAwesome5 name="stop" size={24} color="white" />
              <Text style={styles.endWalkButtonText}>{t('end')}</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.tempCard}>
            <View style={styles.tempHeader}>
              <FontAwesome5 name="thermometer-half" size={16} color="#ef4444" />
              <Text style={styles.tempLabel}>{t('asphaltTemp')}</Text>
            </View>
            <Text style={styles.tempValue}>
              {formatTemperature(appState.asphaltTemp, appState.unit)}
            </Text>
            <Progress value={appState.asphaltTemp} maxValue={50} />
          </View>
        </View>
      ) : (
         <View style={[styles.cardSection, { marginBottom: 16 }]}>
          <View style={styles.twoColumnContainer}>
            <View style={styles.tempCard}>
              <View style={styles.tempHeader}>
                <FontAwesome5 name="thermometer-half" size={16} color="#ef4444" />
                <Text style={styles.tempLabel}>{t('asphaltTemp')}</Text>
              </View>
              <Text style={styles.tempValue}>
                {formatTemperature(appState.asphaltTemp, appState.unit)}
              </Text>
              <Progress value={appState.asphaltTemp} maxValue={50} />
            </View>
            <TouchableOpacity style={styles.startWalkButton} onPress={toggleWalkState}>
              <FontAwesome5 name="play" size={32} color="white" />
              <Text style={styles.startWalkText}>{t('startWalk')}</Text>
            </TouchableOpacity>
          </View>
        </View>
      )}

      {/* 3. 推奨事項カード */}
      <View style={styles.recommendationsCard}>
        <Text style={styles.recommendationsTitle}>{t('recommendations')}</Text>
        {recommendations[status as keyof typeof recommendations].map((rec, index) => (
          <View key={index} style={styles.recommendationItem}>
            <FontAwesome5 name="paw" size={16} color="#3b82f6" />
            <Text style={styles.recommendationText}>{rec}</Text>
          </View>
        ))}
      </View>
      
      {/* 4. 詳細を見るボタンと最終更新時刻のコンテナ */}
      <View style={styles.footerContainer}>
        <Text style={styles.footerText}>
          {t("lastUpdated")}: {appState.lastUpdated.toLocaleTimeString(appState.language)}
        </Text>
        <TouchableOpacity 
          style={styles.detailsButton} 
          onPress={() => {
            navigation.navigate('Detail');
            updateAppState({ currentPage: "detail" });
          }}
        >
          <Text style={styles.detailsButtonText}>{t("viewDetails")}</Text>
          <FontAwesome5 name="chevron-right" size={12} color="#3b82f6" />
        </TouchableOpacity>
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
  statusCard: {
    borderRadius: 12,
    padding: 24,
    borderWidth: 2,
    borderColor: '#e5e7eb',
    alignItems: 'center',
    marginBottom: 16,
  },
  statusContent: {
    alignItems: 'center',
    gap: 12,
  },
  statusIconContainer: {
    padding: 16,
    borderRadius: 50,
  },
  statusText: {
    fontSize: 24,
    fontWeight: '600',
  },
  messageText: {
    fontSize: 16,
    fontWeight: '500',
    textAlign: 'center',
  },
  cardSection: {
    gap: 16,
  },
  walkingContainer: {
    gap: 16,
  },
  walkTimerCard: {
    backgroundColor: '#1f2937',
    borderRadius: 12,
    padding: 16,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#a4a6aaff',
  },
  walkTimeLabel: {
    fontSize: 14,
    fontWeight: '500',
    color: '#9ca3af',
  },
  walkTimeValue: {
    fontSize: 48,
    fontWeight: '600',
    color: 'white',
    letterSpacing: 1,
  },
  endWalkButton: {
    backgroundColor: '#ef4444',
    borderRadius: 12,
    width: 112,
    height: 56,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
  },
  endWalkButtonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
  },
  twoColumnContainer: {
    flexDirection: 'row',
    gap: 16,
  },
  tempCard: {
    backgroundColor: 'white',
    borderRadius: 12,
    padding: 16,
    justifyContent: 'space-between',
    flex: 1,
    borderWidth: 1,
    borderColor: '#a4a6aaff',
  },
  tempHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginBottom: 8,
  },
  tempLabel: {
    fontSize: 14,
    fontWeight: '500',
    color: '#4b5563',
  },
  tempValue: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#ef4444',
    marginTop: 8,
  },
  startWalkButton: {
    flex: 1,
    backgroundColor: '#22c55e',
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 8,
    borderColor: '#a4a6aaff',
    borderWidth: 2,
  },
  startWalkText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: 'white',
    marginTop: 8,
  },
  recommendationsCard: {
    backgroundColor: 'white',
    borderRadius: 12,
    padding: 16,
    borderWidth: 1,
    borderColor: '#a4a6aaff',
  },
  recommendationsTitle: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 12,
  },
  recommendationItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginBottom: 8,
  },
  recommendationText: {
    fontSize: 14,
    color: '#4b5563',
  },
  progressBarBackground: {
    height: 4,
    backgroundColor: '#e5e7eb',
    borderRadius: 2,
    marginTop: 16,
    position: 'relative',
    overflow: 'visible', // 三角形がはみ出すのを許容
  },
  progressBarFill: {
    height: '100%',
    borderRadius: 2,
    position: 'absolute',
    left: 0,
    top: 0,
  },
  progressIndicator: {
    position: 'absolute',
    width: 0,
    height: 0,
    borderLeftWidth: 4,
    borderRightWidth: 4,
    borderTopWidth: 8,
    borderLeftColor: 'transparent',
    borderRightColor: 'transparent',
    bottom: 5, // プログレスバーの底に配置
    transform: [{ translateX: -4 }],
  },
  footerContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    gap: 12,
    marginTop: 16,
    flexDirection: 'column-reverse',
  },
  footerText: {
    fontSize: 12,
    color: '#6b7280',
    textAlign: 'center',
  },
  detailsButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#e5e7eb',
    backgroundColor: 'white',
    width: '100%',
  },
  detailsButtonText: {
    fontSize: 16,
    fontWeight: '500',
    color: '#1f2937',
  },
});

export default MainDashboardScreen;