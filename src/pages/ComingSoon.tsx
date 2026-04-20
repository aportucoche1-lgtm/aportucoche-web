import { ArrowLeft, Bell, Clock } from 'lucide-react';

interface ComingSoonProps {
  section: 'motos' | 'autocaravanas';
  onNavigate: (path: string) => void;
  onOpenAuth: () => void;
}

const SECTION_CONFIG = {
  motos: {
    title: 'Motos de segunda mano',
    description: 'Pronto podrás comparar motos de todas las marcas y plataformas con valoración IA.',
    emoji: '🏍️',
    path: '/motos',
  },
  autocaravanas: {
    title: 'Autocaravanas',
    description: 'Compara autocaravanas, campers y vehículos de ocio de toda España.',
    emoji: '🚐',
    path: '/autocaravanas',
  },
};

export function ComingSoon({ section, onNavigate, onOpenAuth }: ComingSoonProps) {
  const config = SECTION_CONFIG[section];

  return (
    <div className="min-h-screen bg-gray-50 pt-16">
      <div className="max-w-2xl mx-auto px-4 sm:px-6 py-20 text-center">
        <div className="text-7xl mb-6">{config.emoji}</div>

        <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-amber-50 border border-amber-200 rounded-full text-amber-700 text-xs font-medium mb-6">
          <Clock className="w-3.5 h-3.5" />
          Próximamente disponible
        </div>

        <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">{config.title}</h1>
        <p className="text-gray-500 text-lg mb-8 leading-relaxed">{config.description}</p>

        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <button
            onClick={onOpenAuth}
            className="flex items-center justify-center gap-2 px-6 py-3 bg-blue-700 hover:bg-blue-800 text-white font-semibold rounded-xl transition-colors"
          >
            <Bell className="w-4 h-4" />
            Avisarme cuando esté listo
          </button>
          <button
            onClick={() => onNavigate('/coches')}
            className="flex items-center justify-center gap-2 px-6 py-3 bg-white hover:bg-gray-50 text-gray-700 font-semibold rounded-xl border border-gray-200 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            Ver coches de segunda mano
          </button>
        </div>

        <div className="mt-12 grid grid-cols-3 gap-4">
          <div className="bg-white rounded-xl p-4 border border-gray-100">
            <div className="text-lg font-bold text-gray-900">+200</div>
            <div className="text-xs text-gray-500 mt-0.5">marcas disponibles</div>
          </div>
          <div className="bg-white rounded-xl p-4 border border-gray-100">
            <div className="text-lg font-bold text-gray-900">IA</div>
            <div className="text-xs text-gray-500 mt-0.5">valoración de precios</div>
          </div>
          <div className="bg-white rounded-xl p-4 border border-gray-100">
            <div className="text-lg font-bold text-gray-900">5</div>
            <div className="text-xs text-gray-500 mt-0.5">plataformas integradas</div>
          </div>
        </div>
      </div>
    </div>
  );
}
