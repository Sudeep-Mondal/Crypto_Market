# 📱 CryptoApp — Beginner React Native Project

A simple crypto market tracker with a search bar and persistent watchlist.

---

## 🗂️ Project Structure

```
CryptoApp/
├── App.js                        ← Entry point, sets up navigation
├── package.json                  ← Dependencies list
└── src/
    ├── data/
    │   └── coins.js              ← Static list of 10 coins
    ├── storage/
    │   └── watchlistStorage.js   ← AsyncStorage read/write helpers
    ├── components/
    │   ├── SearchBar.js          ← Reusable search input component
    │   └── CoinCard.js           ← Single coin row with star button
    └── screens/
        ├── HomeScreen.js         ← All coins + search bar
        └── WatchlistScreen.js    ← Only starred coins
```

---

## ⚙️ Setup & Installation

### 1. Install Node.js
Download from https://nodejs.org (LTS version)

### 2. Install Expo CLI
```bash
npm install -g expo-cli
```

### 3. Install dependencies
```bash
cd CryptoApp
npm install
```

### 4. Start the app
```bash
npx expo start
```

Then scan the QR code with the **Expo Go** app on your phone
(available on iOS App Store and Google Play Store).

---

## 🔑 Key Concepts Used

| Concept | Where Used | What it does |
|---|---|---|
| `useState` | All screens | Stores data that can change (search text, watchlist) |
| `useEffect` | HomeScreen | Loads watchlist when screen first opens |
| `useFocusEffect` | WatchlistScreen | Reloads when the tab is switched to |
| `AsyncStorage` | watchlistStorage.js | Saves data to device — persists after app closes |
| `FlatList` | Both screens | Efficiently renders long lists |
| `filter()` | HomeScreen | Narrows the coins array based on search text |
| Bottom Tab Nav | App.js | Switch between Market and Watchlist screens |

---

## 🚀 How the Watchlist Works

1. When you tap ⭐ on a coin, `toggleWatchlist()` is called
2. It checks if the coin ID is already in the array
3. If YES → removes it. If NO → adds it
4. The updated array is saved to AsyncStorage with `JSON.stringify()`
5. Next time the app opens, `loadWatchlist()` reads it back with `JSON.parse()`

## 🔍 How Search Works

1. `searchText` state updates on every keystroke via `onChangeText`
2. `COINS.filter(...)` runs on every render
3. It checks if `coin.name.toLowerCase()` includes the search text
4. The filtered array is passed to `FlatList` as `data`
