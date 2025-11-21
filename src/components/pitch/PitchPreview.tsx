import { PitchData } from '@/types';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

interface PitchPreviewProps {
  data: Partial<PitchData>;
}

export const PitchPreview = ({ data }: PitchPreviewProps) => {
  if (!data.name) return null;

  return (
    <Card className="border-2 border-dashed">
      <CardHeader className="bg-gradient-to-r from-orange-500 to-violet-500 text-white rounded-t-lg">
        <CardTitle className="text-center text-2xl">{data.name}</CardTitle>
        <p className="text-center text-sm opacity-90">
          @{data.handle} • {data.niche}
        </p>
      </CardHeader>
      <CardContent className="p-6 space-y-4">
        {data.bio && (
          <div>
            <h4 className="font-semibold text-sm text-gray-500 mb-1">A propos</h4>
            <p className="text-gray-700">{data.bio}</p>
          </div>
        )}

        <div className="grid grid-cols-3 gap-4 text-center py-4 bg-gray-50 rounded-lg">
          <div>
            <p className="text-2xl font-bold text-orange-500">
              {data.followers ? formatNumber(data.followers) : '-'}
            </p>
            <p className="text-xs text-gray-500">Abonnes</p>
          </div>
          <div>
            <p className="text-2xl font-bold text-violet-500">
              {data.engagement ? `${data.engagement}%` : '-'}
            </p>
            <p className="text-xs text-gray-500">Engagement</p>
          </div>
          <div>
            <p className="text-2xl font-bold text-cyan-500">
              {data.location || '-'}
            </p>
            <p className="text-xs text-gray-500">Localisation</p>
          </div>
        </div>

        {data.platforms && data.platforms.length > 0 && (
          <div>
            <h4 className="font-semibold text-sm text-gray-500 mb-2">Plateformes</h4>
            <div className="flex flex-wrap gap-2">
              {data.platforms.map(p => (
                <span key={p} className="px-3 py-1 bg-gray-100 rounded-full text-sm">
                  {p}
                </span>
              ))}
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

const formatNumber = (num: number): string => {
  if (num >= 1000000) return (num / 1000000).toFixed(1) + 'M';
  if (num >= 1000) return (num / 1000).toFixed(1) + 'K';
  return num.toString();
};
