import { useState, useCallback } from 'react';
import { Caption } from '@/types';
import captionsData from '@/data/captions.json';

const emojis = ['✨', '💫', '🔥', '💪', '🙌', '❤️', '🌟', '👏', '💯', '🎯'];

export const useCaptionGenerator = () => {
  const [caption, setCaption] = useState<Caption | null>(null);
  const [loading, setLoading] = useState(false);

  const generateCaption = useCallback((niche: string, city: string, tone: string) => {
    setLoading(true);

    // Filter captions by criteria
    let filtered = (captionsData as Caption[]).filter(c => {
      const matchNiche = c.niche === niche;
      const matchCity = c.city === city || c.city === 'all';
      const matchTone = c.tone === tone;
      return matchNiche && matchCity && matchTone;
    });

    // Fallback: try without tone
    if (filtered.length === 0) {
      filtered = (captionsData as Caption[]).filter(c => {
        const matchNiche = c.niche === niche;
        const matchCity = c.city === city || c.city === 'all';
        return matchNiche && matchCity;
      });
    }

    // Fallback: try niche only
    if (filtered.length === 0) {
      filtered = (captionsData as Caption[]).filter(c => c.niche === niche);
    }

    // Final fallback
    if (filtered.length === 0) {
      filtered = captionsData as Caption[];
    }

    // Random selection
    const selected = filtered[Math.floor(Math.random() * filtered.length)];

    // Replace template variables
    const cityMap: Record<string, string> = {
      'abidjan': 'Abidjan',
      'dakar': 'Dakar',
      'ouagadougou': 'Ouagadougou',
      'lome': 'Lome'
    };

    const processedCaption = {
      ...selected,
      template: selected.template
        .replace('{city}', cityMap[city] || city)
        .replace('{emoji}', emojis[Math.floor(Math.random() * emojis.length)])
    };

    setCaption(processedCaption);
    setLoading(false);
    return processedCaption;
  }, []);

  const clearCaption = () => setCaption(null);

  return { caption, loading, generateCaption, clearCaption };
};
