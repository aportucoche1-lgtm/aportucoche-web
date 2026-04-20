import { AlertCircle, Bell, Bookmark, CheckCircle, ChevronRight, Heart, KeyRound, Loader2, LogOut, Mail, Phone, Save, Shield, Trash2, User } from 'lucide-react';
import { useState } from 'react';
import { useAuth } from '../hooks/useAuth';
import { supabase } from '../lib/supabase';

interface MiCuentaProps {
  onNavigate: (path: string) => void;
}

type AccountSection = 'perfil' | 'seguridad' | 'notificaciones';

export function MiCuenta({ onNavigate }: MiCuentaProps) {
  const { user, profile, signOut, updateProfile } = useAuth();
  const [activeSection, setActiveSection] = useState<AccountSection>('perfil');

  if (!user || !profile) {
    return (
      <div className="min-h-screen bg-gray-50 pt-16 flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-xl font-semibold text-gray-900 mb-3">Accede a tu cuenta</h2>
          <p className="text-gray-500 mb-6">Inicia sesión para gestionar tu cuenta</p>
          <button
            onClick={() => onNavigate('/')}
            className="px-6 py-3 text-white font-medium rounded-xl"
            style={{ backgroundColor: '#1E2A38' }}
          >
            Ir al inicio
          </button>
        </div>
      </div>
    );
  }

  const sections = [
    { id: 'perfil' as AccountSection, label: 'Datos personales', icon: User },
    { id: 'seguridad' as AccountSection, label: 'Seguridad', icon: KeyRound },
    { id: 'notificaciones' as AccountSection, label: 'Notificaciones', icon: Bell },
  ];

  return (
    <div className="min-h-screen bg-gray-50 pt-16">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 py-8">
        <div className="mb-8">
          <h1 className="text-2xl font-bold text-gray-900">Mi cuenta</h1>
          <p className="text-gray-500 mt-1">{profile.email}</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          <aside className="lg:col-span-1">
            <div className="bg-white rounded-2xl border border-gray-100 p-2">
              {sections.map((section) => (
                <button
                  key={section.id}
                  onClick={() => setActiveSection(section.id)}
                  className={`w-full flex items-center justify-between px-4 py-3 rounded-xl text-sm font-medium transition-colors ${
                    activeSection === section.id
                      ? 'text-white'
                      : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                  }`}
                  style={activeSection === section.id ? { backgroundColor: '#1E2A38' } : {}}
                >
                  <div className="flex items-center gap-3">
                    <section.icon className="w-4 h-4" />
                    {section.label}
                  </div>
                  <ChevronRight className={`w-3.5 h-3.5 ${activeSection === section.id ? 'text-white/40' : 'text-gray-300'}`} />
                </button>
              ))}

              <div className="border-t border-gray-100 mt-2 pt-2">
                <button
                  onClick={() => onNavigate('/dashboard')}
                  className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium text-gray-600 hover:bg-gray-50 hover:text-gray-900 transition-colors"
                >
                  <Heart className="w-4 h-4" />
                  Mis favoritos
                </button>
                <button
                  onClick={() => onNavigate('/dashboard?tab=searches')}
                  className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium text-gray-600 hover:bg-gray-50 hover:text-gray-900 transition-colors"
                >
                  <Bookmark className="w-4 h-4" />
                  Mis búsquedas
                </button>
                <button
                  onClick={() => onNavigate('/dashboard?tab=alerts')}
                  className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium text-gray-600 hover:bg-gray-50 hover:text-gray-900 transition-colors"
                >
                  <Bell className="w-4 h-4" />
                  Mis alertas
                </button>
              </div>

              <div className="border-t border-gray-100 mt-2 pt-2">
                <button
                  onClick={() => signOut()}
                  className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium text-red-500 hover:bg-red-50 transition-colors"
                >
                  <LogOut className="w-4 h-4" />
                  Cerrar sesión
                </button>
              </div>
            </div>
          </aside>

          <div className="lg:col-span-3">
            {activeSection === 'perfil' && (
              <ProfileSection profile={profile} onUpdate={updateProfile} />
            )}
            {activeSection === 'seguridad' && (
              <SecuritySection user={user} />
            )}
            {activeSection === 'notificaciones' && (
              <NotificationsSection profile={profile} />
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

function ProfileSection({
  profile,
  onUpdate,
}: {
  profile: { id: string; email: string; full_name: string; phone?: string };
  onUpdate: (updates: { full_name: string }) => Promise<{ error: unknown }>;
}) {
  const [fullName, setFullName] = useState(profile.full_name || '');
  const [saving, setSaving] = useState(false);
  const [feedback, setFeedback] = useState<{ type: 'success' | 'error'; msg: string } | null>(null);

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!fullName.trim()) {
      setFeedback({ type: 'error', msg: 'El nombre no puede estar vacío' });
      return;
    }
    setSaving(true);
    setFeedback(null);
    const { error } = await onUpdate({ full_name: fullName.trim() });
    setSaving(false);
    if (error) {
      setFeedback({ type: 'error', msg: 'Error al guardar los cambios. Inténtalo de nuevo.' });
    } else {
      setFeedback({ type: 'success', msg: 'Datos actualizados correctamente' });
      setTimeout(() => setFeedback(null), 3000);
    }
  };

  return (
    <div className="bg-white rounded-2xl border border-gray-100 p-6 sm:p-8">
      <div className="flex items-center gap-3 mb-6">
        <div className="w-10 h-10 rounded-xl flex items-center justify-center" style={{ backgroundColor: 'rgba(30,42,56,0.08)' }}>
          <User className="w-5 h-5" style={{ color: '#1E2A38' }} />
        </div>
        <div>
          <h2 className="text-lg font-bold text-gray-900">Datos personales</h2>
          <p className="text-sm text-gray-500">Actualiza tu información de perfil</p>
        </div>
      </div>

      {feedback && (
        <div className={`flex items-center gap-2 p-3 rounded-xl text-sm mb-5 ${
          feedback.type === 'success'
            ? 'bg-green-50 border border-green-200 text-green-700'
            : 'bg-red-50 border border-red-200 text-red-700'
        }`}>
          {feedback.type === 'success'
            ? <CheckCircle className="w-4 h-4 flex-shrink-0" />
            : <AlertCircle className="w-4 h-4 flex-shrink-0" />
          }
          {feedback.msg}
        </div>
      )}

      <form onSubmit={handleSave} className="space-y-5">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1.5">Nombre completo</label>
          <div className="relative">
            <User className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
            <input
              type="text"
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              placeholder="Tu nombre y apellidos"
              className="w-full pl-10 pr-4 py-2.5 border border-gray-200 rounded-xl text-sm focus:outline-none transition-all"
              onFocus={(e) => {
                e.currentTarget.style.borderColor = '#1E2A38';
                e.currentTarget.style.boxShadow = '0 0 0 3px rgba(30,42,56,0.08)';
              }}
              onBlur={(e) => {
                e.currentTarget.style.borderColor = '#e5e7eb';
                e.currentTarget.style.boxShadow = 'none';
              }}
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1.5">Email</label>
          <div className="relative">
            <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
            <input
              type="email"
              value={profile.email}
              disabled
              className="w-full pl-10 pr-4 py-2.5 border border-gray-100 rounded-xl text-sm bg-gray-50 text-gray-500 cursor-not-allowed"
            />
          </div>
          <p className="text-xs text-gray-400 mt-1">El email no se puede cambiar</p>
        </div>

        <div className="flex items-center justify-between pt-2">
          <p className="text-xs text-gray-400">
            Miembro desde {new Date(profile.created_at || '').toLocaleDateString('es-ES', { day: 'numeric', month: 'long', year: 'numeric' })}
          </p>
          <button
            type="submit"
            disabled={saving}
            className="flex items-center gap-2 px-5 py-2.5 text-white text-sm font-semibold rounded-xl transition-colors disabled:opacity-50"
            style={{ backgroundColor: '#1E2A38' }}
            onMouseEnter={(e) => { if (!saving) e.currentTarget.style.backgroundColor = '#2F4A63'; }}
            onMouseLeave={(e) => { e.currentTarget.style.backgroundColor = '#1E2A38'; }}
          >
            {saving ? <Loader2 className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4" />}
            Guardar cambios
          </button>
        </div>
      </form>
    </div>
  );
}

function SecuritySection({ user }: { user: { email?: string } }) {
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [feedback, setFeedback] = useState<{ type: 'success' | 'error'; msg: string } | null>(null);
  const [resetLoading, setResetLoading] = useState(false);
  const [resetSent, setResetSent] = useState(false);

  const handleChangePassword = async (e: React.FormEvent) => {
    e.preventDefault();
    setFeedback(null);
    if (newPassword.length < 6) {
      setFeedback({ type: 'error', msg: 'La nueva contraseña debe tener al menos 6 caracteres' });
      return;
    }
    if (newPassword !== confirmPassword) {
      setFeedback({ type: 'error', msg: 'Las contraseñas no coinciden' });
      return;
    }
    setLoading(true);
    const { error } = await supabase.auth.updateUser({ password: newPassword });
    setLoading(false);
    if (error) {
      setFeedback({ type: 'error', msg: 'Error al cambiar la contraseña. Inténtalo de nuevo.' });
    } else {
      setFeedback({ type: 'success', msg: 'Contraseña actualizada correctamente' });
      setCurrentPassword('');
      setNewPassword('');
      setConfirmPassword('');
    }
  };

  const handleSendReset = async () => {
    if (!user.email) return;
    setResetLoading(true);
    await supabase.auth.resetPasswordForEmail(user.email, {
      redirectTo: `${window.location.origin}/cuenta`,
    });
    setResetLoading(false);
    setResetSent(true);
  };

  const inputClass = "w-full px-4 py-2.5 border border-gray-200 rounded-xl text-sm focus:outline-none transition-all";
  const inputEvents = {
    onFocus: (e: React.FocusEvent<HTMLInputElement>) => {
      e.currentTarget.style.borderColor = '#1E2A38';
      e.currentTarget.style.boxShadow = '0 0 0 3px rgba(30,42,56,0.08)';
    },
    onBlur: (e: React.FocusEvent<HTMLInputElement>) => {
      e.currentTarget.style.borderColor = '#e5e7eb';
      e.currentTarget.style.boxShadow = 'none';
    },
  };

  return (
    <div className="space-y-5">
      <div className="bg-white rounded-2xl border border-gray-100 p-6 sm:p-8">
        <div className="flex items-center gap-3 mb-6">
          <div className="w-10 h-10 rounded-xl flex items-center justify-center" style={{ backgroundColor: 'rgba(30,42,56,0.08)' }}>
            <KeyRound className="w-5 h-5" style={{ color: '#1E2A38' }} />
          </div>
          <div>
            <h2 className="text-lg font-bold text-gray-900">Cambiar contraseña</h2>
            <p className="text-sm text-gray-500">Actualiza tu contraseña de acceso</p>
          </div>
        </div>

        {feedback && (
          <div className={`flex items-center gap-2 p-3 rounded-xl text-sm mb-5 ${
            feedback.type === 'success'
              ? 'bg-green-50 border border-green-200 text-green-700'
              : 'bg-red-50 border border-red-200 text-red-700'
          }`}>
            {feedback.type === 'success'
              ? <CheckCircle className="w-4 h-4 flex-shrink-0" />
              : <AlertCircle className="w-4 h-4 flex-shrink-0" />
            }
            {feedback.msg}
          </div>
        )}

        <form onSubmit={handleChangePassword} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1.5">Nueva contraseña</label>
            <input
              type="password"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              placeholder="••••••••"
              minLength={6}
              className={inputClass}
              {...inputEvents}
            />
            <p className="text-xs text-gray-400 mt-1">Mínimo 6 caracteres</p>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1.5">Confirmar nueva contraseña</label>
            <input
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              placeholder="••••••••"
              className={inputClass}
              {...inputEvents}
            />
          </div>
          <div className="flex justify-end pt-1">
            <button
              type="submit"
              disabled={loading || !newPassword || !confirmPassword}
              className="flex items-center gap-2 px-5 py-2.5 text-white text-sm font-semibold rounded-xl transition-colors disabled:opacity-50"
              style={{ backgroundColor: '#1E2A38' }}
              onMouseEnter={(e) => { if (!loading) e.currentTarget.style.backgroundColor = '#2F4A63'; }}
              onMouseLeave={(e) => { e.currentTarget.style.backgroundColor = '#1E2A38'; }}
            >
              {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4" />}
              Cambiar contraseña
            </button>
          </div>
        </form>
      </div>

      <div className="bg-white rounded-2xl border border-gray-100 p-6 sm:p-8">
        <div className="flex items-center gap-3 mb-4">
          <div className="w-10 h-10 rounded-xl flex items-center justify-center bg-amber-50">
            <Mail className="w-5 h-5 text-amber-600" />
          </div>
          <div>
            <h3 className="text-base font-bold text-gray-900">Recuperación por email</h3>
            <p className="text-sm text-gray-500">Envía un enlace de reset a tu email</p>
          </div>
        </div>
        {resetSent ? (
          <div className="flex items-center gap-2 p-3 bg-green-50 border border-green-200 rounded-xl text-sm text-green-700">
            <CheckCircle className="w-4 h-4 flex-shrink-0" />
            Email enviado a {user.email}. Revisa tu bandeja de entrada.
          </div>
        ) : (
          <button
            onClick={handleSendReset}
            disabled={resetLoading}
            className="flex items-center gap-2 px-4 py-2.5 text-sm font-medium rounded-xl border border-gray-200 text-gray-700 hover:bg-gray-50 transition-colors disabled:opacity-50"
          >
            {resetLoading ? <Loader2 className="w-4 h-4 animate-spin" /> : <Mail className="w-4 h-4" />}
            Enviar email de recuperación
          </button>
        )}
      </div>

      <div className="bg-white rounded-2xl border border-red-100 p-6 sm:p-8">
        <div className="flex items-center gap-3 mb-4">
          <div className="w-10 h-10 rounded-xl flex items-center justify-center bg-red-50">
            <Shield className="w-5 h-5 text-red-500" />
          </div>
          <div>
            <h3 className="text-base font-bold text-gray-900">Zona de peligro</h3>
            <p className="text-sm text-gray-500">Acciones irreversibles sobre tu cuenta</p>
          </div>
        </div>
        <button className="flex items-center gap-2 px-4 py-2.5 text-sm font-medium text-red-600 border border-red-200 rounded-xl hover:bg-red-50 transition-colors">
          <Trash2 className="w-4 h-4" />
          Eliminar mi cuenta
        </button>
        <p className="text-xs text-gray-400 mt-2">Esta acción eliminará permanentemente tu cuenta y todos tus datos.</p>
      </div>
    </div>
  );
}

function NotificationsSection({ profile }: { profile: { id: string; notifications_email?: boolean; notifications_alerts?: boolean } }) {
  const [notifEmail, setNotifEmail] = useState(profile.notifications_email !== false);
  const [notifAlerts, setNotifAlerts] = useState(profile.notifications_alerts !== false);
  const [saving, setSaving] = useState(false);
  const [feedback, setFeedback] = useState<{ type: 'success' | 'error'; msg: string } | null>(null);

  const handleSave = async () => {
    setSaving(true);
    setFeedback(null);
    const { error } = await supabase
      .from('profiles')
      .update({ notifications_email: notifEmail, notifications_alerts: notifAlerts })
      .eq('id', profile.id);
    setSaving(false);
    if (error) {
      setFeedback({ type: 'error', msg: 'Error al guardar preferencias' });
    } else {
      setFeedback({ type: 'success', msg: 'Preferencias guardadas correctamente' });
      setTimeout(() => setFeedback(null), 3000);
    }
  };

  return (
    <div className="bg-white rounded-2xl border border-gray-100 p-6 sm:p-8">
      <div className="flex items-center gap-3 mb-6">
        <div className="w-10 h-10 rounded-xl flex items-center justify-center" style={{ backgroundColor: 'rgba(30,42,56,0.08)' }}>
          <Bell className="w-5 h-5" style={{ color: '#1E2A38' }} />
        </div>
        <div>
          <h2 className="text-lg font-bold text-gray-900">Notificaciones</h2>
          <p className="text-sm text-gray-500">Gestiona cómo y cuándo te avisamos</p>
        </div>
      </div>

      {feedback && (
        <div className={`flex items-center gap-2 p-3 rounded-xl text-sm mb-5 ${
          feedback.type === 'success'
            ? 'bg-green-50 border border-green-200 text-green-700'
            : 'bg-red-50 border border-red-200 text-red-700'
        }`}>
          {feedback.type === 'success'
            ? <CheckCircle className="w-4 h-4 flex-shrink-0" />
            : <AlertCircle className="w-4 h-4 flex-shrink-0" />
          }
          {feedback.msg}
        </div>
      )}

      <div className="space-y-4">
        <ToggleSetting
          label="Emails de bienvenida y actividad"
          description="Recibe confirmaciones de registro y resúmenes de actividad"
          enabled={notifEmail}
          onChange={setNotifEmail}
        />
        <div className="border-t border-gray-50" />
        <ToggleSetting
          label="Alertas de nuevos coches"
          description="Recibe emails cuando aparezcan coches que coincidan con tus búsquedas guardadas"
          enabled={notifAlerts}
          onChange={setNotifAlerts}
        />
      </div>

      <div className="flex justify-end mt-6">
        <button
          onClick={handleSave}
          disabled={saving}
          className="flex items-center gap-2 px-5 py-2.5 text-white text-sm font-semibold rounded-xl transition-colors disabled:opacity-50"
          style={{ backgroundColor: '#1E2A38' }}
          onMouseEnter={(e) => { if (!saving) e.currentTarget.style.backgroundColor = '#2F4A63'; }}
          onMouseLeave={(e) => { e.currentTarget.style.backgroundColor = '#1E2A38'; }}
        >
          {saving ? <Loader2 className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4" />}
          Guardar preferencias
        </button>
      </div>
    </div>
  );
}

function ToggleSetting({
  label,
  description,
  enabled,
  onChange,
}: {
  label: string;
  description: string;
  enabled: boolean;
  onChange: (v: boolean) => void;
}) {
  return (
    <div className="flex items-start justify-between gap-4">
      <div>
        <p className="text-sm font-medium text-gray-900">{label}</p>
        <p className="text-xs text-gray-500 mt-0.5">{description}</p>
      </div>
      <button
        type="button"
        role="switch"
        aria-checked={enabled}
        onClick={() => onChange(!enabled)}
        className={`relative flex-shrink-0 w-11 h-6 rounded-full transition-colors duration-200 focus:outline-none ${enabled ? '' : 'bg-gray-200'}`}
        style={enabled ? { backgroundColor: '#4CAF50' } : {}}
      >
        <span
          className={`absolute top-0.5 left-0.5 w-5 h-5 bg-white rounded-full shadow-sm transition-transform duration-200 ${enabled ? 'translate-x-5' : 'translate-x-0'}`}
        />
      </button>
    </div>
  );
}
