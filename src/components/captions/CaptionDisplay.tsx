import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Copy, Check, RefreshCw } from 'lucide-react';

interface CaptionDisplayProps {
  caption: string;
  hashtags: string[];
  onRegenerate: () => void;
}

export const CaptionDisplay = ({ caption, hashtags, onRegenerate }: CaptionDisplayProps) => {
  const [copied, setCopied] = useState(false);

  const fullText = `${caption}\n\n${hashtags.map(h => `#${h}`).join(' ')}`;

  const handleCopy = async () => {
    await navigator.clipboard.writeText(fullText);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <Card className="bg-gradient-to-br from-orange-50 to-violet-50 border-none">
      <CardContent className="p-6 space-y-4">
        <p className="text-lg leading-relaxed">{caption}</p>

        <div className="flex flex-wrap gap-2">
          {hashtags.map(h => (
            <Badge key={h} variant="secondary" className="bg-white/60">
              #{h}
            </Badge>
          ))}
        </div>

        <div className="flex gap-2">
          <Button onClick={handleCopy} variant="outline" className="flex-1">
            {copied ? <Check className="mr-2 h-4 w-4" /> : <Copy className="mr-2 h-4 w-4" />}
            {copied ? 'Copie!' : 'Copier'}
          </Button>
          <Button onClick={onRegenerate} variant="outline">
            <RefreshCw className="h-4 w-4" />
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};
