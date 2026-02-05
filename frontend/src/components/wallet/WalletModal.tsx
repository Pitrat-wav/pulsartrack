'use client';

import { useState } from 'react';
import { Wallet, ExternalLink, AlertCircle } from 'lucide-react';
import { useWallet } from '../../hooks/useWallet';
import { formatAddress } from '../../lib/display-utils';

interface WalletConnectButtonProps {
  className?: string;
}

export function WalletConnectButton({ className = '' }: WalletConnectButtonProps) {
  const { connect, isConnected, address } = useWallet();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleConnect = async () => {
    setLoading(true);
    setError(null);
    const result = await connect();
    if (!result.success) {
      setError('Could not connect wallet. Please install Freighter and try again.');
    }
    setLoading(false);
  };

  if (isConnected && address) {
    return (
      <div className={`flex items-center gap-2 px-3 py-2 bg-green-50 border border-green-200 rounded-lg ${className}`}>
        <div className="w-2 h-2 bg-green-500 rounded-full" />
        <span className="text-sm font-medium text-green-800">
          {formatAddress(address)}
        </span>
      </div>
    );
  }

  return (
    <div className={className}>
      {error && (
        <div className="mb-2 flex items-center gap-1 text-xs text-red-600">
          <AlertCircle className="w-3 h-3" />
          <span>{error}</span>
        </div>
      )}
      <button
        onClick={handleConnect}
        disabled={loading}
        className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
      >
        <Wallet className="w-4 h-4" />
        {loading ? 'Connecting...' : 'Connect Freighter'}
      </button>
      <div className="mt-1 text-xs text-gray-500 flex items-center gap-1">
        <ExternalLink className="w-3 h-3" />
        <a
          href="https://www.freighter.app/"
          target="_blank"
          rel="noopener noreferrer"
          className="hover:text-blue-600"
        >
          Get Freighter wallet
        </a>
      </div>
    </div>
  );
}
