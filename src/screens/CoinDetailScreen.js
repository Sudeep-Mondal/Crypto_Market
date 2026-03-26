import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  StatusBar,
  Pressable,
  ScrollView,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { loadWatchlist, toggleWatchlist } from '../storage/watchlistStorage';

export default function CoinDetailScreen({ route, navigation }) {
  const { coinId } = route.params;

  const [coin, setCoin] = useState(null);
  const [watchlist, setWatchlist] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadWatchlist().then(setWatchlist);
    fetchCoin();

    // ✅ refresh every 30 sec (not 5 sec)
    const interval = setInterval(fetchCoin, 30000);

    return () => clearInterval(interval);
  }, []);

  const fetchCoin = async () => {
    try {
      const res = await fetch(
        `https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&ids=${coinId}`
      );

      const data = await res.json();

      if (Array.isArray(data) && data.length > 0) {
        setCoin(data[0]);
        setLoading(false);
      }

    } catch (e) {
      console.log("coin api error", e);
    }
  };

  if (loading || !coin) {
    return (
      <SafeAreaView style={styles.container}>
        <Text style={{ color: "white", textAlign: "center", marginTop: 50 }}>
          Loading coin...
        </Text>
      </SafeAreaView>
    );
  }

  const isWatchlisted = watchlist.includes(coinId);
  const isPositive = coin.price_change_percentage_24h >= 0;

  const handleToggle = async () => {
    const updated = await toggleWatchlist(coinId, watchlist);
    setWatchlist(updated);
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" />

      <Pressable style={styles.backBtn} onPress={() => navigation.goBack()}>
        <Text style={styles.backText}>← Back</Text>
      </Pressable>

      <ScrollView contentContainerStyle={styles.content}>
        {/* Header */}
        <View style={styles.header}>
          <View style={styles.iconCircle}>
            <Text style={styles.coinIcon}>
              {coin.symbol?.toUpperCase()}
            </Text>
          </View>

          <Text style={styles.coinName}>{coin.name}</Text>
          <Text style={styles.coinSymbol}>{coin.symbol}</Text>
        </View>

        {/* Price */}
        <View style={styles.card}>
          <Text style={styles.label}>Current Price</Text>

          <Text style={styles.price}>
            ${coin.current_price?.toLocaleString()}
          </Text>

          <Text
            style={[
              styles.change,
              isPositive ? styles.green : styles.red,
            ]}
          >
            {isPositive ? '▲' : '▼'}{' '}
            {Math.abs(
              coin.price_change_percentage_24h || 0
            ).toFixed(2)}
            %
          </Text>
        </View>

        {/* Stats */}
        <View style={styles.grid}>
          <View style={styles.statBox}>
            <Text style={styles.statLabel}>24h High</Text>
            <Text style={styles.statValue}>
              ${coin.high_24h?.toLocaleString()}
            </Text>
          </View>

          <View style={styles.statBox}>
            <Text style={styles.statLabel}>24h Low</Text>
            <Text style={styles.statValue}>
              ${coin.low_24h?.toLocaleString()}
            </Text>
          </View>

          <View style={styles.statBox}>
            <Text style={styles.statLabel}>Symbol</Text>
            <Text style={styles.statValue}>
              {coin.symbol}
            </Text>
          </View>

          <View style={styles.statBox}>
            <Text style={styles.statLabel}>Change</Text>
            <Text
              style={[
                styles.statValue,
                isPositive ? styles.green : styles.red,
              ]}
            >
              {coin.price_change_percentage_24h?.toFixed(2)}%
            </Text>
          </View>
        </View>

        {/* Watchlist */}
        <Pressable
          style={[
            styles.watchlistBtn,
            isWatchlisted && styles.watchlistBtnActive,
          ]}
          onPress={handleToggle}
        >
          <Text style={styles.watchlistBtnText}>
            {isWatchlisted
              ? '⭐ Remove from Watchlist'
              : '☆ Add to Watchlist'}
          </Text>
        </Pressable>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#0f0f1a' },

  backBtn: {
    paddingHorizontal: 20,
    paddingTop: 12,
    paddingBottom: 8,
  },

  backText: {
    color: '#00d4ff',
    fontSize: 16,
  },

  content: {
    paddingHorizontal: 20,
    paddingBottom: 40,
  },

  header: {
    alignItems: 'center',
    marginTop: 20,
    marginBottom: 30,
  },

  iconCircle: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: '#1e1e2e',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 2,
    borderColor: '#00d4ff44',
    marginBottom: 14,
  },

  coinIcon: {
    fontSize: 36,
    color: '#00d4ff',
  },

  coinName: {
    color: '#ffffff',
    fontSize: 28,
    fontWeight: '700',
  },

  coinSymbol: {
    color: '#666688',
    fontSize: 16,
    marginTop: 4,
  },

  card: {
    backgroundColor: '#1e1e2e',
    borderRadius: 16,
    padding: 24,
    alignItems: 'center',
    marginBottom: 16,
    borderWidth: 1,
    borderColor: '#2a2a3d',
  },

  label: {
    color: '#666688',
    fontSize: 13,
    marginBottom: 8,
  },

  price: {
    color: '#ffffff',
    fontSize: 36,
    fontWeight: '700',
    marginBottom: 8,
  },

  change: {
    fontSize: 16,
    fontWeight: '600',
  },

  green: { color: '#00e676' },
  red: { color: '#ff5252' },

  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
    marginBottom: 24,
  },

  statBox: {
    flex: 1,
    minWidth: '45%',
    backgroundColor: '#1e1e2e',
    borderRadius: 12,
    padding: 16,
    borderWidth: 1,
    borderColor: '#2a2a3d',
  },

  statLabel: {
    color: '#666688',
    fontSize: 12,
    marginBottom: 6,
  },

  statValue: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: '600',
  },

  watchlistBtn: {
    backgroundColor: '#1e1e2e',
    borderRadius: 14,
    padding: 18,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#00d4ff44',
  },

  watchlistBtnActive: {
    borderColor: '#ffd700',
    backgroundColor: '#1e1e10',
  },

  watchlistBtnText: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: '600',
  },
});