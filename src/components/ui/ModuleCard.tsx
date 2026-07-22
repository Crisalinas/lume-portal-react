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
    <div className="relative">
      <motion.div
        className={`
          relative flex flex-col items-center gap-5 px-7 py-11 min-w-[160px]
          rounded-3xl
          border-t-[1.5px] border-[0.5px]
          backdrop-blur-2xl
          cursor-pointer overflow-hidden
          ${inactive
            ? 'opacity-30 grayscale cursor-default border-[rgba(201,169,110,0.1)] bg-[rgba(255,255,255,0.028)]'
            : 'border-t-[rgba(201,169,110,0.3)] border-[rgba(201,169,110,0.16)] bg-[rgba(255,255,255,0.028)]'
          }
        `}
        style={{
          boxShadow: '0 8px 40px rgba(0,0,0,0.5), inset 0 1px 0 rgba(255,255,255,0.06)',
        }}
        initial={{ opacity: 0, y: 28, scale: 0.9 }}
        animate={{
          opacity: 1,
          y: 0,
          scale: isHovered && !inactive ? 1.02 : 1,
          translateY: isHovered && !inactive ? -10 : 0
        }}
        transition={{
          duration: 0.35,
          ease: [0.34, 1.56, 0.64, 1]
        }}
        onHoverStart={() => !inactive && setIsHovered(true)}
        onHoverEnd={() => setIsHovered(false)}
        onClick={!inactive ? onClick : undefined}
        whileTap={!inactive ? { scale: 0.96, translateY: -3 } : {}}
      >
        {/* Top highlight line */}
        <motion.div
          className="absolute top-0 left-0 right-0 h-[1.5px]"
          style={{
            background: 'linear-gradient(90deg, transparent 0%, rgba(201,169,110,0.6) 50%, transparent 100%)',
          }}
          initial={{ opacity: 0 }}
          animate={{ opacity: isHovered && !inactive ? 1 : 0 }}
          transition={{ duration: 0.3 }}
        />

        {/* Icon container */}
        <motion.div
          className="w-[100px] h-[100px] flex items-center justify-center rounded-[26px] relative flex-shrink-0"
          style={{
            background: 'linear-gradient(145deg, #F7F1E6, #E6DCC8)',
            border: '1.5px solid rgba(150,110,50,0.12)',
            boxShadow: `
              0 12px 36px rgba(0,0,0,0.6),
              0 3px 8px rgba(0,0,0,0.4),
              inset 0 2px 0 rgba(255,255,255,0.95),
              inset 0 -2px 0 rgba(0,0,0,0.1),
              inset 1px 0 0 rgba(255,255,255,0.5),
              inset -1px 0 0 rgba(0,0,0,0.05)
            `,
          }}
          animate={{
            scale: isHovered && !inactive ? 1.06 : 1,
            translateY: isHovered && !inactive ? -2 : 0,
          }}
          transition={{
            duration: 0.35,
            ease: [0.34, 1.56, 0.64, 1]
          }}
        >
          <Icon
            size={46}
            strokeWidth={1.5}
            style={{
              stroke: '#7A5C0F',
              fill: 'none',
              filter: 'drop-shadow(0 3px 6px rgba(0,0,0,0.65))'
            }}
          />
        </motion.div>

        {/* Label */}
        <span
          className="font-serif text-[15px] font-normal tracking-[2px] text-center uppercase"
          style={{
            color: inactive ? '#8B6914' : '#7A5C0F',
            textShadow: '0 1px 6px rgba(0,0,0,0.7)',
          }}
        >
          {label}
        </span>

        {/* Hover effect overlay */}
        {!inactive && (
          <motion.div
            className="absolute inset-0 rounded-3xl pointer-events-none"
            initial={{ opacity: 0 }}
            animate={{
              opacity: isHovered ? 1 : 0,
            }}
            style={{
              background: 'rgba(201,169,110,0.07)',
              borderColor: 'rgba(201,169,110,0.55)',
              boxShadow: `
                0 30px 64px rgba(0,0,0,0.7),
                0 0 0 0.5px rgba(201,169,110,0.25),
                0 0 40px rgba(201,169,110,0.08),
                inset 0 1px 0 rgba(255,255,255,0.1)
              `,
            }}
            transition={{ duration: 0.28 }}
          />
        )}

        {/* Tooltip */}
        {isHovered && !inactive && (
          <motion.div
            className="absolute -top-10 left-1/2 transform -translate-x-1/2 px-2.5 py-1 rounded-md pointer-events-none whitespace-nowrap z-10"
            style={{
              background: 'rgba(0,0,0,0.7)',
              backdropFilter: 'blur(8px)',
              border: '1px solid rgba(255,255,255,0.05)',
              color: 'white',
              fontSize: '12px',
              boxShadow: '0 2px 8px rgba(0,0,0,0.3)',
            }}
            initial={{ opacity: 0, y: 4 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 4 }}
            transition={{ duration: 0.2 }}
          >
            {label}
            <div className="absolute top-full left-1/2 transform -translate-x-1/2">
              <div
                className="w-2 h-2 rotate-45"
                style={{
                  background: 'rgba(0,0,0,0.7)',
                  border: '1px solid rgba(255,255,255,0.05)',
                  borderTop: 'none',
                  borderLeft: 'none',
                }}
              />
            </div>
          </motion.div>
        )}
      </motion.div>

      {/* WIP Badge for inactive modules */}
      {inactive && (
        <span
          className="absolute top-2 right-2.5 pointer-events-none z-10"
          title="En construcción"
        >
          <svg
            width="28"
            height="28"
            viewBox="0 0 24 24"
            fill="none"
            stroke="#C9A96E"
            strokeWidth="1.8"
            strokeLinejoin="round"
          >
            <polygon points="12,2 20.66,7 20.66,17 12,22 3.34,17 3.34,7"/>
            <circle cx="12" cy="12" r="4"/>
          </svg>
        </span>
      )}
    </div>
  );
};

export default ModuleCard;
