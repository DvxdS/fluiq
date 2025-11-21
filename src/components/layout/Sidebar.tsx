import { Link, useLocation } from 'react-router-dom';
import { FileText, PenTool, Calendar, Handshake, Palette, BookOpen, LayoutDashboard } from 'lucide-react';
import { cn } from '@/lib/utils';

const sidebarLinks = [
  { href: '/dashboard', label: 'Dashboard', icon: LayoutDashboard },
  { href: '/pitch', label: 'Pitch Deck', icon: FileText },
  { href: '/captions', label: 'Captions', icon: PenTool },
  { href: '/calendar', label: 'Calendrier', icon: Calendar },
  { href: '/deals', label: 'Deals', icon: Handshake },
  { href: '/templates', label: 'Templates', icon: Palette },
];

export const Sidebar = () => {
  const location = useLocation();

  return (
    <aside className="hidden lg:flex flex-col w-64 border-r bg-white min-h-screen p-4">
      <div className="text-2xl font-bold bg-gradient-to-r from-orange-500 to-violet-500 bg-clip-text text-transparent mb-8">
        Fluiq
      </div>
      <nav className="flex flex-col gap-1">
        {sidebarLinks.map(link => {
          const Icon = link.icon;
          const isActive = location.pathname === link.href;
          return (
            <Link
              key={link.href}
              to={link.href}
              className={cn(
                'flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium transition-colors',
                isActive
                  ? 'bg-orange-50 text-orange-600'
                  : 'text-gray-600 hover:bg-gray-100'
              )}
            >
              <Icon className="h-5 w-5" />
              {link.label}
            </Link>
          );
        })}
      </nav>
    </aside>
  );
};
