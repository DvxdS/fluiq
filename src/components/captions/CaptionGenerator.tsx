import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useCaptionGenerator } from '@/hooks/useCaptionGenerator';
import { CaptionDisplay } from './CaptionDisplay';
import { Sparkles } from 'lucide-react';

const niches = [
  { value: 'lifestyle', label: 'Lifestyle' },
  { value: 'food', label: 'Food' },
  { value: 'fashion', label: 'Fashion' },
  { value: 'beauty', label: 'Beauty' },
  { value: 'tech', label: 'Tech' },
];

const cities = [
  { value: 'abidjan', label: 'Abidjan' },
  { value: 'dakar', label: 'Dakar' },
  { value: 'ouagadougou', label: 'Ouagadougou' },
  { value: 'lome', label: 'Lome' },
];

const tones = [
  { value: 'fun', label: 'Fun' },
  { value: 'professional', label: 'Professionnel' },
  { value: 'inspirational', label: 'Inspirant' },
  { value: 'sales', label: 'Commercial' },
];

export const CaptionGenerator = () => {
  const [niche, setNiche] = useState('');
  const [city, setCity] = useState('');
  const [tone, setTone] = useState('');
  const { caption, loading, generateCaption} = useCaptionGenerator();

  const handleGenerate = () => {
    if (!niche || !city || !tone) return;
    generateCaption(niche, city, tone);
  };

  return (
    <div className="space-y-6">
      <div className="grid gap-4 md:grid-cols-3">
        <div className="space-y-2">
          <Label>Niche</Label>
          <Select onValueChange={setNiche}>
            <SelectTrigger><SelectValue placeholder="Choisis ta niche" /></SelectTrigger>
            <SelectContent>
              {niches.map(n => <SelectItem key={n.value} value={n.value}>{n.label}</SelectItem>)}
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <Label>Ville</Label>
          <Select onValueChange={setCity}>
            <SelectTrigger><SelectValue placeholder="Choisis ta ville" /></SelectTrigger>
            <SelectContent>
              {cities.map(c => <SelectItem key={c.value} value={c.value}>{c.label}</SelectItem>)}
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <Label>Ton</Label>
          <Select onValueChange={setTone}>
            <SelectTrigger><SelectValue placeholder="Choisis le ton" /></SelectTrigger>
            <SelectContent>
              {tones.map(t => <SelectItem key={t.value} value={t.value}>{t.label}</SelectItem>)}
            </SelectContent>
          </Select>
        </div>
      </div>

      <Button onClick={handleGenerate} disabled={!niche || !city || !tone || loading} className="w-full">
        <Sparkles className="mr-2 h-4 w-4" />
        {loading ? 'Generation...' : 'Generer une Caption'}
      </Button>

      {caption && (
        <CaptionDisplay
          caption={caption.template}
          hashtags={caption.hashtags}
          onRegenerate={handleGenerate}
        />
      )}
    </div>
  );
};
