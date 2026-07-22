'use client'
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import type { LucideIcon } from 'lucide-react';

interface ModuleCardProps {
  id: string;
  icon: LucideIcon;
  label: string;
  onClick?: () => void;
  inactive?: boolean;
}

const ModuleCard: React.FC<ModuleCardProps> = ({
  icon: Icon,
  label,
  onClick,
  inactive = false
}) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <motion.div
      className={`
        relative flex flex-col items-center gap-[20px]
        px-[28px] pt-[44px] pb-[36px] min-w-[160px]
        rounded-[24px]
        border-[0.5px] border-[rgba(201,169,110,0.16)]
        border-t-[1.5px] border-t-[rgba(201,169,110,0.3)]
        cursor-pointer overflow-hidden
        ${inactive ? 'opacity-[0.32] cursor-default' : ''}
      `}
      style={{
        background: isHovered && !inactive ? 'rgba(201,169,110,0.07)' : 'rgba(255,255,255,0.028)',
        backdropFilter: 'blur(24px)',
        WebkitBackdropFilter: 'blur(24px)',
        boxShadow: isHovered && !inactive
          ? '0 30px 64px rgba(0,0,0,0.7), 0 0 0 0.5px rgba(201,169,110,0.25), 0 0 40px rgba(201,169,110,0.08), inset 0 1px 0 rgba(255,255,255,0.1)'
          : '0 8px 40px rgba(0,0,0,0.5), inset 0 1px 0 rgba(255,255,255,0.06)',
        borderColor: isHovered && !inactive ? 'rgba(201,169,110,0.55)' : 'rgba(201,169,110,0.16)',
        filter: inactive ? 'grayscale(0.45)' : 'none',
        transition: 'background 0.28s, border-color 0.28s, box-shadow 0.32s, transform 0.35s cubic-bezier(0.34, 1.56, 0.64, 1)',
        transform: isHovered && !inactive ? 'translateY(-10px) scale(1.02)' : 'translateY(0) scale(1)',
      }}
      onMouseEnter={() => !inactive && setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={!inactive ? onClick : undefined}
      whileTap={!inactive ? { scale: 0.96, translateY: '-3px' } : {}}
    >
      {/* Top highlight line */}
      <div
        className="absolute top-0 left-0 right-0 h-[1.5px]"
        style={{
          background: 'linear-gradient(90deg, transparent 0%, rgba(201,169,110,0.6) 50%, transparent 100%)',
          opacity: isHovered && !inactive ? 1 : 0,
          transition: 'opacity 0.3s'
        }}
      />

      {/* Icon container */}
      <div
        className="w-[100px] h-[100px] flex items-center justify-center rounded-[26px] relative flex-shrink-0"
        style={{
          background: 'linear-gradient(145deg, #F7F1E6, #E6DCC8)',
          border: '1.5px solid rgba(150,110,50,0.12)',
          boxShadow: isHovered && !inactive
            ? '0 18px 44px rgba(0,0,0,0.65), 0 4px 10px rgba(0,0,0,0.45), inset 0 2px 0 rgba(255,255,255,0.95)'
            : '0 12px 36px rgba(0,0,0,0.6), 0 3px 8px rgba(0,0,0,0.4), inset 0 2px 0 rgba(255,255,255,0.95), inset 0 -2px 0 rgba(0,0,0,0.1), inset 1px 0 0 rgba(255,255,255,0.5), inset -1px 0 0 rgba(0,0,0,0.05)',
          transition: 'transform 0.35s cubic-bezier(0.34, 1.56, 0.64, 1), box-shadow 0.3s',
          transform: isHovered && !inactive ? 'scale(1.06) translateY(-2px)' : 'scale(1) translateY(0)',
        }}
      >
        <Icon
          size={46}
          strokeWidth={1.5}
          style={{
            stroke: '#7A5C0F',
            fill: 'none',
            strokeLinecap: 'round',
            strokeLinejoin: 'round',
            filter: 'drop-shadow(0 3px 6px rgba(0,0,0,0.65))'
          }}
        />
      </div>

      {/* Label */}
      <span
        className="font-serif text-[15px] font-normal tracking-[2px] text-center uppercase"
        style={{
          color: inactive ? '#8B6914' : '#7A5C0F',
          textShadow: inactive
            ? '0 1px 4px rgba(0,0,0,0.7), 0 0 1px rgba(0,0,0,0.9)'
            : '0 1px 6px rgba(0,0,0,0.7)',
        }}
      >
        {label}
      </span>

      {/* WIP Badge */}
      {inactive && (
        <div
          className="absolute top-[10px] right-[10px] flex items-center justify-center"
          style={{
            background: 'rgba(201,169,110,0.12)',
            border: '0.5px solid rgba(201,169,110,0.3)',
            borderRadius: '4px',
            padding: '3px 6px',
          }}
        >
          <svg
            width="18"
            height="18"
            viewBox="0 0 24 24"
            fill="none"
            stroke="rgba(201,169,110,0.7)"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <polygon points="12,2 20.66,7 20.66,17 12,22 3.34,17 3.34,7"/>
            <circle cx="12" cy="12" r="4"/>
          </svg>
        </div>
      )}
    </motion.div>
  );
};

export default ModuleCard;
