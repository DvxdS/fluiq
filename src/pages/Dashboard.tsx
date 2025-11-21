import { Link } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Navbar } from '@/components/layout/Navbar';
import { FileText, PenTool, Calendar, Handshake, Palette, BookOpen } from 'lucide-react';

const tools = [
  { href: '/pitch', icon: FileText, title: 'Creer un Pitch Deck', description: 'Genere un PDF professionnel', color: 'text-orange-500' },
  { href: '/captions', icon: PenTool, title: 'Generer des Captions', description: 'Captions adaptees a ta niche', color: 'text-violet-500' },
  { href: '/calendar', icon: Calendar, title: 'Calendrier Local', description: 'Evenements Afrique de l\'Ouest', color: 'text-cyan-500' },
  { href: '/deals', icon: Handshake, title: 'Tracker mes Deals', description: 'Suis tes collaborations', color: 'text-green-500' },
  { href: '/templates', icon: Palette, title: 'Templates Gratuits', description: 'Media kits, contrats, factures', color: 'text-pink-500' },
  { href: '#', icon: BookOpen, title: 'Ressources', description: 'Bientot disponible', color: 'text-gray-400' },
];

export const Dashboard = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <main className="max-w-6xl mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-2">Bienvenue sur Fluiq!</h1>
        <p className="text-gray-600 mb-8">Choisis un outil pour commencer</p>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {tools.map(tool => (
            <Link key={tool.href} to={tool.href} className={tool.href === '#' ? 'pointer-events-none opacity-60' : ''}>
              <Card className="h-full hover:shadow-lg transition-shadow cursor-pointer">
                <CardHeader>
                  <div className={`w-12 h-12 rounded-lg bg-gray-100 flex items-center justify-center mb-2 ${tool.color}`}>
                    <tool.icon className="h-6 w-6" />
                  </div>
                  <CardTitle className="text-lg">{tool.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-gray-600">{tool.description}</p>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>
      </main>
    </div>
  );
};
