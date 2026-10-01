# Dog Walk Safety — SP!ED 2025

A portfolio version of the **Dog Walk Safety** mobile UI developed during SP!ED 2025.

The original prototype was designed to combine environmental sensors, a Raspberry Pi, and a mobile application to help users judge whether pavement conditions are safe for walking a dog.

## Portfolio demo mode

This public version does **not** require the original hardware or Bluetooth connection.
Sensor readings are simulated in the app so the UI can be tested directly on the web:

- Air temperature: 20–35 °C
- Pavement temperature: air temperature + 0–10 °C
- Humidity: 40–70%
- Update interval: every 3 seconds

The UI classifies pavement conditions as **Safe**, **Caution**, or **Danger** and includes walk timing, history, settings, multilingual display, and safety information.

## Run locally

```bash
npm install
npm run web
```

Expo will start the web development server and print the local URL in the terminal.

## Static web build

```bash
npm run build:web
```

The exported web files are written to `dist/`.

## Type check

```bash
npm run typecheck
```

## Tech stack

- React Native
- Expo
- TypeScript
- React Navigation
- AsyncStorage
- React Native Web

## Notes

- Bluetooth code and hardware-specific dependencies are intentionally excluded from this portfolio version.
- Walk history and settings are stored locally with AsyncStorage and are not sent to a server.
- The simulated values are for demonstration purposes and are not measurements from real sensors.
- Notification switches persist preferences in the demo but do not trigger browser or operating-system notifications.
- Temperature thresholds are prototype heuristics for demonstrating the UI and should not be treated as veterinary or clinical guidance.
