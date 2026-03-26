import React from 'react';
import { View, Text, Pressable, StyleSheet } from 'react-native';

export default function CoinCard({
  coin,
  isWatchlisted,
  onToggle,
  onPress,
}) {

  const price =
    coin.current_price ?? coin.price ?? 0;

  const change =
    coin.price_change_percentage_24h ??
    coin.change ??
    0;

  const isPositive = change >= 0;

  return (
    <Pressable
      style={({ pressed }) => [
        styles.card,
        pressed && styles.cardPressed,
      ]}
      onPress={onPress}
    >
      {/* LEFT */}
      <View style={styles.left}>
        <Text style={styles.name}>{coin.name}</Text>
        <Text style={styles.symbol}>
          {coin.symbol?.toUpperCase()}
        </Text>
      </View>

      {/* RIGHT */}
      <View style={styles.right}>
        <Text style={styles.price}>
          ${price.toLocaleString()}
        </Text>

        <Text
          style={[
            styles.change,
            isPositive ? styles.green : styles.red,
          ]}
        >
          {change.toFixed(2)}%
        </Text>
      </View>

      {/* STAR */}
      <Pressable
        onPress={() => onToggle(coin.id)}
        style={styles.starBtn}
      >
        <Text style={styles.star}>
          {isWatchlisted ? '⭐' : '☆'}
        </Text>
      </Pressable>

    </Pressable>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#1e1e2e',
    margin: 10,
    padding: 16,
    borderRadius: 14,
    flexDirection: 'row',
    alignItems: 'center',
  },

  cardPressed: {
    backgroundColor: '#2a2a3d',
  },

  left: {
    flex: 1,
  },

  right: {
    marginRight: 40,
    alignItems: 'flex-end',
  },

  name: {
    color: 'white',
    fontSize: 16,
  },

  symbol: {
    color: 'gray',
  },

  price: {
    color: 'white',
    fontSize: 15,
  },

  change: {
    fontSize: 12,
  },

  green: {
    color: 'lime',
  },

  red: {
    color: 'red',
  },

  starBtn: {
    position: 'absolute',
    right: 12,
    top: 18,
  },

  star: {
    fontSize: 20,
  },
});