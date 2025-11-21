import { Navbar } from '@/components/layout/Navbar';
import { TemplateGrid } from '@/components/templates/TemplateGrid';
import { Template } from '@/types';
import templatesData from '@/data/templates.json';

export const Templates = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <main className="max-w-6xl mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-2">Templates Gratuits</h1>
        <p className="text-gray-600 mb-8">
          Telecharge des templates professionnels pour booster ta carriere
        </p>
        <TemplateGrid templates={templatesData as Template[]} />
      </main>
    </div>
  );
};
