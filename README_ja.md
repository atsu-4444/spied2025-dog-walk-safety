# Dog Walk Safety

[English](README.md) | **日本語**

<p>
  <img src="https://img.shields.io/badge/React_Native-20232A?style=for-the-badge&logo=react&logoColor=61DAFB" alt="React Native">
  <img src="https://img.shields.io/badge/TypeScript-3178C6?style=for-the-badge&logo=typescript&logoColor=white" alt="TypeScript">
  <img src="https://img.shields.io/badge/Expo-000020?style=for-the-badge&logo=expo&logoColor=white" alt="Expo">
  <img src="https://img.shields.io/badge/Raspberry_Pi-A22846?style=for-the-badge&logo=raspberrypi&logoColor=white" alt="Raspberry Pi">
  <img src="https://img.shields.io/badge/Vercel-000000?style=for-the-badge&logo=vercel&logoColor=white" alt="Vercel">
</p>

ペットの散歩時における高温の路面による肉球の火傷リスクを軽減するための、**IoTベースの散歩支援アプリケーション**です。

本プロジェクトは **[SP!ED 2025](https://ire-asia.org/ire/spied/index.php/spied2025/)** の国際チーム開発で制作しました。  
私は主に **モバイルアプリのフロントエンド開発**を担当しました。

本リポジトリでは、私が担当したフロントエンド部分をポートフォリオ用に公開しています。  
実際のセンサーやRaspberry Piがなくても体験できるよう、Webデモではセンサーデータをシミュレーションしています。

---

## 🌐 Live Demo

**[▶ Dog Walk Safetyを体験する](https://spied2025-dog-walk-safety.vercel.app/)**

PC・スマートフォンのWebブラウザから利用できます。

Webデモでは、路面温度・気温・湿度をシミュレーションし、実際のモバイルアプリと同様のUIを操作できます。

<p align="center">
  <img src="docs/images/app-screens.png" width="100%" alt="Dog Walk Safety app screens">
</p>

---

## 📖 プロジェクト概要

暑い日には、気温以上にアスファルトの表面温度が高くなることがあります。

人間にとって問題のない気温でも、高温になった路面をペットが歩くことで、肉球を火傷する危険があります。

そこで本プロジェクトでは、

- 路面温度
- 気温
- 湿度

などの環境情報をセンサーから取得し、ペットの散歩に適した環境かどうかをスマートフォンから確認できる **Dog Walk Safety** を開発しました。

アプリでは路面温度に応じて、

- **Safe**
- **Caution**
- **Danger**

の3段階で状態を表示し、飼い主が散歩を続けるか判断するための情報を提供します。

---

## 💡 解決したい課題

一般的な天気予報では気温を確認できますが、ペットが直接触れる**路面そのものの温度**までは分かりません。

特に夏場は、

```text
気温
  ↓
アスファルト表面がさらに高温になる
  ↓
ペットの肉球に火傷のリスク
```

という問題があります。

そこで、

```text
環境をセンシング
      ↓
データを処理
      ↓
スマートフォンに表示
      ↓
飼い主が散歩の安全性を判断
```

という仕組みを考えました。

---

## 🏗️ システム構成

SP!ED 2025で開発したオリジナルシステムは、ハードウェアとモバイルアプリを組み合わせた構成です。

<p align="center">
  <img src="docs/images/hardware-overview.png" width="520" alt="Hardware overview">
</p>

```text
IR Sensor
  └─ 路面温度を計測

Environment Sensor
  └─ 気温・湿度を計測

        ↓

Raspberry Pi
  └─ センサーデータを処理

        ↓
     Bluetooth
        ↓

Dog Walk Safety
Mobile App
```

### ポートフォリオ版

本GitHubリポジトリでは、ハードウェアを必要とせず誰でもアプリを体験できるようにしています。

```text
Simulated Sensor Data
        ↓
Dog Walk Safety
React Native / Expo
        ↓
Expo Web
        ↓
Web Browser
```

路面温度・気温・湿度はデモ用にシミュレーションされています。

---

## ✨ 主な機能

### 🏠 Home

現在の路面状況を確認するメイン画面です。

- 路面温度表示
- Safe / Caution / Danger 判定
- 散歩開始・終了
- 散歩時のアドバイス表示

### 📊 Detail

環境情報をより詳細に確認できます。

- 路面温度
- 気温
- 湿度
- 7秒テスト
- 路面温度に応じた安全情報

### 🕒 History

過去の散歩記録を確認できます。

記録される情報には、

- 散歩時間
- Safeだった時間
- Cautionだった時間
- Dangerだった時間
- メモ

などがあります。

Web版では、履歴はブラウザ内のローカルストレージに保存されます。  
データは外部サーバーへ送信されません。

### ⚙️ Settings

アプリの表示設定を変更できます。

- 言語
- 摂氏 / 華氏
- 温度アラート設定
- 継続的な高温に関する設定

### ℹ️ Info

ペットを安全に散歩させるための情報を確認できます。

- 散歩時の安全ガイド
- 路面温度の目安
- 7秒テスト
- 熱中症の兆候
- 緊急時の対応

---

## 🌏 多言語対応

国際チームでの開発という背景から、アプリは4言語に対応しています。

- 🇺🇸 English
- 🇯🇵 日本語
- 🇰🇷 한국어
- 🇨🇳 中文

Settings画面から切り替えることができます。

---

## 🎬 Demonstration

実際の利用シーンを想定したデモです。

<p align="center">
  <img src="docs/images/demonstration.gif" width="520" alt="Dog Walk Safety demonstration">
</p>

---

## 🛠️ 使用技術

### Frontend

- React Native
- TypeScript
- Expo
- Expo Web
- React Navigation

### Data Storage

- AsyncStorage

### Original Prototype

- Raspberry Pi
- IR Sensor
- Environment Sensor
- Bluetooth

### Deployment

- Vercel
- GitHub

---

## 👨‍💻 担当範囲

私は主に**フロントエンド開発**を担当しました。

特に、

- モバイルアプリUIの実装
- 各画面の開発
- 画面遷移
- 状態に応じた表示
- 多言語UI
- React / React Nativeを用いたアプリ開発

に取り組みました。

チーム全体では、センサー、Raspberry Pi、モバイルアプリを組み合わせてDog Walk Safetyのプロトタイプを開発しました。

---

## 🚧 開発時に直面した課題

### ReactからReact Nativeへの移行

開発初期にはReactを使用していましたが、モバイルアプリとして実装するためReact Nativeへ移行しました。

その際、

- ReactとReact NativeにおけるNavigationの違い
- モバイル環境特有のUI実装
- 開発環境の違い

などに対応する必要がありました。

### iOS開発環境

Mac上でXcodeを利用した開発も試みましたが、iPhone Simulatorが正常に表示されない問題にも直面しました。

限られた開発期間の中で、チームメンバーと協力しながら実装・検証を進めました。

---

## 🌐 Web Portfolio Version

オリジナルのプロジェクトでは、実際のセンサーとRaspberry Piから取得した情報をモバイルアプリで利用することを想定していました。

しかし、本ポートフォリオでは実機を必要とせず誰でもアプリを体験できることを重視し、**センサーデータをシミュレーションするWeb版**として公開しています。

現在、デモでは以下の値を一定間隔で生成しています。

```text
Air Temperature
Surface Temperature
Humidity
```

これにより、

```text
Safe
  ↓
Caution
  ↓
Danger
```

と状態が変化する様子をブラウザ上で体験できます。

---

## 🚀 ローカルで実行する

### 1. RepositoryをClone

```bash
git clone https://github.com/atsu-4444/spied2025-dog-walk-safety.git
cd spied2025-dog-walk-safety
```

### 2. Dependenciesをインストール

```bash
npm install
```

### 3. Web版を起動

```bash
npm run web
```

ブラウザから以下にアクセスします。

```text
http://localhost:8081
```

---

## 🏗️ Web Build

静的Webアプリとしてビルドする場合：

```bash
npm run build:web
```

ビルド結果は `dist/` に生成されます。

---

## 📁 Directory Structure

```text
spied2025-dog-walk-safety/
├── assets/
├── public/
├── src/
│   ├── components/
│   ├── screens/
│   ├── translations/
│   ├── lib/
│   └── appState.ts
│
├── docs/
│   └── images/
│       ├── app-screens.png
│       ├── hardware-overview.png
│       └── demonstration.gif
│
├── App.tsx
├── index.ts
├── app.json
├── package.json
├── package-lock.json
├── tsconfig.json
├── vercel.json
├── README.md
├── README_ja.md
└── LICENSE
```

---

## 🎓 SP!ED 2025

本プロジェクトは **[SP!ED 2025](https://ire-asia.org/ire/spied/index.php/spied2025/)** における国際チームでのプロジェクトとして開発しました。

異なる国・言語・技術背景を持つ学生と協力しながら、日常生活に存在する課題をテクノロジーによって解決することを目指しました。

Dog Walk Safetyでは、

**「暑い日のペットの散歩をより安全にする」**

という課題に対して、IoTとモバイルアプリを組み合わせたプロトタイプを提案・開発しました。

---

## ⚠️ Disclaimer

本アプリは教育・デモを目的としたプロトタイプです。

Web版で表示される温度・湿度は、実際のセンサー計測値ではなくシミュレーションされたデータです。

また、本アプリで表示される安全情報は、獣医学的な診断や専門家の助言を代替するものではありません。

ペットの健康に異常がある場合は、獣医師などの専門家へ相談してください。

---

## 📄 License

This project is licensed under the terms of the [LICENSE](LICENSE) file.
