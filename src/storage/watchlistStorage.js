// src/storage/watchlistStorage.js
// Helper functions to SAVE and LOAD the watchlist from AsyncStorage
//
// AsyncStorage works like a mini database on the user's device.
// It stores data as key-value pairs (like a dictionary).
// Data persists even after the app is closed.

import AsyncStorage from '@react-native-async-storage/async-storage';

// The key we use to store our watchlist in AsyncStorage
const WATCHLIST_KEY = 'user_watchlist';

// ─── SAVE ───────────────────────────────────────────────────────────────────
// Saves an array of coin IDs to storage
// Example: saveWatchlist(['1', '3', '6'])
export const saveWatchlist = async (watchlistIds) => {
  try {
    // AsyncStorage only stores strings, so we convert the array to JSON
    const jsonValue = JSON.stringify(watchlistIds);
    await AsyncStorage.setItem(WATCHLIST_KEY, jsonValue);
  } catch (error) {
    console.error('Error saving watchlist:', error);
  }
};

// ─── LOAD ────────────────────────────────────────────────────────────────────
// Loads the watchlist array from storage
// Returns an array of coin IDs, or an empty array if nothing is saved yet
export const loadWatchlist = async () => {
  try {
    const jsonValue = await AsyncStorage.getItem(WATCHLIST_KEY);

    // If nothing is stored yet, return an empty array
    if (jsonValue === null) return [];

    // Convert the JSON string back to an array
    return JSON.parse(jsonValue);
  } catch (error) {
    console.error('Error loading watchlist:', error);
    return []; // Return empty array on error so the app doesn't crash
  }
};

// ─── TOGGLE ──────────────────────────────────────────────────────────────────
// Adds a coin ID if it's NOT in the watchlist, removes it if it IS
// Returns the new updated watchlist array
export const toggleWatchlist = async (coinId, currentWatchlist) => {
  let updatedList;

  if (currentWatchlist.includes(coinId)) {
    // Coin is already in watchlist → remove it
    updatedList = currentWatchlist.filter((id) => id !== coinId);
  } else {
    // Coin is NOT in watchlist → add it
    updatedList = [...currentWatchlist, coinId];
  }

  // Persist the updated list to storage
  await saveWatchlist(updatedList);

  return updatedList;
};
