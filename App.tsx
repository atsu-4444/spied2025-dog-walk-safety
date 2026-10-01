import React, { useState, useEffect } from 'react';
import { View, StyleSheet, Platform } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { StatusBar } from 'expo-status-bar';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import {
  AppState,
  AppSettings,
  AppStateUpdate,
  WalkReport,
  RootStackParamList,
} from './src/appState';

import SplashScreen from './src/components/SplashScreen';
import TopBar from './src/components/TopBar';
import BottomNavigation from './src/components/BottomNavigation';

import MainDashboardScreen from './src/screens/MainDashboardScreen';
import DetailPage from './src/screens/DetailPage';
import HistoryPage from './src/screens/HistoryPage';
import SettingsPage from './src/screens/SettingsPage';
import InfoPage from './src/screens/InfoPage';

const Stack = createNativeStackNavigator<RootStackParamList>();

const initialWalkReports: WalkReport[] = [
  {
    id: '1',
    startTime: '2024-05-01T10:00:00Z',
    endTime: '2024-05-01T10:30:00Z',
    duration: 1800,
    safeTime: 1200,
    cautionTime: 600,
    dangerTime: 0,
    memo: '初めての散歩でした。',
  },
  {
    id: '2',
    startTime: '2024-05-02T16:00:00Z',
    endTime: '2024-05-02T16:25:00Z',
    duration: 1690,
    safeTime: 190,
    cautionTime: 1200,
    dangerTime: 300,
    memo: '少し暑かったので日陰で休憩。',
  },
];

const App = () => {
  const [appState, setAppState] = useState<AppState>({
    language: 'en',
    unit: 'C',
    dangerTempAlertEnabled: true,
    walkTimeAlertEnabled: true,
    currentPage: 'dashboard',
    asphaltTemp: 0,
    airTemp: 0,
    humidity: 0,
    lastUpdated: new Date(),
    isWalking: false,
    walkStartTime: null,
    walkDuration: 0,
    currentWalkData: {
      safeTime: 0,
      cautionTime: 0,
      dangerTime: 0,
    },
  });

  const [isInitialized, setIsInitialized] = useState(false);

  const updateAppState = (updates: AppStateUpdate) => {
    setAppState((prev) => ({
      ...prev,
      ...(typeof updates === 'function' ? updates(prev) : updates),
    }));
  };

  const toggleWalkState = async () => {
    if (!appState.isWalking) {
      updateAppState({
        isWalking: true,
        walkStartTime: new Date(),
        walkDuration: 0,
        currentWalkData: {
          safeTime: 0,
          cautionTime: 0,
          dangerTime: 0,
        },
      });
    } else {
      const newReport: WalkReport = {
        id: `walk-${Date.now()}`,
        startTime: appState.walkStartTime!.toISOString(),
        endTime: new Date().toISOString(),
        duration: appState.walkDuration,
        safeTime: appState.currentWalkData.safeTime,
        cautionTime: appState.currentWalkData.cautionTime,
        dangerTime: appState.currentWalkData.dangerTime,
        memo: '',
      };

      try {
        const storedReportsJSON =
          await AsyncStorage.getItem('walkReports');

        const storedReports: WalkReport[] =
          storedReportsJSON
            ? JSON.parse(storedReportsJSON)
            : [];

        const updatedReports = [
          newReport,
          ...storedReports,
        ];

        await AsyncStorage.setItem(
          'walkReports',
          JSON.stringify(updatedReports)
        );
      } catch (e) {
        console.error(
          'Failed to save walk report:',
          e
        );
      }

      updateAppState({
        isWalking: false,
        walkStartTime: null,
        walkDuration: 0,
        currentWalkData: {
          safeTime: 0,
          cautionTime: 0,
          dangerTime: 0,
        },
      });
    }
  };

  const loadInitialData = async () => {
    try {
      const savedSettingsJSON =
        await AsyncStorage.getItem('userSettings');

      if (savedSettingsJSON) {
        const savedSettings: AppSettings =
          JSON.parse(savedSettingsJSON);

        updateAppState(savedSettings);
      }

      const storedReportsJSON =
        await AsyncStorage.getItem('walkReports');

      if (!storedReportsJSON) {
        await AsyncStorage.setItem(
          'walkReports',
          JSON.stringify(initialWalkReports)
        );
      }

      await new Promise<void>((resolve) =>
        setTimeout(resolve, 1500)
      );

      setIsInitialized(true);
    } catch (e) {
      console.error(
        'Failed to load initial data:',
        e
      );

      setIsInitialized(true);
    }
  };

  useEffect(() => {
    loadInitialData();
  }, []);

  /*
   * Portfolio demo
   *
   * The original prototype was designed to use
   * sensor data from physical hardware.
   *
   * For the web portfolio version, sensor values
   * are simulated so that the UI can be experienced
   * without the Raspberry Pi and sensors.
   */
  useEffect(() => {
    if (!isInitialized) return;

    const updateSimulatedSensorData = () => {
      const newAirTemp = Number(
        (20 + Math.random() * 15).toFixed(1)
      );

      const newAsphaltTemp = Number(
        (newAirTemp + Math.random() * 10).toFixed(1)
      );

      const newHumidity = Number(
        (40 + Math.random() * 30).toFixed(1)
      );

      updateAppState({
        airTemp: newAirTemp,
        asphaltTemp: newAsphaltTemp,
        humidity: newHumidity,
        lastUpdated: new Date(),
      });
    };

    // Display simulated values immediately.
    updateSimulatedSensorData();

    // Update every 3 seconds.
    const dataSimulatorInterval =
      setInterval(
        updateSimulatedSensorData,
        3000
      );

    return () => {
      clearInterval(dataSimulatorInterval);
    };
  }, [isInitialized]);

  useEffect(() => {
    if (!isInitialized) return;

    const {
      language,
      unit,
      dangerTempAlertEnabled,
      walkTimeAlertEnabled,
    } = appState;

    const userSettings: AppSettings = {
      language,
      unit,
      dangerTempAlertEnabled,
      walkTimeAlertEnabled,
    };

    AsyncStorage.setItem(
      'userSettings',
      JSON.stringify(userSettings)
    ).catch((e) =>
      console.error(
        'Failed to save settings:',
        e
      )
    );
  }, [
    isInitialized,
    appState.language,
    appState.unit,
    appState.dangerTempAlertEnabled,
    appState.walkTimeAlertEnabled,
  ]);

  useEffect(() => {
    let timerInterval: NodeJS.Timeout | null = null;

    if (
      appState.isWalking &&
      appState.walkStartTime
    ) {
      timerInterval = setInterval(() => {
        updateAppState((prev) => {
          const currentTemp = prev.asphaltTemp;

          let {
            safeTime,
            cautionTime,
            dangerTime,
          } = prev.currentWalkData;

          const walkDuration =
            prev.walkDuration + 1;

          if (currentTemp <= 25) {
            safeTime += 1;
          } else if (currentTemp <= 35) {
            cautionTime += 1;
          } else {
            dangerTime += 1;
          }

          return {
            walkDuration,
            currentWalkData: {
              safeTime,
              cautionTime,
              dangerTime,
            },
          };
        });
      }, 1000);
    }

    return () => {
      if (timerInterval) {
        clearInterval(timerInterval);
      }
    };
  }, [
    appState.isWalking,
    appState.walkStartTime,
    appState.asphaltTemp,
  ]);

  if (!isInitialized) {
    return (
      <SplashScreen
        language={appState.language}
      />
    );
  }

  return (
    <View
      style={[
        styles.appBackground,
        Platform.OS === 'web' &&
          styles.webBackground,
      ]}
    >
      <View
        style={[
          styles.container,
          Platform.OS === 'web' &&
            styles.webContainer,
        ]}
      >
        <StatusBar style="auto" />

        <TopBar
          appState={appState}
          updateAppState={updateAppState}
        />

        <NavigationContainer>
          <Stack.Navigator
            screenOptions={{
              headerShown: false,
            }}
          >
            <Stack.Screen name="MainDashboard">
              {(props) => (
                <MainDashboardScreen
                  {...props}
                  appState={appState}
                  updateAppState={
                    updateAppState
                  }
                  toggleWalkState={
                    toggleWalkState
                  }
                />
              )}
            </Stack.Screen>

            <Stack.Screen name="Detail">
              {(props) => (
                <DetailPage
                  {...props}
                  appState={appState}
                />
              )}
            </Stack.Screen>

            <Stack.Screen name="History">
              {(props) => (
                <HistoryPage
                  {...props}
                  appState={appState}
                  updateAppState={
                    updateAppState
                  }
                />
              )}
            </Stack.Screen>

            <Stack.Screen name="Settings">
              {(props) => (
                <SettingsPage
                  {...props}
                  appState={appState}
                  updateAppState={
                    updateAppState
                  }
                />
              )}
            </Stack.Screen>

            <Stack.Screen name="Info">
              {(props) => (
                <InfoPage
                  {...props}
                  appState={appState}
                />
              )}
            </Stack.Screen>
          </Stack.Navigator>

          <BottomNavigation
            appState={appState}
            updateAppState={updateAppState}
          />
        </NavigationContainer>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  appBackground: {
    flex: 1,
  },

  container: {
    flex: 1,
    width: '100%',
    backgroundColor: '#fff',
    paddingTop: 40,
  },

  // Web only
  webBackground: {
    alignItems: 'center',
    backgroundColor: '#f3f4f6',
  },

  // Web only
  webContainer: {
    width: '100%',
    maxWidth: 430,
  },
});

export default App;