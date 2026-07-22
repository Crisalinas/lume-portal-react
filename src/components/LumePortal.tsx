import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Calendar,
  ShoppingBag,
  Users,
  CheckCircle2,
  Heart,
  UserCircle,
  Sun,
  Moon
} from 'lucide-react';
import ModuleCard from './ui/ModuleCard';

interface Module {
  id: string;
  icon: any;
  label: string;
  onClick?: () => void;
  inactive?: boolean;
}

const modules: Module[] = [
  {
    id: 'asistencia',
    icon: Calendar,
    label: 'Asistencia',
    onClick: () => window.location.href = '?modo=asistencia'
  },
  {
    id: 'erp',
    icon: ShoppingBag,
    label: 'ERP',
    onClick: () => console.log('Opening ERP...')
  },
  {
    id: 'crm',
    icon: Users,
    label: 'CRM',
    onClick: () => console.log('Opening CRM...')
  },
  {
    id: 'cx',
    icon: CheckCircle2,
    label: 'Customer Experience',
    onClick: () => console.log('Opening CX...')
  },
  {
    id: 'fidelizacion',
    icon: Heart,
    label: 'Fidelización',
    inactive: true
  },
  {
    id: 'rrhh',
    icon: UserCircle,
    label: 'RRHH',
    onClick: () => console.log('Opening RRHH...')
  }
];

const LumePortal: React.FC = () => {
  const [showSplash, setShowSplash] = useState(true);
  const [theme, setTheme] = useState<'day' | 'night'>('night');
  const [currentTime, setCurrentTime] = useState(new Date());

  useEffect(() => {
    const timer = setTimeout(() => setShowSplash(false), 2000);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    const interval = setInterval(() => setCurrentTime(new Date()), 1000);
    return () => clearInterval(interval);
  }, []);

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString('es-PE', {
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
      hour12: false
    });
  };

  const formatDate = (date: Date) => {
    return date.toLocaleDateString('es-PE', {
      weekday: 'long',
      day: '2-digit',
      month: 'short'
    }).toUpperCase();
  };

  return (
    <div className="relative w-full h-full">
      {/* Background mesh */}
      <div
        className="fixed inset-0 z-0"
        style={{
          background: `
            radial-gradient(ellipse 90% 70% at -5% -5%, rgba(201,169,110,0.18) 0%, transparent 45%),
            radial-gradient(ellipse 60% 80% at 105% 105%, rgba(201,169,110,0.12) 0%, transparent 42%),
            radial-gradient(ellipse 40% 30% at 50% 50%, rgba(201,169,110,0.03) 0%, transparent 70%)
          `
        }}
      />

      {/* Vignette */}
      <div
        className="fixed inset-0 z-[2] pointer-events-none"
        style={{
          background: 'radial-gradient(ellipse 100% 100% at 50% 50%, transparent 40%, rgba(0,0,0,0.55) 100%)'
        }}
      />

      {/* Grain texture */}
      <div
        className="fixed inset-0 z-[1] opacity-[0.07] pointer-events-none"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`
        }}
      />

      {/* Splash Screen */}
      <AnimatePresence>
        {showSplash && (
          <motion.div
            className="fixed inset-0 z-[100] flex flex-col items-center justify-center"
            style={{ background: 'var(--bg)' }}
            initial={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.9, ease: [0.4, 0, 0.2, 1] }}
          >
            <motion.div
              className="text-[200px] font-serif tracking-[20px]"
              style={{
                color: 'var(--gold)',
                textShadow: '0 0 120px rgba(201,169,110,0.28), 0 2px 40px rgba(201,169,110,0.15)'
              }}
              initial={{ opacity: 0, scale: 0.92, y: 16 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              transition={{ duration: 1.4, ease: [0.22, 1, 0.36, 1] }}
            >
              LUMÉ
            </motion.div>
            <motion.div
              className="text-[11px] tracking-[7px] uppercase mt-5.5"
              style={{ color: 'rgba(201,169,110,0.65)' }}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1.2, delay: 1 }}
            >
              Sistema Integral
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Header */}
      <header className="fixed top-0 left-0 right-0 z-20 flex justify-between items-center px-6 py-4 border-b border-[rgba(201,169,110,0.12)]" style={{ background: 'rgba(7,7,10,0.85)', backdropFilter: 'blur(12px)' }}>
        {/* Theme toggle */}
        <div className="flex gap-2">
          <button
            onClick={() => setTheme('day')}
            className={`px-3 py-1.5 rounded-lg text-xs transition-all ${
              theme === 'day'
                ? 'bg-[rgba(201,169,110,0.15)] border border-[rgba(201,169,110,0.3)] text-gold'
                : 'bg-transparent border border-transparent text-[rgba(201,169,110,0.5)]'
            }`}
          >
            <Sun size={14} className="inline mr-1" /> Día
          </button>
          <button
            onClick={() => setTheme('night')}
            className={`px-3 py-1.5 rounded-lg text-xs transition-all ${
              theme === 'night'
                ? 'bg-[rgba(201,169,110,0.15)] border border-[rgba(201,169,110,0.3)] text-gold'
                : 'bg-transparent border border-transparent text-[rgba(201,169,110,0.5)]'
            }`}
          >
            <Moon size={14} className="inline mr-1" /> Noche
          </button>
        </div>

        {/* Clock */}
        <div className="text-right">
          <div className="text-2xl font-light tracking-wider" style={{ color: 'var(--gold)' }}>
            {formatTime(currentTime)}
          </div>
          <div className="text-[10px] tracking-[2px]" style={{ color: 'rgba(201,169,110,0.5)' }}>
            {formatDate(currentTime)}
          </div>
        </div>
      </header>

      {/* Portal Content */}
      <motion.div
        className="fixed inset-0 z-10 flex flex-col items-center justify-center"
        initial={{ opacity: 0, y: 18 }}
        animate={{ opacity: showSplash ? 0 : 1, y: showSplash ? 18 : 0 }}
        transition={{ duration: 1, delay: 2, ease: [0.22, 1, 0.36, 1] }}
      >
        {/* Logo and branding */}
        <div className="flex flex-col items-center mb-11">
          <h1
            className="font-serif text-[72px] font-light tracking-[20px] leading-none mb-3.5"
            style={{
              color: 'var(--gold)',
              textShadow: '0 0 120px rgba(201,169,110,0.28), 0 2px 40px rgba(201,169,110,0.15)'
            }}
          >
            LUMÉ
          </h1>
          <div
            className="w-14 h-[0.5px] mb-3.5 opacity-55"
            style={{
              background: 'linear-gradient(90deg, transparent, var(--gold), transparent)'
            }}
          />
          <div
            className="text-[13px] tracking-[10px] uppercase font-light"
            style={{
              color: 'rgba(201,169,110,0.8)',
              textShadow: '0 1px 6px rgba(0,0,0,0.9), 0 2px 20px rgba(0,0,0,0.6)'
            }}
          >
            Sistema Integral
          </div>
        </div>

        {/* Modules Grid */}
        <div className="grid grid-cols-5 gap-4 px-4 max-w-[1100px]">
          {modules.map((module, index) => (
            <motion.div
              key={module.id}
              initial={{ opacity: 0, y: 28, scale: 0.9 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{
                duration: 0.7,
                delay: 2.08 + index * 0.1,
                ease: [0.22, 1, 0.36, 1]
              }}
            >
              <ModuleCard
                id={module.id}
                icon={module.icon}
                label={module.label}
                onClick={module.onClick}
                inactive={module.inactive}
              />
            </motion.div>
          ))}
        </div>
      </motion.div>
    </div>
  );
};

export default LumePortal;
