import { useState, useEffect } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Deal } from '@/types';

interface DealFormProps {
  open: boolean;
  onClose: () => void;
  onSave: (deal: Omit<Deal, 'id' | 'created_at' | 'updated_at'>) => void;
  editDeal?: Deal | null;
}

const statuses = [
  { value: 'sent', label: 'Envoye' },
  { value: 'waiting', label: 'En attente' },
  { value: 'negotiating', label: 'Negociation' },
  { value: 'accepted', label: 'Accepte' },
  { value: 'rejected', label: 'Refuse' },
];

const dealTypes = [
  { value: 'sponsorship', label: 'Sponsorship' },
  { value: 'affiliate', label: 'Affiliation' },
  { value: 'collaboration', label: 'Collaboration' },
  { value: 'ugc', label: 'UGC' },
];

export const DealForm = ({ open, onClose, onSave, editDeal }: DealFormProps) => {
  const [formData, setFormData] = useState({
    brand_name: '',
    contact_email: '',
    date_sent: new Date().toISOString().split('T')[0],
    status: 'sent' as Deal['status'],
    deal_type: 'sponsorship' as Deal['deal_type'],
    proposed_amount: undefined as number | undefined,
    notes: '',
  });

  useEffect(() => {
    if (editDeal) {
      setFormData({
        brand_name: editDeal.brand_name,
        contact_email: editDeal.contact_email,
        date_sent: editDeal.date_sent,
        status: editDeal.status,
        deal_type: editDeal.deal_type,
        proposed_amount: editDeal.proposed_amount,
        notes: editDeal.notes || '',
      });
    } else {
      setFormData({
        brand_name: '',
        contact_email: '',
        date_sent: new Date().toISOString().split('T')[0],
        status: 'sent',
        deal_type: 'sponsorship',
        proposed_amount: undefined,
        notes: '',
      });
    }
  }, [editDeal, open]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave(formData);
    onClose();
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{editDeal ? 'Modifier le Deal' : 'Nouveau Deal'}</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="brand">Nom de la marque *</Label>
            <Input
              id="brand"
              value={formData.brand_name}
              onChange={e => setFormData({ ...formData, brand_name: e.target.value })}
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="email">Email de contact</Label>
            <Input
              id="email"
              type="email"
              value={formData.contact_email}
              onChange={e => setFormData({ ...formData, contact_email: e.target.value })}
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label>Statut</Label>
              <Select value={formData.status} onValueChange={v => setFormData({ ...formData, status: v as Deal['status'] })}>
                <SelectTrigger><SelectValue /></SelectTrigger>
                <SelectContent>
                  {statuses.map(s => <SelectItem key={s.value} value={s.value}>{s.label}</SelectItem>)}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label>Type</Label>
              <Select value={formData.deal_type} onValueChange={v => setFormData({ ...formData, deal_type: v as Deal['deal_type'] })}>
                <SelectTrigger><SelectValue /></SelectTrigger>
                <SelectContent>
                  {dealTypes.map(t => <SelectItem key={t.value} value={t.value}>{t.label}</SelectItem>)}
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="date">Date d'envoi</Label>
              <Input
                id="date"
                type="date"
                value={formData.date_sent}
                onChange={e => setFormData({ ...formData, date_sent: e.target.value })}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="amount">Montant (FCFA)</Label>
              <Input
                id="amount"
                type="number"
                value={formData.proposed_amount || ''}
                onChange={e => setFormData({ ...formData, proposed_amount: e.target.value ? Number(e.target.value) : undefined })}
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="notes">Notes</Label>
            <Textarea
              id="notes"
              value={formData.notes}
              onChange={e => setFormData({ ...formData, notes: e.target.value })}
              rows={3}
            />
          </div>

          <Button type="submit" className="w-full">
            {editDeal ? 'Modifier' : 'Ajouter'}
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
};
