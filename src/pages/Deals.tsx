import { useState } from 'react';
import { Navbar } from '@/components/layout/Navbar';
import { DealTable } from '@/components/deals/DealTable';
import { DealForm } from '@/components/deals/DealForm';
import { DealStats } from '@/components/deals/DealStats';
import { Button } from '@/components/ui/button';
import { useDeals } from '@/hooks/useDeals';
import { Deal } from '@/types';
import { Plus } from 'lucide-react';

export const Deals = () => {
  const { deals, addDeal, updateDeal, deleteDeal } = useDeals();
  const [formOpen, setFormOpen] = useState(false);
  const [editDeal, setEditDeal] = useState<Deal | null>(null);

  const handleSave = (data: Omit<Deal, 'id' | 'created_at' | 'updated_at'>) => {
    if (editDeal) {
      updateDeal(editDeal.id, data);
    } else {
      addDeal(data);
    }
    setEditDeal(null);
  };

  const handleEdit = (deal: Deal) => {
    setEditDeal(deal);
    setFormOpen(true);
  };

  const handleClose = () => {
    setFormOpen(false);
    setEditDeal(null);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <main className="max-w-6xl mx-auto px-4 py-8">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-3xl font-bold">Deal Tracker</h1>
            <p className="text-gray-600">Suis tes collaborations avec les marques</p>
          </div>
          <Button onClick={() => setFormOpen(true)}>
            <Plus className="mr-2 h-4 w-4" /> Nouveau Deal
          </Button>
        </div>

        <div className="mb-6">
          <DealStats deals={deals} />
        </div>

        <div className="bg-white rounded-lg border p-6">
          <DealTable deals={deals} onEdit={handleEdit} onDelete={deleteDeal} />
        </div>

        <DealForm
          open={formOpen}
          onClose={handleClose}
          onSave={handleSave}
          editDeal={editDeal}
        />
      </main>
    </div>
  );
};
