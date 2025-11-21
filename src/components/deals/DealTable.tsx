import { Deal } from '@/types';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Pencil, Trash2 } from 'lucide-react';

interface DealTableProps {
  deals: Deal[];
  onEdit: (deal: Deal) => void;
  onDelete: (id: string) => void;
}

const statusColors: Record<string, string> = {
  sent: 'bg-blue-100 text-blue-800',
  waiting: 'bg-yellow-100 text-yellow-800',
  negotiating: 'bg-purple-100 text-purple-800',
  accepted: 'bg-green-100 text-green-800',
  rejected: 'bg-red-100 text-red-800',
};

const statusLabels: Record<string, string> = {
  sent: 'Envoye',
  waiting: 'En attente',
  negotiating: 'Negociation',
  accepted: 'Accepte',
  rejected: 'Refuse',
};

export const DealTable = ({ deals, onEdit, onDelete }: DealTableProps) => {
  if (deals.length === 0) {
    return (
      <div className="text-center py-12 text-gray-500">
        Aucun deal pour le moment. Ajoute ton premier deal!
      </div>
    );
  }

  return (
    <div className="overflow-x-auto">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Marque</TableHead>
            <TableHead className="hidden md:table-cell">Contact</TableHead>
            <TableHead className="hidden md:table-cell">Date</TableHead>
            <TableHead>Statut</TableHead>
            <TableHead className="hidden md:table-cell">Montant</TableHead>
            <TableHead className="text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {deals.map(deal => (
            <TableRow key={deal.id}>
              <TableCell className="font-medium">{deal.brand_name}</TableCell>
              <TableCell className="hidden md:table-cell">{deal.contact_email}</TableCell>
              <TableCell className="hidden md:table-cell">{deal.date_sent}</TableCell>
              <TableCell>
                <Badge className={statusColors[deal.status]}>{statusLabels[deal.status]}</Badge>
              </TableCell>
              <TableCell className="hidden md:table-cell">
                {deal.proposed_amount ? `${deal.proposed_amount} FCFA` : '-'}
              </TableCell>
              <TableCell className="text-right">
                <Button variant="ghost" size="icon" onClick={() => onEdit(deal)}>
                  <Pencil className="h-4 w-4" />
                </Button>
                <Button variant="ghost" size="icon" onClick={() => onDelete(deal.id)}>
                  <Trash2 className="h-4 w-4" />
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};
