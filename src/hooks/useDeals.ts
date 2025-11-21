import { useState, useEffect } from 'react';
import { Deal } from '@/types';
import { storage, STORAGE_KEYS } from '@/lib/storage';

export const useDeals = () => {
  const [deals, setDeals] = useState<Deal[]>([]);

  useEffect(() => {
    const savedDeals = storage.get<Deal[]>(STORAGE_KEYS.DEALS);
    if (savedDeals) setDeals(savedDeals);
  }, []);

  const saveDeals = (newDeals: Deal[]) => {
    setDeals(newDeals);
    storage.set(STORAGE_KEYS.DEALS, newDeals);
  };

  const addDeal = (deal: Omit<Deal, 'id' | 'created_at' | 'updated_at'>) => {
    const newDeal: Deal = {
      ...deal,
      id: crypto.randomUUID(),
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    };
    saveDeals([...deals, newDeal]);
  };

  const updateDeal = (id: string, updates: Partial<Deal>) => {
    const newDeals = deals.map(d =>
      d.id === id ? { ...d, ...updates, updated_at: new Date().toISOString() } : d
    );
    saveDeals(newDeals);
  };

  const deleteDeal = (id: string) => {
    saveDeals(deals.filter(d => d.id !== id));
  };

  return { deals, addDeal, updateDeal, deleteDeal };
};
