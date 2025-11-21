import { Navbar } from '@/components/layout/Navbar';
import { CaptionGenerator } from '@/components/captions/CaptionGenerator';

export const Captions = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <main className="max-w-2xl mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-2">Caption Generator</h1>
        <p className="text-gray-600 mb-8">
          Genere des captions engageantes adaptees a ton audience locale
        </p>
        <div className="bg-white rounded-lg border p-6">
          <CaptionGenerator />
        </div>
      </main>
    </div>
  );
};
