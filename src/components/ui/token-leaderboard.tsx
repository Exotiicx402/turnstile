import { useState, useEffect } from 'react';
import { useWallet } from '@solana/wallet-adapter-react';
import { WalletMultiButton } from '@solana/wallet-adapter-react-ui';
import { Connection, PublicKey } from '@solana/web3.js';
import { Trophy, TrendingUp, Award } from 'lucide-react';

interface HolderData {
  wallet: string;
  balance: number;
  tier: string;
  discount: string;
  rank: number;
}

const TSTL_TOKEN_ADDRESS = '8BdvBpxDbKQFCz8kpo4yaaG2mNr5XeQnYmjjfwKQpump';

export default function TokenLeaderboard() {
  const { publicKey } = useWallet();
  const [holders, setHolders] = useState<HolderData[]>([]);
  const [userPosition, setUserPosition] = useState<HolderData | null>(null);
  const [loading, setLoading] = useState(true);

  const getTier = (balance: number) => {
    if (balance >= 1000000) return { name: 'Platinum', discount: '75%', color: 'text-cyan-400' };
    if (balance >= 100000) return { name: 'Gold', discount: '50%', color: 'text-yellow-400' };
    if (balance >= 10000) return { name: 'Silver', discount: '25%', color: 'text-gray-300' };
    if (balance >= 1000) return { name: 'Bronze', discount: '10%', color: 'text-orange-600' };
    return { name: 'None', discount: '0%', color: 'text-gray-500' };
  };

  const getNextTier = (balance: number) => {
    if (balance < 1000) return { needed: 1000 - balance, tierName: 'Bronze' };
    if (balance < 10000) return { needed: 10000 - balance, tierName: 'Silver' };
    if (balance < 100000) return { needed: 100000 - balance, tierName: 'Gold' };
    if (balance < 1000000) return { needed: 1000000 - balance, tierName: 'Platinum' };
    return null;
  };

  useEffect(() => {
    fetchHolders();
  }, [publicKey]);

  const fetchHolders = async () => {
    setLoading(true);
    try {
      // Mock data for now - in production, you'd fetch from Solana RPC
      // This would query all token accounts for the TSTL mint
      const mockHolders: HolderData[] = [
        { wallet: 'Exo7...3k2m', balance: 2450000, tier: 'Platinum', discount: '75%', rank: 1 },
        { wallet: '8Bdv...pump', balance: 1200000, tier: 'Platinum', discount: '75%', rank: 2 },
        { wallet: 'CiF5...sjtR', balance: 850000, tier: 'Gold', discount: '50%', rank: 3 },
        { wallet: 'Ab3t...9kLm', balance: 500000, tier: 'Gold', discount: '50%', rank: 4 },
        { wallet: 'Qw8r...4nPo', balance: 250000, tier: 'Gold', discount: '50%', rank: 5 },
        { wallet: 'Ty5u...7vBn', balance: 150000, tier: 'Gold', discount: '50%', rank: 6 },
        { wallet: 'Gh9i...2mNb', balance: 75000, tier: 'Silver', discount: '25%', rank: 7 },
        { wallet: 'Jk4l...6cVx', balance: 50000, tier: 'Silver', discount: '25%', rank: 8 },
        { wallet: 'Po8i...1qWe', balance: 35000, tier: 'Silver', discount: '25%', rank: 9 },
        { wallet: 'Zx3c...5rTy', balance: 25000, tier: 'Silver', discount: '25%', rank: 10 },
      ];

      setHolders(mockHolders);

      // If wallet connected, find user position
      if (publicKey) {
        const userWallet = publicKey.toBase58();
        const shortWallet = `${userWallet.slice(0, 4)}...${userWallet.slice(-4)}`;
        
        // Check if user is in top 10
        const existingHolder = mockHolders.find(h => h.wallet === shortWallet);
        
        if (existingHolder) {
          setUserPosition(existingHolder);
        } else {
          // Mock user position if not in top 10
          const tier = getTier(15000);
          setUserPosition({
            wallet: shortWallet,
            balance: 15000,
            tier: tier.name,
            discount: tier.discount,
            rank: 23
          });
        }
      }
    } catch (error) {
      console.error('Error fetching holders:', error);
    } finally {
      setLoading(false);
    }
  };

  const formatNumber = (num: number) => {
    return new Intl.NumberFormat('en-US').format(num);
  };

  return (
    <section className="min-h-screen bg-gradient-to-br from-[#1a1d18] via-black to-[#2a2e26] py-24 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="flex items-center justify-center gap-3 mb-4">
            <Trophy className="w-12 h-12 text-[#c8b4a0]" />
            <h1 className="text-5xl md:text-6xl font-extralight text-[#f8f7f5]">
              Top Holders
            </h1>
          </div>
          <p className="text-xl text-[#c8b4a0] font-light mb-8">
            The biggest believers in the x402 marketplace
          </p>
          
          {/* Wallet Connect Button */}
          <div className="flex justify-center mb-8">
            <WalletMultiButton className="!bg-[#c8b4a0] !text-[#1a1d18] hover:!bg-[#f8f7f5] !font-semibold !rounded-lg !px-8 !py-4 !transition-all !duration-300" />
          </div>
        </div>

        {/* User Position Card */}
        {publicKey && userPosition && (
          <div className="bg-[#2a2e26]/50 border border-[#c8b4a0] rounded-2xl p-6 mb-8 backdrop-blur-sm">
            <div className="flex items-center justify-between flex-wrap gap-4">
              <div>
                <p className="text-[#c8b4a0]/70 text-sm mb-1">Your Position</p>
                <p className="text-[#f8f7f5] text-3xl font-bold">#{userPosition.rank}</p>
              </div>
              <div>
                <p className="text-[#c8b4a0]/70 text-sm mb-1">Your Holdings</p>
                <p className="text-[#f8f7f5] text-3xl font-bold">{formatNumber(userPosition.balance)} TSTL</p>
              </div>
              <div>
                <p className="text-[#c8b4a0]/70 text-sm mb-1">Your Tier</p>
                <div className="flex items-center gap-2">
                  <Award className={`w-6 h-6 ${getTier(userPosition.balance).color}`} />
                  <p className={`text-2xl font-bold ${getTier(userPosition.balance).color}`}>
                    {userPosition.tier}
                  </p>
                </div>
              </div>
              <div>
                <p className="text-[#c8b4a0]/70 text-sm mb-1">Fee Discount</p>
                <p className="text-[#f8f7f5] text-3xl font-bold">{userPosition.discount}</p>
              </div>
            </div>
            
            {/* Progress to Next Tier */}
            {getNextTier(userPosition.balance) && (
              <div className="mt-6 pt-6 border-t border-[#3c4237]">
                <div className="flex items-center justify-between mb-2">
                  <p className="text-[#c8b4a0] text-sm">Next Tier: {getNextTier(userPosition.balance)?.tierName}</p>
                  <p className="text-[#f8f7f5] text-sm font-semibold">
                    {formatNumber(getNextTier(userPosition.balance)?.needed || 0)} TSTL needed
                  </p>
                </div>
                <div className="w-full bg-[#1a1d18] rounded-full h-3">
                  <div 
                    className="bg-gradient-to-r from-[#c8b4a0] to-[#f8f7f5] h-3 rounded-full transition-all duration-500"
                    style={{ 
                      width: `${Math.min(100, (userPosition.balance / (userPosition.balance + (getNextTier(userPosition.balance)?.needed || 1))) * 100)}%` 
                    }}
                  />
                </div>
              </div>
            )}
          </div>
        )}

        {/* Leaderboard Table */}
        <div className="bg-[#1a1d18]/50 rounded-2xl overflow-hidden border border-[#3c4237]">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-[#2a2e26]">
                <tr>
                  <th className="px-6 py-4 text-left text-[#c8b4a0] font-semibold">Rank</th>
                  <th className="px-6 py-4 text-left text-[#c8b4a0] font-semibold">Wallet</th>
                  <th className="px-6 py-4 text-right text-[#c8b4a0] font-semibold">TSTL Holdings</th>
                  <th className="px-6 py-4 text-center text-[#c8b4a0] font-semibold">Tier</th>
                  <th className="px-6 py-4 text-center text-[#c8b4a0] font-semibold">Fee Discount</th>
                  <th className="px-6 py-4 text-right text-[#c8b4a0] font-semibold">Est. Monthly Savings*</th>
                </tr>
              </thead>
              <tbody>
                {loading ? (
                  <tr>
                    <td colSpan={6} className="px-6 py-12 text-center text-[#c8b4a0]">
                      Loading holders...
                    </td>
                  </tr>
                ) : (
                  holders.map((holder, index) => {
                    const tierInfo = getTier(holder.balance);
                    const isUser = publicKey && holder.wallet === `${publicKey.toBase58().slice(0, 4)}...${publicKey.toBase58().slice(-4)}`;
                    
                    return (
                      <tr 
                        key={holder.wallet}
                        className={`border-t border-[#3c4237] hover:bg-[#2a2e26]/30 transition-colors ${isUser ? 'bg-[#c8b4a0]/10' : ''}`}
                      >
                        <td className="px-6 py-4">
                          <div className="flex items-center gap-2">
                            {index === 0 && <Trophy className="w-5 h-5 text-yellow-400" />}
                            {index === 1 && <Trophy className="w-5 h-5 text-gray-300" />}
                            {index === 2 && <Trophy className="w-5 h-5 text-orange-600" />}
                            <span className="text-[#f8f7f5] font-semibold">#{holder.rank}</span>
                          </div>
                        </td>
                        <td className="px-6 py-4">
                          <span className="text-[#f8f7f5] font-mono">
                            {holder.wallet}
                            {isUser && <span className="ml-2 text-[#c8b4a0] text-sm">(You)</span>}
                          </span>
                        </td>
                        <td className="px-6 py-4 text-right">
                          <span className="text-[#f8f7f5] font-semibold">{formatNumber(holder.balance)}</span>
                        </td>
                        <td className="px-6 py-4 text-center">
                          <div className="flex items-center justify-center gap-2">
                            <Award className={`w-5 h-5 ${tierInfo.color}`} />
                            <span className={`font-semibold ${tierInfo.color}`}>{holder.tier}</span>
                          </div>
                        </td>
                        <td className="px-6 py-4 text-center">
                          <span className="text-[#f8f7f5] font-semibold">{holder.discount}</span>
                        </td>
                        <td className="px-6 py-4 text-right">
                          <div className="flex items-center justify-end gap-1">
                            <TrendingUp className="w-4 h-4 text-emerald-400" />
                            <span className="text-emerald-400 font-semibold">
                              ${((10000 * 0.01 * 0.025) * (parseFloat(holder.discount) / 100)).toFixed(2)}
                            </span>
                          </div>
                        </td>
                      </tr>
                    );
                  })
                )}
              </tbody>
            </table>
          </div>
          
          {/* Footer Note */}
          <div className="px-6 py-4 bg-[#2a2e26]/50 border-t border-[#3c4237]">
            <p className="text-[#c8b4a0]/70 text-sm">
              *Estimated savings based on 10,000 API calls per month at $0.01 per call with 2.5% base marketplace fee
            </p>
          </div>
        </div>

        {/* Tier Breakdown */}
        <div className="mt-12 grid grid-cols-1 md:grid-cols-4 gap-6">
          {[
            { name: 'Bronze', min: '1,000', discount: '10%', color: 'text-orange-600' },
            { name: 'Silver', min: '10,000', discount: '25%', color: 'text-gray-300' },
            { name: 'Gold', min: '100,000', discount: '50%', color: 'text-yellow-400' },
            { name: 'Platinum', min: '1,000,000', discount: '75%', color: 'text-cyan-400' },
          ].map((tier) => (
            <div key={tier.name} className="bg-[#2a2e26]/30 border border-[#3c4237] rounded-xl p-6 text-center">
              <Award className={`w-8 h-8 ${tier.color} mx-auto mb-3`} />
              <h3 className={`text-xl font-bold ${tier.color} mb-2`}>{tier.name}</h3>
              <p className="text-[#c8b4a0]/70 text-sm mb-1">{tier.min}+ TSTL</p>
              <p className="text-[#f8f7f5] text-2xl font-bold">{tier.discount} off</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
