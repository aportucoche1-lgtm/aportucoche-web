import { BarChart2, Bookmark, Flame, Shield, Users } from 'lucide-react';
import { useEffect, useState } from 'react';
import { supabase } from '../../lib/supabase';
import { MOCK_CARS } from '../../lib/mockData';
import { calculateAIValuation } from '../../lib/aiValuation';

interface Stats {
  totalUsers: number;
  totalFavorites: number;
  totalSearches: number;
}

export function AdminPanel() {
  const [stats, setStats] = useState<Stats>({ totalUsers: 0, totalFavorites: 0, totalSearches: 0 });
  const [recentUsers, setRecentUsers] = useState<{ email: string; full_name: string; created_at: string }[]>([]);
  const [popularSearches, setPopularSearches] = useState<{ name: string; count: number }[]>([]);

  useEffect(() => {
    fetchStats();
  }, []);

  async function fetchStats() {
    const [usersRes, favRes, searchRes] = await Promise.all([
      supabase.from('profiles').select('id, email, full_name, created_at').order('created_at', { ascending: false }).limit(10),
      supabase.from('favorites').select('id', { count: 'exact', head: true }),
      supabase.from('saved_searches').select('id, name', { count: 'exact' }),
    ]);

    setStats({
      totalUsers: usersRes.data?.length || 0,
      totalFavorites: favRes.count || 0,
      totalSearches: searchRes.count || 0,
    });

    setRecentUsers(usersRes.data || []);

    const searchCounts: Record<string, number> = {};
    (searchRes.data || []).forEach((s: { name: string }) => {
      searchCounts[s.name] = (searchCounts[s.name] || 0) + 1;
    });
    const sorted = Object.entries(searchCounts)
      .map(([name, count]) => ({ name, count }))
      .sort((a, b) => b.count - a.count)
      .slice(0, 10);
    setPopularSearches(sorted);
  }

  const chollos = MOCK_CARS.filter((car) => {
    const val = calculateAIValuation(car);
    return val.rating === 'chollo_excelente';
  }).slice(0, 5);

  return (
    <div className="min-h-screen bg-gray-50 pt-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8">
        <div className="flex items-center gap-3 mb-8">
          <div className="w-10 h-10 bg-blue-700 rounded-xl flex items-center justify-center">
            <Shield className="w-5 h-5 text-white" />
          </div>
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Panel de Administración</h1>
            <p className="text-gray-500 text-sm">Estadísticas y gestión de Aportucoche.com</p>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
          <StatCard icon={<Users className="w-5 h-5 text-blue-600" />} label="Usuarios registrados" value={stats.totalUsers} color="blue" />
          <StatCard icon={<Bookmark className="w-5 h-5 text-green-600" />} label="Favoritos guardados" value={stats.totalFavorites} color="green" />
          <StatCard icon={<BarChart2 className="w-5 h-5 text-orange-600" />} label="Búsquedas guardadas" value={stats.totalSearches} color="orange" />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="bg-white rounded-2xl border border-gray-100 p-6">
            <div className="flex items-center gap-2 mb-4">
              <Users className="w-4 h-4 text-gray-400" />
              <h2 className="font-semibold text-gray-900">Últimos usuarios</h2>
            </div>
            {recentUsers.length === 0 ? (
              <p className="text-sm text-gray-400 py-4 text-center">Sin usuarios registrados aún</p>
            ) : (
              <div className="space-y-3">
                {recentUsers.map((user, i) => (
                  <div key={i} className="flex items-center justify-between py-2 border-b border-gray-50 last:border-0">
                    <div>
                      <p className="text-sm font-medium text-gray-900">{user.full_name || 'Sin nombre'}</p>
                      <p className="text-xs text-gray-500">{user.email}</p>
                    </div>
                    <span className="text-xs text-gray-400">
                      {new Date(user.created_at).toLocaleDateString('es-ES')}
                    </span>
                  </div>
                ))}
              </div>
            )}
          </div>

          <div className="bg-white rounded-2xl border border-gray-100 p-6">
            <div className="flex items-center gap-2 mb-4">
              <Flame className="w-4 h-4 text-orange-500" />
              <h2 className="font-semibold text-gray-900">Chollos detectados hoy</h2>
            </div>
            <div className="space-y-3">
              {chollos.map((car) => {
                const val = calculateAIValuation(car);
                return (
                  <div key={car.id} className="flex items-center justify-between py-2 border-b border-gray-50 last:border-0">
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-gray-900 truncate">{car.title}</p>
                      <p className="text-xs text-gray-500">{car.province} · {car.platform}</p>
                    </div>
                    <div className="text-right flex-shrink-0 ml-3">
                      <p className="text-sm font-bold text-gray-900">{car.price.toLocaleString('es-ES')} €</p>
                      <p className="text-xs text-orange-600">🔥 -{Math.abs(val.priceDiffPercent)}%</p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {popularSearches.length > 0 && (
          <div className="mt-6 bg-white rounded-2xl border border-gray-100 p-6">
            <div className="flex items-center gap-2 mb-4">
              <BarChart2 className="w-4 h-4 text-gray-400" />
              <h2 className="font-semibold text-gray-900">Búsquedas más populares</h2>
            </div>
            <div className="flex flex-wrap gap-2">
              {popularSearches.map((s, i) => (
                <span key={i} className="px-3 py-1.5 bg-gray-50 border border-gray-200 rounded-lg text-sm text-gray-700">
                  {s.name}
                  <span className="ml-1.5 text-xs text-gray-400">×{s.count}</span>
                </span>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

function StatCard({
  icon,
  label,
  value,
  color,
}: {
  icon: React.ReactNode;
  label: string;
  value: number;
  color: 'blue' | 'green' | 'orange';
}) {
  const bg = { blue: 'bg-blue-50', green: 'bg-green-50', orange: 'bg-orange-50' }[color];
  return (
    <div className="bg-white rounded-2xl border border-gray-100 p-5">
      <div className={`w-10 h-10 ${bg} rounded-xl flex items-center justify-center mb-3`}>
        {icon}
      </div>
      <p className="text-2xl font-bold text-gray-900">{value.toLocaleString('es-ES')}</p>
      <p className="text-sm text-gray-500 mt-0.5">{label}</p>
    </div>
  );
}
