import { AlertCircle, CheckCircle, Eye, EyeOff, Loader2, X } from 'lucide-react';
import { useState } from 'react';
import { useAuth } from '../../hooks/useAuth';

type AuthView = 'login' | 'register' | 'reset';

interface AuthModalProps {
  onClose: () => void;
  initialView?: AuthView;
}

export function AuthModal({ onClose, initialView = 'login' }: AuthModalProps) {
  const [view, setView] = useState<AuthView>(initialView);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [fullName, setFullName] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const { signIn, signUp, resetPassword } = useAuth();

  const validateEmail = (val: string) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(val);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    if (!email.trim()) {
      setError('El email es obligatorio');
      return;
    }
    if (!validateEmail(email)) {
      setError('El formato del email no es válido');
      return;
    }

    if (view === 'login') {
      if (!password) {
        setError('La contraseña es obligatoria');
        return;
      }
    }

    if (view === 'register') {
      if (!fullName.trim()) {
        setError('El nombre es obligatorio');
        return;
      }
      if (password.length < 6) {
        setError('La contraseña debe tener al menos 6 caracteres');
        return;
      }
      if (password !== confirmPassword) {
        setError('Las contraseñas no coinciden');
        return;
      }
    }

    setLoading(true);

    try {
      if (view === 'login') {
        const { error } = await signIn(email, password);
        if (error) {
          if (error.message?.includes('Invalid login') || error.message?.includes('invalid_credentials')) {
            setError('Email o contraseña incorrectos. Comprueba tus datos.');
          } else if (error.message?.includes('Email not confirmed')) {
            setError('Debes confirmar tu email antes de iniciar sesión.');
          } else {
            setError('Error al iniciar sesión. Inténtalo de nuevo.');
          }
        } else {
          onClose();
        }
      } else if (view === 'register') {
        const { data, error } = await signUp(email, password, fullName);
        console.log('[AuthModal] register result:', { data, error });
        if (error) {
          if (
            error.message?.includes('already registered') ||
            error.message?.includes('already been registered') ||
            error.message?.includes('User already registered')
          ) {
            setError('Este email ya está registrado. Inicia sesión.');
          } else if (error.message?.includes('invalid') || error.message?.includes('Invalid')) {
            setError('Email inválido. Comprueba el formato.');
          } else if (error.message?.includes('weak')) {
            setError('La contraseña es demasiado débil. Usa al menos 6 caracteres.');
          } else {
            setError(`Error al registrarse: ${error.message}`);
          }
        } else if (data?.session) {
          setSuccess('¡Cuenta creada! Sesión iniciada correctamente.');
          setTimeout(() => onClose(), 1200);
        } else if (data?.user && !data?.session) {
          setSuccess('¡Cuenta creada! Revisa tu email para confirmar el registro y luego inicia sesión.');
        } else {
          setSuccess('¡Cuenta creada! Iniciando sesión...');
          setTimeout(() => onClose(), 1200);
        }
      } else if (view === 'reset') {
        const { error } = await resetPassword(email);
        if (error) {
          setError('Error al enviar el email. Comprueba la dirección.');
        } else {
          setSuccess('Email enviado. Revisa tu bandeja de entrada y sigue las instrucciones.');
        }
      }
    } finally {
      setLoading(false);
    }
  };

  const switchView = (v: AuthView) => {
    setView(v);
    setError('');
    setSuccess('');
    setPassword('');
    setConfirmPassword('');
  };

  const inputClass = "w-full px-4 py-2.5 border border-gray-200 rounded-xl text-sm focus:outline-none transition-all";
  const inputFocus = (e: React.FocusEvent<HTMLInputElement>) => {
    (e.currentTarget as HTMLElement).style.borderColor = '#1E2A38';
    (e.currentTarget as HTMLElement).style.boxShadow = '0 0 0 3px rgba(30,42,56,0.08)';
  };
  const inputBlur = (e: React.FocusEvent<HTMLInputElement>) => {
    (e.currentTarget as HTMLElement).style.borderColor = '#e5e7eb';
    (e.currentTarget as HTMLElement).style.boxShadow = 'none';
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={onClose} />

      <div className="relative bg-white rounded-2xl shadow-2xl w-full max-w-md overflow-hidden">
        <div className="px-8 py-7" style={{ backgroundColor: '#1E2A38' }}>
          <button
            onClick={onClose}
            className="absolute top-4 right-4 w-8 h-8 flex items-center justify-center rounded-full text-white/60 hover:text-white hover:bg-white/10 transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
          <div className="flex items-center gap-3 mb-4">
            <img
              src="/favicon-32x32.png"
              alt="Aportucoche"
              style={{ height: 28 }}
              className="object-contain flex-shrink-0"
            />
            <span className="font-black text-white text-lg">
              aportu<span style={{ color: '#4CAF50' }}>coche</span>
              <span className="text-white/30 font-normal text-sm ml-0.5">.com</span>
            </span>
          </div>
          <h2 className="text-white text-2xl font-bold">
            {view === 'login' && 'Bienvenido de vuelta'}
            {view === 'register' && 'Crea tu cuenta gratis'}
            {view === 'reset' && 'Recuperar contraseña'}
          </h2>
          <p className="text-white/40 text-sm mt-1">
            {view === 'login' && 'Accede a tus alertas y favoritos'}
            {view === 'register' && 'Guarda búsquedas y recibe chollos gratis'}
            {view === 'reset' && 'Te enviaremos un email de recuperación'}
          </p>
        </div>

        <form onSubmit={handleSubmit} className="px-8 py-6 space-y-4">
          {error && (
            <div className="flex items-center gap-2 p-3 bg-red-50 border border-red-200 rounded-xl text-sm text-red-700">
              <AlertCircle className="w-4 h-4 flex-shrink-0" />
              {error}
            </div>
          )}
          {success && (
            <div className="flex items-center gap-2 p-3 bg-green-50 border border-green-200 rounded-xl text-sm text-green-700">
              <CheckCircle className="w-4 h-4 flex-shrink-0" />
              {success}
            </div>
          )}

          {view === 'register' && (
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1.5">
                Nombre completo <span className="text-red-400">*</span>
              </label>
              <input
                type="text"
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                placeholder="Tu nombre y apellidos"
                className={inputClass}
                onFocus={inputFocus}
                onBlur={inputBlur}
              />
            </div>
          )}

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1.5">
              Email <span className="text-red-400">*</span>
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="tu@email.com"
              autoComplete="email"
              className={inputClass}
              onFocus={inputFocus}
              onBlur={inputBlur}
            />
          </div>

          {view !== 'reset' && (
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1.5">
                Contraseña <span className="text-red-400">*</span>
              </label>
              <div className="relative">
                <input
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  autoComplete={view === 'register' ? 'new-password' : 'current-password'}
                  minLength={6}
                  className={`${inputClass} pr-10`}
                  onFocus={inputFocus}
                  onBlur={inputBlur}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
              {view === 'register' && (
                <p className="text-xs text-gray-400 mt-1">Mínimo 6 caracteres</p>
              )}
            </div>
          )}

          {view === 'register' && (
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1.5">
                Confirmar contraseña <span className="text-red-400">*</span>
              </label>
              <div className="relative">
                <input
                  type={showConfirmPassword ? 'text' : 'password'}
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  placeholder="••••••••"
                  autoComplete="new-password"
                  className={`${inputClass} pr-10 ${
                    confirmPassword && password !== confirmPassword
                      ? 'border-red-300 bg-red-50'
                      : confirmPassword && password === confirmPassword
                      ? 'border-green-300 bg-green-50'
                      : ''
                  }`}
                  onFocus={inputFocus}
                  onBlur={inputBlur}
                />
                <button
                  type="button"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
                >
                  {showConfirmPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
              {confirmPassword && password !== confirmPassword && (
                <p className="text-xs text-red-500 mt-1">Las contraseñas no coinciden</p>
              )}
              {confirmPassword && password === confirmPassword && (
                <p className="text-xs text-green-600 mt-1">Las contraseñas coinciden</p>
              )}
            </div>
          )}

          {view === 'login' && (
            <div className="text-right">
              <button
                type="button"
                onClick={() => switchView('reset')}
                className="text-xs text-gray-400 hover:text-gray-700 transition-colors"
              >
                ¿Olvidaste tu contraseña?
              </button>
            </div>
          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full py-3 text-white font-semibold rounded-xl transition-colors flex items-center justify-center gap-2 mt-2 disabled:opacity-50"
            style={{ backgroundColor: '#1E2A38' }}
            onMouseEnter={(e) => { if (!loading) (e.currentTarget as HTMLElement).style.backgroundColor = '#2F4A63'; }}
            onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.backgroundColor = '#1E2A38'; }}
          >
            {loading && <Loader2 className="w-4 h-4 animate-spin" />}
            {view === 'login' && 'Iniciar sesión'}
            {view === 'register' && 'Crear cuenta gratis'}
            {view === 'reset' && 'Enviar email de recuperación'}
          </button>

          <div className="text-center text-sm text-gray-500">
            {view === 'login' ? (
              <>
                ¿No tienes cuenta?{' '}
                <button
                  type="button"
                  onClick={() => switchView('register')}
                  className="font-semibold transition-colors hover:opacity-80"
                  style={{ color: '#4CAF50' }}
                >
                  Regístrate gratis
                </button>
              </>
            ) : view === 'register' ? (
              <>
                ¿Ya tienes cuenta?{' '}
                <button
                  type="button"
                  onClick={() => switchView('login')}
                  className="font-semibold transition-colors hover:opacity-80"
                  style={{ color: '#4CAF50' }}
                >
                  Inicia sesión
                </button>
              </>
            ) : (
              <button
                type="button"
                onClick={() => switchView('login')}
                className="font-semibold transition-colors hover:opacity-80"
                style={{ color: '#4CAF50' }}
              >
                Volver al inicio de sesión
              </button>
            )}
          </div>
        </form>
      </div>
    </div>
  );
}
