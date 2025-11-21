import { Navbar } from '@/components/layout/Navbar';
import { PitchForm } from '@/components/pitch/PitchForm';

export const Pitch = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <main className="max-w-3xl mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-2">Pitch Deck Generator</h1>
        <p className="text-gray-600 mb-8">
          Remplis le formulaire pour generer ton pitch deck professionnel en PDF
        </p>
        <div className="bg-white rounded-lg border p-6">
          <PitchForm />
        </div>
      </main>
    </div>
  );
};
