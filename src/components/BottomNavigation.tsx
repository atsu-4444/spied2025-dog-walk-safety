import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { FontAwesome5 } from '@expo/vector-icons';
import { useTranslation } from '../translations/translations';
import { AppState, AppStateUpdate, Page, RootStackParamList } from '../appState';
import { useNavigation, NavigationProp } from '@react-navigation/native';

interface BottomNavigationProps {
  appState: AppState;
  updateAppState: (updates: AppStateUpdate) => void;
}

const BottomNavigation: React.FC<BottomNavigationProps> = ({ appState, updateAppState }) => {
  const t = useTranslation(appState.language);
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();

  const navItems: Array<{
    id: keyof RootStackParamList;
    page: Page;
    icon: string;
    label: string;
  }> = [
    { id: "MainDashboard", page: "dashboard", icon: "home", label: t("dashboard") },
    { id: "Detail", page: "detail", icon: "chart-bar", label: t("detail") },
    { id: "History", page: "history", icon: "clock", label: t("history") },
    { id: "Settings", page: "settings", icon: "cog", label: t("settings") },
    { id: "Info", page: "info", icon: "info-circle", label: t("info") },
  ];

  return (
    <View style={styles.container}>
      <View style={styles.navBar}>
        {navItems.map((item) => {
          const isActive = appState.currentPage === item.page;

          return (
            <TouchableOpacity
              key={item.id}
              onPress={() => {
                navigation.navigate(item.id);
                updateAppState({ currentPage: item.page });
              }}
              style={[
                styles.navItem,
                isActive ? styles.navItemActive : null,
              ]}
            >
              <FontAwesome5
                name={item.icon as any}
                size={20}
                color={isActive ? "#3b82f6" : "#6b7280"}
              />
              <Text style={[
                styles.navLabel,
                isActive ? styles.navLabelActive : null,
              ]}>
                {item.label}
              </Text>
            </TouchableOpacity>
          );
        })}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: 'white',
    borderTopWidth: 1,
    borderTopColor: '#e5e7eb',
  },
  navBar: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
    paddingVertical: 8,
  },
  navItem: {
    flexDirection: 'column',
    alignItems: 'center',
    gap: 4,
    paddingVertical: 20,
    paddingHorizontal: 12,
    borderRadius: 8,
  },
  navItemActive: {
    backgroundColor: '#eff6ff',
  },
  navLabel: {
    fontSize: 12,
    fontWeight: '500',
    color: '#6b7280',
  },
  navLabelActive: {
    color: '#3b82f6',
  },
});

export default BottomNavigation;
