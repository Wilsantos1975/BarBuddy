import React from 'react';
import { Link, useLocation } from 'react-router-dom';

function Sidebar() {
  const location = useLocation();
  
  const navItems = [
    { path: '/dashboard', label: 'Dashboard', icon: '🏠' },
    { path: '/batch-calculator', label: 'Batch Calculator', icon: '🧮' },
    { path: '/event-wizard', label: 'Event Wizard', icon: '✨' },
  ];

  return (
    <aside className="w-64 bg-[#1E1C1A] text-[#EBDFC7] min-h-screen flex flex-col">
      <div className="flex-1 p-6">
        <h2 className="text-3xl font-bold mb-8 text-[#C1AC9A]">
          BarBuddy
        </h2>
        <nav>
          <ul className="space-y-4">
            {navItems.map((item) => (
              <li key={item.path}>
                <Link
                  to={item.path}
                  className={`flex items-center space-x-3 px-4 py-3 rounded-lg transition-all duration-200 ${
                    location.pathname === item.path
                      ? 'bg-[#51657D] text-[#EBDFC7] shadow-md'
                      : 'hover:bg-[#51657D]/20 text-[#C1AC9A] hover:text-[#EBDFC7]'
                  }`}
                >
                  <span className="text-xl">{item.icon}</span>
                  <span className="font-medium">{item.label}</span>
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </aside>
  );
}

export default Sidebar;