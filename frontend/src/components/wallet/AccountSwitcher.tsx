'use client';

import { useState } from 'react';
import { ChevronDown, LogOut, Copy, ExternalLink } from 'lucide-react';
import { useWallet } from '../../hooks/useWallet';
import { formatAddress } from '../../lib/display-utils';
import { getExplorerAddressUrl } from '../../lib/stellar-config';

interface AccountSwitcherProps {
  className?: string;
}

export function AccountSwitcher({ className = '' }: AccountSwitcherProps) {
  const { address, disconnect } = useWallet();
  const [open, setOpen] = useState(false);
  const [copied, setCopied] = useState(false);

  if (!address) return null;

  const handleCopy = async () => {
    await navigator.clipboard.writeText(address);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleDisconnect = () => {
    disconnect();
    setOpen(false);
  };

  return (
    <div className={`relative ${className}`}>
      <button
        onClick={() => setOpen(!open)}
        className="flex items-center gap-2 px-3 py-2 bg-white border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
      >
        <div className="w-6 h-6 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full" />
        <span className="text-sm font-medium text-gray-900">{formatAddress(address)}</span>
        <ChevronDown className={`w-4 h-4 text-gray-500 transition-transform ${open ? 'rotate-180' : ''}`} />
      </button>

      {open && (
        <div className="absolute right-0 top-full mt-1 w-56 bg-white border border-gray-200 rounded-lg shadow-lg z-50 py-1">
          <div className="px-3 py-2 border-b border-gray-100">
            <p className="text-xs text-gray-500">Connected Account</p>
            <p className="text-sm font-mono text-gray-900 truncate">{address}</p>
          </div>

          <button
            onClick={handleCopy}
            className="w-full flex items-center gap-2 px-3 py-2 text-sm text-gray-700 hover:bg-gray-50 transition-colors"
          >
            <Copy className="w-4 h-4" />
            {copied ? 'Copied!' : 'Copy Address'}
          </button>

          <a
            href={getExplorerAddressUrl(address)}
            target="_blank"
            rel="noopener noreferrer"
            className="w-full flex items-center gap-2 px-3 py-2 text-sm text-gray-700 hover:bg-gray-50 transition-colors"
            onClick={() => setOpen(false)}
          >
            <ExternalLink className="w-4 h-4" />
            View on Explorer
          </a>

          <div className="border-t border-gray-100 mt-1 pt-1">
            <button
              onClick={handleDisconnect}
              className="w-full flex items-center gap-2 px-3 py-2 text-sm text-red-600 hover:bg-red-50 transition-colors"
            >
              <LogOut className="w-4 h-4" />
              Disconnect
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
