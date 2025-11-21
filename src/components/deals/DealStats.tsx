import { Deal } from '@/types';
import { Card, CardContent } from '@/components/ui/card';
import { Briefcase, Clock, CheckCircle } from 'lucide-react';

interface DealStatsProps {
  deals: Deal[];
}

export const DealStats = ({ deals }: DealStatsProps) => {
  const total = deals.length;
  const inProgress = deals.filter(d => ['sent', 'waiting', 'negotiating'].includes(d.status)).length;
  const accepted = deals.filter(d => d.status === 'accepted').length;
  const successRate = total > 0 ? Math.round((accepted / total) * 100) : 0;

  const stats = [
    { label: 'Total Deals', value: total, icon: Briefcase, color: 'text-orange-500' },
    { label: 'En cours', value: inProgress, icon: Clock, color: 'text-violet-500' },
    { label: 'Taux de succes', value: `${successRate}%`, icon: CheckCircle, color: 'text-green-500' },
  ];

  return (
    <div className="grid gap-4 md:grid-cols-3">
      {stats.map(stat => (
        <Card key={stat.label}>
          <CardContent className="p-6 flex items-center gap-4">
            <div className={`p-3 rounded-lg bg-gray-100 ${stat.color}`}>
              <stat.icon className="h-6 w-6" />
            </div>
            <div>
              <p className="text-2xl font-bold">{stat.value}</p>
              <p className="text-sm text-gray-500">{stat.label}</p>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};
