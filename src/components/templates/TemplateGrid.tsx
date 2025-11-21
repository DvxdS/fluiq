import { Template } from '@/types';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Download, FileText } from 'lucide-react';

interface TemplateGridProps {
  templates: Template[];
}

const categoryLabels: Record<string, string> = {
  'media-kit': 'Media Kit',
  'contrat': 'Contrat',
  'facture': 'Facture',
  'email': 'Email',
  'planning': 'Planning',
};

export const TemplateGrid = ({ templates }: TemplateGridProps) => {
  if (templates.length === 0) {
    return (
      <div className="text-center py-12 text-gray-500">
        Aucun template disponible pour le moment.
      </div>
    );
  }

  return (
    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
      {templates.map(template => (
        <Card key={template.id} className="overflow-hidden">
          <div className="h-40 bg-gradient-to-br from-orange-100 to-violet-100 flex items-center justify-center">
            <FileText className="h-16 w-16 text-gray-400" />
          </div>
          <CardHeader className="pb-2">
            <div className="flex items-start justify-between">
              <CardTitle className="text-lg">{template.name}</CardTitle>
              <Badge variant="secondary">{categoryLabels[template.category] || template.category}</Badge>
            </div>
          </CardHeader>
          <CardContent className="pb-4">
            <p className="text-sm text-gray-600">{template.description}</p>
          </CardContent>
          <CardFooter>
            <Button className="w-full" variant="outline">
              <Download className="mr-2 h-4 w-4" /> Telecharger
            </Button>
          </CardFooter>
        </Card>
      ))}
    </div>
  );
};
