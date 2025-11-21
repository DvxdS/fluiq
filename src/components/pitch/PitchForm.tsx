import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { PitchData } from '@/types';
import { generatePitchDeck } from '@/lib/pdf';

const niches = ['Lifestyle', 'Food', 'Fashion', 'Beauty', 'Tech', 'Travel', 'Fitness', 'Music'];
const locations = ['Abidjan, CI', 'Dakar, SN', 'Ouagadougou, BF', 'Lome, TG'];
const platformOptions = ['Instagram', 'TikTok', 'YouTube', 'Twitter', 'Facebook', 'LinkedIn'];

export const PitchForm = () => {
  const [formData, setFormData] = useState<Partial<PitchData>>({
    platforms: [],
  });
  const [loading, setLoading] = useState(false);

  const handlePlatformChange = (platform: string) => {
    const current = formData.platforms || [];
    const updated = current.includes(platform)
      ? current.filter(p => p !== platform)
      : [...current, platform];
    setFormData({ ...formData, platforms: updated });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.niche || !formData.handle) return;

    setLoading(true);
    try {
      generatePitchDeck(formData as PitchData);
    } catch (err) {
      console.error('PDF generation failed:', err);
    }
    setLoading(false);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="grid gap-6 md:grid-cols-2">
        <div className="space-y-2">
          <Label htmlFor="name">Nom complet *</Label>
          <Input
            id="name"
            value={formData.name || ''}
            onChange={e => setFormData({ ...formData, name: e.target.value })}
            placeholder="Ton nom"
            required
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="handle">Handle Instagram *</Label>
          <Input
            id="handle"
            value={formData.handle || ''}
            onChange={e => setFormData({ ...formData, handle: e.target.value })}
            placeholder="@tonhandle"
            required
          />
        </div>

        <div className="space-y-2">
          <Label>Niche *</Label>
          <Select onValueChange={v => setFormData({ ...formData, niche: v })}>
            <SelectTrigger><SelectValue placeholder="Choisis ta niche" /></SelectTrigger>
            <SelectContent>
              {niches.map(n => <SelectItem key={n} value={n.toLowerCase()}>{n}</SelectItem>)}
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <Label>Localisation *</Label>
          <Select onValueChange={v => setFormData({ ...formData, location: v })}>
            <SelectTrigger><SelectValue placeholder="Choisis ta ville" /></SelectTrigger>
            <SelectContent>
              {locations.map(l => <SelectItem key={l} value={l}>{l}</SelectItem>)}
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <Label htmlFor="followers">Nombre d'abonnes *</Label>
          <Input
            id="followers"
            type="number"
            value={formData.followers || ''}
            onChange={e => setFormData({ ...formData, followers: Number(e.target.value) })}
            placeholder="Ex: 15000"
            required
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="engagement">Taux d'engagement (%)</Label>
          <Input
            id="engagement"
            type="number"
            step="0.1"
            value={formData.engagement || ''}
            onChange={e => setFormData({ ...formData, engagement: Number(e.target.value) })}
            placeholder="Ex: 4.5"
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="email">Email *</Label>
          <Input
            id="email"
            type="email"
            value={formData.email || ''}
            onChange={e => setFormData({ ...formData, email: e.target.value })}
            placeholder="ton@email.com"
            required
          />
        </div>
      </div>

      <div className="space-y-2">
        <Label>Plateformes</Label>
        <div className="flex flex-wrap gap-2">
          {platformOptions.map(p => (
            <Button
              key={p}
              type="button"
              variant={formData.platforms?.includes(p) ? 'default' : 'outline'}
              size="sm"
              onClick={() => handlePlatformChange(p)}
            >
              {p}
            </Button>
          ))}
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="bio">Bio / Description</Label>
        <Textarea
          id="bio"
          value={formData.bio || ''}
          onChange={e => setFormData({ ...formData, bio: e.target.value })}
          placeholder="Decris-toi en quelques lignes..."
          rows={4}
        />
      </div>

      <Button type="submit" className="w-full" disabled={loading}>
        {loading ? 'Generation...' : 'Generer mon Pitch Deck'}
      </Button>
    </form>
  );
};
