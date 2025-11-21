import { useState } from 'react';
import { Navbar } from '@/components/layout/Navbar';
import { CalendarGrid } from '@/components/calendar/CalendarGrid';
import { EventList } from '@/components/calendar/EventList';
import { Button } from '@/components/ui/button';
import { Event } from '@/types';
import eventsData from '@/data/events.json';

const countries = [
  { value: 'ALL', label: 'Tous' },
  { value: 'CI', label: 'Cote d\'Ivoire' },
  { value: 'SN', label: 'Senegal' },
  { value: 'BF', label: 'Burkina Faso' },
  { value: 'TG', label: 'Togo' },
];

export const Calendar = () => {
  const [selectedDate, setSelectedDate] = useState<string | null>(null);
  const [countryFilter, setCountryFilter] = useState('ALL');

  const filteredEvents = (eventsData as Event[]).filter(e =>
    countryFilter === 'ALL' || e.country === countryFilter || e.country === 'ALL'
  );

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <main className="max-w-6xl mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-2">Calendrier Local</h1>
        <p className="text-gray-600 mb-6">
          Planifie ton contenu autour des evenements importants
        </p>

        <div className="flex flex-wrap gap-2 mb-6">
          {countries.map(c => (
            <Button
              key={c.value}
              variant={countryFilter === c.value ? 'default' : 'outline'}
              size="sm"
              onClick={() => setCountryFilter(c.value)}
            >
              {c.label}
            </Button>
          ))}
        </div>

        <div className="grid gap-6 lg:grid-cols-2">
          <CalendarGrid
            events={filteredEvents}
            onDateSelect={setSelectedDate}
            selectedDate={selectedDate}
          />
          <div>
            <h2 className="text-lg font-semibold mb-4">
              {selectedDate ? `Evenements du ${selectedDate}` : 'Prochains evenements'}
            </h2>
            <EventList events={filteredEvents} selectedDate={selectedDate} />
          </div>
        </div>
      </main>
    </div>
  );
};
