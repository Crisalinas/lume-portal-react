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
    <div
      className="relative w-full h-full overflow-hidden"
      style={{ background: '#07070a' }}
    >
      {/* Background layers */}
      <div className="bg-mesh" />
      <div className="vignette" />
      <div className="grain" />

      {/* Splash Screen */}
      <AnimatePresence>
        {showSplash && (
          <motion.div
            className="fixed inset-0 z-[100] flex flex-col items-center justify-center"
            style={{ background: '#07070a' }}
            initial={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.8, ease: [0.4, 0, 0.2, 1] }}
          >
            <motion.div
              className="font-serif"
              style={{
                fontSize: '120px',
                fontWeight: 300,
                letterSpacing: '18px',
                textIndent: '18px',
                color: '#C9A96E',
                textShadow: '0 0 120px rgba(201,169,110,0.28), 0 2px 40px rgba(201,169,110,0.15)'
              }}
              initial={{ opacity: 0, scale: 0.96 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
            >
              LUMÉ
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Clock - fixed top right */}
      <div
        className="fixed z-50 text-right"
        style={{ top: '24px', right: '32px' }}
      >
        <div
          className="font-serif"
          style={{
            fontSize: '24px',
            fontWeight: 300,
            letterSpacing: '3px',
            color: '#C9A96E',
            lineHeight: 1
          }}
        >
          {formatTime(currentTime)}
        </div>
        <div
          className="uppercase"
          style={{
            fontSize: '9px',
            letterSpacing: '2px',
            color: 'rgba(201,169,110,0.42)',
            marginTop: '4px'
          }}
        >
          {formatDate(currentTime)}
        </div>

        {/* Theme toggle buttons */}
        <div className="flex gap-1.5 mt-3 justify-end">
          <button
            onClick={() => setTheme('day')}
            className={`w-7 h-7 rounded-md flex items-center justify-center transition-all ${
              theme === 'day'
                ? 'bg-white/8 border border-[#C9A96E]/25'
                : 'border border-transparent hover:bg-white/5'
            }`}
            style={{ color: theme === 'day' ? '#C9A96E' : 'rgba(201,169,110,0.35)' }}
          >
            <Sun size={13} />
          </button>
          <button
            onClick={() => setTheme('night')}
            className={`w-7 h-7 rounded-md flex items-center justify-center transition-all ${
              theme === 'night'
                ? 'bg-white/8 border border-[#C9A96E]/25'
                : 'border border-transparent hover:bg-white/5'
            }`}
            style={{ color: theme === 'night' ? '#C9A96E' : 'rgba(201,169,110,0.35)' }}
          >
            <Moon size={13} />
          </button>
        </div>
      </div>

      {/* Portal Content - centered vertically & horizontally */}
      <motion.div
        className="fixed inset-0 z-10 flex flex-col items-center justify-center"
        initial={{ opacity: 0 }}
        animate={{ opacity: showSplash ? 0 : 1 }}
        transition={{ duration: 0.7, delay: 1.6 }}
      >
        {/* Logo and branding */}
        <div
          className="flex flex-col items-center"
          style={{ marginBottom: '44px' }}
        >
          <h1
            className="font-serif"
            style={{
              fontSize: '72px',
              fontWeight: 300,
              letterSpacing: '20px',
              textIndent: '20px',
              lineHeight: 1,
              color: '#C9A96E',
              textShadow: '0 0 120px rgba(201,169,110,0.28), 0 2px 40px rgba(201,169,110,0.15)'
            }}
          >
            LUMÉ
          </h1>

          {/* Golden divider */}
          <div
            style={{
              width: '56px',
              height: '0.5px',
              background: 'linear-gradient(90deg, transparent, #C9A96E, transparent)',
              margin: '14px auto',
              opacity: 0.55
            }}
          />

          <div
            className="uppercase"
            style={{
              fontSize: '13px',
              letterSpacing: '10px',
              textIndent: '10px',
              fontWeight: 300,
              color: 'rgba(201,169,110,0.8)',
              textShadow: '0 1px 6px rgba(0,0,0,0.9), 0 2px 20px rgba(0,0,0,0.6)'
            }}
          >
            SISTEMA INTEGRAL
          </div>
        </div>

        {/* Modules Grid - all modules in a single row */}
        <div
          className="grid justify-center"
          style={{
            gridTemplateColumns: `repeat(${modules.length}, 200px)`,
            gap: '16px'
          }}
        >
          {modules.map((module, index) => (
            <motion.div
              key={module.id}
              initial={{ opacity: 0, y: 16, scale: 0.96 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{
                duration: 0.5,
                delay: 1.7 + index * 0.07,
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
