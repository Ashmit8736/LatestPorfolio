import { useEffect, useState, useCallback } from 'react';
import { CheckCircle2, XCircle, Info, X } from 'lucide-react';

let listeners = [];
let idCounter = 0;

export function pushToast(message, type = 'info') {
  const id = ++idCounter;
  listeners.forEach(fn => fn({ id, message, type }));
  return id;
}

const ICONS = { success: CheckCircle2, error: XCircle, info: Info };
const STYLES = {
  success: 'bg-[#1C1712] text-white border-[#F5A623]/40',
  error: 'bg-[#1C1712] text-white border-red-400/40',
  info: 'bg-[#1C1712] text-white border-white/15',
};
const ICON_COLORS = { success: 'text-[#F5A623]', error: 'text-red-400', info: 'text-[#C9BFAE]' };

export default function Toaster() {
  const [toasts, setToasts] = useState([]);

  const remove = useCallback((id) => {
    setToasts(t => t.filter(x => x.id !== id));
  }, []);

  useEffect(() => {
    const handler = (toast) => {
      setToasts(t => [...t, toast]);
      setTimeout(() => remove(toast.id), 4500);
    };
    listeners.push(handler);
    return () => { listeners = listeners.filter(l => l !== handler); };
  }, [remove]);

  if (toasts.length === 0) return null;

  return (
    <div className="fixed top-4 right-4 z-[999] flex flex-col gap-2 w-[calc(100%-2rem)] max-w-sm pointer-events-none">
      {toasts.map(t => {
        const Icon = ICONS[t.type] || Info;
        return (
          <div
            key={t.id}
            className={`pointer-events-auto flex items-start gap-3 rounded-xl border px-4 py-3 shadow-[0_15px_40px_-10px_rgba(0,0,0,0.4)] animate-[toast-in_0.2s_ease-out] ${STYLES[t.type] || STYLES.info}`}
          >
            <Icon className={`w-5 h-5 flex-shrink-0 mt-0.5 ${ICON_COLORS[t.type] || ICON_COLORS.info}`} />
            <p className="text-sm font-medium leading-snug flex-1">{t.message}</p>
            <button onClick={() => remove(t.id)} className="flex-shrink-0 text-white/50 hover:text-white transition-colors" aria-label="Dismiss">
              <X className="w-4 h-4" />
            </button>
          </div>
        );
      })}
      <style jsx global>{`
        @keyframes toast-in {
          from { opacity: 0; transform: translateY(-8px); }
          to { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </div>
  );
}
