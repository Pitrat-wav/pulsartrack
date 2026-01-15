'use client';

import { useCallback } from 'react';
import { useWalletStore } from '../store/wallet-store';
import { connectWallet, isWalletConnected, getWalletAddress } from '../lib/wallet';
import { parseStellarError } from '../lib/error-handler';

export function useWallet() {
  const {
    address,
    isConnected,
    network,
    setAddress,
    setConnected,
    disconnect: storeDisconnect,
  } = useWalletStore();

  const connect = useCallback(async () => {
    try {
      const addr = await connectWallet();
      setAddress(addr);
      setConnected(true);
      return { success: true, address: addr };
    } catch (err) {
      const parsed = parseStellarError(err);
      console.error('Wallet connect error:', parsed);
      return { success: false, error: parsed };
    }
  }, [setAddress, setConnected]);

  const disconnect = useCallback(() => {
    // Freighter doesn't have a programmatic disconnect
    // Clear local state only
    storeDisconnect();
  }, [storeDisconnect]);

  const checkConnection = useCallback(async () => {
    const connected = await isWalletConnected();
    if (connected) {
      const addr = await getWalletAddress();
      if (addr) {
        setAddress(addr);
        setConnected(true);
        return;
      }
    }
    storeDisconnect();
  }, [setAddress, setConnected, storeDisconnect]);

  return {
    address,
    isConnected,
    network,
    connect,
    disconnect,
    checkConnection,
  };
}
