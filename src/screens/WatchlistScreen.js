import React, { useState, useCallback, useEffect } from 'react';
import { View, Text, FlatList, StyleSheet, StatusBar } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useFocusEffect } from '@react-navigation/native';

import CoinCard from '../components/CoinCard';
import { loadWatchlist, toggleWatchlist } from '../storage/watchlistStorage';

export default function WatchlistScreen({ navigation }) {
  const [watchlist, setWatchlist] = useState([]);
  const [coins, setCoins] = useState([]);
  const [loading, setLoading] = useState(true);

  useFocusEffect(
    useCallback(() => {
      loadWatchlist().then((ids) => {
        setWatchlist(ids);
        fetchCoins(ids);
      });
    }, [])
  );

  // ✅ refresh every 30 sec (not 5 sec)
  useEffect(() => {
    const interval = setInterval(() => {
      if (watchlist.length > 0) {
        fetchCoins(watchlist);
      }
    }, 30000);

    return () => clearInterval(interval);
  }, [watchlist]);

  const fetchCoins = async (ids) => {
    if (!ids || ids.length === 0) {
      setCoins([]);
      setLoading(false);
      return;
    }

    try {
      const idString = ids.join(',');

      const res = await fetch(
        `https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&ids=${idString}`
      );

      const data = await res.json();

      if (Array.isArray(data)) {
        setCoins(data);
        setLoading(false);
      }

    } catch (e) {
      console.log("watchlist api error", e);
    }
  };

  const handleToggle = async (coinId) => {
    const updated = await toggleWatchlist(coinId, watchlist);
    setWatchlist(updated);
    fetchCoins(updated);
  };

  if (loading) {
    return (
      <SafeAreaView style={styles.container}>
        <Text style={{ color: "white", textAlign: "center", marginTop: 50 }}>
          Loading watchlist...
        </Text>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" />

      <View style={styles.header}>
        <Text style={styles.title}>My Watchlist</Text>
        <Text style={styles.subtitle}>{coins.length} coins</Text>
      </View>

      <FlatList
        data={coins}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <CoinCard
            coin={item}
            isWatchlisted={true}
            onToggle={handleToggle}
            onPress={() =>
              navigation.navigate('CoinDetail', { coinId: item.id })
            }
          />
        )}
        initialNumToRender={10}
        maxToRenderPerBatch={10}
        windowSize={5}
        ListEmptyComponent={
          <View style={styles.emptyContainer}>
            <Text style={styles.emptyIcon}>⭐</Text>
            <Text style={styles.emptyTitle}>No coins yet</Text>
            <Text style={styles.emptySubtitle}>
              Go to Market and tap ☆ to add coins here
            </Text>
          </View>
        }
        contentContainerStyle={{ paddingBottom: 20 }}
        showsVerticalScrollIndicator={false}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#0f0f1a' },

  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-end',
    paddingHorizontal: 20,
    paddingTop: 12,
    paddingBottom: 4,
  },

  title: { color: '#ffffff', fontSize: 26, fontWeight: '700' },

  subtitle: { color: '#666688', fontSize: 13 },

  emptyContainer: {
    alignItems: 'center',
    marginTop: 80,
    paddingHorizontal: 40,
  },

  emptyIcon: { fontSize: 48, marginBottom: 16 },

  emptyTitle: {
    color: '#ffffff',
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 8,
  },

  emptySubtitle: {
    color: '#666688',
    fontSize: 14,
    textAlign: 'center',
    lineHeight: 20,
  },
});