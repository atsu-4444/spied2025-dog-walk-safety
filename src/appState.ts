import type { Dispatch, SetStateAction } from 'react';

export type Language = "ko" | "en" | "ja" | "zh"
export type Page = "dashboard" | "detail" | "history" | "settings" | "info"
export type Unit = "C" | "F"

export type RootStackParamList = {
  MainDashboard: undefined;
  Detail: undefined;
  History: undefined;
  Settings: undefined;
  Info: undefined;
};

export interface WalkReport {
  id: string; 
  startTime: string; 
  endTime: string;   
  duration: number; 
  safeTime: number;
  cautionTime: number;
  dangerTime: number;
  memo: string;
}

export interface AppSettings {
  language: Language
  unit: Unit
  dangerTempAlertEnabled: boolean
  walkTimeAlertEnabled: boolean
}

export interface AppState extends AppSettings {
  currentPage: Page
  asphaltTemp: number
  airTemp: number
  humidity: number
  lastUpdated: Date
  isWalking: boolean 
  walkStartTime: Date | null
  walkDuration: number
  currentWalkData: {
    safeTime: number;
    cautionTime: number;
    dangerTime: number;
  }
}

export type AppStateUpdate = Partial<AppState> | ((prevState: AppState) => Partial<AppState>)

export interface AppContextProps {
  appState: AppState;
  updateAppState: (updates: AppStateUpdate) => void;
}
