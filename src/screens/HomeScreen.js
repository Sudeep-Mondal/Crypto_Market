import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, StyleSheet, StatusBar } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import SearchBar from '../components/SearchBar';
import CoinCard from '../components/CoinCard';
import { loadWatchlist, toggleWatchlist } from '../storage/watchlistStorage';

export default function HomeScreen({ navigation }) {
  const [searchText, setSearchText] = useState('');
  const [watchlist, setWatchlist] = useState([]);
  const [coins, setCoins] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadWatchlist().then(setWatchlist);
    fetchCoins();

    // ✅ refresh every 30 sec (not 5 sec)
    const interval = setInterval(fetchCoins, 30000);

    return () => clearInterval(interval);
  }, []);

  const fetchCoins = async () => {
    try {
      const res = await fetch(
        'https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=50&page=1&sparkline=false'
      );

      const data = await res.json();

      if (Array.isArray(data) && data.length > 0) {
        setCoins(data);
        setLoading(false);
      }

    } catch (e) {
      console.log("API error", e);
    }
  };

  const filteredCoins = (coins || []).filter(
    (coin) =>
      coin.name?.toLowerCase().includes(searchText.toLowerCase()) ||
      coin.symbol?.toLowerCase().includes(searchText.toLowerCase())
  );

  const handleToggle = async (coinId) => {
    const updated = await toggleWatchlist(coinId, watchlist);
    setWatchlist(updated);
  };

  // ✅ show loading instead of empty crash
  if (loading) {
    return (
      <SafeAreaView style={styles.container}>
        <Text style={{ color: 'white', textAlign: 'center', marginTop: 50 }}>
          Loading market...
        </Text>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" />

      <View style={styles.header}>
        <Text style={styles.title}>Crypto Market</Text>
        <Text style={styles.subtitle}>
          {(coins || []).length} coins
        </Text>
      </View>

      <SearchBar value={searchText} onChange={setSearchText} />

      <FlatList
        data={filteredCoins}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <CoinCard
            coin={item}
            isWatchlisted={watchlist.includes(item.id)}
            onToggle={handleToggle}
            onPress={() =>
              navigation.navigate('CoinDetail', {
                coinId: item.id,
              })
            }
          />
        )}

        initialNumToRender={10}
        maxToRenderPerBatch={10}
        windowSize={5}

        ListEmptyComponent={
          <View style={styles.emptyContainer}>
            <Text style={styles.emptyText}>
              No coins found for "{searchText}"
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

  title: {
    color: '#ffffff',
    fontSize: 26,
    fontWeight: '700',
  },

  subtitle: {
    color: '#666688',
    fontSize: 13,
  },

  emptyContainer: {
    alignItems: 'center',
    marginTop: 60,
  },

  emptyText: {
    color: '#666688',
    fontSize: 15,
  },
});