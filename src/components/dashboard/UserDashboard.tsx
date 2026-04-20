import { Bell, Bookmark, ExternalLink, Heart, Loader2, Search, Trash2 } from 'lucide-react';
import { useEffect, useState } from 'react';
import { useFavorites } from '../../hooks/useFavorites';
import { supabase } from '../../lib/supabase';
import { Alert, Profile, SavedSearch } from '../../types';
import { FUEL_LABELS } from '../../lib/constants';

type DashboardTab = 'favorites' | 'searches' | 'alerts';

interface UserDashboardProps {
  profile: Profile;
  onNavigate: (path: string) => void;
  initialTab?: DashboardTab;
}

export function UserDashboard({ profile, onNavigate, initialTab = 'favorites' }: UserDashboardProps) {
  const [activeTab, setActiveTab] = useState<DashboardTab>(initialTab);
  const { favorites, loading: favLoading, removeFavorite } = useFavorites(profile.id);
  const [savedSearches, setSavedSearches] = useState<SavedSearch[]>([]);
  const [alerts, setAlerts] = useState<Alert[]>([]);
  const [loadingSearches, setLoadingSearches] = useState(false);
  const [loadingAlerts, setLoadingAlerts] = useState(false);

  useEffect(() => {
    if (activeTab === 'searches') fetchSavedSearches();
    if (activeTab === 'alerts') fetchAlerts();
  }, [activeTab]);

  async function fetchSavedSearches() {
    setLoadingSearches(true);
    const { data } = await supabase
      .from('saved_searches')
      .select('*')
      .eq('user_id', profile.id)
      .order('created_at', { ascending: false });
    setSavedSearches(data || []);
    setLoadingSearches(false);
  }

  async function fetchAlerts() {
    setLoadingAlerts(true);
    const { data } = await supabase
      .from('alerts')
      .select('*')
      .eq('user_id', profile.id)
      .order('created_at', { ascending: false });
    setAlerts(data || []);
    setLoadingAlerts(false);
  }

  async function deleteSearch(id: string) {
    await supabase.from('saved_searches').delete().eq('id', id);
    setSavedSearches((prev) => prev.filter((s) => s.id !== id));
  }

  async function markAlertRead(id: string) {
    await supabase.from('alerts').update({ is_read: true }).eq('id', id);
    setAlerts((prev) => prev.map((a) => (a.id === id ? { ...a, is_read: true } : a)));
  }

  const tabs = [
    { id: 'favorites' as DashboardTab, label: 'Favoritos', icon: Heart, count: favorites.length },
    { id: 'searches' as DashboardTab, label: 'Búsquedas', icon: Bookmark, count: savedSearches.length },
    { id: 'alerts' as DashboardTab, label: 'Alertas', icon: Bell, count: alerts.filter((a) => !a.is_read).length },
  ];

  return (
    <div className="min-h-screen bg-gray-50 pt-16">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 py-8">
        <div className="mb-8">
          <h1 className="text-2xl font-bold text-gray-900">Mi Panel</h1>
          <p className="text-gray-500 mt-1">
            Hola, {profile.full_name || profile.email}
          </p>
        </div>

        <div className="flex gap-1 mb-6 bg-white rounded-xl border border-gray-100 p-1 w-fit">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                activeTab === tab.id
                  ? 'text-white shadow-sm'
                  : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
              }`}
              style={activeTab === tab.id ? { backgroundColor: '#1E2A38' } : {}}
            >
              <tab.icon className="w-4 h-4" />
              {tab.label}
              {tab.count > 0 && (
                <span
                  className={`text-xs px-1.5 py-0.5 rounded-full ${
                    activeTab === tab.id ? 'bg-white/20 text-white' : 'bg-gray-100 text-gray-600'
                  }`}
                >
                  {tab.count}
                </span>
              )}
            </button>
          ))}
        </div>

        {activeTab === 'favorites' && (
          <div>
            {favLoading ? (
              <LoadingState />
            ) : favorites.length === 0 ? (
              <EmptyState
                icon={<Heart className="w-12 h-12 text-gray-300" />}
                title="Sin favoritos aún"
                description="Guarda los coches que te interesen para verlos aquí"
                action={{ label: 'Buscar coches', onClick: () => onNavigate('/coches') }}
              />
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {favorites.map((fav) => (
                  <div key={fav.id} className="bg-white rounded-xl border border-gray-100 overflow-hidden hover:shadow-sm transition-shadow">
                    <div className="aspect-[16/10] overflow-hidden">
                      <img
                        src={fav.car_data.image}
                        alt={fav.car_data.title}
                        className="w-full h-full object-cover"
                        onError={(e) => {
                          (e.target as HTMLImageElement).src =
                            'https://images.pexels.com/photos/170811/pexels-photo-170811.jpeg?auto=compress&cs=tinysrgb&w=400';
                        }}
                      />
                    </div>
                    <div className="p-4">
                      <p className="font-semibold text-sm text-gray-900 line-clamp-2 mb-1">{fav.car_data.title}</p>
                      <p className="text-xl font-bold text-gray-900 mb-2">{fav.car_data.price.toLocaleString('es-ES')} €</p>
                      <div className="flex items-center justify-between">
                        <span className="text-xs text-gray-500">
                          {fav.car_data.year} · {fav.car_data.km.toLocaleString('es-ES')} km
                        </span>
                        <div className="flex gap-2">
                          <a
                            href={fav.car_data.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="p-1.5 text-gray-500 hover:bg-gray-100 rounded-lg transition-colors"
                          >
                            <ExternalLink className="w-4 h-4" />
                          </a>
                          <button
                            onClick={() => removeFavorite(fav.car_id)}
                            className="p-1.5 text-red-500 hover:bg-red-50 rounded-lg transition-colors"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {activeTab === 'searches' && (
          <div>
            {loadingSearches ? (
              <LoadingState />
            ) : savedSearches.length === 0 ? (
              <EmptyState
                icon={<Search className="w-12 h-12 text-gray-300" />}
                title="Sin búsquedas guardadas"
                description="Guarda tus búsquedas para acceder a ellas rápidamente y recibir alertas"
                action={{ label: 'Ir al buscador', onClick: () => onNavigate('/coches') }}
              />
            ) : (
              <div className="space-y-3">
                {savedSearches.map((search) => (
                  <div key={search.id} className="bg-white rounded-xl border border-gray-100 p-4 flex items-center justify-between gap-4 hover:shadow-sm transition-shadow">
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-1">
                        <p className="font-semibold text-gray-900 truncate">{search.name}</p>
                        {search.alert_enabled && (
                          <span className="text-xs px-2 py-0.5 rounded-full flex items-center gap-1" style={{ backgroundColor: 'rgba(76,175,80,0.1)', color: '#2E7D32' }}>
                            <Bell className="w-2.5 h-2.5" />
                            Alertas activas
                          </span>
                        )}
                      </div>
                      <div className="flex flex-wrap gap-2">
                        {search.filters.brand && (
                          <FilterTag label={search.filters.brand} />
                        )}
                        {search.filters.model && (
                          <FilterTag label={search.filters.model} />
                        )}
                        {search.filters.priceMax && (
                          <FilterTag label={`Hasta ${search.filters.priceMax.toLocaleString('es-ES')} €`} />
                        )}
                        {search.filters.province && (
                          <FilterTag label={search.filters.province} />
                        )}
                        {search.filters.fuel?.map((f) => (
                          <FilterTag key={f} label={FUEL_LABELS[f]} />
                        ))}
                      </div>
                    </div>
                    <div className="flex gap-2 flex-shrink-0">
                      <button
                        onClick={() => onNavigate('/coches')}
                        className="px-3 py-1.5 text-xs font-medium rounded-lg transition-colors"
                        style={{ color: '#1E2A38', backgroundColor: 'rgba(30,42,56,0.07)' }}
                        onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.backgroundColor = 'rgba(30,42,56,0.13)'; }}
                        onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.backgroundColor = 'rgba(30,42,56,0.07)'; }}
                      >
                        Buscar
                      </button>
                      <button
                        onClick={() => deleteSearch(search.id)}
                        className="p-1.5 text-red-400 hover:bg-red-50 rounded-lg transition-colors"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {activeTab === 'alerts' && (
          <div>
            {loadingAlerts ? (
              <LoadingState />
            ) : alerts.length === 0 ? (
              <EmptyState
                icon={<Bell className="w-12 h-12 text-gray-300" />}
                title="Sin alertas"
                description="Activa alertas en tus búsquedas guardadas para recibir notificaciones de nuevos chollos"
                action={{ label: 'Ver búsquedas', onClick: () => setActiveTab('searches') }}
              />
            ) : (
              <div className="space-y-3">
                {alerts.map((alert) => (
                  <div
                    key={alert.id}
                    className={`bg-white rounded-xl border p-4 transition-all ${
                      alert.is_read ? 'border-gray-100 opacity-70' : 'border-gray-200 shadow-sm'
                    }`}
                  >
                    <div className="flex items-start justify-between gap-4">
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-1">
                          {!alert.is_read && (
                            <span className="w-2 h-2 rounded-full flex-shrink-0" style={{ backgroundColor: '#4CAF50' }} />
                          )}
                          <p className="font-semibold text-gray-900 text-sm">{alert.title}</p>
                        </div>
                        <p className="text-sm text-gray-600">{alert.message}</p>
                        <p className="text-xs text-gray-400 mt-1">
                          {new Date(alert.created_at).toLocaleDateString('es-ES', {
                            day: 'numeric', month: 'long', year: 'numeric'
                          })}
                        </p>
                      </div>
                      {!alert.is_read && (
                        <button
                          onClick={() => markAlertRead(alert.id)}
                          className="text-xs text-gray-400 hover:text-gray-600 whitespace-nowrap"
                        >
                          Marcar leída
                        </button>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

function LoadingState() {
  return (
    <div className="flex items-center justify-center py-16">
      <Loader2 className="w-8 h-8 text-blue-600 animate-spin" />
    </div>
  );
}

function FilterTag({ label }: { label: string }) {
  return (
    <span className="text-xs px-2 py-0.5 bg-gray-100 text-gray-600 rounded-full">{label}</span>
  );
}

function EmptyState({
  icon,
  title,
  description,
  action,
}: {
  icon: React.ReactNode;
  title: string;
  description: string;
  action?: { label: string; onClick: () => void };
}) {
  return (
    <div className="text-center py-16">
      <div className="flex justify-center mb-4">{icon}</div>
      <h3 className="text-lg font-semibold text-gray-900 mb-2">{title}</h3>
      <p className="text-gray-500 text-sm max-w-sm mx-auto mb-6">{description}</p>
      {action && (
        <button
          onClick={action.onClick}
          className="px-6 py-2.5 text-white text-sm font-medium rounded-xl transition-colors"
          style={{ backgroundColor: '#1E2A38' }}
          onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.backgroundColor = '#2F4A63'; }}
          onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.backgroundColor = '#1E2A38'; }}
        >
          {action.label}
        </button>
      )}
    </div>
  );
}
