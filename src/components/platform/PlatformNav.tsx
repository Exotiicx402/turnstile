import { useLocation, Link } from 'react-router-dom';

const tabs = [
  { label: 'Overview', href: '/v1' },
  { label: 'Browse', href: '/v1/browse' },
  { label: 'Transactions', href: '/v1/transactions' },
];

export default function PlatformNav() {
  const location = useLocation();

  return (
    <nav className="border-b border-[#3c4237] bg-[#1a1d18]/80 backdrop-blur-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center gap-3">
            <img 
              src="https://res.cloudinary.com/dbdzl9lt6/image/upload/v1761631594/solana-sol-logo_xyph2m.png" 
              alt="Solana Logo" 
              className="w-8 h-8 object-contain"
            />
            <Link to="/v1" className="text-2xl font-extralight text-[#f8f7f5] hover:text-[#c8b4a0] transition-colors">
              Turnstile
            </Link>
          </div>

          <div className="flex gap-1">
            {tabs.map(tab => {
              const isActive = location.pathname === tab.href;
              return (
                <Link
                  key={tab.href}
                  to={tab.href}
                  className={`px-4 py-2 rounded-lg font-light transition-all ${
                    isActive
                      ? 'bg-[#c8b4a0] text-[#1a1d18] font-normal'
                      : 'text-[#c8b4a0] hover:bg-[#2a2e26]'
                  }`}
                >
                  {tab.label}
                </Link>
              );
            })}
          </div>
        </div>
      </div>
    </nav>
  );
}
