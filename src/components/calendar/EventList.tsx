import { Event } from '@/types';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

interface EventListProps {
  events: Event[];
  selectedDate: string | null;
}

const typeColors: Record<string, string> = {
  holiday: 'bg-green-100 text-green-800',
  religious: 'bg-purple-100 text-purple-800',
  national: 'bg-orange-100 text-orange-800',
  cultural: 'bg-cyan-100 text-cyan-800',
  international: 'bg-blue-100 text-blue-800',
};

export const EventList = ({ events, selectedDate }: EventListProps) => {
  const filteredEvents = selectedDate
    ? events.filter(e => e.date === selectedDate)
    : events.slice(0, 5);

  if (filteredEvents.length === 0) {
    return (
      <Card>
        <CardContent className="p-6 text-center text-gray-500">
          {selectedDate ? 'Aucun evenement ce jour' : 'Selectionne une date'}
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="space-y-3">
      {filteredEvents.map(event => (
        <Card key={event.id}>
          <CardHeader className="pb-2">
            <div className="flex items-start justify-between">
              <CardTitle className="text-base">{event.name}</CardTitle>
              <Badge className={typeColors[event.type]}>{event.type}</Badge>
            </div>
            <p className="text-sm text-gray-500">{event.country} • {event.date}</p>
          </CardHeader>
          {event.content_ideas && event.content_ideas.length > 0 && (
            <CardContent className="pt-0">
              <p className="text-xs font-medium text-gray-500 mb-2">Idees de contenu:</p>
              <ul className="text-sm space-y-1">
                {event.content_ideas.map((idea, i) => (
                  <li key={i} className="flex items-center gap-2">
                    <span className="w-1 h-1 bg-orange-500 rounded-full" />
                    {idea}
                  </li>
                ))}
              </ul>
            </CardContent>
          )}
        </Card>
      ))}
    </div>
  );
};
